import { useEffect, useLayoutEffect, useState } from 'react';

function UseState_useEffect_useLayoutEffect() {
  const [count, setCount] = useState<number>(0);
  const [secondCount, setSecondCount] = useState<number>(0);

  // Возвращая коллбэк из useEffect return () => {...} мы очищаем подписки (event listeners, timeouts etc)
  // При любом изменении любого стейта useEffect без зависимостей будет каждый раз срабатывать
  useEffect(() => {
    console.log(count, 'useEffect без зависимостей, count');
    console.log(secondCount, 'useEffect без зависимостей, secondCount');
  });

  // При изменении зависимостей useEffect будет срабатывать
  useEffect(() => {
    console.log(count, 'useEffect c зависимостями (count)');
    console.log(secondCount, 'useEffect c зависимостями (secondCount)');
  }, [count]);

  // Сработает только при первом рендере
  useEffect(() => {
    console.log(count, 'useEffect c пустым массивом зависимостей (count)');
    console.log(
      secondCount,
      'useEffect c пустым массивом зависимостей (secondCount)'
    );
  }, []);

  // useLayoutEffect выполянется синхронно, вызывается до отрисовки html, можно заблокировать поток!
  // Схожее поведение как при component did mount. Будет отрабатывать раньше, чем useEffect
  useLayoutEffect(() => console.log('changes'));

  const clickHandlerCount = () => {
    setCount((prev) => prev + 1);
  };
  const clickHandlerSecondCount = () => {
    setSecondCount((prev) => prev + 1);
  };

  /* Batching - накопление изменений и применение единовременно, в одном рендере.
  Если нужно разделить рендер, используется flushSync(() => {... код, который должен отработать в отдельном рендере})
  При использовании React'a версии < 18 и необходимости применить множественные изменения стейтов в одном рендере, используется unstable_batchedUpdates(() => {... код, который должен отработать за один рендер})
  */

  return (
    <div>
      <button onClick={clickHandlerCount}>Count {count}</button>
      <button onClick={clickHandlerSecondCount}>
        secondCount {secondCount}
      </button>
    </div>
  );
}

export default UseState_useEffect_useLayoutEffect;
