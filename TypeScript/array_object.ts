//? readonly
interface Home {
  readonly resident: { name: string; age: number };
}
function visitForBirthday(home: Home) {
  // We can read and update properties from 'home.resident'.
  console.log(`Happy birthday ${home.resident.name}!`);
  home.resident.age++;
}
function evict(home: Home) {
  // But we can't write to the 'resident' property itself on a 'Home'.
  home.resident = {
    name: 'Victor the Evictor',
    age: 42,
  };
}

//? Optional: Index Signature
interface NumberOrStringDictionary {
  [index: string]: number | string; //* Ko biết hết property, chỉ biết value trả về là `number | string`
  length: number; // ok, length is a number
  name: string; // ok, name is a string
  1: string;
}
let aa: NumberOrStringDictionary = { length: 8, name: 'bro', 1: 'one' }; // aa.length = 8; aa.name = 'bro'; aa[1] = 'one';
console.log(aa[1]);

//? Tuple: Knows exactly how many elements it contains, and exactly which types it contains at specific positions.
let tuple1: [string, number, number?] = ['John', 25]; // tuple1.length = 2 | 3
let tupleArray: [string, number][] = [
  ['John', 25],
  ['Uyen', 23],
];
let tuple2: [string, ...boolean[], number] = ['John', true, false, 1]; //* Rest elements must be array/tuple type