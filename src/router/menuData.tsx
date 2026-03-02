import { Section } from '@/types/menu.types'
import IconMenuApps from '../assets/Icon/Menu/IconMenuApps'
import IconMenuAuthentication from '../assets/Icon/Menu/IconMenuAuthentication'
import IconMenuCalendar from '../assets/Icon/Menu/IconMenuCalendar'
import IconMenuCharts from '../assets/Icon/Menu/IconMenuCharts'
import IconMenuChat from '../assets/Icon/Menu/IconMenuChat'
import IconMenuComponents from '../assets/Icon/Menu/IconMenuComponents'
import IconMenuContacts from '../assets/Icon/Menu/IconMenuContacts'
import IconMenuDashboard from '../assets/Icon/Menu/IconMenuDashboard'
import IconMenuDatatables from '../assets/Icon/Menu/IconMenuDatatables'
import IconMenuDocumentation from '../assets/Icon/Menu/IconMenuDocumentation'
import IconMenuDragAndDrop from '../assets/Icon/Menu/IconMenuDragAndDrop'
import IconMenuElements from '../assets/Icon/Menu/IconMenuElements'
import IconMenuFontIcons from '../assets/Icon/Menu/IconMenuFontIcons'
import IconMenuForms from '../assets/Icon/Menu/IconMenuForms'
import IconMenuInvoice from '../assets/Icon/Menu/IconMenuInvoice'
import IconMenuMailbox from '../assets/Icon/Menu/IconMenuMailbox'
import IconMenuNotes from '../assets/Icon/Menu/IconMenuNotes'
import IconMenuPages from '../assets/Icon/Menu/IconMenuPages'
import IconMenuScrumboard from '../assets/Icon/Menu/IconMenuScrumboard'
import IconMenuTables from '../assets/Icon/Menu/IconMenuTables'
import IconMenuTodo from '../assets/Icon/Menu/IconMenuTodo'
import IconMenuUsers from '../assets/Icon/Menu/IconMenuUsers'
import IconMenuWidgets from '../assets/Icon/Menu/IconMenuWidgets'

