
import { fetchReviews, deleteReview } from "../../redux/ReviewSlice";
import { useState, useEffect } from "react";
import { Text } from "./Text";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store";
import { ReviewForm } from "./ReviewForm";

interface ReviewsProps {
  hotelId: number;
}

export const Reviews = ({ hotelId }: ReviewsProps) => {
  const reviews = useSelector((state: RootState) => state.reviews.reviews);
  const user = useSelector((state: RootState) => state.login.userData);
  const [currentReview, setCurrentReview] = useState(0);
  const dispatch = useDispatch<AppDispatch>();

  const hotelReviews = reviews.filter((review) => review.hotel_id === hotelId);

  useEffect(() => {
    dispatch(fetchReviews());
  }, [dispatch]);

  const visibleReviews = hotelReviews.slice(currentReview, currentReview + 2);

  return (
    <div className="mt-8 w-full max-w-4xl px-6 py-8">
      <section className="w-full max-w-4xl px-6 py-8">
        <Text variant="h2" className="text-xl font-bold">
          Guest Reviews
        </Text>

        <div className="mt-4 flex items-center gap-3">
          <button
            type="button"
            onClick={() => setCurrentReview(Math.max(0, currentReview - 2))}
            disabled={currentReview === 0}
            className="text-2xl disabled:opacity-30"
          >
            &#8592;
          </button>

          <div className="grid flex-1 grid-cols-1 gap-4 md:grid-cols-2">
            {visibleReviews.map((review) => (
              <div
                key={review.id}
                className="rounded-xl bg-white p-4 shadow-sm"
              >
                <Text variant="p" className="text-yellow-500">
                  {"★".repeat(review.rating)}
                </Text>

                <Text variant="p" className="mt-2 text-gray-700">
                  {review.comment}
                </Text>
                <button
                    type="button"
                    onClick={async () => {
                        const confirmed = window.confirm(
                        "Are you sure you want to delete this review?"
                        );

                        if (confirmed) {
                        await dispatch(deleteReview(review.id));
                        }
                    }}
                    className="mt-3 text-sm font-medium text-red-600 hover:text-red-700"
                    >
                    Delete
            </button>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={() =>
              setCurrentReview(
                Math.min(
                  Math.max(0, hotelReviews.length - 2),
                  currentReview + 2
                )
              )
            }
            disabled={currentReview + 2 >= hotelReviews.length}
            className="text-2xl disabled:opacity-30"
          >
            &#8594;
          </button>
        </div>
      </section>
      <ReviewForm hotelId={hotelId}/>
    </div>
  );
};




