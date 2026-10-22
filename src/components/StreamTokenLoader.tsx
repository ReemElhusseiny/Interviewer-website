"use client";
import { useEffect } from "react";

export default function StreamTokenLoader() {
  useEffect(() => {
    fetch("/api/stream/token", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => console.log("Token response:", data))
      .catch(console.error);
  }, []);

  return <div>Loading...</div>;
}
