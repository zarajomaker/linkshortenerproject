# Agent Instructions - Link Shortener Project

Este archivo sirve como índice para todas las instrucciones de desarrollo destinadas a LLMs que trabajen en este proyecto.

## ⚠️ AVISO CRÍTICO PARA LLMs ⚠️

**🚨 REGLA FUNDAMENTAL - LECTURA OBLIGATORIA:**

**SIEMPRE debes leer los archivos de documentación relevantes en la carpeta `/docs` ANTES de generar cualquier código.**

Esto NO es opcional. Es un requisito crítico para:

✅ **Seguir las convenciones establecidas del proyecto**
✅ **Usar los patrones correctos (shadcn/ui, Clerk, Drizzle ORM)**
✅ **Evitar crear soluciones incorrectas o incompatibles**
✅ **Mantener la consistencia del código**
✅ **Respetar las decisiones arquitectónicas del proyecto**

**Flujo de trabajo OBLIGATORIO:**

1. **PRIMERO**: Lee el archivo de documentación relevante en `/docs`
2. **SEGUNDO**: Comprende las convenciones y patrones específicos
3. **TERCERO**: Genera código siguiendo esas guías
4. **NUNCA**: Generes código sin consultar la documentación primero

**Archivos disponibles en `/docs`:**
- `authentication.md` - Para autenticación con Clerk
- `components.md` - Para componentes y shadcn/ui
- Más archivos según se documenten en este índice

---

## 📋 Propósito

Estas guías están diseñadas para que los agentes de IA (LLMs) comprendan y sigan las convenciones, patrones y mejores prácticas establecidas en este proyecto de acortador de enlaces.

**RECUERDA:** Antes de implementar cualquier funcionalidad, debes consultar los archivos `.md` correspondientes en la carpeta `/docs` para asegurar que tu implementación es coherente con las decisiones arquitectónicas y patrones establecidos.

## 📚 Documentación

### Core Guides

#### [Overview]
Visión general del proyecto, tech stack completo y principios fundamentales de desarrollo.

**Contenido clave:**
- Stack tecnológico (Next.js 16+, React 19, TypeScript, Clerk, Drizzle ORM, Tailwind CSS v4)
- Estructura de carpetas del proyecto
- Variables de entorno requeridas
- Comandos principales

#### [Architecture]
Arquitectura del proyecto y patrones de Next.js App Router.

**Contenido clave:**
- App Router structure y convenciones
- Server vs Client Components
- Data fetching strategies
- Routing patterns y metadata

#### [TypeScript]
Guías y convenciones de TypeScript.

