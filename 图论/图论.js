const Dictionary = require("../字典/字典");
const Queue = require("../队列结构/队列结构");
class Graph {
  constructor() {
    this.vertexes = []; //顶点（数组）
    this.edges = new Dictionary(); //边（字典）
    this.initColor();
  }

  //增加顶点和边
  addVertex(v) {
    this.vertexes.push(v);
    this.edges.set(v, []);
  }
  addEdge(v1, v2) {
    //无向图
    this.edges.get(v1).push(v2);
    this.edges.get(v2).push(v1);
  }

  toString() {
    let str = JSON.stringify(this.edges.items);
    return str.replaceAll(":", "<->");
  }

  initColor() {
    let colors = [];
    for (let i = 0; i < this.vertexes.length; i++) {
      colors[this.vertexes[i]] = "white";
    }
    return colors;
  }
  //广度优先搜索
  bts(initV, handlerCb) {
    let colors = this.initColor(); //初始化颜色（white -> 未被探测和访问 gary -> 被探测 black -> 被访问）
    const queue = new Queue(); //创建队列
    queue.enQueue(initV);
    while (!queue.isEmpty()) {
      //取出当前顶点
      let v = queue.deQueue();
      //获取当前顶点的edges
      let vEdges = this.edges.get(v);
      colors[v] = "gray"; //探测过后设置为灰色
      //遍历 vEdges
      for (let i = 0; i < vEdges.length; i++) {
        let e = vEdges[i];
        if (colors[e] === "white") {
          //加入队列之后就不再加入
          colors[e] = "gary";
          queue.enQueue(e);
        }
      }
      //当前顶点被探测后，访问
      handlerCb(v);
      //访问完后 设置颜色（black）
      colors[v] = "black";
    }
  }
  dfs(initV, handlerCb) {
    //栈 递归
    const colors = this.initColor();
    this.deepV(initV, colors, handlerCb);
  }
  deepV(v, colors, handlerCb) {
    colors[v] = "gary";
    // 处理v
    handlerCb(v);
    //获取当前顶点的edges
    let vEdges = this.edges.get(v);
    colors[v] = "gray"; //探测过后设置为灰色
    //遍历 vEdges
    for (let i = 0; i < vEdges.length; i++) {
      let e = vEdges[i];
      if (colors[e] === "white") {
        //加入队列之后就不再加入
        this.deepV(e, colors, handlerCb);
      }
    }
    //访问完后 colors[v] = black
    colors[v] = "black";
  }
}

const G = new Graph();

G.addVertex("A");
G.addVertex("B");
G.addVertex("C");
G.addVertex("D");
G.addVertex("E");
G.addVertex("F");
G.addVertex("G");

let edges = ["A", "B", "C", "D", "E", "F", "G"];

for (let i = 0; i < 10; i++) {
  let r1 = Math.floor(Math.random() * 7);
  let r2 = Math.floor(Math.random() * 7);
  if (r1 !== r2) {
    G.addEdge(edges[r1], edges[r2]);
  }
}
console.log(G.toString());
let res = "";
let cb = function (v) {
  res += v + " ";
};
// G.bts(G.vertexes[0] , cb)
G.dfs(G.vertexes[0], cb);
console.log(res);
console.log(G.edges);
