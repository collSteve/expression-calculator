import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Constant, Multiply, Add } from './expression-calc/model/defined-expressions';
import { Environment } from './expression-calc/model/environment';

function App() {
  const env: Environment = new Environment();

  const c2 = new Constant(2);
  const c3 = new Constant(3);
  const c5 = new Constant(5);

  const expressions = [
    new Multiply(c2, new Add(c5, c3)),
    new Add(c2, new Multiply(c5, c3)),
    new Add(new Multiply(c5, c3), c2),
  ];

  return (
    <div className="App">
      {expressions.map(expr => {
        return <p>{`${expr} = ${expr.evaluate(env)}`}</p>
      })}
    </div>
  );
}

export default App;
