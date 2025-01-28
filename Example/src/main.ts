
import { calculation as keisan } from "./callee";
import { foo } from "./callee";


class Person {
    readonly name: string;

    constructor(name: string) {
        this.name = name;
    }
}


const main = () => {
    console.log('It works!');
    let taro: Person 
    taro = new Person("taro"); // OK
    console.log(taro);

    let saburo: Person;
    saburo = { name: "saburo" } // OK
    console.log(saburo);


    // module import
    const answer: number[] = keisan(100, 10);
    console.log(answer);

    const res = foo("Hello", "World");
    console.log(res);

};

main();