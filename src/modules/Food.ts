export default class Food{
  foodElement: HTMLElement;

  constructor() {
    this.foodElement = document.getElementById("food")!;
  }

  // 获取食物横坐标
  get X(){
    return this.foodElement.offsetLeft
  }

  // 获取食物纵坐标
  get Y(){
    return this.foodElement.offsetTop
  }

  // 设置食物横坐标
  set X(value: number){
    this.foodElement.style.left = `${value}px`
  }

  // 设置食物纵坐标
  set Y(value: number){
    this.foodElement.style.top = `${value}px`
  }

  // 重新随机生成食物位置
  generateFood(){
    const X = Math.round(Math.random() * 29) * 10
    const Y = Math.round(Math.random() * 29) * 10
    this.X = X
    this.Y = Y
  }
}