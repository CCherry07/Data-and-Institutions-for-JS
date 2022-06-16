let twoSum = function (nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    let res = target - nums[i];
    if (map.has(res)) {
      return [map.get(res), i];
    }
    map.set(nums[i], i);

  }
};

let firstMissingPositive = function (nums) {
  let s = new Set(nums);
  let res = 1; // 2
  while (s.has(res)) {
    res++;
  }
  return res;
};

var reverse = function (x) {
  let res = 0;
  let arr = x.toString().split("");
  if (arr[0] === "-") {
    arr.shift();
    res = -parseInt(arr.reverse().join(""));
  } else {
    res = parseInt(arr.reverse().join(""));
  }
  if (res >= Math.pow(2, 31) - 1 || res <= Math.pow(-2, 31)) return 0;
  return res;
};
//贪心算法
var maxIceCream = function (costs, coins) {
  const arr = costs.sort((a, b) => a - b);
  let res = 0;
  let index = 0;
  while (res < coins && index < arr.length) {
    if (coins < arr[0]) return index;
    res += arr[index];
  }
  if (res > coins) {
    return index - 1;
  }
  return index;
};

// maxIceCream([1, 3, 2, 4, 1], 7);

//906 二分查找算法
var search = function (nums, target) {
  let left = 0;
  let right = nums.length - 1;
  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    if (target > nums[mid]) {
      left = mid + 1;
    } else if (target < nums[mid]) {
      right = mid - 1;
    } else {
      return mid;
    }
  }
  return -1;
};
var nums = [-1, 0, 3, 5, 9, 12];
var target = 2;
search(nums, target);

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
// 2.
var addTwoNumbers = function (l1, l2) {
  //l1 l2 是两个链表传入的第一个节点
  let dummy = new ListNode();
  let curr = dummy;
  let current = 0; //l1 l2 相加的值是否大于10
  //遍历l1的值
  while (l1 !== null || l2 !== null) {
    let sum = 0; // 拿到两条的链表对应的节点的值的和
    if (l1 !== null) {
      sum += l1.val;
      l1 = l1.next;
    }
    if (l2 !== null) {
      sum += l2.val;
      l2 = l2.next;
    }
    sum += current;
    curr.next = new ListNode(sum % 10); //大于10将取余
    current = Math.floor(sum / 10); // 0 or 1
    curr = curr.next; //将当前节点，先下挪一位
  }
  if (current > 0) {
    curr.next = new ListNode(current);
  }
  return dummy.next;
};

// 3.
var lengthOfLongestSubstring = function (s) {
  const set = new Set();
  let maxLength = 0;
  let i,
    j = 0;
  if (s.length === 0) {
    return 0;
  }
  for (let i = 0; i < s.length; i++) {
    if (!set.has(s[i])) {
      set.add(s[i]);
      maxLength = Math.max(maxLength, set.size);
    } else {
      while (set.has(s[i])) {
        set.delete(s[j]);
        j++;
      }
      set.add(s[i]);
    }
  }
  return maxLength;
};
// 5.
var longestPalindrome = function (s) {
  if (s.length < 2) {
    return s;
  }
  let start = 0;
  let maxLength = 1;
  function expandAroundCenter(left, right) {
    //边界判断 传入的left right ， 以及 只有两边的字符是否相等
    while (left >= 0 && right < s.length && s[left] === s[right]) {
      if (right - left > maxLength - 1) {
        maxLength = right - left + 1;
        start = left;
      }
      left--;
      right++;
    }
  }

  for (let i = 0; i < s.length; i++) {
    expandAroundCenter(i, i + 1); //s字符串的个数偶数
    expandAroundCenter(i - 1, i + 1); //s字符串的个数奇数
  }
  return s.substr(start, maxLength);
};
