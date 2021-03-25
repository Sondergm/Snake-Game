export default class Snake {
  headElement: HTMLElement; // 蛇头元素
  bodyElement: HTMLCollection; // 身体块元素
  bodyBoxElement: HTMLElement; // 身体盒元素
  
  constructor() {
    this.headElement = document.querySelector("#snake > div")!;
    this.bodyBoxElement = document.getElementById("snake")!;
    this.bodyElement = this.bodyBoxElement.getElementsByTagName('div');
  }

  // 获取蛇头横坐标
  get X(): number{
    return this.headElement.offsetLeft
  }

  // 获取蛇头纵坐标
  get Y(): number{
    return this.headElement.offsetTop
  }

  // 设置蛇头横坐标
  set X(value: number){
    // 蛇上下移动时，跳过设置横坐标
    if (this.X === value) {
      return
    }

    // 蛇撞墙
    if (value < 0 || value > 290) {
      throw new Error("蛇撞墙了");
    }

    // 防止蛇掉头
    if (this.bodyElement[1] && value === (this.bodyElement[1] as HTMLElement).offsetLeft) {
      if (value > this.X) {
        value = this.X - 10
      } else {
        value = this.X + 10
      }
    }

    this.bodyMove()
    this.headElement.style.left = `${value}px`
    this.eatSelf()
  }

  // 设置蛇头纵坐标
  set Y(value: number){
    if (this.Y === value) {
      return
    }

    if (value < 0 || value > 290) {
      throw new Error("蛇撞墙了");
    }

    if (this.bodyElement[1] && value === (this.bodyElement[1] as HTMLElement).offsetTop) {
      if (value > this.Y) {
        value = this.Y - 10
      } else {
        value = this.Y + 10
      }
    }

    this.bodyMove()
    this.headElement.style.top = `${value}px`
    this.eatSelf()
  }

  // 蛇吃食物后延长身体
  grow(): void{
    this.bodyBoxElement.insertAdjacentHTML("beforeend", "<div></div>")
  }

  // 身体移动
  bodyMove(): void{
    for (let i = this.bodyElement.length - 1; i > 0; i--) {
      let X = (this.bodyElement[i-1] as HTMLElement).offsetLeft;
      let Y = (this.bodyElement[i-1] as HTMLElement).offsetTop;
      (this.bodyElement[i] as HTMLElement).style.left = X + 'px';
      (this.bodyElement[i] as HTMLElement).style.top = Y + 'px';
    }
  }

  // 检测蛇头是否碰到身体
  eatSelf(): void{
    for (let i = 1; i < this.bodyElement.length; i++) {
      let X = (this.headElement as HTMLElement).offsetLeft;
      let Y = (this.headElement as HTMLElement).offsetTop;
      if (
        X === (this.bodyElement[i] as HTMLElement).offsetLeft
        && Y === (this.bodyElement[i] as HTMLElement).offsetTop
      ) {
        throw new Error("蛇撞到自己了");
      }
    }
  }
}