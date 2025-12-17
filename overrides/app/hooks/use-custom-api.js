/*
 * Copyright (c) 2023, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

import {useCallback} from 'react'
import {useAccessToken} from '@salesforce/commerce-sdk-react'
import {getConfig} from '@salesforce/pwa-kit-runtime/utils/ssr-config'

/**
 * Custom API hook for making authenticated requests to custom SFCC endpoints
 *
 * @example
 * const {callCustomAPI} = useCustomAPI()
 *
 * // POST request
 * const result = await callCustomAPI({
 *     method: 'POST',
 *     folder: 'newsletter',
 *     endpoint: 'subscribe',
 *     params: { c_email: 'test@email.com', c_firstName: 'John' }
 * })
 *
 * // GET request with body
 * const data = await callCustomAPI({
 *     method: 'GET',
 *     folder: 'products',
 *     endpoint: 'extended',
 *     params: { productId: '123' }
 * })
 */
const useCustomAPI = () => {
    const {getTokenWhenReady} = useAccessToken()

    /**
     * Make an authenticated request to a custom API endpoint
     *
     * URL Format: /mobify/proxy/api/custom/{folder}/{version}/organizations/{organizationId}/{endpoint}?{params}
     *
     * @param {Object} options - Request options
     * @param {string} options.method - HTTP method (GET, POST, PUT, PATCH, DELETE)
     * @param {string} options.folder - API folder/namespace (e.g., 'newsletter', 'products')
     * @param {string} options.endpoint - API endpoint/action (e.g., 'subscribe', 'list')
     * @param {string} [options.version='v1'] - API version
     * @param {Object} [options.body] - Request body (will be JSON stringified)
     * @param {Object} [options.params] - Query parameters to append to URL
     * @param {Object} [options.headers] - Additional headers
     * @param {boolean} [options.includeSiteId=true] - Include siteId in query params
     * @param {boolean} [options.includeLocale=true] - Include locale in query params
     * @returns {Promise<Object>} - Response data
     * @throws {Error} - If request fails
     */
    const callCustomAPI = useCallback(
        async (options) => {
            const {
                method,
                folder,
                endpoint,
                version = 'v1',
                body = null,
                params = {},
                headers = {},
                includeSiteId = true,
                includeLocale = true
            } = options

            // Validate required parameters
            if (!method) {
                throw new Error('method is required')
            }
            if (!folder) {
                throw new Error('folder is required')
            }
            if (!endpoint) {
                throw new Error('endpoint is required')
            }

            const config = getConfig()
            const {organizationId, siteId} = config.app.commerceAPI.parameters
            const locale = config.app.defaultLocale || 'en-US'

            // Build query string
            const queryParams = new URLSearchParams()

            if (includeSiteId && siteId) {
                queryParams.append('siteId', siteId)
            }

            if (includeLocale && locale) {
                queryParams.append('locale', locale)
            }

            // Add custom query parameters
            Object.entries(params).forEach(([key, value]) => {
                if (value !== undefined && value !== null) {
                    queryParams.append(key, String(value))
                }
            })

            // Build URL: /mobify/proxy/api/custom/{folder}/{version}/organizations/{organizationId}/{endpoint}
            const queryString = queryParams.toString() ? `?${queryParams.toString()}` : ''
            const url = `/mobify/proxy/api/custom/${folder}/${version}/organizations/${organizationId}/${endpoint}${queryString}`

            // Get auth token
            const token = await getTokenWhenReady()

            // Build request options
            const fetchOptions = {
                method: method.toUpperCase(),
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    ...headers
                }
            }

            // Add body for non-GET requests
            if (body && method.toUpperCase() !== 'GET') {
                fetchOptions.body = JSON.stringify(body)
            }

            // Make request
            const response = await fetch(url, fetchOptions)

            // Parse response
            let data
            const contentType = response.headers.get('content-type')
            if (contentType && contentType.includes('application/json')) {
                data = await response.json()
            } else {
                data = await response.text()
            }

            // Handle errors
            if (!response.ok) {
                const errorMessage =
                    typeof data === 'object'
                        ? data.detail ||
                          data.message ||
                          data.error ||
                          `Request failed (${response.status})`
                        : `Request failed (${response.status})`

                const error = new Error(errorMessage)
                error.status = response.status
                error.response = data
                throw error
            }

            return data
        },
        [getTokenWhenReady]
    )

    return {callCustomAPI}
}

export default useCustomAPI
