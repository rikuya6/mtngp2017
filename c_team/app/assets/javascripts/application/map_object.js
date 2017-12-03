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

  getMapArrayX(mapX) {
    let width = this.map._image.width;
    let tileWidth = this.map._tileWidth || width;
    return mapX / tileWidth | 0;
  }

  getMapArrayY(mapY) {
    let height = this.map._image.height;
    let tileHeight = this.map._tileHeight || height;
    return mapY / tileHeight | 0;
  }

  getCollisionData(mapArrayX, mapArrayY) {
    return this.map.collisionData[mapArrayY][mapArrayX];
  }

  setCollisionData(mapArrayX, mapArrayY, state) {
    this.map.collisionData[mapArrayY][mapArrayX] = state;
  }

  hasMapObjectTray(pos) {
    return !!((this.map.mapObjectTray >> pos) & 1);
  }

  setMapObjectTray(pos) {
    this.map.mapObjectTray |= (1 << pos);
  }

  resetMapObjectTray(pos) {
    this.map.mapObjectTray &= ~(1 << pos);
  }

  changeCollisionData(mapX, mapY, nstate) {
    let x = this.getMapArrayX(mapX);
    let y = this.getMapArrayY(mapY);
    let currentState =  this.getCollisionData(x + 1, y + 1);
    if (currentState == 3) nstate = 3; // マップの外のため変更対象外
    this.setCollisionData(x + 1, y + 1, nstate);
  }
}
