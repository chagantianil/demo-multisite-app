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
 * ProductListTile Component
 * Promotional content tile/banner used on product listing pages
 * Similar to imageAndText but optimized for product listing context
 *
 * Performance: Memoized component with lazy loading
 */
const ProductListTile = memo(({data, id}) => {
    const {image, alt, heading, ITCLink, ITCText} = data || {}

    if (!image?.url) {
        return null
    }

    const ImageContent = (
        <>
            <Image
                src={image.url}
                alt={alt || 'Promotional content'}
                width="100%"
                height={{base: '200px', md: '300px'}}
                objectFit="cover"
                borderRadius="md"
                loading="lazy"
                decoding="async"
            />
            {heading && (
                <AbsoluteCenter
                    textAlign="center"
                    color="white"
                    textShadow="0 2px 4px rgba(0,0,0,0.5)"
                    px={4}
                    w="100%"
                    dangerouslySetInnerHTML={{__html: heading}}
                    sx={{
                        '& h1': {fontSize: {base: 'xl', md: '2xl'}, fontWeight: 'bold'},
                        '& h2': {fontSize: {base: 'lg', md: 'xl'}, fontWeight: 'semibold'},
                        '& h3': {fontSize: {base: 'md', md: 'lg'}, fontWeight: 'medium'}
                    }}
                />
            )}
        </>
    )

    return (
        <Box className="product-list-tile" data-component-id={id} mb={6}>
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
                <Box position="relative">{ImageContent}</Box>
            )}

            {ITCText && (
                <VStack spacing={2} mt={4}>
                    <Box
                        textAlign="center"
                        dangerouslySetInnerHTML={{__html: ITCText}}
                        sx={{
                            '& p': {lineHeight: 1.6, fontSize: {base: 'sm', md: 'md'}}
                        }}
                    />
                </VStack>
            )}
        </Box>
    )
})

ProductListTile.displayName = 'ProductListTile'

ProductListTile.propTypes = {
    data: PropTypes.shape({
        image: PropTypes.object,
        alt: PropTypes.string,
        heading: PropTypes.string,
        ITCLink: PropTypes.string,
        ITCText: PropTypes.string
    }),
    id: PropTypes.string
}

export default ProductListTile
