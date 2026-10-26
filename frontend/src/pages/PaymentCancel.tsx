
export const PaymentCancel = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800">
          Payment Cancelled
        </h1>
        <p className="mt-3 text-gray-600">
          Your payment was not completed. You can return to your bookings and try again.
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
