/*
 * Copyright (c) 2023, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

import React, {memo} from 'react'
import PropTypes from 'prop-types'
import {Box, Image} from '@chakra-ui/react'

/**
 * PhotoTile Component
 * Renders a simple image tile
 *
 * Performance optimizations:
 * - Lazy loading images
 * - Memoized component
 */
const PhotoTile = memo(({data, id}) => {
    const {image} = data || {}

    if (!image?.url) return null

    return (
        <Box className="photo-tile" data-component-id={id}>
            <Image
                src={image.url}
                alt="Photo tile"
                width="100%"
                height="auto"
                objectFit="cover"
                borderRadius="md"
                loading="lazy"
                decoding="async"
            />
        </Box>
    )
})

PhotoTile.displayName = 'PhotoTile'

PhotoTile.propTypes = {
    data: PropTypes.shape({
        image: PropTypes.object
    }),
    id: PropTypes.string
}

export default PhotoTile
