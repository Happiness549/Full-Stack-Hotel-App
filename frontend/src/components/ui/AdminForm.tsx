
import React, { useState } from "react";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store";
import { closeAdminModal } from "../../redux/AdminSLice";

export const AdminForm = () => {
      const dispatch = useDispatch<AppDispatch>();

  const isOpen = useSelector((state: RootState) => state.admin.isAdminModalOpen);
  const token = useSelector((state: RootState) => state.login.token);

  const [form, setForm] = useState({
    name: "",
    surname: "",
    email: "",
    phone: "",
    password: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://full-stack-hotel-app.onrender.com/api/users/admin",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(form),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to create admin");
      }

      alert("Admin created successfully!");

      setForm({
        name: "",
        surname: "",
        email: "",
        phone: "",
        password: "",
      });

      dispatch(closeAdminModal());
    } catch (error) {
      alert(
        error instanceof Error ? error.message : "Something went wrong"
      );
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-[560px] rounded-4xl bg-white p-8">
        <form onSubmit={handleSubmit}>
          <h2 className="mb-4 text-xl font-bold">Add Admin</h2>

          <Input
            label="Name"
            name="name"
            type="text"
            placeholder="Enter name"
            value={form.name}
            onChange={handleChange}
          />

          <Input
            label="Surname"
            name="surname"
            type="text"
            placeholder="Enter surname"
            value={form.surname}
            onChange={handleChange}
          />

          <Input
            label="Email"
            name="email"
            type="email"
            placeholder="Enter email"
            value={form.email}
            onChange={handleChange}
          />

          <Input
            label="Phone"
            name="phone"
            type="tel"
            placeholder="Enter 10-digit phone number"
            value={form.phone}
            onChange={handleChange}
          />

          <Input
            label="Password"
            name="password"
            type="password"
            placeholder="Enter password"
            value={form.password}
            onChange={handleChange}
          />

          <div className="mt-4 flex gap-5">
            <Button text="Create Admin" />
            <Button
                text="Cancel"
                onClick={() => dispatch(closeAdminModal())}
                />
          </div>
        </form>
      </div>
    </div>
  );
};
