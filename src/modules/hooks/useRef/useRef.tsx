/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useRef, useState } from 'react';

// useRef сохраняет записанное в него значение даже при ререндерах

function App() {
  const [time, setTime] = useState<number>(0);
  const timerRef = useRef<number>(0);

  const startTimer = () => {
    timerRef.current = setTimeout(() => {
      console.log('start timer');
      setTime((prev) => prev + 1);
    }, 1000);
  };

  useEffect(() => {
    return () => clearTimeout(timerRef.current);
  }, []);
  return (
    <div>
      <h2>Timer: {time} sec.</h2>
      <button onClick={startTimer}>Start timer</button>
    </div>
  );
}

export default App;
