import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAuth from '../../../../hooks/UseAuth';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';

const PaymentHistory = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: payments = [], isLoading } = useQuery({
        queryKey: ['payment', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payment?email=${user.email}`);
            return res.data;
        },
        enabled: !!user?.email, // User email thaklei query cholbe
    });

    if (isLoading) return <div className="p-10 text-center">Loading...</div>;

    return (
        <div className="p-5">
            <h2 className="text-3xl mb-4 font-bold">Payment History: {payments.length}</h2>
            <div className="overflow-x-auto shadow-lg rounded-lg">
                <table className="table table-zebra w-full">
                    <thead className="bg-gray-200">
                        <tr>
                            <th>#</th>
                            <th>Product Name</th>
                            <th>Amount</th>
                            <th>Paid At</th>
                            <th>Transaction Id</th>
                        </tr>
                    </thead>
                    <tbody>
                        {payments.map((pay, index) => (
                            <tr key={pay._id}>
                                <th>{index + 1}</th>
                                {/* Dynamic Product Name */}
                                <td>{pay.productName || 'N/A'}</td>
                                <td className="font-semibold text-green-600">${pay.amount}</td>
                                {/* Date formatting */}
                                <td>{new Date(pay.paidAt).toLocaleDateString()}</td>
                                <td className="text-xs font-mono">{pay.transactionId}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PaymentHistory;