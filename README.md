# 🌐 ProductManagementApp - Frontend

**ProductManagementApp** es una aplicación frontend desarrollada en Angular 16 que proporciona una interfaz de usuario moderna y responsiva para gestionar productos. Se conecta con la API **ApiProductManagement** para ofrecer una experiencia completa de CRUD con una interfaz intuitiva y componentes elegantes.

---

## 🎯 Características Principales

- 📱 **Interfaz responsiva** - Diseño adaptable a diferentes dispositivos
- 🎨 **UI moderna con PrimeNG** - Componentes elegantes y profesionales
- 🔧 **Formularios reactivos** - Validación avanzada con Angular Reactive Forms
- 📄 **Paginación inteligente** - Navegación eficiente entre páginas de productos
- ✨ **Notificaciones Toast** - Feedback visual para las acciones del usuario
- 🗃️ **Gestión de estado** - Manejo eficiente del estado de la aplicación
- 🔄 **Comunicación HTTP** - Integración seamless con la API backend

---

## 🛠️ Tecnologías Usadas

- **Angular 16** - Framework principal
- **Angular CLI 16** - Herramientas de desarrollo
- **TypeScript** - Lenguaje de programación tipado
- **Bootstrap 5** - Framework CSS para diseño responsivo
- **PrimeNG 16** - Biblioteca de componentes UI
- **PrimeIcons** - Iconografía moderna
- **Angular Reactive Forms** - Manejo avanzado de formularios
- **RxJS** - Programación reactiva y manejo de observables
- **HttpClient** - Cliente HTTP para comunicación con la API

---

## ⚙️ Instalación y Ejecución

### Prerrequisitos
- **Node.js 18+** instalado
- **npm** o **yarn** como gestor de paquetes
- **Angular CLI 16** instalado globalmente
- **ApiProductManagement** ejecutándose (ver documentación del backend)

### Pasos de instalación

#### 1. Clona el repositorio
```bash
git clone https://github.com/joseph517/product-management-frontend.git
```

#### 2. Instala las dependencias
```bash
npm install
# o usando yarn
yarn install
```

#### 3. Configura la URL de la API
Edita el archivo `src/environments/environment.ts`:
```typescript
export const environment = {
  production: false,
  apiUrl: 'https://localhost:7272/api/Products'
};
```

#### 4. Ejecuta la aplicación en modo desarrollo
```bash
ng serve
# o para abrir automáticamente en el navegador
ng serve --open
```

#### 5. Accede a la aplicación
- **Aplicación**: http://localhost:4200

---

## 🏗️ Estructura del Proyecto

```
ProductManagementApp/
├── src/
│   ├── app/
│   │   ├── app-routing.module.ts        # Configuración de rutas principales
│   │   ├── app.component.css            # Estilos del componente raíz
│   │   ├── app.component.html           # Template del componente raíz
│   │   ├── app.component.spec.ts        # Tests del componente raíz
│   │   ├── app.component.ts             # Componente raíz de la aplicación
│   │   ├── app.module.ts                # Módulo principal
│   │   ├── enviroments/                 # Configuración de entornos
│   │   │   └── enviroments.ts
│   │   ├── prime-ng/                    # Configuración de PrimeNG
│   │   │   └── prime-ng.module.ts       # Módulo de componentes PrimeNG
│   │   ├── product-management/          # Módulo de gestión de productos
│   │   │   ├── components/              # Componentes específicos de productos
│   │   │   │   ├── create-form/         # Formulario de creación
│   │   │   │   │   ├── create-form.component.css
│   │   │   │   │   ├── create-form.component.html
│   │   │   │   │   └── create-form.component.ts
│   │   │   │   ├── list-products/       # Lista y tabla de productos
│   │   │   │   │   ├── list-products.component.css
│   │   │   │   │   ├── list-products.component.html
│   │   │   │   │   └── list-products.component.ts
│   │   │   │   ├── update-dialog/       # Diálogo de actualización
│   │   │   │   │   ├── update-dialog.component.css
│   │   │   │   │   ├── update-dialog.component.html
│   │   │   │   │   └── update-dialog.component.ts
│   │   │   │   └── update-form/         # Formulario de actualización
│   │   │   │       ├── update-form.component.css
│   │   │   │       ├── update-form.component.html
│   │   │   │       └── update-form.component.ts
│   │   │   ├── interfaces/              # Interfaces TypeScript
│   │   │   │   └── product.interface.ts # Interface del modelo Product
│   │   │   ├── pages/                   # Páginas del módulo
│   │   │   │   └── layout/              # Layout principal
│   │   │   │       ├── layout.component.html
│   │   │   │       └── layout.component.ts
│   │   │   ├── product-management.module.ts         # Módulo de productos
│   │   │   ├── product-management.routing.module.ts # Rutas del módulo
│   │   │   └── services/                # Servicios del módulo
│   │   │       └── product.service.ts   # Servicio para operaciones CRUD
│   │   └── shared/                      # Componentes y utilidades compartidas
│   │       ├── components/              # Componentes reutilizables
│   │       │   ├── dialog/              # Componente de diálogo genérico
│   │       │   │   ├── dialog.component.css
│   │       │   │   ├── dialog.component.html
│   │       │   │   └── dialog.component.ts
│   │       │   └── navbar/              # Barra de navegación
│   │       │       ├── navbar.component.html
│   │       │       └── navbar.component.ts
│   │       └── shared.module.ts         # Módulo de componentes compartidos
│   ├── assets/                          # Recursos estáticos (imágenes, etc.)
│   ├── favicon.ico                      # Icono de la aplicación
│   ├── index.html                       # Archivo HTML principal
│   ├── main.ts                          # Punto de entrada de la aplicación
│   └── styles.css                       # Estilos globales
```

