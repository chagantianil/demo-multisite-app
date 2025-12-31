/*
 * ProductImageGallery Component
 * A custom image gallery with vertical thumbnails, zoom, and pan functionality
 *
 * CSS Injection:
 * - Styles are injected client-side only via injectSwiperStyles() function
 * - SSR-safe: Only runs on client, skips on server
 * - CSS is scoped using component-specific class names (e.g., .main-swiper, .thumbnail-swiper)
 * - Uses Chakra UI CSS variables for theme-aware styling
 * - Note: PWA Kit doesn't support CSS imports, so manual injection is used
 */

import React, {useState, useRef, useCallback, useEffect, useMemo} from 'react'
import PropTypes from 'prop-types'
import {Swiper, SwiperSlide} from 'swiper/react'
import {Navigation, Thumbs, FreeMode, Pagination} from 'swiper/modules'
import {Box, Flex, Image, useBreakpointValue} from '@chakra-ui/react'

const ZOOM_SCALE = 2.5
const DEFAULT_PAN_POSITION = {x: 50, y: 50}
const INITIAL_PAN_POSITION = {x: 0, y: 0}
const TOUCH_PAN_THRESHOLD = 1
const STYLE_ID = 'product-image-gallery-styles'

const SWIPER_STYLES = `
.swiper {
    margin-left: auto;
    margin-right: auto;
    position: relative;
    overflow: hidden;
    list-style: none;
    padding: 0;
    z-index: 1;
    display: block;
}
.swiper-wrapper {
    position: relative;
    width: 100%;
    height: 100%;
    z-index: 1;
    display: flex;
    transition-property: transform;
    box-sizing: content-box;
}
.swiper-slide {
    flex-shrink: 0;
    width: 100%;
    height: 100%;
    position: relative;
    transition-property: transform;
    display: block;
    overflow: hidden;
}
.main-swiper .swiper-slide {
    height: 100%;
    display: flex;
    align-items: stretch;
}
.swiper-free-mode > .swiper-wrapper {
    transition-timing-function: ease-out;
    margin: 0 auto;
}
.swiper-button-next,
.swiper-button-prev {
    position: absolute;
    top: 50%;
    width: 27px;
    height: 44px;
    margin-top: -22px;
    z-index: 10;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--chakra-colors-brand-500);
}
.swiper-button-next:after,
.swiper-button-prev:after {
    font-family: swiper-icons;
    font-size: 44px;
    text-transform: none !important;
    letter-spacing: 0;
    font-variant: normal;
    line-height: 1;
}
.swiper-button-prev {
    left: 10px;
    right: auto;
}
.swiper-button-prev:after {
    content: '←';
}
.swiper-button-next {
    right: 10px;
    left: auto;
}
.swiper-button-next:after {
    content: '→';
}
.swiper-button-lock {
    display: none;
}
.swiper-button-disabled {
    opacity: 0.35;
    cursor: auto;
    pointer-events: none;
}
.thumbnail-swiper .swiper-slide {
    opacity: 0.6;
    transition: opacity 0.2s;
    width: 100% !important;
    height: auto !important;
}
.thumbnail-swiper .swiper-slide-thumb-active {
    opacity: 1 !important;
}
.thumbnail-swiper .swiper-slide-thumb-active .thumbnail-item {
    border-color: var(--chakra-colors-brand-500) !important;
}
.thumbnail-swiper .swiper-slide-active .thumbnail-item {
    border: none !important;
}
.thumbnail-swiper.swiper-vertical .swiper-wrapper {
    flex-direction: column;
}
.thumbnail-swiper.swiper-vertical .swiper-slide {
    width: 100% !important;
}
.swiper-pagination-custom {
    position: relative;
    bottom: auto;
    left: 0;
    width: 100%;
    text-align: center;
    z-index: 1;
}
.swiper-pagination-bullet-custom {
    width: 8px;
    height: 8px;
    display: inline-block;
    border-radius: 50%;
    background: var(--chakra-colors-neutral-300);
    opacity: 1;
    margin: 0 4px;
    cursor: pointer;
    transition: all 0.3s;
}
.swiper-pagination-bullet-active-custom {
    background: var(--chakra-colors-brand-500);
    width: 24px;
    border-radius: 4px;
}
`

