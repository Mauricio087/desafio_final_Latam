# 🔍 Guía de Linting

Esta guía te ayudará a usar las herramientas de linting para mantener un código limpio y consistente.

## 🛠️ Herramientas Configuradas

### JavaScript/JSX - StandardJS
- **Herramienta**: [StandardJS](https://standardjs.com/)
- **Configuración**: Automática (sin archivo de configuración necesario)
- **Características**: 
  - Sin punto y coma
  - Comillas simples
  - Espaciado de 2 espacios
  - Sin variables no utilizadas
  - Y muchas más reglas...

### CSS - Stylelint
- **Herramienta**: [Stylelint](https://stylelint.io/)
- **Configuración**: `.stylelintrc.json`
- **Características**:
  - Formato estándar de CSS
  - Orden de propiedades
  - Convenciones de nomenclatura
  - Notación moderna de colores

## 🚀 Comandos Disponibles

### Scripts NPM (Recomendados)

```bash
# Verificar todos los archivos
npm run lint

# Corregir automáticamente todos los errores posibles
npm run lint:fix

# Solo JavaScript/JSX
npm run lint:js
npm run lint:js:fix

# Solo CSS
npm run lint:css
npm run lint:css:fix

# Script personalizado con colores y resumen
npm run lint:check
npm run lint:auto
```

### Comandos Directos

```bash
# JavaScript/JSX
npx standard                    # Verificar
npx standard --fix             # Corregir automáticamente

# CSS
npx stylelint "**/*.css"        # Verificar
npx stylelint "**/*.css" --fix  # Corregir automáticamente

# Script personalizado
node lint-check.js             # Verificar con colores
node lint-check.js --fix       # Corregir con colores
```

## 📋 Flujo de Trabajo Recomendado

### 1. Durante el Desarrollo
```bash
# Ejecuta esto regularmente mientras desarrollas
npm run lint:check
```

### 2. Antes de Hacer Commit
```bash
# Corrige automáticamente lo que se pueda
npm run lint:auto

# Verifica que todo esté limpio
npm run lint:check
```

### 3. Integración con Editor
Configura tu editor para mostrar errores de linting en tiempo real:

#### VS Code
Instala estas extensiones:
- **StandardJS** - JavaScript Standard Style
- **Stylelint** - CSS/SCSS/Less linter

#### Configuración VS Code (`.vscode/settings.json`)
```json
{
  "javascript.validate.enable": false,
  "standard.enable": true,
  "css.validate": false,
  "stylelint.enable": true
}
```

## 🔧 Errores Comunes y Soluciones

### JavaScript/JSX

#### Variables no utilizadas
```javascript
// ❌ Error
import { useState, useEffect } from 'react' // useEffect no se usa

// ✅ Correcto
import { useState } from 'react'
// o
import { useState, useEffect } from 'react' // si ambos se usan
```

#### Operadores ternarios multilínea
```javascript
// ❌ Error
const result = condition ? 'yes' : 'no'

// ✅ Correcto
const result = condition
  ? 'yes'
  : 'no'
```

#### localStorage no definido
```javascript
// ❌ Error (en contexto de Node.js)
localStorage.getItem('token')

// ✅ Correcto (agregar comentario para ESLint)
/* global localStorage */
localStorage.getItem('token')

// o usar verificación
if (typeof window !== 'undefined') {
  localStorage.getItem('token')
}
```

### CSS

#### Nombres de keyframes
```css
/* ❌ Error */
@keyframes fadeIn {
  /* ... */
}

/* ✅ Correcto */
@keyframes fade-in {
  /* ... */
}
```

#### Notación de colores moderna
```css
/* ❌ Error */
color: rgba(255, 0, 0, 0.5);

/* ✅ Correcto */
color: rgb(255 0 0 / 50%);
```

## 🎯 Configuración de Pre-commit

El proyecto ya tiene configurado **Husky** y **lint-staged** para ejecutar linting automáticamente antes de cada commit:

```json
"lint-staged": {
  "*.css": "stylelint",
  "*.{js,jsx}": "standard"
}
```

Esto significa que:
- ✅ Solo código limpio llegará al repositorio
- 🚫 Los commits con errores de linting serán rechazados
- 🔄 Puedes usar `--fix` para corregir antes de commitear

## 📊 Interpretando la Salida

### StandardJS
```
C:\path\to\file.js:10:5: 'variable' is assigned a value but never used. (no-unused-vars)
```
- **Archivo**: `C:\path\to\file.js`
- **Línea**: `10`
- **Columna**: `5`
- **Error**: Variable no utilizada
- **Regla**: `no-unused-vars`

### Stylelint
```
src/main.css
  189:12  ✖  Expected keyframe name "fadeIn" to be kebab-case  keyframes-name-pattern
```
- **Archivo**: `src/main.css`
- **Línea**: `189`
- **Columna**: `12`
- **Error**: Nombre de keyframe debe estar en kebab-case
- **Regla**: `keyframes-name-pattern`

## 💡 Consejos

1. **Ejecuta linting frecuentemente** - No esperes hasta el final
2. **Usa auto-fix** - Muchos errores se corrigen automáticamente
3. **Configura tu editor** - Ver errores en tiempo real es más eficiente
4. **Lee las reglas** - Entender el "por qué" te hace mejor desarrollador
5. **Personaliza si es necesario** - Las reglas se pueden ajustar en casos específicos

## 🔗 Enlaces Útiles

- [StandardJS Rules](https://standardjs.com/rules.html)
- [Stylelint Rules](https://stylelint.io/user-guide/rules/list)
- [ESLint Rules](https://eslint.org/docs/rules/)
- [CSS Guidelines](https://cssguidelin.es/)