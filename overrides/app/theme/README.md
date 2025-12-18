# Multi-Site Theme Architecture & Page Designer Guide

## 📖 Overview

This guide explains how to work with **multi-site themes**, **site-specific theme configurations**, and **Page Designer components** in your PWA Kit application.

### What This System Provides

1. **Multi-Site Theme Support**: Each site can have completely different styling (colors, components, fonts) while sharing common foundations
2. **Site-Specific Themes**: Easy configuration for site-specific branding and styling
3. **Page Designer Integration**: Custom components that work with Salesforce Commerce Cloud Experience Builder

---

## 🏗️ Multi-Site Theme Architecture

### How It Works

The theme system automatically loads the correct theme based on the `siteId` from your site configuration. When a user visits your site, the system:

1. Detects the current `siteId` (e.g., 'RefArch', 'my-store')
2. Loads the corresponding site-specific theme
3. Merges it with shared foundations and base theme
4. Applies the complete theme to your application

### Directory Structure

```
theme/
├── sites/                    # Site-specific theme configurations
│   ├── refarch/             # RefArch site theme
│   │   ├── colors.js        # Site-specific colors
│   │   ├── components/      # Site-specific component overrides (optional)
│   │   │   ├── button.js
│   │   │   └── ...
│   │   ├── foundations/     # Site-specific foundations (optional)
│   │   │   ├── textStyles.js
│   │   │   └── layerStyles.js
│   │   └── index.js         # Site theme configuration (REQUIRED)
│   └── my-store/            # my-store site theme
│       ├── colors.js
│       ├── components/
│       ├── foundations/
│       └── index.js
├── shared/                   # Shared across all sites
│   ├── foundations/         # Shared foundations
│   │   ├── fonts.js
│   │   ├── styles.js
│   │   ├── textStyles.js
│   │   └── layerStyles.js
│   └── components/          # Shared component styles (optional)
│       ├── button.js
│       └── ...
├── index.js                  # Theme factory (main entry point)
└── README.md                 # This file
```

### Architecture Principles

1. **Site Isolation**: Each site has its own directory with complete theme control
2. **Shared Foundations**: Common elements (fonts, base styles) live in `shared/` to avoid duplication
3. **Selective Override**: Sites can override only what they need - start minimal, add as needed
4. **Easy Extension**: Adding a new site = creating a new directory + updating the factory

---

## 🎨 Site-Specific Theme Configuration

### How Themes Are Loaded

The theme is automatically loaded in `app/components/_app-config/index.jsx`:

```javascript
// app/components/_app-config/index.jsx (line 111)
<ChakraProvider theme={createTheme(locals.site?.id)}>
    {children}
</ChakraProvider>
```

The `siteId` comes from your site configuration and is automatically passed to `createTheme()`.

### Creating a Site-Specific Theme

#### Step 1: Create Site Directory

Create a new directory for your site:
```
theme/sites/your-site-name/
```

#### Step 2: Create Colors File

Create `colors.js` with your site's color palette:

```javascript
// theme/sites/your-site-name/colors.js
export default {
    brand: {
        50: '#f0f9ff',
        100: '#e0f2fe',
        200: '#bae6fd',
        300: '#7dd3fc',
        400: '#38bdf8',
        500: '#0ea5e9',  // Primary brand color
        600: '#0284c7',
        700: '#0369a1',
        800: '#075985',
        900: '#0c4a6e'
    },
    // Add more color scales as needed
}
```

#### Step 3: Create Theme Index File

Create `index.js` that exports your theme configuration:

**Minimal Example (Colors Only):**
```javascript
// theme/sites/your-site-name/index.js
import colors from './colors'
import {sharedFoundations} from '../../shared'

export default {
    colors,
    ...sharedFoundations
}
```

**Full Customization Example:**
```javascript
// theme/sites/your-site-name/index.js
import colors from './colors'
import Button from './components/button'
import textStyles from './foundations/textStyles'
import {sharedFoundations} from '../../shared'

export default {
    colors,
    components: {
        Button  // Site-specific button styles
    },
    textStyles,
    ...sharedFoundations
}
```

#### Step 4: Register Site in Theme Factory

**⚠️ IMPORTANT**: You **must** update `theme/index.js` to register your new site:

