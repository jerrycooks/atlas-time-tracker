import { useState, useEffect } from "react";

export default function Timer({ onTimeUpdate }) {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    let interval;
    if (running) {
      interval = setInterval(() => {
        setTime((prev) => prev + 1);
        onTimeUpdate(time + 1);
      }, 60000); // Update every 60 seconds
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [running]);

  return (
    <div>
      <p>Time Tracked: {time} minutes</p>
      <button onClick={() => setRunning(!running)}>
        {running ? "Stop" : "Start"} Tracking
      </button>
    </div>
  );
}