**Contenido clave:**
- Configuración strict mode
- Patrones de tipos comunes (Props, API Routes, Server Actions)
- Drizzle ORM types
- Type guards y null safety
- Path aliases (@/*)

#### [Styling]
Tailwind CSS v4 y patrones de estilizado.

**Contenido clave:**
- Utility-first approach
- Función `cn()` para class merging
- Responsive design (mobile-first)
- Dark mode patterns
- Typography y spacing system

### Features & Patterns

#### [Components](docs/components.md)
Patrones de componentes y uso de shadcn/ui.

**Contenido clave:**
- shadcn/ui philosophy y instalación
- Uso exclusivo de shadcn/ui (NO componentes personalizados)
- Server vs Client component patterns
- Form patterns con Server Actions
- Loading states y Suspense
- Icons con Lucide React
- Best practices de composición

#### [Database]
Drizzle ORM y patrones de base de datos.

**Contenido clave:**
- Schema definitions
- CRUD operations
- Query API y relaciones
- Migraciones con Drizzle Kit
- Transactions y prepared statements
- Patrones comunes (pagination, soft delete, aggregations)

#### [Authentication](docs/authentication.md)
Autenticación con Clerk.

**Contenido clave:**
- Uso exclusivo de Clerk (NO otros métodos)
- Rutas protegidas (/dashboard requiere auth)
- Redirección: usuarios autenticados de / a /dashboard
- Sign in/out como modales (NO páginas dedicadas)
- Patrones de verificación en Server/Client Components
- API Routes y Server Actions authentication

#### [API Routes]
API Routes y Server Actions.

**Contenido clave:**
- Route handlers (GET, POST, PUT, DELETE)
- Dynamic routes
- Request/Response handling
- Server Actions patterns
- Form handling con useFormState
- Rate limiting y CORS

### Project Organization

#### [File Structure]
Organización de archivos y convenciones de nomenclatura.

**Contenido clave:**
- Project structure completo
- Naming conventions (archivos, carpetas, componentes)
- Import patterns y path aliases
- Environment variables
- Special files de Next.js

#### [Testing]
Guías de testing (Unit, Integration, E2E).

**Contenido clave:**
- Testing stack recomendado (Vitest, Testing Library, Playwright)
- Unit tests de utilities y componentes
- Testing de Server Actions y API Routes
- E2E tests con Playwright
- Mocking con MSW
- Best practices

## 🎯 Cómo Usar Esta Documentación

### Para LLMs/Agentes de IA:

**Workflow OBLIGATORIO antes de generar código:**

1. **Identifica la funcionalidad** que necesitas implementar
2. **Localiza el archivo de documentación** relevante en este índice
3. **LEE COMPLETAMENTE** el archivo `.md` correspondiente en `/docs`
4. **Comprende** las convenciones, patrones y restricciones
5. **Genera código** siguiendo exactamente esas guías
6. **Valida** que tu código cumple con los patrones documentados

**Ejemplos de consulta obligatoria:**

- ¿Implementando autenticación? → Lee `docs/authentication.md` PRIMERO
- ¿Creando un componente UI? → Lee `docs/components.md` PRIMERO
- ¿Trabajando con la base de datos? → Lee la sección Database de este índice PRIMERO
- ¿Añadiendo una API route? → Lee la sección API Routes PRIMERO

**⚠️ ADVERTENCIA:** Generar código sin leer la documentación relevante resultará en:
- Uso de patrones incorrectos
- Violación de convenciones del proyecto
- Código incompatible con la arquitectura establecida
- Necesidad de reescribir el código completamente

### Para Desarrolladores Humanos:

Esta documentación también sirve como referencia rápida para:
- Onboarding de nuevos desarrolladores
- Resolver dudas sobre convenciones
- Mantener consistencia en el código
- Tomar decisiones de arquitectura

## 🔄 Mantenimiento

Esta documentación debe actualizarse cuando:
- Se añadan nuevas tecnologías al stack
- Se cambien patrones o convenciones importantes
- Se identifiquen gaps en la documentación actual
- Se añadan nuevas features significativas

## 📖 Convenciones Generales

### Idioma
- Código: Inglés (variables, funciones, comentarios)
- Documentación: Español
- Commits: Español o Inglés (consistente)

### Principios de Desarrollo
1. **Type Safety First** - Aprovechar TypeScript al máximo
2. **Server Components by Default** - Client components solo cuando sea necesario
3. **Component Reusability** - Usar shadcn/ui y crear componentes reutilizables
4. **Performance** - Optimizar carga de datos, imágenes y fuentes
5. **Accessibility** - Componentes accesibles usando Radix UI
6. **Dark Mode Support** - Soportar modo claro y oscuro
7. **Mobile First** - Diseño responsive desde el inicio

### Development Workflow
```bash
# Desarrollo
npm run dev

# Linting
npm run lint

# Build
npm run build

# Testing (cuando esté configurado)
npm test

# Database
npx drizzle-kit generate  # Generar migración
npx drizzle-kit migrate   # Aplicar migración
npx drizzle-kit studio    # UI visual
```

## 🚀 Quick Reference

### Common Imports
```typescript
// Database
import { db } from '@/db'
import { links } from '@/db/schema'
import { eq, and, desc } from 'drizzle-orm'

// Components
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

// Utils
import { cn } from '@/lib/utils'

// Auth
import { auth, currentUser } from '@clerk/nextjs/server'

// Navigation
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
```

### Common Patterns
```typescript
// Protected Page
const { userId } = await auth()
if (!userId) redirect('/sign-in')

// Database Query
const links = await db.select().from(links).where(eq(links.userId, userId))

// Server Action
'use server'
export async function createLink(formData: FormData) { }

// Client Component
'use client'
export function Interactive() { }
```

## 📝 License & Credits

Este proyecto es parte de un curso de Udemy sobre desarrollo full-stack con Next.js.

---

**Última actualización**: Febrero 2026

Para preguntas o sugerencias sobre esta documentación, por favor abre un issue o contacta al equipo de desarrollo.
