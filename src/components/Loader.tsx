export const Loader = ({ text = '', className = '' }: { text?: string; className?: string }) => {
  return (
    <div className={`absolute inset-0 bg-main-bg/50 dark:bg-main-bg/70  backdrop-blur-[0.5px] center z-50  ${className}`}>
      <div className="flex flex-col items-center justify-center space-y-3 h-full">
        <div className="relative">
          <div className="size-7 rounded-full border-4 border-muted"></div>
          <div className="absolute top-0 left-0 size-7 rounded-full border-4 border-transparent border-t-primary animate-spin"></div>
        </div>
        {text ? <p className="text-base text-gray-700 font-medium text-center">{text}</p> : null}
      </div>
    </div>
  )
}
