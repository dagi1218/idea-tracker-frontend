import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    useInjectReducer,
    useInjectSaga,
} from '../../../store/utils/redux-injectors.js';
import {
    adminDashboardReducer,
    adminDashboardActions,
} from './slice/index.js';
import { adminDashboardSaga } from './slice/saga.js';
import {
    selectAdminUsers,
    selectAdminIdeas,
    selectIsLoadingUsers,
    selectIsLoadingIdeas,
    selectAdminError,
    selectActiveTab,
} from './slice/selectors.js';
import { selectUser } from '../../layouts/DefaultLayout/slice/selectors.js';
import { Box, Flex, Button, Icons } from '../../components/Blocks/index.js';

export const AdminDashboard: React.FC = () => {
    useInjectReducer({ key: 'adminDashboard', reducer: adminDashboardReducer });
    useInjectSaga({ key: 'adminDashboard', saga: adminDashboardSaga });

    const dispatch = useDispatch();
    const currentUser = useSelector(selectUser);
    const users = useSelector(selectAdminUsers);
    const ideas = useSelector(selectAdminIdeas);
    const isLoadingUsers = useSelector(selectIsLoadingUsers);
    const isLoadingIdeas = useSelector(selectIsLoadingIdeas);
    const error = useSelector(selectAdminError);
    const activeTab = useSelector(selectActiveTab);

    useEffect(() => {
        dispatch(adminDashboardActions.fetchUsersRequest());
        dispatch(adminDashboardActions.fetchIdeasRequest());
    }, [dispatch]);

    const handleDeleteUser = (userId: string, userName: string) => {
        if (userId === currentUser?.id) {
            alert('You cannot delete your own admin account while logged in.');
            return;
        }
        if (window.confirm(`Are you sure you want to delete user "${userName}"?`)) {
            dispatch(adminDashboardActions.deleteUserRequest(userId));
        }
    };

    const handleDeleteIdea = (ideaId: string, ideaTitle: string) => {
        if (window.confirm(`Are you sure you want to delete idea "${ideaTitle}"?`)) {
            dispatch(adminDashboardActions.deleteIdeaRequest(ideaId));
        }
    };

    return (
        <Box>
            {/* Header Banner */}
            <Flex sx={{ justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                <Box>
                    <Flex sx={{ alignItems: 'center', gap: 2 }}>
                        <Icons.Admin sx={{ fontSize: 32, color: 'accent' }} />
                        <Box as="h1" sx={{ m: 0, fontSize: 4, color: 'text' }}>
                            Admin Control Center
                        </Box>
                    </Flex>
                    <Box sx={{ color: 'secondary', fontSize: 1, mt: 1 }}>
                        Global administrative panel for managing system users and moderating ideas.
                    </Box>
                </Box>
            </Flex>

            {error && (
                <Box
                    sx={{
                        bg: 'rgba(229, 62, 62, 0.1)',
                        color: 'danger',
                        p: 3,
                        borderRadius: 'small',
                        mb: 4,
                        fontSize: 1,
                        fontWeight: 'bold',
                    }}
                >
                    {error}
                </Box>
            )}

            {/* Tabs */}
            <Flex sx={{ gap: 2, mb: 4, borderBottom: '1px solid', borderColor: 'border', pb: 2 }}>
                <Button
                    variant={activeTab === 'users' ? 'primary' : 'outline'}
                    onClick={() => dispatch(adminDashboardActions.setActiveTab('users'))}
                    sx={{ py: 2, px: 3, fontSize: 2 }}
                >
                    Users Management ({users.length})
                </Button>
                <Button
                    variant={activeTab === 'ideas' ? 'primary' : 'outline'}
                    onClick={() => dispatch(adminDashboardActions.setActiveTab('ideas'))}
                    sx={{ py: 2, px: 3, fontSize: 2 }}
                >
                    All System Ideas ({ideas.length})
                </Button>
            </Flex>

            {/* Tab 1: User Management Table */}
            {activeTab === 'users' && (
                <Box sx={{ bg: 'white', borderRadius: 'medium', boxShadow: 'small', overflow: 'hidden' }}>
                    {isLoadingUsers && users.length === 0 ? (
                        <Flex sx={{ justifyContent: 'center', py: 5, color: 'primary', fontWeight: 'bold' }}>
                            Loading users list...
                        </Flex>
                    ) : (
                        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                            <thead>
                                <tr style={{ backgroundColor: '#f7fafc', borderBottom: '1px solid #cbd5e0' }}>
                                    <th style={{ padding: '12px 16px', fontSize: '14px' }}>Name</th>
                                    <th style={{ padding: '12px 16px', fontSize: '14px' }}>Email</th>
                                    <th style={{ padding: '12px 16px', fontSize: '14px' }}>Role</th>
                                    <th style={{ padding: '12px 16px', fontSize: '14px', textAlign: 'right' }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user) => {
                                    const userId = user.id || (user as any)._id || '';
                                    const isCurrent = userId === currentUser?.id;

                                    return (
                                        <tr key={userId} style={{ borderBottom: '1px solid #e2e8f0' }}>
                                            <td style={{ padding: '12px 16px', fontWeight: 'bold' }}>
                                                {user.name} {isCurrent && <span style={{ color: '#3182ce', fontSize: '12px' }}>(You)</span>}
                                            </td>
                                            <td style={{ padding: '12px 16px', color: '#718096' }}>{user.email}</td>
                                            <td style={{ padding: '12px 16px' }}>
                                                <span
                                                    style={{
                                                        padding: '2px 8px',
                                                        borderRadius: '4px',
                                                        fontSize: '12px',
                                                        fontWeight: 'bold',
                                                        backgroundColor: user.role === 'admin' ? '#d69e2e' : '#e2e8f0',
                                                        color: user.role === 'admin' ? '#ffffff' : '#2d3748',
                                                        textTransform: 'uppercase',
                                                    }}
                                                >
                                                    {user.role}
                                                </span>
                                            </td>
                                            <td style={{ padding: '12px 16px', textAlign: 'right' }}>
                                                <Button
                                                    variant="danger"
                                                    disabled={isCurrent}
                                                    onClick={() => handleDeleteUser(userId, user.name)}
                                                    sx={{ p: 1, px: 2, fontSize: 0 }}
                                                >
                                                    Delete
                                                </Button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    )}
                </Box>
            )}

            {/* Tab 2: Global Ideas Moderation List */}
            {activeTab === 'ideas' && (
                <Box>
                    {isLoadingIdeas && ideas.length === 0 ? (
                        <Flex sx={{ justifyContent: 'center', py: 5, color: 'primary', fontWeight: 'bold' }}>
                            Loading all platform ideas...
                        </Flex>
                    ) : ideas.length === 0 ? (
                        <Box sx={{ bg: 'white', p: 4, textAlign: 'center', borderRadius: 'medium' }}>
                            No ideas exist in the platform database.
                        </Box>
                    ) : (
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                            {ideas.map((idea) => {
                                const ideaId = idea._id || idea.id || '';
                                const ownerName = typeof idea.owner === 'object' ? idea.owner?.name : 'Unknown User';
                                const ownerEmail = typeof idea.owner === 'object' ? idea.owner?.email : '';

                                return (
                                    <Box
                                        key={ideaId}
                                        sx={{
                                            bg: 'white',
                                            p: 3,
                                            borderRadius: 'medium',
                                            boxShadow: 'small',
                                            border: '1px solid',
                                            borderColor: 'border',
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'flex-start',
                                        }}
                                    >
                                        <Box sx={{ flex: 1, mr: 3 }}>
                                            <Flex sx={{ alignItems: 'center', gap: 2, mb: 1 }}>
                                                <Box sx={{ fontWeight: 'bold', fontSize: 2, color: 'text' }}>
                                                    {idea.title}
                                                </Box>
                                                <Box sx={{ fontSize: 0, color: 'secondary' }}>
                                                    by <strong>{ownerName}</strong> ({ownerEmail})
                                                </Box>
                                            </Flex>
                                            <Box sx={{ color: 'secondary', fontSize: 1, mb: 2, lineHeight: 'body' }}>
                                                {idea.description}
                                            </Box>
                                            {idea.tags && idea.tags.length > 0 && (
                                                <Flex sx={{ gap: 1 }}>
                                                    {idea.tags.map((tag, idx) => (
                                                        <Box
                                                            key={idx}
                                                            sx={{ bg: 'muted', px: 2, py: '2px', borderRadius: 'small', fontSize: 0 }}
                                                        >
                                                            #{tag}
                                                        </Box>
                                                    ))}
                                                </Flex>
                                            )}
                                        </Box>
                                        <Button
                                            variant="danger"
                                            onClick={() => handleDeleteIdea(ideaId, idea.title)}
                                            sx={{ p: 1, px: 2, fontSize: 0, whiteSpace: 'nowrap' }}
                                        >
                                            Delete Idea
                                        </Button>
                                    </Box>
                                );
                            })}
                        </Box>
                    )}
                </Box>
            )}
        </Box>
    );
};

export default AdminDashboard;