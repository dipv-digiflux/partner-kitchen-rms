# CRUD API & Form Documentation

This document provides a comprehensive overview of all CRUD operations, form fields, and extra API calls (form options) for each module in the application.

---

## 🔐 Authentication API

### 1. Login User API

- **Endpoint:** `/user/login` (Assumed based on project structure)
- **Method:** `POST`
- **Request Payload:**

```json
{
  "emailOrPhone": "user@example.com",
  "password": "yourpassword"
}
```

- **Response Payload:**

```json
{
  "status": true,
  "message": "Login successful",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "_id": "698a0ffbb0926cee87ec404f",
      "full_name": "John Doe",
      "email": "user@example.com",
      "role": ["admin"]
    }
  }
}
```

---

## 🛠️ Common API Structure (CRUD)

All CRUD modules follow a standardized request/response pattern via the `commonAjax` and `createCommonCrud` utilities.

### 📋 List View (Get Data)

- **Method:** `GET`
- **Request Payload:**

```json
{
  "action": "get_data",
  "page": 1,
  "limit": 10,
  "sortBy": "name",
  "sortOrder": "asc",
  "search": "query"
}
```

- **Response Payload:**

```json
{
  "data": {
    "limit": 10,
    "page": 1,
    "totalPages": 4,
    "totalRecords": 32,
    "result": [
      /* array of records */
    ]
  },
  "message": "data get successfully"
}
```

### 🔍 Single Record (Fetch)

- **Method:** `GET`
- **Endpoint:** `/module-url/:id`
- **Request Payload:**

```json
{
  "action": "fetch_record",
  "id": "record_id"
}
```

- **Response Payload:**

```json
{
  "data": {
    /* record details */
  },
  "message": "record fetched successfully"
}
```

### ➕ Create Record

- **Method:** `POST`
- **Endpoint:** `/module-url`
- **Request Payload:**

```json
{
  "action": "create_record",
  ...formData
}
```

- **Response Payload:**

```json
{
  "message": "record create successfully",
  "data": {
    /* new record */
  }
}
```

### ✏️ Update Record

- **Method:** `PATCH`
- **Endpoint:** `/module-url/:id`
- **Request Payload:**

```json
{
  "action": "update_record",
  ...formData
}
```

- **Response Payload:**

```json
{
  "message": "record update successfully",
  "data": {
    /* updated record */
  }
}
```

### 🗑️ Delete Record

- **Method:** `DELETE`
- **Endpoint:** `/module-url/:id`
- **Request Payload:**

```json
{
  "action": "delete_record",
  "id": "record_id"
}
```

- **Response Payload:**

```json
{
  "message": "record delete successfully",
  "data": {}
}
```

---

## 📦 Module Specifics

### 1. User Module

- **API URL:** `/user`
- **Form Fields:**
  - `first_name` (Text, Required)
  - `last_name` (Text, Required)
  - `email` (Email, Required)
  - `password` (Password, Required on Create)
  - `confirmPassword` (Password, Required on Create)
  - `status` (Checkbox/Boolean)
  - `role` (Multi-select, Required)
- **User Data Structure (with Permissions):**

```javascript
const userData = {
  ...{}, // user data
  permissions: {
    module: {
      edit: true,
      view: true,
      delete: true,
      add: true,
    },
  },
}
```

- **Form Options (Select Inputs):**
  - **Role:** `GET /role?action=get_options` -> `[{ label: name, value: _id }]`

### 2. Recipe Master

- **API URL:** `/recipe`
- **Form Fields:**
  - `dishName` (Text, Required)
  - `photoUrl` (Text)
  - `categoryId` (Select)
  - `dishTypeId` (Select)
  - `description` (Textarea)
  - `cuisineId` (Select)
  - `complexity` (Select: Easy, Moderate, Complex)
  - `caloriesKcalMin` / `Max` (Number)
  - `allowedDiscountPercentage` (Number)
  - `ingredientsFixed` (Multi-select)
  - `ingredientsRemovable` (Multi-select)
  - `allergensContains` / `FreeFrom` (Multi-select)
  - `nddMp` (Select: subscription, a la carte)
  - `menuForDays` (Multi-select: Day 1-6)
  - `expirationDays` (Number)
  - `mealPreference` (Number)
  - `finalize` (Boolean)
  - **Packaging Materials (Array):** `materialId`, `labelTitle`, `labelInstruction`
  - **Variants (Array):** `typeOfVariant`, `chefsChoice`, `sizeAvailable`, `price`, `kcal`, `protein`, `carb`, `fat`, `component1-9`, `gram1-9`
- **Form Options (Select Inputs):**
  - **Category:** `GET /category?action=get_options`
  - **Dish Type:** `GET /dishtype?action=get_options`
  - **Cuisine:** `GET /cuisine?action=get_options`
  - **Ingredient:** `GET /ingredient?action=get_options`
  - **Allergens:** `GET /allergens?action=get_options`
  - **Packaging Material:** `GET /packaging-material?action=get_options`

### 3. Weekly Menu

- **API URL:** `/weekly-menu`
- **Form Fields:**
  - `categoryId` (Select, Required)
  - `week_label` (Text, Required)
  - `start_date` (Date, Required)
  - `end_date` (Date, Required)
  - `menu_items` (Multi-select/Comma string, Required)
  - `finalize` (Boolean)
- **Form Options:**
  - **Category:** `GET /category?action=get_options`
  - **Recipe:** `GET /recipe?action=get_options` (Filtered by selected category optionally)

### 4. Category

- **API URL:** `/category`
- **Form Fields:**
  - `CategoryName` (Text, Required)
  - `OrderNumber` (Number, Required)
  - `IsVegetarian` (Checkbox)
  - `IsLive` (Checkbox)

### 5. Ingredient

- **API URL:** `/ingredient`
- **Form Fields:**
  - `ingredientName` (Text, Required)
  - `isAllergy` (Checkbox)
  - `isLive` (Checkbox)

### 6. Dish Type

- **API URL:** `/dishtype`
- **Form Fields:**
  - `name` (Text, Required)
  - `isLive` (Checkbox)

### 7. Cuisine

- **API URL:** `/cuisine`
- **Form Fields:**
  - `name` (Text, Required)
  - `isLive` (Checkbox)

### 8. Packaging Material

- **API URL:** `/packaging-material`
- **Form Fields:**
  - `name` (Text, Required)
  - `cost` (Number)
  - `isLive` (Checkbox)

### 9. Variant

- **API URL:** `/variant`
- **Form Fields:**
  - `displayName` (Text, Required)
  - `internalName` (Text, Required)
  - **Ingredients (Array):** `ingredientId`
- **Form Options:**
  - **Ingredient:** `GET /ingredient?action=get_options`

### 10. Allergens

- **API URL:** `/allergens`
- **Form Fields:**
  - `name` (Text, Required)
  - `isLive` (Checkbox)

### 11. Barcode Place

- **API URL:** `/barcode-place`
- **Form Fields:**
  - `name` (Text, Required)
  - `isLive` (Checkbox)
