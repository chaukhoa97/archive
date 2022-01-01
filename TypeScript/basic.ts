//? Basics
let a: number = 1; // infer: let a = 1
const sekai = 1; //* Literal Types: const sekai: 1 (kiểu type là "1" luôn chứ kp là number, vì const kbh thay đổi)
let idArray: number[] = [1, 2, 3, 4, 5]; //! hoặc Array<number>
let tuple: [string, number] = ['John', 25];
let tupleArray: [string, number][] = [
  ['John', 25],
  ['Uyen', 23],
];

//? Type(alias): A name for any `Type`
type StringOrNumber = string | number; // Đặt tên cho "string | number" type là "StringOrNumber"
type User = { name: string; readonly age?: number }; //* readonly: không thể thay đổi giá trị của biến
let user: User = { name: 'John', age: 25 }; //! user.age = 30 -> Error: Cannot assign to 'age' because it is a read-only property.

//? Interface: Another way to name an OBJECT type (chỉ dùng dc cho object)
interface Person {
  name: string;
  readonly age?: number;
  //TODO Có 2 cách để định nghĩa một method trong một interface
  log1?: (message: string) => void; // Khai báo như là một thuộc tính(property) với type là function
  log2?(message: string): void; // Khai báo như một function bình thường
}
{
  //* `type` ko declare thêm vào dc, còn `interface` thì có -> dùng `interface` cho public API để người dùng tự thêm vào, còn `type` cho Props hay State vì nó nhất quán hơn.
  interface Person {
    //! Có thể override Interface's fn, nhưng ko thể override Interface's property --> log1?: (message: string) => void ~> Error
    log2?(message: number): void; // ok
  }
  type Userr = { id: number }; //! Error: type duplicate line 13
}
{
  //* Intersection(& || extends) Combine 2 interface Identity & Contact -> Customer/Customer2 = { name, email, gender }
  interface Identity {
    name: string;
  }
  interface Contact {
    email: string;
  }
  type Customer = Identity & Contact & { gender: string };
  interface Customer2 extends Identity, Contact {
    gender: string;
  }
}

//? Function
{
  //* Interface Fn
  interface AddFuncInterface {
    (a: number, b: number): number;
  }
  let interfaceAdd: AddFuncInterface = function (a, b) {
    return a + b;
  };
  interfaceAdd(1, 2); //! Chỉ cộng số chứ ko cộng string dc
}
{
  //* Void: Khi function không return gì cả
  function print(msg: string): void {
    console.log(msg);
  }
}

//? Type Assertion: Only to more or less specific type
let anyVar: any = '1';
let numberType: number = <number>anyVar;
let numberType2: number = anyVar as number;
function getState(state: 'active') {
  console.log(state);
}
let s = 'active'; // s: string
getState(s as 'active'); // Ép kiểu của s về 'active' trong function này
const req = { url: 'https://example.com', method: 'GET' } as const; // as const -> không thay đổi giá trị của object

//? Generics: Lấy param làm Typedef
const stringList: Array<string> = ['a', 'b', 'c', 'd', 'e'];
const personList: Array<Person> = [{ name: 'John' }, { name: 'Uyen' }];
//* Generics with Function
{
  let getTuple1: <T1, T2>(a: T1, b: T2) => [T1, T2] = (a, b) => [a, b];
  let getTuple1Sample: [string, number] = getTuple1('a', 1);
  // --------------------------------------------------
  type TupleFunc = <T1, T2>(a: T1, b: T2) => [T1, T2]; // `TupleFunc` type: 1 fn có 2 param có type lần lượt là T1 & T2, trả về 1 array có 2 phần tử cũng có type là T1 & T2
  let getTuple2: TupleFunc = (a, b) => [a, b]; // function with `TupleFunc` type
  let getTuple2Sample: [string, number] = getTuple2('a', 1);
  // --------------------------------------------------
  interface TupleFuncInterface {
    <T1, T2>(a: T1, b: T2): [T1, T2]; // `TupleFuncInterface` type: HOÀN TOÀN giống như `TupleFunc` type
  }
  let getTuple3: TupleFuncInterface = (a, b) => [a, b]; // function with `TupleFuncInterface` type
  let getTuple3Sample: [string, number] = getTuple3('a', 1);
  // --------------------------------------------------
  interface TupleFuncInterface2<T1, T2> {
    (a: T1, b: T2): [T1, T2]; // `TupleFuncInterface2` type: HOÀN TOÀN giống như `TupleFunc` type
  }
  let getTuple4: TupleFuncInterface2<string, number> = (a, b) => [a, b]; // function with `TupleFuncInterface2` type
  let getTuple4Sample: [string, number] = getTuple4('a', 1);
}
//* Generics with Interface
{
  interface GenericIdentityFn<T> {
    (arg: T): T; // TYPEDEF 1 Fn có param loại `T`, trả về cũng là loại `T`
  }
  function identity<Type>(arg: Type) {
    // Chức năng hàm
    if (typeof arg === 'number') return arg + 10;
    else return 1;
  }
  let myIdentity: GenericIdentityFn<number> = identity; // Áp chức năng hàm với TYPEDEF của interface
}
{
  //* Generic Constraint
  interface Lengthwise {
    length: number;
  }
  function loggingIdentity3<T extends Lengthwise>(arg: T): T {
    console.log(arg.length); //! Có thể truy cập length vì đã extend từ Lengthwise
    return arg;
  }
  loggingIdentity3({ length: 10, value: 3 }); // Phải có thuộc tính `length`
}

//? Destructing Parameter (hơi khác so với JS). Dùng interface Person: { name, age? }
function createPerson({ name }: Person): Person {
  return { name };
}

//? keyof
type PersonKeys = keyof Person; // PersonKeys = 'name' | 'age'