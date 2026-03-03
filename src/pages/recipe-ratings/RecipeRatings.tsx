import { ModuleBreadCrumb } from '@/components/ModuleBreadCrumb'

/**
 * Recipe Ratings / feedbacks / comments from customers.
 * PRD: Customer Recipe Ratings / feedbacks / comments
 */
const RecipeRatings = () => {
  return (
    <div>
      <ModuleBreadCrumb pageTitle="Recipe Ratings" />

      <div className="card">
        <div className="card-header">
          <h3 className="text-lg font-semibold">Customer Recipe Ratings & Feedback</h3>
        </div>
        <div className="card-body">
          <p className="text-gray-500 dark:text-gray-400">View and respond to customer recipe ratings, feedbacks and comments. Connect your API to load data.</p>
        </div>
      </div>
    </div>
  )
}

export default RecipeRatings
