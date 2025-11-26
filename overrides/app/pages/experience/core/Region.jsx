/*
 * Copyright (c) 2023, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

import React, {memo} from 'react'
import PropTypes from 'prop-types'
import {Box} from '@chakra-ui/react'
import ComponentRenderer from './ComponentRenderer'

/**
 * Region - Renders a page region with its components
 * Each region gets an HTML id attribute matching the region id
 * 
 * Performance: Memoized to prevent unnecessary re-renders
 */
const Region = memo(({region, ...props}) => {
    if (!region) return null

    const {id, components = []} = region

    return (
        <Box id={id} className={`region region-${id}`} {...props}>
            {components.map((component, index) => (
                <ComponentRenderer key={component.id || index} component={component} />
            ))}
        </Box>
    )
})

Region.displayName = 'Region'

Region.propTypes = {
    region: PropTypes.shape({
        id: PropTypes.string.isRequired,
        components: PropTypes.array
    })
}

export default Region
