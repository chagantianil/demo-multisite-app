/*
 * Copyright (c) 2023, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

import React, {memo} from 'react'
import PropTypes from 'prop-types'
import {Box} from '@chakra-ui/react'

/**
 * MobileGrid1r1c Component
 * 1 Row x 1 Column layout (same for mobile and desktop)
 * Renders a single column region
 *
 * Performance: Memoized to prevent unnecessary re-renders
 */
const MobileGrid1r1c = memo(({regions = [], renderRegions, id}) => {
    return (
        <Box className="mobile-grid-1r1c" data-component-id={id} my={4}>
            {renderRegions(regions)}
        </Box>
    )
})

MobileGrid1r1c.displayName = 'MobileGrid1r1c'

MobileGrid1r1c.propTypes = {
    regions: PropTypes.array,
    renderRegions: PropTypes.func,
    id: PropTypes.string
}

export default MobileGrid1r1c
