import { useEffect } from 'react'
import IconDownload from '../../assets/Icon/IconDownload'
import IconPencil from '../../assets/Icon/IconPencil'
import IconSettings from '../../assets/Icon/IconSettings'
import IconSun from '../../assets/Icon/IconSun'
import { Button } from '../../components/core/Button/Button'
import { setPageTitle } from '../../store/themeConfigSlice'

const ComponentsShowcase = () => {
  useEffect(() => {
    setPageTitle('Components Showcase')
  }, [])

  return (
    <div>
      <ul className="flex space-x-2 rtl:space-x-reverse">
        <li>
          <span className="text-primary hover:underline cursor-pointer">Components</span>
        </li>
        <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
          <span>Buttons</span>
        </li>
      </ul>
      <div className="pt-5 grid lg:grid-cols-2 grid-cols-1 gap-6">
        {/* Default */}
        <div className="panel" id="default">
          <div className="flex items-center justify-between mb-5">
            <h5 className="font-semibold text-lg dark:text-white-light">Default</h5>
          </div>
          <div className="mb-5">
            <div className="flex w-full gap-4 justify-center">
              <Button variant="primary">Primary</Button>
              <Button variant="primary" outline>
                Primary
              </Button>
            </div>
          </div>
        </div>

        {/* Rounded */}
        <div className="panel" id="rounded">
          <div className="flex items-center justify-between mb-5">
            <h5 className="font-semibold text-lg dark:text-white-light">Rounded</h5>
          </div>
          <div className="mb-5">
            <div className="flex w-full gap-4 justify-center">
              <Button variant="primary" rounded>
                Primary
              </Button>
              <Button variant="primary" outline rounded>
                Primary
              </Button>
            </div>
          </div>
        </div>

        {/* Solid */}
        <div className="panel" id="solid">
          <div className="flex items-center justify-between mb-5">
            <h5 className="font-semibold text-lg dark:text-white-light">Solid</h5>
          </div>
          <div className="mb-5">
            <div className="flex flex-wrap items-center justify-center gap-2">
              <Button variant="primary">Primary</Button>
              <Button variant="info">Info</Button>
              <Button variant="success">Success</Button>
              <Button variant="warning">Warning</Button>
              <Button variant="danger">Danger</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="dark">Dark</Button>
            </div>
          </div>
        </div>

        {/* Outline */}
        <div className="panel" id="outline">
          <div className="flex items-center justify-between mb-5">
            <h5 className="font-semibold text-lg dark:text-white-light">Outline</h5>
          </div>
          <div className="mb-5">
            <div className="flex flex-wrap items-center justify-center gap-2">
              <Button variant="primary" outline>
                Primary
              </Button>
              <Button variant="info" outline>
                Info
              </Button>
              <Button variant="success" outline>
                Success
              </Button>
              <Button variant="warning" outline>
                Warning
              </Button>
              <Button variant="danger" outline>
                Danger
              </Button>
              <Button variant="secondary" outline>
                Secondary
              </Button>
              <Button variant="dark" outline>
                Dark
              </Button>
            </div>
          </div>
        </div>

        {/* Disabled */}
        <div className="panel" id="disabled">
          <div className="flex items-center justify-between mb-5">
            <h5 className="font-semibold text-lg dark:text-white-light">Disabled</h5>
          </div>
          <div className="mb-5">
            <div className="flex flex-wrap items-center justify-center gap-2">
              <Button variant="primary" disabled>
                Primary
              </Button>
              <Button variant="info" outline disabled>
                Info
              </Button>
              <Button variant="success" disabled rounded>
                Success
              </Button>
            </div>
          </div>
        </div>

        {/* Button Sizes */}
        <div className="panel" id="sizes">
          <div className="flex items-center justify-between mb-5">
            <h5 className="font-semibold text-lg dark:text-white-light">Button Sizes</h5>
          </div>
          <div className="mb-5">
            <div className="flex flex-wrap items-center justify-center gap-2">
              <Button variant="primary" size="lg">
                Primary
              </Button>
              <Button variant="info" size="md">
                Info
              </Button>
              <Button variant="success" size="sm">
                Success
              </Button>
              <Button variant="warning" size="sm">
                Warning
              </Button>
            </div>
          </div>
        </div>

        {/* Button with Icons */}
        <div className="panel" id="icons">
          <div className="flex items-center justify-between mb-5">
            <h5 className="font-semibold text-lg dark:text-white-light">Button with Icons</h5>
          </div>
          <div className="mb-5">
            <div className="flex flex-wrap items-center justify-center gap-2">
              <Button variant="primary" startIcon={<IconSettings className="w-5 h-5" />}>
                Left
              </Button>
              <Button variant="warning" rounded endIcon={<IconPencil className="w-5 h-5" />}>
                Right
              </Button>
              {/* Icon Only Variants */}
              <Button variant="danger" iconOnly>
                <IconDownload />
              </Button>
              <Button variant="dark" rounded iconOnly>
                <IconSun />
              </Button>
            </div>
          </div>
        </div>

        {/* Block Buttons */}
        <div className="panel" id="block">
          <div className="flex items-center justify-between mb-5">
            <h5 className="font-semibold text-lg dark:text-white-light">Block Buttons</h5>
          </div>
          <div className="mb-5">
            <div className="flex flex-col gap-4">
              <Button variant="primary" className="w-full">
                Button
              </Button>
              <Button variant="info" className="w-full">
                Button
              </Button>
              <Button variant="success" className="w-full">
                Button
              </Button>
            </div>
          </div>
        </div>
        {/* Loading Buttons */}
        <div className="panel" id="loading">
          <div className="flex items-center justify-between mb-5">
            <h5 className="font-semibold text-lg dark:text-white-light">Loading Buttons</h5>
          </div>
          <div className="mb-5">
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button variant="primary" isLoading>
                Loading
              </Button>
              <Button variant="success" outline isLoading>
                Processing
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ComponentsShowcase
