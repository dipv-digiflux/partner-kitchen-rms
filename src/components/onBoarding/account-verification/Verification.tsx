import moltArtImage from '@/assets/svg/molt-art.svg'
import { BackButton } from '@/components/core/Button/BackButton'
import { Button } from '@/components/core/Button/Button'
import { FormField } from '@/components/crud/commonHelper/formValidation/FormField'
import SplitLayout from '@/components/layouts/SplitLayout'
import VerificationTestimonial from '@/components/onBoarding/right-sections/VerificationTestimonial'
import { appRoutes } from '@/lib/utils/routes'
import { translation } from '@/lib/utils/translations'
import { FormProvider, useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'

const Verification = () => {
    const navigate = useNavigate()
    const methods = useForm({
        defaultValues: {
            otp: ''
        },
        mode: 'onChange'
    })

    const { handleSubmit } = methods

    const onSubmit = (data: { otp: string }) => {
        console.log('OTP Submitted:', data)
    }

    return (
        <SplitLayout image={moltArtImage} className="bg-white" rightSection={<VerificationTestimonial />}>
            <div className="w-full grid grid-cols-12 px-6 h-full content-start pt-20">
                <div className="col-span-12 md:col-span-10 md:col-start-2 xl:col-span-9 xl:col-start-2">
                    <div className="mb-6">
                        <BackButton to="/login" text={translation.BACK_TO_LOGIN} />
                    </div>

                    {/* Header */}
                    <div className="mb-10">
                        <h1 className="fs-30 font-bold">{translation.CHECK_YOUR_EMAIL}</h1>
                        <p className="text-icon-secondary-disabled font-normal fs-16">
                            {translation.SENT_VERIFICATION_CODE}
                            <br />
                            <span className="text-text-primary-default font-bold mt-1 block">coach@molt.com</span>
                        </p>
                    </div>

                    <FormProvider {...methods}>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="mb-6">
                                <FormField
                                    name="otp"
                                    type="otp"
                                    validateRule={{ required: true }}
                                />
                            </div>

                            <Button
                                variant='primary'
                                className="w-full mb-6"
                                title={translation.VERIFY_CODE}
                                type="submit"
                                onClick={() => navigate(appRoutes.verifyUser)}
                            />
                        </form>
                    </FormProvider>

                    <div className="text-center">
                        <p className="text-icon-secondary-disabled fs-14 font-normal">
                            {translation.DIDNT_RECEIVE_CODE} <span className="text-text-primary-default cursor-pointer font-bold hover:underline">{translation.CLICK_TO_RESEND}</span>
                        </p>
                    </div>

                    {/* Footer */}
                    <div className="mt-24 md:absolute md:bottom-8 md:left-8">
                        <div className="flex items-center gap-1 text-icon-secondary-disabled fs-12">
                            <span>{translation.COPYRIGHT_MOLT}</span>
                            <Link to="#" className="underline hover:text-text-primary-default">{translation.PRIVACY_POLICY}</Link>
                            <span>&</span>
                            <Link to="#" className="underline hover:text-text-primary-default">{translation.TERMS_OF_SERVICE}</Link>
                        </div>
                    </div>
                </div>
            </div>
        </SplitLayout>
    )
}

export default Verification
