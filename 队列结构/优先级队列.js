//队列优先级 传入的数字越小优先级越高
class PriorityQueue {
  constructor() {
    this.items = [];
    //定义ElementQueue类
    this.ElementQueue = class ElementQueue extends PriorityQueue {
      constructor(el, priority) {
        super();
        this.el = el;
        this.priority = priority;
      }
    };
  }
  enQueue(el, priority) {
    //创建一个内部类（ElementQueue）
    const ElementQueue = new this.ElementQueue(el, priority);
    //1.判断PriorityQueue队列是否为空 为空直接将元素放入队列中
    if (this.isEmpty()) {
      this.items.push(ElementQueue);
    } else {
      //2.比较插入el的priority与原队列元素的priority大小
      // let state = false;
      // for (let i = 0; i < this.items.length; i++) {
      //   if (priority < this.items[i].priority) {
      //     this.items.splice(i, 0, ElementQueue);
      //     state = true;
      //     break;
      //   }
      // }

      //优化
      let state = this.items.some((el, index) => {
        if (priority < el.priority) {
          this.items.splice(index, 0, ElementQueue);
          return true;
        }
      });
      if (!state) {
        //若经比较，没有找到比el小的元素，放在队列末尾
        this.items.push(ElementQueue);
      }
    }
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

//test
const priorityQueue = new PriorityQueue();

priorityQueue.enQueue("张三", 10);
priorityQueue.enQueue("李四", 5);
priorityQueue.enQueue("王五", 60);

console.log(priorityQueue);
