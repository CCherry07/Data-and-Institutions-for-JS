// function primeNumber(num){
//     for (let i = 2; i < num; i++) {
//         if (num % i === 0){
//             return false
//         }
//     }
//     return  true
// }

// primeNumber优化
function primeNumber(num) {
  let temp = parseInt(`${Math.sqrt(num)}`);
  for (let i = 2; i <= temp; i++) {
    if (num % i === 0) {
      return false;
    }
  }
  return true;
}

function p(num) {
  let arr = [];
  for (let i = 2; i < num; i++) {
    primeNumber(i) ? arr.push(i) : "";
  }
  return arr.length;
}
console.log(p(10000000));
