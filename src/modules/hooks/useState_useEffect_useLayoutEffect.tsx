import { useEffect, useLayoutEffect, useState } from 'react';

function useState_useEffect_useLayoutEffect() {
  const [count, setCount] = useState<number>(0);
  const [secondCount, setSecondCount] = useState<number>(0);

  useEffect(() => {
    console.log(count, 'useEffect без зависимостей, count');
    console.log(secondCount, 'useEffect без зависимостей, secondCount');
  });

  useEffect(() => {
    console.log(count, 'useEffect c зависимостями (count)');
    console.log(secondCount, 'useEffect c зависимостями (secondCount)');
  }, [count, secondCount]);

  useEffect(() => {
    console.log(count, 'useEffect c пустым массивом зависимостей (count)');
    console.log(
      secondCount,
      'useEffect c пустым массивом зависимостей (secondCount)'
    );
  }, []);

  useLayoutEffect(() => console.log('changes'));

  return (
    <div>
      <button onClick={() => setCount((prev) => prev + 1)}>
        Count {count}
      </button>
      <button onClick={() => setSecondCount((prev) => prev + 1)}>
        secondCount {secondCount}
      </button>
    </div>
  );
}

export default useState_useEffect_useLayoutEffect;
