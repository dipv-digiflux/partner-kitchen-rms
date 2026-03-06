import { CommonFormElement } from '@/components/crud/commonCrud/CommonElement/CommonFormElement'
import { withModuleProvider } from '@/lib/hoc/withModuleProvider'
import { RecipeForm } from './RecipeForm'

// eslint-disable-next-line react-refresh/only-export-components
function RecipeFormPage() {
  return <CommonFormElement form={RecipeForm} />
}

export default withModuleProvider(RecipeFormPage, 'recipe')
