/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

import React, {useState, useEffect, useMemo} from 'react'
import PropTypes from 'prop-types'
import {useHistory, useLocation} from 'react-router-dom'
import {StorefrontPreview} from '@salesforce/commerce-sdk-react/components'
import {getAssetUrl} from '@salesforce/pwa-kit-react-sdk/ssr/universal/utils'
import useActiveData from '@salesforce/retail-react-app/app/hooks/use-active-data'
import {useQuery} from '@tanstack/react-query'
import {
    useAccessToken,
    useCategory,
    useShopperBasketsMutation
} from '@salesforce/commerce-sdk-react'
import logger from '@salesforce/retail-react-app/app/utils/logger-instance'
import {useAppOrigin} from '@salesforce/retail-react-app/app/hooks/use-app-origin'
import {getConfig} from '@salesforce/pwa-kit-runtime/utils/ssr-config'

// Chakra
import {
    Box,
    Center,
    Fade,
    Spinner,
    useDisclosure,
    useStyleConfig
} from '@salesforce/retail-react-app/app/components/shared/ui'
import {SkipNavLink, SkipNavContent} from '@chakra-ui/skip-nav'

// Contexts
import {CurrencyProvider} from '@salesforce/retail-react-app/app/contexts'

// Local Project Components
// Import from overridden Header (for c_marketingConsent support)
import Header from '../header'
import OfflineBanner from '@salesforce/retail-react-app/app/components/offline-banner'
import OfflineBoundary from '@salesforce/retail-react-app/app/components/offline-boundary'
import ScrollToTop from '@salesforce/retail-react-app/app/components/scroll-to-top'
// Use the custom Footer with NewsletterForm
import Footer from '../footer'
import CheckoutHeader from '@salesforce/retail-react-app/app/pages/checkout/partials/checkout-header'
import CheckoutFooter from '@salesforce/retail-react-app/app/pages/checkout/partials/checkout-footer'
import {DrawerMenu} from '@salesforce/retail-react-app/app/components/drawer-menu'
import {ListMenu, ListMenuContent} from '@salesforce/retail-react-app/app/components/list-menu'
import {HideOnDesktop, HideOnMobile} from '@salesforce/retail-react-app/app/components/responsive'
import AboveHeader from '@salesforce/retail-react-app/app/components/_app/partials/above-header'
import {StoreLocatorModal} from '@salesforce/retail-react-app/app/components/store-locator'
import Island from '@salesforce/retail-react-app/app/components/island'

// Hooks
// Import from overridden use-auth-modal hook (for c_marketingConsent support)
import {AuthModal, useAuthModal} from '../../hooks/use-auth-modal'
import {useStoreLocatorModal} from '@salesforce/retail-react-app/app/hooks/use-store-locator'
import {
    DntNotification,
    useDntNotification
} from '@salesforce/retail-react-app/app/hooks/use-dnt-notification'
import {AddToCartModalProvider} from '@salesforce/retail-react-app/app/hooks/use-add-to-cart-modal'
import {BonusProductSelectionModalProvider} from '@salesforce/retail-react-app/app/hooks/use-bonus-product-selection-modal'
import useMultiSite from '@salesforce/retail-react-app/app/hooks/use-multi-site'
import {useCurrentCustomer} from '@salesforce/retail-react-app/app/hooks/use-current-customer'
import {useCurrentBasket} from '@salesforce/retail-react-app/app/hooks/use-current-basket'
import {useUpdateShopperContext} from '@salesforce/retail-react-app/app/hooks/use-update-shopper-context'

// HOCs
import {withCommerceSdkReact} from '@salesforce/retail-react-app/app/components/with-commerce-sdk-react/with-commerce-sdk-react'

// Localization
import {IntlProvider} from 'react-intl'

// Others
import {watchOnlineStatus, flatten, isServer} from '@salesforce/retail-react-app/app/utils/utils'
import {getTargetLocale, fetchTranslations} from '@salesforce/retail-react-app/app/utils/locale'
import {
    DEFAULT_SITE_TITLE,
    HOME_HREF,
    THEME_COLOR,
    CAT_MENU_DEFAULT_NAV_SSR_DEPTH,
    CAT_MENU_DEFAULT_ROOT_CATEGORY,
    DEFAULT_LOCALE,
    STORE_LOCATOR_IS_ENABLED
} from '@salesforce/retail-react-app/app/constants'

import Seo from '@salesforce/retail-react-app/app/components/seo'
import ShopperAgent from '@salesforce/retail-react-app/app/components/shopper-agent'
import {getPathWithLocale} from '@salesforce/retail-react-app/app/utils/url'
import {getCommerceAgentConfig} from '@salesforce/retail-react-app/app/utils/config-utils'

const PlaceholderComponent = () => (
    <Center p="2">
        <Spinner size="lg" />
    </Center>
)

