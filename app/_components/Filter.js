"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
function Filter() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const activefilter = searchParams.get("capacity") ?? "all";

  function handleclick(filter) {
    const params = new URLSearchParams(searchParams);
    params.set("capacity", filter);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return (
    <div className="flex gap-2 py-5 py-2 justify-end">
      <Button activefilter={activefilter} handleclick={handleclick} size="all">
        All Cabins
      </Button>
      <Button
        activefilter={activefilter}
        handleclick={handleclick}
        size="small"
      >
        1-3 guests
      </Button>
      <Button
        activefilter={activefilter}
        handleclick={handleclick}
        size="medium"
      >
        4-5 guests
      </Button>
      <Button
        activefilter={activefilter}
        handleclick={handleclick}
        size="large"
      >
        6-8 guests
      </Button>
    </div>
  );
}

function Button({
  activefilter,
  handleclick = { handleclick },
  children,
  size,
}) {
  return (
    <button
      className={`border-[1px] border-solid py-1 px-1 ${activefilter === activefilter ? "" : ""}`}
      onClick={() => handleclick(size)}
    >
      {children}
    </button>
  );
}

export default Filter;
