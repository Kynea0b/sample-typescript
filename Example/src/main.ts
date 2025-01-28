
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

};

main();