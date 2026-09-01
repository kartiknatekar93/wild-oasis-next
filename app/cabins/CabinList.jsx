import CabinCard from "@/app/_components/CabinCard";
import { getCabins } from "../_lib/data-service";
import { unstable_noStore as nostore } from "next/cache";
export default async function CabinList({ filter }) {
  nostore();
  const cabins = await getCabins();

  let displayedcabins = cabins;

  if (filter === "small") {
    displayedcabins = cabins.filter((cabin) => cabin.maxCapacity <= 3);
  }
  if (filter === "medium") {
    displayedcabins = cabins.filter(
      (cabin) => cabin.maxCapacity > 3 && cabin.maxCapacity <= 5,
    );
  }
  if (filter === "large") {
    displayedcabins = cabins.filter(
      (cabin) => cabin.maxCapacity > 5 && cabin.maxCapacity <= 8,
    );
  }

  return (
    displayedcabins.length > 0 && (
      <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
        {displayedcabins.map((cabin) => (
          <CabinCard cabin={cabin} key={cabin.id} />
        ))}
      </div>
    )
  );
}
