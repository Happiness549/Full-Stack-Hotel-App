import React, { useState, useEffect } from "react";
import { Input } from "../ui/Input";
import { useDispatch } from "react-redux";
import { Button } from "../ui/Button";
import {addHotel, updateListItem, clearEditHotel} from "../../redux/HotelSlice";
import {uploadHotelImage} from '../../redux/ImageSlice'
import type { AppDispatch } from "../../store";
import { useSelector } from "react-redux";
import type{ RootState } from "../../store";


export const HotelForm = () => { 
  const dispatch = useDispatch<AppDispatch>();
  const isOpen = useSelector((state: RootState) => state.hotels.isHotelModalOpen);
  const editingList = useSelector((state: RootState) => state.hotels.editingHotel);
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState("");

  const [form, setForm] = useState({
    name: "",
    star_rating: 0,
    address: "",
    city: "",
    country: "",
    description: "",
    facilities: "",
  });

  useEffect(() => {
  if (editingList) {
    setForm({
      name: editingList.name,
      star_rating: editingList.star_rating,
      address: editingList.address || "",
      city: editingList.city,
      country: editingList.country,
      description: editingList.description,
      facilities: editingList.facilities,
    });
  }
}, [editingList]);


const handleChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
) => {
  const { name, value } = e.target;

  setForm((prev) => ({
    ...prev,
    [name]: name === "star_rating" ? Number(value) : value,
  }));
};

const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];

  if (!file) return;

  setImage(file);
  setImagePreview(URL.createObjectURL(file));
};

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    if (editingList) {
      await dispatch(
        updateListItem({
          ...editingList,
          name: form.name,
          star_rating: form.star_rating,
          address: form.address,
          city: form.city,
          country: form.country,
          description: form.description,
          facilities: form.facilities,
        })
      ).unwrap();
    } else {
      const createdHotel = await dispatch(
        addHotel({
          name: form.name,
          star_rating: form.star_rating,
          address: form.address,
          city: form.city,
          country: form.country,
          description: form.description,
          facilities: form.facilities,
        })
      ).unwrap();

      if (image && createdHotel.id !== undefined) {
        await dispatch(
          uploadHotelImage({
            hotelId: createdHotel.id,
            image,
          })
        ).unwrap();
      }
    }

    setForm({
      name: "",
      star_rating: 0,
      address: "",
      city: "",
      country: "",
      description: "",
      facilities: "",
    });

    setImage(null);
    setImagePreview("");
    dispatch(clearEditHotel());
  } catch (error) {
    console.error("Error saving hotel:", error);
  };
  dispatch(clearEditHotel());
};


   if (!isOpen) return null;

  return (
    <>
     <div className="fixed inset-0 flex  items-center justify-center bg-black/40 z-50">
     <div className="bg-white rounded-4xl p-8 w-140">
      <form onSubmit={handleSubmit}>
        <Input
          label="Hotel name"
          placeholder="Enter your list title"
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
        />

        <Input
            label="Star Rating"
            placeholder="Enter the star rating"
            type="number"
            name="star_rating"
            value={String(form.star_rating)}
            onChange={handleChange}
            />
        <Input
         label='Adress'
         name="address"
         type="text"
         value={form.address}
         placeholder="Add notes"
         onChange={handleChange}
        
        />
<Input
          label="City"
          placeholder="Enter city"
          type="text"
          name="city"
          value={form.city}
          onChange={handleChange}
        />

         <Input
          label="Country"
          type="text"
          name="country"
          placeholder="Add country"
          value={form.country}
          onChange={handleChange}
        />

        <Input
          label="Description"
          placeholder="Enter description"
          type="text"
          name="description"
          value={form.description}
          onChange={handleChange}
        />

         <Input
          label="Facilities"
          placeholder="Enter facilities"
          type="text"
          name="facilities"
          value={form.facilities}
          onChange={handleChange}
        />



        

        <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
        />

        {imagePreview && (
        <img
            src={imagePreview}
            alt="Hotel preview"
            className="mt-3 h-40 w-full rounded-t-xl object-cover"
        />
        )}

        <div className="flex gap-5 mt-3">
           <Button text="Submit" />
           <Button text="Cancel" onClick={() => dispatch(clearEditHotel())}/>
        </div>

       
      </form>
      </div>
      </div>
    </>
  );
};