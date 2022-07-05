class ArrayList {
  constructor() {
    this.array = [2, 82, 56, 95, 74, 45, 62, 23, 88, 3, 52];
  }
  insert(value) {
    this.array.push(value);
  }
  toString() {
    return this.array.join("-");
  }
  swop(m, n) {
    let temp = this.array[m];
    this.array[m] = this.array[n];
    this.array[n] = temp;
  }
  //easySort
  easySort(){
    const length = this.array.length
    for (let i = 0; i < length; i++) {
      for (let j = i+1; j < length; j++) {
        if (this.array[i] > this.array[j]) {
          this.swop(i,j)
        } 
      }
    }
  }
  
  //冒泡排序
  bubblesSort() {
    let length = this.array.length;
    for (let i = length - 1; i >= 0; i--) {
      for (let j = 0; j < length - 1; j++) {
        //找到最大值放在后面
        if (this.array[j] > this.array[j + 1]) {
          //如果大于后面的数据 则交换数据
          let temp = this.array[j]; //保存前一个数据
          this.array[j] = this.array[j + 1]; //将后面小的数据赋给前面
          this.array[j + 1] = temp; //将前面大的数据赋给后面
        }
      }
    }
  }
  //选择排序
  selectSort() {
    let length = this.array.length;
    for (let j = 0; j < length - 1; j++) {
      let minIndex = j; //保存当前的j值
      for (let i = minIndex + 1; i < length; i++) {
        if (this.array[i] < this.array[minIndex]) {
          minIndex = i; //找到最小值的索引
        }
      }
      let temp = this.array[minIndex]; //保存了后面的最小值
      this.array[minIndex] = this.array[j];
      this.array[j] = temp;
    }
  }
  //插入排序
  insertSort() {
    let length = this.array.length;
    //外层循环
    for (let i = 0; i < length; i++) {
      const temp = this.array[i]; //保存当前选择的值
      let j = i; //保存索引值
      //向前遍历
      while (this.array[j - 1] > temp && j > 0) {
        //如果前面的值大于保存的值 则将前面的值往后移
        this.array[j] = this.array[j - 1];
        j--;
      }
      //当，当前选择的这个值比前面的值大的时候将保存的值保存到当前位置
      this.array[j] = temp;
    }
  }

  //希尔排序
  shallSort() {
    let length = this.array.length;
    let gap = Math.ceil(length / 2); //取间隔
    while (gap >= 1) {
      //与gap间隔取值 分组进行插入排序
      //每次取 间隔gap后的值
      for (let i = gap; i < length; i += gap) {
        let temp = this.array[i]; //找到间隔gap的元素
        let j = i;
        //如果以当前i位置以间隔gap前的元素 是 大于当前位置元素时，则大的元素向后移动gap位置
        //向前查找temp值最适合的的位置j（间隔gap查找）
        while (this.array[j - gap] > temp && j > gap - 1) {
          this.array[j] = this.array[j - gap];
          j -= gap; //每次取gap间隔的元素
        }
        //给数组索引j赋值
        this.array[j] = temp;
      }
      //将gap缩小
      gap = Math.floor(gap / 2);
    }
  }
  //快速排序
  middle(left, right) {
    let center = Math.floor((left + right) / 2);
    if (this.array[left] > this.array[center]) {
      this.swop(left, center);
    }
    if (this.array[center] > this.array[right]) {
      this.swop(center, right);
    }
    if (this.array[left] > this.array[right]) {
      this.swop(left, right);
    }
    this.swop(center, right - 1);
    return this.array[right - 1];
  }
  quickSort() {
    this.quick(0, this.array.length - 1);
  }
  quick(left, right) {
    if (left >= right) return;
    const pivot = this.middle(left, right); //拿到中枢值
    let i = left; //向右
    let j = right - 1; //向左
    ////当索引相等的时候或者 ，前者的索引大于后者的索引的时候跳出循环
    while (i < j) {
      while (this.array[++i] < pivot) {} //向右寻找 元素大于中枢值 并得到索引
      while (this.array[--j] > pivot) {} //向左寻找 元素小于中枢值 并得到索引
      // 交换值
      if (i < j) {
        //当找到的前者的索引小于于后者的索引的时候跳出循环 交换位置
        let temp = this.array[i];
        this.array[i] = this.array[j];
        this.array[j] = temp;
      }
    }
    this.swop(i, right - 1);
    //分而治之(递归 i左边 i右边)（递归）
    this.quick(left, i - 1);
    this.quick(i + 1, right);
  }
}

const arr = new ArrayList();

// arr.bubblesSort();
// arr.selectSort();
arr.insertSort();
// arr.shallSort();
// arr.quickSort();
// arr.easySort()
console.log(arr.toString());


