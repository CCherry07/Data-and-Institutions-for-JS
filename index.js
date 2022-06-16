// function antiShake(fn, delay, immediately) {
//   let timer = null;
//   immediately = immediately ?? false;
//   return function () {
//     return new Promise((res, rej) => {
//       clearTimeout(timer);
//       if (immediately) {
//         res(fn.apply(this, arguments));
//       } else {
//         timer = setTimeout(() => {
//           res(fn.apply(this, arguments));
//         }, delay);
//       }
//       this.timer = function () {
//         clearTimeout(timer);
//       };
//     });
//   };
// }

// function findDiscontinuousSubset(nums) {
//   nums = [...new Set(nums)].sort((a, b) => a - b);
//   const res = [];
//   for (let i = 0; i < nums.length; i++) {
//     const end = res[res.length - 1];
//     if (nums[i] - end > 1 || !end) {
//       res.push(nums[i]);
//     } else {
//       continue;
//     }
//   }
//   return res;
// }

// function calc(nums) {
//   const length = nums.length;
//   let newNums = [];
//   nums = nums.sort((a, b) => a - b);
//   const nums1 = [];
//   const nums2 = [];
//   for (let i = 0; i < length; i++) {
//     if (i % 2 == 1) {
//       nums1.push(nums[i]);
//     } else {
//       nums2.push(nums[i]);
//     }
//   }
//   newNums = nums2.concat(nums1.reverse());
//   let res1 = newNums[1];
// }

// while ((line = read_line()) != "") {
//   function calc(nums) {
//     const length = nums.length;
//     nums = nums.sort((a, b) => a - b);
//     const nums1 = [];
//     const nums2 = [];
//     for (let i = 0; i < length; i++) {
//       if (i % 2 == 1) {
//         nums1.push(nums[i]);
//       } else {
//         nums2.push(nums[i]);
//       }
//     }
//     return nums2.concat(nums1.reverse());
//   }
// }

let arr = [];
function find(s) {
  let res = 0;
  let arr = [];
  for (let j = 0; j < s; j++) {
    if (s % j === 0) {
      res += j;
      arr.push(j);
    } else {
      continue;
    }
  }
  console.log(arr);
  return res;
}

// for (let i = 2; i < 500; i++) {
//   const res = find(i);
//   for (let j = 2; j < 500; j++) {
//     if (res === j && find(j) === i) {
//       arr.push([i, j]);
//     }
//   }
// }

// console.log(arr);
// console.log(find(75) === 48);
// console.log(find(48) === 75);
// console.log(find(220) === 284);

var rotate = function (nums, k) {
  for (let i = 0; i < k; i++) {
    nums.unshift(nums.pop());
  }
  console.log(nums);
  return nums;
};
rotate([1, 2, 3, 4, 5, 6, 7], 3);
