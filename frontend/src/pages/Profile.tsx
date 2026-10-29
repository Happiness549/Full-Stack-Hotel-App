import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store";
import { updateUser } from "../redux/LoginSlice";
import { Text } from "../components/ui/Text";
import type { UserData } from "../redux/RegisterSlice";
import { Link } from "react-router-dom";

export const Profile = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState<UserData | null>(null);

     const userData = useSelector((state: RootState) => state.login.userData);

        if (!userData) {
            return <p className="p-6">Please log in to view your profile.</p>;
        }

  
return (
  <div className="min-h-screen bg-gray-50">
      <nav className="flex items-center justify-between bg-white px-8 py-5 shadow-sm mb-10">
        <Text variant={'h1'} className="text-2xl font-bold text-green-800">StayClear</Text>

        <div className="flex items-center gap-6">
          <Link to="/" className="text-gray-700 hover:text-green-700"> Home</Link>
          <Link to="/my-bookings" className="text-gray-700 hover:text-green-700">My Bookings</Link>
          <Link to="/favourites" className="text-gray-700 hover:text-green-700">Favourites</Link>
          <Link to="/profile" className="text-gray-700 hover:text-green-700">Profile</Link>
        </div>
      </nav>
    <div className="mx-auto max-w-3xl">
      <Text variant="h2" className="mb-2 text-2xl font-bold text-gray-800">
        My Profile
      </Text>
      <p className="mb-6 text-sm text-gray-500">
        Manage your personal information
      </p>

      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">
              Personal Details
            </h3>
            <p className="text-sm text-gray-500">
              Your account information
            </p>
          </div>

          {!isEditing && (
            <button
              type="button"
              onClick={() => {
                setFormData(userData);
                setIsEditing(true);
              }}
              className="rounded-lg bg-[#7E9E85] px-4 py-2 text-sm text-white hover:opacity-90"
            >
              Edit Profile
            </button>
          )}
        </div>

        {!isEditing ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <p className="text-sm text-gray-500">Name</p>
              <p className="mt-1 font-medium text-gray-800">
                {userData.name}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Surname</p>
              <p className="mt-1 font-medium text-gray-800">
                {userData.surname}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="mt-1 break-words font-medium text-gray-800">
                {userData.email}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Phone</p>
              <p className="mt-1 font-medium text-gray-800">
                {userData.phone || "Not provided"}
              </p>
            </div>
          </div>
        ) : (
          formData && (
            <form
              onSubmit={async (e) => {
                e.preventDefault();

                const result = await dispatch(updateUser(formData));

                if (updateUser.fulfilled.match(result)) {
                  setIsEditing(false);
                }
              }}
              className="grid grid-cols-1 gap-4 sm:grid-cols-2"
            >
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-600">
                  Name
                </label>
                <input
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-[#7E9E85]"
                  required
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-600">
                  Surname
                </label>
                <input
                  value={formData.surname}
                  onChange={(e) =>
                    setFormData({ ...formData, surname: e.target.value })
                  }
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-[#7E9E85]"
                  required
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-600">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-[#7E9E85]"
                  required
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-600">
                  Phone
                </label>
                <input
                  value={formData.phone ?? ""}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-[#7E9E85]"
                />
              </div>

              <div className="flex gap-3 sm:col-span-2">
                <button
                  type="submit"
                  className="rounded-lg bg-[#7E9E85] px-4 py-2 text-sm text-white hover:opacity-90"
                >
                  Save Changes
                </button>

                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
              </div>
            </form>
          )
        )}
      </div>
    </div>
  </div>
);
}
