/*
 * Copyright (c) 2023, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

import React, {memo, useMemo} from 'react'
import {
    Box,
    Text,
    Heading,
    Button,
    SimpleGrid,
    VStack,
    HStack,
    Divider,
    Badge,
    Flex
} from '@chakra-ui/react'
import {
    ChevronRightIcon,
    ChevronLeftIcon,
    SearchIcon,
    CartIcon,
    UserIcon,
    HeartIcon,
    HeartOutlineIcon,
    CheckIcon,
    CloseIcon,
    MenuIcon,
    PlusIcon,
    MinusIcon,
    TrashIcon,
    ArrowRightIcon,
    ArrowLeftIcon
} from '../../components/icons'

/**
 * Style Guide Page
 *
 * All styles shown here are OPT-IN and do NOT override existing site styles.
 * Use these by explicitly applying the style names to your components.
 *
 * - Text styles: textStyle="brandH1", textStyle="large"
 * - Layer styles: layerStyle="card", layerStyle="brandBadge"
 * - Button variants: variant="brandPrimary"
 * - Colors: color="brand.500", bg="secondary.100"
 */
// Static data - defined outside component to prevent recreation on each render
const COLOR_PALETTES = [
    {name: 'brand', label: 'Brand'},
    {name: 'secondary', label: 'Secondary'},
    {name: 'neutral', label: 'Neutral'},
    {name: 'success', label: 'Success'},
    {name: 'warning', label: 'Warning'},
    {name: 'error', label: 'Error'},
    {name: 'info', label: 'Info'}
]

const COLOR_SHADES = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900']
const DEFAULT_BUTTON_VARIANTS = ['solid', 'outline', 'ghost', 'link']
const CUSTOM_BUTTON_VARIANTS = [
    'brandPrimary',
    'brandSecondary',
    'brandOutline',
    'brandGhost',
    'brandLink',
    'brandDanger',
    'brandNeutral',
    'brandSuccess',
    'brandWarning'
]
const DEFAULT_BUTTON_SIZES = ['xs', 'sm', 'md', 'lg']
const CUSTOM_BUTTON_SIZES = ['xs2', 'xl', 'xl2']
const TEXT_STYLES = [
    {name: 'extraSmall', label: 'Extra Small'},
    {name: 'small', label: 'Small'},
    {name: 'medium', label: 'Medium'},
    {name: 'base', label: 'Base'},
    {name: 'large', label: 'Large'},
    {name: 'extraLarge', label: 'Extra Large'}
]
const DISPLAY_STYLES = [
    {name: 'displaySmall', label: 'Display Small'},
    {name: 'displayMedium', label: 'Display Medium'},
    {name: 'displayLarge', label: 'Display Large'},
    {name: 'displayExtraLarge', label: 'Display XL'}
]
const LABEL_STYLES = [
    {name: 'labelSmall', label: 'Label Small'},
    {name: 'labelMedium', label: 'Label Medium'},
    {name: 'labelLarge', label: 'Label Large'}
]
const SPACING_VALUES = [1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20]
const ICON_SIZES = [4, 5, 6, 8, 10, 12]
const FONT_WEIGHTS = ['normal', 'medium', 'semiBold', 'bold']

