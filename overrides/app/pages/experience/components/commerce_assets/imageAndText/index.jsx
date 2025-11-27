/*
 * Copyright (c) 2023, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

import React, {memo} from 'react'
import PropTypes from 'prop-types'
import {Box, Image, LinkBox, LinkOverlay, AbsoluteCenter, VStack} from '@chakra-ui/react'

/**
 * ImageAndText Component
 * Renders an image with heading, description text, and optional link
 * 
 * Performance optimizations:
 * - Lazy loading images
 * - Memoized component
 */
const ImageAndText = memo(({data, id}) => {
    const {image, heading, ITCText, ITCLink, alt} = data || {}

    // Image and heading content (used with or without link)
    const ImageContent = (
        <>
            {image?.url && (
                <Image
                    src={image.url}
                    alt={alt || 'Image'}
                    width="100%"
                    objectFit="cover"
                    borderRadius="md"
                    loading="lazy"
                    decoding="async"
                />
            )}
            {heading && (
                <AbsoluteCenter
                    textAlign="center"
                    color="white"
                    textShadow="0 2px 4px rgba(0,0,0,0.5)"
                    px={4}
                    dangerouslySetInnerHTML={{__html: heading}}
                    sx={{
                        '& h1': {fontSize: {base: '2xl', md: '4xl'}, fontWeight: 'bold'},
                        '& h2': {fontSize: {base: 'xl', md: '3xl'}, fontWeight: 'semibold'},
                        '& h3': {fontSize: {base: 'lg', md: '2xl'}, fontWeight: 'medium'}
                    }}
                />
            )}
        </>
    )

    return (
        <Box className="image-and-text" data-component-id={id} mb={6}>
            {/* Image container with heading overlay - wrapped in link if ITCLink exists */}
            {ITCLink ? (
                <LinkBox
                    position="relative"
                    cursor="pointer"
                    _hover={{opacity: 0.9}}
                    transition="opacity 0.2s"
                >
                    <LinkOverlay href={ITCLink} />
                    {ImageContent}
                </LinkBox>
            ) : (
                <Box position="relative">
                    {ImageContent}
                </Box>
            )}

            {/* Text below image - center aligned */}
            {ITCText && (
                <VStack spacing={2} mt={4}>
                    <Box
                        textAlign="center"
                        dangerouslySetInnerHTML={{__html: ITCText}}
                        sx={{
                            '& p': {lineHeight: 1.6}
                        }}
                    />
                </VStack>
            )}
        </Box>
    )
})

ImageAndText.displayName = 'ImageAndText'

ImageAndText.propTypes = {
    data: PropTypes.shape({
        image: PropTypes.object,
        heading: PropTypes.string,
        ITCText: PropTypes.string,
        ITCLink: PropTypes.string,
        alt: PropTypes.string
    }),
    id: PropTypes.string
}

export default ImageAndText
