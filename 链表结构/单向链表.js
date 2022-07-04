class LinkedList {
  constructor() {
    this.head = null;
    this.length = 0;
    //内部类
    this.Node = class Node {
      constructor(data) {
        this.data = data;
        this.next = null;
      }
    };
  }

  //链表 append方法
  append(data) {
    if (this.length === 0) {
      //创建新节点
      //将head指向newNode
      this.head = new this.Node(data);
      this.length++;
    } else {
      //找到最后一个节点的next（null）
      let current = this.head;
      while (current.next) {
        current = current.next;
      }
      //将最后一个节点的next指向newNode
      current.next = new this.Node(data);
      this.length++;
    }
  }

  //toString方法
  toString() {
    //定义变量保存指针（引用）
    let current = this.head;
    //string
    let result = "";
    //迭代每一个节点的指针
    while (current) {
      result += current.data + ",";
      //指向下一个节点
      current = current.next;
    }
    return result.slice(0, result.length - 1);
  }
  //insert方法
  insert(data, location = this.length) {
    //越界判断
    if (location < 0 || location > this.length)
      throw "Invalid location may be due to the following reason (location>0 || location > LinkedList.length)?";
    const newNode = new this.Node(data);
    if (location === 0) {
      //将第一个节点的引用赋给newNode的next
      newNode.next = this.head;
      //将this.head 指向 newNode
      this.head = newNode;
    } else {
      let current = this.head;
      let index = 0;
      //找到location位置的前一个节点
      while (index++ < location - 1) {
        current = current.next;
      }
      const newNode = new this.Node(data);
      //newNode的next 指向 location位置的节点
      newNode.next = current.next;
      //将location-1位置的节点的next指向newNode
      current.next = newNode;
    }
    this.length++;
    return true;
  }
  //get 方法
  get(location = 0) {
    if (location < 0 || location >= this.length)
      throw "Invalid location may be due to the following reason (location>0 || location >= LinkedList.length)?";
    let current = this.head;
    let index = 0;
    //找到location位置的节点
    while (index++ < location) {
      current = current.next;
    }
    //返回节点的数据
    return current.data;
  }
  //indexOf 方法
  indexOf(data) {
    let index = 0;
    let current = this.head;
    while (current) {
      //找到节点的data === data的节点，并返回index
      if (current.data === data) {
        return index;
      }
      index++;
      current = current.next;
    }
    //没有找到节点返回-1
    return -1;
  }
  //upload 方法
  upload(newData, location = 0) {
    if (location < 0 || location >= this.length)
      throw "Invalid location may be due to the following reason [location>0 || location >= LinkedList.length]?";
    let index = 0;
    let current = this.head;
    while (index++ < location) {
      //找到location位置下的节点
      current = current.next;
    }
    //修改找到的节点的data数据 = newData
    current.data = newData;
    return true;
  }

  //removeAt 方法
  removeAt(location) {
    if (location < 0 || location >= this.length)
      throw "Invalid location may be due to the following reason [location>0 || location >= LinkedList.length]?";
    // 方法一
    if (location === 0) {
      this.head = this.head.next;
    } else {
      let index = 0;
      let current = this.head;
      let perCurrent = null;
      while (index++ < location) {
        //location位置前一个节点
        perCurrent = current;
        //获取location位置的节点
        current = current.next;
      }
      perCurrent.next = current.next;
      // 将链表的length-1
      this.length--;
      //将删除的数据返回
      return current.data;
    }
    //方法二 使用get方法 注意：get方法必须是返回节点
    // let perCurrent = this.get(location-1)
    // if (location === 0){
    //     this.head = this.head.next
    //     return  true
    // }else  if (location === this.length-1){
    //     perCurrent.next = null
    //     return true
    // }else {
    //     perCurrent.next = perCurrent.next.next
    //     return true
    // }
  }

  //remove 方法
  remove(data) {
    const index = this.indexOf(data);
    if (index === -1) throw `${data} is not defined`;
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
}

//test
const linkedList = new LinkedList();
linkedList.append("张三");
linkedList.append("李四");
linkedList.append("王五");
linkedList.insert("刘6", 3);
// console.log(linkedList.get(1))  //李四
// console.log(linkedList.indexOf('王五'))  //2
linkedList.upload("杨7", 2);
console.log(linkedList.removeAt(3)); //李四
// console.log(linkedList.isEmpty())  //false
// linkedList.remove('张三')
// console.log(linkedList.size())
console.log(linkedList.toString());
