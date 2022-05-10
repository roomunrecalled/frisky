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
    //console.log(gameSegments);
    const segmentMap = generateSegmentMap(gameSegments);
    //console.log(segmentMap);

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

function generateSubdataMap(startingLineStartsWith: string, lines: string[]) {
  const tileDataMap = [];
  let startLine = 0;
  for (let i = 0; i < lines.length; i += 1) {
    if (lines[i].startsWith(startingLineStartsWith)) {
      startLine = i
    } else if (lines[i].startsWith('NAME')) {
      tileDataMap.push([startLine, i]);
    }
  }
 
  return tileDataMap;
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
  const rooms = []

  const roomDataMap = generateSubdataMap('ROOM', lines);
  for (const subsection of roomDataMap) {
    rooms.push(parseRoom(lines.slice(subsection[0], subsection[1] + 1)));
  }

  console.log(rooms);
  return rooms;
}

function parseRoom(roomLines: string[]) {
  const room = {
    id: 'r00',
    background_color: '#000',
    foreground_color: '#eee',
    palette_id: 'p00',
    backdrop_id: 'b00',
    actor_ids: [],
    name: ''
  };

  for (const line of roomLines) {
    const [field, ...values] = line.split(' ');

    switch(field) {
      case('ROOM'):
        room.id = values[0];
        break;
      case('BG'):
        room.background_color = values[0];
        break;
      case('FG'):
        room.foreground_color = values[0];
        break;
      case('ACTOR_IDS'):
        room.actor_ids = values;
        break;
      case('NAME'):
        room.name = values.join(' ');
        break;
      default:
        room[field.toLocaleLowerCase()] = values[0];
        break;
    }
  }

  return room;
}

function parsePalettes(rawSegment: string) {
  const lines = parseData(rawSegment);
  const palettes = []

  const paletteDataMap = generateSubdataMap('PAL', lines);
  for (const subsection of paletteDataMap) {
    palettes.push(parsePalette(lines.slice(subsection[0], subsection[1] + 1)));
  }

  console.log(palettes);
  return palettes;
}

function parsePalette(paletteLines: string[]) {
  const palette = {
    id: 'p00',
    colors: ['#000','#000','#000','#000'],
    name: ''
  }
  for (const line of paletteLines) {
    const [field, ...values] = line.split(' ');
    switch(field) {
      case('PAL'):
        palette.id = values[0];
        break;
      case('COLORS'):
        palette.colors = values;
        break;
      default:
        palette[field.toLocaleLowerCase()] = values.join(' ');
    }
  }

  return palette;
}

function parseBackdrops(rawSegment: string) {
  const lines = parseData(rawSegment);

  const backdrops = [];

  const backdropDataMap = generateSubdataMap('BACKDROP', lines);

  for (const subsection of backdropDataMap) {
    backdrops.push(
      parseBackdrop(lines.slice(subsection[0], subsection[1] + 1))
    );
  }
  console.log(backdrops);

  return backdrops;
}

function parseBackdrop(backdropLines: string[]) {
  const fieldRegex = new RegExp('^(BACKDROP|NAME) .+');
  const backdrop = {
    id: 'b00',
    data: [],
    name: ''
  }
  for (const line of backdropLines) {
    if (fieldRegex.test(line)) {
      const [field, ...values] = line.split(' ');
      switch (field) {
        case ('BACKDROP'):
          backdrop.id = values[0];
          break;
        default:
          backdrop[field.toLocaleLowerCase()] = values.join(' ');
          break;
      }
    } else {
      for (const tile of line.split(' ').filter(val => val.length > 0)) {
        backdrop.data.push(tile);
      }
    }
  }

  return backdrop;
}

function parseTiles(rawSegment: string) {
  const lines = parseData(rawSegment);

  const tiles = [];

  // Tile data should start with the 'TIL <id>' line and end with the
  // 'NAME <name>' line.
  const tileDataMap = generateSubdataMap('TIL', lines);
  //console.log(tileDataMap);

  for (const data of tileDataMap) {
    tiles.push(
      parseTile(lines.slice(data[0], data[1] + 1))
    )
  }
  console.log(tiles);

  return tiles;
}

function parseTile(tileLines: string[]) {
  //console.log(tileLines.join('\n'));
  const fieldRegex = new RegExp('^(TIL|IS_SOLID|NAME) .+');
  const tile = {
    id: 't00',
    name: 'tile',
    data: new Array(256),
    is_solid: false
  }

  let dataIndex = 0;
  for (const line of tileLines) {
    if (fieldRegex.test(line)) {
      const [field, ...values] = line.split(' ');
      switch (field) {
        case('TIL'):
          tile.id = values[0];
          break;
        case('IS_SOLID'):
          tile.is_solid = values[0] == 'true';
          break;
        default:
          tile[field.toLocaleLowerCase()] = values.join(' ');
      }
    // if the regex doesn't match, this line is image data.
    } else {
      for (const tileRow of line.split(' ').filter(val => val.length > 0)) {
        const numString = parseInt(tileRow, 16).toString(2).padStart(16, '0');
        for (const digit of numString) {
          tile.data[dataIndex] = parseInt(digit);
          dataIndex += 1;
        }
      }
    }
  }

  return tile;
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
