import { Input } from '@/components/core/TextInputField/Input'
import { useThemeConfig, useThemeConfigStore } from '@/lib/hooks/useThemeConfig'
import { SubItem } from '@/types/menu.types'
import i18next from 'i18next'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, NavLink, useLocation } from 'react-router-dom'
import IconArrowLeft from '../../assets/Icon/IconArrowLeft'
import IconBellBing from '../../assets/Icon/IconBellBing'
import IconCalendar from '../../assets/Icon/IconCalendar'
import IconCaretDown from '../../assets/Icon/IconCaretDown'
import IconChatNotification from '../../assets/Icon/IconChatNotification'
import IconEdit from '../../assets/Icon/IconEdit'
import IconInfoCircle from '../../assets/Icon/IconInfoCircle'
import IconLaptop from '../../assets/Icon/IconLaptop'
import IconLockDots from '../../assets/Icon/IconLockDots'
import IconLogout from '../../assets/Icon/IconLogout'
import IconMail from '../../assets/Icon/IconMail'
import IconMailDot from '../../assets/Icon/IconMailDot'
import IconMenu from '../../assets/Icon/IconMenu'
import IconMoon from '../../assets/Icon/IconMoon'
import IconSearch from '../../assets/Icon/IconSearch'
import IconSun from '../../assets/Icon/IconSun'
import IconUser from '../../assets/Icon/IconUser'
import IconXCircle from '../../assets/Icon/IconXCircle'
import { MENU_DATA } from '../../router/menuData'
import { toggleRTL, toggleSidebar, toggleTheme } from '../../store/themeConfigSlice'
import Dropdown from '../core/SelectInputField/Dropdown'

