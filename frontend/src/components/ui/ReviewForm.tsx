
import { addReview, updateReview, fetchReviews } from "../../redux/ReviewSlice";
import { useState, useEffect } from "react";
import { Text } from "./Text";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store";

interface ReviewFormProps {
  hotelId: number;
}

export const ReviewForm = ({ hotelId }: ReviewFormProps) => {
  const reviews = useSelector((state: RootState) => state.reviews.reviews);
  const dispatch = useDispatch<AppDispatch>();

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [editingReviewId, setEditingReviewId] = useState<number | null>(null);

  const hotelReviews = reviews.filter((review) => review.hotel_id === hotelId);

  useEffect(() => {
    dispatch(fetchReviews());
  }, [dispatch]);

  return (
    <div className="mt-8 w-full max-w-4xl px-6 py-8">
      <Text variant="h2" className="text-xl font-bold">
        Write a Review
      </Text>

      <form
        onSubmit={async (e) => {
          e.preventDefault();

          if (editingReviewId !== null) {
            const result = await dispatch(
              updateReview({ id: editingReviewId, rating, comment })
            );

            if (updateReview.fulfilled.match(result)) {
              setEditingReviewId(null);
              setRating(5);
              setComment("");
            }
          } else {
            const result = await dispatch(
              addReview({ hotelId, rating, comment })
            );

            if (addReview.fulfilled.match(result)) {
              setRating(5);
              setComment("");
            }
          }
        }}
        className="mt-4 space-y-4"
      >
        <div>
          <Text variant="p" className="mb-2 text-gray-700">
            Rating
          </Text>

          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                className={`text-2xl ${
                  star <= rating ? "text-yellow-500" : "text-gray-300"
                }`}
              >
                ★
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="mb-2 block text-gray-700">Comment</label>

          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
            rows={4}
            className="w-full rounded-lg border border-gray-300 p-3"
            placeholder="Share your experience..."
          />
        </div>

        <div>
          <label className="mb-2 block text-gray-700">
            Edit an existing review
          </label>

          <select
            value={editingReviewId ?? ""}
            onChange={(e) => {
              const id = Number(e.target.value);
              const review = hotelReviews.find((item) => item.id === id);

              if (review) {
                setEditingReviewId(review.id);
                setRating(review.rating);
                setComment(review.comment);
              } else {
                setEditingReviewId(null);
                setRating(5);
                setComment("");
              }
            }}
            className="w-full rounded-lg border border-gray-300 p-3"
          >
            <option value="">Write a new review</option>

            {hotelReviews.map((review) => (
              <option key={review.id} value={review.id}>
                {review.comment}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="rounded-lg bg-[#7E9E85] px-5 py-2 text-white hover:opacity-90"
        >
          {editingReviewId !== null ? "Update Review" : "Submit Review"}
        </button>
      </form>
    </div>
  );
};
