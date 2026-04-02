import { ModuleBreadCrumb } from '@/components/ModuleBreadCrumb'
import { appRoutes } from '@/lib/utils/routes'
import { Link } from 'react-router-dom'
import { Shield, Users } from 'lucide-react'

const UserManagement = () => {
  return (
    <div>
      <ModuleBreadCrumb pageTitle="Users & Permissions" />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Link to={appRoutes.user} className="card hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
          <div className="card-body flex items-center gap-4">
            <div className="rounded-lg bg-primary/10 p-3">
              <Users className="h-8 w-8 text-primary" />
            </div>
            <div>
              <p className="text-lg font-semibold">Users</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Create and manage users under your vendor kitchen.</p>
            </div>
          </div>
        </Link>

        <Link to={appRoutes.permissions} className="card hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
          <div className="card-body flex items-center gap-4">
            <div className="rounded-lg bg-success/10 p-3">
              <Shield className="h-8 w-8 text-success" />
            </div>
            <div>
              <p className="text-lg font-semibold">Permissions</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Manage roles/permissions and access control.</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default UserManagement
