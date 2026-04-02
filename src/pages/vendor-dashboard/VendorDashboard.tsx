import { ModuleBreadCrumb } from '@/components/ModuleBreadCrumb'
import { Link } from 'react-router-dom'
import { appRoutes } from '@/lib/utils/routes'
import { BarChart3, Star, Package, Calendar, FileText, Download } from 'lucide-react'
import { useMemo, useState } from 'react'
import StatusCard from '@/components/core/Cards/StatusCard'

/**
 * Vendor Kitchen Dashboard – high-level numbers, ratings, production, live menu data, reports.
 * PRD: Dashboard will help with numbers at higher level - sales, rating, production numbers, etc.
 * Customer Recipe Ratings / feedbacks / comments | Live customer menu selection report | Reports view/download
 */
type DashboardFilter = 'sales' | 'rating' | 'production' | 'liveMenu'

const VendorDashboard = () => {
  const [activeFilter, setActiveFilter] = useState<DashboardFilter>('sales')

  const activeTitle = useMemo(() => {
    switch (activeFilter) {
      case 'sales':
        return 'Sales'
      case 'rating':
        return 'Rating'
      case 'production':
        return 'Production'
      case 'liveMenu':
        return 'Live Menu'
      default:
        return 'Sales'
    }
  }, [activeFilter])

  return (
    <div>
      <ModuleBreadCrumb pageTitle="Vendor Dashboard" />

      <div className="mb-4 card">
        <div className="card-header flex items-center justify-between gap-2">
          <h3 className="text-lg font-semibold">{activeTitle}</h3>
          <span className="text-xs text-gray-500 dark:text-gray-400">Select a card below to change the view</span>
        </div>
        <div className="card-body">
          {activeFilter === 'sales' ? (
            <div className="space-y-1">
              <p className="text-sm text-gray-500 dark:text-gray-400">High-level sales numbers (this week / historical).</p>
              <p className="text-xs text-gray-400">Click “Sales” again later to open historical view once API is connected.</p>
            </div>
          ) : null}
          {activeFilter === 'rating' ? (
            <div className="space-y-1">
              <p className="text-sm text-gray-500 dark:text-gray-400">Customer recipe ratings, feedback and comments.</p>
              <Link to={appRoutes.recipeRatings} className="btn btn-outline btn-sm mt-3">
                Open Ratings
              </Link>
            </div>
          ) : null}
          {activeFilter === 'production' ? (
            <div className="space-y-1">
              <p className="text-sm text-gray-500 dark:text-gray-400">Production numbers and readiness for upcoming delivery cycle.</p>
              <div className="flex flex-wrap gap-2 pt-3">
                <Link to={appRoutes.productionReportSummary} className="btn btn-outline btn-sm">
                  Production Summary
                </Link>
                <Link to={appRoutes.productionReportList} className="btn btn-outline btn-sm">
                  Label List
                </Link>
              </div>
            </div>
          ) : null}
          {activeFilter === 'liveMenu' ? (
            <div className="space-y-1">
              <p className="text-sm text-gray-500 dark:text-gray-400">This week upcoming days: customer menu selection data and order projections.</p>
              <p className="text-xs text-gray-400">Becomes visible after menu goes live (e.g. Wednesday next week).</p>
            </div>
          ) : null}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <button
          type="button"
          onClick={() => setActiveFilter('sales')}
          className={`card text-left transition-colors ${activeFilter === 'sales' ? 'ring-2 ring-primary' : 'hover:bg-gray-50 dark:hover:bg-gray-800'}`}
        >
          <div className="card-body flex items-center gap-4">
            <div className="rounded-lg bg-primary/10 p-3">
              <BarChart3 className="h-8 w-8 text-primary" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Sales</p>
              <p className="text-2xl font-bold">—</p>
              <p className="text-xs text-gray-400">Connect API for live data</p>
            </div>
          </div>
        </button>

        <button
          type="button"
          onClick={() => setActiveFilter('rating')}
          className={`card text-left transition-colors ${activeFilter === 'rating' ? 'ring-2 ring-success' : 'hover:bg-gray-50 dark:hover:bg-gray-800'}`}
        >
          <div className="card-body flex items-center gap-4">
            <div className="rounded-lg bg-success/10 p-3">
              <Star className="h-8 w-8 text-success" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Rating</p>
              <p className="text-2xl font-bold">—</p>
              <p className="text-xs text-gray-400">Customer recipe ratings</p>
            </div>
          </div>
        </button>

        <button
          type="button"
          onClick={() => setActiveFilter('production')}
          className={`card text-left transition-colors ${activeFilter === 'production' ? 'ring-2 ring-warning' : 'hover:bg-gray-50 dark:hover:bg-gray-800'}`}
        >
          <div className="card-body flex items-center gap-4">
            <div className="rounded-lg bg-warning/10 p-3">
              <Package className="h-8 w-8 text-warning" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Production</p>
              <p className="text-2xl font-bold">—</p>
              <p className="text-xs text-gray-400">Meals prepared / planned</p>
            </div>
          </div>
        </button>

        <button
          type="button"
          onClick={() => setActiveFilter('liveMenu')}
          className={`card text-left transition-colors ${activeFilter === 'liveMenu' ? 'ring-2 ring-info' : 'hover:bg-gray-50 dark:hover:bg-gray-800'}`}
        >
          <div className="card-body flex items-center gap-4">
            <div className="rounded-lg bg-info/10 p-3">
              <Calendar className="h-8 w-8 text-info" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Live Menu</p>
              <p className="text-2xl font-bold">—</p>
              <p className="text-xs text-gray-400">Upcoming days selection & projections</p>
            </div>
          </div>
        </button>
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

      <div className="mt-6 card">
        <div className="card-header">
          <h3 className="text-lg font-semibold">Weekly Cycle</h3>
        </div>
        <div className="card-body grid grid-cols-1 gap-3 lg:grid-cols-2">
          <StatusCard title="Mon–Fri: Menu Update" description='Update recipes and "Save & Finalize" next week’s menu.' statusColor="#FFB905" dotShadowColor="rgba(255,185,5,0.2)" />
          <StatusCard title="Fri 12:00 noon: Menu Finalization" description="Molt Admin reviews vendor submissions and approves." statusColor="#3B82F6" dotShadowColor="rgba(59,130,246,0.2)" />
          <StatusCard title="Wed (next week): Menu goes Live" description="Order projections become visible on the dashboard." statusColor="#10B981" dotShadowColor="rgba(16,185,129,0.2)" />
          <StatusCard
            title="Wed–Sat 12:00 noon: Order Tracking"
            description="Track live orders and production numbers for delivery cycle."
            statusColor="#8B5CF6"
            dotShadowColor="rgba(139,92,246,0.2)"
          />
          <StatusCard
            title="Sat 12:00 noon: Order Finalization"
            description='Production reports generated; print "powered by molt" labels.'
            statusColor="#EF4444"
            dotShadowColor="rgba(239,68,68,0.2)"
            className="lg:col-span-2"
          />
        </div>
      </div>
    </div>
  )
}

export default VendorDashboard
