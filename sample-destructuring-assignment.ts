// person.ts
export interface Person {
  name: string;
  age: number;
  city: string;
}

export const person: Person = {
  name: "太郎",
  age: 30,
  city: "東京",
};

export const { name: name1, age: age1 } = person; // 分割代入

console.log(name1); // 出力: 太郎 (string型)
console.log(age1); // 出力: 30 (number型)
