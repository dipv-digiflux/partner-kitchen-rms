import { privateHookStore } from '@/lib/utils/hookStore'
import { Outlet, useNavigate } from 'react-router-dom'

export const HookExportProvider = () => {
  // add navigate hook for outside use
  const navigate = useNavigate()

  // eslint-disable-next-line react-hooks/immutability
  privateHookStore.navigate = navigate

  return <Outlet />
}
