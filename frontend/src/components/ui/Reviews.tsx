import { addReview } from "../../redux/ReviewSlice";
import {useState, useEffect } from 'react'
import {Text} from './Text'
import  {useDispatch} from 'react-redux'
import { useSelector} from "react-redux";
import type{ AppDispatch, RootState } from "../../store";
import { fetchReviews } from "../../redux/ReviewSlice";


interface ReviewsProps {
  hotelId: number;
}

export const Reviews = ({hotelId}: ReviewsProps) => {
    const reviews = useSelector((state: RootState) => state.reviews.reviews);

    const dispatch = useDispatch<AppDispatch>();
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState("");

    useEffect(() => {
     dispatch(fetchReviews());
    }, [dispatch]);
   

    return(
        <>
        <div className="mt-8 w-full max-w-4xl px-6 py-8">
        <Text variant="h2" className="text-xl font-bold">Write a Review</Text>

        <form
            onSubmit={async (e) => {
                e.preventDefault();

                const result = await dispatch(
                    addReview({ hotelId, rating, comment })
                );

                if (addReview.fulfilled.match(result)) {
                    setRating(5);
                    setComment("");
                }
            }}
        >
            <div>
            <Text variant="p" className="mb-2 text-gray-700">Rating</Text>

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

            <button
            type="submit"
            className="rounded-lg bg-[#7E9E85] px-5 py-2 text-white hover:opacity-90"
            >
            Submit Review
            </button>
        </form>
        </div>
        </>
    )
}



