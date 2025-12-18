/*
 * Copyright (c) 2023, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

import React, {memo} from 'react'
import PropTypes from 'prop-types'
import {Box, Heading, SimpleGrid} from '@chakra-ui/react'

/**
 * PopularCategories Component
 * Layout for displaying popular categories with heading
 * Renders category components in a responsive grid
 *
 * Performance: Memoized to prevent unnecessary re-renders
 */
const PopularCategories = memo(({data, regions = [], renderRegions, id}) => {
    const {textHeadline} = data || {}

    return (
        <Box className="popular-categories" data-component-id={id} my={8}>
            {textHeadline && (
                <Heading
                    as="h2"
                    size={{base: 'md', md: 'lg'}}
                    mb={6}
                    textAlign="center"
                    fontWeight="semibold"
                >
                    {textHeadline}
                </Heading>
            )}
            <SimpleGrid columns={{base: 2, sm: 3, md: 4, lg: 6}} spacing={6}>
                {renderRegions(regions)}
            </SimpleGrid>
        </Box>
    )
})

PopularCategories.displayName = 'PopularCategories'

PopularCategories.propTypes = {
    data: PropTypes.shape({
        textHeadline: PropTypes.string
    }),
    regions: PropTypes.array,
    renderRegions: PropTypes.func,
    id: PropTypes.string
}

export default PopularCategories
