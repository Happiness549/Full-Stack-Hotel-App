
export const PaymentSuccess = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-green-700">
          Payment Submitted
        </h1>
        <p className="mt-3 text-gray-600">
          Thank you! Your payment was submitted. We are confirming it now.
        </p>
        <a
          href="/my-bookings"
          className="mt-6 inline-block rounded-lg bg-green-700 px-6 py-3 text-white"
        >
          View My Bookings
        </a>
      </div>
    </div>
  );
};
