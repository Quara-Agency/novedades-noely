# CLAUDE.md — Aquara Agency / Proyecto: Panel de decoraciones

## Qué es este proyecto
Panel de administración web para un negocio pequeño de decoraciones para panteón. La dueña del negocio (no técnica) lo usa desde su celular o computadora para manejar su negocio sin complicaciones.

**No es una app pública.** Es un panel privado para uso interno del negocio.

## Stack
- **Frontend:** HTML + CSS + JavaScript vanilla (sin frameworks)
- **Base de datos:** Supabase (PostgreSQL)
- **Deploy:** Vercel
- **Automatizaciones:** Make.com (cuando se integren)
- **Sin dependencias innecesarias.** Si algo se puede hacer en vanilla JS, no instales una librería.

## Módulos del sistema

### 1. Inventario
- Lista de productos con nombre, descripción, precio de venta, costo, stock actual y stock mínimo
- Alerta visual cuando el stock está por debajo del mínimo
- Agregar, editar y eliminar productos
- Vista de qué productos necesitan surtirse

### 2. Clientes
- Registro de clientes: nombre, teléfono, notas
- Historial de pedidos por cliente
- Búsqueda rápida por nombre o teléfono

### 3. Pedidos
- Crear pedido vinculado a un cliente y productos del inventario
- Estados: pendiente / listo / entregado
- Al confirmar un pedido, el stock se descuenta automático
- Al marcar como entregado, se registra como ingreso

### 4. Finanzas
- Ingresos: se generan automáticamente de pedidos entregados
- Egresos: la dueña los registra manualmente (compras de material, gastos)
- Balance: ingresos menos egresos
- Vistas: hoy / esta semana / este mes / este año
- Gráfica mensual del año para ver picos de temporada

## Estética visual
- Diseño limpio, moderno y minimalista
- Paleta: blanco + un color primario sobrio (propón tú, puede ser verde oscuro o azul petróleo)
- Tipografía clara y legible, tamaño generoso para uso en móvil
- Sidebar de navegación izquierda en desktop, menú inferior en móvil
- Tarjetas con bordes sutiles, sin sombras pesadas
- Iconos simples (usar Lucide icons via CDN)
- Siempre responsive: debe verse bien en iPhone y en laptop

## Reglas para el agente

### Siempre hacer:
- Escribir comentarios en español en el código
- Nombres de variables en inglés (convención estándar)
- Validar formularios antes de enviar a Supabase
- Mostrar estados de carga (loading) y errores al usuario
- Hacer cada módulo en su propio archivo HTML o sección
- Confirmar antes de eliminar cualquier dato (modal de confirmación)

### Nunca hacer:
- Instalar frameworks pesados (React, Vue, Angular) sin pedirlo explícitamente
- Hardcodear credenciales de Supabase en el código (usar variables de entorno)
- Eliminar o reescribir módulos que ya funcionan sin pedirlo
- Cambiar la estructura de la base de datos sin avisar primero
- Usar estilos inline cuando ya existe una clase CSS para eso

## Estructura de carpetas esperada
```
/
├── CLAUDE.md
├── index.html          (dashboard principal)
├── inventario.html
├── clientes.html
├── pedidos.html
├── finanzas.html
├── css/
│   └── styles.css      (estilos globales)
├── js/
│   ├── supabase.js     (cliente y config)
│   ├── inventario.js
│   ├── clientes.js
│   ├── pedidos.js
│   └── finanzas.js
└── .env                (credenciales — nunca subir a git)
```

## Base de datos en Supabase — tablas

### productos
- id (uuid, primary key)
- nombre (text)
- descripcion (text)
- precio_venta (numeric)
- costo (numeric)
- stock_actual (integer)
- stock_minimo (integer)
- created_at (timestamp)

### clientes
- id (uuid, primary key)
- nombre (text)
- telefono (text)
- notas (text)
- created_at (timestamp)

### pedidos
- id (uuid, primary key)
- cliente_id (uuid, foreign key → clientes)
- estado (text: 'pendiente' | 'listo' | 'entregado')
- total (numeric)
- notas (text)
- created_at (timestamp)

### pedido_items
- id (uuid, primary key)
- pedido_id (uuid, foreign key → pedidos)
- producto_id (uuid, foreign key → productos)
- cantidad (integer)
- precio_unitario (numeric)

### transacciones
- id (uuid, primary key)
- tipo (text: 'ingreso' | 'egreso')
- monto (numeric)
- descripcion (text)
- pedido_id (uuid, nullable — si viene de un pedido)
- fecha (date)
- created_at (timestamp)

## Contexto del negocio
- Negocio de temporada con pico fuerte en octubre y noviembre (Día de Muertos)
- La usuaria principal no es técnica, todo debe ser simple e intuitivo
- Prioridad: que funcione bien en celular
- Idioma de la interfaz: español mexicano

## Primer paso sugerido
Antes de construir cualquier módulo, crear:
1. El archivo styles.css con el design system base
2. El index.html con el dashboard y la navegación
3. La conexión a Supabase en supabase.js
