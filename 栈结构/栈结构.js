class Stack {
  //栈中的属性 初始化
  constructor(data) {
    if (data && data instanceof Array) {
      this.items = data ?? [];
    } else if (arguments.length > 1) {
      this.items = [...arguments];
    } else {
      this.items = [data];
    }
  }
  //压栈 给栈添加元素
  push = (el) => this.items.push(el);

  //出栈 取出栈顶数据
  pop = () => this.items.pop();

  //查看栈顶元素
  peek = () => this.items[this.items.length - 1];

  //检查栈是否为空
  isEmpty = () => this.items.length === 0;

  //获取栈元素的个数
  size = () => this.items.length;

  //toString
  toString = () => this.items.join(" ");
}

//示例 10进制转二进制
function decTobin(dec) {
  //保存余数(栈)
  const S = new Stack();
  //循环递归
  while (dec > 0) {
    //获取余数->压栈
    S.push(dec % 2);
    // 获取整除的结果(向下取整)
    dec = Math.floor(dec / 2);
  }
  //取栈
  let resBin = "";
  while (!S.isEmpty()) {
    resBin += S.pop();
  }
  return resBin;
}
const stack = new Stack();
stack.push(123);
stack.push("张三");
stack.push("李四");

// 测试
console.log(stack.toString());
console.log(stack.pop());
// console.log(decTobin(100)) // 1100100
