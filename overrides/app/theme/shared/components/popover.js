/*
 * Copyright (c) 2023, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

// Import base Popover styles from retail-react-app
import basePopover from '@salesforce/retail-react-app/app/theme/components/base/popover'

/**
 * Custom Popover Theme Override
 *
 * Extends retail-react-app Popover styles with custom overrides
 */
const Popover = {
    ...basePopover,
    parts: ['popper', 'content', 'header', 'body', 'footer', 'arrow'],
    baseStyle: {
        ...basePopover.baseStyle,
        popper: {
            ...basePopover.baseStyle?.popper,
            minWidth: 'auto !important'
        }
    },
    variants: {
        ...basePopover.variants,
        // Override or add custom variants here if needed
        fullWidth: {
            ...basePopover.variants?.fullWidth,
            popper: {
                ...basePopover.variants?.fullWidth?.popper,
                minWidth: 'auto !important'
            }
        }
    }
}

export default Popover
