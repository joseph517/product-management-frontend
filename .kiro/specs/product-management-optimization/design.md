# Design Document

## Overview

Esta especificación de diseño define una arquitectura optimizada para el módulo product-management que aborda los problemas identificados en el código actual. El diseño se enfoca en implementar patrones modernos de Angular, mejorar el rendimiento, la mantenibilidad y la experiencia de usuario.

### Problemas Identificados en el Código Actual

1. **Acoplamiento fuerte**: UpdateDialogComponent inyecta directamente ListProductsComponent
2. **Falta de gestión de estado**: No hay un estado centralizado para productos
3. **Duplicación de código**: CreateFormComponent y UpdateFormComponent tienen lógica similar
4. **Falta de optimización de rendimiento**: No usa OnPush, trackBy, ni manejo de suscripciones
5. **Manejo de errores inconsistente**: Cada componente maneja errores de forma diferente
6. **Falta de funcionalidades**: No hay búsqueda, filtrado, ni ordenamiento
7. **UX subóptima**: No hay indicadores de carga ni feedback visual consistente

## Architecture

### Estado Centralizado con Facade Pattern

```typescript
// Nuevo ProductFacade que centraliza el estado y operaciones
@Injectable({ providedIn: 'root' })
export class ProductFacade {
  private productsSubject = new BehaviorSubject<Product[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private errorSubject = new BehaviorSubject<string | null>(null);
  private paginationSubject = new BehaviorSubject<PaginationState>(initialPagination);
  private filtersSubject = new BehaviorSubject<ProductFilters>(initialFilters);

  // Observables públicos
  products$ = this.productsSubject.asObservable();
  loading$ = this.loadingSubject.asObservable();
  error$ = this.errorSubject.asObservable();
  pagination$ = this.paginationSubject.asObservable();
  filters$ = this.filtersSubject.asObservable();
}
```

### Arquitectura por Capas

```
┌─────────────────────────────────────────┐
│              Presentation Layer          │
│  (Smart & Dumb Components)              │
├─────────────────────────────────────────┤
│              Facade Layer               │
│  (ProductFacade - Estado Centralizado)  │
├─────────────────────────────────────────┤
│              Service Layer              │
│  (ProductService - HTTP Operations)     │
├─────────────────────────────────────────┤
│              Infrastructure Layer       │
│  (HTTP Client, Error Handling)         │
└─────────────────────────────────────────┘
```

## Components and Interfaces

### Nuevas Interfaces Optimizadas

```typescript
// Estados y filtros
export interface ProductFilters {
  search?: string;
  priceRange?: { min: number; max: number };
  sortBy?: 'name' | 'price' | 'createdAt';
  sortDirection?: 'asc' | 'desc';
}

export interface PaginationState {
  currentPage: number;
  pageSize: number;
  totalPages: number;
  totalRecords: number;
}

export interface ProductState {
  products: Product[];
  loading: boolean;
  error: string | null;
  pagination: PaginationState;
  filters: ProductFilters;
}

// Operaciones
export interface ProductOperation {
  type: 'create' | 'update' | 'delete';
  loading: boolean;
  error: string | null;
}
```

### Componentes Rediseñados

#### 1. Smart Components (Container Components)

**ProductListContainerComponent**
- Maneja el estado a través del ProductFacade
- Coordina las operaciones CRUD
- Pasa datos a componentes presentacionales

**ProductFormContainerComponent**
- Maneja tanto creación como edición
- Utiliza el mismo formulario base para ambas operaciones
- Gestiona el estado del formulario a través del facade

#### 2. Dumb Components (Presentational Components)

**ProductListComponent**
- Solo recibe datos via @Input
- Emite eventos via @Output
- Usa OnPush change detection
- Implementa trackBy para optimización

**ProductFormComponent**
- Componente reutilizable para crear/editar
- Recibe configuración via @Input
- Validaciones reactivas optimizadas

