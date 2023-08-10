import React, { useCallback, useState } from 'react';
import './App.css';
import Calculator from './Calculator';

const Avatar = () => {
  return (
    <svg className="avatar" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
      <path d="M956.696128 512.75827c0 245.270123-199.054545 444.137403-444.615287 444.137403-245.538229 0-444.522166-198.868303-444.522166-444.137403 0-188.264804 117.181863-349.108073 282.675034-413.747255 50.002834-20.171412 104.631012-31.311123 161.858388-31.311123 57.297984 0 111.87909 11.128455 161.928996 31.311123C839.504032 163.650197 956.696128 324.494489 956.696128 512.75827L956.696128 512.75827M341.214289 419.091984c0 74.846662 38.349423 139.64855 94.097098 171.367973 23.119557 13.155624 49.151443 20.742417 76.769454 20.742417 26.64894 0 51.773154-7.096628 74.286913-19.355837 57.06467-31.113625 96.650247-96.707552 96.650247-172.742273 0-105.867166-76.664054-192.039781-170.936137-192.039781C417.867086 227.053226 341.214289 313.226864 341.214289 419.091984L341.214289 419.091984M513.886977 928.114163c129.883139 0 245.746984-59.732429 321.688583-153.211451-8.971325-73.739445-80.824817-136.51314-182.517917-167.825286-38.407752 34.55091-87.478354 55.340399-140.989081 55.340399-54.698786 0-104.770182-21.907962-143.55144-57.96211-98.921987 28.234041-171.379229 85.823668-188.368158 154.831344C255.507278 861.657588 376.965537 928.114163 513.886977 928.114163L513.886977 928.114163M513.886977 928.114163 513.886977 928.114163z" fill="#272636" />
    </svg>
  );
};

const gridOrder = [1, 2, 3, 14, 'table', 4, 13, 5, 12, 6, 11, 7, 10, 9, 8];

function App() {
  const [playerIncome, setPlayerIncome] = useState<string[]>(() => {
    const localIncome = localStorage.getItem('pokerUtils');
    if (!localIncome) {
      return Array(14).fill('0');
    }
    return localIncome.split(',');
  });
  const [activePlayer, setActivePlayer] = useState<number | null>(null);

  const handleCalcChange = useCallback((value: string) => {
    if (!activePlayer) {
      return;
    }
    if (isNaN(Number(value))) {
      return;
    }
    setPlayerIncome((prev) => {
      const _prev = [...prev];
      _prev.splice(activePlayer - 1, 1, value);
      localStorage.setItem('pokerUtils', _prev.join(','));
      return _prev;
    });
  }, [activePlayer]);
  const handlePlayerClick = (setNum: number) => {
    setActivePlayer(setNum);
  };
  const handleResetClick = () => {
    const income = Array(14).fill('0');
    setPlayerIncome(income);
    localStorage.setItem('pokerUtils', income.join(','));
  };

  const renderItem = (key: number | string) => {
    if (key === 'table') {
      const total = playerIncome.reduce((prev, curr) => prev + Number(curr), 0);
      return (
        <div className="table">
          <div className="total">Total: <span className={total > 0 ? 'red' : total < 0 ? 'green' : undefined}>{total}</span></div>
          <button type="button" style={{ fontSize: 20 }} onClick={handleResetClick}>reset</button>
          <Calculator value={activePlayer ? playerIncome[activePlayer - 1] : ''} onChange={handleCalcChange} />
        </div>
      );
    } else {
      return (
        <div className={'player' + (activePlayer === key ? ' player-active' : '')} onClick={() => handlePlayerClick(key as number)}>
          <span className="sit-num">{key}</span>
          {/* <input type="number" onChange={e => handleIncomeChange(e, key as number)} /> */}
          <Avatar />
          <span className="income">{playerIncome[key as number - 1].replace(/\d+/, (n) => n.replace(/(\d)(?=(?:\d{3})+$)/g, '$1,'))}</span>
        </div>
      );
    }
  };
  return (
    <div className="App">
      <div className="container">
        {gridOrder.map(_ => <React.Fragment key={_}>{renderItem(_)}</React.Fragment>)}
      </div>
    </div>
  );
}

export default App;
