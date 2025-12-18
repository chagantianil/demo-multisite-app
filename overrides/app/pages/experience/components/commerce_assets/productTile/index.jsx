/*
 * Copyright (c) 2023, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

import React, {memo} from 'react'
import PropTypes from 'prop-types'
import {Box, Image, LinkBox, LinkOverlay, VStack, Text, HStack} from '@chakra-ui/react'
import {StarIcon} from '@chakra-ui/icons'

/**
 * ProductTile Component
 * Displays a product tile with image, name, price, and optional ratings
 * Note: This is a simplified version - full product data would come from Commerce API
 *
 * Performance: Memoized component with lazy loading
 */
const ProductTile = memo(({data, id}) => {
    const {product, displayRatings} = data || {}

    if (!product) {
        return null
    }

    const productId = product.ID || product.id
    const productName = product.name || 'Product'
    const productImage = product.image || product.primaryImage
    const productPrice = product.price || product.priceMax
    const productUrl = product.url || `/product/${productId}`
    const rating = product.rating || 0

    return (
        <Box className="product-tile" data-component-id={id} mb={4}>
            <LinkBox
                cursor="pointer"
                borderRadius="md"
                overflow="hidden"
                bg="white"
                boxShadow="sm"
                _hover={{
                    boxShadow: 'md',
                    transform: 'translateY(-2px)'
                }}
                transition="all 0.2s"
            >
                <VStack spacing={0} align="stretch">
                    {productImage?.url && (
                        <Box position="relative" width="100%" paddingTop="100%">
                            <Image
                                src={productImage.url}
                                alt={productName}
                                position="absolute"
                                top={0}
                                left={0}
                                width="100%"
                                height="100%"
                                objectFit="cover"
                                loading="lazy"
                                decoding="async"
                            />
                        </Box>
                    )}

                    <Box p={4}>
                        <LinkOverlay href={productUrl}>
                            <VStack spacing={2} align="stretch">
                                <Text
                                    fontSize="sm"
                                    fontWeight="medium"
                                    noOfLines={2}
                                    color="gray.700"
                                    minH="40px"
                                >
                                    {productName}
                                </Text>

                                {displayRatings && rating > 0 && (
                                    <HStack spacing={1}>
                                        {[...Array(5)].map((_, i) => (
                                            <StarIcon
                                                key={i}
                                                color={
                                                    i < Math.floor(rating)
                                                        ? 'yellow.400'
                                                        : 'gray.300'
                                                }
                                                boxSize={3}
                                            />
                                        ))}
                                        <Text fontSize="xs" color="gray.500">
                                            ({rating})
                                        </Text>
                                    </HStack>
                                )}

                                {productPrice && (
                                    <Text fontSize="lg" fontWeight="bold" color="brand.500">
                                        ${productPrice}
                                    </Text>
                                )}
                            </VStack>
                        </LinkOverlay>
                    </Box>
                </VStack>
            </LinkBox>
        </Box>
    )
})

ProductTile.displayName = 'ProductTile'

ProductTile.propTypes = {
    data: PropTypes.shape({
        product: PropTypes.object,
        displayRatings: PropTypes.bool
    }),
    id: PropTypes.string
}

export default ProductTile
