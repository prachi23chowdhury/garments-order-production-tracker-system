import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const [paymentInfo, setPaymentInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const sessionId = searchParams.get('session_id');
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    if (sessionId) {
      axiosSecure
        .patch(`/payment-success?session_id=${sessionId}`)
        .then((res) => {
          setPaymentInfo({
            transactionId: res.data.transactionId,
            trackingId: res.data.trackingId,
          });
        })
        .catch((err) => console.error(err))
        .finally(() => setLoading(false));
    }
  }, [sessionId, axiosSecure]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl font-medium text-gray-600">Processing payment...</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-20 p-8 bg-white shadow-lg rounded-xl text-center">
      <h2 className="text-4xl font-bold text-green-600 mb-6">Payment Successful!</h2>
      <p className="text-lg text-gray-700 mb-2">
        <span className="font-semibold">Transaction ID:</span> {paymentInfo.transactionId}
      </p>
      <p className="text-lg text-gray-700">
        <span className="font-semibold">Parcel Tracking ID:</span> {paymentInfo.trackingId}
      </p>
    </div>
  );
};

export default PaymentSuccess;