export const MENU_DATA: Section[] = [
  {
    items: [
      {
        id: 'dashboard',
        label: 'dashboard',
        icon: IconMenuDashboard,
        subItems: [
          { label: 'sales', path: '/' },
          { label: 'analytics', path: '/analytics' },
          { label: 'finance', path: '/finance' },
          { label: 'crypto', path: '/crypto' },
        ],
      },
    ],
  },
  {
    label: 'apps',
    icon: IconMenuApps,
    items: [
      { id: 'chat', label: 'chat', icon: IconMenuChat, path: '/apps/chat' },
      { id: 'mailbox', label: 'mailbox', icon: IconMenuMailbox, path: '/apps/mailbox' },
      { id: 'todo', label: 'todo_list', icon: IconMenuTodo, path: '/apps/todolist' },
      { id: 'notes', label: 'notes', icon: IconMenuNotes, path: '/apps/notes' },
      { id: 'scrumboard', label: 'scrumboard', icon: IconMenuScrumboard, path: '/apps/scrumboard' },
      { id: 'contacts', label: 'contacts', icon: IconMenuContacts, path: '/apps/contacts' },
      {
        id: 'invoice',
        label: 'invoice',
        icon: IconMenuInvoice,
        subItems: [
          { label: 'list', path: '/apps/invoice/list' },
          { label: 'preview', path: '/apps/invoice/preview' },
          { label: 'add', path: '/apps/invoice/add' },
          { label: 'edit', path: '/apps/invoice/edit' },
        ],
      },
      { id: 'calendar', label: 'calendar', icon: IconMenuCalendar, path: '/apps/calendar' },
    ],
  },
  {
    label: 'user_interface',
    icon: IconMenuComponents,
    items: [
      {
        id: 'component',
        label: 'components',
        icon: IconMenuComponents,
        subItems: [
          { label: 'tabs', path: '/components/tabs' },
          { label: 'accordions', path: '/components/accordions' },
          { label: 'modals', path: '/components/modals' },
          { label: 'cards', path: '/components/cards' },
          { label: 'carousel', path: '/components/carousel' },
          { label: 'countdown', path: '/components/countdown' },
          { label: 'counter', path: '/components/counter' },
          { label: 'sweet_alerts', path: '/components/sweetalert' },
          { label: 'timeline', path: '/components/timeline' },
          { label: 'notifications', path: '/components/notifications' },
          { label: 'media_object', path: '/components/media-object' },
          { label: 'list_group', path: '/components/list-group' },
          { label: 'pricing_tables', path: '/components/pricing-table' },
          { label: 'lightbox', path: '/components/lightbox' },
        ],
      },
      {
        id: 'element',
        label: 'elements',
        icon: IconMenuElements,
        subItems: [
          { label: 'alerts', path: '/elements/alerts' },
          { label: 'avatar', path: '/elements/avatar' },
          { label: 'badges', path: '/elements/badges' },
          { label: 'breadcrumbs', path: '/elements/breadcrumbs' },
          { label: 'buttons', path: '/elements/buttons' },
          { label: 'button_groups', path: '/elements/buttons-group' },
          { label: 'color_library', path: '/elements/color-library' },
          { label: 'dropdown', path: '/elements/dropdown' },
          { label: 'infobox', path: '/elements/infobox' },
          { label: 'jumbotron', path: '/elements/jumbotron' },
          { label: 'loader', path: '/elements/loader' },
          { label: 'pagination', path: '/elements/pagination' },
          { label: 'popovers', path: '/elements/popovers' },
          { label: 'progress_bar', path: '/elements/progress-bar' },
          { label: 'search', path: '/elements/search' },
          { label: 'tooltips', path: '/elements/tooltips' },
          { label: 'treeview', path: '/elements/treeview' },
          { label: 'typography', path: '/elements/typography' },
        ],
      },
      { id: 'charts', label: 'charts', icon: IconMenuCharts, path: '/charts' },
      { id: 'widgets', label: 'widgets', icon: IconMenuWidgets, path: '/widgets' },
      { id: 'font_icons', label: 'font_icons', icon: IconMenuFontIcons, path: '/font-icons' },
      { id: 'drag_and_drop', label: 'drag_and_drop', icon: IconMenuDragAndDrop, path: '/dragndrop' },
    ],
  },
  {
    label: 'tables_and_forms',
    icon: IconMenuTables,
    items: [
      { id: 'tables', label: 'tables', icon: IconMenuTables, path: '/tables' },
      {
        id: 'datalabel',
        label: 'datatables',
        icon: IconMenuDatatables,
        subItems: [
          { label: 'basic', path: '/datatables/basic' },
          { label: 'advanced', path: '/datatables/advanced' },
          { label: 'skin', path: '/datatables/skin' },
          { label: 'order_sorting', path: '/datatables/order-sorting' },
          { label: 'multi_column', path: '/datatables/multi-column' },
          { label: 'multiple_tables', path: '/datatables/multiple-tables' },
          { label: 'alt_pagination', path: '/datatables/alt-pagination' },
          { label: 'checkbox', path: '/datatables/checkbox' },
          { label: 'range_search', path: '/datatables/range-search' },
          { label: 'export', path: '/datatables/export' },
          { label: 'column_chooser', path: '/datatables/column-chooser' },
        ],
      },
      {
        id: 'forms',
        label: 'forms',
        icon: IconMenuForms,
        subItems: [
          { label: 'basic', path: '/forms/basic' },
          { label: 'input_group', path: '/forms/input-group' },
          { label: 'layouts', path: '/forms/layouts' },
          { label: 'validation', path: '/forms/validation' },
          { label: 'input_mask', path: '/forms/input-mask' },
          { label: 'select2', path: '/forms/select2' },
          { label: 'touchspin', path: '/forms/touchspin' },
          { label: 'checkbox_and_radio', path: '/forms/checkbox-radio' },
          { label: 'switches', path: '/forms/switches' },
          { label: 'wizards', path: '/forms/wizards' },
          { label: 'file_upload', path: '/forms/file-upload' },
          { label: 'quill_editor', path: '/forms/quill-editor' },
          { label: 'markdown_editor', path: '/forms/markdown-editor' },
          { label: 'date_and_range_picker', path: '/forms/date-picker' },
          { label: 'clipboard', path: '/forms/clipboard' },
        ],
      },
    ],
  },
  {
    label: 'user_and_pages',
    icon: IconMenuUsers,
    items: [
      {
        id: 'users',
        label: 'users',
        icon: IconMenuUsers,
        subItems: [
          { label: 'profile', path: '/users/profile' },
          { label: 'account_settings', path: '/users/user-account-settings' },
        ],
      },
      {
        id: 'page',
        label: 'pages',
        icon: IconMenuPages,
        subItems: [
          { label: 'knowledge_base', path: '/pages/knowledge-base' },
          { label: 'contact_us_boxed', path: '/pages/contact-us-boxed', target: '_blank' },
          { label: 'contact_us_cover', path: '/pages/contact-us-cover', target: '_blank' },
          { label: 'faq', path: '/pages/faq' },
          { label: 'coming_soon_boxed', path: '/pages/coming-soon-boxed', target: '_blank' },
          { label: 'coming_soon_cover', path: '/pages/coming-soon-cover', target: '_blank' },
          {
            label: 'error',
            path: '',
            subItems: [
              { label: '404', path: '/pages/error404', target: '_blank' },
              { label: '500', path: '/pages/error500', target: '_blank' },
              { label: '503', path: '/pages/error503', target: '_blank' },
            ],
          },
          { label: 'maintenance', path: '/pages/maintenance', target: '_blank' },
        ],
      },
    ],
  },
  {
    icon: IconMenuAuthentication,
    items: [
      {
        id: 'auth',
        label: 'authentication',
        icon: IconMenuAuthentication,
        subItems: [
          { label: 'login_boxed', path: '/auth/boxed-signin', target: '_blank' },
          { label: 'register_boxed', path: '/auth/boxed-signup', target: '_blank' },
          { label: 'unlock_boxed', path: '/auth/boxed-lockscreen', target: '_blank' },
          { label: 'recover_id_boxed', path: '/auth/boxed-password-reset', target: '_blank' },
          { label: 'login_cover', path: '/auth/cover-login', target: '_blank' },
          { label: 'register_cover', path: '/auth/cover-register', target: '_blank' },
          { label: 'unlock_cover', path: '/auth/cover-lockscreen', target: '_blank' },
          { label: 'recover_id_cover', path: '/auth/cover-password-reset', target: '_blank' },
        ],
      },
    ],
  },
  {
    label: 'supports',
    items: [{ id: 'documentation', label: 'documentation', icon: IconMenuDocumentation, path: 'https://vristo.sbthemes.com' }],
  },
]
