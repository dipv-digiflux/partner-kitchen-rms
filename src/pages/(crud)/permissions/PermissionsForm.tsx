import { CommonFormElement } from '@/components/crud/commonCrud/CommonElement/CommonFormElement'
import { withModuleProvider } from '@/lib/hoc/withModuleProvider'
import { PermissionsForm } from './PermissionsFormContent'

// Fast refresh requires a component to be exported. 
// We export the default HOC-wrapped component.
function PermissionsPage() {
    return <CommonFormElement form={PermissionsForm} />
}

export default withModuleProvider(PermissionsPage, 'permissions')
