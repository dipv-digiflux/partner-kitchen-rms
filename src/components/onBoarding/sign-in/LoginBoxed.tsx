import loginImage from '@/assets/svg/login.svg'
import { Button } from '@/components/core/Button/Button'
import { FormField } from '@/components/crud/commonHelper/formValidation/FormField'
import SplitLayout from '@/components/layouts/SplitLayout'
import OneStepCloser from '@/components/onBoarding/right-sections/OneStepCloser'
import { appRoutes } from '@/lib/utils/routes'
import { translation } from '@/lib/utils/translations'
import { ArrowRight, ShieldCheck, User } from 'lucide-react'
import { FormProvider, useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'

const LoginBoxed = () => {
  const methods = useForm()

  const navigate = useNavigate()

  return (
    <SplitLayout image={loginImage} className="bg-white" rightSection={<OneStepCloser />}>
      <div className="w-full grid grid-cols-12 px-6 h-full content-start pt-20">
        <div className="col-span-12 md:col-span-10 md:col-start-2 xl:col-span-9 xl:col-start-2">
          <div className="bg-white border border-border-gray-00000014 rounded-2xl p-7 shadow-sm">
            <div className="mb-8">
              <h1 className="fs-22 font-semibold">{translation.SIGN_IN_TO_MOLT}</h1>
              <p className="text-icon-secondary-disabled font-normal fs-14 max-w-[480px]">{translation?.LOGIN_DESCRIPTION}</p>
            </div>

            <FormProvider {...methods}>
              <form
                onSubmit={methods.handleSubmit((data) => {
                  console.log(data)
                  navigate(appRoutes.home)
                })}
              >
                <div>
                  <FormField
                    name="emailOrPhone"
                    type="text"
                    placeholder="name@example.com or +1 555 000 0000"
                    startIcon={<User className="w-5 h-5 text-gray-400" />}
                    className="w-full"
                    label={translation.EMAIL_OR_PHONE_NUMBER}
                    validateRule={{ required: true }}
                  />
                </div>

                <Button
                  className="w-full bg-black hover:bg-gray-800 text-white flex items-center justify-center gap-2 py-2.5 rounded-lg mt-4 mb-2"
                  endIcon={<ArrowRight className="w-4 h-4" />}
                  title={translation.CONTINUE_WITH_OTP}
                />

                <div className="bg-gray-50 text-gray-500 text-xs px-3 rounded flex items-center gap-2 w-fit">
                  <ShieldCheck className="w-3.5" />
                  {translation.SECURE_OTP_AUTHENTICATION}
                </div>
              </form>
            </FormProvider>

            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">{translation.OR_CONTINUE_WITH}</span>
              </div>
            </div>

            <div className="space-y-3">
              <button
                type="button"
                className="w-full border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 font-medium py-2.5 rounded-lg flex items-center justify-center gap-2 transition-colors"
              >
                <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
                {translation.CONTINUE_WITH_GOOGLE}
              </button>
              <button
                type="button"
                className="w-full border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 font-medium py-2.5 rounded-lg flex items-center justify-center gap-2 transition-colors"
              >
                <img src="https://www.svgrepo.com/show/511330/apple-173.svg" alt="Apple" className="w-5 h-5" />
                {translation.CONTINUE_WITH_APPLE}
              </button>
            </div>

            <div className="mt-8 text-start text-icon-secondary-disabled">
              <p className="fs-11 leading-none tracking-normal font-normal">
                {translation.BY_CONTINUING_AGREE} <span className="underline cursor-pointer hover:text-gray-700">{translation.TERMS_OF_SERVICE}</span> {translation.AND}{' '}
                <span className="underline cursor-pointer hover:text-gray-700">{translation.PRIVACY_POLICY}</span>.
              </p>
            </div>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                {translation.DONT_HAVE_AN_ACCOUNT}{' '}
                <Link to={appRoutes.signup} className="text-text-secondary-active font-semibold hover:underline">
                  {translation.SIGN_UP}
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </SplitLayout>
  )
}

export default LoginBoxed
