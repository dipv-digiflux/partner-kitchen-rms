import { useThemeConfig, useThemeConfigStore } from '@/lib/hooks/useThemeConfig'
import { Fragment, useEffect, useState } from 'react'
import AnimateHeight from 'react-animate-height'
import { useTranslation } from 'react-i18next'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { NavLink, useLocation } from 'react-router-dom'
import IconCaretDown from '../../assets/Icon/IconCaretDown'
import IconCaretsDown from '../../assets/Icon/IconCaretsDown'
import IconMinus from '../../assets/Icon/IconMinus'
import moltLogo from '../../assets/svg/molt.svg'
import { MENU_DATA } from '../../router/menuData'
import { toggleSidebar } from '../../store/themeConfigSlice'
import { hasUserPermission } from '@/components/crud/commonHelper/PermissionsCheck'

const DESKTOP_BREAKPOINT = 1024

const Sidebar = () => {
  const [currentMenu, setCurrentMenu] = useState<string>('')
  const [subOpen, setSubOpen] = useState<{ [key: string]: boolean }>({})
  const [isDesktop, setIsDesktop] = useState(() => typeof window !== 'undefined' && window.innerWidth >= DESKTOP_BREAKPOINT)
  const themeConfig = useThemeConfigStore()
  const semidark = useThemeConfig((state) => state.semidark)
  const location = useLocation()
  const { t } = useTranslation()

  // In horizontal mode, always show full sidebar (not collapsed) when it's open
  // themeConfig.sidebar = true means collapsed/hidden, false means open/visible
  const isHorizontal = themeConfig.menu === 'horizontal'
  const isCollapsed = isHorizontal ? false : themeConfig.sidebar
  // On mobile, sidebar is always full width (260px) when open; only desktop can show small (70px)
  const isCollapsedForWidth = isCollapsed && isDesktop

  useEffect(() => {
    const onResize = () => setIsDesktop(window.innerWidth >= DESKTOP_BREAKPOINT)
    window.addEventListener('resize', onResize)
    onResize()
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const toggleMenu = (value: string) => {
    if (isCollapsedForWidth) return // Disable toggling in mini mode (desktop only)
    setCurrentMenu((oldValue) => (oldValue === value ? '' : value))
  }

  const toggleSubMenu = (label: string) => {
    if (isCollapsedForWidth) return // Disable toggling in mini mode (desktop only)
    setSubOpen((prev) => ({ ...prev, [label]: !prev[label] }))
  }

  useEffect(() => {
    const activePath = location.pathname
    let foundMenuId = ''
    const foundSubLabels: string[] = []

    MENU_DATA.forEach((section) => {
      section.items.forEach((item) => {
        if (item.path === activePath) {
          foundMenuId = item.id
        }
        if (item.subItems) {
          item.subItems.forEach((sub) => {
            if (sub.path === activePath) {
              foundMenuId = item.id
              foundSubLabels.push(sub.label)
            }
            if (sub.subItems) {
              sub.subItems.forEach((sub2) => {
                if (sub2.path === activePath) {
                  foundMenuId = item.id
                  foundSubLabels.push(sub.label)
                  foundSubLabels.push(sub2.label)
                }
              })
            }
          })
        }
      })
    })

    if (foundMenuId) {
      setCurrentMenu(foundMenuId)
    }
    if (foundSubLabels.length > 0) {
      setSubOpen((prev) => {
        const next = { ...prev }
        foundSubLabels.forEach((label) => {
          next[label] = true
        })
        return next
      })
    }
  }, [location.pathname])

  useEffect(() => {
    if (window.innerWidth < 1024 && themeConfig.sidebar) {
      toggleSidebar()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location])

  const renderSubItems = (items: NonNullable<(typeof MENU_DATA)[number]['items'][number]['subItems']>) => (
    <ul className="sub-menu text-gray-500">
      {items.map((sub, idx) => (
        <li key={idx} className={sub.subItems ? 'menu nav-item' : ''}>
          {sub.subItems ? (
            <>
              <button
                type="button"
                className={`${subOpen[sub.label] ? 'open' : ''} w-full before:bg-gray-300 before:w-[5px] before:h-[5px] before:rounded ltr:before:mr-2 rtl:before:ml-2 dark:text-[#888ea8] hover:bg-gray-100 dark:hover:bg-gray-900 transition-all duration-300 p-2`}
                onClick={() => toggleSubMenu(sub.label)}
              >
                {t(sub.label)}
                <div className={`${subOpen[sub.label] ? 'rtl:rotate-90 -rotate-90' : ''} ltr:ml-auto rtl:mr-auto`}>
                  <IconCaretsDown fill={true} className="w-4 h-4" />
                </div>
              </button>
              <AnimateHeight duration={300} height={!isCollapsedForWidth && subOpen[sub.label] ? 'auto' : 0}>
                {renderSubItems(sub.subItems)}
              </AnimateHeight>
            </>
          ) : (
            <NavLink to={sub.path} target={sub.target} className="nav-link" viewTransition>
              {t(sub.label)}
            </NavLink>
          )}
        </li>
      ))}
    </ul>
  )

  return (
    <div className={semidark ? 'dark' : ''}>
      {/* Backdrop for closing sidebar on outside click */}
      {isHorizontal && themeConfig.sidebar ? <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => toggleSidebar()} /> : null}
      <nav
        className={`sidebar fixed min-h-screen h-full top-0 bottom-0 shadow-[5px_0_25px_0_rgba(94,92,154,0.1)] z-50 transition-all duration-300 ${semidark ? 'text-white-dark' : ''} ${
          isCollapsedForWidth ? 'w-[70px]' : 'w-[260px]'
        }`}
        style={isHorizontal ? { width: '260px' } : undefined}
      >
        <div className="bg-white dark:bg-black h-full flex flex-col">
          <div className="flex justify-between items-center px-4 py-3">
            <NavLink to="/" className={`main-logo flex items-center shrink-0 ${isCollapsedForWidth ? 'justify-center w-full' : ''}`} viewTransition>
              <img className={`${isCollapsedForWidth ? 'w-8' : 'w-24'} h-auto object-contain transition-all duration-300`} src={moltLogo} alt="logo" />
            </NavLink>

            <button
              type="button"
              className="collapse-icon w-8 h-8 rounded-full items-center hover:bg-gray-500/10 dark:hover:bg-dark-light/10 dark:text-white-light transition duration-300 rtl:rotate-180 hidden lg:flex"
              onClick={() => toggleSidebar()}
              aria-label="Toggle sidebar size"
            >
              <IconCaretsDown className="m-auto rotate-90" />
            </button>
          </div>
          <PerfectScrollbar className="flex-1 overflow-hidden overflow-x-hidden relative">
            <ul className="relative font-semibold space-y-0.5 p-4 py-0">
              {MENU_DATA.map((section, idx) => (
                <Fragment key={idx}>
                  {section.label ? (
                    <h2 className="py-3 px-7 flex items-center uppercase font-bold text-xs text-gray-500 -mx-4 mb-1">
                      <IconMinus className={`w-4 h-5 flex-none ${isCollapsedForWidth ? '' : 'hidden'}`} />
                      <span className={isCollapsedForWidth ? 'hidden' : ''}>{t(section.label)}</span>
                    </h2>
                  ) : null}
                  {section.items
                    .filter((item) => {
                      // Dashboard is always visible.
                      if (item.id === 'dashboard') return true
                      // CRUD menu items: hide if user lacks 'view' permission.
                      return hasUserPermission({ apiName: item.id, type: 'view' })
                    })
                    .map((item) => (
                      <li className="menu nav-item" key={item.id}>
                        {item.subItems ? (
                          <>
                            <button
                              type="button"
                              className={`${
                                currentMenu === item.id ? 'active bg-gray-100 dark:bg-gray-800 text-black dark:text-white-light' : ''
                              } nav-link group w-full hover:bg-gray-50 dark:hover:bg-gray-900 rounded-md p-2`}
                              onClick={() => toggleMenu(item.id)}
                            >
                              <div className={`flex items-center ${isCollapsedForWidth ? 'justify-center' : ''}`}>
                                <item.icon
                                  className={`shrink-0 ${
                                    currentMenu === item.id ? 'text-black dark:text-white-light' : 'text-gray-500 dark:text-gray-400 group-hover:text-black dark:group-hover:text-white-light'
                                  }`}
                                />
                                <span
                                  className={`ltr:pl-3 rtl:pr-3 ${
                                    currentMenu === item.id
                                      ? 'text-black dark:text-white-light font-medium'
                                      : 'text-gray-600 dark:text-gray-400 group-hover:text-black dark:group-hover:text-white-light'
                                  } ${isCollapsedForWidth ? 'hidden' : ''}`}
                                >
                                  {t(item.label)}
                                </span>
                              </div>

                              <div className={`${currentMenu !== item.id ? 'rtl:rotate-90 -rotate-90' : ''} ${isCollapsedForWidth ? 'hidden' : ''}`}>
                                <IconCaretDown />
                              </div>
                            </button>

                            <AnimateHeight duration={300} height={!isCollapsedForWidth && currentMenu === item.id ? 'auto' : 0}>
                              {renderSubItems(item.subItems)}
                            </AnimateHeight>
                          </>
                        ) : (
                          <NavLink to={item.path!} className="nav-link group w-full hover:bg-gray-50 dark:hover:bg-gray-900 rounded-md p-2" viewTransition>
                            <div className={`flex items-center ${isCollapsedForWidth ? 'justify-center' : ''}`}>
                              <item.icon className={`shrink-0 text-gray-500 dark:text-gray-400 group-hover:text-black dark:group-hover:text-white-light ${isCollapsedForWidth ? 'mx-auto' : ''}`} />
                              <span className={`ltr:pl-3 rtl:pr-3 text-gray-600 dark:text-gray-400 group-hover:text-black dark:group-hover:text-white-light ${isCollapsedForWidth ? 'hidden' : ''}`}>
                                {t(item.label)}
                              </span>
                            </div>
                          </NavLink>
                        )}
                      </li>
                    ))}
                </Fragment>
              ))}
            </ul>
          </PerfectScrollbar>
          {/* <div className="border-t border-gray-200 dark:border-gray-700 p-4">
            <div className={`flex items-center gap-3 ${isCollapsedForWidth ? 'justify-center' : ''}`}>
              <img className="w-10 h-10 rounded-full object-cover" src="/assets/images/user-profile.jpeg" alt="profile" />
              <div className={`flex-1 overflow-hidden ${isCollapsedForWidth ? 'hidden' : ''}`}>
                <h4 className="text-sm font-semibold text-black dark:text-white truncate">John Doe</h4>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">johndoe@gmail.com</p>
              </div>
              <button type="button" className={`text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 ${isCollapsedForWidth ? 'hidden' : ''}`}>
                <IconCaretsDown className="rotate-90" />
              </button>
            </div>
          </div> */}
        </div>
      </nav>
    </div>
  )
}

export default Sidebar