const injectSwiperStyles = () => {
    if (typeof window === 'undefined') return

    if (document.getElementById(STYLE_ID)) return

    const style = document.createElement('style')
    style.id = STYLE_ID
    style.textContent = SWIPER_STYLES
    document.head.appendChild(style)
}

const BREAKPOINT_CONFIG = {
    showDots: {base: true, md: true, lg: false},
    flexDirection: {base: 'column', md: 'row'},
    gap: {base: 4, md: 6},
    thumbnailWidth: {base: '100%', lg: '100px'},
    thumbnailHeight: {base: 'auto', lg: '400px'},
    minHeight: {base: '300px', md: '400px'}
}

/**
 * Calculates percentage position from pixel coordinates
 * @param {number} pixel - Pixel value
 * @param {number} containerSize - Container size in pixels
 * @returns {number} Percentage value (0-100)
 */
const calculatePercentage = (pixel, containerSize) => {
    return Math.max(0, Math.min(100, (pixel / containerSize) * 100))
}

/**
 * Calculates actual rendered image dimensions with objectFit="contain"
 * @param {number} containerWidth - Container width
 * @param {number} containerHeight - Container height
 * @param {number} naturalWidth - Image natural width
 * @param {number} naturalHeight - Image natural height
 * @returns {Object} {width, height} - Actual rendered dimensions
 */
const calculateRenderedImageSize = (
    containerWidth,
    containerHeight,
    naturalWidth,
    naturalHeight
) => {
    if (!containerWidth || !containerHeight || containerWidth <= 0 || containerHeight <= 0) {
        return {width: 0, height: 0}
    }

    if (!naturalWidth || !naturalHeight || naturalWidth <= 0 || naturalHeight <= 0) {
        return {width: containerWidth, height: containerHeight}
    }

    if (containerHeight === 0 || naturalHeight === 0) {
        return {width: containerWidth, height: containerHeight}
    }

    const containerAspect = containerWidth / containerHeight
    const imageAspect = naturalWidth / naturalHeight

    if (!isFinite(imageAspect) || !isFinite(containerAspect)) {
        return {width: containerWidth, height: containerHeight}
    }

    let renderedWidth, renderedHeight

    if (imageAspect > containerAspect) {
        renderedWidth = containerWidth
        renderedHeight = containerWidth / imageAspect
    } else {
        renderedHeight = containerHeight
        renderedWidth = containerHeight * imageAspect
    }

    if (
        !isFinite(renderedWidth) ||
        !isFinite(renderedHeight) ||
        renderedWidth <= 0 ||
        renderedHeight <= 0
    ) {
        return {width: containerWidth, height: containerHeight}
    }

    return {width: renderedWidth, height: renderedHeight}
}

/**
 * Calculates maximum translate offset to prevent image edges from crossing container boundaries
 * Transform: scale(scaleFactor) translate(x, y) with transformOrigin: center center
 * Translate is in original coordinate space, so we need to divide by scale factor
 * @param {number} scaledSize - Scaled image size (renderedSize * scale)
 * @param {number} containerSize - Container size
 * @param {number} scaleFactor - Scale factor (e.g., 2.5)
 * @returns {number} Maximum translate offset in original coordinate space
 */
const calculateMaxTranslateOffset = (scaledSize, containerSize, scaleFactor) => {
    if (!scaledSize || !containerSize || !scaleFactor || scaleFactor <= 0) {
        return 0
    }

    if (scaledSize <= containerSize) {
        return 0
    }

    const extension = (scaledSize - containerSize) / 2
    const maxOffset = extension / scaleFactor

    return Math.max(0, isFinite(maxOffset) ? maxOffset : 0)
}

