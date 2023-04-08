import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

const gridOrder = [3, 4, 5, 6, 7, 8, 2, 'table', 9, 1, 'dealer', 10];

function App() {
  const [playerIncome, setPlayerIncome] = useState<number[]>(() => Array(10).fill(0));

  const handleIncomeChange = (e: React.ChangeEvent<HTMLInputElement>, sitNum: number) => {
    const value = Number(e.target.value);
    if (isNaN(value)) {
      return;
    }
    setPlayerIncome((prev) => {
      const _prev = [...prev];
      _prev.splice(sitNum - 1, 1, value);
      return _prev;
    });
  };
  const renderItem = (key: number | string) => {
    if (key === 'table') {
      const total = playerIncome.reduce((prev, curr) => prev + curr, 0);
      return (
        <div className="table">
          <div>Total: <span className={total > 0 ? 'red' : total < 0 ? 'green' : undefined}>{total}</span></div>
        </div>
      );
    } else if (key === 'dealer') {
      return (<div className="dealer">Dealer</div>);
    } else {
      return (
        <div className="player">
          <span className="sit-num">{key}</span>
          <input type="number" onChange={e => handleIncomeChange(e, key as number)} />
          <span>total: </span>
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
