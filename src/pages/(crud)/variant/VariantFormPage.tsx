import { CommonFormElement } from '@/components/crud/commonCrud/CommonElement/CommonFormElement'
import { withModuleProvider } from '@/lib/hoc/withModuleProvider'
import { VariantForm } from './VariantForm'

// eslint-disable-next-line react-refresh/only-export-components
function VariantFormPage() {
  return <CommonFormElement form={VariantForm} />
}

export default withModuleProvider(VariantFormPage, 'variant')