const DrawerMenuItemWithData = withCommerceSdkReact(
    ({itemComponent: ItemComponent, data, ...rest}) => (
        <Fade in={true}>
            <ItemComponent {...rest} item={data} itemComponent={DrawerMenuItemWithData} />
        </Fade>
    ),
    {
        hook: useCategory,
        queryOptions: ({item}) => ({
            parameters: {
                id: item.id
            }
        }),
        placeholder: PlaceholderComponent
    }
)

const ListMenuContentWithData = withCommerceSdkReact(
    ({data, ...rest}) => (
        <Fade in={true}>
            <ListMenuContent {...rest} item={data} />
        </Fade>
    ),
    {
        hook: useCategory,
        queryOptions: ({item}) => ({
            parameters: {
                id: item.id,
                levels: 2
            }
        }),
        placeholder: PlaceholderComponent
    }
)

const App = (props) => {
    const {children} = props
    const {data: categoriesTree} = useCategory({
        parameters: {id: CAT_MENU_DEFAULT_ROOT_CATEGORY, levels: CAT_MENU_DEFAULT_NAV_SSR_DEPTH}
    })
    const categories = flatten(categoriesTree || {}, 'categories')
    const {getTokenWhenReady} = useAccessToken()
    const appOrigin = useAppOrigin()
    const activeData = useActiveData()
    const history = useHistory()
    const location = useLocation()
    const authModal = useAuthModal()
    const dntNotification = useDntNotification()
    const {site, locale, buildUrl} = useMultiSite()
    const {
        isOpen: isStoreLocatorOpen,
        onOpen: onOpenStoreLocator,
        onClose: onCloseStoreLocator
    } = useStoreLocatorModal()
    const storeLocatorEnabled = getConfig()?.app?.storeLocatorEnabled ?? STORE_LOCATOR_IS_ENABLED

    const [isOnline, setIsOnline] = useState(true)
    const styles = useStyleConfig('App')
    const {isOpen, onOpen, onClose} = useDisclosure()

    const targetLocale = getTargetLocale({
        getUserPreferredLocales: () => {
            return [locale?.id || DEFAULT_LOCALE]
        },
        l10nConfig: site.l10n
    })

    const is404ForMissingTranslationFile = /\/static\/translations\/compiled\/[^.]+\.json$/.test(
        location?.pathname
    )

    const {data: messages} = useQuery({
        queryKey: ['app', 'translations', 'messages', targetLocale],
        queryFn: () => {
            if (is404ForMissingTranslationFile) {
                return {}
            }
            return fetchTranslations(targetLocale, appOrigin)
        },
        enabled: isServer
    })

    const isCheckout = /\/checkout$/.test(location?.pathname)

    // Check for preview URL parameter (must be true)
    const searchParams = new URLSearchParams(location?.search || '')
    const isPreview = searchParams.get('preview') === 'true'

    const {l10n} = site
    const currency = locale.preferredCurrency || l10n.defaultCurrency

    const {data: customer} = useCurrentCustomer()
    const {data: basket, dataUpdatedAt: basketQueryLastUpdateTime} = useCurrentBasket()
    const config = getConfig()

    const updateBasket = useShopperBasketsMutation('updateBasket')
    const updateCustomerForBasket = useShopperBasketsMutation('updateCustomerForBasket')

    useEffect(() => {
        if (basket?.currency && basket?.currency !== currency) {
            updateBasket.mutate({
                parameters: {basketId: basket.basketId},
                body: {currency}
            })
        }
    }, [basket?.currency])

    const commerceAgentConfiguration = useMemo(() => {
        return getCommerceAgentConfig()
    }, [config.app.commerceAgent])

    useEffect(() => {
        if (
            basket &&
            customer?.isRegistered &&
            customer?.email &&
            customer?.email !== basket?.customerInfo?.email
        ) {
            updateCustomerForBasket.mutate({
                parameters: {basketId: basket.basketId},
                body: {
                    email: customer.email
                }
            })
        }
    }, [customer?.isRegistered, customer?.email, basket?.customerInfo?.email])

    useEffect(() => {
        watchOnlineStatus((isOnline) => {
            setIsOnline(isOnline)
        })
    }, [])

    useUpdateShopperContext()

    useEffect(() => {
        onClose()
    }, [location])

    const onLogoClick = () => {
        const path = buildUrl(HOME_HREF)
        history.push(path)
        onClose()
    }

    const onCartClick = () => {
        const path = buildUrl('/cart')
        history.push(path)
        onClose()
    }

    const onAccountClick = () => {
        const path = buildUrl('/account')
        history.push(path)
    }

    const onWishlistClick = () => {
        const path = buildUrl('/account/wishlist')
        history.push(path)
    }

    const trackPage = () => {
        activeData.trackPage(site.id, locale.id, currency)
    }

    useEffect(() => {
        trackPage()
    }, [location])

    return (
        <Box className="sf-app" {...styles.container}>
            <StorefrontPreview getToken={getTokenWhenReady}>
                <IntlProvider
                    onError={(err) => {
                        if (!messages) {
                            return
                        }
                        if (err.code === 'MISSING_TRANSLATION') {
                            logger.warn('Missing translation', {
                                namespace: 'App.IntlProvider',
                                additionalProperties: {
                                    errorMessage: err.message
                                }
                            })
                            return
                        }
                        throw err
                    }}
                    locale={targetLocale}
                    messages={messages}
                    defaultLocale={DEFAULT_LOCALE}
                >
                    <CurrencyProvider currency={currency}>
                        <Seo>
                            <meta name="theme-color" content={THEME_COLOR} />
                            <meta name="apple-mobile-web-app-title" content={DEFAULT_SITE_TITLE} />
                            <link
                                rel="apple-touch-icon"
                                href={getAssetUrl('static/img/global/apple-touch-icon.png')}
                            />
                            <link rel="manifest" href={getAssetUrl('static/manifest.json')} />

                            {site.l10n?.supportedLocales.map((locale) => (
                                <link
                                    rel="alternate"
                                    hrefLang={locale.id.toLowerCase()}
                                    href={`${appOrigin}${getPathWithLocale(locale.id, buildUrl, {
                                        location: {
                                            ...location,
                                            search: ''
                                        }
                                    })}`}
                                    key={locale.id}
                                />
                            ))}
                            <link
                                rel="alternate"
                                hrefLang={site.l10n.defaultLocale.slice(0, 2)}
                                href={`${appOrigin}${getPathWithLocale(locale.id, buildUrl, {
                                    location: {
                                        ...location,
                                        search: ''
                                    }
                                })}`}
                            />
                            <link rel="alternate" hrefLang="x-default" href={`${appOrigin}/`} />
                        </Seo>

                        {commerceAgentConfiguration?.enabled === 'true' && (
                            <ShopperAgent
                                commerceAgentConfiguration={commerceAgentConfiguration}
                                basketDoneLoading={basketQueryLastUpdateTime > 0}
                            />
                        )}

                        <ScrollToTop />

                        <Box id="app" display="flex" flexDirection="column" flex={1}>
                            <SkipNavLink zIndex="skipLink">Skip to Content</SkipNavLink>
                            {storeLocatorEnabled && (
                                <StoreLocatorModal
                                    isOpen={isStoreLocatorOpen}
                                    onClose={onCloseStoreLocator}
                                />
                            )}
                            {!isPreview && (
                                <Island hydrateOn={'visible'}>
                                    <Box {...styles.headerWrapper}>
                                        {!isCheckout ? (
                                            <>
                                                <AboveHeader />
                                                <Header
                                                    onMenuClick={onOpen}
                                                    onLogoClick={onLogoClick}
                                                    onMyCartClick={onCartClick}
                                                    onMyAccountClick={onAccountClick}
                                                    onWishlistClick={onWishlistClick}
                                                    onStoreLocatorClick={onOpenStoreLocator}
                                                >
                                                    <HideOnDesktop>
                                                        <DrawerMenu
                                                            isOpen={isOpen}
                                                            onClose={onClose}
                                                            onLogoClick={onLogoClick}
                                                            root={
                                                                categories?.[
                                                                    CAT_MENU_DEFAULT_ROOT_CATEGORY
                                                                ]
                                                            }
                                                            itemsKey="categories"
                                                            itemsCountKey="onlineSubCategoriesCount"
                                                            itemComponent={DrawerMenuItemWithData}
                                                        />
                                                    </HideOnDesktop>

                                                    <HideOnMobile>
                                                        <ListMenu
                                                            root={
                                                                categories?.[
                                                                    CAT_MENU_DEFAULT_ROOT_CATEGORY
                                                                ]
                                                            }
                                                            itemsKey="categories"
                                                            itemsCountKey="onlineSubCategoriesCount"
                                                            contentComponent={ListMenuContentWithData}
                                                        />
                                                    </HideOnMobile>
                                                </Header>
                                            </>
                                        ) : (
                                            <CheckoutHeader />
                                        )}
                                    </Box>
                                </Island>
                            )}
                            {!isOnline && <OfflineBanner />}
                            <AddToCartModalProvider>
                                <BonusProductSelectionModalProvider>
                                    <SkipNavContent
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            flex: 1,
                                            outline: 0
                                        }}
                                    >
                                        <Box
                                            as="main"
                                            id="app-main"
                                            role="main"
                                            display="flex"
                                            flexDirection="column"
                                            flex="1"
                                        >
                                            <Box width="100%">
                                                <OfflineBoundary isOnline={false}>
                                                    {children}
                                                </OfflineBoundary>
                                            </Box>
                                        </Box>
                                    </SkipNavContent>

                                    {!isPreview && (
                                        <Island hydrateOn={'visible'}>
                                            {!isCheckout ? <Footer /> : <CheckoutFooter />}
                                        </Island>
                                    )}

                                    <AuthModal {...authModal} />
                                    <DntNotification {...dntNotification} />
                                </BonusProductSelectionModalProvider>
                            </AddToCartModalProvider>
                        </Box>
                    </CurrencyProvider>
                </IntlProvider>
            </StorefrontPreview>
        </Box>
    )
}

App.propTypes = {
    children: PropTypes.node
}

export default App
