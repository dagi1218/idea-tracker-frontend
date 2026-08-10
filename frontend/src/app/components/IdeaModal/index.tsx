import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import { Box, Flex, Button, Input } from '../Blocks/index.js';
import { Label } from 'theme-ui';
import { type IIdeaModel } from '../../models/idea.js';
import { ideaSchema, validateWithZod, type IdeaFormData } from '../../../utils/validation.js';

interface IdeaModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (values: { title: string; description: string; tags: string[] }) => void;
    initialValues?: IIdeaModel | null;
    isSubmitting?: boolean;
    error?: string | null;
}

export const IdeaModal: React.FC<IdeaModalProps> = ({
    isOpen,
    onClose,
    onSubmit,
    initialValues,
    isSubmitting = false,
    error,
}) => {
    const formik = useFormik<IdeaFormData>({
        initialValues: {
            title: initialValues?.title || '',
            description: initialValues?.description || '',
            tags: initialValues?.tags ? initialValues.tags.join(', ') : '',
        },
        enableReinitialize: true,
        validate: validateWithZod(ideaSchema),
        onSubmit: (values) => {
            const parsedTags = values.tags
                ? values.tags
                    .split(',')
                    .map((tag) => tag.trim())
                    .filter((tag) => tag.length > 0)
                : [];

            onSubmit({
                title: values.title,
                description: values.description,
                tags: parsedTags,
            });
        },
    });

    useEffect(() => {
        if (!isOpen) {
            formik.resetForm();
        }
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <Box
            sx={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                bg: 'rgba(0, 0, 0, 0.5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 1000,
                p: 3,
            }}
        >
            <Box
                sx={{
                    bg: 'white',
                    borderRadius: 'medium',
                    p: 4,
                    width: '100%',
                    maxWidth: '500px',
                    boxShadow: 'large',
                }}
            >
                <Flex sx={{ justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                    <Box as="h3" sx={{ m: 0, fontSize: 3, color: 'text' }}>
                        {initialValues ? 'Edit Idea' : 'Create New Idea'}
                    </Box>
                    <Button
                        variant="outline"
                        onClick={onClose}
                        sx={{ px: 2, py: 1, fontSize: 0, border: 'none' }}
                    >
                        ✕
                    </Button>
                </Flex>

                {error && (
                    <Box
                        sx={{
                            bg: 'rgba(229, 62, 62, 0.1)',
                            color: 'danger',
                            p: 2,
                            borderRadius: 'small',
                            mb: 3,
                            fontSize: 1,
                        }}
                    >
                        {error}
                    </Box>
                )}

                <form onSubmit={formik.handleSubmit}>
                    <Input
                        id="title"
                        name="title"
                        label="Idea Title"
                        placeholder="e.g., Real-time Logistics Routing Engine"
                        value={formik.values.title}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.title && formik.errors.title ? formik.errors.title : undefined}
                    />

                    <Box sx={{ mb: 3 }}>
                        <Label htmlFor="description" sx={{ display: 'block', mb: 1, fontWeight: 'bold', fontSize: 1 }}>
                            Description
                        </Label>
                        <textarea
                            id="description"
                            name="description"
                            rows={4}
                            placeholder="Describe your idea in detail..."
                            value={formik.values.description}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            style={{
                                width: '100%',
                                padding: '8px 12px',
                                borderRadius: '4px',
                                border: formik.touched.description && formik.errors.description ? '1px solid #e53e3e' : '1px solid #cbd5e0',
                                fontSize: '14px',
                                fontFamily: 'inherit',
                            }}
                        />
                        {formik.touched.description && formik.errors.description && (
                            <Box sx={{ color: 'danger', fontSize: 0, mt: 1 }}>
                                {formik.errors.description}
                            </Box>
                        )}
                    </Box>

                    <Input
                        id="tags"
                        name="tags"
                        label="Tags (Comma Separated)"
                        placeholder="tech, logistics, typescript"
                        value={formik.values.tags}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />

                    <Flex sx={{ justifyContent: 'flex-end', gap: 2, mt: 4 }}>
                        <Button type="button" variant="secondary" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button type="submit" variant="primary" isLoading={isSubmitting}>
                            {initialValues ? 'Save Changes' : 'Create Idea'}
                        </Button>
                    </Flex>
                </form>
            </Box>
        </Box>
    );
};