**ProductFiltersComponent**
- Componente independiente para filtros
- Debounce en búsqueda
- Emite cambios de filtros

### Estructura de Archivos Optimizada

```
product-management/
├── components/
│   ├── containers/
│   │   ├── product-list-container/
│   │   └── product-form-container/
│   ├── presentational/
│   │   ├── product-list/
│   │   ├── product-form/
│   │   ├── product-filters/
│   │   └── product-card/
│   └── shared/
│       ├── loading-spinner/
│       └── error-message/
├── services/
│   ├── product.service.ts
│   ├── product-facade.service.ts
│   └── product-cache.service.ts
├── models/
│   ├── product.model.ts
│   ├── product-state.model.ts
│   └── product-filters.model.ts
├── validators/
│   └── product.validators.ts
├── utils/
│   ├── product.utils.ts
│   └── form.utils.ts
└── pages/
    └── layout/
```

## Data Models

### Modelos Optimizados

```typescript
// Modelo principal con métodos de utilidad
export class ProductModel implements Product {
  constructor(
    public id: number,
    public name: string,
    public description: string,
    public price: number,
    public createdAt: Date | string
  ) {}

  // Métodos de utilidad
  static fromApiResponse(data: any): ProductModel {
    return new ProductModel(
      data.id,
      data.name,
      data.description || '',
      data.price,
      new Date(data.createdAt)
    );
  }

  toUpdatePayload(): UpdateProduct {
    return {
      name: this.name,
      description: this.description,
      price: this.price
    };
  }

  matches(filters: ProductFilters): boolean {
    // Lógica de filtrado local
  }
}

// Cache model para optimización
export interface ProductCache {
  data: Product[];
  timestamp: number;
  filters: ProductFilters;
  pagination: PaginationState;
}
```

## Error Handling

### Estrategia Centralizada de Manejo de Errores

```typescript
@Injectable({ providedIn: 'root' })
export class ErrorHandlerService {
  handleHttpError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Ha ocurrido un error inesperado';
    
    if (error.status === 0) {
      errorMessage = 'Error de conexión. Verifique su conexión a internet.';
    } else if (error.status >= 400 && error.status < 500) {
      errorMessage = error.error?.message || 'Error en la solicitud';
    } else if (error.status >= 500) {
      errorMessage = 'Error del servidor. Intente nuevamente más tarde.';
    }

    // Log para debugging
    console.error('HTTP Error:', error);
    
    return throwError(() => new Error(errorMessage));
  }
}
```

### Interceptor para Manejo Global

```typescript
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      retry(2), // Retry automático
      catchError((error: HttpErrorResponse) => {
        return this.errorHandler.handleHttpError(error);
      })
    );
  }
}
```

## Testing Strategy

### Estrategia de Testing Integral

#### 1. Unit Tests
- **Servicios**: Mockear HttpClient, probar lógica de negocio
- **Facades**: Probar gestión de estado y coordinación
- **Componentes**: Probar lógica de presentación y eventos
- **Validators**: Probar todas las reglas de validación
- **Utils**: Probar funciones de utilidad

#### 2. Integration Tests
- **Flujos CRUD completos**: Crear → Listar → Editar → Eliminar
- **Filtrado y búsqueda**: Probar combinaciones de filtros
- **Paginación**: Probar navegación entre páginas
- **Manejo de errores**: Probar respuestas a errores HTTP

#### 3. E2E Tests
- **Flujos de usuario críticos**: Gestión completa de productos
- **Responsive design**: Probar en diferentes tamaños de pantalla
- **Accesibilidad**: Probar navegación con teclado y screen readers

### Herramientas de Testing

