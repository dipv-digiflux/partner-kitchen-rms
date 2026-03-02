import { useModuleApi } from '@/lib/hooks/useModuleApi'

export const FormPageHeader = ({ title }: { title: string }) => {
  const API = useModuleApi()
  return (
    <div className="mb-4 flex items-center justify-between">
      <h2 className="text-xl font-bold">{title}</h2>
      <button onClick={() => API.actions.hideForm()} className="btn btn-outline btn-sm">
        Back
      </button>
    </div>
  )
}
