# Components - shadcn/ui

## 🎨 Principio Fundamental

**CRÍTICO**: Este proyecto utiliza EXCLUSIVAMENTE componentes de shadcn/ui. NO se deben crear componentes UI personalizados bajo ninguna circunstancia. SIEMPRE usar los componentes proporcionados por shadcn/ui.

## 📋 Reglas de Componentes UI

### 1. Uso Exclusivo de shadcn/ui

#### Filosofía
- **shadcn/ui NO es una librería de componentes** - Es una colección de componentes reutilizables que se copian a tu proyecto
- Los componentes están construidos sobre **Radix UI** para funcionalidad y accesibilidad
- Estilizados con **Tailwind CSS**
- Totalmente personalizables y propios del proyecto

#### Instalación de Componentes
```bash
# Instalar un componente individual
npx shadcn@latest add button

# Instalar múltiples componentes
npx shadcn@latest add button card dialog form

# Ver componentes disponibles
npx shadcn@latest add
```

#### Componentes Disponibles
Los componentes se instalan en `components/ui/` y incluyen:
- **Layout**: card, separator, sheet, tabs
- **Forms**: button, input, textarea, select, checkbox, radio-group, switch, slider
- **Feedback**: alert, alert-dialog, dialog, toast, tooltip
- **Data Display**: avatar, badge, table, dropdown-menu
- **Navigation**: menubar, navigation-menu, breadcrumb
- **Overlays**: popover, sheet, tooltip, dialog
- Y muchos más...

### 2. Estructura de Componentes

#### Server Components (Por Defecto)
```typescript
// components/link-list.tsx
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export function LinkList({ links }: { links: Link[] }) {
  return (
    <div className="space-y-4">
      {links.map((link) => (
        <Card key={link.id}>
          <CardHeader>
            <CardTitle>{link.shortCode}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">{link.originalUrl}</p>
            <Badge>{link.clicks} clicks</Badge>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
```

#### Client Components (Solo cuando sea necesario)
```typescript
// components/interactive-dialog.tsx
'use client'

import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

export function InteractiveDialog() {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Open Dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Title</DialogTitle>
          <DialogDescription>Description</DialogDescription>
        </DialogHeader>
        {/* Content */}
      </DialogContent>
    </Dialog>
  )
}
```

### 3. Patrones de Formularios

#### Formularios con Server Actions
```typescript
// components/link-form.tsx
'use client'

import { useFormState } from 'react-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { createLinkAction } from '@/app/actions'

export function LinkForm() {
  const [state, formAction] = useFormState(createLinkAction, null)

  return (
    <form action={formAction} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="url">URL</Label>
        <Input
          id="url"
          name="url"
          type="url"
          placeholder="https://example.com"
          required
        />
      </div>
      
      {state?.error && (
        <Alert variant="destructive">
          <AlertDescription>{state.error}</AlertDescription>
        </Alert>
      )}
      
      <Button type="submit">Crear Enlace</Button>
    </form>
  )
}
```

### 4. Composición de Componentes

#### Wrapper Components (Permitido)
Puedes crear componentes que **compongan** componentes de shadcn/ui, pero NO reemplazarlos:

```typescript
// components/link-card.tsx - ✅ CORRECTO
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

interface LinkCardProps {
  title: string
  url: string
  clicks: number
  onDelete: () => void
}

export function LinkCard({ title, url, clicks, onDelete }: LinkCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <p className="text-sm text-muted-foreground">{url}</p>
        <div className="flex items-center justify-between">
          <Badge>{clicks} clicks</Badge>
          <Button variant="destructive" size="sm" onClick={onDelete}>
            Eliminar
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
```

#### ❌ NO Hacer - Componentes UI Personalizados
```typescript
// components/custom-button.tsx - ❌ INCORRECTO
export function CustomButton({ children }: { children: React.ReactNode }) {
  return (
    <button className="px-4 py-2 bg-blue-500 text-white rounded">
      {children}
    </button>
  )
}

// ✅ USAR ESTO EN SU LUGAR
import { Button } from '@/components/ui/button'

<Button>Click me</Button>
```

### 5. Utilidad `cn()`

#### Para Combinar Clases
```typescript
import { cn } from '@/lib/utils'

// Combinar clases con condicionales
<div className={cn(
  "base-classes",
  isActive && "active-classes",
  variant === "primary" && "variant-classes"
)} />

// Extender componentes de shadcn/ui
<Button
  className={cn("w-full", className)}
  {...props}
/>
```

