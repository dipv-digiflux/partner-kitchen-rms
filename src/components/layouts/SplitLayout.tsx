import moltLogo from '@/assets/svg/molt.svg'
import React from 'react'

interface SplitLayoutProps {
  image: string
  children: React.ReactNode
  rightSection?: React.ReactNode
  imageClassName?: string
}

const SplitLayout = ({ image, children, className, rightSection, imageClassName }: SplitLayoutProps & { className?: string }) => {
  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-[40%_60%] font-inter">
      <div className={`flex flex-col min-h-screen bg-white relative ${className}`}>
        <div className="p-6 sm:p-8">
          <div className="flex items-center gap-3">
            <img src={moltLogo} alt="Molt Logo" width={100} height={100} />
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center p-4 sm:p-0">{children}</div>
      </div>
      <div className="hidden md:block relative h-full w-full">
        <img src={image} alt="Visual" className={`absolute inset-0 w-full h-full object-cover ${imageClassName}`} />
        {rightSection ? (
          <div className="absolute inset-x-0 bottom-0 p-12" style={{ background: 'linear-gradient(0deg, rgba(15, 23, 42, 0.9) 0%, rgba(15, 23, 42, 0) 100%)' }}>
            {rightSection}
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default SplitLayout
