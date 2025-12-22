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
                    const newURL = new URL(window.location)
                    if (!urlParams.has('redirected')) {
                        newURL.searchParams.append('redirected', '1')
                        newURL.pathname = `/s/${siteId}/${window.location.pathname
                            .split('/')
                            .slice(2)
                            .join('/')}`
                        window.location.replace(newURL)
                    }
                }, [window.location.href])
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
