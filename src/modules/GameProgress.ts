import Food from './Food'
import ScorePannel from './ScorePannel'
import Snake from './Snake'

export default class GameProgress {
  food: Food
  snake: Snake
  scorePannel: ScorePannel

  direction: string = ""
  isAlive: boolean = true

  constructor(){
    this.food = new Food()
    this.snake = new Snake()
    this.scorePannel = new ScorePannel()
    this.initGame()
  }

  // 初始化游戏
  initGame(): void{
    document.addEventListener("keydown", this.keyDownHandler.bind(this))
    this.move()
  }

  // 键盘按下
  keyDownHandler(event: KeyboardEvent): void{
    switch (event.key) {
      case "Up":
      case "ArrowUp":
      case "Down":
      case "ArrowDown":
      case "Left":
      case "ArrowLeft":
      case "Right":
      case "ArrowRight":
        this.direction = event.key
        break;
      default:
        break;
    }
  }

  // 检测是否吃到食物
  isScored(X: number, Y: number){
    if (X === this.food.X && Y === this.food.Y) {
      this.food.generateFood()
      this.snake.grow()
      this.scorePannel.scored()
    }
  }

  // 蛇移动
  move(): void{
    let X = this.snake.X
    let Y = this.snake.Y
    switch (this.direction) {
      case "Up":
      case "ArrowUp":
        Y -= 10
        break;
      case "Down":
      case "ArrowDown":
        Y += 10
        break;
      case "Left":
      case "ArrowLeft":
        X -= 10
        break;
      case "Right":
      case "ArrowRight":
        X += 10
        break;
    }

    this.isScored(X, Y)

    try {
      this.snake.X = X
      this.snake.Y = Y
    } catch (error) {
      alert(error.message + "，游戏结束！")
      this.isAlive = false
    }

    this.isAlive && setTimeout(this.move.bind(this), 300)
  }
}