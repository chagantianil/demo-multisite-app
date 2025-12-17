/*
 * Copyright (c) 2023, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

import styles from './foundations/styles'
import textStyles from './foundations/textStyles'
import layerStyles from './foundations/layerStyles'
import {fonts, fontWeights, fontSizes, lineHeights} from './foundations/fonts'
import Button from './components/button'
import Popover from './components/popover'

export const sharedFoundations = {
    styles,
    textStyles,
    layerStyles,
    fonts,
    fontWeights,
    fontSizes,
    lineHeights,
    components: {
        Button,
        Popover
    }
}

export default sharedFoundations
