/*
 * Copyright (c) 2023, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

import React, {memo} from 'react'
import PropTypes from 'prop-types'
import {Box, Image, LinkBox, LinkOverlay, Text, VStack} from '@chakra-ui/react'

/**
 * PopularCategory Component
 * Round category tile with circular image and caption
 *
 * Performance: Memoized component with lazy loading
 */
const PopularCategory = memo(({data, id}) => {
    const {category, catDisplayName, image, imagesize, offset} = data || {}

    if (!category) {
        return null
    }

    const displayName = catDisplayName || category.name || 'Category'
    const categoryUrl = category.url || `#`

    return (
        <Box className="popular-category" data-component-id={id} mb={4}>
            <LinkBox cursor="pointer" _hover={{opacity: 0.8}} transition="opacity 0.2s">
                <VStack spacing={3}>
                    {image?.url && (
                        <Box
                            position="relative"
                            width={{base: '120px', md: '150px'}}
                            height={{base: '120px', md: '150px'}}
                            borderRadius="full"
                            overflow="hidden"
                            border="3px solid"
                            borderColor="gray.200"
                            _hover={{
                                borderColor: 'brand.500',
                                transform: 'scale(1.05)'
                            }}
                            transition="all 0.3s"
                        >
                            <Image
                                src={image.url}
                                alt={displayName}
                                width="100%"
                                height="100%"
                                objectFit="cover"
                                objectPosition={offset || 'center'}
                                loading="lazy"
                                decoding="async"
                                style={{
                                    width: imagesize || '100%',
                                    height: imagesize || '100%'
                                }}
                            />
                        </Box>
                    )}
                    <LinkOverlay href={categoryUrl}>
                        <Text
                            fontSize={{base: 'sm', md: 'md'}}
                            fontWeight="medium"
                            textAlign="center"
                            color="gray.700"
                            _hover={{color: 'brand.500'}}
                        >
                            {displayName}
                        </Text>
                    </LinkOverlay>
                </VStack>
            </LinkBox>
        </Box>
    )
})

PopularCategory.displayName = 'PopularCategory'

PopularCategory.propTypes = {
    data: PropTypes.shape({
        category: PropTypes.object,
        catDisplayName: PropTypes.string,
        image: PropTypes.object,
        imagesize: PropTypes.string,
        offset: PropTypes.string
    }),
    id: PropTypes.string
}

export default PopularCategory
