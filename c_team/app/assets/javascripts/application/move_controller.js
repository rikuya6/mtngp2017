class MoveController {
  constructor() {
    this.label = ["moveStraight", "moveRight", "moveDown", "moveLeft", "setHitTurnLeft", "setHitTurnRight"];
    this.orders = [];
    this.originOrders = null;
    this.order_execute_counter = 0;
    this.turn_direction = 0; // デフォルト: 左へ向きを変える
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
    if (!this.finish) return false;
    if (this.order_execute_counter > 50) {
      // @TODO 暫定実装, 無限ループの抑止
      this.stop();
      return false;
    }
    if (this.orders.length > 0) return true;
    this.restoreOriginOrder(); // ゴールに辿り着くまで、命令を再実行する
    return true;
  }

  nextOrder() {
    this.order_execute_counter++;
    if (!this.hasNextOrder()) throw new Error("次のorderが空です。");
    return this.orders.shift();
  }

  restoreOriginOrder() {
    this.orders = [].concat(this.originOrders);
  }

  execute() {
    this.originOrders = [].concat(this.orders);
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
