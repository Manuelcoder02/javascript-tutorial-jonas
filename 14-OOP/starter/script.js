'use strict';
 //DAY 102 - CONSTRUCTOR FUNCTIONS AND THE NEW OPERATOR
//  const Person = function(firstName, birthYear) {
//     // Instances properties
//     this.firstName = firstName;
//     this.birthYear = birthYear;

//     // Never do this
//     // this.calcAge= function() {
//     //     console.log(2037 - this.birthYear);
//     // } 
//  }

//  const emmanuel = new Person('Emmanuel', 2001);
//  console.log(emmanuel);

//  // 1. New {} is created
//  // 2. function is called, this = {}
//  // 3. {} is linked to prototype
//  // 4. function automatically return {}

//  const matilda = new Person('Matilda', 2004);
//  const jack = new Person('Jack', 2003);
//  console.log(matilda, jack);

//  console.log(matilda instanceof Person);

//  Person.hey = function(){
//    console.log('Hey there!');
//    console.log(this);
//  }

//  Person.hey();
//  // DAY 103 - PROTOTYPES
//  console.log(Person.prototype);

//  Person.prototype.calcAge = function() {
//        console.log(2037 - this.birthYear);
//    }

//    emmanuel.calcAge();
//    matilda.calcAge();
//    jack.calcAge();

//    console.log(emmanuel.__proto__);
//    console.log(emmanuel.__proto__ === Person.prototype);
//    console.log(Person.prototype.isPrototypeOf(emmanuel));
//    console.log(Person.prototype.isPrototypeOf(matilda));
//    console.log(Person.prototype.isPrototypeOf(Person));

//    Person.prototype.species = 'Homo Sapiens'
//    console.log(emmanuel, matilda);
   
//    console.log(emmanuel.hasOwnProperty('firstName'));
//    console.log(emmanuel.hasOwnProperty('species'));

//    // Day 104: Prototypal Inheritance on built-in objects
//    console.log(emmanuel.__proto__);
//    // Object.prototype (top of the prototype chain)
//    console.log(emmanuel.__proto__.__proto__);
//    console.log(emmanuel.__proto__.__proto__.__proto__);

//    console.dir(Person.prototype.constructor)

//    const arr = [1, 7, 3, 3, 4, 3, 7]; // new Array = []
//    console.log(arr.__proto__);
//    console.log(arr.__proto__ === Array.prototype);
//    console.log(arr.__proto__.__proto__);

//    Array.prototype.unique = function(){
//       return [...new Set(this)];
   
//    }
//    console.log(arr.unique());

//    const h1 = document.querySelector('h1')
//    console.dir(x => x * 1);

//    // DAY 105 - CODING CHALLENGE 1
// const Car = function(make, speed) {
//    this.make = make;
//    this.speed = speed;
// }

// const bmw = new Car('BMW', 120)
// const mercedes = new Car('Mercedes', 95)
// console.log(bmw, mercedes);

// Car.prototype.calcAcc = function(){
//    this.speed += 10;
//    console.log(`${this.make} is going at ${this.speed} km/h`);
// }
// Car.prototype.calcBrake = function(){
//    this.speed -= 5;
//    console.log(`${this.make} is going at ${this.speed} km/h`);
// }

// bmw.calcAcc();
// bmw.calcAcc();
// bmw.calcBrake()
// bmw.calcAcc();

// mercedes.calcAcc()
// mercedes.calcAcc()
// mercedes.calcBrake()
// mercedes.calcAcc()

// // DAY 106: ES6 CLASSES
// // CLASS EXPRESSION
// // const PersonCL = class {

// // }

// // CLASS DECLARATION
// class PersonCL {
//    constructor(fullName, birthYear) {
//       this.fullName = fullName;
//       this.birthYear = birthYear;
//    }
//    // Instances methods
// // Method will be added to the .prototype property
//    calcAge(){
//       console.log(2024 - this.birthYear);
//    }

//    greet(){
//       console.log(`Hey ${this.fullName}`);
//    }

//    get age(){
//       return 2024 - this.birthYear;
//    }

//    set fullName(name){
//       if (name.includes(' ')) this._fullName = name;
//       else alert(`${name} is not a full name`);
//    }

//    get fullName(){
//       return this._fullName;
//    }

//    // Static methods
//    static hey() {
//       console.log('Hey there!');
//    console.log(this);
//    }
// }

// const jessica = new PersonCL('Jessica Davis', 1940)
// console.log(jessica);
// jessica.calcAge();
// console.log(jessica.age);

// console.log(jessica.__proto__ === PersonCL.prototype);

// // PersonCL.prototype.greet = function(){
// //    console.log(`Hey ${this.firstName}`);
// // }

// jessica.greet();

// // 1. Classes are NOT hoisted
// // 2. Classes are fist-class citizens
// // 3. Classes are always executed in strict mode.
// const walter = new PersonCL('Walter Davis', 1990)
// PersonCL.hey()

// SETTERS AND GETTERS
// const account = {
//    owner: 'Jonas',
//    movements: [200, 250, 503, 240, 670],

//    get latest() {
//       return this.movements.slice(-1).pop();
//    },

//    set latest(mov) {
//        this.movements.push(mov)
//    }
// }

// account.latest = 50;
// console.log(account.movements);
// console.log(account.latest);

// DAY 106 - OBJECT.CREATE
// const PersonProto = {
//    calcAge() {
//       console.log(2024 - this.birthYear);
//    },

//    init(firstName, birthYear){
//       this.firstName = firstName;
//       this.birthYear = birthYear;
//    }
// }

// const steven = Object.create(PersonProto);
// steven.name = 'Steven';
// steven.birthYear = '2002';
// steven.calcAge();
// console.log(steven);

// console.log(steven.__proto__ === PersonProto)

// const sarah = Object.create(PersonProto);
// sarah.init('Sarah', 1979);
// sarah.calcAge();

// // CODING CHALLENGE 2
// class CarCL {
//    constructor(make, speed){
//       this.make = make;
//       this.speed = speed;
//    }

//    calcAcc() {
//       this.speed += 10;
//       console.log(`${this.make} is going at ${this.speed} km/h`);
//    }

//    calcBrake() {
//       this.speed -= 5;
//       console.log(`${this.make} is going at ${this.speed} km/h`);
//    }

//    get speedUS() {
//       return this.speed / 1.6;
//    }

//    set speedUS(sp) {
//       this.speed = sp * 1.6;
//    }
// }

// const ford = new CarCL('Ford', 120);
// console.log(ford);
// ford.calcAcc();
// ford.calcBrake();
// console.log(ford.speedUS);
// ford.speedUS = 20;
// console.log(ford);

// DAY 107: INHERITANCE BETWEEN CLASSES: CONSTRUCTOR FUNCTION
const Person = function(firstName, birthYear) {

       this.firstName = firstName;
       this.birthYear = birthYear;
   
}

 Person.prototype.calcAge = function() {
       console.log(2037 - this.birthYear);
   }

   const Student = function(firstName, birthYear, course) {
      this.firstName = firstName;
      this.birthYear = birthYear;
      this.course = course;
   }

   Student.prototype.introduce = function(){
      console.log(`My name is ${this.firstName} and I'm studying ${this.course}`);
   }

   const mike = new Student('Mike', 2020, 'Computer Science');
   mike.introduce();