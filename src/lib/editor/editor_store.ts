import { writable, readable } from 'svelte/store';
import Game from '../engine/game';
import gameJson from '../../assets/starter_game.json';

function createGameStore() {
  const workingGame = new Game(gameJson);

  const { subscribe, set, update } = writable(workingGame);

  function addGameData(data_type: DataType, data) {
    const newData = workingGame[data_type.toString()].slice(0);
    newData.sort((a,b) => {
      const idA = a.id.toUpperCase();
      const idB = b.id.toUpperCase();

      if (idA < idB) return -1;
      if (idA > idB) return 1;
      return 0;
    })

    console.log(newData);
    const prefix = data_type[0].toLowerCase();
    let newIdNum = 0;
    if (newData.length > 0) {
      const lastId = newData[newData.length - 1].id; 
      const lastIdNum = parseInt(lastId.slice(1));

      if (lastIdNum) newIdNum = lastIdNum + 1;
    }
    data.id = prefix + newIdNum;
    newData.push(data);
    console.log(data);
    console.log(newData);

    workingGame[data_type] = newData;
    set(workingGame);
  };

  function modifyGameData() {

  };

  function deleteGameData() {

  };

  function replaceGameData() {

  }

  return {
    subscribe,
    updateData: (update: FieldUpdate) => {

      if (update.change_type === ChangeType.Add) {
        addGameData(update.data_type, update.value);
        return;
      }

      let index;
      // navigate internal game path
      switch (update.data_type) {
        case(DataType.Tile):
          index = workingGame.tiles.findIndex(tile => tile.id === update.id)
          break;
        default:
          console.log('Unwilling to handle operation');
          break;
      }

      if (index < 0) {
        console.log('Unable to find element %s', update.id);
      }

      // perform operation
    },
    update,
    reset: () => set(workingGame)
  };
}

declare type FieldUpdate = {
  data_type: DataType,
  id?: string,
  change_type: ChangeType,
  field?: string,
  value
}

enum DataType {
  Room = 'rooms',
  Palette = 'palettes',
  Backdrop = 'backdrops',
  Tile = 'tiles',
  Sprite = 'sprites',
  Portrait = 'portraits',
  Actor = 'actors',
  Script = 'scripts'
}

enum ChangeType {
  Add = 'add',
  Delete = 'delete',
  Modify = 'modify',
  Replace = 'replace'
}


export const gameStore = createGameStore();
export const referenceGame = readable(new Game(gameJson));
