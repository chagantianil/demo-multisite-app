/*
 * Copyright (c) 2023, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

import React, {memo, useMemo} from 'react'
import PropTypes from 'prop-types'
import {
    Box,
    Image,
    SimpleGrid,
    LinkBox,
    LinkOverlay,
    Text,
    AbsoluteCenter,
    VStack
} from '@chakra-ui/react'

/**
 * Category Component
 * Link banner with background image, heading, and category links
 * Supports up to 12 categories with custom names
 *
 * Performance: Memoized component with optimized rendering
 */
const Category = memo(({data, id}) => {
    const {
        textHeadline,
        image,
        applyImageShade,
        changeTextColor,
        categories = [],
        customCategoryNames = {}
    } = data || {}

    // Process categories with custom names
    const processedCategories = useMemo(() => {
        return categories.map((cat) => ({
            ...cat,
            displayName:
                customCategoryNames[cat.ID] ||
                customCategoryNames[cat.id] ||
                cat.name ||
                'Category',
            url: cat.url || `#`
        }))
    }, [categories, customCategoryNames])

    const textColor = changeTextColor ? 'white' : 'gray.800'

    return (
        <Box className="category-banner" data-component-id={id} mb={8}>
            {image?.url && (
                <Box position="relative" width="100%" height={{base: '300px', md: '400px'}} mb={6}>
                    <Image
                        src={image.url}
                        alt="Category banner"
                        width="100%"
                        height="100%"
                        objectFit="cover"
                        objectPosition={`${image.focalPointX || '50%'} ${
                            image.focalPointY || '50%'
                        }`}
                        loading="lazy"
                        decoding="async"
                    />
                    <Box
                        position="absolute"
                        top={0}
                        left={0}
                        right={0}
                        bottom={0}
                        bg={applyImageShade ? 'blackAlpha.400' : 'transparent'}
                    />
                    {textHeadline && (
                        <AbsoluteCenter
                            textAlign="center"
                            color={textColor}
                            px={4}
                            w="100%"
                            textShadow={changeTextColor ? '0 2px 4px rgba(0,0,0,0.5)' : 'none'}
                        >
                            <Box
                                dangerouslySetInnerHTML={{__html: textHeadline}}
                                sx={{
                                    '& h1': {
                                        fontSize: {base: '2xl', md: '4xl'},
                                        fontWeight: 'bold'
                                    },
                                    '& h2': {
                                        fontSize: {base: 'xl', md: '3xl'},
                                        fontWeight: 'semibold'
                                    }
                                }}
                            />
                        </AbsoluteCenter>
                    )}
                </Box>
            )}

            {processedCategories.length > 0 && (
                <SimpleGrid columns={{base: 2, sm: 3, md: 4, lg: 6}} spacing={4}>
                    {processedCategories.map((category, index) => (
                        <LinkBox
                            key={category.ID || category.id || index}
                            cursor="pointer"
                            p={4}
                            borderRadius="md"
                            bg="white"
                            boxShadow="sm"
                            _hover={{
                                boxShadow: 'md',
                                transform: 'translateY(-2px)'
                            }}
                            transition="all 0.2s"
                        >
                            <LinkOverlay href={category.url}>
                                <VStack spacing={2}>
                                    <Text
                                        fontSize={{base: 'sm', md: 'md'}}
                                        fontWeight="medium"
                                        textAlign="center"
                                        color="gray.700"
                                        _hover={{color: 'brand.500'}}
                                    >
                                        {category.displayName}
                                    </Text>
                                </VStack>
                            </LinkOverlay>
                        </LinkBox>
                    ))}
                </SimpleGrid>
            )}
        </Box>
    )
})

Category.displayName = 'Category'

Category.propTypes = {
    data: PropTypes.shape({
        textHeadline: PropTypes.string,
        image: PropTypes.object,
        applyImageShade: PropTypes.bool,
        changeTextColor: PropTypes.bool,
        categories: PropTypes.array,
        customCategoryNames: PropTypes.object
    }),
    id: PropTypes.string
}

export default Category
