# TYPESCRIPT_GUIDELINES.md

# TypeScript Safety, Performance & Quality Standards

==================================================
PURPOSE & SCOPE
==================================================

This document defines the **STRICT TypeScript rules** for this repository.

Audience:

- All developers
- Any AI coding assistant or agent
  (Cursor, Antigravity, Copilot, Codeium, internal bots, etc.)

Goals:

- Maximum type safety
- Predictable runtime behavior
- High TypeScript compiler performance
- Zero unsafe shortcuts
- Production-grade TypeScript only

# ================================================== 0) GOLDEN RULE

TypeScript exists to expose bugs early.

If TypeScript reports an error:

- The design is wrong
- The data flow is unsafe
- Or the type definition is incomplete

NEVER silence TypeScript.  
ALWAYS fix the root cause.

==================================================

1. # NON-NEGOTIABLE RULES (HARD FAIL)

The following are STRICTLY FORBIDDEN:

- `any`
- `as any`
- `unknown as X`
- `@ts-ignore`
- `@ts-nocheck`
- Type assertions used to bypass errors

Allowed ONLY for third-party library typing bugs:

```ts
// TODO: remove when library types are fixed
```

================================================== 2) STRICT COMPILER EXPECTATIONS
All code MUST compile with:

"strict": true

"noImplicitAny": true

"strictNullChecks": true

"noUncheckedIndexedAccess": true

Never weaken tsconfig.json locally or per file.

================================================== 3) TYPE vs INTERFACE DEFAULT
Default rule:

Prefer type aliases

Use interface ONLY when:

Declaration merging is required

A library API explicitly demands it

Do NOT mix type and interface casually.

================================================== 4) CONTROLLED USE OF extends IN TYPES & INTERFACES
Inheritance in TypeScript types is DISCOURAGED by default,
but ALLOWED in limited, well-defined cases only.

extends MUST NOT be used casually.

4.1 When extends IS NOT ALLOWED (Default Rule)
Do NOT use extends for:

Domain models (User, Institute, Batch, Order, etc.)

API response shapes

Feature-level data types

UI props and state

Business logic entities

Forbidden examples:

```ts
interface Admin extends User {}
type ApiResponse<T> extends BaseResponse {}
```

Why this restriction exists:

Creates hidden coupling

Slows TypeScript in large codebases

Makes refactors risky

Encourages fragile hierarchies

4.2 When extends IS ALLOWED (Exceptions)
extends MAY be used ONLY when ALL are true:

Base type is:

very small

stable

unlikely to change

Relationship is:

purely structural

not domain-driven

Depth is:

single level only

no chains (A → B → C)

Allowed examples:

```ts
interface WithId {
  id: string
}

interface User extends WithId {
  name: string
}
```

```ts
interface BaseProps {
  testId?: string
}

interface ButtonProps extends BaseProps {
  label: string
  onPress(): void
}
```

4.3 Rules for Allowed extends
Only ONE base type

No multi-level inheritance

No conditional logic in base types

No generics in base types unless unavoidable

Base types must not import domain or feature logic

If any rule is violated → use composition.

4.4 Preferred Alternative (Recommended)

```ts
type WithId = {
  id: string
}

type User = {
  id: string
  name: string
}
```

==================================================
RULE SUMMARY
extends is NOT forbidden

extends is NOT the default

extends is for small, stable, shared shapes only

Composition remains the primary pattern

================================================== 5) APPROVED ALTERNATIVES TO extends
5.1 Explicit Composition (Preferred)

```ts
type User = {
  id: string
  name: string
}

type Admin = {
  id: string
  name: string
  permissions: string[]
}
```

5.2 Controlled Intersection Types

```ts
type WithId = { id: string }
type WithTimestamps = { createdAt: string; updatedAt: string }

type Entity = WithId & WithTimestamps
```

Rules:

Max 2–3 intersections

Must be shallow

No recursive or nested intersections

================================================== 6) FUNCTION TYPING RULES
All functions MUST have:

Explicit parameter types

Explicit return types

BAD:

```ts
function save(data) {
  return api.post(data)
}
```

GOOD:

```ts
function save(data: SavePayload): Promise<SaveResult> {
  return api.post(data)
}
```

================================================== 7) ASYNC & PROMISE SAFETY
Rules:

Never return Promise<any>

Never ignore promises

Always await or return

BAD:

```ts
async function load() {}
```

GOOD:

```ts
async function load(): Promise<void> {}
```

================================================== 8) NULL & UNDEFINED SAFETY
Never assume a value exists.

BAD:

```ts
user.name.toUpperCase()
```

GOOD:

```ts
user?.name?.toUpperCase()
```

If a value MUST exist:

Validate explicitly

Throw or handle gracefully

================================================== 9) TYPE NARROWING IS MANDATORY
Use:

typeof

in

instanceof

Custom type guards

Example:

```ts
function isUser(value: unknown): value is User {
  return typeof value === 'object' && value !== null && 'id' in value
}
```

================================================== 10) UNION TYPES OVER ENUMS
Avoid enums.

BAD:

```ts
enum Status {
  Active,
  Inactive,
}
```

GOOD:

```ts
type Status = 'active' | 'inactive'
```

================================================== 11) GENERICS — STRICT DISCIPLINE
Rules:

Use generics ONLY when reused

Never default generics to any

Never constrain generics with extends object

BAD:

```ts
type Box<T extends object> = { value: T }
```

GOOD:

```ts
type Box<T> = { value: T }
```

================================================== 12) satisfies USAGE
satisfies MAY be used for:

Config objects

Literal validation without widening

satisfies MUST NOT:

Replace proper typing

Be used to bypass type errors

================================================== 13) API & DATA CONTRACT RULES
Rules:

Every API response must be typed

Never trust backend blindly

Always model error states

Example:

```ts
type ApiResult<T> = { success: true; data: T } | { success: false; message: string }
```

================================================== 14) PERFORMANCE-AWARE TYPING
Avoid:

Conditional types

Recursive types

Deep mapped types

Over-generic helpers

Prefer:

Flat explicit types

Readable shapes

Maintainability over cleverness

================================================== 15) REACT + TYPESCRIPT RULES
Components:

All props MUST be typed

React.FC is DISCOURAGED

children must be typed explicitly when used

Hooks:

Custom hooks MUST have explicit return types

Prefer object returns over tuples

Events:

Use React event types

Never use any for events

Refs:

Refs MUST be typed

useRef(null) without a generic is FORBIDDEN

================================================== 16) AI AGENT ENFORCEMENT RULES
ANY AI AGENT MUST:

Avoid any

Avoid extends by default

Prefer composition

Use utility types when deriving shapes

Explicitly type everything

Ask for clarification if requirements are unclear

ANY AI AGENT MUST NOT:

Silence TypeScript

Cast away errors

Invent domain fields

Introduce inheritance chains

Add complex types without justification

================================================== 17) FINAL LAW
If a type is hard to read, it is wrong.
If TypeScript is slow, the types are too clever.
Simple types scale. Complex types break teams.
