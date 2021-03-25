export default class ScorePannel {
  score: number = 0;
  level: number = 1;
  scoreElement: HTMLElement;
  levelElement: HTMLElement;

  constructor(){
    this.scoreElement = document.getElementById("score")!;
    this.levelElement = document.getElementById("level")!;
  }

  // 加分
  scored(): void{
    this.scoreElement.innerHTML = `${++this.score}`
    if (this.score % 10 === 0) {
      this.levelUp()
    }
  }

  // 升级
  levelUp(): void{
    if (this.level < 10) {
      this.levelElement.innerHTML = `${++this.level}`
    }
  }
}