# Development Server Optimization Guide

## Performance Issues Fixed

### 1. Next.js Configuration Optimizations
- **Turbo Mode**: Enabled `--turbo` flag for faster development builds
- **Bundle Splitting**: Optimized webpack configuration for better chunk splitting
- **Package Imports**: Optimized imports for Radix UI and other heavy libraries
- **Critical Dependencies**: Fixed webpack fallbacks to resolve dependency warnings

### 2. Development Scripts
```bash
# Fast development server with turbo
npm run dev

# Clean development (clears cache)
npm run dev:clean

# Fast development on specific port
npm run dev:fast
```

### 3. Environment Variables
Create a `.env.local` file with:
```env
NEXT_PUBLIC_PROJECT_ID=your_walletconnect_project_id_here
NEXT_PUBLIC_DEV_MODE=true
NEXT_PUBLIC_ENABLE_ANALYTICS=false
```

### 4. Performance Optimizations Applied

#### Webpack Configuration
- Fixed critical dependency warnings by adding proper fallbacks
- Optimized bundle splitting for better caching
- Added development-specific optimizations
- Improved watch options for faster file changes

#### Query Client Optimization
- Disabled refetch on window focus
- Reduced retry attempts
- Optimized cache timing

#### Next.js Features
- Enabled SWC minification
- Optimized image formats
- Enabled compression
- React strict mode for better development

### 5. Troubleshooting

#### If you still see slow performance:
1. Clear Next.js cache: `npm run clean`
2. Restart development server: `npm run dev:clean`
3. Check for large files in `public/` directory
4. Ensure environment variables are properly set

#### Critical Dependency Error Fix:
The webpack configuration now includes proper fallbacks for Node.js modules that shouldn't be bundled in the browser, which should resolve the "Critical dependency" warnings.

### 6. Expected Performance Improvements
- **Faster Initial Load**: Bundle splitting and optimized imports
- **Faster Hot Reload**: Improved watch options and turbo mode
- **Reduced Bundle Size**: Better tree shaking and optimization
- **Fewer Warnings**: Fixed critical dependency issues
