import { translation } from '@/lib/utils/translations'

const VerificationTestimonial = () => {
    return (
        <div className="bg-white rounded-lg p-8 shadow-sm">
            <blockquote className="fs-20 font-medium leading-8 text-neutral-950 mb-3">
                {translation.VERIFICATION_TESTIMONIAL}
            </blockquote>

            <div className="flex flex-col">
                <span className="font-semibold fs-14 text-icon-secondary-disabled">Sarah Jenkins, Certified Nutrition Coach</span>
            </div>
        </div>
    )
}

export default VerificationTestimonial
