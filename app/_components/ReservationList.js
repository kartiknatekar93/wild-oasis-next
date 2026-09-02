"use client";

import { useOptimistic } from "react";

import ReservationCard from "@/app/_components/ReservationCard";
import { deletereservation } from "../_lib/actions";
export default function ReservationList({ bookings }) {
  const [optimisticbooking, optimisticDelete] = useOptimistic(
    bookings,
    (currbooking, bookingId) => {
      return currbooking.filter((booking) => booking.id !== bookingId);
    },
  );

  const handleDelete = async (bookingId) => {
    optimisticDelete(bookingId);
    await deletereservation(bookingId);
  };
  return (
    <ul className="space-y-6">
      {optimisticbooking.map((booking) => (
        <ReservationCard
          booking={booking}
          key={booking.id}
          handleDelete={handleDelete}
        />
      ))}
    </ul>
  );
}
