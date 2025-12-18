# Multi-Site Theme Architecture

## Overview

This theme system supports completely different styling for each site while maintaining shared foundations where appropriate.

## Directory Structure

```
theme/
├── sites/                    # Site-specific theme configurations
│   ├── refarch/             # RefArch site theme
│   │   ├── colors.js        # Site-specific colors
│   │   ├── components/      # Site-specific component overrides
│   │   │   ├── button.js
│   │   │   └── ...
│   │   ├── foundations/     # Site-specific foundations (optional)
│   │   │   ├── textStyles.js
│   │   │   └── layerStyles.js
│   │   └── index.js         # Site theme configuration
│   └── my-store/            # my-store site theme
│       ├── colors.js
│       ├── components/
│       ├── foundations/
│       └── index.js
├── shared/                   # Shared across all sites
│   ├── foundations/         # Shared foundations
│   │   ├── fonts.js
│   │   ├── styles.js
│   │   └── ...
│   └── components/          # Shared component styles (if any)
├── index.js                  # Theme factory (main entry point)
└── README.md                 # This file
```

## Architecture Principles

1. **Site Isolation**: Each site has its own directory with complete theme control
2. **Shared Foundations**: Common elements (fonts, base styles) live in `shared/`
3. **Selective Override**: Sites can override only what they need
4. **Easy Extension**: Adding a new site = creating a new directory

## Usage

The theme factory automatically loads the correct theme based on `siteId`:

```javascript
import {createTheme} from '../../theme'
const theme = createTheme('RefArch') // or 'my-store'
```

## Adding a New Site

1. Create directory: `theme/sites/your-site-name/`
2. Create `colors.js` with your color palette
3. Create `index.js` that exports theme configuration
4. Optionally add site-specific components or foundations
5. Update `theme/index.js` to include your site in the factory

## Site-Specific Overrides

### Colors Only (Minimal)
```javascript
// sites/my-site/index.js
import colors from './colors'
import {sharedFoundations} from '../../shared'

export default {
    colors,
    ...sharedFoundations
}
```

### Full Customization
```javascript
// sites/my-site/index.js
import colors from './colors'
import Button from './components/button'
import textStyles from './foundations/textStyles'
import {sharedFoundations} from '../../shared'

export default {
    colors,
    components: {
        Button
    },
    textStyles,
    ...sharedFoundations
}
```

## Site-Specific Theme Updates

**IMPORTANT**: When adding a new site to your multi-site application, you **must** update the theme configuration to include the new site.

### Steps to Update Theme for New Sites

1. **Create Site Theme Directory**: Add your site-specific theme files in `theme/sites/your-site-name/`
2. **Update Theme Factory**: Modify `theme/index.js` to include your new site in the `getSiteTheme()` function:

```javascript
// theme/index.js
import yourSiteTheme from './sites/your-site-name'

const getSiteTheme = (siteId) => {
    switch (siteId) {
        case 'RefArch':
            return refArchTheme
        case 'my-store':
            return myStoreTheme
        case 'your-site-name':  // Add your new site here
            return yourSiteTheme
        default:
            return refArchTheme
    }
}
```

3. **Verify Theme Loading**: Ensure your site ID matches exactly (case-sensitive) with the `siteId` parameter passed to `createTheme()`
4. **Test Theme Application**: Verify that the correct theme loads when accessing your site

**Note**: Without updating `theme/index.js`, new sites will fall back to the default theme (RefArch). Always update the theme factory when adding new sites to ensure proper theme application.

## Page Designer Components and SSR.js

### Page Designer Components

Page Designer components are custom components that can be used in Salesforce Commerce Cloud Experience Builder. These components are registered and rendered dynamically based on the Page Designer response.

#### Component Registry

All Page Designer components must be registered in `overrides/app/pages/experience/components/index.js`:

```javascript
// overrides/app/pages/experience/components/index.js
import MyComponent from './myFolder/myComponent'

export const componentRegistry = {
    'myFolder.myComponent': MyComponent,
    // Add more components here
}
```

#### Adding a New Page Designer Component

1. **Create Component File**: Create your component in `overrides/app/pages/experience/components/{folder}/{componentName}/index.jsx`
2. **Register Component**: Import and register it in `overrides/app/pages/experience/components/index.js` with the full `typeId` as the key
3. **Match typeId Format**: The key must match the component's `typeId` from Page Designer (format: `"folder.componentName"`)

#### Component Structure

- **ComponentRenderer**: Handles rendering of individual components with Page Designer preview mode support
- **Region**: Renders page regions with their components
- **PageRenderer**: Renders complete pages from Page Designer

### SSR.js Configuration

The `overrides/app/ssr.js` file configures server-side rendering (SSR) for your PWA Kit application. This file handles:

- **Express Server Setup**: Configures the Express server for SSR
- **Security Headers**: Sets up CSP (Content Security Policy) and security headers
- **CORS Configuration**: Handles cross-origin requests for SFRA integration
- **Hybrid Proxy**: Configures routing between PWA Kit and SFCC (for development)
- **SLAS Authentication**: Handles authentication callbacks and token validation
- **Marketing Cloud Integration**: Email sending functionality for passwordless login and password reset

#### Important SSR.js Updates

When adding new sites or routes, you may need to update:

1. **Hybrid Proxy Routing Rules**: Update `routingRules` array if you need to route new paths through PWA Kit
2. **CORS Allowed Origins**: Add new SFCC domains to the `allowedOrigins` array if needed
3. **Content Security Policy**: Update CSP directives if new external resources are required

**Note**: Changes to `ssr.js` require a server restart to take effect. Always test SSR functionality after making changes.

## Best Practices

1. **Start Minimal**: Begin with colors only, add more as needed
2. **Share When Possible**: Use `shared/` for common elements
3. **Document Differences**: Comment why site-specific overrides exist
4. **Test Both Sites**: Always verify changes on all sites
5. **Version Control**: Keep site themes in sync with site requirements
6. **Update Theme Factory**: Always update `theme/index.js` when adding new sites
7. **Register Components**: Register all Page Designer components in the component registry
8. **Test SSR**: Verify SSR functionality after making changes to `ssr.js`

