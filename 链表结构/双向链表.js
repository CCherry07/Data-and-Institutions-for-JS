class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
    //内部类
    this.Node = class Node {
      constructor(data) {
        this.prev = null;
        this.next = null;
        this.data = data;
      }
    };
  }

  //append 方法
  append(data) {
    const newNode = new this.Node(data);
    if (this.length === 0) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      //将最后一个node的next 指向 newNode
      //将newNode的prev指向最后一个节点
      newNode.prev = this.tail;
      this.tail.next = newNode;
      //将最后tail指向最后一个node
      this.tail = newNode;
    }
    this.length++;
  }
  //insert 方法
  insert(data, location = this.length) {
    if (location < 0 || location > this.length)
      throw "Invalid location may be due to the following reason (location>0 || location > LinkedList.length)";
    const newNode = new this.Node(data);
    if (this.length === 0 || location === this.length) {
      this.append(data);
    } else if (location === 0) {
      this.head.prev = newNode;
      newNode.next = this.head;
      this.head = newNode;
    } else {
      let current = this.head;
      let index = 0;
      //找到location位置的节点
      while (++index < location) {
        current = current.next;
      }
      //location位置的前一个节点的next 指向 newNode
      current.prev.next = newNode;
      //newNode的prev指向location位置前一个节点
      newNode.prev = current.prev;
      //location位置的prev指向newNode
      current.prev = newNode;
      //newNode的next指向location位置节点
      newNode.next = current;
    }
    this.length++;
    return true;
  }
  //get 方法
  get(location) {
    if (location < 0 || location >= this.length)
      throw "Invalid location may be due to the following reason (location>0 || location >= LinkedList.length)?";
    if (location > this.length / 2) {
      //从后向前遍历
      let index = this.length - 1;
      let current = this.tail;
      while (index-- > location) {
        current = current.prev;
      }
      return current.data;
    } else {
      //从后向前遍历
      let index = 0;
      let current = this.head;
      while (index++ < location) {
        current = current.next;
      }
      return current.data;
    }
  }

  //indexOf 方法
  indexOf(data) {
    let current = this.head;
    let index = 0;
    while (current) {
      //当找到的current的data === data ，返回 index
      if (current.data === data) {
        return index;
      }
      current = current.next;
      index++;
    }
    return -1;
  }

  //upload 方法
  update(newData, location) {
    if (location < 0 || location >= this.length)
      throw "Invalid location may be due to the following reason (location>0 || location >= LinkedList.length)?";
    if (location > this.length / 2) {
      let index = this.length - 1;
      let current = this.tail;
      while (index-- > location) {
        current = current.prev;
      }
      current.data = newData;
      return true;
    } else {
      let index = 0;
      let current = this.head;
      while (index++ < location) {
        current = current.next;
      }
      current.data = newData;
      return true;
    }
  }

  //removeAt 方法
  removeAt(location) {
    if (location < 0 || location >= this.length)
      throw "Invalid location may be due to the following reason (location>0 || location >= LinkedList.length)?";
    let current = this.head;
    if (this.length === 1) {
      this.head = null;
      this.tail = null;
    } else {
      if (location < this.length / 2) {
        let index = 0;
        //从前向后遍历 拿到location位置的节点
        while (index++ < location) {
          current = current.next;
        }
        if (location === 0) {
          this.head = current.next;
        } else {
          current.prev.next = current.next;
        }
        current.next.prev = current.prev;
      } else {
        let index = this.length - 1;
        //重新给current赋值（this.tail）
        current = this.tail;
        //从后向前遍历 拿到location位置的节点
        while (index-- > location) {
          current = current.prev;
        }
        current.prev.next = current.next;
        if (location === this.length - 1) {
          this.tail = current.prev;
        } else {
          current.next.prev = current.prev;
        }
      }
    }
    this.length--;
    return current.data;
  }

  //remove方法
  remove(data) {
    const index = this.indexOf(data);
    return this.removeAt(index);
  }
  //isEmpty 方法
  isEmpty() {
    return this.length === 0;
  }
  //size 方法
  size() {
    return this.length;
  }
  //将链表转化为字符串 toString
  toSting() {
    return this.backwardString();
  }
  //向前转化为字符串 forwardString
  forwardString() {
    let current = this.tail;
    let result = "";
    //向前遍历
    while (current) {
      result += current.data + ",";
      current = current.prev;
    }
    return result.slice(0, result.length - 1);
  }
  //向后转化为字符串 backwardString
  backwardString() {
    let current = this.head;
    let result = "";
    //向后遍历
    while (current) {
      result += current.data + ",";
      current = current.next;
    }
    return result.slice(0, result.length - 1);
  }
}

//test
const doublyLinkedList = new DoublyLinkedList();
doublyLinkedList.append("张三");
doublyLinkedList.append("李四");
doublyLinkedList.append("王五");
doublyLinkedList.append("七七");
doublyLinkedList.append("可莉");
doublyLinkedList.append("刻晴");
doublyLinkedList.insert("刘6", 3);
console.log(doublyLinkedList.get(3));
console.log(doublyLinkedList.indexOf("可莉"));
doublyLinkedList.update("钟离", 2);
console.log(doublyLinkedList.removeAt(6));
// console.log(doublyLinkedList.remove('张三'))
console.log(doublyLinkedList.toSting());
