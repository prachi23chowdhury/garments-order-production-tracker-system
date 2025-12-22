import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';

const UsersManagement = () => {
    const axiosSecure = useAxiosSecure();
    const [searchText, setSearchText] = useState('');

    const [suspendUser, setSuspendUser] = useState(null);
    const [suspendReason, setSuspendReason] = useState('');
    const [suspendFeedback, setSuspendFeedback] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { refetch, data: users = [] } = useQuery({
        queryKey: ['users', searchText],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users?searchText=${searchText}`);
            return res.data;
        }
    });

  
    const handleToggleSuspend = (user) => {
        if (user.status === 'suspended') {
            
            Swal.fire({
                title: `Activate ${user.displayName}?`,
                icon: 'question',
                showCancelButton: true,
                confirmButtonText: 'Yes, Activate'
            }).then(async (result) => {
                if (result.isConfirmed) {
                    const res = await axiosSecure.patch(`/users/${user._id}/status`, { status: 'active' });
                    if (res.data.modifiedCount) {
                        refetch();
                        Swal.fire('Activated!', `${user.displayName} is now active.`, 'success');
                    }
                }
            });
        } else {
            // Suspend: open modal
            setSuspendUser(user);
            setIsModalOpen(true);
        }
    };

    // Delete user
    const handleDeleteUser = async (user) => {
        const result = await Swal.fire({
            title: `Delete ${user.displayName}?`,
            text: "This action cannot be undone!",
            icon: 'error',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete',
        });
        if (result.isConfirmed) {
            const res = await axiosSecure.delete(`/users/${user._id}`);
            if (res.data.deletedCount) {
                refetch();
                Swal.fire('Deleted!', `${user.displayName} has been removed.`, 'success');
            }
        }
    };

    return (
        <div>
            <h2 className='text-4xl mb-4'>Manage Users: {users.length}</h2>
            
            <input
                type="search"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                placeholder="Search users"
                className="input input-bordered mb-4 w-full max-w-sm"
            />

            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>User</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Other Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={user._id}>
                                <td>{index + 1}</td>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle h-12 w-12">
                                                <img src={user.photoURL} alt="User Avatar" />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{user.displayName}</div>
                                            <div className="text-sm opacity-50">{user.country || 'Unknown'}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>{user.email}</td>
                                <td>
                                    <select
                                        value={user.role}
                                        onChange={async (e) => {
                                            const newRole = e.target.value;
                                            if (newRole === 'admin') return; // prevent making admin
                                            const res = await axiosSecure.patch(`/users/${user._id}/role`, { role: newRole });
                                            if (res.data.modifiedCount) {
                                                refetch();
                                                Swal.fire('Success!', `${user.displayName} is now ${newRole}.`, 'success');
                                            }
                                        }}
                                        className="select select-bordered select-sm"
                                    >
                                        <option value="buyer">Buyer</option>
                                        <option value="manager">Manager</option>
                                    </select>
                                </td>
                                <td className="flex gap-2">
                                    <button onClick={() => handleToggleSuspend(user)} className="btn btn-warning btn-sm">
                                        {user.status === 'suspended' ? 'Activate' : 'Suspend'}
                                    </button>
                                    <button onClick={() => handleDeleteUser(user)} className="btn btn-error btn-sm">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Suspend Modal */}
            {isModalOpen && suspendUser && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg w-96">
                        <h3 className="text-xl font-bold mb-4">Suspend {suspendUser.displayName}</h3>
                        <input
                            type="text"
                            placeholder="Suspend Reason"
                            value={suspendReason}
                            onChange={(e) => setSuspendReason(e.target.value)}
                            className="input input-bordered w-full mb-3"
                        />
                        <textarea
                            placeholder="Why Suspend Feedback"
                            value={suspendFeedback}
                            onChange={(e) => setSuspendFeedback(e.target.value)}
                            className="textarea textarea-bordered w-full mb-3"
                        />
                        <div className="flex justify-end gap-2">
                            <button onClick={() => setIsModalOpen(false)} className="btn btn-ghost">Cancel</button>
                            <button
                                onClick={async () => {
                                    if (!suspendReason || !suspendFeedback) {
                                        Swal.fire('Error', 'Please fill all fields', 'error');
                                        return;
                                    }
                                    const res = await axiosSecure.patch(`/users/${suspendUser._id}/status`, { 
                                        status: 'suspended', 
                                        reason: suspendReason, 
                                        feedback: suspendFeedback 
                                    });
                                    if (res.data.modifiedCount) {
                                        refetch();
                                        Swal.fire('Suspended!', `${suspendUser.displayName} is now suspended.`, 'success');
                                    }
                                    setIsModalOpen(false);
                                    setSuspendReason('');
                                    setSuspendFeedback('');
                                    setSuspendUser(null);
                                }}
                                className="btn btn-warning"
                            >
                                Suspend
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UsersManagement;
