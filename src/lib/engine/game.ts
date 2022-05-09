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

  static fromJson (gameJson: { metadata: GameMetadata, data: GameData}) {
    const game = new Game();

    game.metadata = gameJson.metadata;
    game.rooms = gameJson.data.rooms
    game.palettes = gameJson.data.palettes
    game.backdrops = gameJson.data.backdrops
    game.tiles = gameJson.data.tiles
    game.sprites = gameJson.data.sprites
    game.portraits = gameJson.data.portraits
    game.actors = gameJson.data.actors
    game.scripts = gameJson.data.scripts
  }

  static parse (rawGame: string) {
    const game = new Game();

    const gameSegments = rawGame.split(gameSectionRegex);
    console.log(gameSegments);
    const segmentMap = generateSegmentMap(gameSegments);
    console.log(segmentMap);

    game.metadata = parseMetadata(
      getRawSegment(gameSegments,segmentMap,GameDataType.Metadata));
    game.rooms = parseRooms(
      getRawSegment(gameSegments,segmentMap,GameDataType.Room));
    game.palettes = parsePalettes(
      getRawSegment(gameSegments,segmentMap,GameDataType.Palette));
    game.backdrops = parseBackdrops(
      getRawSegment(gameSegments,segmentMap,GameDataType.Backdrop));
    game.tiles = parseTiles(
      getRawSegment(gameSegments,segmentMap,GameDataType.Tile));
    game.sprites = parseSprites(
      getRawSegment(gameSegments,segmentMap,GameDataType.Sprite));
    game.portraits = parsePortraits(
      getRawSegment(gameSegments,segmentMap,GameDataType.Portrait));
    game.actors = parseActors(
      getRawSegment(gameSegments,segmentMap,GameDataType.Actor));
    game.scripts = parseScripts(
      getRawSegment(gameSegments,segmentMap,GameDataType.Script));

    return game;
  }
}

const gameSectionRegex = new RegExp('(?<segment_name>::[A-Z]{4,8}::)')

function generateSegmentMap(gameSegmentArray: string[]) {
  return gameSegmentArray.reduce(
    (filtered, currentValue, index) => {
      if (gameSectionRegex.test(currentValue)) {
        const result = currentValue.match(currentValue);
        filtered.push({
          // This would be very inadvisable except that any regex matches will
          // always be bookended by '::'. Now its just inadvisable.
          section: result[0].slice(2,-2),
          index: index
        })
      }

      return filtered;
    }, []
  )
}

function getRawSegment(
    gameSegments: string[], 
    gameSegmentMap: { section: string, index: number }[], 
    segmentName: GameDataType) {
  const item = gameSegmentMap.find((element) => element.section === segmentName.toString())

  if (item) {
    return gameSegments[item.index + 1];
  }
  else {
    return '';
  }
}

function parseData(rawSegment: string) {
  return rawSegment.split(/\n+/).filter(
    element => element.length > 0 && !element.startsWith('#'));
}

function parseMetadata(rawSegment: string) {
  const lines = parseData(rawSegment);
  const metadata = {
    author: '',
    frisky_version: '',
    game_version: '',
    init_pos: [0,0],
    init_room_id: '',
    title: ''
  };

  for (const line of lines) {
    const [fieldName, ...values] = line.split(' ');
    if (fieldName !== 'INIT_POS') {
      metadata[fieldName.toLocaleLowerCase()] = values.join(' ');
    } else {
      metadata[fieldName.toLocaleLowerCase()] = 
        [parseInt(values[0]), parseInt(values[1])];
    }
  }
  console.log(metadata);

  return metadata;
}

function parseRooms(rawSegment: string) {
  const lines = parseData(rawSegment);
  console.log(lines);
}

function parsePalettes(rawSegment: string) {
  const lines = parseData(rawSegment);
  console.log(lines);
}

function parseBackdrops(rawSegment: string) {
  const lines = parseData(rawSegment);
  console.log(lines);
}

function parseTiles(rawSegment: string) {
  const lines = parseData(rawSegment);
  console.log(lines);
}


function parseSprites(rawSegment: string) {
  const lines = parseData(rawSegment);
  console.log(lines);
}

function parsePortraits(rawSegment: string) {
  const lines = parseData(rawSegment);
  console.log(lines);
}

function parseActors(rawSegment: string) {
  const lines = parseData(rawSegment);
  console.log(lines);
}

function parseScripts(rawSegment: string) {
  const lines = parseData(rawSegment);
  console.log(lines);
}

enum GameDataType {
  Metadata = 'META',
  Room = 'ROOM',
  Palette = 'PALETTE',
  Backdrop = 'BACKDROP',
  Tile = 'TILE',
  Sprite = 'SPRITE',
  Portrait = 'PORTRAIT',
  Actor = 'ACTOR',
  Script = 'Script'
}

declare type GameMetadata = {
  title: string, 
  author: string, 
  frisky_version: string, 
  game_version: string,
  init_room_id: string,
  init_pos: number[] 
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
