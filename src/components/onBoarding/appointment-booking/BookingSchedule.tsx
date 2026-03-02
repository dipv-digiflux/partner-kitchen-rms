import bookingScheduleImage from '@/assets/svg/booking-schedule.svg'
import SplitLayout from '@/components/layouts/SplitLayout'
import CoachTestimonial from '@/components/onBoarding/right-sections/CoachTestimonial'
import { InlineWidget } from 'react-calendly'

const BookingSchedule = () => {
    const calendlyUrl = import.meta.env.VITE_CALENDLY_URL;
    return (
        <SplitLayout image={bookingScheduleImage} className="bg-white" rightSection={<CoachTestimonial />}>
            <div className="w-full max-w-[1060px] px-4">
                <div
                    className="w-full overflow-hidden relative mt-6"
                    style={{ height: '680px' }}
                >
                    <InlineWidget
                        url={calendlyUrl}
                        styles={{
                            width: '90%',
                            height: '100%',
                            marginTop: '-60px',
                        }}
                        pageSettings={{
                            backgroundColor: 'ffffff',
                            hideEventTypeDetails: true,
                            hideLandingPageDetails: true,
                            primaryColor: '0EA5A4',
                            textColor: '0e1013',
                        }}
                    />
                </div>
            </div>
        </SplitLayout >
    )
}

export default BookingSchedule