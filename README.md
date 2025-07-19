# SingleClic E-Commerce Application

A modern, responsive e-commerce application built with React and clean architecture principles for SingleClic company assessment.

## Overview

This application demonstrates a full-featured e-commerce platform with product browsing, filtering, searching, and shopping cart functionality. It showcases modern React development practices, clean code architecture, and seamless API integration.

## Demo
> 

## Tech Stack

### Core Technologies

- **React 19.1.0** - Latest React version with modern hooks and features
- **Vite 7.0.4** - Fast build tool and development server
- **JavaScript (ES6+)** - Modern JavaScript with async/await and modules

### State Management

- **Redux Toolkit 2.8.2** - Modern Redux with simplified setup and immutable updates
- **React Redux 9.2.0** - Official React bindings for Redux

### Routing

- **React Router DOM 7.7.0** - Latest version with array-based routing configuration

### Data Fetching

- **TanStack React Query 5.83.0** - Powerful data fetching and caching library
- **Axios 1.10.0** - HTTP client with interceptors and request/response handling

### Styling

- **Tailwind CSS 4.1.11** - Utility-first CSS framework for rapid UI development
- **Responsive Design** - Mobile-first approach with responsive components

### Development Tools

- **ESLint 9.30.1** - Code linting with React-specific rules
- **Vite Plugin React** - Hot reload and fast refresh during development

## Architecture

### Clean Architecture Principles

The application follows clean architecture patterns with clear separation of concerns:

```
src/
├── app/                    # Application configuration
│   ├── store.js           # Redux store configuration
│   └── queryClient.js     # React Query client setup
├── features/              # Feature-based organization
│   ├── products/          # Product management feature
│   │   ├── components/    # Product-specific components
│   │   ├── hooks/         # Custom hooks for products
│   │   └── pages/         # Product pages
│   └── cart/              # Shopping cart feature
│       ├── components/    # Cart-specific components
│       ├── pages/         # Cart pages
│       └── store/         # Cart Redux slice and actions
├── routes/                # Routing configuration
├── services/              # API services and HTTP configuration
├── shared/                # Shared components and utilities
└── styles/                # Global styles and CSS
```

### Key Architectural Decisions

1. **Feature-Based Organization**: Code is organized by business features rather than technical layers
2. **Separation of Concerns**: Components, hooks, pages, and state management are clearly separated
3. **Custom Hooks**: Business logic is extracted into reusable custom hooks
4. **Centralized State Management**: Cart state managed through Redux with automatic API synchronization
5. **API Layer Abstraction**: Axios instance with centralized configuration and error handling

## Features

### Product Management

- **Product Listing**: Display all products with pagination support
- **Product Details**: Detailed view with large images and full product information
- **Search Functionality**: Real-time search across product titles
- **Category Filtering**: Filter products by categories (electronics, jewelry, men's clothing, women's clothing)
- **Responsive Grid**: Adaptive product grid that works on all screen sizes

### Shopping Cart

- **Add to Cart**: Add products from listing or detail pages
- **Quantity Management**: Increment, decrement, or remove items entirely
- **Cart Persistence**: Cart data synchronized with Firebase Realtime Database
- **Real-time Updates**: Instant UI updates with automatic API synchronization
- **Cart Summary**: Total quantity, subtotal, tax calculation, and final total
- **Clear Cart**: Option to clear entire cart with confirmation

### User Interface

- **Responsive Design**: Mobile-first design that works on all devices
- **Loading States**: Skeleton loaders and loading indicators
- **Error Handling**: Graceful error handling with user-friendly messages
- **Search Interface**: Prominent search bar with real-time filtering

## API Integration

### External APIs

- **FakeStore API**: Product data source
  - Products listing: `https://fakestoreapi.com/products`
  - Single product: `https://fakestoreapi.com/products/{id}`

### Backend Persistence

- **Firebase Realtime Database**: Cart data persistence
  - Endpoint: `https://reduxcart0452-default-rtdb.firebaseio.com/cart.json`
  - Automatic synchronization on cart changes
  - Data restoration on application reload

### Data Flow Architecture

1. **Product Data Flow**:

   - React Query fetches and caches product data from FakeStore API
   - Custom hooks provide clean interface for components
   - Automatic background refetching and error retry

