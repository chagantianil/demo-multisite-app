/*
 * Copyright (c) 2023, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

/**
 * Global Styles - Minimal overrides
 *
 * Only body/html styles are applied globally.
 * All other custom styles are available as opt-in variants:
 *
 * - Headings: Use textStyle="heading1", textStyle="heading2", etc.
 * - Links: Use textStyle="brandLink" or layerStyle="brandLink"
 * - Focus: Use layerStyle="brandFocus"
 *
 * This ensures existing site styles remain unchanged.
 */

const styles = {
    global: () => ({
        // Only essential body/html styles
        'html, body': {
            backgroundColor: 'white',
            color: 'gray.900',
            fontSize: '16px',
            lineHeight: 1.5
        },

        body: {
            minHeight: '100vh'
        },

        '.react-target': {
            display: 'flex',
            minHeight: '100vh',
            flexDirection: 'column'
        }
    })
}

export default styles
