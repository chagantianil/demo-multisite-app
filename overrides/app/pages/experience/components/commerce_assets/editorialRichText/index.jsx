/*
 * Copyright (c) 2023, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

import React, {memo} from 'react'
import PropTypes from 'prop-types'
import {Box, Container} from '@chakra-ui/react'

/**
 * EditorialRichText Component
 * Displays rich text content (HTML markup)
 * Used for help pages, FAQ, or editorial content
 *
 * Performance: Memoized component
 */
const EditorialRichText = memo(({data, id}) => {
    const {richText} = data || {}

    if (!richText) {
        return null
    }

    return (
        <Box className="editorial-rich-text" data-component-id={id} my={6}>
            <Container maxW="container.lg">
                <Box
                    dangerouslySetInnerHTML={{__html: richText}}
                    sx={{
                        '& h1': {
                            fontSize: {base: '2xl', md: '3xl'},
                            fontWeight: 'bold',
                            mb: 4
                        },
                        '& h2': {
                            fontSize: {base: 'xl', md: '2xl'},
                            fontWeight: 'semibold',
                            mb: 3
                        },
                        '& h3': {
                            fontSize: {base: 'lg', md: 'xl'},
                            fontWeight: 'semibold',
                            mb: 2
                        },
                        '& p': {
                            mb: 4,
                            lineHeight: 1.7
                        },
                        '& ul, & ol': {
                            mb: 4,
                            pl: 6
                        },
                        '& li': {
                            mb: 2
                        },
                        '& a': {
                            color: 'brand.500',
                            textDecoration: 'underline',
                            _hover: {
                                color: 'brand.600'
                            }
                        }
                    }}
                />
            </Container>
        </Box>
    )
})

EditorialRichText.displayName = 'EditorialRichText'

EditorialRichText.propTypes = {
    data: PropTypes.shape({
        richText: PropTypes.string
    }),
    id: PropTypes.string
}

export default EditorialRichText
