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
 * MobileGrid2r2c Component
 * A 2-row, 2-column responsive grid layout
 * Renders nested regions (column1, column2, column3, column4)
 * 
 * Performance: Memoized to prevent unnecessary re-renders
 */
const MobileGrid2r2c = memo(({data, regions = [], renderRegions, id}) => {
    return (
        <Box className="mobile-grid-2r2c" data-component-id={id} my={4}>
            <SimpleGrid columns={{base: 1, sm: 2, md: 4}} spacing={4}>
                {renderRegions(regions)}
            </SimpleGrid>
        </Box>
    )
})

MobileGrid2r2c.displayName = 'MobileGrid2r2c'

MobileGrid2r2c.propTypes = {
    data: PropTypes.object,
    regions: PropTypes.array,
    renderRegions: PropTypes.func,
    id: PropTypes.string
}

export default MobileGrid2r2c
