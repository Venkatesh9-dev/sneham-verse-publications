"use client";

import { useEffect, useState } from "react";

export default function Rating() {
  const [average, setAverage] = useState<number>(0);
  const [count, setCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  // Format count with commas
  const formatCount = (num: number) => {
    return new Intl.NumberFormat("en-IN").format(num);
  };

  useEffect(() => {
    const loadRatings = async () => {
      try {
        const res = await fetch("/api/rate-summary", {
          cache: "no-store",
        });

        const data = await res.json();

        if (!data.error) {
          setAverage(Number(data.average) || 0);
          setCount(Number(data.count) || 0);
        }
      } catch (error) {
        console.error("Failed to fetch ratings", error);
      }
    };

    loadRatings();
  }, []);

  const submitRating = async (rating: number) => {
    try {
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
        // Re-fetch updated summary
        const summaryRes = await fetch("/api/rate-summary", {
          cache: "no-store",
        });

        const summaryData = await summaryRes.json();

        if (!summaryData.error) {
          setAverage(Number(summaryData.average) || 0);
          setCount(Number(summaryData.count) || 0);
        }
      }
    } catch (error) {
      console.error("Failed to submit rating", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-6 text-center">
      <div className="text-xl font-semibold">
        ⭐ {average} ({formatCount(count)})
      </div>

      <div className="flex justify-center gap-2 mt-3">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            disabled={loading}
            onClick={() => submitRating(star)}
            className="text-2xl hover:scale-110 transition disabled:opacity-50"
          >
            ⭐
          </button>
        ))}
      </div>
    </div>
  );
}
