import { useQuery } from '@tanstack/react-query';
import React from 'react';

import { FaEye, FaUserCheck } from 'react-icons/fa';
import { IoPersonRemoveSharp } from 'react-icons/io5';
import { FaTrashCan } from 'react-icons/fa6';

import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const ApproveManager = () => {
    const axiosSecure = useAxiosSecure();

    const { refetch, data: managers = [] } = useQuery({
        queryKey: ['managers', 'pending'],
        queryFn: async () => {
            const res = await axiosSecure.get('/managers');
            return res.data;
        }
    })

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

    const handleApproval = manager => {
        updateRiderStatus(manager, 'approved');
    }

    const handleRejection = manager => {
        updateRiderStatus(manager, 'rejected')
    }

    return (
        <div>
            <h2 className="text-5xl">Manager Pending Approval: {managers.length} </h2>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
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
                        {
                            managers.map((manager, index) => <tr>
                                <th>{index + 1}</th>
                                <td>{manager.name}</td>
                                <td>{manager.email}</td>
                                <td>{manager.warehouse}</td>
                                <td>
                                    <p className={`${manager.status === 'approved' ? 'text-green-800' : 'text-red-500'}`}>{manager.status}</p>
                                </td>
                                <td>{manager.experience}</td>
                                <td>
                                    <button
                                         className='btn'>
                                        <FaEye></FaEye>
                                    </button>
                                    <button
                                        onClick={() => handleApproval(manager)} className='btn'>
                                        <FaUserCheck />
                                    </button>
                                    <button
                                        onClick={() => handleRejection(manager)}
                                        className='btn'>
                                        <IoPersonRemoveSharp />
                                    </button>
                                    <button className='btn'>
                                        <FaTrashCan />
                                    </button>
                                </td>
                            </tr>)
                        }


                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ApproveManager;