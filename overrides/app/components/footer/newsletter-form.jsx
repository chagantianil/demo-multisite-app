/*
 * Copyright (c) 2023, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

import React, {useState} from 'react'
import {useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import {z} from 'zod'
import {useConfig, useAccessToken} from '@salesforce/commerce-sdk-react'
import {
    Box,
    Button,
    Checkbox,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    Stack,
    Alert,
    AlertIcon,
    CloseButton
} from '@chakra-ui/react'

// Newsletter validation schema
const NewsletterSchema = z.object({
    email: z
        .string()
        .min(1, {message: 'Email is required.'})
        .email({message: 'Please enter a valid email.'}),
    firstName: z.string().min(1, {message: 'First name is required.'}),
    lastName: z.string().optional(),
    phone: z.string().optional(),
    consent: z.boolean().refine((val) => val === true, {
        message: 'You must consent to subscribe.'
    })
})

const NewsletterForm = () => {
    const {organizationId, siteId, locale} = useConfig()
    const {getTokenWhenReady} = useAccessToken()

    const [submitStatus, setSubmitStatus] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    const {
        register,
        handleSubmit,
        reset,
        formState: {errors}
    } = useForm({
        resolver: zodResolver(NewsletterSchema),
        defaultValues: {
            email: '',
            firstName: '',
            lastName: '',
            phone: '',
            consent: false
        }
    })

    const onSubmit = async (data) => {
        setIsLoading(true)
        setSubmitStatus(null)

        try {
            const token = await getTokenWhenReady()
            const url = `/mobify/proxy/api/custom/newsletter/v1/organizations/${organizationId}/subscribe?siteId=${siteId}&locale=${locale}&c_email=${data.email}&c_firstName=${data.firstName}&c_lastName=${data.lastName}&c_phone=${data.phone}&c_consent=${data.consent.toString()}`

            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            })

            if (!response.ok) {
                let errorMessage = `Subscription failed. (${response.status})`
                try {
                    const err = await response.json()
                    errorMessage = err.detail || err.message || errorMessage
                } catch (e) {
                    // non-JSON fallback
                }
                throw new Error(errorMessage)
            }

            const result = await response.json()

            const isSuccess = result.success === true || result.success === 'true'
            if (!isSuccess) {
                throw new Error(result.message || 'Could not update subscription.')
            }

            setSubmitStatus({
                status: 'success',
                message: 'Successfully subscribed!'
            })
            reset()
        } catch (error) {
            setSubmitStatus({
                status: 'error',
                message: error.message || 'An unexpected error occurred.'
            })
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Box as="form" onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={3}>
                <FormControl isInvalid={!!errors.firstName}>
                    <FormLabel htmlFor="footer-firstName" fontSize="sm" color="gray.200">
                        First Name
                    </FormLabel>
                    <Input
                        id="footer-firstName"
                        size="sm"
                        bg="gray.700"
                        border="none"
                        color="white"
                        _placeholder={{color: 'gray.400'}}
                        {...register('firstName')}
                    />
                    <FormErrorMessage fontSize="xs">{errors.firstName?.message}</FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={!!errors.lastName}>
                    <FormLabel htmlFor="footer-lastName" fontSize="sm" color="gray.200">
                        Last Name (Optional)
                    </FormLabel>
                    <Input
                        id="footer-lastName"
                        size="sm"
                        bg="gray.700"
                        border="none"
                        color="white"
                        _placeholder={{color: 'gray.400'}}
                        {...register('lastName')}
                    />
                    <FormErrorMessage fontSize="xs">{errors.lastName?.message}</FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={!!errors.email}>
                    <FormLabel htmlFor="footer-email" fontSize="sm" color="gray.200">
                        Email
                    </FormLabel>
                    <Input
                        id="footer-email"
                        type="email"
                        size="sm"
                        bg="gray.700"
                        border="none"
                        color="white"
                        _placeholder={{color: 'gray.400'}}
                        placeholder="you@email.com"
                        {...register('email')}
                    />
                    <FormErrorMessage fontSize="xs">{errors.email?.message}</FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={!!errors.phone}>
                    <FormLabel htmlFor="footer-phone" fontSize="sm" color="gray.200">
                        Phone (Optional)
                    </FormLabel>
                    <Input
                        id="footer-phone"
                        type="tel"
                        size="sm"
                        bg="gray.700"
                        border="none"
                        color="white"
                        _placeholder={{color: 'gray.400'}}
                        {...register('phone')}
                    />
                    <FormErrorMessage fontSize="xs">{errors.phone?.message}</FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={!!errors.consent}>
                    <Checkbox
                        id="footer-consent"
                        colorScheme="blue"
                        size="sm"
                        {...register('consent')}
                    >
                        <Box as="span" fontSize="xs" color="gray.300">
                            I agree to the terms and conditions.
                        </Box>
                    </Checkbox>
                    <FormErrorMessage fontSize="xs">{errors.consent?.message}</FormErrorMessage>
                </FormControl>

                <Button
                    type="submit"
                    colorScheme="blue"
                    size="sm"
                    isLoading={isLoading}
                    width="full"
                >
                    Subscribe
                </Button>

                {submitStatus && (
                    <Alert status={submitStatus.status} borderRadius="md" size="sm">
                        <AlertIcon />
                        <Box flex="1" fontSize="sm">
                            {submitStatus.message}
                        </Box>
                        <CloseButton size="sm" onClick={() => setSubmitStatus(null)} />
                    </Alert>
                )}
            </Stack>
        </Box>
    )
}

export default NewsletterForm

