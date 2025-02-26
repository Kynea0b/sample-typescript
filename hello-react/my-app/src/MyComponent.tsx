import React, { FC } from 'react';

interface MyComponentProps {
  name: string;
  age: number;
}

const MyComponent: FC<MyComponentProps> = ({ name, age }) => {
  return (
    <div>
      <p>Name: {name}</p>
      <p>Age: {age}</p>
    </div>
  );
};

export { MyComponent as Hoge }; // MyComponent を Hoge という名前で export