# Authentication - Clerk

## 🔐 Principio Fundamental

**IMPORTANTE**: Este proyecto utiliza EXCLUSIVAMENTE Clerk para autenticación. NO se deben implementar otros métodos de autenticación bajo ninguna circunstancia.

## 📋 Reglas de Autenticación

### 1. Protección de Rutas

#### Ruta Protegida: `/dashboard`
- **DEBE** requerir que el usuario esté autenticado
- Si el usuario NO está autenticado → redirigir a sign-in modal
- Implementar verificación en el componente de página

```typescript
// app/dashboard/page.tsx
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

export default async function DashboardPage() {
  const { userId } = await auth()
  
  if (!userId) {
    redirect('/sign-in')
  }

  // Contenido protegido
  return <div>Dashboard</div>
}
```

#### Homepage con Usuario Autenticado
- Si el usuario ESTÁ autenticado y accede a `/` → redirigir a `/dashboard`
- Evitar que usuarios autenticados vean la landing page

```typescript
// app/page.tsx
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

export default async function HomePage() {
  const { userId } = await auth()
  
  if (userId) {
    redirect('/dashboard')
  }

  // Landing page para usuarios no autenticados
  return <div>Welcome</div>
}
```

### 2. Modales de Autenticación

#### Sign In y Sign Out como Modales
- **SIEMPRE** lanzar sign in y sign out como modales
- **NUNCA** usar páginas dedicadas para auth
- Usar los componentes de Clerk configurados en modo modal

```typescript
// Configuración en middleware o layout
import { ClerkProvider } from '@clerk/nextjs'

export default function RootLayout({ children }) {
  return (
    <ClerkProvider
      appearance={{
        // Configuración para modales
      }}
    >
      {children}
    </ClerkProvider>
  )
}
```

```typescript
// Componente con botón de sign in
'use client'
import { SignInButton } from '@clerk/nextjs'

export function LoginButton() {
  return (
    <SignInButton mode="modal">
      <button>Sign In</button>
    </SignInButton>
  )
}
```

```typescript
// Componente con botón de sign out
'use client'
import { SignOutButton } from '@clerk/nextjs'

export function LogoutButton() {
  return (
    <SignOutButton>
      <button>Sign Out</button>
    </SignOutButton>
  )
}
```

## 🛠️ Patrones Comunes

### Verificar Autenticación en Server Components

```typescript
import { auth } from '@clerk/nextjs/server'

export default async function ServerComponent() {
  const { userId } = await auth()
  
  if (!userId) {
    // Usuario no autenticado
    return <div>Please sign in</div>
  }
  
  // Usuario autenticado
  return <div>Hello {userId}</div>
}
```

### Obtener Información del Usuario

```typescript
import { currentUser } from '@clerk/nextjs/server'

export default async function ProfilePage() {
  const user = await currentUser()
  
  if (!user) {
    redirect('/sign-in')
  }

  return (
    <div>
      <p>Email: {user.emailAddresses[0]?.emailAddress}</p>
      <p>Name: {user.firstName} {user.lastName}</p>
    </div>
  )
}
```

### Autenticación en API Routes

```typescript
// app/api/links/route.ts
import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

export async function GET() {
  const { userId } = await auth()
  
  if (!userId) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    )
  }

  // Lógica de API
  return NextResponse.json({ data: [] })
}
```

### Autenticación en Server Actions

```typescript
'use server'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

export async function createLink(formData: FormData) {
  const { userId } = await auth()
  
  if (!userId) {
    redirect('/sign-in')
  }

  // Lógica de la acción
  return { success: true }
}
```

### Componentes Client con Estado de Auth

```typescript
'use client'
import { useUser } from '@clerk/nextjs'

export function UserProfile() {
  const { isLoaded, isSignedIn, user } = useUser()

  if (!isLoaded) {
    return <div>Loading...</div>
  }

  if (!isSignedIn) {
    return <div>Not signed in</div>
  }

  return <div>Hello {user.firstName}</div>
}
```

## 🚫 Prohibiciones

### NO Hacer

❌ **NO** implementar autenticación custom (JWT, sessions, etc.)
❌ **NO** crear páginas dedicadas para sign-in/sign-up (usar modales)
❌ **NO** usar otros proveedores de auth (NextAuth, Auth0, etc.)
❌ **NO** mezclar métodos de autenticación
❌ **NO** permitir acceso a rutas protegidas sin verificar userId
❌ **NO** mostrar la homepage a usuarios autenticados

### SÍ Hacer

✅ **SÍ** usar exclusivamente Clerk
✅ **SÍ** lanzar sign-in/sign-out como modales
✅ **SÍ** proteger `/dashboard` verificando userId
✅ **SÍ** redirigir usuarios autenticados de `/` a `/dashboard`
✅ **SÍ** verificar autenticación en Server Components, API Routes y Server Actions
✅ **SÍ** usar `auth()` para verificación simple de userId
✅ **SÍ** usar `currentUser()` cuando necesites datos completos del usuario

## 🔑 Variables de Entorno Requeridas

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
```

## 📦 Imports Comunes

```typescript
// Server Components y Server Actions
import { auth, currentUser } from '@clerk/nextjs/server'

// Client Components
import { useUser, useAuth } from '@clerk/nextjs'
import { SignInButton, SignOutButton, UserButton } from '@clerk/nextjs'

// Layout/Provider
import { ClerkProvider } from '@clerk/nextjs'

// Middleware
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
```

## 🎯 Checklist de Implementación

Al implementar features con autenticación, verificar:

- [ ] La ruta `/dashboard` está protegida, accesos  sin logear redirigen a `/`
- [ ] Usuarios AUTENTICADOS son redirigidos de `/` a `/dashboard`. O sea, después de un sigin correcta, redirigir a `/dashboard`
- [ ] Sign in/Sign out usan modales (no páginas dedicadas)
- [ ] Server Components verifican `userId` con `auth()`
- [ ] API Routes retornan 401 si no hay `userId`
- [ ] Server Actions verifican autenticación antes de ejecutar
- [ ] No se usan métodos de auth alternativos
- [ ] Variables de entorno de Clerk están configuradas

---

**Última actualización**: Febrero 2026
