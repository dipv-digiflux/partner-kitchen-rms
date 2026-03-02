import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'

// Perfect Scrollbar
import 'react-perfect-scrollbar/dist/css/styles.css'

// Tailwind css
import './tailwind.css'

// i18n (needs to be bundled)
import './i18n'

// Router
import { RouterProvider } from 'react-router-dom'
import router from './router/index'

// TanStack React Query
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

// Migrated Providers and Components
import { QueryProvider } from '@/lib/providers/QueryProvider'
import { ThemeProvider } from '@/lib/providers/ThemeProvider'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Suspense>
      <QueryProvider>
        <ThemeProvider>
          <ReactQueryDevtools initialIsOpen={false} />
          <RouterProvider router={router} />
          <ToastContainer />
        </ThemeProvider>
      </QueryProvider>
    </Suspense>
  </React.StrictMode>,
)
