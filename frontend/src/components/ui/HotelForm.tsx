import React, { useState, useEffect } from "react";
import { Input } from "../ui/Input";
import { useDispatch } from "react-redux";
import { Button } from "../ui/Button";
import {addHotel} from "../../redux/HotelSlice";
import type { AppDispatch } from "../../store";
import { useSelector } from "react-redux";
import type{ RootState } from "../../store";

interface ListFormProps{
    listId: number;
}

export const ListForm = ({ listId }: ListFormProps) => { 
  const dispatch = useDispatch<AppDispatch>();
  const isOpen = useSelector((state: RootState) => state.hotels.isHotelModalOpen);
  const editingList = useSelector((state: RootState) => state.hotels.editingHotel);

  const [form, setForm] = useState({
    name: "",
    star_rating: "",
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
      [name]: value,
    }));
  };

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      setForm((prev) => ({
        ...prev,
        image: reader.result as string,
      }));
    };

    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();

  if (editingList) {
    dispatch(
      updateListItem({
        ...editingList,
        title: form.title,
        category: form.category,
        notes: form.notes,
        Quantity: form.Quantity,
        image: form.image,
        listId: listId,
      })
    );
  } else {
    dispatch(
      addHotel({
        listId: listId,
        title: form.title,
        category: form.category,
        notes: form.notes,
        Quantity: form.Quantity,
        image: form.image,
      })
    );
  }

  setForm({
    title: "",
    category: "",
    notes: "",
    Quantity: "",
    image: "",
  });

  dispatch(clearEditList());
};


   if (!isOpen) return null;

  return (
    <>
     <div className="fixed inset-0 flex  items-center justify-center bg-black/40 z-50">
     <div className="bg-white rounded-4xl p-8 w-140">
      <form onSubmit={handleSubmit}>
        <Input
          label="Title"
          placeholder="Enter your list title"
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
        />

        <Input
          label="Category"
          placeholder="Enter your list title"
          type="text"
          name="category"
          value={form.category}
          onChange={handleChange}
        />
        <Input
        label='Notes'
         name="notes"
          value={form.notes}
          placeholder="Add notes"
          onChange={handleChange}
        
        />

        <Input
          label="Quantity"
          type="number"
          name="Quantity"
          placeholder="Add quantity"
          value={form.Quantity}
          onChange={handleChange}
        />

        <label>Image</label>

        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />

        {form.image && (
          <img
            src={form.image}
            alt="Selected item"
            className='w-15 h-15'
          />
        )}

        <div className="flex gap-5 mt-3">
           <Button text="Submit" />
           <Button text="Cancel" onClick={() => dispatch(clearEditList())}/>
        </div>

       
      </form>
      </div>
      </div>
    </>
  );
};