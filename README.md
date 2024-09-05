<!-- https://dillinger.io/ -->
<!-- https://chatgpt.com/c/af351947-0197-40d5-a005-a0701645796c -->
# Tôi đã học được những gì trong khóa thực hành Front-end này?

## I. ReactJS Notes

### 1. Sử dụng { function() } trong JSX để sinh phần tử html
Khi tôi đang viết hàm **lambda function** để sinh ra nhiều thẻ ```<Card></Card>``` để test trong file [ListCards.jsx](./src/pages/Boards/BoardContent/ListColumns/Column/ListCards/ListCards.jsx), thì quên mất không chạy nó => sinh ra lỗi.

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
