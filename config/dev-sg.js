/*
 * Copyright (c) 2023, Salesforce, Inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
/* eslint-disable @typescript-eslint/no-var-requires */
const sites = require('./sites.js')
const {parseSettings} = require('./utils.js')

module.exports = {
    app: {
        enableHybrid: true,
        storeLocatorEnabled: true,
        multishipEnabled: true,
        partialHydrationEnabled: false,
        commerceAgent: parseSettings(process.env.COMMERCE_AGENT_SETTINGS) || {
            enabled: 'false',
            askAgentOnSearch: 'false',
            embeddedServiceName: '',
            embeddedServiceEndpoint: '',
            scriptSourceUrl: '',
            scrt2Url: '',
            salesforceOrgId: '',
            commerceOrgId: '',
            siteId: '',
            enableConversationContext: 'false',
            conversationContext: []
        },
        url: {
            site: 'path',
            locale: 'query_param',
            showDefaults: false,
            interpretPlusSignAsSpace: false
        },
        login: {
            passwordless: {
                enabled: false,
                callbackURI:
                    process.env.PASSWORDLESS_LOGIN_CALLBACK_URI || '/passwordless-login-callback',
                landingPath: '/passwordless-login-landing'
            },
            social: {
                enabled: false,
                idps: ['google', 'apple'],
                redirectURI: process.env.SOCIAL_LOGIN_REDIRECT_URI || '/social-callback'
            },
            resetPassword: {
                callbackURI: process.env.RESET_PASSWORD_CALLBACK_URI || '/reset-password-callback',
                landingPath: '/reset-password-landing'
            }
        },
        defaultSite: 'SiteGenesis',
        siteAliases: {
            SiteGenesis: 'sitegenesis'
        },
        sites: sites.filter((site) => site.id === 'SiteGenesis'),
        commerceAPI: {
            proxyPath: '/mobify/proxy/api',
            parameters: {
                clientId: 'efe7e72f-31ac-4ab1-9d0d-afb6608a6c26',
                organizationId: 'f_ecom_zzap_249',
                shortCode: 'kv7kzm78',
                siteId: 'SiteGenesis'
            }
        },
        einsteinAPI: {
            host: 'https://api.cquotient.com',
            einsteinId: '',
            siteId: '',
            isProduction: false
        },
        dataCloudAPI: {
            appSourceId: '',
            tenantId: ''
        }
    },
    envBasePath: '/',
    externals: [],
    pageNotFoundURL: '/page-not-found',
    ssrEnabled: true,
    ssrOnly: ['ssr.js', 'ssr.js.map', 'node_modules/**/*.*'],
    ssrShared: [
        'static/ico/favicon.ico',
        'static/robots.txt',
        '**/*.js',
        '**/*.js.map',
        '**/*.json'
    ],
    ssrParameters: {
        ssrFunctionNodeVersion: '22.x',
        proxyConfigs: [
            {
                host: 'kv7kzm78.api.commercecloud.salesforce.com',
                path: 'api'
            },
            {
                host: 'zzap-249.dx.commercecloud.salesforce.com',
                path: 'ocapi'
            }
        ]
    },
    hybridProxy: {
        enabled: true,
        sfccOrigin: 'https://zzap-249.dx.commercecloud.salesforce.com'
    }
}
