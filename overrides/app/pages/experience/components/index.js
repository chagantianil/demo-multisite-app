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
import CampaignBanner from './commerce_assets/campaignBanner'
import Category from './commerce_assets/category'
import EditorialRichText from './commerce_assets/editorialRichText'
import ImageAndText from './commerce_assets/imageAndText'
import MainBanner from './commerce_assets/mainBanner'
import PhotoTile from './commerce_assets/photoTile'
import PopularCategory from './commerce_assets/popularCategory'
import ProductListTile from './commerce_assets/productListTile'
import ProductTile from './commerce_assets/productTile'
import ShopTheLook from './commerce_assets/shopTheLook'

// Commerce Layouts
import Carousel from './commerce_layouts/carousel'
import MobileGrid1r1c from './commerce_layouts/mobileGrid1r1c'
import MobileGrid2r1c from './commerce_layouts/mobileGrid2r1c'
import MobileGrid2r2c from './commerce_layouts/mobileGrid2r2c'
import MobileGrid2r3c from './commerce_layouts/mobileGrid2r3c'
import MobileGrid3r1c from './commerce_layouts/mobileGrid3r1c'
import MobileGrid3r2c from './commerce_layouts/mobileGrid3r2c'
import MobileGridLookBook from './commerce_layouts/mobileGridLookBook'
import PopularCategories from './commerce_layouts/popularCategories'

export const componentRegistry = {
    // Commerce Assets
    'commerce_assets.campaignBanner': CampaignBanner,
    'commerce_assets.category': Category,
    'commerce_assets.editorialRichText': EditorialRichText,
    'commerce_assets.imageAndText': ImageAndText,
    'commerce_assets.mainBanner': MainBanner,
    'commerce_assets.photoTile': PhotoTile,
    'commerce_assets.popularCategory': PopularCategory,
    'commerce_assets.productListTile': ProductListTile,
    'commerce_assets.productTile': ProductTile,
    'commerce_assets.shopTheLook': ShopTheLook,

    // Commerce Layouts
    'commerce_layouts.carousel': Carousel,
    'commerce_layouts.mobileGrid1r1c': MobileGrid1r1c,
    'commerce_layouts.mobileGrid2r1c': MobileGrid2r1c,
    'commerce_layouts.mobileGrid2r2c': MobileGrid2r2c,
    'commerce_layouts.mobileGrid2r3c': MobileGrid2r3c,
    'commerce_layouts.mobileGrid3r1c': MobileGrid3r1c,
    'commerce_layouts.mobileGrid3r2c': MobileGrid3r2c,
    'commerce_layouts.mobileGridLookBook': MobileGridLookBook,
    'commerce_layouts.popularCategories': PopularCategories
}
