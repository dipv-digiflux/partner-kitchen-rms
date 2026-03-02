import { ReactNode } from 'react'

export interface TestimonialCardProps {
  /** The testimonial quote/description */
  description: string
  /** Name of the person giving the testimonial */
  userName: string
  /** Title/role of the person */
  userTitle: string
  /** URL of the user's profile image */
  userImage: string
  /** Custom content to display at the top (e.g., stars or button) */
  topChildren?: ReactNode
  /** Alt text for the user image */
  userImageAlt?: string
}

/**
 * Reusable TestimonialCard component for displaying user testimonials.
 * Supports custom top content (stars, buttons, etc.) via topChildren prop.
 */
const TestimonialCard = ({ description, userName, userTitle, userImage, topChildren, userImageAlt }: TestimonialCardProps) => {
  return (
    <div className="text-white w-full">
      {topChildren ? <div className="mb-4">{topChildren}</div> : null}

      <blockquote className="fs-24 font-medium leading-8 mb-6">{`"${description}"`}</blockquote>

      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full overflow-hidden border border-white/30">
          <img src={userImage} alt={userImageAlt || userName} className="w-full h-full object-cover" />
        </div>
        <div>
          <div className="font-semibold fs-16">{userName}</div>
          <p className="text-white/80 fs-13 font-normal leading-tight mt-0.5">{userTitle}</p>
        </div>
      </div>
    </div>
  )
}

export default TestimonialCard
