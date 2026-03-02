import border from '@/assets/svg/border.svg'
import meeting from '@/assets/svg/meeting.svg'
import reqired from '@/assets/svg/reqired.svg'
import verificationCall from '@/assets/svg/verification-call.svg'
import { Button } from '@/components/core/Button/Button'
import StatusCard from '@/components/core/Cards/StatusCard'
import { FormField } from '@/components/crud/commonHelper/formValidation/FormField'
import SplitLayout from '@/components/layouts/SplitLayout'
import TestimonialCard from '@/components/onBoarding/right-sections/TestimonialCard'
import { appRoutes } from '@/lib/utils/routes'
import { translation } from '@/lib/utils/translations'
import { Calendar, Check } from 'lucide-react'
import { FormProvider, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

const VerifyUser = () => {
  const navigate = useNavigate()
  const methods = useForm()
  const topButton = (
    <Button
      variant="primary"
      outline
      rounded
      title="15-Minute Call"
      startIcon={<img src={meeting} alt="Meeting" className="w-3 h-3" />}
      className="bg-white/10 border-white/30 text-white hover:bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm"
    />
  )

  return (
    <SplitLayout
      image={verificationCall}
      className="bg-white"
      rightSection={
        <TestimonialCard
          description={translation.COACH_TESTIMONIAL}
          userName="Elena Rodriguez"
          userTitle="Freelance Yoga & HIIT Coach"
          userImage="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1888&auto=format&fit=crop"
          topChildren={topButton}
          userImageAlt="Elena Rodriguez"
        />
      }
      imageClassName="object-top"
    >
      <div className="w-full grid grid-cols-12 px-6 h-full content-start">
        <div className="col-span-12 md:col-span-10 md:col-start-2 xl:col-span-9 xl:col-start-2">
          <div className="w-16 h-16 bg-[#FFF9EA] rounded-full flex items-center justify-center mb-6">
            <img src={reqired} alt="Verification Required" width={64} height={64} />
          </div>

          <h1 className="fs-28 font-bold mb-3">{translation.VERIFICATION_REQUIRED}</h1>
          <p className="fs-15 font-normal text-icon-secondary-disabled mb-8">{translation.VERIFICATION_REQUIRED_DESCRIPTION}</p>

          <FormProvider {...methods}>
            <form className="mb-8">
              <div className="grid grid-cols-2 gap-5 mb-5">
                <FormField
                  name="fullName"
                  type="text"
                  label="Full Name"
                  placeholder="e.g. Sarah Miller"
                  validateRule={{ required: true }}
                />
                <FormField
                  name="email"
                  type="email"
                  label="Email Address"
                  placeholder="name@example.com"
                  validateRule={{ required: true }}
                />
              </div>
              <div className="w-1/2 pr-2.5">
                <FormField
                  name="phone"
                  type="tel"
                  label="Phone Number"
                  placeholder="+1 (555) 000-0000"
                  validateRule={{ required: true }}
                />
              </div>
            </form>
          </FormProvider>
          <StatusCard title={translation.ACCOUNT_STATUS_PENDING} description={translation.ACCOUNT_STATUS_PENDING_DESC} className="mb-7" />

          <Button className="w-full" variant="primary" title={translation.BOOK_VERIFICATION_CALL} startIcon={<Calendar className="w-5 h-5" />}
            onClick={() => navigate(appRoutes.bookingSchedule)}
          />

          <div className="text-center mt-4 mb-10">
            <Button variant="text" className="text-sm" title={translation.ILL_DO_THIS_LATER}
              onClick={() => navigate(appRoutes.home)}
            />
          </div>

          <div className="space-y-5 pt-6 border-t border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                <Check className="w-3.5 h-3.5 text-green-600" />
              </div>
              <span className="text-text-secondary-disabled font-medium line-through decoration-icon-secondary-disabled fs-14">{translation.CREATE_ACCOUNT}</span>
            </div>
            <div className="flex items-center gap-3">
              <img src={border} alt="Video Verification" className="w-6 h-6" />
              <span className="font-semibold text-gray-900">{translation.VIDEO_VERIFICATION}</span>
            </div>
          </div>
        </div>
      </div>
    </SplitLayout>
  )
}

export default VerifyUser
