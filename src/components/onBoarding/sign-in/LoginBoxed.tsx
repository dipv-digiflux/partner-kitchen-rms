import { Button } from '@/components/core/Button/Button'
import { FormField } from '@/components/crud/commonHelper/formValidation/FormField'
import { commonAjax } from '@/components/crud/commonCrud/commonAjax'
import { setData } from '@/lib/auth/auth'
import { showToast } from '@/lib/utils/toast'
import { appRoutes } from '@/lib/utils/routes'
import { AxiosError } from 'axios'
import { Lock, Mail } from 'lucide-react'
import { FormProvider, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'

type LoginFormValues = {
  email: string
  password: string
}

const LoginBoxed = () => {
  const methods = useForm<LoginFormValues>()
  const navigate = useNavigate()

  const authenticateMutation = useMutation({
    mutationKey: ['authenticate'],
    mutationFn: async (payload: LoginFormValues) => {
      return await commonAjax<LoginFormValues, unknown>({
        url: '/authenticate',
        type: 'POST',
        data: payload,
      })
    },
    onSuccess: (res) => {
      const token =
        (res as { token?: string })?.token ??
        (res as { accessToken?: string })?.accessToken ??
        (res as { data?: { token?: string; accessToken?: string } })?.data?.token ??
        (res as { data?: { token?: string; accessToken?: string } })?.data?.accessToken

      if (token) setData({ token })

      navigate(appRoutes.home)
    },
    onError: (err) => {
      const axiosMessage = (err as AxiosError<{ message?: string }>).response?.data?.message
      showToast.error(axiosMessage || 'Invalid email or password')
    },
  })

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
                authenticateMutation.mutate(data)
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
                isLoading={authenticateMutation.isPending}
                disabled={authenticateMutation.isPending}
              />
            </form>
          </FormProvider>
        </div>
      </div>
    </div>
  )
}

export default LoginBoxed
