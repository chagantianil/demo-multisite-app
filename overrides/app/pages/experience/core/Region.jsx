/*
 * Copyright (c) 2023, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

import React, {memo, useMemo} from 'react'
import PropTypes from 'prop-types'
import {Box} from '@chakra-ui/react'
import ComponentRenderer from './ComponentRenderer'
import {usePreviewMode} from './usePreviewMode'

/**
 * Region - Renders a page region with its components
 * Each region gets an HTML id attribute matching the region id
 * In preview mode, adds Page Designer attributes for drag-and-drop functionality
 *
 * Performance: Memoized to prevent unnecessary re-renders
 */
const Region = memo(({region, ...props}) => {
    const isPreview = usePreviewMode()

    if (!region) return null

    const {id, components = []} = region

    // Build Page Designer attributes for preview mode
    const previewAttributes = useMemo(() => {
        if (!isPreview) return {}

        return {
            'data-sfcc-pd-region-info': JSON.stringify({
                id: id,
                render_state: 'SUCCESS',
                render_info: {
                    render_time: 0
                },
                exception: null
            }),
            'data-allow-drop': 'true',
            'data-item-id': `region|${id}`,
            style: {
                minWidth: '50px',
                minHeight: '50px'
            }
        }
    }, [isPreview, id])

    return (
        <Box
            id={id}
            className={`region region-${id}`}
            {...previewAttributes}
            {...props}
        >
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