const StyleGuide = memo(() => {
    // Icons list - memoized since it contains component references
    const icons = useMemo(
        () => [
            {Icon: ChevronRightIcon, name: 'ChevronRightIcon'},
            {Icon: ChevronLeftIcon, name: 'ChevronLeftIcon'},
            {Icon: SearchIcon, name: 'SearchIcon'},
            {Icon: CartIcon, name: 'CartIcon'},
            {Icon: UserIcon, name: 'UserIcon'},
            {Icon: HeartIcon, name: 'HeartIcon'},
            {Icon: HeartOutlineIcon, name: 'HeartOutlineIcon'},
            {Icon: CheckIcon, name: 'CheckIcon'},
            {Icon: CloseIcon, name: 'CloseIcon'},
            {Icon: MenuIcon, name: 'MenuIcon'},
            {Icon: PlusIcon, name: 'PlusIcon'},
            {Icon: MinusIcon, name: 'MinusIcon'},
            {Icon: TrashIcon, name: 'TrashIcon'},
            {Icon: ArrowRightIcon, name: 'ArrowRightIcon'},
            {Icon: ArrowLeftIcon, name: 'ArrowLeftIcon'}
        ],
        []
    )

    return (
        <Box layerStyle="page" py={8}>
            {/* Header */}
            <VStack spacing={2} mb={8} textAlign="center">
                <Heading textStyle="displayLarge">Style Guide</Heading>
                <Text textStyle="large" color="gray.600">
                    Opt-in design tokens and components for your brand
                </Text>
            </VStack>

            {/* Opt-In Notice */}
            <Box layerStyle="banner" mb={12}>
                <HStack spacing={3}>
                    <Box w="8px" h="8px" bg="brand.500" borderRadius="full" />
                    <Box>
                        <Text fontWeight="bold" mb={1}>
                            All Styles Are Opt-In
                        </Text>
                        <Text textStyle="small" color="gray.700">
                            These styles do NOT override existing site defaults. Apply them
                            explicitly using <code>textStyle</code>, <code>layerStyle</code>, or{' '}
                            <code>variant</code> props. Existing Chakra components and site styles
                            remain unchanged.
                        </Text>
                    </Box>
                </HStack>
            </Box>

            {/* Table of Contents */}
            <Box layerStyle="cardOutline" mb={12}>
                <Heading size="md" mb={4}>
                    Quick Navigation
                </Heading>
                <SimpleGrid columns={{base: 2, md: 4}} spacing={2}>
                    <Button
                        as="a"
                        href="#colors"
                        variant="ghost"
                        justifyContent="flex-start"
                        size="sm"
                    >
                        🎨 Colors
                    </Button>
                    <Button
                        as="a"
                        href="#typography"
                        variant="ghost"
                        justifyContent="flex-start"
                        size="sm"
                    >
                        📝 Typography
                    </Button>
                    <Button
                        as="a"
                        href="#buttons"
                        variant="ghost"
                        justifyContent="flex-start"
                        size="sm"
                    >
                        🔘 Buttons
                    </Button>
                    <Button
                        as="a"
                        href="#icons"
                        variant="ghost"
                        justifyContent="flex-start"
                        size="sm"
                    >
                        🎯 Icons
                    </Button>
                    <Button
                        as="a"
                        href="#layouts"
                        variant="ghost"
                        justifyContent="flex-start"
                        size="sm"
                    >
                        📐 Page Layouts
                    </Button>
                    <Button
                        as="a"
                        href="#cards"
                        variant="ghost"
                        justifyContent="flex-start"
                        size="sm"
                    >
                        🃏 Cards
                    </Button>
                    <Button
                        as="a"
                        href="#badges"
                        variant="ghost"
                        justifyContent="flex-start"
                        size="sm"
                    >
                        🏷️ Badges & Lists
                    </Button>
                    <Button
                        as="a"
                        href="#spacing"
                        variant="ghost"
                        justifyContent="flex-start"
                        size="sm"
                    >
                        📏 Spacing
                    </Button>
                </SimpleGrid>
            </Box>

            {/* ============================================ */}
            {/* COLORS SECTION */}
            {/* ============================================ */}
            <Box id="colors" mb={16}>
                <Heading textStyle="displayMedium" mb={6}>
                    Colors
                </Heading>
                <Text textStyle="base" color="gray.600" mb={8}>
                    Usage: <code>color="brand.500"</code> or <code>bg="neutral.100"</code>
                </Text>

                {COLOR_PALETTES.map((palette) => (
                    <Box key={palette.name} mb={8}>
                        <Text textStyle="labelLarge" mb={3}>
                            {palette.label}
                        </Text>
                        <Flex flexWrap="wrap" gap={2}>
                            {COLOR_SHADES.map((shade) => (
                                <VStack key={shade} spacing={1}>
                                    <Box
                                        w="60px"
                                        h="60px"
                                        bg={`${palette.name}.${shade}`}
                                        borderRadius="md"
                                        border="1px solid"
                                        borderColor="gray.200"
                                    />
                                    <Text textStyle="extraSmall">{shade}</Text>
                                </VStack>
                            ))}
                        </Flex>
                    </Box>
                ))}

                {/* Semantic Colors */}
                <Box mt={8}>
                    <Text textStyle="labelLarge" mb={3}>
                        Semantic Colors
                    </Text>
                    <SimpleGrid columns={{base: 2, md: 4}} spacing={4}>
                        <VStack layerStyle="cardOutline" p={4}>
                            <Box
                                w="100%"
                                h="40px"
                                bg="white"
                                border="1px solid"
                                borderColor="gray.200"
                                borderRadius="md"
                            />
                            <Text textStyle="small">background.primary</Text>
                        </VStack>
                        <VStack layerStyle="cardOutline" p={4}>
                            <Box w="100%" h="40px" bg="gray.50" borderRadius="md" />
                            <Text textStyle="small">background.secondary</Text>
                        </VStack>
                        <VStack layerStyle="cardOutline" p={4}>
                            <Box w="100%" h="40px" bg="gray.900" borderRadius="md" />
                            <Text textStyle="small">text.primary</Text>
                        </VStack>
                        <VStack layerStyle="cardOutline" p={4}>
                            <Box w="100%" h="40px" bg="gray.600" borderRadius="md" />
                            <Text textStyle="small">text.secondary</Text>
                        </VStack>
                    </SimpleGrid>
                </Box>
            </Box>

            <Divider my={12} />

            {/* ============================================ */}
            {/* TYPOGRAPHY SECTION */}
            {/* ============================================ */}
            <Box id="typography" mb={16}>
                <Heading textStyle="displayMedium" mb={6}>
                    Typography{' '}
                    <Badge colorScheme="blue" ml={2}>
                        Opt-In
                    </Badge>
                </Heading>
                <Text textStyle="base" color="gray.600" mb={4}>
                    All text styles are opt-in. Default text styling remains unchanged.
                </Text>
                <Text textStyle="small" color="gray.500" mb={8}>
                    Usage: <code>{`<Text textStyle="large">Large text</Text>`}</code> or{' '}
                    <code>{`<Heading textStyle="brandH1">Heading</Heading>`}</code>
                </Text>

                {/* Body Text Styles */}
                <Box mb={10}>
                    <Text textStyle="labelLarge" mb={4}>
                        Body Text Styles
                    </Text>
                    <VStack align="stretch" spacing={4} layerStyle="cardOutline">
                        {TEXT_STYLES.map(({name, label}) => (
                            <HStack
                                key={name}
                                justify="space-between"
                                py={2}
                                borderBottom="1px"
                                borderColor="gray.200"
                            >
                                <Text textStyle={name}>
                                    The quick brown fox jumps over the lazy dog
                                </Text>
                                <Badge colorScheme="gray">{name}</Badge>
                            </HStack>
                        ))}
                    </VStack>
                </Box>

                {/* Display Styles */}
                <Box mb={10}>
                    <Text textStyle="labelLarge" mb={4}>
                        Display Styles
                    </Text>
                    <VStack align="stretch" spacing={4} layerStyle="cardOutline">
                        {DISPLAY_STYLES.map(({name, label}) => (
                            <HStack
                                key={name}
                                justify="space-between"
                                py={2}
                                borderBottom="1px"
                                borderColor="gray.200"
                            >
                                <Text textStyle={name}>{label}</Text>
                                <Badge colorScheme="gray">{name}</Badge>
                            </HStack>
                        ))}
                    </VStack>
                </Box>

                {/* Brand Heading Styles */}
                <Box mb={10}>
                    <Text textStyle="labelLarge" mb={4}>
                        Brand Heading Styles (Opt-In)
                    </Text>
                    <Text textStyle="small" color="gray.600" mb={4}>
                        Usage: <code>{`<Heading textStyle="brandH1">Heading</Heading>`}</code>
                    </Text>
                    <VStack align="stretch" spacing={4} layerStyle="cardOutline">
                        <HStack
                            justify="space-between"
                            py={2}
                            borderBottom="1px"
                            borderColor="gray.200"
                        >
                            <Text textStyle="brandH1">Brand H1 Heading</Text>
                            <Badge colorScheme="blue">brandH1</Badge>
                        </HStack>
                        <HStack
                            justify="space-between"
                            py={2}
                            borderBottom="1px"
                            borderColor="gray.200"
                        >
                            <Text textStyle="brandH2">Brand H2 Heading</Text>
                            <Badge colorScheme="blue">brandH2</Badge>
                        </HStack>
                        <HStack
                            justify="space-between"
                            py={2}
                            borderBottom="1px"
                            borderColor="gray.200"
                        >
                            <Text textStyle="brandH3">Brand H3 Heading</Text>
                            <Badge colorScheme="blue">brandH3</Badge>
                        </HStack>
                        <HStack
                            justify="space-between"
                            py={2}
                            borderBottom="1px"
                            borderColor="gray.200"
                        >
                            <Text textStyle="brandH4">Brand H4 Heading</Text>
                            <Badge colorScheme="blue">brandH4</Badge>
                        </HStack>
                        <HStack
                            justify="space-between"
                            py={2}
                            borderBottom="1px"
                            borderColor="gray.200"
                        >
                            <Text textStyle="brandH5">Brand H5 Heading</Text>
                            <Badge colorScheme="blue">brandH5</Badge>
                        </HStack>
                        <HStack
                            justify="space-between"
                            py={2}
                            borderBottom="1px"
                            borderColor="gray.200"
                        >
                            <Text textStyle="brandH6">Brand H6 Heading</Text>
                            <Badge colorScheme="blue">brandH6</Badge>
                        </HStack>
                    </VStack>
                </Box>

                {/* Brand Link & Caption Styles */}
                <Box mb={10}>
                    <Text textStyle="labelLarge" mb={4}>
                        Brand Links & Captions (Opt-In)
                    </Text>
                    <SimpleGrid columns={{base: 1, md: 2}} spacing={4}>
                        <Box layerStyle="cardOutline" p={4}>
                            <Text textStyle="brandLink" as="span" cursor="pointer">
                                Brand Link (hover me)
                            </Text>
                            <Badge ml={2} colorScheme="blue">
                                brandLink
                            </Badge>
                        </Box>
                        <Box layerStyle="cardOutline" p={4}>
                            <Text textStyle="brandLinkUnderline" as="span" cursor="pointer">
                                Brand Link Underline
                            </Text>
                            <Badge ml={2} colorScheme="blue">
                                brandLinkUnderline
                            </Badge>
                        </Box>
                        <Box layerStyle="cardOutline" p={4}>
                            <Text textStyle="caption">Caption text for help</Text>
                            <Badge ml={2} colorScheme="gray">
                                caption
                            </Badge>
                        </Box>
                        <Box layerStyle="cardOutline" p={4}>
                            <Text textStyle="captionError">Error caption text</Text>
                            <Badge ml={2} colorScheme="red">
                                captionError
                            </Badge>
                        </Box>
                    </SimpleGrid>
                </Box>

                {/* Price Styles */}
                <Box mb={10}>
                    <Text textStyle="labelLarge" mb={4}>
                        Price Styles (Opt-In)
                    </Text>
                    <HStack spacing={6} layerStyle="cardOutline" p={6}>
                        <VStack>
                            <Text textStyle="priceRegular">$99.00</Text>
                            <Badge colorScheme="gray">priceRegular</Badge>
                        </VStack>
                        <VStack>
                            <Text textStyle="priceSale">$79.00</Text>
                            <Badge colorScheme="red">priceSale</Badge>
                        </VStack>
                        <VStack>
                            <Text textStyle="priceStrikethrough">$99.00</Text>
                            <Badge colorScheme="gray">priceStrikethrough</Badge>
                        </VStack>
                        <VStack>
                            <Text textStyle="priceLarge">$199.00</Text>
                            <Badge colorScheme="gray">priceLarge</Badge>
                        </VStack>
                    </HStack>
                </Box>

                {/* Label Styles */}
                <Box mb={10}>
                    <Text textStyle="labelLarge" mb={4}>
                        Label Styles
                    </Text>
                    <VStack align="stretch" spacing={4} layerStyle="cardOutline">
                        {LABEL_STYLES.map(({name, label}) => (
                            <HStack
                                key={name}
                                justify="space-between"
                                py={2}
                                borderBottom="1px"
                                borderColor="gray.200"
                            >
                                <Text textStyle={name}>{label} Label Text</Text>
                                <Badge colorScheme="gray">{name}</Badge>
                            </HStack>
                        ))}
                    </VStack>
                </Box>

                {/* Font Weights */}
                <Box>
                    <Text textStyle="labelLarge" mb={4}>
                        Font Weights
                    </Text>
                    <SimpleGrid columns={{base: 2, md: 4}} spacing={4}>
                        {FONT_WEIGHTS.map((weight) => (
                            <Box key={weight} layerStyle="cardOutline" p={4} textAlign="center">
                                <Text fontWeight={weight} fontSize="lg">
                                    Aa Bb Cc
                                </Text>
                                <Text textStyle="small" color="gray.600" mt={2}>
                                    {weight}
                                </Text>
                            </Box>
                        ))}
                    </SimpleGrid>
                </Box>
            </Box>

            <Divider my={12} />

            {/* ============================================ */}
            {/* BUTTONS SECTION */}
            {/* ============================================ */}
            <Box id="buttons" mb={16}>
                <Heading textStyle="displayMedium" mb={6}>
                    Buttons{' '}
                    <Badge colorScheme="blue" ml={2}>
                        Opt-In
                    </Badge>
                </Heading>
                <Text textStyle="base" color="gray.600" mb={4}>
                    Default Chakra button variants remain unchanged.
                </Text>
                <Text textStyle="small" color="gray.500" mb={8}>
                    Use custom <code>brand*</code> variants for your design system buttons.
                </Text>

                {/* Default Chakra Button Variants */}
                <Box mb={10}>
                    <Text textStyle="labelLarge" mb={4}>
                        Default Chakra Variants (Unchanged)
                    </Text>
                    <Text textStyle="small" color="gray.600" mb={4}>
                        Usage: <code>{`<Button variant="solid">Button</Button>`}</code>
                    </Text>
                    <SimpleGrid columns={{base: 2, md: 4}} spacing={4}>
                        {DEFAULT_BUTTON_VARIANTS.map((variant) => (
                            <VStack key={variant} layerStyle="cardOutline" p={4}>
                                <Button variant={variant} colorScheme="blue">
                                    Button
                                </Button>
                                <Text textStyle="small" color="gray.600">
                                    {variant}
                                </Text>
                            </VStack>
                        ))}
                    </SimpleGrid>
                </Box>

                {/* Custom Brand Button Variants */}
                <Box mb={10}>
                    <Text textStyle="labelLarge" mb={4}>
                        Custom Brand Variants (New)
                    </Text>
                    <Text textStyle="small" color="gray.600" mb={4}>
                        Usage: <code>{`<Button variant="brandPrimary">Button</Button>`}</code>
                    </Text>
                    <SimpleGrid columns={{base: 2, md: 3, lg: 5}} spacing={4}>
                        {CUSTOM_BUTTON_VARIANTS.map((variant) => (
                            <VStack key={variant} layerStyle="cardOutline" p={4}>
                                <Button variant={variant}>Button</Button>
                                <Text textStyle="extraSmall" color="gray.600" textAlign="center">
                                    {variant}
                                </Text>
                            </VStack>
                        ))}
                    </SimpleGrid>
                </Box>

                {/* Default Button Sizes */}
                <Box mb={10}>
                    <Text textStyle="labelLarge" mb={4}>
                        Default Sizes
                    </Text>
                    <HStack
                        spacing={4}
                        flexWrap="wrap"
                        layerStyle="cardOutline"
                        p={6}
                        justify="center"
                    >
                        {DEFAULT_BUTTON_SIZES.map((size) => (
                            <VStack key={size}>
                                <Button size={size} variant="brandPrimary">
                                    Button
                                </Button>
                                <Text textStyle="small" color="gray.600">
                                    {size}
                                </Text>
                            </VStack>
                        ))}
                    </HStack>
                </Box>

                {/* Custom Button Sizes */}
                <Box mb={10}>
                    <Text textStyle="labelLarge" mb={4}>
                        Custom Sizes (New)
                    </Text>
                    <HStack
                        spacing={4}
                        flexWrap="wrap"
                        layerStyle="cardOutline"
                        p={6}
                        justify="center"
                    >
                        {CUSTOM_BUTTON_SIZES.map((size) => (
                            <VStack key={size}>
                                <Button size={size} variant="brandPrimary">
                                    Button
                                </Button>
                                <Text textStyle="small" color="gray.600">
                                    {size}
                                </Text>
                            </VStack>
                        ))}
                    </HStack>
                </Box>

                {/* Button States */}
                <Box>
                    <Text textStyle="labelLarge" mb={4}>
                        Button States
                    </Text>
                    <HStack spacing={4} flexWrap="wrap" layerStyle="cardOutline" p={6}>
                        <VStack>
                            <Button variant="brandPrimary">Default</Button>
                            <Text textStyle="small">Normal</Text>
                        </VStack>
                        <VStack>
                            <Button variant="brandPrimary" isDisabled>
                                Disabled
                            </Button>
                            <Text textStyle="small">Disabled</Text>
                        </VStack>
                        <VStack>
                            <Button variant="brandPrimary" isLoading>
                                Loading
                            </Button>
                            <Text textStyle="small">Loading</Text>
                        </VStack>
                        <VStack>
                            <Button variant="brandPrimary" leftIcon={<CartIcon />}>
                                With Icon
                            </Button>
                            <Text textStyle="small">With Icon</Text>
                        </VStack>
                    </HStack>
                </Box>
            </Box>

            <Divider my={12} />

            {/* ============================================ */}
            {/* ICONS SECTION */}
            {/* ============================================ */}
            <Box id="icons" mb={16}>
                <Heading textStyle="displayMedium" mb={6}>
                    Icons
                </Heading>
                <Text textStyle="base" color="gray.600" mb={8}>
                    Usage: <code>{`import {CartIcon} from '../../components/icons'`}</code>
                    <br />
                    <code>{`<CartIcon boxSize={6} color="brand.500" />`}</code>
                </Text>

                <SimpleGrid columns={{base: 3, sm: 4, md: 6, lg: 8}} spacing={4}>
                    {icons.map(({Icon, name}) => (
                        <VStack
                            key={name}
                            layerStyle="cardOutline"
                            p={4}
                            _hover={{bg: 'background.secondary'}}
                            cursor="pointer"
                        >
                            <Icon boxSize={6} />
                            <Text textStyle="extraSmall" color="gray.600" textAlign="center">
                                {name.replace('Icon', '')}
                            </Text>
                        </VStack>
                    ))}
                </SimpleGrid>

                {/* Icon Sizes */}
                <Box mt={8}>
                    <Text textStyle="labelLarge" mb={4}>
                        Icon Sizes
                    </Text>
                    <HStack spacing={6} layerStyle="cardOutline" p={6} justify="center">
                        {ICON_SIZES.map((size) => (
                            <VStack key={size}>
                                <CartIcon boxSize={size} />
                                <Text textStyle="small">boxSize={size}</Text>
                            </VStack>
                        ))}
                    </HStack>
                </Box>
            </Box>

            <Divider my={12} />

            {/* ============================================ */}
            {/* PAGE LAYOUTS SECTION */}
            {/* ============================================ */}
            <Box id="layouts" mb={16}>
                <Heading textStyle="displayMedium" mb={6}>
                    Page Layouts{' '}
                    <Badge colorScheme="blue" ml={2}>
                        Opt-In
                    </Badge>
                </Heading>
                <Text textStyle="base" color="gray.600" mb={4}>
                    Reusable layout patterns. Apply via <code>layerStyle</code> prop.
                </Text>
                <Text textStyle="small" color="gray.500" mb={8}>
                    Usage: <code>{`<Box layerStyle="page">Content</Box>`}</code>
                </Text>

                <VStack spacing={6} align="stretch">
                    {/* Page widths */}
                    <Box layerStyle="cardOutline">
                        <Text textStyle="labelMedium" mb={4}>
                            Page Container Widths
                        </Text>
                        <VStack spacing={4} align="stretch">
                            <Box bg="brand.100" p={4} borderRadius="md">
                                <Text textStyle="small" fontWeight="bold">
                                    layerStyle="pageNarrow"
                                </Text>
                                <Text textStyle="extraSmall">
                                    max-width: 768px (articles, forms)
                                </Text>
                            </Box>
                            <Box bg="brand.200" p={4} borderRadius="md">
                                <Text textStyle="small" fontWeight="bold">
                                    layerStyle="page"
                                </Text>
                                <Text textStyle="extraSmall">max-width: 1440px (default)</Text>
                            </Box>
                            <Box bg="brand.300" p={4} borderRadius="md">
                                <Text textStyle="small" fontWeight="bold">
                                    layerStyle="pageWide"
                                </Text>
                                <Text textStyle="extraSmall">max-width: 1920px (wide content)</Text>
                            </Box>
                            <Box bg="brand.400" p={4} borderRadius="md">
                                <Text textStyle="small" fontWeight="bold">
                                    layerStyle="pageFullBleed"
                                </Text>
                                <Text textStyle="extraSmall">width: 100% (edge to edge)</Text>
                            </Box>
                        </VStack>
                    </Box>

                    {/* Grid Layouts */}
                    <Box layerStyle="cardOutline">
                        <Text textStyle="labelMedium" mb={4}>
                            Grid Layouts
                        </Text>

                        <Text textStyle="small" fontWeight="bold" mb={2}>
                            contentTwoCol
                        </Text>
                        <Box layerStyle="contentTwoCol" mb={6}>
                            <Box bg="secondary.100" p={4} borderRadius="md" textAlign="center">
                                Column 1
                            </Box>
                            <Box bg="secondary.100" p={4} borderRadius="md" textAlign="center">
                                Column 2
                            </Box>
                        </Box>

                        <Text textStyle="small" fontWeight="bold" mb={2}>
                            contentThreeCol
                        </Text>
                        <Box layerStyle="contentThreeCol" mb={6}>
                            <Box bg="success.100" p={4} borderRadius="md" textAlign="center">
                                Col 1
                            </Box>
                            <Box bg="success.100" p={4} borderRadius="md" textAlign="center">
                                Col 2
                            </Box>
                            <Box bg="success.100" p={4} borderRadius="md" textAlign="center">
                                Col 3
                            </Box>
                        </Box>

                        <Text textStyle="small" fontWeight="bold" mb={2}>
                            contentFourCol
                        </Text>
                        <Box layerStyle="contentFourCol">
                            <Box bg="warning.100" p={4} borderRadius="md" textAlign="center">
                                1
                            </Box>
                            <Box bg="warning.100" p={4} borderRadius="md" textAlign="center">
                                2
                            </Box>
                            <Box bg="warning.100" p={4} borderRadius="md" textAlign="center">
                                3
                            </Box>
                            <Box bg="warning.100" p={4} borderRadius="md" textAlign="center">
                                4
                            </Box>
                        </Box>
                    </Box>

                    {/* Section Styles */}
                    <Box layerStyle="cardOutline">
                        <Text textStyle="labelMedium" mb={4}>
                            Section Styles
                        </Text>
                        <VStack spacing={4} align="stretch">
                            <Box layerStyle="section" bg="neutral.50" borderRadius="md">
                                <Text textAlign="center">layerStyle="section"</Text>
                            </Box>
                            <Box layerStyle="sectionAlt" borderRadius="md">
                                <Text textAlign="center">layerStyle="sectionAlt"</Text>
                            </Box>
                        </VStack>
                    </Box>
                </VStack>
            </Box>

            <Divider my={12} />

            {/* ============================================ */}
            {/* CARDS SECTION */}
            {/* ============================================ */}
            <Box id="cards" mb={16}>
                <Heading textStyle="displayMedium" mb={6}>
                    Cards{' '}
                    <Badge colorScheme="blue" ml={2}>
                        Opt-In
                    </Badge>
                </Heading>
                <Text textStyle="base" color="gray.600" mb={4}>
                    Pre-styled card patterns. Apply via <code>layerStyle</code> prop.
                </Text>
                <Text textStyle="small" color="gray.500" mb={8}>
                    Usage: <code>{`<Box layerStyle="card">Card content</Box>`}</code>
                </Text>

                <SimpleGrid columns={{base: 1, md: 2, lg: 4}} spacing={6}>
                    <Box layerStyle="card">
                        <Text fontWeight="bold" mb={2}>
                            card
                        </Text>
                        <Text textStyle="small" color="gray.600">
                            Basic card with shadow
                        </Text>
                    </Box>
                    <Box layerStyle="cardHover">
                        <Text fontWeight="bold" mb={2}>
                            cardHover
                        </Text>
                        <Text textStyle="small" color="gray.600">
                            Hover to see effect
                        </Text>
                    </Box>
                    <Box layerStyle="cardOutline">
                        <Text fontWeight="bold" mb={2}>
                            cardOutline
                        </Text>
                        <Text textStyle="small" color="gray.600">
                            Bordered card
                        </Text>
                    </Box>
                    <Box layerStyle="cardFlat">
                        <Text fontWeight="bold" mb={2}>
                            cardFlat
                        </Text>
                        <Text textStyle="small" color="gray.600">
                            No shadow, colored bg
                        </Text>
                    </Box>
                </SimpleGrid>

                {/* Special Cards */}
                <SimpleGrid columns={{base: 1, md: 2}} spacing={6} mt={6}>
                    <Box layerStyle="glass" bg="brand.500" position="relative" overflow="hidden">
                        <Text fontWeight="bold" color="white" mb={2}>
                            glass
                        </Text>
                        <Text textStyle="small" color="whiteAlpha.800">
                            Glassmorphism effect
                        </Text>
                    </Box>
                    <Box layerStyle="gradientPrimary">
                        <Text fontWeight="bold" mb={2}>
                            gradientPrimary
                        </Text>
                        <Text textStyle="small" opacity={0.9}>
                            Gradient background
                        </Text>
                    </Box>
                    <Box layerStyle="banner">
                        <Text fontWeight="bold" mb={2}>
                            banner
                        </Text>
                        <Text textStyle="small" color="gray.600">
                            Alert or announcement banner
                        </Text>
                    </Box>
                    <Box layerStyle="feature">
                        <Text fontWeight="bold" mb={2}>
                            feature
                        </Text>
                        <Text textStyle="small" color="gray.600">
                            Feature highlight card
                        </Text>
                    </Box>
                </SimpleGrid>
            </Box>

            <Divider my={12} />

            {/* ============================================ */}
            {/* BADGES & INTERACTIVE STYLES SECTION */}
            {/* ============================================ */}
            <Box id="badges" mb={16}>
                <Heading textStyle="displayMedium" mb={6}>
                    Badges & Interactive Styles
                </Heading>
                <Text textStyle="base" color="gray.600" mb={8}>
                    Opt-in layer styles for badges, list items, and form elements.
                </Text>

                {/* Brand Badges */}
                <Box mb={10}>
                    <Text textStyle="labelLarge" mb={4}>
                        Brand Badges (Opt-In)
                    </Text>
                    <Text textStyle="small" color="gray.600" mb={4}>
                        Usage: <code>{`<Box layerStyle="brandBadge">New</Box>`}</code>
                    </Text>
                    <HStack spacing={4} layerStyle="cardOutline" p={6}>
                        <VStack>
                            <Box layerStyle="brandBadge">Brand Badge</Box>
                            <Text textStyle="extraSmall">brandBadge</Text>
                        </VStack>
                        <VStack>
                            <Box layerStyle="brandBadgeSuccess">Success</Box>
                            <Text textStyle="extraSmall">brandBadgeSuccess</Text>
                        </VStack>
                        <VStack>
                            <Box layerStyle="brandBadgeWarning">Warning</Box>
                            <Text textStyle="extraSmall">brandBadgeWarning</Text>
                        </VStack>
                        <VStack>
                            <Box layerStyle="brandBadgeError">Error</Box>
                            <Text textStyle="extraSmall">brandBadgeError</Text>
                        </VStack>
                    </HStack>
                </Box>

                {/* List Items */}
                <Box mb={10}>
                    <Text textStyle="labelLarge" mb={4}>
                        List Item Styles (Opt-In)
                    </Text>
                    <Box layerStyle="cardOutline" overflow="hidden">
                        <Box layerStyle="brandListItem" borderBottom="1px" borderColor="gray.200">
                            Regular list item (hover me)
                        </Box>
                        <Box
                            layerStyle="brandListItemSelected"
                            borderBottom="1px"
                            borderColor="gray.200"
                        >
                            Selected list item
                        </Box>
                        <Box layerStyle="brandListItem">Another list item</Box>
                    </Box>
                </Box>

                {/* Input Style */}
                <Box mb={10}>
                    <Text textStyle="labelLarge" mb={4}>
                        Input Style (Opt-In)
                    </Text>
                    <Text textStyle="small" color="gray.600" mb={4}>
                        Usage: <code>{`<Input sx={layerStyles.brandInput} />`}</code> or apply via
                        custom Input component
                    </Text>
                    <Box layerStyle="cardOutline" p={6}>
                        <Text textStyle="small" mb={2}>
                            brandInput provides: hover, focus, and invalid states
                        </Text>
                        <Text textStyle="extraSmall" color="gray.500">
                            border → gray.300 | hover → gray.400 | focus → brand.500 ring | invalid
                            → error.500 ring
                        </Text>
                    </Box>
                </Box>
            </Box>

            <Divider my={12} />

            {/* ============================================ */}
            {/* SPACING SECTION */}
            {/* ============================================ */}
            <Box id="spacing" mb={16}>
                <Heading textStyle="displayMedium" mb={6}>
                    Spacing
                </Heading>
                <Text textStyle="base" color="gray.600" mb={8}>
                    Usage: <code>p={4}</code> (16px), <code>m={6}</code> (24px)
                </Text>

                <Box layerStyle="cardOutline">
                    <HStack spacing={4} flexWrap="wrap">
                        {SPACING_VALUES.map((space) => (
                            <VStack key={space}>
                                <Box w={space} h={space} bg="brand.500" borderRadius="sm" />
                                <Text textStyle="extraSmall">{space}</Text>
                                <Text textStyle="extraSmall" color="gray.400">
                                    {space * 4}px
                                </Text>
                            </VStack>
                        ))}
                    </HStack>
                </Box>
            </Box>

            {/* Footer */}
            <Box textAlign="center" py={8}>
                <Text textStyle="small" color="gray.600">
                    Style Guide • Update colors, fonts, and components in{' '}
                    <code>overrides/app/theme/</code>
                </Text>
            </Box>
        </Box>
    )
})

StyleGuide.displayName = 'StyleGuide'

export default StyleGuide
