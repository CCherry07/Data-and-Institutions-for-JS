class Hash {
  constructor(limit) {
    //storage的元素是数据表（数组 | 链表）
    this.storage = [];
    //表示存在元素的个数
    this.count = 0;
    //当加载因子 > 0.75 扩容 < 0.25 缩小容量
    this.limit = limit ?? 7; //质数 表大小
  }
  //hash函数
  creatHash(str, size) {
    //1>定义hashCode初始值
    let hashCode = 0;
    //2>霍纳算法
    for (let i = 0; i < str.length; i++) {
      hashCode = 37 * hashCode + str.charCodeAt(i);
    }
    //将大数字hashCode 压缩在数组范围内： hash化（取余）
    return hashCode % size;
  }

  //插入&修改
  put(key, value) {
    //根据key获取index
    let index = this.creatHash(key, this.limit);
    //根据key 取得 对应的存数据表（数组 | 链表）
    let bucket = this.storage[index];
    //判断 bucket ？ 注：bucket是一个二维数组
    if (!bucket) {
      bucket = [];
      this.storage[index] = bucket;
    } else {
      //修改数据
      for (let i = 0; i < bucket.length; i++) {
        let tuple = bucket[i];
        if (tuple[0] === key) {
          tuple[1] = value;
          return true;
        }
      }
    }
    //添加数据
    bucket.push([key, value]);
    if (this.count > this.limit * 0.75)
      this.reSize(this.getPrime(this.limit * 2));
    this.count++;
  }

  //获取某一个元素
  get(key) {
    //根据key获取index
    let index = this.creatHash(key, this.limit);
    //根据key 取得 对应的存数据表（数组 | 链表）
    let bucket = this.storage[index];
    //判断 bucket ？
    if (!bucket) return null;
    //存在bucket
    for (let i = 0; i < bucket.length; i++) {
      let tuple = bucket[i];
      if (tuple[0] === key) {
        return tuple[1];
      }
    }
    //不存在 key对应的值
    return undefined;
  }
  //删除某一个元素
  remove(key) {
    //根据传入的key 获取对应的hashCode
    let index = this.creatHash(key, this.limit);
    //根据hashCode 取得 对应的数据表
    let bucket = this.storage[index];
    // 判断bucket ？
    if (!bucket) return false;
    //存在?
    for (let i = 0; i < bucket.length; i++) {
      //取到每一个bucket中的元素
      let tuple = bucket[i];
      if (tuple[0] === key) {
        //删除这个元素
        this.storage.splice(i, 1);
        this.count--;
        //缩小hash表容量
        if (this.count < this.limit * 2)
          this.reSize(this.getPrime(this.limit / 2));
        return tuple[1];
      }
    }
    return null;
  }
  //判断hash表元素是否为空
  isEmpty() {
    return this.count === 0;
  }
  //获取hash表元素的个数
  size() {
    return this.count;
  }

  //hash表容量操作
  reSize(newLimit) {
    //保存原来的哈希表
    let oldStorage = this.storage;

    //2.重置所有属性
    this.storage = [];
    this.count = 0;
    this.limit = newLimit;

    //遍历oldStorage 将数据迁移 至 新的this.storage
    for (let i = 0; i < oldStorage.length; i++) {
      let bucket = oldStorage[i];
      if (!bucket) continue;
      for (let j = 0; j < bucket.length; j++) {
        let tuple = bucket[j];
        this.put(tuple[0], tuple[1]);
      }
    }
  }

  //判断是否为一个质数
  isPrime(num) {
    let temp = parseInt(`${Math.sqrt(num)}`);
    for (let i = 2; i <= temp; i++) {
      if (num % i === 0) {
        return false;
      }
    }
    return true;
  }

  //获取质数的方法
  getPrime(num) {
    if (this.isPrime(num)) return num;
    while (!this.isPrime(num)) {
      num++;
    }
    return num;
  }
}

const hash = new Hash();

hash.put("张三", "18");

console.log(hash.get("张三")); // 18
hash.put("张三", 20);
console.log(hash.getPrime(14));
console.log(hash.remove("张三")); // 18
console.log(hash.get("张三")); //null
console.log(hash.storage);
