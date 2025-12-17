import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';


const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const axiosSecure = useAxiosSecure();

  const [paymentInfo, setPaymentInfo] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!sessionId) {
      setLoading(false);
      return;
    }

    axiosSecure
      .patch(`/payment-success?session_id=${sessionId}`)
      .then((res) => {
        if (res.data.success) {
          setPaymentInfo({
            transactionId: res.data.transactionId,
            trackingId: res.data.trackingId,
          });
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [sessionId, axiosSecure]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl">Processing payment...</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-20 p-8 bg-white shadow rounded text-center">
      <h2 className="text-3xl font-bold text-green-600 mb-4">
        Payment Successful!
      </h2>
      <p><b>Transaction ID:</b> {paymentInfo.transactionId}</p>
      <p><b>Tracking ID:</b> {paymentInfo.trackingId}</p>
    </div>
  );
};

export default PaymentSuccess;
