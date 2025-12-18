# PWA Kit Generated App

Welcome to the PWA Kit!

---

## 🎨 Page Designer Integration

This PWA Kit application includes full **SFCC Page Designer** integration, enabling merchants to visually edit PWA Kit pages directly within Business Manager.

### How It Works

```
SFCC Business Manager (Page Designer)
              │
              ▼ (creates/edits page)
┌─────────────────────────────────────┐
│   storefront-reference-architecture │
│   app_pagedesigner_pwa cartridge    │
│   PWAProxy.js → HTTP service call   │
└─────────────────────────────────────┘
              │
              ▼ (GET /{siteId}/page/{pageId}?preview=true)
┌─────────────────────────────────────┐
│   demo-multisite-app (PWA Kit)      │
│   Detects preview mode              │
│   Adds Page Designer attributes     │
│   Returns HTML with editable markup │
└─────────────────────────────────────┘
              │
              ▼ (HTML response with PD attributes)
SFCC Page Designer (renders editable components)
```

### Key Files for Page Designer

| File | Purpose |
|------|---------|
| `overrides/app/routes.jsx` | Defines `/page/:pageId` route |
| `overrides/app/pages/page/[pageId]/index.jsx` | Page component using `usePage` hook |
| `overrides/app/pages/experience/core/PageRenderer.jsx` | Renders page types dynamically |
| `overrides/app/pages/experience/core/ComponentRenderer.jsx` | Renders components with PD attributes |
| `overrides/app/pages/experience/core/Region.jsx` | Renders regions with drop zones |
| `overrides/app/pages/experience/core/usePreviewMode.js` | Detects `?preview=true` parameter |
| `overrides/app/pages/experience/pages/pwaPage/` | PWA page type matching SFRA definition |
| `overrides/app/ssr.js` | CORS configuration for SFCC domains |

### Preview Mode Detection

The `usePreviewMode` hook checks for the `?preview=true` query parameter:

```javascript
// overrides/app/pages/experience/core/usePreviewMode.js
import {useLocation} from 'react-router-dom'

export const usePreviewMode = () => {
    const location = useLocation()
    const searchParams = new URLSearchParams(location?.search || '')
    return searchParams.get('preview') === 'true'
}
```

### Page Designer Attributes

When in preview mode, components automatically include these attributes:

**Components (`ComponentRenderer.jsx`):**
```javascript
{
    className: 'experience-component experience-{typeId}',
    'data-sfcc-pd-component-info': JSON.stringify({...}),
    'data-allow-select': 'true',
    'data-allow-move': 'true', 
    'data-allow-delete': 'true',
    'data-item-id': 'component|{id}'
}
```

**Regions (`Region.jsx`):**
```javascript
{
    'data-sfcc-pd-region-info': JSON.stringify({...}),
    'data-allow-drop': 'true',
    'data-item-id': 'region|{id}',
    style: { minWidth: '50px', minHeight: '50px' }
}
```

### CORS Configuration

The `ssr.js` file includes CORS headers for SFCC domains:

```javascript
// overrides/app/ssr.js
const allowedOrigins = [
    'https://your-instance.dx.commercecloud.salesforce.com',
    'https://*.commercecloud.salesforce.com',
    'https://*.dx.commercecloud.salesforce.com'
];

// Sets Access-Control-Allow-Origin headers for allowed origins
```

### Adding New Page Types

1. **Create the page component:**
```jsx
// overrides/app/pages/experience/pages/myNewPage/index.jsx
import React, {memo} from 'react'
import {Box} from '@chakra-ui/react'
import {Region} from '../../core'

const MyNewPage = memo(({regions = [], id, name}) => {
    return (
        <Box className="my-new-page" data-page-id={id}>
            {regions.map((region, index) => (
                <Region key={region.id || index} region={region} />
            ))}
        </Box>
    )
})

export default MyNewPage
```

2. **Register in the page registry:**
```javascript
// overrides/app/pages/experience/pages/index.js
import MyNewPage from './myNewPage'

export const pageRegistry = {
    // ... existing pages
    myNewPage: MyNewPage
}
```

3. **Create matching SFRA page type** in `app_pagedesigner_pwa` cartridge

### Adding New Components

1. **Create the component:**
```jsx
// overrides/app/pages/experience/components/myComponent/index.jsx
import React from 'react'
import {Box} from '@chakra-ui/react'

const MyComponent = ({data, regions, renderRegions}) => {
    return (
        <Box>
            <h2>{data.heading}</h2>
            {renderRegions && renderRegions(regions)}
        </Box>
    )
}

export default MyComponent
```

2. **Register in the component registry:**
```javascript
// overrides/app/pages/experience/components/index.js
import MyComponent from './myComponent'

export const componentRegistry = {
    // ... existing components
    'myComponent': MyComponent
}
```

### Related SFRA Cartridge

This PWA Kit app works with the **`app_pagedesigner_pwa`** cartridge in `storefront-reference-architecture`. See its README for SFCC-side setup instructions:

- Service configuration for PWA Kit HTTP calls
- Page type definitions matching this PWA Kit
- Proxy controller for fetching PWA Kit HTML

---

## Getting Started

### Requirements

-   Node 18 or later
-   npm 9 or later

