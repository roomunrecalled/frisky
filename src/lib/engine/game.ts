class Game {
  metadata: GameMetadata

  rooms: Room[]
  palettes: Palette[]
  backdrops: Backdrop[]
  tiles: Tile[]
  sprites: Sprite[]
  portraits: Portrait[]
  actors: Actor[]
  scripts: Script[]

  constructor (gameJson: { metadata: GameMetadata, data: GameData}) {
    this.metadata = gameJson.metadata;
    this.rooms = gameJson.data.rooms
    this.palettes = gameJson.data.palettes
    this.backdrops = gameJson.data.backdrops
    this.tiles = gameJson.data.tiles
    this.sprites = gameJson.data.sprites
    this.portraits = gameJson.data.portraits
    this.actors = gameJson.data.actors
    this.scripts = gameJson.data.scripts
  }
}

declare type GameMetadata = {
  title: string, 
  author: string, 
  frisky_version: string, 
  init_data: {
    room_id: string,
    position: number[] 
  } 
}

declare type GameData = {
  rooms: Room[],
  palettes: Palette[],
  backdrops: Backdrop[],
  tiles: Tile[],
  sprites: Sprite[],
  portraits: Portrait[],
  actors: Actor[],
  scripts: Script[]
}

declare type Room = {
  id: string,
  name: string,
  background_color: string,
  foreground_color: string,
  palette_id: string,
  backdrop_id: string,
  actor_ids: string[]
}

declare type Palette = {
  id: string,
  name: string,
  colors: string[]
}

declare type Backdrop = {
  id: string,
  name: string,
  data: number[]
}

declare type Tile = {
  id: string,
  name: string,
  data: number[]
  is_solid: boolean
}

declare type Sprite = {

}

declare type Portrait = {

}

declare type Actor = {

}

declare type Script = {

}


export default Game;
