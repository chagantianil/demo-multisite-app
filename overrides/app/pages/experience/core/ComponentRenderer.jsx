/*
 * Copyright (c) 2023, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

import React, {memo, useCallback, useMemo} from 'react'
import PropTypes from 'prop-types'
import {Box, Alert, AlertIcon, AlertTitle, AlertDescription} from '@chakra-ui/react'

// Import component registry
import {componentRegistry} from '../components'
import Region from './Region'
import {usePreviewMode} from './usePreviewMode'

/**
 * ComponentRenderer - Dynamically renders components based on typeId
 *
 * typeId format: "folder.componentName"
 * Example: "commerce_assets.imageAndText"
 *   -> looks for component in experience/components/commerce_assets/imageAndText
 *
 * Performance: Memoized with useCallback for renderRegions
 */
const ComponentRenderer = memo(({component}) => {
    const isPreview = usePreviewMode()

    // Extract component properties (with defaults for when component is null)
    const {typeId, data = {}, regions = [], id} = component || {}

    // Build Page Designer attributes for preview mode (success case)
    const previewAttributes = useMemo(() => {
        if (!isPreview) return {}

        // Convert typeId dots to hyphens for CSS class (e.g., "commerce_assets.imageAndText" -> "commerce_assets-imageAndText")
        const hyphenTypeId = typeId ? typeId.replace(/\./g, '-') : ''

        return {
            className: `experience-component experience-${hyphenTypeId}`,
            'data-sfcc-pd-component-info': JSON.stringify({
                id: id,
                render_state: 'SUCCESS',
                render_info: {
                    render_script_time: 0,
                    render_time: 0,
                    cache_expire_time: null
                },
                exception: null,
                type: typeId,
                name: null,
                localized: true
            }),
            'data-allow-select': 'true',
            'data-allow-move': 'true',
            'data-allow-delete': 'true',
            'data-item-id': `component|${id}`,
            style: {
                minWidth: '50px',
                minHeight: '50px'
            }
        }
    }, [isPreview, id, typeId])

    // Build Page Designer attributes for error scenarios
    const buildErrorPreviewAttributes = useCallback(
        (errorMessage, errorType = 'ERROR') => {
            if (!isPreview || !id) return {}

            return {
                className: 'experience-component experience-error',
                'data-sfcc-pd-component-info': JSON.stringify({
                    id: id,
                    render_state: errorType,
                    render_info: {
                        render_script_time: 0,
                        render_time: 0,
                        cache_expire_time: null
                    },
                    exception: {
                        message: errorMessage,
                        type: errorType
                    },
                    type: typeId || 'unknown',
                    name: null,
                    localized: true
                }),
                'data-allow-select': 'true',
                'data-allow-move': 'true',
                'data-allow-delete': 'true',
                'data-item-id': `component|${id}`
            }
        },
        [isPreview, id, typeId]
    )

    // Memoized renderRegions function
    const renderRegions = useCallback((nestedRegions) => {
        return nestedRegions.map((region, index) => (
            <Region key={region.id || index} region={region} />
        ))
    }, [])

    // Early return after all hooks
    if (!component) return null

    if (!typeId) {
        const errorAttributes = buildErrorPreviewAttributes('Component missing typeId', 'WARNING')
        return (
            <Alert status="warning" size="sm" variant="left-accent" my={2} {...errorAttributes}>
                <AlertIcon />
                <AlertDescription>Component missing typeId</AlertDescription>
            </Alert>
        )
    }

    // Parse typeId: "commerce_assets.imageAndText" -> folder: "commerce_assets", name: "imageAndText"
    const [folder, componentName] = typeId.split('.')

    if (!folder || !componentName) {
        const errorAttributes = buildErrorPreviewAttributes(
            `Invalid typeId format: ${typeId}. Expected format: folder.componentName`,
            'ERROR'
        )
        return (
            <Alert status="error" size="sm" variant="left-accent" my={2} {...errorAttributes}>
                <AlertIcon />
                <AlertDescription>
                    Invalid typeId format: <code>{typeId}</code>
                    <br />
                    Expected format: <code>folder.componentName</code>
                </AlertDescription>
            </Alert>
        )
    }

    // Get component from registry using "folder.componentName" key
    const DynamicComponent = componentRegistry[typeId]

    if (!DynamicComponent) {
        const errorAttributes = buildErrorPreviewAttributes(
            `Component missing in experience/components/${folder}/${componentName}. Please create the component and register it in the component registry.`,
            'ERROR'
        )
        return (
            <Alert
                status="error"
                variant="left-accent"
                borderRadius="md"
                my={2}
                {...errorAttributes}
            >
                <AlertIcon />
                <Box>
                    <AlertTitle>Component Missing</AlertTitle>
                    <AlertDescription>
                        Component missing in{' '}
                        <code>
                            experience/components/{folder}/{componentName}
                        </code>
                        <br />
                        Please create the component and register it in the component registry.
                    </AlertDescription>
                </Box>
            </Alert>
        )
    }

    return (
        <Box {...previewAttributes}>
            <DynamicComponent
                data={data}
                regions={regions}
                renderRegions={renderRegions}
                id={id}
                typeId={typeId}
            />
        </Box>
    )
})

ComponentRenderer.displayName = 'ComponentRenderer'

ComponentRenderer.propTypes = {
    component: PropTypes.shape({
        typeId: PropTypes.string,
        data: PropTypes.object,
        regions: PropTypes.array,
        id: PropTypes.string
    })
}

export default ComponentRenderer
