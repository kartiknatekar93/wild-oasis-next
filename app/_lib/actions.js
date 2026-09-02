"use server";
import { revalidatePath } from "next/cache";
import { supabase } from "./supabase";
import { auth, signIn, signOut } from "@/app/_lib/auth";
import { getBookings } from "./data-service";
import { redirect } from "next/navigation";

export async function signInoption() {
  await signIn("google", { redirectTo: "/account" });
}

export async function signOutoption() {
  await signOut({ redirectTo: "/account" });
}

export async function updateprofile(formData) {
  const session = await auth();
  if (!session) throw new Error("user must login");
  const nationalID = formData.get("nationalID");

  const [nationality, countryFlag] = formData.get("nationality").split("%");

  if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID)) {
    throw new Error("please provide valid id");
  }

  const updatedFields = {
    nationality,
    countryFlag,
    nationalID,
  };

  console.log(updatedFields);

  const { error } = await supabase
    .from("guests")
    .update(updatedFields)
    .eq("id", session.user.guestId)
    .select()
    .single();

  if (error) {
    throw new Error("Guest could not be updated");
  }
  revalidatePath("/account/profile");
}

export async function deletereservation(bookingId) {
  const session = await auth();
  if (!session) throw new Error("user must login");
  const getbookings = await getBookings(session.user.guestId);

  const getbookingids = getbookings.map((booking) => booking.id);

  if (!getbookingids.includes(bookingId))
    throw new Error("you are not allowed to book this id");

  const { error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", bookingId);

  if (error) {
    throw new Error("Booking could not be deleted");
  }
  revalidatePath("/account/reservations");
}

export async function updatebooking(formData) {
  const bookingId = Number(formData.get("bookingId"));
  const session = await auth();
  if (!session) throw new Error("user must login");
  const getbookings = await getBookings(session.user.guestId);

  const getbookingids = getbookings.map((booking) => booking.id);

  if (!getbookingids.includes(bookingId))
    throw new Error("you are not allowed to book this id");

  const updatedFields = {
    numGuests: Number(formData.get("numGuests")),
    observations: formData.get("observations").slice(0, 1000),
  };

  const { error } = await supabase
    .from("bookings")
    .update(updatedFields)
    .eq("id", bookingId)
    .select()
    .single();

  if (error) {
    throw new Error("Booking could not be updated");
  }

  revalidatePath(`/account/reservations/edit/${bookingId}`);

  redirect("/account/reservations");
}

export async function createBooking(booking, formData) {
  const session = await auth();
  if (!session) throw new Error("user must login");

  const newBooking = {
    ...booking,
    totalPrice: booking.cabinPrice,
    numGuests: Number(formData.get("numGuests")),
    observations: formData.get("observations").slice(0, 1000),
    status: "unconfirmed",
    hasBreakfast: false,
    isPaid: false,
    guestId: session.user.guestId,
    extrasPrice: 0,
  };

  console.log(newBooking);

  const { error } = await supabase.from("bookings").insert([newBooking]);

  if (error) {
    throw new Error("Booking could not be created");
  }

  revalidatePath(`/cabins/${booking.cabinId}`);

  redirect("/cabins/thankyou");
}
