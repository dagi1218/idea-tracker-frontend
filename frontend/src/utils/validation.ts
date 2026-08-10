import { z, type ZodSchema } from 'zod';

// Formik adapter helper for Zod schemas
export const validateWithZod = <T>(schema: ZodSchema<T>) => (values: T) => {
    const result = schema.safeParse(values);
    if (result.success) return {};

    const errors: Record<string, string> = {};
    result.error.issues.forEach((issue) => {
        if (issue.path[0]) {
            errors[issue.path[0].toString()] = issue.message;
        }
    });
    return errors;
};

// Login Schema
export const loginSchema = z.object({
    email: z
        .string()
        .min(1, 'Email is required')
        .email('Must be a valid email address'),
    password: z.string().min(1, 'Password is required'),
});

export type LoginFormData = z.infer<typeof loginSchema>;

// Register Schema
export const registerSchema = z.object({
    name: z
        .string()
        .min(2, 'Name must be at least 2 characters long')
        .max(100, 'Name cannot exceed 100 characters'),
    email: z
        .string()
        .min(1, 'Email is required')
        .email('Must be a valid email address'),
    password: z
        .string()
        .min(8, 'Password must be at least 8 characters long'),
    role: z.enum(['user', 'admin']).default('user'),
});

export type RegisterFormData = z.infer<typeof registerSchema>;

//idea schema
export const ideaSchema = z.object({
    title: z
        .string()
        .min(3, 'Title must be at least 3 characters long')
        .max(150, 'Title cannot exceed 150 characters'),
    description: z
        .string()
        .min(5, 'Description must be at least 5 characters long'),
    tags: z.string().optional(),
});

export type IdeaFormData = z.infer<typeof ideaSchema>;