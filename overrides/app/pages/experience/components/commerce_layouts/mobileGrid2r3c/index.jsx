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
 * MobileGrid2r3c Component
 * 2 Row x 3 Col (Mobile), 1 Row x 6 Col (Desktop)
 * Renders six column regions
 *
 * Performance: Memoized to prevent unnecessary re-renders
 */
const MobileGrid2r3c = memo(({regions = [], renderRegions, id}) => {
    return (
        <Box className="mobile-grid-2r3c" data-component-id={id} my={4}>
            <SimpleGrid columns={{base: 3, md: 6}} spacing={4}>
                {renderRegions(regions)}
            </SimpleGrid>
        </Box>
    )
})

MobileGrid2r3c.displayName = 'MobileGrid2r3c'

MobileGrid2r3c.propTypes = {
    regions: PropTypes.array,
    renderRegions: PropTypes.func,
    id: PropTypes.string
}

export default MobileGrid2r3c
