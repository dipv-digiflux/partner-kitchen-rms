import { useModuleApi } from '@/lib/hooks/useModuleApi'

interface PageFormWrapperProps {
  title: string
  children: React.ReactNode
  className?: string
}

export const PageFormWrapper = ({ title, children, className }: PageFormWrapperProps) => {
  const API = useModuleApi()

  return (
    <div className={`card h-full flex flex-col ${className}`}>
      <div className="card-header py-5 px-6 flex items-center justify-between shrink-0">
        <h2 className="text-xl font-bold capitalize">{title}</h2>
        <button type="button" onClick={() => API.actions.hideForm()} className="btn btn-outline btn-sm">
          Back
        </button>
      </div>
      <div className="card-body py-6 px-9 overflow-auto flex-1">{children}</div>
    </div>
  )
}