---

## 📚 Funcionalidades Principales

### 🏠 Dashboard Principal
- Vista general de la lista de productos
- Navegación intuitiva

### 📋 Gestión de Productos

#### Lista de Productos
- **Tabla responsiva** con Bootstrap y PrimeNG
- **Paginación** del lado del servidor
- **Acciones rápidas**: Crear, Listar, Editar, Eliminar
- **Loading states** durante las operaciones

#### Crear/Editar Producto
- **Formularios reactivos** con validaciones
- **Campos requeridos**: Nombre, Precio
- **Validaciones en tiempo real**
- **Feedback visual** de errores

#### Detalle del Producto
- **Vista completa** de información del producto
- **Navegación** entre productos
- **Opciones de edición** rápida

---

## 🔧 Configuración de Desarrollo

### Comandos útiles
```bash
# Desarrollo
ng serve                 # Servidor de desarrollo
ng build                # Build de producción
ng test                 # Ejecutar tests unitarios
ng lint                 # Linting del código

# Generación de código
ng generate component nombre-componente
ng generate service nombre-servicio
ng generate guard nombre-guard
```

### Configuración del proxy (opcional)
Crea `proxy.conf.json` para evitar problemas de CORS:
```json
{
  "/api/*": {
    "target": "https://localhost:7272",
    "secure": true,
    "changeOrigin": true
  }
}
```

Ejecuta con: `ng serve --proxy-config proxy.conf.json`

---

## 📱 Características de UX/UI

### 🎯 Responsividad
- **Mobile First** - Diseño optimizado para dispositivos móviles
- **Breakpoints** adaptados con Bootstrap
- **Navegación** colapsible en pantallas pequeñas

### ⚡ Performance
- **Lazy Loading** de módulos

### 🔔 Feedback al Usuario
- **Loading spinners** durante operaciones
- **Toast notifications** para acciones exitosas/fallidas
- **Confirmaciones** antes de operaciones destructivas
- **Validaciones** en tiempo real en formularios

---

## 🌍 Configuración de Entornos

### Development (environment.ts)
```typescript
export const environment = {
  production: false,
  apiUrl: 'https://localhost:7272/api',
  enableLogging: true
};
```

### Production (environment.prod.ts)
```typescript
export const environment = {
  production: true,
  apiUrl: 'https://api.tudominio.com/api',
  enableLogging: false
};
```

---

## 📦 Build y Deployment

### Build de Producción
```bash
# Build optimizado
ng build --configuration production

# Build con análisis de bundle
ng build --stats-json
npx webpack-bundle-analyzer dist/product-management-app/stats.json
```
---

## 🚀 Roadmap

### Próximas características
- 📊 **Dashboard con gráficos**
- 🔄 **Sincronización offline**
- 📱 **Progressive Web App (PWA)**
- 🌙 **Modo oscuro**
- 🌐 **Internacionalización (i18n)**

---

## 📞 Contacto

**Desarrollador**: Alvaro Vergara  
**Email**: alvarovergara1993@hotmail.com  
**GitHub**: [joseph517](https://github.com/joseph517)

---

## 🔄 Changelog

### v1.0.0
- ✅ Implementación del CRUD completo de productos
- ✅ Interfaz responsiva con Bootstrap y PrimeNG  
- ✅ Formularios reactivos con validaciones
- ✅ Paginación y filtrado de productos
- ✅ Notificaciones Toast para feedback del usuario
- ✅ Integración completa con ApiProductManagement

---

*Esta aplicación frontend está diseñada para trabajar en conjunto con la API **ApiProductManagement**. Asegúrate de que ambos servicios estén ejecutándose para una experiencia completa.*