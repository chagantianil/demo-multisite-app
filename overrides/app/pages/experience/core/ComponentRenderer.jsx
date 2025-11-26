/*
 * Copyright (c) 2023, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

import React, {memo, useCallback} from 'react'
import PropTypes from 'prop-types'
import {Box, Alert, AlertIcon, AlertTitle, AlertDescription} from '@chakra-ui/react'

// Import component registry
import {componentRegistry} from '../components'
import Region from './Region'

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
    if (!component) return null

    const {typeId, data = {}, regions = [], id} = component

    // Memoized renderRegions function
    const renderRegions = useCallback((nestedRegions) => {
        return nestedRegions.map((region, index) => (
            <Region key={region.id || index} region={region} />
        ))
    }, [])

    if (!typeId) {
        return (
            <Alert status="warning" size="sm" variant="left-accent" my={2}>
                <AlertIcon />
                <AlertDescription>Component missing typeId</AlertDescription>
            </Alert>
        )
    }

    // Parse typeId: "commerce_assets.imageAndText" -> folder: "commerce_assets", name: "imageAndText"
    const [folder, componentName] = typeId.split('.')

    if (!folder || !componentName) {
        return (
            <Alert status="error" size="sm" variant="left-accent" my={2}>
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
        return (
            <Alert status="error" variant="left-accent" borderRadius="md" my={2}>
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
        <DynamicComponent
            data={data}
            regions={regions}
            renderRegions={renderRegions}
            id={id}
            typeId={typeId}
        />
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