### Run the Project Locally

```bash
npm start
```

This will open a browser and your storefront will be running on http://localhost:3000

### Deploy to Managed Runtime

```
npm run push -- -m "Message to help you recognize this bundle"
```

**Note**: This command will push to the MRT project that matches the name field in `package.json`. To push to a different project, include the `-s` argument.

**Important**: Access to the [Runtime Admin](https://runtime.commercecloud.com/) application is required to deploy bundles. To learn more, read our guide to [Push and Deploy Bundles](https://developer.salesforce.com/docs/commerce/pwa-kit-managed-runtime/guide/pushing-and-deploying-bundles.html).

## Customizing the application

This version of the application uses [Template Extensibility](https://developer.salesforce.com/docs/commerce/pwa-kit-managed-runtime/guide/template-extensibility.html) to empower you to more easily customize base templates. Please refer to our documentation for more information.

## 🌍 Localization

See the [Localization README.md](./packages/template-retail-react-app/translations/README.md) for important setup instructions for localization.

## 📖 Documentation

The full documentation for PWA Kit and Managed Runtime is hosted on the [Salesforce Developers](https://developer.salesforce.com/docs/commerce/pwa-kit-managed-runtime/overview) portal.

## Further documentation

For more information on working with the PWA Kit, refer to:

-   [Get Started](https://developer.salesforce.com/docs/commerce/pwa-kit-managed-runtime/guide/getting-started.html)
-   [Skills for Success](https://developer.salesforce.com/docs/commerce/pwa-kit-managed-runtime/guide/skills-for-success.html)
-   [Set Up API Access](https://developer.salesforce.com/docs/commerce/pwa-kit-managed-runtime/guide/setting-up-api-access.html)
-   [Configuration Options](https://developer.salesforce.com/docs/commerce/pwa-kit-managed-runtime/guide/configuration-options.html)
-   [Proxy Requests](https://developer.salesforce.com/docs/commerce/pwa-kit-managed-runtime/guide/proxying-requests.html)
-   [Push and Deploy Bundles](https://developer.salesforce.com/docs/commerce/pwa-kit-managed-runtime/guide/pushing-and-deploying-bundles.html)
-   [The Retail React App](https://developer.salesforce.com/docs/commerce/pwa-kit-managed-runtime/guide/retail-react-app.html)
-   [Rendering](https://developer.salesforce.com/docs/commerce/pwa-kit-managed-runtime/guide/rendering.html)
-   [Routing](https://developer.salesforce.com/docs/commerce/pwa-kit-managed-runtime/guide/routing.html)
-   [Phased Headless Rollouts](https://developer.salesforce.com/docs/commerce/pwa-kit-managed-runtime/guide/phased-headless-rollouts.html)
-   [Launch Your Storefront](https://developer.salesforce.com/docs/commerce/pwa-kit-managed-runtime/guide/launching-your-storefront.html)

---

## 🔧 Page Designer Troubleshooting

### Components Not Selectable in Page Designer

**Cause:** Preview mode not detected or attributes missing.

**Solution:**
1. Verify URL includes `?preview=true`
2. Check `usePreviewMode` hook is imported in ComponentRenderer
3. Ensure `data-allow-select="true"` is present in HTML

### CORS Errors

**Cause:** SFCC domain not allowed in `ssr.js`.

**Solution:**
Add your SFCC domain to the `allowedOrigins` array in `overrides/app/ssr.js`:
```javascript
const allowedOrigins = [
    'https://your-instance.dx.commercecloud.salesforce.com',
    // Add your domain here
];
```

### Page Type Not Found

**Cause:** Page type ID mismatch between SFRA and PWA Kit.

**Solution:**
1. Check `typeId` in SFRA page definition matches PWA Kit registry key
2. Verify page is registered in `overrides/app/pages/experience/pages/index.js`

### Component Not Rendering

**Cause:** Component type ID not registered.

**Solution:**
1. Add component to `overrides/app/pages/experience/components/index.js`
2. Ensure `typeId` matches exactly (case-sensitive)

### Empty Regions in Page Designer

**Cause:** Region missing minimum size for drop zones.

**Solution:**
Regions should have `minWidth: 50px` and `minHeight: 50px` when empty (handled by `Region.jsx` in preview mode).

---

## 📁 Project Structure (Page Designer)

```
overrides/app/
├── pages/
│   ├── experience/
│   │   ├── core/                    # Core rendering logic
│   │   │   ├── ComponentRenderer.jsx
│   │   │   ├── PageRenderer.jsx
│   │   │   ├── Region.jsx
│   │   │   ├── usePreviewMode.js
│   │   │   └── index.js
│   │   ├── components/              # Page Designer components
│   │   │   ├── commerce_assets/
│   │   │   ├── commerce_layouts/
│   │   │   └── index.js             # Component registry
│   │   ├── pages/                   # Page types
│   │   │   ├── pwaPage/
│   │   │   ├── storePage/
│   │   │   └── index.js             # Page registry
│   │   └── index.js
│   └── page/
│       └── [pageId]/
│           └── index.jsx            # Dynamic page route
├── routes.jsx                       # /page/:pageId route
└── ssr.js                           # CORS configuration
```
