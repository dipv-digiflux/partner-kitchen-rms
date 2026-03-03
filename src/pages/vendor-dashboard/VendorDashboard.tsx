import { ModuleBreadCrumb } from '@/components/ModuleBreadCrumb'
import { Link } from 'react-router-dom'
import { appRoutes } from '@/lib/utils/routes'
import { BarChart3, Star, Package, Calendar, FileText, Download } from 'lucide-react'

/**
 * Vendor Kitchen Dashboard – high-level numbers, ratings, production, live menu data, reports.
 * PRD: Dashboard will help with numbers at higher level - sales, rating, production numbers, etc.
 * Customer Recipe Ratings / feedbacks / comments | Live customer menu selection report | Reports view/download
 */
const VendorDashboard = () => {
  return (
    <div>
      <ModuleBreadCrumb pageTitle="Vendor Dashboard" />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="card">
          <div className="card-body flex items-center gap-4">
            <div className="rounded-lg bg-primary/10 p-3">
              <BarChart3 className="h-8 w-8 text-primary" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Sales (This Week)</p>
              <p className="text-2xl font-bold">—</p>
              <p className="text-xs text-gray-400">Connect API for live data</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-body flex items-center gap-4">
            <div className="rounded-lg bg-success/10 p-3">
              <Star className="h-8 w-8 text-success" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Avg. Rating</p>
              <p className="text-2xl font-bold">—</p>
              <p className="text-xs text-gray-400">Customer recipe ratings</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-body flex items-center gap-4">
            <div className="rounded-lg bg-warning/10 p-3">
              <Package className="h-8 w-8 text-warning" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Production Numbers</p>
              <p className="text-2xl font-bold">—</p>
              <p className="text-xs text-gray-400">Meals prepared / planned</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-body flex items-center gap-4">
            <div className="rounded-lg bg-info/10 p-3">
              <Calendar className="h-8 w-8 text-info" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Live Menu (This Week)</p>
              <p className="text-2xl font-bold">—</p>
              <p className="text-xs text-gray-400">Upcoming days selection</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="card">
          <div className="card-header">
            <h3 className="text-lg font-semibold">Customer Recipe Ratings / Feedback</h3>
          </div>
          <div className="card-body">
            <p className="text-sm text-gray-500 dark:text-gray-400">View and respond to customer recipe ratings, feedbacks and comments.</p>
            <Link to={appRoutes.recipeRatings} className="btn btn-outline btn-sm mt-3">
              View Recipe Ratings
            </Link>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3 className="text-lg font-semibold">Live Menu Selection Report</h3>
          </div>
          <div className="card-body">
            <p className="text-sm text-gray-500 dark:text-gray-400">This week upcoming days – customer menu selection data and order projections.</p>
            <p className="mt-2 text-xs text-gray-400">Available after menu goes live (e.g. Wednesday next week).</p>
          </div>
        </div>
      </div>

      <div className="mt-6 card">
        <div className="card-header flex flex-wrap items-center justify-between gap-2">
          <h3 className="text-lg font-semibold">Reports – View / Download</h3>
        </div>
        <div className="card-body">
          <div className="flex flex-wrap gap-4">
            <Link
              to={appRoutes.productionReportSummary}
              className="flex items-center gap-2 rounded-lg border border-gray-200 dark:border-gray-700 p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors min-w-[200px]"
            >
              <FileText className="h-6 w-6 text-primary" />
              <div>
                <p className="font-medium">Production Report – Summary</p>
                <p className="text-xs text-gray-500">By customer, delivery date or date range (final/draft)</p>
              </div>
            </Link>
            <Link
              to={appRoutes.productionReportList}
              className="flex items-center gap-2 rounded-lg border border-gray-200 dark:border-gray-700 p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors min-w-[200px]"
            >
              <Download className="h-6 w-6 text-primary" />
              <div>
                <p className="font-medium">Production Report – List</p>
                <p className="text-xs text-gray-500">For &quot;powered by molt&quot; labels printing</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VendorDashboard
