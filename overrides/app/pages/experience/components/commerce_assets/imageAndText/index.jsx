/*
 * Copyright (c) 2023, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

import React, {memo} from 'react'
import PropTypes from 'prop-types'
import {Box, Image, Link} from '@chakra-ui/react'

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

    return (
        <Box className="image-and-text" data-component-id={id} mb={6}>
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
                <Box
                    mt={4}
                    dangerouslySetInnerHTML={{__html: heading}}
                    sx={{
                        '& h1': {fontSize: '2xl', fontWeight: 'bold'},
                        '& h2': {fontSize: 'xl', fontWeight: 'semibold'},
                        '& h3': {fontSize: 'lg', fontWeight: 'medium'}
                    }}
                />
            )}
            {ITCText && (
                <Box
                    mt={2}
                    dangerouslySetInnerHTML={{__html: ITCText}}
                    sx={{
                        '& p': {lineHeight: 1.6}
                    }}
                />
            )}
            {ITCLink && (
                <Link href={ITCLink} color="blue.500" mt={2} display="inline-block">
                    Learn More
                </Link>
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
