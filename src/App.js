import React from 'react';
import './App.css';
import NumberBox from './components/NumberBox';
import NumberButton from './components/NumberButton';
import FunctionButton from './components/FunctionButton';
import NegateButton from './components/NegateButton';
import ClearButton from './components/ClearButton';
import EqualsButton from './components/EqualsButton';

function App() {
  return (
    <div className="App">
      <h1>Calculator</h1>
      <NumberBox />
      <div className="calcGrid">
        <div className="span2Columns">
          <ClearButton />
        </div>
        <NegateButton />
        <FunctionButton value="/" />
        <NumberButton value={7} />
        <NumberButton value={8} />
        <NumberButton value={9} />
        <FunctionButton value="*" />
        <NumberButton value={4} />
        <NumberButton value={5} />
        <NumberButton value={6} />
        <FunctionButton value="-" />
        <NumberButton value={1} />
        <NumberButton value={2} />
        <NumberButton value={3} />
        <FunctionButton value="+" />
        <div className="span2Columns">
          <NumberButton value={0} />
        </div>
        <NumberButton value="." />
        <EqualsButton />
      </div>
    </div>
  );
}

export default App;
