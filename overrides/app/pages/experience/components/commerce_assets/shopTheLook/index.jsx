/*
 * Copyright (c) 2023, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

import React, {memo} from 'react'
import PropTypes from 'prop-types'
import {Box, Image, LinkBox, LinkOverlay, VStack, Text} from '@chakra-ui/react'

/**
 * ShopTheLook Component
 * Product tile for "Shop The Look" feature
 * Displays product with optional pricing
 *
 * Performance: Memoized component with lazy loading
 */
const ShopTheLook = memo(({data, id}) => {
    const {product, priceDisplay} = data || {}

    if (!product) {
        return null
    }

    const productId = product.ID || product.id
    const productName = product.name || 'Product'
    const productImage = product.image || product.primaryImage
    const productPrice = product.price || product.priceMax
    const productUrl = product.url || `/product/${productId}`

    return (
        <Box className="shop-the-look" data-component-id={id} mb={4}>
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

                                {priceDisplay && productPrice && (
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

ShopTheLook.displayName = 'ShopTheLook'

ShopTheLook.propTypes = {
    data: PropTypes.shape({
        product: PropTypes.object,
        priceDisplay: PropTypes.bool
    }),
    id: PropTypes.string
}

export default ShopTheLook
