import { memo, useCallback, useMemo, useRef, useState } from 'react';

interface IAppChild {
  funcHandler: () => void;
}

const MemoChild = memo(function AppChild({ funcHandler }: IAppChild) {
  console.log('Memo AppChild render');

  return <button onClick={funcHandler}>Some func</button>;
});

// Каждрый раз при изменении параметров / стейта, происходит поверхностное сравнение компонента с самим собой.
//Все ссылки на объекты / функции / переменные внутри объекта будут обновлены
// При наличии тяжелых вычислений или передачи функций в дочерние компоненты - всё будет пересчитано / обновлены ссылки

function UseMemo_useCallBack_memo() {
  const [count, setCount] = useState<number>(0);
  const [secondCount, setSecondCount] = useState<number>(0);
  const ref = useRef<HTMLDivElement>(null);

  // При изменении secondCount, перерасчет не происходит
  const someHardCalc = useMemo(() => {
    console.time();
    let result = 0;
    for (let i = 0; i < 1000000000; i++) {
      result += Math.sqrt(i);
    }
    console.timeEnd();
    return result;
  }, [count]);

  // При изменении count, ссылка на текущую функцию сохраняется, ререндер дочернего компонента MemoChild не происходит
  const funcHandler = useCallback(() => {
    console.log(secondCount);
  }, [secondCount]);

  return (
    <div>
      <button onClick={() => setCount((prev) => prev + 1)}>
        Count {count}
      </button>
      <button onClick={() => setSecondCount((prev) => prev + 1)}>
        secondCount {secondCount}
      </button>

      <div>Hard calculations {someHardCalc}</div>

      <div ref={ref}>Hello</div>
      <MemoChild funcHandler={funcHandler} />
    </div>
  );
}

export default UseMemo_useCallBack_memo;
