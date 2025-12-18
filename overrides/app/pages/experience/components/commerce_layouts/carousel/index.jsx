/*
 * Copyright (c) 2023, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

import React, {memo, useState, useCallback} from 'react'
import PropTypes from 'prop-types'
import {Box, Heading, IconButton, HStack, useBreakpointValue} from '@chakra-ui/react'
import {ChevronLeftIcon, ChevronRightIcon} from '@chakra-ui/icons'

/**
 * Carousel Component
 * Responsive carousel layout with configurable slides per breakpoint
 * Supports indicators and controls per breakpoint
 *
 * Performance: Memoized component with optimized rendering
 */
const Carousel = memo(({data, regions = [], renderRegions, id}) => {
    const {
        textHeadline,
        xsCarouselIndicators = true,
        xsCarouselControls = true,
        xsCarouselSlidesToDisplay = 1,
        smCarouselIndicators = true,
        smCarouselControls = true,
        smCarouselSlidesToDisplay = 2,
        mdCarouselIndicators = true,
        mdCarouselSlidesToDisplay = 3
    } = data || {}

    const [currentIndex, setCurrentIndex] = useState(0)

    // Get responsive values
    const slidesToShow =
        useBreakpointValue({
            base: xsCarouselSlidesToDisplay,
            sm: smCarouselSlidesToDisplay,
            md: mdCarouselSlidesToDisplay
        }) || 1

    const showIndicators = useBreakpointValue({
        base: xsCarouselIndicators,
        sm: smCarouselIndicators,
        md: mdCarouselIndicators
    })

    const showControls = useBreakpointValue({
        base: xsCarouselControls,
        sm: smCarouselControls,
        md: true
    })

    const slides = renderRegions(regions)
    const totalSlides = slides.length
    const maxIndex = Math.max(0, totalSlides - slidesToShow)

    const goToPrevious = useCallback(() => {
        setCurrentIndex((prev) => Math.max(0, prev - 1))
    }, [])

    const goToNext = useCallback(() => {
        setCurrentIndex((prev) => Math.min(maxIndex, prev + 1))
    }, [maxIndex])

    const goToSlide = useCallback(
        (index) => {
            setCurrentIndex(Math.min(maxIndex, Math.max(0, index)))
        },
        [maxIndex]
    )

    if (totalSlides === 0) {
        return null
    }

    return (
        <Box className="carousel" data-component-id={id} my={8} position="relative">
            {textHeadline && (
                <Heading
                    as="h2"
                    size={{base: 'md', md: 'lg'}}
                    mb={6}
                    textAlign="center"
                    fontWeight="semibold"
                >
                    {textHeadline}
                </Heading>
            )}

            <Box position="relative" overflow="hidden">
                {/* Carousel Container */}
                <Box
                    display="flex"
                    transition="transform 0.3s ease-in-out"
                    transform={`translateX(-${currentIndex * (100 / slidesToShow)}%)`}
                    width={`${(totalSlides / slidesToShow) * 100}%`}
                >
                    {slides.map((slide, index) => (
                        <Box key={index} flex={`0 0 ${100 / slidesToShow}%`} px={2}>
                            {slide}
                        </Box>
                    ))}
                </Box>

                {/* Navigation Controls */}
                {showControls && totalSlides > slidesToShow && (
                    <>
                        <IconButton
                            aria-label="Previous slide"
                            icon={<ChevronLeftIcon />}
                            position="absolute"
                            left={2}
                            top="50%"
                            transform="translateY(-50%)"
                            onClick={goToPrevious}
                            isDisabled={currentIndex === 0}
                            zIndex={2}
                            bg="white"
                            boxShadow="md"
                            _hover={{bg: 'gray.50'}}
                        />
                        <IconButton
                            aria-label="Next slide"
                            icon={<ChevronRightIcon />}
                            position="absolute"
                            right={2}
                            top="50%"
                            transform="translateY(-50%)"
                            onClick={goToNext}
                            isDisabled={currentIndex >= maxIndex}
                            zIndex={2}
                            bg="white"
                            boxShadow="md"
                            _hover={{bg: 'gray.50'}}
                        />
                    </>
                )}
            </Box>

            {/* Indicators */}
            {showIndicators && totalSlides > slidesToShow && (
                <HStack spacing={2} justify="center" mt={4}>
                    {[...Array(Math.ceil(totalSlides / slidesToShow))].map((_, index) => (
                        <Box
                            key={index}
                            as="button"
                            w={2}
                            h={2}
                            borderRadius="full"
                            bg={currentIndex === index ? 'brand.500' : 'gray.300'}
                            onClick={() => goToSlide(index * slidesToShow)}
                            _hover={{bg: currentIndex === index ? 'brand.600' : 'gray.400'}}
                            transition="background 0.2s"
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </HStack>
            )}
        </Box>
    )
})

Carousel.displayName = 'Carousel'

Carousel.propTypes = {
    data: PropTypes.shape({
        textHeadline: PropTypes.string,
        xsCarouselIndicators: PropTypes.bool,
        xsCarouselControls: PropTypes.bool,
        xsCarouselSlidesToDisplay: PropTypes.number,
        smCarouselIndicators: PropTypes.bool,
        smCarouselControls: PropTypes.bool,
        smCarouselSlidesToDisplay: PropTypes.number,
        mdCarouselIndicators: PropTypes.bool,
        mdCarouselSlidesToDisplay: PropTypes.number
    }),
    regions: PropTypes.array,
    renderRegions: PropTypes.func,
    id: PropTypes.string
}

export default Carousel
