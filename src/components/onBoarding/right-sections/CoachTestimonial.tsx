import { translation } from '@/lib/utils/translations'
import { Star } from 'lucide-react'
import TestimonialCard from './TestimonialCard'

const CoachTestimonial = () => {
  const stars = (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star key={star} className="w-5 h-5 fill-[#FFB905] text-[#FFB905]" />
      ))}
    </div>
  )

  return (
    <TestimonialCard
      description={translation.COACH_TESTIMONIAL}
      userName="Elena Rodriguez"
      userTitle="Freelance Yoga & HIIT Coach"
      userImage="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1888&auto=format&fit=crop"
      topChildren={stars}
      userImageAlt="Elena Rodriguez"
    />
  )
}

export default CoachTestimonial
