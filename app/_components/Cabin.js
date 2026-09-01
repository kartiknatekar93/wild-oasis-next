import CabinList from "@/app/cabins/CabinList";
import Filter from "@/app/_components/Filter";
import ReservationReminder from "@/app/_components/ReservationReminder";
export default function Cabin({ filter }) {
  return (
    <div>
      <Filter />
      <CabinList filter={filter} />
      <ReservationReminder />
    </div>
  );
}