### 6. Icons con Lucide React

#### shadcn/ui usa Lucide React para iconos
```typescript
import { Plus, Trash2, ExternalLink, Copy, ChevronDown } from 'lucide-react'

<Button>
  <Plus className="mr-2 h-4 w-4" />
  Crear Enlace
</Button>

<Button variant="ghost" size="icon">
  <Trash2 className="h-4 w-4" />
</Button>
```

### 7. Loading States y Suspense

#### Skeleton Components
```typescript
import { Skeleton } from '@/components/ui/skeleton'
import { Card, CardContent, CardHeader } from '@/components/ui/card'

export function LinkCardSkeleton() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-6 w-1/2" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3 mt-2" />
      </CardContent>
    </Card>
  )
}
```

#### Con Suspense
```typescript
import { Suspense } from 'react'
import { LinkList } from '@/components/link-list'
import { LinkCardSkeleton } from '@/components/link-card-skeleton'

export default function DashboardPage() {
  return (
    <Suspense fallback={
      <div className="space-y-4">
        <LinkCardSkeleton />
        <LinkCardSkeleton />
        <LinkCardSkeleton />
      </div>
    }>
      <LinkList />
    </Suspense>
  )
}
```

### 8. Variantes y Personalización

#### Usar las Variantes Disponibles
```typescript
// Button variants
<Button variant="default">Default</Button>
<Button variant="destructive">Delete</Button>
<Button variant="outline">Outline</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>

// Button sizes
<Button size="default">Default</Button>
<Button size="sm">Small</Button>
<Button size="lg">Large</Button>
<Button size="icon"><Icon /></Button>
```

#### Personalizar con Tailwind
```typescript
// Extender estilos existentes, NO reemplazar
<Card className="hover:shadow-lg transition-shadow">
  {/* content */}
</Card>

<Button className="bg-gradient-to-r from-blue-500 to-purple-600">
  Gradiente
</Button>
```

### 9. Accesibilidad

#### shadcn/ui es Accesible por Defecto
- Todos los componentes están construidos con **Radix UI**
- Incluyen manejo de teclado, ARIA labels, y focus management
- **NO romper** la accesibilidad al personalizar:

```typescript
// ✅ CORRECTO - Mantiene accesibilidad
<Button aria-label="Eliminar enlace">
  <Trash2 className="h-4 w-4" />
</Button>

// ❌ INCORRECTO - Rompe accesibilidad
<div onClick={handleClick}>
  <Trash2 />
</div>
```

### 10. Dark Mode

#### Componentes soportan Dark Mode automáticamente
```typescript
// Los componentes respetan el theme automáticamente
<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
  </CardHeader>
  <CardContent>
    {/* Las clases como text-muted-foreground se adaptan al theme */}
    <p className="text-muted-foreground">Description</p>
  </CardContent>
</Card>
```

## 🚀 Quick Reference

### Instalación Común de Componentes
```bash
# Formularios básicos
npx shadcn@latest add button input label form

# Cards y layouts
npx shadcn@latest add card separator tabs

# Dialogs y alerts
npx shadcn@latest add dialog alert alert-dialog

# Data display
npx shadcn@latest add table badge avatar

# Loading states
npx shadcn@latest add skeleton
```

### Imports Comunes
```typescript
// UI Components
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'

// Utils
import { cn } from '@/lib/utils'

// Icons
import { Plus, Trash2, ExternalLink } from 'lucide-react'
```

## ✅ Checklist para Componentes

Al crear un nuevo componente, verifica:

- [ ] ¿Estoy usando SOLO componentes de shadcn/ui?
- [ ] ¿El componente está bien compuesto (no reemplazado)?
- [ ] ¿Es Server Component por defecto?
- [ ] ¿Solo agrego 'use client' si es necesario?
- [ ] ¿Mantengo la accesibilidad de los componentes?
- [ ] ¿Uso `cn()` para combinar clases?
- [ ] ¿Los iconos son de Lucide React?
- [ ] ¿Respeta dark mode?
- [ ] ¿Tiene tipos TypeScript apropiados?

## 📚 Recursos

- [shadcn/ui Documentation](https://ui.shadcn.com/)
- [Radix UI Documentation](https://www.radix-ui.com/)
- [Lucide Icons](https://lucide.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)

---

**Última actualización**: Febrero 2026
