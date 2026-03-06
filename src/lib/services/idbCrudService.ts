// TODO: IDB data handling
import type { JsonObject } from '@/types/commonAjax.types'
import { appIdb } from './idbClient'
import type { Table } from 'dexie'

type HttpMethod = 'get' | 'post' | 'patch' | 'put' | 'delete'

type SupportedCollections = 'recipes' | 'weeklyMenus' | 'categories'

const URL_TO_COLLECTION: Record<string, SupportedCollections> = {
  '/recipe': 'recipes',
  '/weekly-menu': 'weeklyMenus',
  '/category': 'categories',
}

const IDB_URL_KEYS = Object.keys(URL_TO_COLLECTION)

export const isIdbUrl = (url: string): boolean => {
  if (typeof url !== 'string') return false
  const basePath = url.split('?')[0]
  return IDB_URL_KEYS.some((key) => basePath === key || basePath.startsWith(`${key}/`))
}

const getCollectionFromUrl = (url: string): SupportedCollections | undefined => {
  const basePath = url.split('?')[0]
  const matchKey = IDB_URL_KEYS.find((key) => basePath === key || basePath.startsWith(`${key}/`))
  if (!matchKey) return undefined
  return URL_TO_COLLECTION[matchKey]
}

const getIdFromUrlOrData = (url: string, data: JsonObject | undefined): string | undefined => {
  const basePath = url.split('?')[0]
  const parts = basePath.split('/').filter(Boolean)
  // e.g. /recipe/:id or /weekly-menu/:id
  if (parts.length > 1) {
    return parts[1]
  }
  const idFromData = (data?.id as string | undefined) ?? (data?._id as string | undefined)
  return idFromData
}

const generateId = () => {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID()
  }
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`
}

const pickRecordFromPayload = (raw: JsonObject): JsonObject => {
  const { id, ...rest } = raw
  const base: JsonObject = { ...rest }

  const existingId = (raw._id as string | undefined) ?? (id as string | undefined)
  const _id = existingId || generateId()

  return { ...base, _id }
}

const applyFiltersAndSort = <T extends JsonObject>(items: T[], data: JsonObject | undefined): T[] => {
  if (!data) return items
  const filtersInput = (data.filters as JsonObject | undefined) ?? data
  const sortBy = data.sortBy as string | undefined
  const sortOrder = (data.sortOrder as string | undefined) ?? 'asc'

  let output = [...items]

  const filterEntries = Object.entries(filtersInput).filter(
    ([key, value]) => !['page', 'limit', 'sortBy', 'sortOrder', 'action'].includes(key) && value !== undefined && value !== null && value !== '',
  )

  if (filterEntries.length > 0) {
    output = output.filter((item) => {
      return filterEntries.every(([key, value]) => {
        const candidate = (item as JsonObject)[key]
        if (candidate === undefined || candidate === null) return false
        // loose string match to better support search fields
        return String(candidate).toLowerCase().includes(String(value).toLowerCase())
      })
    })
  }

  if (sortBy) {
    output.sort((a, b) => {
      const av = (a as JsonObject)[sortBy]
      const bv = (b as JsonObject)[sortBy]
      if (av === bv) return 0
      if (av == null) return 1
      if (bv == null) return -1
      if (av < bv) return sortOrder === 'desc' ? 1 : -1
      return sortOrder === 'desc' ? -1 : 1
    })
  }

  return output
}

export const handleIdbRequest = async <TResponse = unknown, TData extends JsonObject = JsonObject>({
  url,
  method,
  data,
}: {
  url: string
  method: HttpMethod
  data: TData | undefined
}): Promise<TResponse> => {
  const collectionName = getCollectionFromUrl(url)
  if (!collectionName) {
    throw new Error(`IDB handler: Unsupported url "${url}"`)
  }

  const db = appIdb
  const table = db[collectionName] as Table<JsonObject, string>

  // List
  if (method === 'get' && !getIdFromUrlOrData(url, data)) {
    const page = Number((data?.page as number | undefined) ?? 1)
    const limit = Number((data?.limit as number | undefined) ?? 10)

    const allItems = await table.toArray()
    const filteredAndSorted = applyFiltersAndSort(allItems, data)
    const totalRecords = filteredAndSorted.length
    const startIndex = (page - 1) * limit
    const paginated = filteredAndSorted.slice(startIndex, startIndex + limit)

    return { data: { result: paginated, totalRecords } } as TResponse
  }

  // Get one
  if (method === 'get') {
    const id = getIdFromUrlOrData(url, data)
    if (!id) {
      throw new Error('IDB handler: Missing id for GET record')
    }
    const record = await table.get(id)
    if (!record) {
      throw new Error(`IDB handler: Record not found for id "${id}"`)
    }
    return { data: record } as TResponse
  }

  // Duplicate (weekly-menu only, mapped via POST with action === 'duplicate')
  if (method === 'post' && data?.action === 'duplicate') {
    const sourceId = (data.id as string | undefined) ?? getIdFromUrlOrData(url, data)
    if (!sourceId) {
      throw new Error('IDB handler: Missing id for duplicate')
    }
    const existing = await table.get(sourceId)
    if (!existing) {
      throw new Error(`IDB handler: Source record not found for duplicate id "${sourceId}"`)
    }

    const duplicate: JsonObject = {
      ...existing,
      _id: generateId(),
    }

    if (collectionName === 'weeklyMenus') {
      const currentLabel = (duplicate.week_label as string | undefined) ?? ''
      duplicate.week_label = currentLabel ? `${currentLabel} (Copy)` : 'Copy'
      duplicate.status = 'draft'
    }

    await table.put(duplicate)
    return { data: duplicate } as TResponse
  }

  // Create
  if (method === 'post') {
    const raw = (data ?? {}) as JsonObject
    const record = pickRecordFromPayload(raw)
    await table.put(record)
    return { data: record } as TResponse
  }

  // Update
  if (method === 'patch' || method === 'put') {
    const raw = (data ?? {}) as JsonObject
    const id = getIdFromUrlOrData(url, raw) ?? (raw._id as string | undefined)
    if (!id) {
      throw new Error('IDB handler: Missing id for update')
    }

    const current = (await table.get(id)) ?? {}
    const record = pickRecordFromPayload({ ...current, ...raw, _id: id })
    await table.put(record)
    return { data: record } as TResponse
  }

  // Delete
  if (method === 'delete') {
    const id = getIdFromUrlOrData(url, data)
    if (!id) {
      throw new Error('IDB handler: Missing id for delete')
    }
    await table.delete(id)
    return { data: { success: true } as unknown as TResponse } as TResponse
  }

  throw new Error(`IDB handler: Unsupported method "${method}"`)
}

