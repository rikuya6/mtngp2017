class MoveController {
  constructor() {
    this.label = ["moveStraight", "moveRight", "moveDown", "moveLeft", "setHitTurnLeft", "setHitTurnRight"];
    this.orders = [];
    this.turn_direction = 0;
    this.finish = false;
  }

  moveStraight() {
    this.orders.push(0);
    console.log(this.label[0]);
  }

  moveRight() {
    this.orders.push(1);
    console.log(this.label[1]);
  }

  moveDown() {
    this.orders.push(2);
    console.log(this.label[2]);
  }

  moveLeft() {
    this.orders.push(3);
    console.log(this.label[3]);
  }

  setHitTurnLeft() {
    this.turn_direction = 0;
    console.log(this.label[4]);
  }

  setHitTurnRight() {
    this.turn_direction = 1;
    console.log(this.label[5]);
  }

  getHitTurnDirection() {
    return this.turn_direction;
  }

  hasNextOrder() {
    return this.orders.length > 0 && this.finish;
  }

  nextOrder() {
    if (!this.hasNextOrder()) throw new Error("次のorderが空です。");
    return this.orders.shift();
  }

  execute() {
    this.finish = true;
  }

  stop() {
    this.finish = false;
    this.deleteAllOrder();
  }

  deleteAllOrder() {
    this.orders = [];
  }

  printAllOrder() {
    for (var e in this.orders) {
      console.log(this.label[this.orders[e]]);
    }
  }

  printNextOrder() {
    if (this.hasNextOrder()) console.log(this.label[this.orders[0]]);
    else console.log("次のorderが空です。");
  }
}
