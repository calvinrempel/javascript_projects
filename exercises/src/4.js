class Animal {
    constructor(name) {
        this.name = name;
    }

    speak() {
        console.log("Hello")
    }

    sayName() {
        console.log(this.name);
    }
}

// Make a class called "Dog"


const a = new Animal('Bob');
a.speak(); // ??
a.sayName(); // ??

const d = new Dog('Rover', 'Golden Retriever');
d.speak(); // Should say "Woof"
d.sayName(); // Should say Rover
d.printBreed(); // Should say 'Golden Retriever'