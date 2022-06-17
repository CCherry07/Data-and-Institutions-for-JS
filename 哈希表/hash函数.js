//将字符串转换成大数字：hashCode
//将大数字hashCode 压缩在数组范围内： hash化

function hash(str, size) {
  //1>定义hashCode初始值
  let hashCode = 0;
  //2>霍纳算法
  for (let i = 0; i < str.length; i++) {
    hashCode = 37 * hashCode + str.charCodeAt(i);
  }
  //将大数字hashCode 压缩在数组范围内： hash化（取余）
  return hashCode % size;
}

console.log(hash("cats", 7));
