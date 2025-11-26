/*
 * Copyright (c) 2023, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

import React from 'react'
import {useParams} from 'react-router-dom'
import {usePage} from '@salesforce/commerce-sdk-react'
import {Box, Spinner, Center, Alert, AlertIcon, AlertTitle, AlertDescription} from '@chakra-ui/react'
import {PageRenderer} from '../../experience/core'

/**
 * Dynamic Page Route
 * Fetches page data using usePage hook and renders it using PageRenderer
 */
const PageDetail = () => {
    const {pageId} = useParams()

    const {data, isLoading, error} = usePage({
        parameters: {pageId}
    })

    if (isLoading) {
        return (
            <Center minH="50vh">
                <Spinner size="xl" color="blue.500" thickness="4px" />
            </Center>
        )
    }

    if (error) {
        return (
            <Box p={4}>
                <Alert status="error" variant="left-accent" borderRadius="md">
                    <AlertIcon />
                    <Box>
                        <AlertTitle>Error Loading Page</AlertTitle>
                        <AlertDescription>{error.message}</AlertDescription>
                    </Box>
                </Alert>
            </Box>
        )
    }

    if (!data) {
        return (
            <Box p={4}>
                <Alert status="warning" variant="left-accent" borderRadius="md">
                    <AlertIcon />
                    <Box>
                        <AlertTitle>Page Not Found</AlertTitle>
                        <AlertDescription>
                            No page data found for: <code>{pageId}</code>
                        </AlertDescription>
                    </Box>
                </Alert>
            </Box>
        )
    }

    return (
        <Box layerStyle="page" p={4}>
            <PageRenderer page={data} />
        </Box>
    )
}

export default PageDetail
