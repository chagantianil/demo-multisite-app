/*
 * Copyright (c) 2023, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

import React, {memo} from 'react'
import PropTypes from 'prop-types'
import {Box} from '@chakra-ui/react'
import {Region} from '../../core'

/**
 * pwaPage - Default page type for pwa pages
 * Renders all regions with their components
 *
 * Performance: Memoized to prevent unnecessary re-renders
 */
const pwaPage = memo(({regions = [], data, id, name}) => {
    return (
        <Box className="pwa-page" data-page-id={id} data-page-name={name}>
            {regions.map((region, index) => (
                <Region key={region.id || index} region={region} mb={4} />
            ))}
        </Box>
    )
})

pwaPage.displayName = 'pwaPage'

pwaPage.propTypes = {
    regions: PropTypes.array,
    data: PropTypes.object,
    id: PropTypes.string,
    name: PropTypes.string
}

export default pwaPage
