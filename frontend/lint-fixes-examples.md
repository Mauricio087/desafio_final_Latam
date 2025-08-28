# 🔧 Ejemplos de Correcciones de Linting

Este archivo contiene ejemplos específicos de cómo corregir los errores de linting encontrados en el proyecto.

## 🟡 Errores de JavaScript/JSX

### 1. Variables no utilizadas

#### En `Login.jsx` - línea 13-14
```javascript
// ❌ Error actual
const { isAuthenticated, login, error } = useAuth()
const { addNotification } = useNotification()

// ✅ Corrección: Remover variables no usadas
const { isAuthenticated, login } = useAuth()
// Remover useNotification si no se usa
```

#### En `Products.jsx` - línea 1
```javascript
// ❌ Error actual
import React, { useState, useMemo, useEffect } from 'react'

// ✅ Corrección: Remover useEffect si no se usa
import React, { useState, useMemo } from 'react'
```

#### En `Purchases.jsx` - línea 17
```javascript
// ❌ Error actual
import {
  Cart,
  Bag,  // <- No se usa
  CheckCircle
} from 'react-bootstrap-icons'

// ✅ Corrección: Remover Bag
import {
  Cart,
  CheckCircle
} from 'react-bootstrap-icons'
```

### 2. Operadores ternarios multilínea

#### En `Cart.jsx` - línea 117
```javascript
// ❌ Error actual
{cartItems.length === 0 ? <EmptyCart /> : <CartItems />}

// ✅ Corrección: Formato multilínea
{cartItems.length === 0
  ? <EmptyCart />
  : <CartItems />}
```

#### En `Purchases.jsx` - líneas 125 y 140
```javascript
// ❌ Error actual
{loading ? 'Cargando...' : 'Ver Compras'}
{purchase.status === 'completed' ? 'Completada' : 'Pendiente'}

// ✅ Corrección: Formato multilínea
{loading
  ? 'Cargando...'
  : 'Ver Compras'}

{purchase.status === 'completed'
  ? 'Completada'
  : 'Pendiente'}
```

### 3. localStorage no definido

#### En `api.js` y `AuthContext.jsx`
```javascript
// ❌ Error actual
const token = localStorage.getItem('token')
localStorage.setItem('token', newToken)
localStorage.removeItem('token')

// ✅ Corrección: Agregar comentario global
/* global localStorage */
const token = localStorage.getItem('token')
localStorage.setItem('token', newToken)
localStorage.removeItem('token')

// ✅ Alternativa: Verificación de entorno
const getToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('token')
  }
  return null
}

const setToken = (token) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('token', token)
  }
}

const removeToken = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('token')
  }
}
```

## 🟣 Errores de CSS

### 1. Nombre de keyframe en kebab-case

#### En `main.css` - línea 189
```css
/* ❌ Error actual */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.fade-animation {
  animation: fadeIn 0.3s ease-in-out;
}

/* ✅ Corrección: Cambiar a kebab-case */
@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.fade-animation {
  animation: fade-in 0.3s ease-in-out;
}
```

## 🚀 Scripts para Aplicar Correcciones

### Corrección Automática Completa
```bash
# Ejecutar todas las correcciones automáticas
npm run lint:auto

# Verificar que se aplicaron correctamente
npm run lint:check
```

### Corrección Manual de Archivos Específicos

#### Para corregir Login.jsx
```bash
# Abrir el archivo y aplicar las correcciones manuales
code src/pages/Login.jsx

# Verificar solo este archivo
npx standard src/pages/Login.jsx
```

#### Para corregir main.css
```bash
# Abrir el archivo y cambiar fadeIn a fade-in
code src/main.css

# Verificar solo este archivo
npx stylelint src/main.css
```

## 📝 Plantilla de Corrección Paso a Paso

### 1. Identificar errores
```bash
npm run lint:check
```

### 2. Aplicar correcciones automáticas
```bash
npm run lint:auto
```

### 3. Corregir errores manuales restantes

#### Variables no utilizadas:
- Abrir el archivo indicado
- Ir a la línea especificada
- Remover la importación o variable no utilizada
- Guardar el archivo

#### Operadores ternarios:
- Abrir el archivo indicado
- Ir a la línea especificada
- Reformatear en múltiples líneas:
  ```javascript
  condition
    ? valueIfTrue
    : valueIfFalse
  ```

#### localStorage:
- Agregar `/* global localStorage */` al inicio del archivo
- O implementar verificaciones de entorno

#### Nombres CSS:
- Cambiar camelCase a kebab-case
- Actualizar todas las referencias

### 4. Verificar correcciones
```bash
npm run lint:check
```

### 5. Confirmar que todo está limpio
```bash
# Debería mostrar "Sin errores encontrados"
npm run lint
```

## 🎯 Resultado Esperado

Después de aplicar todas las correcciones, deberías ver:

```
🔍 Ejecutando linters...

📋 JavaScript/JSX (StandardJS)
Comando: npx standard --fix

✅ Sin errores encontrados
============================================================

📋 CSS (Stylelint)
Comando: npx stylelint "**/*.css" --fix

✅ Sin errores encontrados
============================================================

🎯 Linting completado
💡 Se aplicaron correcciones automáticas donde fue posible
💡 Ejecuta nuevamente sin --fix para ver errores restantes
```

## 🔄 Mantenimiento Continuo

### Durante el desarrollo:
1. Ejecuta `npm run lint:check` cada 15-30 minutos
2. Usa `npm run lint:auto` antes de cada commit
3. Configura tu editor para mostrar errores en tiempo real

### Antes de hacer push:
1. `npm run lint:auto`
2. `npm run lint:check`
3. `npm test` (si tienes tests)
4. `npm run build` (para verificar que compila)

Esto garantiza que tu código siempre esté limpio y siga las mejores prácticas.