/*
 * Copyright (c) 2023, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

/**
 * Page Registry
 * 
 * Register all page types here.
 * The key should match the page's typeId from the Page Designer response.
 * 
 * To add a new page type:
 * 1. Create the page component in experience/pages/{pageType}/index.jsx
 * 2. Import and register it below
 * 
 * Example:
 *   import MyCustomPage from './myCustomPage'
 *   export const pageRegistry = {
 *       storePage: StorePage,
 *       myCustomPage: MyCustomPage
 *   }
 */

import StorePage from './storePage'

export const pageRegistry = {
    storePage: StorePage
}

