export function calculation(num1: number, num2: number) {
    const answer: number[] = [
      num1 + num2,
      num1 - num2,
      num1 * num2,
      num1 / num2,
    ]
    return answer;
}

export function foo(str1: string, str2: string){
  return str1 + str2;
}