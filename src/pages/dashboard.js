import { useState } from "react";

export default function Dashboard() {
  const [time, setTime] = useState(0);

  const startTracking = () => {
    setTime((prev) => prev + 1);
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Time Tracked: {time} minutes</p>
      <button onClick={startTracking}>Start Tracking</button>
    </div>
  );
}