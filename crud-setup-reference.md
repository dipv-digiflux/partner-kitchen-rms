# How to Create a New CRUD Module (Reference Guide)

Whenever you want to create a new CRUD (Create, Read, Update, Delete) module in this project, follow this exact step-by-step process. This uses the `User` module as a mental reference for how files are structured.

## Step 1: Define the Payload Type

Create the type definition for the data that will be sent to and received from the API.

- **Location**: `src/types/payload/[module_name].payload.ts`
- **What to do**: Export a `type` or `interface` representing the exact fields of your module (e.g., `CategoryPayload`, `ProductPayload`).

## Step 2: Register the Module in Configuration

Add your new module to the centralized CRUD configuration. This dynamically handles all API URLs, routing, and sidebar menu mapping.

- **Location**: `src/config/crudModules.data.ts`
- **What to do**: Add a new key to the `CRUD_MODULES_DATA` object.
  ```typescript
  '[module-name]': {
    apiUrl: '/[api-endpoint]',
    pageTitle: '[Display Title]',
    permissionName: '[slug_for_rbac]',
    formMode: 'MODAL', // or 'PAGE' if the form is very large
    menuLabel: '[Sidebar Menu Name]',
    menuIcon: '[icon-name]', // e.g., 'pages', 'users'
  }
  ```

## Step 3: Create the Module Folder

Create a dedicated folder for the UI components of this specific module.

- **Location**: `src/pages/(crud)/[module_name]/`

## Step 4: Build the Form Component

Create the component that will be rendered inside the Modal (or Page) when adding/editing records.

- **Location**: `src/pages/(crud)/[module_name]/[ModuleName]Form.tsx`
- **What to do**:
  - Use `useForm<YourPayload>` from `react-hook-form`.
  - Use the `FormField` component for all inputs (text, select, checkbox, etc.).
  - Accept `CrudFormProps<YourPayload>` as props.
  - Implement form submission using `API.crudApi.crudHandler.useSubmitHandler<YourPayload>()`.

## Step 5: Build the Index (List View) Component

Create the main entry page that displays the data table and connects all the common CRUD elements.

- **Location**: `src/pages/(crud)/[module_name]/[module_name].index.tsx`
- **What to do**:
  - Define your table columns using `createColumnHelper<YourPayload>()`. Map them to your specific payload fields.
  - Render the standard layout using:
    - `ModuleBreadCrumb` (passing `<AddRecord />` as children)
    - `CommonFilterSearch`
    - `CommonCrudView columns={allColumns}`
    - `CommonFormElement form={YourForm}`
  - **Crucial**: At the bottom of the file, export the component wrapped in `withModuleProvider(YourContent, '[module-name-key-from-config]')`.

## Step 6: Add to Routing Definitions

Add your new module's path to the router configuration so the application recognizes its URL.

- **Location 1**: `src/lib/utils/routes.ts`
  - Add your route path: `[moduleName]: '/[module-name]'`
- **Location 2**: `src/router/routes.tsx`
  - Lazy load your index file at the top: `const [ModuleName] = lazy(() => import('../pages/(crud)/[module-name]/[module-name].index'))`
  - Add the route object to the `routes` array:
    ```tsx
    {
      path: appRoutes.[moduleName],
      element: <[ModuleName] />,
      layout: 'default',
    }
    ```

---

**Summary Checklist for next time:**

- [ ] `src/types/payload/[module].payload.ts` created
- [ ] `CRUD_MODULES_DATA` in `crudModules.data.ts` updated
- [ ] `src/pages/(crud)/[module]/` folder created
- [ ] `[Module]Form.tsx` created
- [ ] `[module].index.tsx` created and wrapped with `withModuleProvider`
- [ ] Route added to `src/lib/utils/routes.ts`
- [ ] Component imported and route added to `src/router/routes.tsx`
