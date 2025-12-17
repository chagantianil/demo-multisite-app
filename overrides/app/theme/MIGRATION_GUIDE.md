# Theme Migration Guide

## What Changed?

The theme system has been restructured to support completely different styling for each site while maintaining shared foundations.

## New Structure

```
theme/
├── sites/                    # Site-specific configurations
│   ├── refarch/
│   │   ├── colors.js        # RefArch colors (Blue)
│   │   ├── components/      # RefArch-specific components (optional)
│   │   ├── foundations/     # RefArch-specific foundations (optional)
│   │   └── index.js         # RefArch theme config
│   └── my-store/
│       ├── colors.js        # my-store colors (Orange)
│       ├── components/      # my-store-specific components (optional)
│       ├── foundations/     # my-store-specific foundations (optional)
│       └── index.js         # my-store theme config
├── shared/                   # Shared across all sites
│   ├── foundations/         # Shared foundations (fonts, textStyles, etc.)
│   ├── components/          # Shared component styles
│   └── index.js             # Shared foundations export
└── index.js                  # Theme factory (main entry point)
```

## How It Works

1. **Site Detection**: The theme factory receives `siteId` from `_app-config`
2. **Theme Loading**: Loads site-specific theme from `sites/{siteId}/index.js`
3. **Merging**: Merges site theme with shared foundations and base theme
4. **Result**: Complete Chakra UI theme with site-specific styling

## Adding Site-Specific Styles

### Example 1: Site-Specific Button Styles

Create `sites/my-store/components/button.js`:

```javascript
const Button = {
    defaultProps: {
        colorScheme: 'brand'
    },
    variants: {
        solid: {
            bg: 'brand.500',
            borderRadius: 'full', // Rounded buttons for my-store
            // ... other styles
        }
    }
}

export default Button
```

Then update `sites/my-store/index.js`:

```javascript
import Button from './components/button'

export default {
    colors,
    components: {
        Button  // Override shared button with site-specific version
    },
    ...sharedFoundations
}
```

### Example 2: Site-Specific Text Styles

Create `sites/refarch/foundations/textStyles.js`:

```javascript
import {sharedFoundations} from '../../shared'

export default {
    ...sharedFoundations.textStyles,
    // Override existing style
    brandH1: {
        fontSize: '4rem', // Larger headings for RefArch
        fontWeight: 'black'
    },
    // Add new style
    refArchSpecial: {
        fontSize: '2rem',
        color: 'brand.500'
    }
}
```

Then update `sites/refarch/index.js`:

```javascript
import textStyles from './foundations/textStyles'

export default {
    colors,
    textStyles,  // Override shared textStyles
    ...sharedFoundations
}
```

## Benefits

✅ **Complete Isolation**: Each site can have completely different styling  
✅ **Shared Foundations**: Common elements (fonts, base styles) stay DRY  
✅ **Easy Extension**: Add new sites by creating a new directory  
✅ **Selective Override**: Sites only override what they need  
✅ **Maintainable**: Clear structure makes it easy to find and update styles  

## Migration Checklist

- [x] Site-specific color palettes created
- [x] Shared foundations moved to `shared/` directory
- [x] Theme factory updated to use new structure
- [x] `_app-config` updated to pass `siteId` to theme factory
- [ ] Old color files can be removed (kept for reference)
- [ ] Test both sites to ensure themes load correctly

## Next Steps

1. **Test**: Verify both sites load with correct colors
2. **Customize**: Add site-specific components/foundations as needed
3. **Document**: Document any site-specific customizations in site README files

