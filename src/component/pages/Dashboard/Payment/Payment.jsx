import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useParams } from 'react-router';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import useAuth from '../../../../hooks/UseAuth';

const Payment = () => {
    const { productId } = useParams();
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const { isLoading, data: product } = useQuery({
        queryKey: ['product', productId],
        queryFn: async () => {
            const res = await axiosSecure.get(`/products/${productId}`);
            return res.data;
        }
    })

    const handlePayment = async() => {
        const paymentInfo = {
            price: product.price,
            productId: product._id,
            userEmail: user.email,
            productName: product.product_name
        }

        const res = await axiosSecure.post('/payment-checkout-session', paymentInfo);

        console.log(res.data);
        
        window.location.href = res.data.url;
    }

    if (isLoading) {
        return <div>
            <span className="loading loading-infinity loading-xl"></span>
        </div>
    }

    return (
        <div>
            <h2>Please Pay ${product.price} for : {product.product_name} </h2>
            <button onClick={handlePayment} className='btn btn-outline btn-accent text-black'>Pay</button>
        </div>
    );
};

export default Payment;