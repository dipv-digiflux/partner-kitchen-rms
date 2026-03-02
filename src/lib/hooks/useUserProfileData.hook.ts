import { commonAjax } from '@/components/crud/commonCrud/commonAjax'
import { JsonObject } from '@/types/json.types'
import { useQuery } from '@tanstack/react-query'

export const useUserProfileData = () => {
  return useQuery({
    queryKey: ['user-profile-details'],
    queryFn: async () => {
      const jsonData = (await commonAjax({ url: '/user/profile-details', type: 'GET' })) as JsonObject & { data: { permissions: string[] } }
      return {
        permissions: jsonData.data.permissions,
        data: jsonData,
      }
    },
  })
}
