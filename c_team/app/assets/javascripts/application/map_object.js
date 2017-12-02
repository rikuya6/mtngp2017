class MapObject {
  constructor(game, map, asset, hitStatus) {
    this.sprite = new Sprite(spriteSize.x, spriteSize.y);
    this.sprite.image = game.assets[asset];
    this.sprite.defaultHitStatus = hitStatus;
    this.map = map;
  }

  getSprite() {
    return this.sprite;
  }

  changeCollisionData(x, y, state) {
    let width = this.map._image.width;
    let height = this.map._image.height;
    let tileWidth = this.map._tileWidth || width;
    let tileHeight = this.map._tileHeight || height;
    x = x / tileWidth | 0;
    y = y / tileHeight | 0;
    if (this.map.collisionData[y + 1][x + 1] == 3) state = 3; // マップの外のため変更対象外
    this.map.collisionData[y + 1][x + 1] = state;
  }
}
