import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';

import { FaEye, FaUserCheck } from 'react-icons/fa';
import { IoPersonRemoveSharp } from 'react-icons/io5';

import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import SuspendModal from '../SuspendModal/SuspendModal';

const ApproveManager = () => {
    const axiosSecure = useAxiosSecure();

    const { refetch, data: managers = [] } = useQuery({
        queryKey: ['managers', 'pending'],
        queryFn: async () => {
            const res = await axiosSecure.get('/managers');
            return res.data;
        }
    });

    const [SuspendModalOpen, setRejectModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const updateRiderStatus = (manager, status) => {
        const updateInfo = { status: status, email: manager.email }
        axiosSecure.patch(`/managers/${manager._id}`, updateInfo)
            .then(res => {
                if (res.data.modifiedCount) {
                    refetch();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `Manager status is set to ${status}.`,
                        showConfirmButton: false,
                        timer: 2000
                    });
                }
            })
    }

    const handleView = (manager) => {
        Swal.fire({
            title: 'Manager Details',
            html: `
              <div style="text-align:left">
                <p><b>Name:</b> ${manager.name}</p>
                <p><b>Email:</b> ${manager.email}</p>
                <p><b>Warehouse:</b> ${manager.warehouse}</p>
                <p><b>Experience:</b> ${manager.experience}</p>
                <p><b>Status:</b> ${manager.status}</p>
              </div>
            `,
            confirmButtonText: 'Close'
        });
    };

    const handleApproval = (manager) => {
        updateRiderStatus(manager, 'approved');
    }

    const handleRejection = (manager) => {
        setSelectedUser({ ...manager, role: "manager" });
        setRejectModalOpen(true);
    }

    return (
        <div className="p-6">
            <h2 className="text-3xl font-bold mb-4">Manager Pending Approval: {managers.length}</h2>
            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Warehouse</th>
                            <th>Application Status</th>
                            <th>Work Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {managers.map((manager, index) => (
                            <tr key={manager._id}>
                                <th>{index + 1}</th>
                                <td>{manager.name}</td>
                                <td>{manager.email}</td>
                                <td>{manager.warehouse}</td>
                                <td>
                                    <p className={`${manager.status === 'approved' ? 'text-green-800' : 'text-red-500'}`}>{manager.status}</p>
                                </td>
                                <td>{manager.experience}</td>
                                <td className="space-x-1 flex justify-center">
                                    <button onClick={() => handleView(manager)} className='btn'><FaEye /></button>
                                    <button onClick={() => handleApproval(manager)} className='btn'><FaUserCheck /></button>
                                    <button onClick={() => handleRejection(manager)} className='btn'><IoPersonRemoveSharp /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Reject Modal */}
            <SuspendModal
                open={SuspendModalOpen}
                onClose={() => setRejectModalOpen(false)}
                user={selectedUser}
                refetch={refetch}
            />
        </div>
    );
};

export default ApproveManager;
