import React, { useState } from 'react';

const SumCalculator: React.FC = () => {
  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  const [sum, setSum] = useState<number | null>(null);

  const handleNum1Change = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNum1(event.target.value);
  };

  const handleNum2Change = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNum2(event.target.value);
  };

  const calculateSum = () => {
    const n1 = Number(num1);
    const n2 = Number(num2);
    if (!isNaN(n1) && !isNaN(n2)) {
      setSum(n1 + n2);
    } else {
      setSum(null);
    }
  };

  return (
    <div>
      <label htmlFor="num1">Number 1:</label>
      <input type="text" id="num1" value={num1} onChange={handleNum1Change} />

      <label htmlFor="num2">Number 2:</label>
      <input type="text" id="num2" value={num2} onChange={handleNum2Change} />

      <button onClick={calculateSum}>Calculate Sum</button>

      {sum !== null && <p>Sum: {sum}</p>}
      {isNaN(Number(num1)) && num1 !== "" && <p style={{ color: "red" }}>Number 1 is not a number</p>}
      {isNaN(Number(num2)) && num2 !== "" && <p style={{ color: "red" }}>Number 2 is not a number</p>}
    </div>
  );
};

export default SumCalculator;