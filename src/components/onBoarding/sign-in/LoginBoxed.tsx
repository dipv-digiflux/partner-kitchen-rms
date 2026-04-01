import { Button } from '@/components/core/Button/Button'
import { FormField } from '@/components/crud/commonHelper/formValidation/FormField'
import { appRoutes } from '@/lib/utils/routes'
import { Lock, Mail } from 'lucide-react'
import { FormProvider, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

const LoginBoxed = () => {
  const methods = useForm()
  const navigate = useNavigate()

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md">
        <div className="bg-white border border-gray-100 rounded-2xl p-8 shadow-lg transition-shadow duration-300">
          <div className="mb-8 flex flex-col items-center text-center">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-2">Welcome Back</h1>
            <p className="text-sm text-gray-500">Please enter your credentials to sign in.</p>
          </div>

          <FormProvider {...methods}>
            <form
              className="space-y-5"
              onSubmit={methods.handleSubmit((data) => {
                console.log('Login credentials:', data)
                navigate(appRoutes.home)
              })}
            >
              <FormField
                name="email"
                type="email"
                placeholder="name@example.com"
                startIcon={<Mail className="w-5 h-5 text-gray-400" />}
                className="w-full"
                label="Email ID"
                validateRule={{ required: true }}
              />

              <FormField
                name="password"
                type="password"
                placeholder="••••••••"
                startIcon={<Lock className="w-5 h-5 text-gray-400" />}
                className="w-full"
                label="Password"
                validateRule={{ required: true }}
              />

              <Button
                className="w-full bg-black hover:bg-gray-800 text-white font-medium shadow-[0px_4px_12px_rgba(0,0,0,0.1)] hover:shadow-[0px_6px_16px_rgba(0,0,0,0.15)] transition-all duration-300 py-3 rounded-lg mt-6"
                title="Sign In"
                type="submit"
              />
            </form>
          </FormProvider>
        </div>
      </div>
    </div>
  )
}

export default LoginBoxed