```javascript
// theme/index.js
import refArchTheme from './sites/refarch'
import myStoreTheme from './sites/my-store'
import yourSiteTheme from './sites/your-site-name'  // Import your new theme

const getSiteTheme = (siteId) => {
    switch (siteId) {
        case 'RefArch':
            return refArchTheme
        case 'my-store':
            return myStoreTheme
        case 'your-site-name':  // ⚠️ Add your site ID here (must match exactly)
            return yourSiteTheme
        default:
            return refArchTheme  // Fallback to default theme
    }
}
```

**Critical Notes:**
- The `siteId` in the switch statement **must match exactly** (case-sensitive) with your site configuration
- Without this update, your site will fall back to the default theme (RefArch)
- Always test after adding a new site to ensure the theme loads correctly

### Theme Merging Order

The theme system merges configurations in this order (later overrides earlier):

1. **Base Theme** (`@salesforce/retail-react-app/app/theme`)
2. **Shared Foundations** (`theme/shared/`)
3. **Site-Specific Theme** (`theme/sites/{siteId}/`)

This means site-specific themes can override shared foundations, which override the base theme.

---

## 🧩 Page Designer Components

### What Are Page Designer Components?

Page Designer components are custom React components that can be used in **Salesforce Commerce Cloud Experience Builder**. They allow you to create dynamic, content-managed pages without code changes.

### How Page Designer Works

1. **Page Designer** (in Business Manager) creates pages with components
2. **PWA Kit** fetches page data via the Commerce API
3. **Component Registry** maps component `typeId` to React components
4. **PageRenderer** renders the page with all components

### Component Registry

All Page Designer components **must** be registered in `overrides/app/pages/experience/components/index.js`:

```javascript
// overrides/app/pages/experience/components/index.js

// Import your components
import ImageAndText from './commerce_assets/imageAndText'
import PhotoTile from './commerce_assets/photoTile'
import MyCustomComponent from './myFolder/myCustomComponent'

// Register with typeId as the key
export const componentRegistry = {
    // Commerce Assets
    'commerce_assets.imageAndText': ImageAndText,
    'commerce_assets.photoTile': PhotoTile,
    
    // Your custom components
    'myFolder.myCustomComponent': MyCustomComponent
}
```

**Important**: The key must match the component's `typeId` from Page Designer exactly (format: `"folder.componentName"`).

### Adding a New Page Designer Component

#### Step 1: Create Component File

Create your component in the appropriate folder structure:

```
overrides/app/pages/experience/components/
└── myFolder/
    └── myComponent/
        └── index.jsx
```

#### Step 2: Create Component

```javascript
// overrides/app/pages/experience/components/myFolder/myComponent/index.jsx
import React from 'react'
import {Box, Heading, Text} from '@chakra-ui/react'

const MyComponent = ({data, id}) => {
    // data contains component configuration from Page Designer
    // id is the component instance ID
    
    return (
        <Box p={4}>
            <Heading>{data?.title || 'Default Title'}</Heading>
            <Text>{data?.description || 'Default Description'}</Text>
        </Box>
    )
}

export default MyComponent
```

#### Step 3: Register Component

Add your component to the registry:

```javascript
// overrides/app/pages/experience/components/index.js
import MyComponent from './myFolder/myComponent'

export const componentRegistry = {
    // ... existing components
    'myFolder.myComponent': MyComponent  // ⚠️ typeId must match Page Designer
}
```

### Page Designer Structure

The Page Designer system consists of:

- **PageRenderer** (`experience/core/PageRenderer.jsx`): Renders complete pages from Page Designer
- **Region** (`experience/core/Region.jsx`): Renders page regions with their components
- **ComponentRenderer** (`experience/core/ComponentRenderer.jsx`): Renders individual components with preview mode support
- **Page Registry** (`experience/pages/index.js`): Registers page types (storePage, pwaPage, etc.)

### Page Designer Routes

Page Designer pages are accessed via the `/page/:pageId` route:

```javascript
// app/routes.jsx
const PageDetail = loadable(() => import('./pages/page/[pageId]'), {fallback})

const routes = [
    // ... other routes
    {
        path: '/page/:pageId',  // ⚠️ This route is REQUIRED for Page Designer
        component: PageDetail
    }
]
```

