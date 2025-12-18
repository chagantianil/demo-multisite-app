/*
 * Copyright (c) 2023, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

import React, {memo} from 'react'
import PropTypes from 'prop-types'
import {Box, Image, Button, AbsoluteCenter, LinkBox, LinkOverlay} from '@chakra-ui/react'

/**
 * MainBanner Component
 * Large banner with image, text overlay, and category link
 *
 * Performance: Memoized component with lazy loading
 */
const MainBanner = memo(({data, id}) => {
    const {image, heading, categoryLink} = data || {}

    if (!image?.url) {
        return null
    }

    const ImageContent = (
        <>
            <Image
                src={image.url}
                alt={image.alt || 'Banner'}
                width="100%"
                height={{base: '300px', md: '500px'}}
                objectFit="cover"
                loading="lazy"
                decoding="async"
            />
            {heading && (
                <AbsoluteCenter
                    textAlign="center"
                    color="white"
                    textShadow="0 2px 8px rgba(0,0,0,0.7)"
                    px={4}
                    w="100%"
                >
                    <Box
                        dangerouslySetInnerHTML={{__html: heading}}
                        sx={{
                            '& h1': {
                                fontSize: {base: '3xl', md: '5xl'},
                                fontWeight: 'bold',
                                mb: 4
                            },
                            '& h2': {
                                fontSize: {base: '2xl', md: '4xl'},
                                fontWeight: 'semibold',
                                mb: 4
                            }
                        }}
                    />
                    {categoryLink && (
                        <Button
                            as="a"
                            href={categoryLink}
                            colorScheme="white"
                            variant="outline"
                            size="lg"
                            mt={4}
                            _hover={{
                                bg: 'white',
                                color: 'gray.800'
                            }}
                        >
                            Shop Now
                        </Button>
                    )}
                </AbsoluteCenter>
            )}
        </>
    )

    return (
        <Box className="main-banner" data-component-id={id} position="relative" mb={8}>
            {categoryLink ? (
                <LinkBox position="relative" cursor="pointer" _hover={{opacity: 0.95}}>
                    <LinkOverlay href={categoryLink} />
                    {ImageContent}
                </LinkBox>
            ) : (
                <Box position="relative">{ImageContent}</Box>
            )}
        </Box>
    )
})

MainBanner.displayName = 'MainBanner'

MainBanner.propTypes = {
    data: PropTypes.shape({
        image: PropTypes.object,
        heading: PropTypes.string,
        categoryLink: PropTypes.string
    }),
    id: PropTypes.string
}

export default MainBanner
