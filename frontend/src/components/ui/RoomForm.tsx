import React, { useState, useEffect } from "react";
import { Input } from "../ui/Input";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../store";
import { useSelector } from "react-redux";
import type{ RootState } from "../../store";
import { Button } from "../ui/Button";


export const RoomForm = () => {
    const dispatch = useDispatch<AppDispatch>();
    const isOpen = useSelector((state: RootState) => state.rooms.isRoomsModalOpen);

    return(
        <>
        </>
    )
 }