import { useEffect, useState } from "react";
import type { ShowWithId } from "@/types/show";

export function useShows(approved: boolean) {
  const [shows, setShows] = useState<ShowWithId[]>([]);

  useEffect(() => {
    fetch(`/api/shows?approved=${approved}`)
      .then((response) => (response.ok ? response.json() : []))
      .then(setShows);
  }, [approved]);

  return [shows, setShows] as const;
}
