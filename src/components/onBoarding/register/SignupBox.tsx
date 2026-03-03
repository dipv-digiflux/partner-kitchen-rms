import coachImage from '@/assets/svg/coach.svg'
import { Button } from '@/components/core/Button/Button'
import { FormField } from '@/components/crud/commonHelper/formValidation/FormField'
import SplitLayout from '@/components/layouts/SplitLayout'
import CoachTestimonial from '@/components/onBoarding/right-sections/CoachTestimonial'
import { appRoutes } from '@/lib/utils/routes'
import { translation } from '@/lib/utils/translations'
import { ShieldCheck } from 'lucide-react'
import { FormProvider, useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

const SignupBox = () => {
  const methods = useForm()

  return (
    <SplitLayout image={coachImage} className="bg-white" rightSection={<CoachTestimonial />}>
      <div className="w-full grid grid-cols-12 px-6 h-full content-start pt-20">
        <div className="col-span-12 md:col-span-10 md:col-start-2 xl:col-span-9 xl:col-start-2">
          <div className="bg-white p-8">
            <div className="mb-8">
              <h1 className="fs-30 font-bold">{translation.REGISTER_AS_A_COACH}</h1>
              <p className="text-icon-secondary-disabled font-normal fs-15 max-w-[480px] my-2">{translation.REGISTER_AS_A_COACH_DESCRIPTION}</p>
            </div>

            <FormProvider {...methods}>
              <form onSubmit={methods.handleSubmit((data) => console.log(data))} className="space-y-5">
                <FormField name="fullName" type="text" placeholder="e.g. Sarah Miller" className="w-full" label="Full Name" validateRule={{ required: true }} />

                <FormField name="email" type="email" placeholder="name@example.com" className="w-full" label="Email Address" validateRule={{ required: true }} />

                <FormField name="phone" type="tel" placeholder="+1 (555) 000-0000" className="w-full" label="Phone Number" validateRule={{ required: true }} />

                <Button className="w-full bg-black hover:bg-gray-800 text-white flex items-center justify-center gap-2 py-3 rounded-lg font-medium" title="Register as a Coach" />

                <div className="bg-surface-secondary-default text-icon-secondary-disabled p-4 rounded-lg flex items-start gap-2 mt-6">
                  <ShieldCheck className="w-5 h-5 shrink-0 mt-0.5 text-icon-primary-disabled" />
                  <div className="font-inter">
                    <span className="font-bold fs-13">{translation.IDENTITY_VERIFICATION_REQUIRED}</span>
                    <span className="font-normal fs-13 ml-1">{translation.IDENTITY_VERIFICATION_REQUIRED_DESCRIPTION}</span>
                  </div>
                </div>
              </form>
            </FormProvider>

            <div className="mt-8 text-center">
              <p className="text-icon-secondary-disabled fs-14 font-normal">
                {translation.ALREADY_HAVE_A_VERIFIED_ACCOUNT}{' '}
                <span className="text-text-secondary-active cursor-pointer font-semibold fs-14 hover:underline">
                  <Link to={appRoutes.login} className="text-text-secondary-active font-semibold hover:underline">
                    {translation.SIGN_IN}
                  </Link>
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </SplitLayout>
  )
}

export default SignupBox
