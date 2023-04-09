import React, { FC, useState } from 'react';
import './Calculator.css';

const gridOrder = [7, 8, 9, 4, 5, 6, 1, 2, 3, 0, '-', '-1'];

const Backspace = () => {
  return (
    <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3609">
      <path d="M845.21415111 209.07804445H334.90716445c-24.46677333 0-47.76846222 11.06830222-63.49710223 30.29219555L72.18062222 478.21255111l-0.58254222 0.58254222c-6.99050667 9.32067555-10.48576 20.97152-10.48576 33.20490667 0 12.81592889 4.66033778 25.63185778 12.81592889 36.11761778L271.41006222 785.79484445c15.72864 18.64135111 39.03032889 29.70965333 63.49710223 29.70965333h510.30698666c44.85575111 0 80.97336889-36.11761778 80.97336889-80.97336889V290.05141333c0-44.85575111-36.11761778-80.97336889-80.97336889-80.97336888zM684.43249778 623.26556445c-5.82542222 5.82542222-13.39847111 8.73813333-20.97152 8.73813333-8.15559111 0-15.72864-2.91271111-20.97152-8.73813333l-68.73998223-68.73998223-68.73998222 68.73998223c-5.82542222 5.82542222-13.39847111 8.73813333-20.97152 8.73813333-16.31118222 0-29.70965333-13.39847111-29.70965333-29.70965333 0-8.15559111 2.91271111-15.72864 8.73813333-20.97152l68.73998222-68.73998223-69.32252444-69.32252444c-11.65084445-11.65084445-11.65084445-30.29219555 0-41.94304s30.29219555-11.65084445 41.94304 0l68.73998222 68.73998222 68.73998222-68.73998222c11.65084445-11.65084445 30.29219555-11.65084445 41.94304 0.58254222a29.53443555 29.53443555 0 0 1 0 41.94304L615.69251555 512l68.73998223 68.73998222c11.65084445 11.65084445 11.65084445 30.87473778 0 42.52558223z" fill="#272636" />
    </svg>
  );
};

interface CalculatorProps {
  value: string;
  onChange: (value: string) => void;
}

const Calculator: FC<CalculatorProps> = (props) => {
  const { value, onChange } = props;
  const negative = value.indexOf('-') === 0;

  const handleNegativeClick = () => {
    if (negative) {
      onChange(value.replace('-', ''));
    } else {
      onChange('-' + value);
    }
  };
  const handleBackspaceClick = () => {
    const abs = value.replace('-', '');
    if (abs.length > 0) {
      if (abs.length === 1) {
        onChange((negative ? '-' : '') + '0');
      } else {
        onChange(value.slice(0 ,value.length - 1));
      }
    }
  };
  const handleNumberClick = (num: number) => {
    if (value.replace('-', '') === '0') {
      onChange((negative ? '-' : '') + num);
    } else {
      onChange(value + num);
    }
  };

  const renderItem = (key: number | string) => {
    if (key === '-') {
      return (
        <div className={'negative' + (negative ? ' negative-active' : '')} onClick={handleNegativeClick}>
          -
        </div>
      );
    } else if (key === '-1') {
      return (
        <div className="backspace" onClick={handleBackspaceClick}>
          <Backspace />
        </div>
      );
    } else {
      return (
        <div className="calc-number" onClick={() => handleNumberClick(key as number)}>
          {key}
        </div>
      );
    }
  };

  return (
    <div className="Calculator">
      {gridOrder.map(_ => <React.Fragment key={_}>{renderItem(_)}</React.Fragment>)}
    </div>
  );
}

export default Calculator;
