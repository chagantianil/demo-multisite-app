/*
 * Copyright (c) 2023, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

import React, {useEffect} from 'react'
import {withRouter} from 'react-router-dom'
import useMultiSite from '@salesforce/retail-react-app/app/hooks/use-multi-site'
import loadable from '@loadable/component'
import {getConfig} from '@salesforce/pwa-kit-runtime/utils/ssr-config'

// Components
import {Skeleton} from '@salesforce/retail-react-app/app/components/shared/ui'
import {configureRoutes} from '@salesforce/retail-react-app/app/utils/routes-utils'
import {routes as _routes} from '@salesforce/retail-react-app/app/routes'

const fallback = <Skeleton height="75vh" width="100%" />

// Create your pages here and add them to the routes array
// Use loadable to split code into smaller js chunks
const Home = loadable(() => import('./pages/home'), {fallback})
const MyNewRoute = loadable(() => import('./pages/my-new-route'))
const ProductDetail = loadable(() => import('./pages/product-detail'))
const PageDetail = loadable(() => import('./pages/page/[pageId]'), {fallback})
const StyleGuide = loadable(() => import('./pages/style-guide'), {fallback})
const Registration = loadable(() => import('./pages/registration'), {fallback})
const PageNotFound = loadable(() => import('@salesforce/retail-react-app/app/pages/page-not-found'))

const routes = [
    {
        path: '/',
        component: Home,
        exact: true
    },
    {
        path: '/home',
        component: Home,
        exact: true
    },
    {
        path: '/my-new-route',
        component: MyNewRoute
    },
    {
        path: '/product/:productId',
        component: ProductDetail
    },
    {
        path: '/page/:pageId',
        component: PageDetail
    },
    {
        path: '/style-guide',
        component: StyleGuide
    },
    {
        path: '/registration',
        component: Registration,
        exact: true
    },
    ..._routes
]

// Remove SFRA/SiteGenesis routes from PWA Kit
const ecomRoutes = [
    '/',
    '/home',
    '/login',
    '/registration',
    '/reset-password',
    '/passwordless-login',
    '/passwordless-login-callback',
    '/passwordless-login-landing',
    '/account',
    '/checkout',
    '/checkout/confirmation/:orderNo',
    '/social-callback',
    '/account/wishlist',
    '/store-locator',
    '/my-new-route',
    '/cart',
    '/checkout',
    '*'
]

const hybridRoutes = [
    ...routes.filter((route) => !ecomRoutes.includes(route.path)),
    {
        path: '*',
        component: withRouter((props) => {
            const config = getConfig()
            const {location} = props
            const urlParams = new URLSearchParams(location.search)
            const {site} = useMultiSite()
            const siteId = site && site.id ? site.id : config?.app?.defaultSite

            if (typeof window !== 'undefined') {
                useEffect(() => {
                    if (!urlParams.has('redirected')) {
                        // Preserve the current origin (localhost) when redirecting
                        const currentOrigin = window.location.origin
                        const pathParts = window.location.pathname.split('/').filter(Boolean)

                        // Check if first segment is a site alias or site ID
                        const siteAliases = config?.app?.siteAliases || {}
                        const siteAliasValues = Object.values(siteAliases)
                        const sites = config?.app?.sites || []
                        const siteIds = sites.map((s) => s.id)

                        const firstSegment = pathParts[0]
                        const isSiteAlias = siteAliasValues.includes(firstSegment?.toLowerCase())
                        const isSiteId = siteIds.includes(firstSegment)

                        // If the path is just a site alias/ID (e.g., /sitegenesis, /RefArch)
                        // redirect to SFCC format: /s/{siteId}
                        if ((isSiteAlias || isSiteId) && pathParts.length === 1) {
                            // Determine the site ID from alias or use the ID directly
                            let targetSiteId = firstSegment
                            if (isSiteAlias) {
                                // Find the site ID for this alias
                                targetSiteId =
                                    Object.keys(siteAliases).find(
                                        (key) =>
                                            siteAliases[key].toLowerCase() ===
                                            firstSegment.toLowerCase()
                                    ) || siteId
                            }

                            // Redirect to SFCC format: /s/{siteId}
                            const newPath = `/s/${targetSiteId}`
                            const newURL = new URL(newPath, currentOrigin)

                            // Preserve existing query params and add redirected flag
                            urlParams.forEach((value, key) => {
                                if (key !== 'redirected') {
                                    newURL.searchParams.set(key, value)
                                }
                            })
                            newURL.searchParams.set('redirected', '1')

                            window.location.replace(newURL.href)
                            return
                        }

                        // For other unmatched routes, redirect to SFCC format
                        // Remove site/locale prefixes if present (slice(1) removes first segment if it's site)
                        const pathAfterSite =
                            isSiteAlias || isSiteId
                                ? pathParts.slice(1).join('/')
                                : pathParts.join('/')

                        const newPath = `/s/${siteId}${pathAfterSite ? '/' + pathAfterSite : ''}`
                        const newURL = new URL(newPath, currentOrigin)

                        // Preserve existing query params and add redirected flag
                        const existingParams = new URLSearchParams(window.location.search)
                        existingParams.forEach((value, key) => {
                            if (key !== 'redirected') {
                                newURL.searchParams.set(key, value)
                            }
                        })
                        newURL.searchParams.set('redirected', '1')
                        // Use href to ensure absolute URL with origin is used
                        // This prevents the hybrid proxy from changing the host
                        window.location.replace(newURL.href)
                    }
                }, [
                    location.pathname,
                    location.search,
                    siteId,
                    config?.app?.siteAliases,
                    config?.app?.sites
                ])
            }

            if (urlParams.has('redirected')) {
                return <PageNotFound {...props} />
            }
            return null
        })
    }
]

export default () => {
    const config = getConfig()
    // Only use these routes if we are in hybrid mode otherwise use defaults
    // This is driven via the config and env variables
    const routesToConfigure = config.app.enableHybrid ? hybridRoutes : routes
    return configureRoutes(routesToConfigure, config, {
        ignoredRoutes: ['/callback', '*']
    })
}