The `PageDetail` component fetches page data and uses `PageRenderer` to render it.

---

## 🔧 Common Tasks

### Adding a New Site

1. Create `theme/sites/your-site-name/` directory
2. Create `colors.js` with your color palette
3. Create `index.js` that exports theme configuration
4. **Update `theme/index.js`** to register your site (see Step 4 above)
5. Verify `siteId` matches exactly in your site configuration
6. Test the theme loads correctly

### Adding Site-Specific Component Styles

1. Create component override file:
   ```
   theme/sites/your-site-name/components/button.js
   ```

2. Export component configuration:
   ```javascript
   // theme/sites/your-site-name/components/button.js
   export default {
       defaultProps: {
           colorScheme: 'brand'
       },
       variants: {
           solid: {
               bg: 'brand.500',
               borderRadius: 'full'
           }
       }
   }
   ```

3. Import in site's `index.js`:
   ```javascript
   import Button from './components/button'
   
   export default {
       colors,
       components: {
           Button
       },
       ...sharedFoundations
   }
   ```

### Adding a New Page Designer Component

1. Create component file in `overrides/app/pages/experience/components/{folder}/{componentName}/index.jsx`
2. Register in `overrides/app/pages/experience/components/index.js`
3. Ensure `typeId` matches Page Designer exactly
4. Test in Experience Builder preview mode

---

## ⚠️ Common Issues & Troubleshooting

### Theme Not Loading for New Site

**Problem**: New site shows default theme instead of custom theme

**Solutions**:
- ✅ Verify `siteId` in `theme/index.js` matches site configuration exactly (case-sensitive)
- ✅ Check that site's `index.js` exports theme configuration correctly
- ✅ Verify `createTheme()` is receiving the correct `siteId` (check `_app-config/index.jsx`)
- ✅ Check browser console for errors

### Page Designer Component Not Rendering

**Problem**: Component shows error or doesn't appear

**Solutions**:
- ✅ Verify component is registered in `componentRegistry` with correct `typeId`
- ✅ Check `typeId` matches Page Designer exactly (format: `"folder.componentName"`)
- ✅ Verify component file exists and exports default component
- ✅ Check browser console for import/rendering errors
- ✅ Verify `/page/:pageId` route exists in `routes.jsx`

### Component Styles Not Applying

**Problem**: Site-specific component styles not working

**Solutions**:
- ✅ Verify component is imported in site's `index.js`
- ✅ Check component is in `components` object of theme export
- ✅ Verify component name matches Chakra UI component name exactly
- ✅ Check theme merging order (site-specific should override shared)

---

## 📚 Best Practices

1. **Start Minimal**: Begin with colors only, add components and foundations as needed
2. **Share When Possible**: Use `shared/` for common elements to avoid duplication
3. **Document Differences**: Comment why site-specific overrides exist
4. **Test All Sites**: Always verify changes work on all sites before deploying
5. **Version Control**: Keep site themes in sync with site requirements
6. **Update Theme Factory**: Always update `theme/index.js` when adding new sites
7. **Register Components**: Register all Page Designer components in the component registry
8. **Match typeId Exactly**: Page Designer component `typeId` must match registry key exactly
9. **Use Preview Mode**: Test Page Designer components in Experience Builder preview mode

---

## 🔗 Related Files

- **Theme Factory**: `overrides/app/theme/index.js`
- **Theme Integration**: `overrides/app/components/_app-config/index.jsx` (line 111)
- **Component Registry**: `overrides/app/pages/experience/components/index.js`
- **Page Registry**: `overrides/app/pages/experience/pages/index.js`
- **Page Route**: `overrides/app/pages/page/[pageId]/index.jsx`
- **Routes**: `overrides/app/routes.jsx` (requires `/page/:pageId` route)

---

## 📝 Summary

### Multi-Site Theme
- Each site has its own theme directory in `theme/sites/{siteId}/`
- Themes are automatically loaded based on `siteId`
- **Always update `theme/index.js`** when adding new sites

### Page Designer
- Components must be registered in `componentRegistry`
- `typeId` must match Page Designer exactly
- Pages are accessed via `/page/:pageId` route

### Site-Specific Themes
- Start with colors, add components/foundations as needed
- Use `shared/` for common elements
- Site-specific overrides merge on top of shared foundations
