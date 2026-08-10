import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    useInjectReducer,
    useInjectSaga,
} from '../../../store/utils/redux-injectors.js';
import {
    userDashboardReducer,
    userDashboardActions,
} from './slice/index.js';
import { userDashboardSaga } from './slice/saga.js';
import {
    selectIdeas,
    selectIsLoading,
    selectIsSubmitting,
    selectError,
    selectIsModalOpen,
    selectSelectedIdea,
} from './slice/selectors.js';
import { Box, Flex, Button, Icons } from '../../components/Blocks/index.js';
import { IdeaModal } from '../../components/IdeaModal/index.js';
import { type IIdeaModel } from '../../models/idea.js';

export const UserDashboard: React.FC = () => {
    useInjectReducer({ key: 'userDashboard', reducer: userDashboardReducer });
    useInjectSaga({ key: 'userDashboard', saga: userDashboardSaga });

    const dispatch = useDispatch();
    const ideas = useSelector(selectIdeas);
    const isLoading = useSelector(selectIsLoading);
    const isSubmitting = useSelector(selectIsSubmitting);
    const error = useSelector(selectError);
    const isModalOpen = useSelector(selectIsModalOpen);
    const selectedIdea = useSelector(selectSelectedIdea);

    useEffect(() => {
        dispatch(userDashboardActions.fetchIdeasRequest());
    }, [dispatch]);

    const handleOpenCreateModal = () => {
        dispatch(userDashboardActions.openModal(null));
    };

    const handleOpenEditModal = (idea: IIdeaModel) => {
        dispatch(userDashboardActions.openModal(idea));
    };

    const handleCloseModal = () => {
        dispatch(userDashboardActions.closeModal());
    };

    const handleDeleteIdea = (id: string) => {
        if (window.confirm('Are you sure you want to delete this idea?')) {
            dispatch(userDashboardActions.deleteIdeaRequest(id));
        }
    };

    const handleFormSubmit = (values: { title: string; description: string; tags: string[] }) => {
        if (selectedIdea) {
            const ideaId = selectedIdea._id || selectedIdea.id || '';
            dispatch(
                userDashboardActions.updateIdeaRequest({
                    id: ideaId,
                    ...values,
                })
            );
        } else {
            dispatch(userDashboardActions.createIdeaRequest(values));
        }
    };

    return (
        <Box>
            {/* Header Banner */}
            <Flex sx={{ justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                <Box>
                    <Box as="h1" sx={{ m: 0, fontSize: 4, color: 'text' }}>
                        My Ideas
                    </Box>
                    <Box sx={{ color: 'secondary', fontSize: 1, mt: 1 }}>
                        Manage and track your product ideas and projects.
                    </Box>
                </Box>
                <Button
                    variant="primary"
                    onClick={handleOpenCreateModal}
                    sx={{ display: 'flex', alignItems: 'center', gap: 1, py: 2, px: 3 }}
                >
                    <Icons.Add sx={{ fontSize: 20 }} />
                    Create Idea
                </Button>
            </Flex>

            {/* Main Content / List */}
            {isLoading && ideas.length === 0 ? (
                <Flex sx={{ justifyContent: 'center', py: 5, color: 'primary', fontWeight: 'bold' }}>
                    Loading your ideas...
                </Flex>
            ) : ideas.length === 0 ? (
                <Box
                    sx={{
                        bg: 'white',
                        p: 5,
                        borderRadius: 'medium',
                        textAlign: 'center',
                        boxShadow: 'small',
                        border: '1px solid',
                        borderColor: 'border',
                    }}
                >
                    <Icons.Idea sx={{ fontSize: 48, color: 'secondary', mb: 2 }} />
                    <Box sx={{ fontSize: 2, fontWeight: 'bold', mb: 1 }}>No ideas found</Box>
                    <Box sx={{ color: 'secondary', fontSize: 1, mb: 3 }}>
                        You haven't added any ideas yet. Start by clicking "Create Idea" above.
                    </Box>
                    <Button variant="primary" onClick={handleOpenCreateModal}>
                        Create First Idea
                    </Button>
                </Box>
            ) : (
                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: ['1fr', '1fr 1fr', '1fr 1fr 1fr'],
                        gap: 3,
                    }}
                >
                    {ideas.map((idea) => {
                        const ideaId = idea._id || idea.id || '';
                        return (
                            <Box
                                key={ideaId}
                                sx={{
                                    bg: 'white',
                                    borderRadius: 'medium',
                                    p: 3,
                                    boxShadow: 'small',
                                    border: '1px solid',
                                    borderColor: 'border',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <Box>
                                    <Box sx={{ fontWeight: 'bold', fontSize: 2, mb: 2, color: 'text' }}>
                                        {idea.title}
                                    </Box>
                                    <Box
                                        sx={{
                                            color: 'secondary',
                                            fontSize: 1,
                                            mb: 3,
                                            whiteSpace: 'pre-line',
                                            lineHeight: 'body',
                                        }}
                                    >
                                        {idea.description}
                                    </Box>

                                    {idea.tags && idea.tags.length > 0 && (
                                        <Flex sx={{ flexWrap: 'wrap', gap: 1, mb: 3 }}>
                                            {idea.tags.map((tag, idx) => (
                                                <Box
                                                    key={idx}
                                                    sx={{
                                                        bg: 'muted',
                                                        color: 'text',
                                                        px: 2,
                                                        py: '2px',
                                                        borderRadius: 'small',
                                                        fontSize: 0,
                                                    }}
                                                >
                                                    #{tag}
                                                </Box>
                                            ))}
                                        </Flex>
                                    )}
                                </Box>

                                <Flex
                                    sx={{
                                        justifyContent: 'flex-end',
                                        gap: 2,
                                        pt: 2,
                                        borderTop: '1px solid',
                                        borderColor: 'muted',
                                    }}
                                >
                                    <Button
                                        variant="outline"
                                        onClick={() => handleOpenEditModal(idea)}
                                        sx={{ p: 1, px: 2, fontSize: 0, display: 'flex', alignItems: 'center', gap: 1 }}
                                    >
                                        <Icons.Edit sx={{ fontSize: 14 }} />
                                        Edit
                                    </Button>
                                    <Button
                                        variant="danger"
                                        onClick={() => handleDeleteIdea(ideaId)}
                                        sx={{ p: 1, px: 2, fontSize: 0, display: 'flex', alignItems: 'center', gap: 1 }}
                                    >
                                        <Icons.Delete sx={{ fontSize: 14 }} />
                                        Delete
                                    </Button>
                                </Flex>
                            </Box>
                        );
                    })}
                </Box>
            )}

            {/* Idea Modal */}
            <IdeaModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onSubmit={handleFormSubmit}
                initialValues={selectedIdea}
                isSubmitting={isSubmitting}
                error={error}
            />
        </Box>
    );
};

export default UserDashboard;