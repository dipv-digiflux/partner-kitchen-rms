import { CommonFormElement } from '@/components/crud/commonCrud/CommonElement/CommonFormElement'
import { withModuleProvider } from '@/lib/hoc/withModuleProvider'
import { RecipeForm } from './RecipeForm'

function RecipeFormPage() {
  return <CommonFormElement form={RecipeForm} />
}

export default withModuleProvider(RecipeFormPage, 'recipe')
