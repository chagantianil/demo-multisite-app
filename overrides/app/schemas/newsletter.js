// app/schemas/newsletter.js
import { z } from 'zod'

const NewsletterSchema = z.object({
    email: z
        .string()
        .min(1, { message: 'Email is required.' })
        .email({ message: 'Please enter a valid email.' }),
    firstName: z
        .string()
        .min(1, { message: 'First name is required.' }),
    lastName: z
        .string()
        .optional(), // Last name is not required
    phone: z
        .string()
        .optional(), // Phone is not required
    consent: z
        .boolean()
        .refine((val) => val === true, {
            message: 'You must consent to subscribe.'
        })
})

export default NewsletterSchema;