2. **Cart Data Flow**:
   - Redux Toolkit manages cart state with immutable updates
   - Centralized useEffect in App.jsx handles API synchronization
   - Cart changes trigger automatic Firebase updates
   - Application startup fetches existing cart data

## State Management Strategy

### Redux Store Structure

```javascript
{
  cart: {
    items: [],           // Array of cart items with quantities
    totalQuantity: 0,    // Total number of items
    totalAmount: 0,      // Total price of all items
    changed: false       // Flag for API synchronization
  }
}
```

### Cart State Management Approach

The application uses a sophisticated cart management system:

1. **Automatic Synchronization**: Cart changes automatically trigger API saves
2. **Optimistic Updates**: UI updates immediately, API sync happens in background
3. **Error Resilience**: Failed API calls don't affect UI state
4. **Centralized Logic**: All cart synchronization logic in App.jsx useEffect

```javascript
// Centralized cart synchronization in App.jsx
useEffect(() => {
  if (isInitial) {
    isInitial = false;
    return;
  }

  if (cart.changed) {
    dispatch(sendCartData(cart));
  }
}, [cart, dispatch]);
```

## Custom Hooks

### Product Hooks

- **useProducts()**: Fetch all products with React Query caching
- **useProduct(id)**: Fetch single product by ID
- **useProductCategories()**: Fetch available categories
- **useFilteredProducts()**: Handle search, filtering, and pagination logic

### Implementation Benefits

- **Reusability**: Hooks can be used across multiple components
- **Testability**: Business logic separated from UI components
- **Performance**: Built-in caching and optimization from React Query

## Component Architecture

### Shared Components

- **Layout**: Common layout wrapper for all pages

### Product Components

- **ProductCard**: Reusable product display card
- **ProductGrid**: Responsive grid layout for products
- **ProductFilters**: Search, category
- **ProductPagination**: Pagination controls with page navigation

### Cart Components

- **CartItem**: Individual cart item with quantity controls
- **CartSummary**: Order summary with totals and actions
- **CartPage**: Complete cart interface

## Responsive Design

### Mobile-First Approach

- **Breakpoints**: Tailwind CSS responsive utilities
- **Navigation**: Collapsible mobile menu
- **Grid Layouts**: Adaptive product grids (1 col mobile, 2-4 cols desktop)

### CSS Architecture

- **Utility-First**: Tailwind CSS for consistent spacing and styling
- **Design System**: Consistent color scheme and typography

## Performance Optimizations

### React Query Benefits

- **Automatic Caching**: API responses cached and reused
- **Background Updates**: Data refetched in background
- **Stale-While-Revalidate**: Show cached data while fetching updates
- **Request Deduplication**: Multiple identical requests consolidated

## Development Setup

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn package manager

### Installation

```bash
# Clone the repository
git clone
cd singleclic-task

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

```

### Environment Setup

No environment variables required for basic functionality. The application uses public APIs and Firebase Realtime Database.

## Code Quality

### Best Practices Implemented

- **Clean Code**: Descriptive variable names and function names
- **Error Boundaries**: Graceful error handling throughout the application
- **Loading States**: User feedback during data fetching
- **Accessibility**: Semantic HTML and keyboard navigation support
- **Performance**: Optimized re-renders and efficient data fetching

## Project Structure Benefits

### Scalability

- **Feature-Based Organization**: Easy to add new features
- **Modular Components**: Reusable and maintainable components
- **Separation of Concerns**: Clear boundaries between different aspects

### Maintainability

- **Consistent Patterns**: Similar structure across all features
- **Clear Dependencies**: Explicit imports and exports
- **Type Safety**: JavaScript with careful null/undefined handling

## Future Enhancements

Potential areas for expansion:

- User authentication and profiles
- Product reviews and ratings
- Wishlist functionality
- Order history and tracking
- Payment integration
- Advanced search with filters
- Product recommendations
- Multi-language support

## Conclusion

This application demonstrates modern React development practices with clean architecture, effective state management, and seamless API integration. The codebase is structured for scalability, maintainability, and performance while providing an excellent user experience across all devices.

The implementation showcases proficiency in:

- Modern React patterns and hooks
- Redux Toolkit for state management
- React Query for data fetching
- Responsive design with Tailwind CSS
- Clean architecture principles
- API integration and error handling
- Performance optimization techniques
