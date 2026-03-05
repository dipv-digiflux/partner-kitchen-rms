import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { ModuleContext } from '@/lib/context/ModuleContext'
import { ModuleBreadCrumbProps } from '@/types/components.types'

export function ModuleBreadCrumb({ pageTitle, breadCrumbs = [], children }: ModuleBreadCrumbProps) {
  const api = useContext(ModuleContext)
  const title = pageTitle ?? api?.pageTitle ?? ''
  return (
    <div className="flex flex-wrap mb-4 gap-2 justify-between items-center">
      <div>
        <h4 className="mb-1.5 font-semibold text-base text-heading">{title}</h4>
        <ol className="flex items-center gap-1.5 text-xs font-medium text-gray-500">
          <li>
            <Link to="/" className="hover:text-primary">
              Home
            </Link>
          </li>
          {breadCrumbs.map(({ name, link }, index) => (
            <React.Fragment key={index}>
              <li className="before:content-['-'] before:mr-1.5 before:text-gray-400">
                {link ? (
                  <Link to={link} className="hover:text-primary">
                    {name}
                  </Link>
                ) : (
                  <span>{name}</span>
                )}
              </li>
            </React.Fragment>
          ))}
          <li className="before:content-['-'] before:mr-1.5 before:text-gray-400 text-primary">{title}</li>
        </ol>
      </div>
      <div className="flex items-center gap-2">{children}</div>
    </div>
  )
}
