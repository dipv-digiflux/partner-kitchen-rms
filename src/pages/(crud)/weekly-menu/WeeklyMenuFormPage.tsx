import { CommonFormElement } from '@/components/crud/commonCrud/CommonElement/CommonFormElement'
import { withModuleProvider } from '@/lib/hoc/withModuleProvider'
import { WeeklyMenuForm } from './WeeklyMenuForm'

// eslint-disable-next-line react-refresh/only-export-components
function WeeklyMenuFormPage() {
  return <CommonFormElement form={WeeklyMenuForm} />
}

export default withModuleProvider(WeeklyMenuFormPage, 'weekly-menu')
