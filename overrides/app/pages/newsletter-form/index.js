import React, {useState} from 'react'
import {useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import NewsletterSchema from '../../../app/schemas/newsletter'

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

export const NewsletterForm = () => {
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
            const url = `/mobify/proxy/api/custom/newsletter/v1/organizations/${organizationId}/subscribe?siteId=${siteId}&locale=${locale}&c_email=${
                data.email
            }&c_firstName=${data.firstName}&c_lastName=${data.lastName}&c_phone=${
                data.phone
            }&c_consent=${data.consent.toString()}`

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

            // handle business-logic result
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
        <Box as="form" onSubmit={handleSubmit(onSubmit)} p={4} borderWidth={1} borderRadius="md">
            <Stack spacing={4}>
                <FormControl isInvalid={!!errors.firstName}>
                    <FormLabel htmlFor="firstName">First Name</FormLabel>
                    <Input id="firstName" {...register('firstName')} />
                    <FormErrorMessage>{errors.firstName?.message}</FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={!!errors.lastName}>
                    <FormLabel htmlFor="lastName">Last Name (Optional)</FormLabel>
                    <Input id="lastName" {...register('lastName')} />
                    <FormErrorMessage>{errors.lastName?.message}</FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={!!errors.email}>
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <Input id="email" type="email" {...register('email')} />
                    <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={!!errors.phone}>
                    <FormLabel htmlFor="phone">Phone (Optional)</FormLabel>
                    <Input id="phone" type="tel" {...register('phone')} />
                    <FormErrorMessage>{errors.phone?.message}</FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={!!errors.consent}>
                    <Checkbox id="consent" {...register('consent')}>
                        I agree to the terms and conditions.
                    </Checkbox>
                    <FormErrorMessage>{errors.consent?.message}</FormErrorMessage>
                </FormControl>

                <Button type="submit" colorScheme="blue" isLoading={isLoading}>
                    Subscribe
                </Button>

                {submitStatus && (
                    <Alert status={submitStatus.status}>
                        <AlertIcon />
                        {submitStatus.message}
                        <CloseButton
                            position="absolute"
                            right="8px"
                            top="8px"
                            onClick={() => setSubmitStatus(null)}
                        />
                    </Alert>
                )}
            </Stack>
        </Box>
    )
}

export default NewsletterForm
