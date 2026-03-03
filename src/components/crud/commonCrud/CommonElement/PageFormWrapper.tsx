import { useModuleApi } from '@/lib/hooks/useModuleApi'

export const PageFormWrapper = ({ title, children }: { title: string; children: React.ReactNode }) => {
  const API = useModuleApi()

  return (
    <div className="card h-full flex flex-col">
      <div className="card-header flex items-center justify-between shrink-0">
        <h2 className="text-xl font-bold capitalize">{title}</h2>
        <button type="button" onClick={() => API.actions.hideForm()} className="btn btn-outline btn-sm">
          Back
        </button>
      </div>
      <div className="card-body p-4 overflow-auto flex-1">{children}</div>
    </div>
  )
}
