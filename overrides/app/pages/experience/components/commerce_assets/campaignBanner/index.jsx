/*
 * Copyright (c) 2023, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

import React, {memo} from 'react'
import PropTypes from 'prop-types'
import {Box, Alert, AlertIcon} from '@chakra-ui/react'

/**
 * CampaignBanner Component
 * Displays a promotional banner message
 *
 * Performance: Memoized component
 */
const CampaignBanner = memo(({data, id}) => {
    const {bannerMessage} = data || {}

    if (!bannerMessage) {
        return (
            <Alert status="info" size="sm" my={2}>
                <AlertIcon />
                No banner message configured
            </Alert>
        )
    }

    return (
        <Box
            className="campaign-banner"
            data-component-id={id}
            bg="brand.500"
            color="white"
            py={3}
            px={4}
            textAlign="center"
            fontSize="sm"
            fontWeight="medium"
            mb={4}
        >
            <Box dangerouslySetInnerHTML={{__html: bannerMessage}} />
        </Box>
    )
})

CampaignBanner.displayName = 'CampaignBanner'

CampaignBanner.propTypes = {
    data: PropTypes.shape({
        bannerMessage: PropTypes.string
    }),
    id: PropTypes.string
}

export default CampaignBanner
