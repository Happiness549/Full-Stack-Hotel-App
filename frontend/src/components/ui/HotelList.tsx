import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '../../store';
import { useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchHotels } from '../../redux/HotelSlice';
import { setSearchTerm } from '../../redux/SearchSlice';
import { HotelCard } from '../../components/ui/HotelCard';

interface HotelListProps {
  limit?: number;
}

export const HotelList: React.FC<HotelListProps> = ({limit}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [searchParams, setSearchParams] = useSearchParams();

  const hotels = useSelector((state: RootState) => state.hotels.hotels);
  const query = useSelector((state: RootState) => state.search.searchTerm);

  // Fetch hotels
  useEffect(() => {
    dispatch(fetchHotels());
  }, [dispatch]);

  // Update URL when the search changes
  useEffect(() => {
    const params = new URLSearchParams(searchParams);

    if (query.trim()) {
      params.set('category', query.trim());
    } else {
      params.delete('category');
    }

    setSearchParams(params);
  }, [query]);

  // Update search when the URL changes
  useEffect(() => {
    const categoryUrl = searchParams.get('category') || '';

    if (categoryUrl !== query) {
      dispatch(setSearchTerm(categoryUrl));
    }
  }, [searchParams, query, dispatch]);

const filteredLists = useMemo(() => {
  let result = [...hotels];

  if (query.trim()) {
    const lowerQuery = query.trim().toLowerCase();

    result = result.filter(
      (hotel) =>
        hotel.name.toLowerCase().includes(lowerQuery) ||
        hotel.city.toLowerCase().includes(lowerQuery)
    );
  }

  return result;
}, [hotels, query]);

  return (
    <>
      <p>{filteredLists.length} hotels found</p>

      <div className="flex flex-wrap gap-5">
        {filteredLists.slice(0, limit).map((hotelItem) => (
        <HotelCard key={hotelItem.id}
         HotelList={hotelItem} />
        ))}
      </div>
    </>
  );
};