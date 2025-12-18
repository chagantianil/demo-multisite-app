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
 * MobileGridLookBook Component
 * Shop The Look Layout - displays products in a grid
 * 1 column on mobile, responsive grid on desktop
 * Renders up to 6 column regions
 *
 * Performance: Memoized to prevent unnecessary re-renders
 */
const MobileGridLookBook = memo(({regions = [], renderRegions, id}) => {
    return (
        <Box className="mobile-grid-lookbook" data-component-id={id} my={4}>
            <SimpleGrid columns={{base: 1, sm: 2, md: 3, lg: 6}} spacing={4}>
                {renderRegions(regions)}
            </SimpleGrid>
        </Box>
    )
})

MobileGridLookBook.displayName = 'MobileGridLookBook'

MobileGridLookBook.propTypes = {
    regions: PropTypes.array,
    renderRegions: PropTypes.func,
    id: PropTypes.string
}

export default MobileGridLookBook
