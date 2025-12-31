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

// Constants
const ZOOM_SCALE = 2.5
const ZOOM_SCALE_PERCENT = 250
const DEFAULT_PAN_POSITION = {x: 50, y: 50}
const INITIAL_PAN_POSITION = {x: 0, y: 0}
const TOUCH_PAN_THRESHOLD = 1
const STYLE_ID = 'product-image-gallery-styles'

// Swiper CSS styles (injected client-side only for SSR compatibility)
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

/**
 * Injects Swiper CSS styles into the document head (client-side only)
 * SSR-safe: Only runs on client, skips on server
 */
const injectSwiperStyles = () => {
    if (typeof window === 'undefined') return

    if (document.getElementById(STYLE_ID)) return

    const style = document.createElement('style')
    style.id = STYLE_ID
    style.textContent = SWIPER_STYLES
    document.head.appendChild(style)
}

// Breakpoint configuration
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
 * Calculates scroll position to center clicked area when zoomed
 * @param {number} clickPosition - Click position in pixels
 * @param {number} containerSize - Container size in pixels
 * @returns {number} Scroll position in pixels
 */
const calculateScrollPosition = (clickPosition, containerSize) => {
    return clickPosition * ZOOM_SCALE - containerSize / 2
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
    // Breakpoint values
    const showDots = useBreakpointValue(BREAKPOINT_CONFIG.showDots)

    // State
    const [thumbsSwiper, setThumbsSwiper] = useState(null)
    const [isZoomed, setIsZoomed] = useState(false)
    const [isHovering, setIsHovering] = useState(false)
    const [panPosition, setPanPosition] = useState(INITIAL_PAN_POSITION)
    const [touchOffset, setTouchOffset] = useState(INITIAL_PAN_POSITION)
    const [activeSlideIndex, setActiveSlideIndex] = useState(0)

    // Refs
    const mainSwiperRef = useRef(null)
    const imageContainerRef = useRef(null)
    const imageBoxRef = useRef(null)
    const currentPanPositionRef = useRef(DEFAULT_PAN_POSITION)
    const touchStartRef = useRef(null)
    const isPanningRef = useRef(false)

    // Inject Swiper styles on mount (client-side only, SSR-safe)
    useEffect(() => {
        injectSwiperStyles()
    }, [])

    /**
     * Resets zoom state to initial values
     */
    const resetZoom = useCallback(() => {
        setIsZoomed(false)
        setPanPosition(INITIAL_PAN_POSITION)
        setTouchOffset(INITIAL_PAN_POSITION)
        currentPanPositionRef.current = DEFAULT_PAN_POSITION
    }, [])

    // Sync ref with panPosition state for immediate access
    useEffect(() => {
        if (isZoomed) {
            currentPanPositionRef.current = panPosition
        }
    }, [panPosition, isZoomed])

    // Disable/enable Swiper touch when zoom state changes
    useEffect(() => {
        if (!mainSwiperRef.current?.swiper) return

        const swiper = mainSwiperRef.current.swiper
        if (isZoomed) {
            // Disable touch/swipe for carousel when zoomed
            // User can pan within zoomed image, but cannot swipe to next/prev image
            swiper.allowTouchMove = false
        } else {
            swiper.allowTouchMove = true
            swiper.allowSlideNext = true
            swiper.allowSlidePrev = true
        }
    }, [isZoomed])

    // Reset zoom when slide changes (via Swiper events)
    useEffect(() => {
        if (!mainSwiperRef.current?.swiper || !isZoomed) return

        const swiper = mainSwiperRef.current.swiper
        const handleSlideChange = () => {
            resetZoom()
        }

        swiper.on('slideChange', handleSlideChange)
        return () => {
            swiper.off('slideChange', handleSlideChange)
        }
    }, [isZoomed, resetZoom])

    // Reset zoom when images change
    useEffect(() => {
        resetZoom()
    }, [images, resetZoom])

    // Close zoom on escape key
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape' && isZoomed) {
                resetZoom()
            }
        }

        window.addEventListener('keydown', handleEscape)
        return () => window.removeEventListener('keydown', handleEscape)
    }, [isZoomed, resetZoom])

    /**
     * Handles thumbnail hover/click - programmatically changes main image
     */
    const handleThumbnailHover = useCallback(
        (index) => {
            if (!mainSwiperRef.current?.swiper) return

            if (isZoomed) {
                resetZoom()
            }
            setActiveSlideIndex(index)
            mainSwiperRef.current.swiper.slideTo(index)
        },
        [isZoomed, resetZoom]
    )

    /**
     * Toggles zoom on main image click
     * On desktop: calculates pan position based on click
     * On mobile/tablet: sets scroll position to center clicked area
     */
    const handleImageClick = useCallback(
        (e) => {
            if (!imageContainerRef.current) return

            if (!isZoomed) {
                const container = imageContainerRef.current
                const rect = container.getBoundingClientRect()
                const x = e.clientX - rect.left
                const y = e.clientY - rect.top

                // Calculate pan position based on click position
                const xPercent = calculatePercentage(x, rect.width)
                const yPercent = calculatePercentage(y, rect.height)
                const initialPanPosition = {x: xPercent, y: yPercent}

                // On mobile/tablet, set scroll position to center the clicked area
                if (showDots && imageBoxRef.current) {
                    const scrollLeft = calculateScrollPosition(x, rect.width)
                    const scrollTop = calculateScrollPosition(y, rect.height)

                    // Use setTimeout to ensure the zoom state is set and DOM is updated
                    setTimeout(() => {
                        if (imageBoxRef.current) {
                            imageBoxRef.current.scrollLeft = Math.max(0, scrollLeft)
                            imageBoxRef.current.scrollTop = Math.max(0, scrollTop)
                        }
                    }, 0)
                }

                // Store in ref for immediate access and set state
                currentPanPositionRef.current = initialPanPosition
                setPanPosition(initialPanPosition)
                setTouchOffset(INITIAL_PAN_POSITION)
                setIsZoomed(true)
            } else {
                resetZoom()
            }
        },
        [isZoomed, showDots, resetZoom]
    )

    /**
     * Desktop: Handles mouse move for pan effect
     */
    const handleMouseMove = useCallback(
        (e) => {
            if (!isZoomed || !imageContainerRef.current || showDots) return

            const container = imageContainerRef.current
            const rect = container.getBoundingClientRect()
            const x = e.clientX - rect.left
            const y = e.clientY - rect.top

            // Calculate percentage position (0-100)
            const xPercent = calculatePercentage(x, rect.width)
            const yPercent = calculatePercentage(y, rect.height)

            // Set transform origin based on mouse position
            setPanPosition({x: xPercent, y: yPercent})
        },
        [isZoomed, showDots]
    )

    /**
     * Mobile/Tablet: Handles touch start
     */
    const handleTouchStart = useCallback(
        (e) => {
            if (!isZoomed || !showDots) return

            // Prevent Swiper from handling touch events
            e.stopPropagation()
            const touch = e.touches[0]
            if (touch) {
                touchStartRef.current = {
                    x: touch.clientX,
                    y: touch.clientY,
                    initialX: touch.clientX - touchOffset.x,
                    initialY: touch.clientY - touchOffset.y
                }
                isPanningRef.current = false
            }
        },
        [isZoomed, showDots, touchOffset]
    )

    /**
     * Mobile/Tablet: Handles touch move
     * Allows native scrolling when zoomed on mobile/tablet
     */
    const handleTouchMove = useCallback(
        (e) => {
            if (!isZoomed || !showDots || !touchStartRef.current) return

            // Allow native scrolling when zoomed on mobile/tablet
            // The container's overflow: scroll will handle the scrolling
            if (isZoomed && showDots) {
                return // Let native scroll handle it
            }

            const touch = e.touches[0]
            const deltaX = Math.abs(touch.clientX - touchStartRef.current.x)
            const deltaY = Math.abs(touch.clientY - touchStartRef.current.y)

            // Start panning immediately on any movement
            if (
                !isPanningRef.current &&
                (deltaX > TOUCH_PAN_THRESHOLD || deltaY > TOUCH_PAN_THRESHOLD)
            ) {
                isPanningRef.current = true
            }

            if (isPanningRef.current) {
                // Prevent Swiper from handling when panning
                e.preventDefault()
                e.stopPropagation()

                const newX = touch.clientX - touchStartRef.current.initialX
                const newY = touch.clientY - touchStartRef.current.initialY

                // Calculate bounds to prevent panning beyond image edges
                if (imageContainerRef.current) {
                    const container = imageContainerRef.current
                    const rect = container.getBoundingClientRect()
                    const maxX = (rect.width * (ZOOM_SCALE - 1)) / 2
                    const maxY = (rect.height * (ZOOM_SCALE - 1)) / 2

                    setTouchOffset({
                        x: Math.max(-maxX, Math.min(maxX, newX)),
                        y: Math.max(-maxY, Math.min(maxY, newY))
                    })
                }
            }
        },
        [isZoomed, showDots]
    )

    /**
     * Mobile/Tablet: Handles touch end
     */
    const handleTouchEnd = useCallback(() => {
        if (!isZoomed || !showDots) return
        touchStartRef.current = null
        isPanningRef.current = false
    }, [isZoomed, showDots])

    // Memoized values
    const hasImages = useMemo(() => images && images.length > 0, [images])
    const swiperModules = useMemo(
        () => (showDots ? [Navigation, Pagination] : [Navigation, Thumbs]),
        [showDots]
    )
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
    const thumbsConfig = useMemo(
        () =>
            !showDots
                ? {
                      swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
                      slideThumbActiveClass: 'swiper-slide-thumb-active'
                  }
                : undefined,
        [showDots, thumbsSwiper]
    )

    // Handlers
    const handleSlideChange = useCallback((swiper) => {
        setActiveSlideIndex(swiper.activeIndex)
    }, [])

    const handleSwiperInit = useCallback((swiper) => {
        setActiveSlideIndex(swiper.activeIndex)
    }, [])

    const handleMouseDown = useCallback(
        (e) => {
            // Prevent text selection when zoomed
            if (isZoomed) {
                e.preventDefault()
            }
        },
        [isZoomed]
    )

    // Early return if no images
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
            {/* Thumbnails - Vertical on desktop only, hidden on tablet/mobile */}
            {!showDots && (
                <Box
                    w={BREAKPOINT_CONFIG.thumbnailWidth}
                    h={BREAKPOINT_CONFIG.thumbnailHeight}
                    flexShrink={0}
                    maxH={{base: 'none', lg: '500px'}}
                    overflow="hidden"
                >
                    <Swiper
                        onSwiper={setThumbsSwiper}
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

            {/* Main Image Carousel */}
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
                    overflow={isZoomed && showDots ? 'hidden' : 'visible'}
                >
                    <Swiper
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
                                    ref={index === 0 ? imageBoxRef : null}
                                    position="relative"
                                    width="100%"
                                    maxW="100%"
                                    height="100%"
                                    bg="gray.50"
                                    overflow={isZoomed && showDots ? 'scroll' : 'hidden'}
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
                                        touchAction: isZoomed && showDots ? 'pan-x pan-y' : 'auto',
                                        WebkitTouchCallout: 'none',
                                        WebkitUserSelect: 'none',
                                        WebkitOverflowScrolling: 'touch'
                                    }}
                                    userSelect="none"
                                    willChange={isZoomed ? 'transform' : 'auto'}
                                >
                                    {isZoomed && showDots ? (
                                        <Box
                                            position="absolute"
                                            top="0"
                                            left="0"
                                            width={`${ZOOM_SCALE_PERCENT}%`}
                                            height={`${ZOOM_SCALE_PERCENT}%`}
                                            minH={`${ZOOM_SCALE_PERCENT}%`}
                                        >
                                            <Image
                                                src={getImageUrl(image)}
                                                alt={`${alt} ${index + 1}`}
                                                position="absolute"
                                                top="0"
                                                left="0"
                                                width="100%"
                                                height="100%"
                                                objectFit="contain"
                                                loading={index === 0 ? 'eager' : 'lazy'}
                                                decoding="sync"
                                                pointerEvents="none"
                                                sx={{
                                                    backfaceVisibility: 'hidden',
                                                    WebkitBackfaceVisibility: 'hidden'
                                                }}
                                            />
                                        </Box>
                                    ) : (
                                        <Image
                                            src={getImageUrl(image)}
                                            alt={`${alt} ${index + 1}`}
                                            position="absolute"
                                            top="0"
                                            left="0"
                                            width="100%"
                                            height="100%"
                                            objectFit="contain"
                                            loading={index === 0 ? 'eager' : 'lazy'}
                                            decoding="sync"
                                            transform={
                                                isZoomed
                                                    ? `scale(${ZOOM_SCALE}) translateZ(0)`
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
                                                WebkitBackfaceVisibility: 'hidden'
                                            }}
                                        />
                                    )}
                                </Box>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </Box>

                {/* Pagination Dots - Show on tablet/mobile */}
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

                {/* Zoom Indicator Text */}
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
