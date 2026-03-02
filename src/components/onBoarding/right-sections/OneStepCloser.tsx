import growthArrow from '@/assets/svg/growth-arrow.svg'
import { translation } from '@/lib/utils/translations'

const OneStepCloser = () => {
  return (
    <div className="text-white">
      <h2 className="text-white text-3xl font-bold mb-3">{translation.ONE_STEP_CLOSER}</h2>
      <p className="text-gray-300 text-sm mb-8 leading-relaxed max-w-[60%]">{translation.VERIFY_DESCRIPTION}</p>

      <div className="flex items-center gap-4 w-fit">
        <div className="bg-white/10 backdrop-blur-md w-14 h-14 rounded-2xl flex items-center justify-center">
          <img src={growthArrow} alt="Growth" className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-3xl font-bold text-white leading-none mb-1">3,500+</h3>
          <p className="text-white/80 text-sm font-normal">{translation.COACHES_VERIFIED}</p>
        </div>
      </div>
    </div>
  )
}

export default OneStepCloser