const Header = () => {
  const location = useLocation()
  useEffect(() => {
    const selector = document.querySelector('ul.horizontal-menu a[href="' + window.location.pathname + '"]')
    if (selector) {
      selector.classList.add('active')
      const all = document.querySelectorAll('ul.horizontal-menu .nav-link.active')
      for (let i = 0; i < all.length; i++) {
        all[0]?.classList.remove('active')
      }
      const ul = selector.closest('ul.sub-menu')
      if (ul) {
        const ele = ul.closest('li.menu')?.querySelectorAll('.nav-link')
        if (ele && ele.length > 0) {
          const firstEle = ele[0]
          setTimeout(() => {
            firstEle?.classList.add('active')
          })
        }
      }
    }
  }, [location])

  const isRtl = useThemeConfig((state) => state.rtlClass) === 'rtl'
  const themeConfig = useThemeConfigStore()

  function createMarkup(messages: string) {
    return { __html: messages }
  }
  const [messages, setMessages] = useState([
    {
      id: 1,
      image:
        '<span className="grid place-content-center w-9 h-9 rounded-full bg-success-light dark:bg-success text-success dark:text-success-light"><svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg></span>',
      title: 'Congratulations!',
      message: 'Your OS has been updated.',
      time: '1hr',
    },
    {
      id: 2,
      image:
        '<span className="grid place-content-center w-9 h-9 rounded-full bg-info-light dark:bg-info text-info dark:text-info-light"><svg g xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg></span>',
      title: 'Did you know?',
      message: 'You can switch between artboards.',
      time: '2hr',
    },
    {
      id: 3,
      image:
        '<span className="grid place-content-center w-9 h-9 rounded-full bg-danger-light dark:bg-danger text-danger dark:text-danger-light"> <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></span>',
      title: 'Something went wrong!',
      message: 'Send Report',
      time: '2days',
    },
    {
      id: 4,
      image:
        '<span className="grid place-content-center w-9 h-9 rounded-full bg-warning-light dark:bg-warning text-warning dark:text-warning-light"><svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">    <circle cx="12" cy="12" r="10"></circle>    <line x1="12" y1="8" x2="12" y2="12"></line>    <line x1="12" y1="16" x2="12.01" y2="16"></line></svg></span>',
      title: 'Warning',
      message: 'Your password strength is low.',
      time: '5days',
    },
  ])

  const removeMessage = (value: number) => {
    setMessages(messages.filter((user) => user.id !== value))
  }

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      profile: 'user-profile.jpeg',
      message: '<strong className="text-sm mr-1">John Doe</strong>invite you to <strong>Prototyping</strong>',
      time: '45 min ago',
    },
    {
      id: 2,
      profile: 'profile-34.jpeg',
      message: '<strong className="text-sm mr-1">Adam Nolan</strong>mentioned you to <strong>UX Basics</strong>',
      time: '9h Ago',
    },
    {
      id: 3,
      profile: 'profile-16.jpeg',
      message: '<strong className="text-sm mr-1">Anna Morgan</strong>Upload a file',
      time: '9h Ago',
    },
  ])

  const removeNotification = (value: number) => {
    setNotifications(notifications.filter((user) => user.id !== value))
  }

  const [search, setSearch] = useState(false)

  const setLocale = (flag: string) => {
    setFlag(flag)
    if (flag.toLowerCase() === 'ae') {
      toggleRTL('rtl')
    } else {
      toggleRTL('ltr')
    }
  }
  const [flag, setFlag] = useState(themeConfig.locale)

  const { t } = useTranslation()

  return (
    <header className={`z-40 ${themeConfig.semidark && themeConfig.menu === 'horizontal' ? 'dark' : ''}`}>
      <div className="shadow-sm">
        <div className="relative bg-white flex w-full items-center px-5 py-2.5 dark:bg-black">
          <div className="horizontal-logo flex justify-between items-center ltr:mr-2 rtl:ml-2">
            <button
              type="button"
              className="collapse-icon flex-none dark:text-[#d0d2d6] hover:text-primary dark:hover:text-primary flex ltr:ml-2 rtl:mr-2 p-2 rounded-full bg-white-light/40 dark:bg-dark/40 hover:bg-white-light/90 dark:hover:bg-dark/60"
              onClick={() => {
                toggleSidebar()
              }}
            >
              <IconMenu className="w-5 h-5" />
            </button>
          </div>

          <div className="ltr:mr-2 rtl:ml-2 hidden sm:block">
            <ul className="flex items-center space-x-2 rtl:space-x-reverse dark:text-[#d0d2d6]">
              <li>
                <Link to="/apps/calendar" className="block p-2 rounded-full bg-white-light/40 dark:bg-dark/40 hover:text-primary hover:bg-white-light/90 dark:hover:bg-dark/60">
                  <IconCalendar />
                </Link>
              </li>
              <li>
                <Link to="/apps/todolist" className="block p-2 rounded-full bg-white-light/40 dark:bg-dark/40 hover:text-primary hover:bg-white-light/90 dark:hover:bg-dark/60">
                  <IconEdit />
                </Link>
              </li>
              <li>
                <Link to="/apps/chat" className="block p-2 rounded-full bg-white-light/40 dark:bg-dark/40 hover:text-primary hover:bg-white-light/90 dark:hover:bg-dark/60">
                  <IconChatNotification />
                </Link>
              </li>
            </ul>
          </div>
          <div className="sm:flex-1 ltr:sm:ml-0 ltr:ml-auto sm:rtl:mr-0 rtl:mr-auto flex items-center space-x-1.5 lg:space-x-2 rtl:space-x-reverse dark:text-[#d0d2d6]">
            <div className="sm:ltr:mr-auto sm:rtl:ml-auto">
              <form
                className={`${search && '!block'} sm:relative absolute inset-x-0 sm:top-0 top-1/2 sm:translate-y-0 -translate-y-1/2 sm:mx-0 mx-4 z-10 sm:block hidden`}
                onSubmit={() => setSearch(false)}
              >
                <div className="relative">
                  <Input type="text" className="peer sm:bg-transparent bg-gray-100 placeholder:tracking-widest" placeholder="Search..." startIcon={<IconSearch className="mx-auto" />} />
                  <button type="button" className="hover:opacity-80 sm:hidden block absolute top-1/2 -translate-y-1/2 ltr:right-2 rtl:left-2" onClick={() => setSearch(false)}>
                    <IconXCircle />
                  </button>
                </div>
              </form>
              <button
                type="button"
                onClick={() => setSearch(!search)}
                className="search_btn sm:hidden p-2 rounded-full bg-white-light/40 dark:bg-dark/40 hover:bg-white-light/90 dark:hover:bg-dark/60"
              >
                <IconSearch className="w-4.5 h-4.5 mx-auto dark:text-[#d0d2d6]" />
              </button>
            </div>
            <div>
              {themeConfig.theme === 'light' ? (
                <button
                  className={`${
                    themeConfig.theme === 'light' && 'flex items-center p-2 rounded-full bg-white-light/40 dark:bg-dark/40 hover:text-primary hover:bg-white-light/90 dark:hover:bg-dark/60'
                  }`}
                  onClick={() => {
                    toggleTheme('dark')
                  }}
                >
                  <IconSun />
                </button>
              ) : (
                ''
              )}
              {themeConfig.theme === 'dark' && (
                <button
                  className={`${
                    themeConfig.theme === 'dark' && 'flex items-center p-2 rounded-full bg-white-light/40 dark:bg-dark/40 hover:text-primary hover:bg-white-light/90 dark:hover:bg-dark/60'
                  }`}
                  onClick={() => {
                    toggleTheme('system')
                  }}
                >
                  <IconMoon />
                </button>
              )}
              {themeConfig.theme === 'system' && (
                <button
                  className={`${
                    themeConfig.theme === 'system' && 'flex items-center p-2 rounded-full bg-white-light/40 dark:bg-dark/40 hover:text-primary hover:bg-white-light/90 dark:hover:bg-dark/60'
                  }`}
                  onClick={() => {
                    toggleTheme('light')
                  }}
                >
                  <IconLaptop />
                </button>
              )}
            </div>
            <div className="dropdown shrink-0">
              <Dropdown
                offset={[0, 8]}
                placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`}
                btnClassName="block p-2 rounded-full bg-white-light/40 dark:bg-dark/40 hover:text-primary hover:bg-white-light/90 dark:hover:bg-dark/60"
                button={<img className="w-5 h-5 object-cover rounded-full" src={`/assets/images/flags/${flag.toUpperCase()}.svg`} alt="flag" />}
              >
                <ul className="!px-2 text-dark dark:text-white-dark grid grid-cols-2 gap-2 font-semibold dark:text-white-light/90 w-[280px]">
                  {themeConfig.languageList.map((item: { code: string; name: string }) => {
                    return (
                      <li key={item.code}>
                        <button
                          type="button"
                          className={`flex w-full hover:text-primary rounded-lg ${i18next.language === item.code ? 'bg-primary/10 text-primary' : ''}`}
                          onClick={() => {
                            i18next.changeLanguage(item.code)
                            // setFlag(item.code);
                            setLocale(item.code)
                          }}
                        >
                          <img src={`/assets/images/flags/${item.code.toUpperCase()}.svg`} alt="flag" className="w-5 h-5 object-cover rounded-full" />
                          <span className="ltr:ml-3 rtl:mr-3">{item.name}</span>
                        </button>
                      </li>
                    )
                  })}
                </ul>
              </Dropdown>
            </div>
            <div className="dropdown shrink-0">
              <Dropdown
                offset={[0, 8]}
                placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`}
                btnClassName="block p-2 rounded-full bg-white-light/40 dark:bg-dark/40 hover:text-primary hover:bg-white-light/90 dark:hover:bg-dark/60"
                button={<IconMailDot />}
              >
                <ul className="!py-0 text-dark dark:text-white-dark w-[300px] sm:w-[375px] text-xs">
                  <li className="mb-5" onClick={(e) => e.stopPropagation()}>
                    <div className="hover:!bg-transparent overflow-hidden relative rounded-t-md p-5 text-white w-full !h-[68px]">
                      <div
                        className="absolute h-full w-full bg-no-repeat bg-center bg-cover inset-0 bg-"
                        style={{
                          backgroundImage: `url('/assets/images/menu-header.jpg')`,
                          backgroundRepeat: 'no-repeat',
                          width: '100%',
                          height: '100%',
                        }}
                      ></div>
                      <h4 className="font-semibold relative z-10 text-lg">Messages</h4>
                    </div>
                  </li>
                  {messages.length > 0 ? (
                    <>
                      <li onClick={(e) => e.stopPropagation()}>
                        {messages.map((message) => {
                          return (
                            <div key={message.id} className="flex items-center py-3 px-5">
                              <div dangerouslySetInnerHTML={createMarkup(message.image)}></div>
                              <span className="px-3 dark:text-gray-500">
                                <div className="font-semibold text-sm dark:text-white-light/90">{message.title}</div>
                                <div>{message.message}</div>
                              </span>
                              <span className="font-semibold bg-white-dark/20 rounded text-dark/60 px-1 ltr:ml-auto rtl:mr-auto whitespace-pre dark:text-white-dark ltr:mr-2 rtl:ml-2">
                                {message.time}
                              </span>
                              <button type="button" className="text-neutral-300 hover:text-danger" onClick={() => removeMessage(message.id)}>
                                <IconXCircle />
                              </button>
                            </div>
                          )
                        })}
                      </li>
                      <li className="border-t border-white-light text-center dark:border-white/10 mt-5">
                        <button type="button" className="text-primary font-semibold group dark:text-gray-400 justify-center !py-4 !h-[48px]">
                          <span className="group-hover:underline ltr:mr-1 rtl:ml-1">VIEW ALL ACTIVITIES</span>
                          <IconArrowLeft className="group-hover:translate-x-1 transition duration-300 ltr:ml-1 rtl:mr-1" />
                        </button>
                      </li>
                    </>
                  ) : (
                    <li className="mb-5" onClick={(e) => e.stopPropagation()}>
                      <button type="button" className="!grid place-content-center hover:!bg-transparent text-lg min-h-[200px]">
                        <div className="mx-auto ring-4 ring-primary/30 rounded-full mb-4 text-primary">
                          <IconInfoCircle fill={true} className="w-10 h-10" />
                        </div>
                        No data available.
                      </button>
                    </li>
                  )}
                </ul>
              </Dropdown>
            </div>
            <div className="dropdown shrink-0">
              <Dropdown
                offset={[0, 8]}
                placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`}
                btnClassName="relative block p-2 rounded-full bg-white-light/40 dark:bg-dark/40 hover:text-primary hover:bg-white-light/90 dark:hover:bg-dark/60"
                button={
                  <span>
                    <IconBellBing />
                    <span className="flex absolute w-3 h-3 ltr:right-0 rtl:left-0 top-0">
                      <span className="animate-ping absolute ltr:-left-[3px] rtl:-right-[3px] -top-[3px] inline-flex h-full w-full rounded-full bg-success/50 opacity-75"></span>
                      <span className="relative inline-flex rounded-full w-[6px] h-[6px] bg-success"></span>
                    </span>
                  </span>
                }
              >
                <ul className="!py-0 text-dark dark:text-white-dark w-[300px] sm:w-[350px] divide-y dark:divide-white/10">
                  <li onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center px-4 py-2 justify-between font-semibold">
                      <h4 className="text-lg">Notification</h4>
                      {notifications.length ? <span className="badge bg-primary/80">{notifications.length}New</span> : ''}
                    </div>
                  </li>
                  {notifications.length > 0 ? (
                    <>
                      {notifications.map((notification) => {
                        return (
                          <li key={notification.id} className="dark:text-white-light/90" onClick={(e) => e.stopPropagation()}>
                            <div className="group flex items-center px-4 py-2">
                              <div className="grid place-content-center rounded">
                                <div className="w-12 h-12 relative">
                                  <img className="w-12 h-12 rounded-full object-cover" alt="profile" src={`/assets/images/${notification.profile}`} />
                                  <span className="bg-success w-2 h-2 rounded-full block absolute right-[6px] bottom-0"></span>
                                </div>
                              </div>
                              <div className="ltr:pl-3 rtl:pr-3 flex flex-auto">
                                <div className="ltr:pr-3 rtl:pl-3">
                                  <h6
                                    dangerouslySetInnerHTML={{
                                      __html: notification.message,
                                    }}
                                  ></h6>
                                  <span className="text-xs block font-normal dark:text-gray-500">{notification.time}</span>
                                </div>
                                <button
                                  type="button"
                                  className="ltr:ml-auto rtl:mr-auto text-neutral-300 hover:text-danger opacity-0 group-hover:opacity-100"
                                  onClick={() => removeNotification(notification.id)}
                                >
                                  <IconXCircle />
                                </button>
                              </div>
                            </div>
                          </li>
                        )
                      })}
                      <li>
                        <div className="p-4">
                          <button className="btn btn-primary block w-full btn-small">Read All Notifications</button>
                        </div>
                      </li>
                    </>
                  ) : (
                    <li onClick={(e) => e.stopPropagation()}>
                      <button type="button" className="!grid place-content-center hover:!bg-transparent text-lg min-h-[200px]">
                        <div className="mx-auto ring-4 ring-primary/30 rounded-full mb-4 text-primary">
                          <IconInfoCircle fill={true} className="w-10 h-10" />
                        </div>
                        No data available.
                      </button>
                    </li>
                  )}
                </ul>
              </Dropdown>
            </div>
            <div className="dropdown shrink-0 flex">
              <Dropdown
                offset={[0, 8]}
                placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`}
                btnClassName="relative group block"
                button={<img className="w-9 h-9 rounded-full object-cover saturate-50 group-hover:saturate-100" src="/assets/images/user-profile.jpeg" alt="userProfile" />}
              >
                <ul className="text-dark dark:text-white-dark !py-0 w-[230px] font-semibold dark:text-white-light/90">
                  <li>
                    <div className="flex items-center px-4 py-4">
                      <img className="rounded-md w-10 h-10 object-cover" src="/assets/images/user-profile.jpeg" alt="userProfile" />
                      <div className="ltr:pl-4 rtl:pr-4 truncate">
                        <h4 className="text-base">
                          John Doe
                          <span className="text-xs bg-success-light rounded text-success px-1 ltr:ml-2 rtl:ml-2">Pro</span>
                        </h4>
                        <button type="button" className="text-black/60 hover:text-primary dark:text-dark-light/60 dark:hover:text-white">
                          johndoe@gmail.com
                        </button>
                      </div>
                    </div>
                  </li>
                  <li>
                    <Link to="/users/profile" className="dark:hover:text-white">
                      <IconUser className="w-4.5 h-4.5 ltr:mr-2 rtl:ml-2 shrink-0" />
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link to="/apps/mailbox" className="dark:hover:text-white">
                      <IconMail className="w-4.5 h-4.5 ltr:mr-2 rtl:ml-2 shrink-0" />
                      Inbox
                    </Link>
                  </li>
                  <li>
                    <Link to="/auth/boxed-lockscreen" className="dark:hover:text-white">
                      <IconLockDots className="w-4.5 h-4.5 ltr:mr-2 rtl:ml-2 shrink-0" />
                      Lock Screen
                    </Link>
                  </li>
                  <li className="border-t border-white-light dark:border-white-light/10">
                    <Link to="/login" className="text-danger !py-3">
                      <IconLogout className="w-4.5 h-4.5 ltr:mr-2 rtl:ml-2 rotate-90 shrink-0" />
                      Sign Out
                    </Link>
                  </li>
                </ul>
              </Dropdown>
            </div>
          </div>
        </div>

        {/* horizontal menu */}
        <ul
          className={`horizontal-menu ${themeConfig.menu === 'horizontal' ? '' : 'hidden'} py-1.5 font-semibold px-6 lg:space-x-1.5 xl:space-x-8 rtl:space-x-reverse bg-white border-t border-[#ebedf2] dark:border-[#191e3a] dark:bg-black text-black dark:text-white-dark`}
        >
          {MENU_DATA.map((section) => {
            const renderHorizontalSubItems = (items: SubItem[]) => {
              return (
                <ul className="rounded absolute top-0 ltr:left-[95%] rtl:right-[95%] min-w-[180px] bg-white z-[10] text-dark dark:text-white-dark dark:bg-[#1b2e4b] shadow p-0 py-2 hidden group-hover:block">
                  {items.map((subItem) => (
                    <li key={subItem.label} className="relative group">
                      {subItem.subItems ? (
                        <>
                          <button type="button" className="w-full text-left flex items-center px-4 py-2 hover:bg-white-light/30 dark:hover:bg-white-light/10">
                            {t(subItem.label)}
                            <div className="ltr:ml-auto rtl:mr-auto rtl:rotate-90 -rotate-90">
                              <IconCaretDown />
                            </div>
                          </button>
                          {renderHorizontalSubItems(subItem.subItems)}
                        </>
                      ) : (
                        <NavLink to={subItem.path} target={subItem.target} className="block px-4 py-2 hover:bg-white-light/30 dark:hover:bg-white-light/10">
                          {t(subItem.label)}
                        </NavLink>
                      )}
                    </li>
                  ))}
                </ul>
              )
            }

            if (!section.label && section.items.length === 1) {
              const item = section.items[0]
              return (
                <li key={item.id} className="menu nav-item relative group">
                  <button type="button" className="nav-link">
                    <div className="flex items-center">
                      {item.icon ? <item.icon className="shrink-0" /> : null}
                      <span className="px-1">{t(item.label)}</span>
                    </div>
                    <div className="right_arrow">
                      <IconCaretDown />
                    </div>
                  </button>
                  <ul className="sub-menu">
                    {item.subItems?.map((subItem) => (
                      <li key={subItem.label} className="relative group">
                        {subItem.subItems ? (
                          <>
                            <button type="button" className="w-full text-left flex items-center px-4 py-2 hover:bg-white-light/30 dark:hover:bg-white-light/10">
                              {t(subItem.label)}
                              <div className="ltr:ml-auto rtl:mr-auto rtl:rotate-90 -rotate-90">
                                <IconCaretDown />
                              </div>
                            </button>
                            {renderHorizontalSubItems(subItem.subItems)}
                          </>
                        ) : (
                          <NavLink to={subItem.path} target={subItem.target}>
                            {t(subItem.label)}
                          </NavLink>
                        )}
                      </li>
                    ))}
                  </ul>
                </li>
              )
            } else {
              return (
                <li key={section.label} className="menu nav-item relative group">
                  <button type="button" className="nav-link">
                    <div className="flex items-center">
                      {section.icon ? <section.icon className="shrink-0" /> : null}
                      <span className="px-1">{t(section.label || '')}</span>
                    </div>
                    <div className="right_arrow">
                      <IconCaretDown />
                    </div>
                  </button>
                  <ul className="sub-menu">
                    {section.items.map((item) => (
                      <li key={item.id} className="relative group">
                        {item.subItems ? (
                          <>
                            <button type="button" className="w-full text-left flex items-center px-4 py-2 hover:bg-white-light/30 dark:hover:bg-white-light/10">
                              {t(item.label)}
                              <div className="ltr:ml-auto rtl:mr-auto rtl:rotate-90 -rotate-90">
                                <IconCaretDown />
                              </div>
                            </button>
                            {renderHorizontalSubItems(item.subItems)}
                          </>
                        ) : (
                          <NavLink to={item.path || ''} target={item.target}>
                            {t(item.label)}
                          </NavLink>
                        )}
                      </li>
                    ))}
                  </ul>
                </li>
              )
            }
          })}
        </ul>
      </div>
    </header>
  )
}

export default Header
