/*
 * Copyright (c) 2023, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

import React, {memo} from 'react'
import PropTypes from 'prop-types'
import {Box, Alert, AlertIcon, AlertTitle, AlertDescription} from '@chakra-ui/react'

// Import page type registry
import {pageRegistry} from '../pages'

/**
 * PageRenderer - Dynamically renders page types from experience/pages
 * Based on the page's typeId, it loads the corresponding page component
 * 
 * Performance: Memoized to prevent unnecessary re-renders
 */
const PageRenderer = memo(({page}) => {
    if (!page) {
        return (
            <Alert status="error" variant="solid">
                <AlertIcon />
                <AlertTitle>Page Error</AlertTitle>
                <AlertDescription>No page data provided</AlertDescription>
            </Alert>
        )
    }

    const {typeId, regions, data, id, name} = page

    // Get the page component from registry
    const PageComponent = pageRegistry[typeId]

    if (!PageComponent) {
        return (
            <Alert status="error" variant="left-accent" borderRadius="md" m={4}>
                <AlertIcon />
                <Box>
                    <AlertTitle>Page Type Missing</AlertTitle>
                    <AlertDescription>
                        Component missing in <code>experience/pages/{typeId}</code>
                        <br />
                        Please create the page component and register it in the page registry.
                    </AlertDescription>
                </Box>
            </Alert>
        )
    }

    return <PageComponent regions={regions} data={data} id={id} name={name} />
})

PageRenderer.displayName = 'PageRenderer'

PageRenderer.propTypes = {
    page: PropTypes.shape({
        typeId: PropTypes.string.isRequired,
        regions: PropTypes.array,
        data: PropTypes.object,
        id: PropTypes.string,
        name: PropTypes.string
    })
}

export default PageRenderer
