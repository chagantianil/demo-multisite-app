/*
 * Copyright (c) 2023, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

import React, {memo} from 'react'
import PropTypes from 'prop-types'
import {SimpleGrid, Box} from '@chakra-ui/react'

/**
 * MobileGrid3r1c Component
 * 3 Row x 1 Col (Mobile), 1 Row x 3 Col (Desktop)
 * Renders three column regions
 *
 * Performance: Memoized to prevent unnecessary re-renders
 */
const MobileGrid3r1c = memo(({regions = [], renderRegions, id}) => {
    return (
        <Box className="mobile-grid-3r1c" data-component-id={id} my={4}>
            <SimpleGrid columns={{base: 1, md: 3}} spacing={4}>
                {renderRegions(regions)}
            </SimpleGrid>
        </Box>
    )
})

MobileGrid3r1c.displayName = 'MobileGrid3r1c'

MobileGrid3r1c.propTypes = {
    regions: PropTypes.array,
    renderRegions: PropTypes.func,
    id: PropTypes.string
}

export default MobileGrid3r1c
