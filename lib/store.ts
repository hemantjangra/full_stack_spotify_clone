import { createStore, action } from "easy-peasy";

interface IStore {
  activeSongs: Array<any>;
  activeSong: any | null;
  changeActiveSongs: any;
  changeActiveSong: any;
}

export const store = createStore<IStore>({
  activeSongs: [],
  activeSong: null,
  changeActiveSongs: action((state: any, payload) => {
    state.activeSongs = payload;
  }),
  changeActiveSong: action((state: any, payload) => {
    state.activeSong = payload;
  }),
});
