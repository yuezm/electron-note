export interface INoteConfig {
  doc: string;
  img: string;
}

export interface IVuexState {
  selectMenu?: IMenuItem;
}

export interface IMenuItem {
  path: string;
  title: string;
}


export enum EModalType {
  ADD = 1,
  EDIT = 2,
}
