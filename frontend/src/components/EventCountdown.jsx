import { useEffect, useState } from "react";

export default function EventCountdown({ date }) {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      const diff = new Date(date) - new Date();

      if (diff <= 0) {
        setTimeLeft("Started");
        return;
      }

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor(
        (diff % (1000 * 60 * 60)) / (1000 * 60)
      );

      setTimeLeft(`${hours}h ${minutes}m`);
    }, 1000);

    return () => clearInterval(interval);
  }, [date]);

  return <span>Starts in: {timeLeft}</span>;
}
