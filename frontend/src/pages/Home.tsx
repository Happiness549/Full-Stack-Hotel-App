import { Link } from "react-router-dom";
import { HotelList } from "../components/ui/HotelList";
import { Text } from "../components/ui/Text";

export const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50">
    
      <nav className="flex items-center justify-between bg-white px-8 py-5 shadow-sm">
        <Text variant={'h1'} className="text-2xl font-bold text-green-800">StayClear</Text>

        <div className="flex items-center gap-6">
          <Link to="/" className="text-gray-700 hover:text-green-700"> Home</Link>
          <Link to="/my-bookings" className="text-gray-700 hover:text-green-700">My Bookings</Link>
          <Link to="/favourites" className="text-gray-700 hover:text-green-700">Favourites</Link>
          <Link to="/profile" className="text-gray-700 hover:text-green-700">Profile</Link>
        </div>
      </nav>


      <section className="px-8 py-12 ml-118">
        <Text variant={'h2'} className="text-3xl font-bold text-gray-900">Find your perfect stay</Text>

        <Text variant={'p'} className="mt-3 text-gray-600">Discover comfortable stays and beautiful destinations.</Text>
      </section>

      <section className="px-8 pb-12">
    <Text variant={'h2'} className="mb-6 text-2xl font-bold text-gray-900 ml-118">Explore our hotels</Text>

  <HotelList limit={9} />
</section>
    </div>
  );
};