/**
 * Calculates initial translate offset to center a clicked point
 * Transform: scale(scaleFactor) translate(x, y) with transformOrigin: center center
 * @param {number} clickPosition - Click position relative to container
 * @param {number} centerPosition - Container center position
 * @param {number} scaleFactor - Scale factor (e.g., 2.5)
 * @returns {number} Initial translate offset in original coordinate space
 */
const calculateInitialTranslateOffset = (clickPosition, centerPosition, scaleFactor) => {
    if (
        typeof clickPosition !== 'number' ||
        typeof centerPosition !== 'number' ||
        !scaleFactor ||
        scaleFactor <= 0
    ) {
        return 0
    }

    const distanceFromCenter = centerPosition - clickPosition
    const offset = (distanceFromCenter * (scaleFactor - 1)) / scaleFactor

    return isFinite(offset) ? offset : 0
}
/**
 * Gets image URL from various image formats
 * @param {string|Object} image - Image URL string or object with image properties
 * @returns {string} Image URL
 */
const getImageUrl = (image) => {
    if (typeof image === 'string') return image
    return image?.disBaseLink || image?.link || image?.src || image
}

const ProductImageGallery = ({images = [], alt = 'Product image'}) => {
    const showDots = useBreakpointValue(BREAKPOINT_CONFIG.showDots)

    const [thumbsSwiper, setThumbsSwiper] = useState(null)
    const [isZoomed, setIsZoomed] = useState(false)
    const [isHovering, setIsHovering] = useState(false)
    const [panPosition, setPanPosition] = useState(INITIAL_PAN_POSITION)
    const [touchOffset, setTouchOffset] = useState(INITIAL_PAN_POSITION)
    const [activeSlideIndex, setActiveSlideIndex] = useState(0)

    const mainSwiperRef = useRef(null)
    const imageContainerRef = useRef(null)
    const imageRef = useRef(null)
    const currentPanPositionRef = useRef(DEFAULT_PAN_POSITION)
    const touchStartRef = useRef(null)
    const isPanningRef = useRef(false)
    const imageDimensionsRef = useRef({width: 0, height: 0})

    useEffect(() => {
        injectSwiperStyles()
    }, [])

    const resetZoom = useCallback(() => {
        setIsZoomed(false)
        setPanPosition(INITIAL_PAN_POSITION)
        setTouchOffset(INITIAL_PAN_POSITION)
        currentPanPositionRef.current = DEFAULT_PAN_POSITION
    }, [])

    useEffect(() => {
        if (isZoomed) {
            currentPanPositionRef.current = panPosition
        }
    }, [panPosition, isZoomed])

    useEffect(() => {
        if (!mainSwiperRef.current?.swiper) return

        try {
            const swiper = mainSwiperRef.current.swiper
            if (isZoomed) {
                swiper.allowTouchMove = false
            } else {
                swiper.allowTouchMove = true
                swiper.allowSlideNext = true
                swiper.allowSlidePrev = true
            }
        } catch (error) {
            console.warn('Swiper not ready:', error)
        }
    }, [isZoomed])

    useEffect(() => {
        if (!mainSwiperRef.current?.swiper || !isZoomed) return

        try {
            const swiper = mainSwiperRef.current.swiper
            const handleSlideChange = () => {
                resetZoom()
            }

            swiper.on('slideChange', handleSlideChange)
            return () => {
                try {
                    if (swiper && typeof swiper.off === 'function') {
                        swiper.off('slideChange', handleSlideChange)
                    }
                } catch (error) {
                    // Ignore cleanup errors
                }
            }
        } catch (error) {
            console.warn('Swiper not ready:', error)
        }
    }, [isZoomed, resetZoom])

    useEffect(() => {
        resetZoom()
    }, [images, resetZoom])

    useEffect(() => {
        if (showDots && thumbsSwiper) {
            try {
                if (
                    thumbsSwiper &&
                    typeof thumbsSwiper.destroyed !== 'undefined' &&
                    !thumbsSwiper.destroyed
                ) {
                    // Swiper handles cleanup automatically
                }
            } catch (error) {
                // Ignore cleanup errors
            }
        }
    }, [showDots, thumbsSwiper])

    useEffect(() => {
        if (imageRef.current && imageRef.current.complete) {
            const img = imageRef.current
            imageDimensionsRef.current = {
                width: img.naturalWidth,
                height: img.naturalHeight
            }
        }
    }, [activeSlideIndex])

    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape' && isZoomed) {
                resetZoom()
            }
        }

        window.addEventListener('keydown', handleEscape)
        return () => window.removeEventListener('keydown', handleEscape)
    }, [isZoomed, resetZoom])

    const handleThumbnailHover = useCallback(
        (index) => {
            if (!mainSwiperRef.current?.swiper) return

            try {
                if (isZoomed) {
                    resetZoom()
                }
                setActiveSlideIndex(index)
                mainSwiperRef.current.swiper.slideTo(index)
            } catch (error) {
                console.warn('Swiper not ready:', error)
            }
        },
        [isZoomed, resetZoom]
    )

    const handleImageClick = useCallback(
        (e) => {
            if (!imageContainerRef.current) return

            if (!isZoomed) {
                const imageContainerBox =
                    e.currentTarget.closest('[data-image-container]') || imageContainerRef.current
                if (!imageContainerBox) return

                const rect = imageContainerBox.getBoundingClientRect()
                const x = e.clientX - rect.left
                const y = e.clientY - rect.top

                if (showDots) {
                    const containerRect = imageContainerBox.getBoundingClientRect()
                    const clickX = e.clientX - containerRect.left
                    const clickY = e.clientY - containerRect.top
                    const centerX = containerRect.width / 2
                    const centerY = containerRect.height / 2

                    const imgDims = imageDimensionsRef.current
                    let renderedSize

                    if (imgDims.width && imgDims.height) {
                        renderedSize = calculateRenderedImageSize(
                            containerRect.width,
                            containerRect.height,
                            imgDims.width,
                            imgDims.height
                        )
                    } else {
                        renderedSize = {width: containerRect.width, height: containerRect.height}
                    }

                    const scaledWidth = renderedSize.width * ZOOM_SCALE
                    const scaledHeight = renderedSize.height * ZOOM_SCALE

                    const initialOffsetX = calculateInitialTranslateOffset(
                        clickX,
                        centerX,
                        ZOOM_SCALE
                    )
                    const initialOffsetY = calculateInitialTranslateOffset(
                        clickY,
                        centerY,
                        ZOOM_SCALE
                    )

                    const maxOffsetX = calculateMaxTranslateOffset(
                        scaledWidth,
                        containerRect.width,
                        ZOOM_SCALE
                    )
                    const maxOffsetY = calculateMaxTranslateOffset(
                        scaledHeight,
                        containerRect.height,
                        ZOOM_SCALE
                    )

                    setTouchOffset({
                        x: Math.max(-maxOffsetX, Math.min(maxOffsetX, initialOffsetX)),
                        y: Math.max(-maxOffsetY, Math.min(maxOffsetY, initialOffsetY))
                    })
                    setPanPosition(DEFAULT_PAN_POSITION)
                } else {
                    const xPercent = calculatePercentage(x, rect.width)
                    const yPercent = calculatePercentage(y, rect.height)
                    const initialPanPosition = {x: xPercent, y: yPercent}
                    currentPanPositionRef.current = initialPanPosition
                    setPanPosition(initialPanPosition)
                    setTouchOffset(INITIAL_PAN_POSITION)
                }

                setIsZoomed(true)
            } else {
                resetZoom()
            }
        },
        [isZoomed, showDots, resetZoom]
    )

    const handleMouseMove = useCallback(
        (e) => {
            if (!isZoomed || !imageContainerRef.current || showDots) return

            const container = imageContainerRef.current
            const rect = container.getBoundingClientRect()
            const x = e.clientX - rect.left
            const y = e.clientY - rect.top

            const xPercent = calculatePercentage(x, rect.width)
            const yPercent = calculatePercentage(y, rect.height)

            setPanPosition({x: xPercent, y: yPercent})
        },
        [isZoomed, showDots]
    )

    const handleTouchStart = useCallback(
        (e) => {
            if (!isZoomed || !showDots) return

            e.stopPropagation()
            const touch = e.touches[0]
            if (touch) {
                touchStartRef.current = {
                    x: touch.clientX,
                    y: touch.clientY,
                    initialOffsetX: touchOffset.x,
                    initialOffsetY: touchOffset.y
                }
                isPanningRef.current = false
            }
        },
        [isZoomed, showDots, touchOffset]
    )

    const handleTouchMove = useCallback(
        (e) => {
            if (!isZoomed || !showDots || !touchStartRef.current) return

            const touch = e.touches[0]
            if (!touch) return

            const deltaX = touch.clientX - touchStartRef.current.x
            const deltaY = touch.clientY - touchStartRef.current.y

            if (
                !isPanningRef.current &&
                (Math.abs(deltaX) > TOUCH_PAN_THRESHOLD || Math.abs(deltaY) > TOUCH_PAN_THRESHOLD)
            ) {
                isPanningRef.current = true
            }

            if (isPanningRef.current) {
                e.preventDefault()
                e.stopPropagation()

                const imageContainerBox = e.currentTarget.closest('[data-image-container]')
                if (!imageContainerBox) return

                const containerRect = imageContainerBox.getBoundingClientRect()

                const newX = touchStartRef.current.initialOffsetX + deltaX
                const newY = touchStartRef.current.initialOffsetY + deltaY

                const imgDims = imageDimensionsRef.current
                let renderedSize

                if (imgDims.width && imgDims.height) {
                    renderedSize = calculateRenderedImageSize(
                        containerRect.width,
                        containerRect.height,
                        imgDims.width,
                        imgDims.height
                    )
                } else {
                    renderedSize = {width: containerRect.width, height: containerRect.height}
                }

                const scaledWidth = renderedSize.width * ZOOM_SCALE
                const scaledHeight = renderedSize.height * ZOOM_SCALE

                const maxX = calculateMaxTranslateOffset(
                    scaledWidth,
                    containerRect.width,
                    ZOOM_SCALE
                )
                const maxY = calculateMaxTranslateOffset(
                    scaledHeight,
                    containerRect.height,
                    ZOOM_SCALE
                )

                setTouchOffset({
                    x: Math.max(-maxX, Math.min(maxX, newX)),
                    y: Math.max(-maxY, Math.min(maxY, newY))
                })
            }
        },
        [isZoomed, showDots]
    )

    const handleTouchEnd = useCallback(() => {
        if (!isZoomed || !showDots) return
        touchStartRef.current = null
        isPanningRef.current = false
    }, [isZoomed, showDots])

    const hasImages = useMemo(() => images && images.length > 0, [images])
    const swiperModules = useMemo(() => {
        const modules = showDots ? [Navigation, Pagination] : [Navigation, Thumbs]
        return modules.filter(Boolean)
    }, [showDots])
    const paginationConfig = useMemo(
        () =>
            showDots
                ? {
                      clickable: true,
                      dynamicBullets: false,
                      el: '.swiper-pagination-custom',
                      bulletClass: 'swiper-pagination-bullet-custom',
                      bulletActiveClass: 'swiper-pagination-bullet-active-custom'
                  }
                : false,
        [showDots]
    )
    const thumbsConfig = useMemo(() => {
        if (showDots) return undefined

        if (
            !thumbsSwiper ||
            (typeof thumbsSwiper.destroyed !== 'undefined' && thumbsSwiper.destroyed)
        ) {
            return {
                swiper: null,
                slideThumbActiveClass: 'swiper-slide-thumb-active'
            }
        }

        return {
            swiper: thumbsSwiper,
            slideThumbActiveClass: 'swiper-slide-thumb-active'
        }
    }, [showDots, thumbsSwiper])

    const handleSlideChange = useCallback((swiper) => {
        if (!swiper || typeof swiper.activeIndex === 'undefined') return
        try {
            setActiveSlideIndex(swiper.activeIndex)
            imageDimensionsRef.current = {width: 0, height: 0}
        } catch (error) {
            console.warn('Error in handleSlideChange:', error)
        }
    }, [])

    const handleSwiperInit = useCallback((swiper) => {
        if (!swiper || typeof swiper.activeIndex === 'undefined') return
        try {
            setActiveSlideIndex(swiper.activeIndex)
            imageDimensionsRef.current = {width: 0, height: 0}
        } catch (error) {
            console.warn('Error in handleSwiperInit:', error)
        }
    }, [])

    const handleMouseDown = useCallback(
        (e) => {
            if (isZoomed) {
                e.preventDefault()
            }
        },
        [isZoomed]
    )

    if (!hasImages) {
        return null
    }

    return (
        <Flex
            direction={BREAKPOINT_CONFIG.flexDirection}
            gap={BREAKPOINT_CONFIG.gap}
            w="100%"
            maxW="100%"
            position="relative"
            align="flex-start"
            h="100%"
        >
            {!showDots && (
                <Box
                    w={BREAKPOINT_CONFIG.thumbnailWidth}
                    h={BREAKPOINT_CONFIG.thumbnailHeight}
                    flexShrink={0}
                    maxH={{base: 'none', lg: '500px'}}
                    overflow="hidden"
                >
                    <Swiper
                        key="thumbnail-swiper"
                        onSwiper={(swiper) => {
                            if (swiper && !swiper.destroyed) {
                                setThumbsSwiper(swiper)
                            }
                        }}
                        spaceBetween={8}
                        slidesPerView={4}
                        direction="vertical"
                        freeMode={true}
                        watchSlidesProgress={true}
                        modules={[FreeMode, Thumbs]}
                        className="thumbnail-swiper"
                        style={{
                            height: '100%',
                            width: '100%'
                        }}
                    >
                        {images.map((image, index) => (
                            <SwiperSlide
                                key={index}
                                style={{
                                    cursor: 'pointer',
                                    height: 'auto',
                                    opacity: activeSlideIndex === index ? 1 : 0.6,
                                    transition: 'opacity 0.2s'
                                }}
                                onMouseEnter={() => handleThumbnailHover(index)}
                                onClick={() => handleThumbnailHover(index)}
                            >
                                <Box
                                    position="relative"
                                    pb="100%"
                                    overflow="hidden"
                                    borderRadius="md"
                                    border="2px solid"
                                    borderColor="transparent"
                                    _hover={{
                                        borderColor: 'brand.500'
                                    }}
                                    transition="all 0.2s"
                                    className="thumbnail-item"
                                >
                                    <Image
                                        src={getImageUrl(image)}
                                        alt={`${alt} thumbnail ${index + 1}`}
                                        position="absolute"
                                        top="0"
                                        left="0"
                                        width="100%"
                                        height="100%"
                                        objectFit="cover"
                                    />
                                </Box>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </Box>
            )}

            <Box
                flex="1"
                position="relative"
                w="100%"
                maxW="100%"
                minW={0}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                onMouseMove={handleMouseMove}
                ref={imageContainerRef}
            >
                <Box
                    position="relative"
                    width="100%"
                    pb="100%"
                    minH={BREAKPOINT_CONFIG.minHeight}
                    overflow="hidden"
                >
                    <Swiper
                        key={`main-swiper-${showDots ? 'dots' : 'thumbs'}`}
                        ref={mainSwiperRef}
                        spaceBetween={10}
                        navigation={!isZoomed && !showDots}
                        pagination={paginationConfig}
                        thumbs={thumbsConfig}
                        modules={swiperModules}
                        allowTouchMove={!isZoomed}
                        className="main-swiper"
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%'
                        }}
                        watchSlidesProgress={true}
                        observer={true}
                        observeParents={true}
                        onSlideChange={handleSlideChange}
                        onSwiper={handleSwiperInit}
                    >
                        {images.map((image, index) => (
                            <SwiperSlide key={index}>
                                <Box
                                    position="relative"
                                    width="100%"
                                    maxW="100%"
                                    height="100%"
                                    bg="gray.50"
                                    overflow="hidden"
                                    cursor={isZoomed ? 'move' : isHovering ? 'zoom-in' : 'default'}
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        handleImageClick(e)
                                    }}
                                    onMouseDown={handleMouseDown}
                                    onTouchStart={handleTouchStart}
                                    onTouchMove={handleTouchMove}
                                    onTouchEnd={handleTouchEnd}
                                    style={{
                                        touchAction: isZoomed && showDots ? 'none' : 'auto',
                                        WebkitTouchCallout: 'none',
                                        WebkitUserSelect: 'none'
                                    }}
                                    userSelect="none"
                                    willChange={isZoomed ? 'transform' : 'auto'}
                                    data-image-container
                                >
                                    <Box
                                        position="absolute"
                                        top="0"
                                        left="0"
                                        width="100%"
                                        height="100%"
                                        overflow="hidden"
                                    >
                                        <Image
                                            ref={index === activeSlideIndex ? imageRef : null}
                                            src={getImageUrl(image)}
                                            alt={`${alt} ${index + 1}`}
                                            width="100%"
                                            height="100%"
                                            objectFit="contain"
                                            loading={index === 0 ? 'eager' : 'lazy'}
                                            decoding="sync"
                                            onLoad={(e) => {
                                                if (index === activeSlideIndex && e.target) {
                                                    const img = e.target
                                                    imageDimensionsRef.current = {
                                                        width: img.naturalWidth,
                                                        height: img.naturalHeight
                                                    }
                                                }
                                            }}
                                            transform={
                                                isZoomed
                                                    ? showDots
                                                        ? `scale(${ZOOM_SCALE}) translate(${touchOffset.x}px, ${touchOffset.y}px) translateZ(0)`
                                                        : `scale(${ZOOM_SCALE}) translateZ(0)`
                                                    : 'scale(1) translateZ(0)'
                                            }
                                            transformOrigin={
                                                isZoomed && !showDots
                                                    ? `${currentPanPositionRef.current.x}% ${currentPanPositionRef.current.y}%`
                                                    : 'center center'
                                            }
                                            transition={
                                                isZoomed ? 'none' : 'transform 0.2s ease-out'
                                            }
                                            pointerEvents="none"
                                            sx={{
                                                backfaceVisibility: 'hidden',
                                                WebkitBackfaceVisibility: 'hidden',
                                                willChange: 'transform'
                                            }}
                                        />
                                    </Box>
                                </Box>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </Box>

                {showDots && (
                    <Box
                        className="swiper-pagination-custom"
                        mt={4}
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        w="100%"
                    />
                )}

                {isZoomed && (
                    <Box
                        position="absolute"
                        top={4}
                        right={4}
                        bg="blackAlpha.700"
                        color="white"
                        px={3}
                        py={2}
                        borderRadius="md"
                        fontSize="sm"
                        zIndex={10}
                    >
                        {showDots ? 'Pinch to zoom out' : 'Click to zoom out | ESC to exit'}
                    </Box>
                )}
            </Box>
        </Flex>
    )
}

ProductImageGallery.propTypes = {
    /**
     * Array of image objects or URLs
     * Can be: string URLs, or objects with properties like {link, disBaseLink, src}
     */
    images: PropTypes.arrayOf(
        PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.shape({
                link: PropTypes.string,
                disBaseLink: PropTypes.string,
                src: PropTypes.string
            })
        ])
    ),
    /**
     * Alt text for images
     */
    alt: PropTypes.string
}

ProductImageGallery.defaultProps = {
    images: [],
    alt: 'Product image'
}

export default ProductImageGallery
