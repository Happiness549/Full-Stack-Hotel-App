import { useEffect, useState } from "react";
import { getUser } from "../utils/localStoprage";

export const PaymentSuccess = () => {
    const [message, setMessage] = useState("Verifying your payment...");
    const [isSuccess, setIsSuccess] = useState(false);

    useEffect(() => {
        const verifyPayment = async () => {
            const params = new URLSearchParams(window.location.search);
            const paymentId = params.get("payment_id");
            const reference = params.get("reference");
            const token = getUser()?.token;

            if (!paymentId || !reference || !token) {
                setMessage("We could not verify your payment. Please check your bookings.");
                return;
            }

            try {
                const response = await fetch(
                    `https://full-stack-hotel-app.onrender.com/api/payments/verify?payment_id=${paymentId}&reference=${encodeURIComponent(reference)}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                const data = await response.json();

                if (!response.ok) {
                    setMessage(data.message || "Payment verification failed.");
                    return;
                }

                setMessage("Your payment was successful!");
                setIsSuccess(true);
            } catch {
                setMessage("Could not connect to verify your payment. Please try again.");
            }
        };

        verifyPayment();
    }, []);

    return (
        <div className="min-h-screen flex items-center justify-center bg-white p-6">
            <div className="text-center">
                <h1 className={`text-3xl font-bold ${isSuccess ? "text-green-700" : "text-gray-800"}`}>
                    {isSuccess ? "Payment Successful" : "Payment Status"}
                </h1>

                <p className="mt-3 text-gray-600">{message}</p>

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

