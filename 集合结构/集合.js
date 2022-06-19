class Set {
  constructor(values) {
    if (values instanceof Array) this.add(values);
    this.items = {};
  }
  // add 方法
  add(value) {
    //传入的是Array
    if (value instanceof Array) {
      for (let i = 0; i < value.length; i++) {
        if (this.has(value[i])) continue;
        this.items[value[i]] = value[i];
      }
      return true;
    }
    //判断集合里面是否有这个value
    if (this.has(value)) {
      return false;
    }
    this.items[value] = value;
    return true;
  }
  has(value) {
    if (!value) throw `${value} is undefined`;
    return this.items.hasOwnProperty(value);
  }
  remove(value) {
    if (!this.has(value)) return false;
    //删除value
    delete this.items[value];
  }
  clear() {
    this.items = {};
  }
  size() {
    return Object.keys(this.items).length;
  }
  isEmpty() {
    return Object.keys(this.items).length === 0;
  }
  values() {
    return Object.keys(this.items);
  }

  union(otherSet) {
    let newSet = new Set();
    newSet.add([...this.values(), ...otherSet.values()]);
    return newSet;
  }
  //求交集
  intersection(otherSet) {
    let newSet = new Set();
    //方法一 (双重for循环)
    // if (this.size() > otherSet.size()){
    //     for (let i=0 ; i<otherSet.size() ; i++){
    //         for (let j= 0 ; j<this.size() ; j++){
    //             if (otherSet.values()[i] === this.values()[j]){
    //                 newSet.add(otherSet.values()[i])
    //             }
    //         }
    //     }
    // }else {
    //     for (let i=0 ; i<this.size() ; i++){
    //         for (let j = 0 ; j<otherSet.size() ;j++){
    //             if (otherSet.values()[j] === this.values()[i]){
    //                 newSet.add(this.values()[i])
    //             }
    //         }
    //     }
    // }

    //方法二
    //如果this的元素个数大于otherSet的元素个数，就遍历小（otherSet）的集合
    if (this.size() > otherSet.size()) {
      for (let i = 0; i < otherSet.size(); i++) {
        //如果this集合中存在otherSet的元素，就将这个元素放在新的（newSet）里面
        if (this.has(otherSet.values()[i])) {
          newSet.add(otherSet.values()[i]);
        }
      }
    } else {
      for (let i = 0; i < this.size(); i++) {
        if (otherSet.has(this.values()[i])) {
          newSet.add(this.values()[i]);
        }
      }
    }
    return newSet;
  }

  //求差集
  subtraction(otherSet) {
    let newSet = new Set();
    //拿到otherSet的集合大小
    for (let i = 0; i < otherSet.size(); i++) {
      //判断this集合的是否存在otherSet的value ->不存在就保存在newSet集合中
      if (!this.has(otherSet.values()[i])) {
        newSet.add(otherSet.values()[i]);
      }
    }
    return newSet;
  }
  //判断是否为一个子集
  childCollection(otherSet) {
    //判断otherSet中元素的个数 大于 this集合 就返回false
    if (otherSet.size() > this.size()) return false;
    for (let i = 0; i < otherSet.size(); i++) {
      //判断otherSet中元素是否在 this集合中存在 ， 不存在就返回false
      if (!this.has(otherSet.values()[i])) {
        return false;
      }
    }
    return true;
  }
}
const set = new Set();
const otherSet = new Set();
set.add("张三");
set.add("张三");
set.add("李四");

otherSet.add("王五");
// otherSet.add('张三')
otherSet.add("李四");
// console.log(set.union(otherSet).values())
// console.log(set.intersection(otherSet).values())
// console.log(set.subtraction(otherSet).values())
console.log(set.childCollection(otherSet));
// set.remove("张三")
// console.log(set.size())
// console.log(set.values())

module.exports = Set;
