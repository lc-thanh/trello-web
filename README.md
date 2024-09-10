<!-- https://dillinger.io/ -->
<!-- https://chatgpt.com/c/af351947-0197-40d5-a005-a0701645796c -->
# Tôi đã học được những gì trong khóa thực hành Front-end này?

# Mục lục
- [I. ReactJS Notes](#i-reactjs-notes)
  - [1. Sử dụng { function() } trong JSX để sinh phần tử html](#1-sử-dụng--function--trong-jsx-để-sinh-phần-tử-html)
  - [2. Sử dụng '&&' cho Conditional Rendering rất tiện nhưng KHÔNG an toàn](#2-sử-dụng--cho-conditional-rendering-rất-tiện-nhưng-không-an-toàn)
- [II. JavaScript Notes](#ii-javascript-notes)
  - [1. Cách để chạy một lambda function](#1-cách-để-chạy-một-lambda-function)
  - [2. Optional chaining operator (?.) trong JS](#2-optional-chaining-operator--trong-js)
  - [3. Sự giống và khác nhau giữa findIndex() và indexOf()](#3-sự-giống-và-khác-nhau-giữa-findindex-và-indexof)
  - [4. slice() và splice()](#4-slice-và-splice)
- [III. HTML, CSS Notes](#iii-html-css-notes)
  - [1. Sử dụng calc() trong CSS để tính toán khoảng cách cho phần tử](#1-sử-dụng-calc-trong-css-để-tính-toán-khoảng-cách-cho-phần-tử)


## I. ReactJS Notes

### 1. Sử dụng { function() } trong JSX để sinh phần tử html
Khi tôi đang viết hàm **lambda function** sinh ra nhiều thẻ ```<Card></Card>``` để test trong file [ListCards.jsx](./src/pages/Boards/BoardContent/ListColumns/Column/ListCards/ListCards.jsx), thì quên mất không chạy nó => sinh ra lỗi.

Trong JSX, nếu sử dụng hàm để sinh phần tử html thì làm như sau:
```js
function MyComponent() {
  return (
    <div>
      {generateCards(8)}
    </div>
  );
}
```
Lỗi sai của tôi là viết **lambda function** trực tiếp vào { } nhưng quên chạy:
```js
function MyComponent() {
  return (
    <div>
      {() => {
        const count = 8
        return [...Array(count)].map((_, index) => (
          <div key={index}>Div number {index}</div>
        ))
      }}
    </div>
  );
}
```
Code trên kia chắc chắn bị lỗi! Vì nằm trong cặp { } là một **hàm**, chứ không phải là các **thẻ html**.

Nếu muốn viết **lambda function** ở trong JSX để sinh phần tử html thì nhớ **CHẠY** nó, cách chạy tôi cũng đã tự viết ở [mục này](#1-cách-để-chạy-một-lambda-function)

### 2. Sử dụng '&&' cho Conditional Rendering rất tiện nhưng KHÔNG an toàn

Trong [Video](https://youtu.be/4Hy9FsfQX10?t=2179), anh **trungquandev** cũng đã sử dụng và giải thích.

Nguồn code: [dev.to](https://dev.to/maafaishal/avoid-operator-for-conditional-rendering-in-react-2de)

Các biểu thức Truthy values

```js
// Truthy values

// boolean
{true && <p>😸</p>}

// number
{20 && <p>😸</p>}

// string
{"string" && <p>😸</p>}

// object
{{} && <p>😸</p>}

// array
{[] && <p>😸</p>}

// function
{(() => {}) && <p>😸</p>}

// symbol
{Symbol("symbol") && <p>😸</p>}

// All of them will render <p>😸</p> ✅
```
Các biểu thức Falsy values:
```js
// Falsy values

// null - this won't render anything ✅
{null && <p>😸</p>}

// undefined - this won't render anything ✅
{undefined && <p>😸</p>}

// boolean - this won't render anything ✅
{false && <p>😸</p>}

// NaN - this will render NaN 🤯 ❌
{NaN && <p>😸</p>}

// 0 - this will render 0 🤯 ❌
{0 && <p>😸</p>}

// negative 0 - this will render 0 🤯 ❌
{-0 && <p>😸</p>}

// length of an empty array - this will render 0 🤯 ❌
{[].length && <p>😸</p>}

// string - this won't render anything ✅
{"" && <p>😸</p>}
```
Như đã thấy ở ví dụ trên, những biểu thức **Falsy conditions** đã làm cho React render ra những thứ mà nó không nên render.

Để khắc phục điều đó, ta phải ép kiểu về Boolean trước!

Có 2 cách để ép kiểu:

- **Cách 1**:
Dùng ```Boolean()```:
```js
// False
{Boolean(NaN) && <p>😸</p>}

// False
{Boolean(0) && <p>😸</p>}

// All of them won't render anything ✅
```

- **Cách 2**:
Dùng ```!!```:
```js
// False
{!!-0 && <p>😸</p>}

// False
{!!"" && <p>😸</p>}

// False
{!![].length && <p>😸</p>}

// All of them won't render anything ✅
```

Hoặc khắc phục bằng cách sử dụng **Ternary operator**:
```js
{NaN ? <p>😸</p> : null}

{0 ? <p>😸</p> : null}

{-0 ? <p>😸</p> : null}

{"" ? <p>😸</p> : null}

// All of them won't render anything ✅
```
Các biểu thức **Falsy conditions** tưởng chừng như chỉ là một vấn đề nhỏ trong coding, nhưng thực ra hậu quả của nó rất khôn lường.

Nếu nhẹ, thì React sẽ render ra số **0**, hoặc **NaN** không mong muốn.

Nhưng nếu bạn sử dụng React Native, thậm chí nó sẽ bị **crash** luôn.

Nên React có một ESlint cho luật này:
https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-no-leaked-render.md

Tôi cũng đã sử dụng ở trong dự án của mình:
```js
'react/jsx-no-leaked-render': ['error', { 'validStrategies': ['ternary', 'coerce'] }]
```

## II. JavaScript Notes

### 1. Cách để chạy một lambda function
```js
( // Hàm được bọc trong 1 cặp ngoặc tròn
  () => {
    const count = 8
    return [...Array(count)].map((_, index) => (
      <div key={index}>Div number {index}</div>
    ))
  }
) // Hàm được bọc trong 1 cặp ngoặc tròn
() // Cặp ngoặc này để chạy hàm
```

### 2. Optional chaining operator (?.) trong JS

Nếu chạy dòng lệnh sau:
```js
const adventurer = {
  name: 'Alice',
  cat: {
    name: 'Dinah'
  }
}

const dogName = adventurer.dog.name
console.log(dogName);

console.log(adventurer.someNonExistentMethod())
```
Chương trình sẽ trả về lỗi:
```
Error: Cannot read properties of undefined (reading 'name')
Error: adventurer.someNonExistentMethod is not a function
```
Vì trong object *adventurer* không có thuộc tính *dog* và hàm *someNonExistentMethod*. 

Thay vì phải dùng hàm ```if ()``` để kiểm tra thì trong JS có toán tử **Optional chaining (?.)**:
```js
const dogName = adventurer.dog?.name;
console.log(dogName);
// Expected output: undefined

console.log(adventurer.someNonExistentMethod?.());
// Expected output: undefined
```
### 3. Sự giống và khác nhau giữa findIndex() và indexOf()
- Giống nhau: Cả hai đều trả về index **đầu tiên** của một phần tử được tìm thấy trong **Array**

- Khác nhau: Nhưng cả 2 lại khác nhau về tham số và đối số đầu vào:

  - Tham số đầu vào findIndex() là một function:
  ```js
  const array1 = [5, 12, 8, 130, 44];

  const isLargeNumber = (element) => element > 13;

  console.log(array1.findIndex(isLargeNumber));
  // Expected output: 3
  ```
  - Trong khi đó, tham số đầu vào của indexOf() là một giá trị cụ thể:
  ```js
  var myArrayOfStrings = ['this', 'is', 'my', 'array', 'of', 'strings'];

  console.log(myArrayOfStrings.indexOf('my')); 
  // Expected output: 2
  ```

### 4. slice() và splice()

Thuật toán di chuyển phần tử trong mảng của [dnd kit](https://dndkit.com/) có sử dụng slice() và splice(): https://github.com/clauderic/dnd-kit/blob/master/packages/sortable/src/utilities/arrayMove.ts

- ```slice(start, end)``` trả về [shallow copy](https://developer.mozilla.org/en-US/docs/Glossary/Shallow_copy) của một phần trong một mảng từ **start** đến **end** (nhưng KHÔNG chứa **end**)

```js
const animals = ['ant', 'bison', 'camel', 'duck', 'elephant'];

console.log(animals.slice(2));
// Expected output: Array ["camel", "duck", "elephant"]

console.log(animals.slice(2, 4));
// Expected output: Array ["camel", "duck"]

console.log(animals.slice(1, 5));
// Expected output: Array ["bison", "camel", "duck", "elephant"]

console.log(animals.slice(-2));
// Expected output: Array ["duck", "elephant"]

console.log(animals.slice(2, -1));
// Expected output: Array ["camel", "duck"]

console.log(animals.slice());
// Expected output: Array ["ant", "bison", "camel", "duck", "elephant"]
```

Giá trị index âm? => tính từ cuối mảng lên đầu mảng

- ```splice(start, deleteCount, item1, item2, ..., itemN)``` thay đổi một mảng bằng cách xóa, hoặc thay thể các phần tử trong mảng

```js
const months = ['Jan', 'March', 'April', 'June'];
months.splice(1, 0, 'Feb');
// Inserts at index 1
console.log(months);
// Expected output: Array ["Jan", "Feb", "March", "April", "June"]

months.splice(4, 1, 'May');
// Replaces 1 element at index 4
console.log(months);
// Expected output: Array ["Jan", "Feb", "March", "April", "May"]
```

## III. HTML, CSS Notes

### 1. Sử dụng calc() trong CSS để tính toán khoảng cách cho phần tử

Như ở trong file [theme.js](./src/theme.js), chiều cao của BoardContent được tính dựa trên chiều cao của AppBar và BoardBar sử dụng ```calc()```

```js
const BOARD_CONTENT_HEIGHT = `calc(100vh - ${APP_BAR_HEIGHT} - ${BOARD_BAR_HEIGHT})`
```