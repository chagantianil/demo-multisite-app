/*
 * Copyright (c) 2023, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

/**
 * Component Registry
 *
 * Register all Page Designer components here.
 * The key should match the component's typeId from the Page Designer response.
 *
 * typeId format: "folder.componentName"
 *
 * To add a new component:
 * 1. Create the component in experience/components/{folder}/{componentName}/index.jsx
 * 2. Import and register it below with the full typeId as the key
 *
 * Example:
 *   import MyComponent from './myFolder/myComponent'
 *   export const componentRegistry = {
 *       'myFolder.myComponent': MyComponent
 *   }
 */

// Commerce Assets
import ImageAndText from './commerce_assets/imageAndText'
import PhotoTile from './commerce_assets/photoTile'

// Commerce Layouts
import MobileGrid2r2c from './commerce_layouts/mobileGrid2r2c'

export const componentRegistry = {
    // Commerce Assets
    'commerce_assets.imageAndText': ImageAndText,
    'commerce_assets.photoTile': PhotoTile,

    // Commerce Layouts
    'commerce_layouts.mobileGrid2r2c': MobileGrid2r2c
}
