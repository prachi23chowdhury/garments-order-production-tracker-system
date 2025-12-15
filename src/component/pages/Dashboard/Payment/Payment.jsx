import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import useAuth from '../../../../hooks/UseAuth';
import axios from 'axios';

const Payment = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const {
    isLoading,
    isError,
    data: product
  } = useQuery({
    queryKey: ['product', id],
    enabled: !!id,
    queryFn: async () => {
      const res = await axios.get(`http://localhost:3000/products/${id}`);
      return res.data;
    }
  });

  const handlePayment = async () => {
    if (!product || !user) return;

    const paymentInfo = {
      price: product.price,
      productId: product._id,
      userEmail: user.email,
      productName: product.product_name
    };

    try {
      const res = await axiosSecure.post(
        '/payment-checkout-session',
        paymentInfo
      );
      window.location.replace(res.data.url);
    } catch (error) {
      console.error('Payment Error:', error);
      alert('Payment failed! Please try again.');
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className="text-center mt-20 text-red-500 font-semibold">
        Product not found 😢
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="card w-96 bg-base-100 shadow-xl border">
        <div className="card-body text-center">
          <h2 className="card-title justify-center">
            Payment Confirmation
          </h2>

          <p className="text-gray-600">
            You are about to pay for:
          </p>

          <h3 className="font-semibold text-lg">
            {product.product_name}
          </h3>

          <p className="text-xl font-bold text-accent">
            ${product.price}
          </p>

          <div className="card-actions justify-center mt-4">
            <button
              onClick={handlePayment}
              className="btn btn-accent btn-outline w-full"
            >
              Proceed to Pay
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
