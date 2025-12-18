/*
 * Copyright (c) 2023, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

import {useLocation} from 'react-router-dom'

/**
 * Hook to detect if we're in Salesforce Page Designer preview mode
 * Checks for ?preview=true query parameter
 * @returns {boolean} true if in preview mode
 */
export const usePreviewMode = () => {
    const location = useLocation()
    const searchParams = new URLSearchParams(location?.search || '')
    return searchParams.get('preview') === 'true'
}

