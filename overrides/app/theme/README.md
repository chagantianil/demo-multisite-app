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

## Best Practices

1. **Start Minimal**: Begin with colors only, add more as needed
2. **Share When Possible**: Use `shared/` for common elements
3. **Document Differences**: Comment why site-specific overrides exist
4. **Test Both Sites**: Always verify changes on all sites
5. **Version Control**: Keep site themes in sync with site requirements

