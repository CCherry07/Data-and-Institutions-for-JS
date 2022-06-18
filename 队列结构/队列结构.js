class Queue {
  //初始化
  constructor(data) {
    if (data && data instanceof Array) {
      this.items = data ?? [];
    } else if (arguments.length > 1) {
      this.items = [...arguments];
    } else {
      this.items = [];
    }
  }
  //将元素加入队列
  enQueue(el) {
    this.items.push(el);
  }
  //删除队列前端元素
  deQueue() {
    return this.items.shift();
  }
  //查看队列前端元素
  front() {
    return this.items[0];
  }
  //检查队列元素是否为空
  isEmpty() {
    return this.items.length === 0;
  }
  //查看队列元素的个数
  size() {
    return this.items.length;
  }
  //toString
  toString() {
    return this.items.join(" ");
  }
}

const Q = new Queue([]);

//示例 击鼓传花

function drumming(nameList, resNum) {
  const Q = new Queue(nameList);
  while (Q.size() > 1) {
    //不是resNum放入队列后面
    //将resNum前的所有的元素依次放入队列后面
    for (let i = 0; i < resNum - 1; i++) {
      Q.enQueue(Q.deQueue());
    }
    //数到resNum的元素删掉（对列第一个元素）
    //删除队列前端元素
    Q.deQueue();
  }
  //返回剩下的元素（1个）
  return Q.front();
}

//test
const nameList = ["张三", "李四", "王五", "杨六", "刘七"];
console.log(drumming(nameList, 5)); // 李四

module.exports = Queue;
