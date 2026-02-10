"use client";

import { useEffect, useState } from "react";

export default function Rating() {
  const [average, setAverage] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState(false);

  // Format number with commas (1,000 instead of 1000)
  const formatTotal = (num: number) => {
    return new Intl.NumberFormat("en-IN").format(num);
  };

  // Fetch existing rating on page load
  const fetchRatings = async () => {
    try {
      const res = await fetch("/api/rate-summary");
      const data = await res.json();

      if (!data.error) {
        setAverage(parseFloat(data.average));
        setTotal(data.total);
      }
    } catch  {
      console.error("Failed to fetch ratings");
    }
  };

  useEffect(() => {
  const loadRatings = async () => {
    await fetchRatings();
  };

  loadRatings();
}, []);


  const submitRating = async (rating: number) => {
    setLoading(true);

    const res = await fetch("/api/rate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ rating }),
    });

    const data = await res.json();

    if (!data.error) {
      setAverage(parseFloat(data.average));
      setTotal(data.total);
    }

    setLoading(false);
  };

  return (
    <div className="mt-6 text-center">
      <div className="text-xl font-semibold">
        ⭐ {average} ({formatTotal(total)})
      </div>

      <div className="flex justify-center gap-2 mt-3">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            disabled={loading}
            onClick={() => submitRating(star)}
            className="text-2xl hover:scale-110 transition"
          >
            ⭐
          </button>
        ))}
      </div>
    </div>
  );
}
