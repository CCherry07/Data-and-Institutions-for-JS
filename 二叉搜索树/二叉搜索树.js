class BST {
  constructor() {
    this.Node = class Node {
      constructor(key, value) {
        this.left = null; //左子节点
        this.right = null; //右子节点
        this.value = value; //数据
        this.key = key; //key值
      }
    };
    this.root = null;
  }

  //插入节点数据
  insert(key, value) {
    //根据key创建节点
    const newNode = new this.Node(key, value);
    //判断根节点是否有值
    if (this.root === null) {
      this.root = newNode;
    } else {
      //遍历查找并插值
      this.insertNode(this.root, newNode);
    }
  }

  //插入新节点
  insertNode(oldNode, newNode) {
    if (newNode.key < oldNode.key) {
      //向左查找
      if (oldNode.left === null) {
        oldNode.left = newNode;
      } else {
        //如果还存在节点 ， 就再次查找，直到null
        this.insertNode(oldNode.left, newNode);
      }
    } else {
      //向右查找
      if (oldNode.right === null) {
        oldNode.right = newNode;
      } else {
        //如果还存在节点 ， 就再次查找，直到null
        this.insertNode(oldNode.right, newNode);
      }
    }
  }

  //树的遍历（先序）
  preOrderTraversal(resCb) {
    this.preOrderTraversalNode(this.root, resCb);
  }
  preOrderTraversalNode(node, resCb) {
    if (node) {
      resCb(node.key);
      //这里可以对节点的里面的数据进行操作
      this.preOrderTraversalNode(node.left, resCb); //(压栈过程的操作 递 )
      //压栈过程处理完成（node.left处理完） ，再处理（node.right） （弹栈过程的操作 归 ）
      this.preOrderTraversalNode(node.right, resCb);
    }
  }

  //树的遍历（中序）
  midOrderTraversal(cb) {
    this.midOrderTraversalNode(this.root, cb);
  }
  midOrderTraversalNode(node, cb) {
    if (node) {
      //遍历左子树
      this.midOrderTraversalNode(node.left, cb);
      //处理节点的hook
      cb(node.key);
      //遍历右子树
      this.midOrderTraversalNode(node.right, cb);
    }
  }

  //树的遍历 （后序）
  postOrderTraversal(cb) {
    this.postOrderTraversalNode(this.root, cb);
  }
  postOrderTraversalNode(node, cb) {
    if (node) {
      //遍历左子树
      this.postOrderTraversalNode(node.left, cb);
      //遍历右子树
      this.postOrderTraversalNode(node.right, cb);
      //处理节点
      cb(node.key);
    }
  }
  //获取最小值
  min() {
    let node = this.root;
    while (node.left !== null) {
      node = node.left;
    }
    return node.key;
  }
  //获取最大值
  max() {
    let node = this.root;
    while (node.right !== null) {
      node = node.right;
    }
    return node.key;
  }

  //获取节点的值
  get(key) {
    let current = this.root;
    while (current) {
      if (key > current.key) {
        current = current.right;
      } else if (key < current.key) {
        current = current.left;
      } else {
        return current.value;
      }
    }
    return null;
  }

  //删除节点
  remove(key) {
    let current = this.root; //当前节点
    let preNode = null; //父节点
    let isLeftNode = true; //判断是否为左节点

    while (current.key !== key) {
      preNode = current;
      if (key < current.key) {
        isLeftNode = true;
        current = current.left;
      } else {
        isLeftNode = false;
        current = current.right;
      }
      //当遍历完整棵树都没有找到 return false
      if (!current) return false;
    }
    //current 是叶节点
    if (!current.left && !current.right) {
      //current 是根节点
      if (current === this.root) {
        let value = this.root.value;
        this.root = null;
        return value;
      }
      //current 是叶节点
      isLeftNode ? (preNode.left = null) : (preNode.right = null);
    } else if (current.left && current.right) {
      // 存在两个子节点
      let successor = this.getSuccessor(current); //后继（右子树）
      if (this.root === current) {
        //删除 根节点
        this.root = successor;
      } else if (isLeftNode) {
        preNode.left = successor;
      } else {
        preNode.right = successor;
      }
      successor.left = current.left;
    } else {
      //只存在一个子节点
      // current 是根节点 并且 current 存在一个左节点
      if (current === this.root)
        return (this.root = current.left || current.right);
      // 方法一
      isLeftNode
        ? (preNode.left = current.left || current.right)
        : (preNode.right = current.left || current.right);
      //方法二
      // if(!!current.left){ // current存在左节点
      //     if (current === this.root){
      //         this.root = current.left
      //     }else if (isLeftNode){ //current 是父节点的的左节点
      //         preNode.left = current.left
      //     }else {
      //         preNode.right = current.left
      //     }
      // }else {// current存在右节点
      //     if (current === this.root){
      //         this.root = current.right
      //     }else if (isLeftNode){//current 是父节点的的左节点
      //         preNode.left = current.right
      //     }else {
      //         preNode.right = current.right
      //     }
      // }
    }
    return current.value;
  }

  //前驱（找到左子树最大的）
  getPrecursor(delNode) {
    let prePrecursor = delNode;
    let precursor = delNode;
    let current = delNode.left;
    while (current !== null) {
      prePrecursor = precursor; //保存successor的父节点
      precursor = current; //precursor节点
      current = current.right; //  一直向右遍历 找到最小的值
    }
    if (precursor !== delNode.left) {
      prePrecursor.right = precursor.left;
      precursor.left = delNode.left;
    }
    return precursor;
  }
  //后继（找到右子树里最小的节点）
  getSuccessor(delNode) {
    let preSuccessor = delNode;
    let successor = delNode;
    let current = delNode.right;
    while (current !== null) {
      preSuccessor = successor; //保存successor的父节点
      successor = current; //successor节点
      current = current.left; // 一直向左遍历 找到最大的值
    }
    if (successor !== delNode.right) {
      preSuccessor.left = successor.right;
      successor.right = delNode.right;
    }
    return successor;
  }

  toString() {
    return JSON.stringify(this);
  }
}

const bst = new BST();
bst.insert(9, "张三");
bst.insert(11, "李四");
bst.insert(7, "王五");
bst.insert(12, "kobe");
bst.insert(7, "刘6");
bst.insert(10, "刘6");
bst.insert(15, "你好");
console.log(bst.toString());
let resStr = "";
const res = function (nodeKey) {
  resStr += nodeKey + " ";
};

// bst.preOrderTraversal(res) //先序

console.log(bst.remove(11));
// console.log(bst.max())
// console.log(bst.min())
bst.midOrderTraversal(res); //中序

// console.log(bst.get(10))
// console.log(resStr);
// console.log(bst.toString())