```typescript
// Ejemplo de test para ProductFacade
describe('ProductFacade', () => {
  let facade: ProductFacade;
  let productService: jasmine.SpyOf<ProductService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('ProductService', ['getProducts', 'createProduct']);
    TestBed.configureTestingModule({
      providers: [
        ProductFacade,
        { provide: ProductService, useValue: spy }
      ]
    });
    facade = TestBed.inject(ProductFacade);
    productService = TestBed.inject(ProductService) as jasmine.SpyOf<ProductService>;
  });

  it('should load products and update state', fakeAsync(() => {
    const mockProducts = [/* mock data */];
    productService.getProducts.and.returnValue(of({ data: mockProducts }));

    facade.loadProducts();
    tick();

    facade.products$.subscribe(products => {
      expect(products).toEqual(mockProducts);
    });
  }));
});
```

## Performance Optimizations

### 1. Change Detection Strategy

```typescript
@Component({
  selector: 'app-product-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `...`
})
export class ProductListComponent {
  @Input() products: Product[] = [];
  
  trackByProductId(index: number, product: Product): number {
    return product.id;
  }
}
```

### 2. Subscription Management

```typescript
export class BaseComponent implements OnDestroy {
  protected destroy$ = new Subject<void>();

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

// Uso en componentes
export class ProductListContainerComponent extends BaseComponent {
  ngOnInit(): void {
    this.productFacade.products$
      .pipe(takeUntil(this.destroy$))
      .subscribe(products => {
        // Handle products
      });
  }
}
```

### 3. Caching Strategy

```typescript
@Injectable({ providedIn: 'root' })
export class ProductCacheService {
  private cache = new Map<string, ProductCache>();
  private readonly CACHE_DURATION = 5 * 60 * 1000; // 5 minutos

  getCachedProducts(filters: ProductFilters, pagination: PaginationState): Product[] | null {
    const key = this.generateCacheKey(filters, pagination);
    const cached = this.cache.get(key);
    
    if (cached && this.isCacheValid(cached)) {
      return cached.data;
    }
    
    return null;
  }

  setCachedProducts(products: Product[], filters: ProductFilters, pagination: PaginationState): void {
    const key = this.generateCacheKey(filters, pagination);
    this.cache.set(key, {
      data: products,
      timestamp: Date.now(),
      filters,
      pagination
    });
  }
}
```

### 4. Lazy Loading y Code Splitting

```typescript
// Lazy loading del módulo
const routes: Routes = [
  {
    path: 'products',
    loadChildren: () => import('./product-management/product-management.module')
      .then(m => m.ProductManagementModule)
  }
];

// Preloading strategy
@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules
  })]
})
export class AppRoutingModule {}
```

## User Experience Improvements

### 1. Loading States

```typescript
// Loading spinner component reutilizable
@Component({
  selector: 'app-loading-spinner',
  template: `
    <div class="loading-container" *ngIf="loading">
      <p-progressSpinner></p-progressSpinner>
      <p>{{ message }}</p>
    </div>
  `
})
export class LoadingSpinnerComponent {
  @Input() loading = false;
  @Input() message = 'Cargando...';
}
```

### 2. Optimistic Updates

```typescript
// En ProductFacade
async deleteProduct(id: number): Promise<void> {
  // Optimistic update
  const currentProducts = this.productsSubject.value;
  const optimisticProducts = currentProducts.filter(p => p.id !== id);
  this.productsSubject.next(optimisticProducts);

  try {
    await this.productService.deleteProduct(id).toPromise();
    // Success - no need to update again
  } catch (error) {
    // Rollback on error
    this.productsSubject.next(currentProducts);
    throw error;
  }
}
```

### 3. Debounced Search

```typescript
@Component({
  selector: 'app-product-filters',
  template: `
    <input 
      type="text" 
      [formControl]="searchControl" 
      placeholder="Buscar productos..."
    >
  `
})
export class ProductFiltersComponent implements OnInit {
  searchControl = new FormControl('');

  ngOnInit(): void {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        takeUntil(this.destroy$)
      )
      .subscribe(searchTerm => {
        this.filtersChanged.emit({ search: searchTerm });
      });
  }
}
```

Este diseño optimizado aborda todos los requisitos identificados, proporcionando una arquitectura más robusta, mantenible y performante para el módulo product-management.
