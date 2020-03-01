import { basename } from 'path';
import marked from 'marked';


export const isEmpty = (data: any | any[]) =>
  Array.isArray(data)
    ? data.length < 1
    : data === '' || data === null || data === undefined;


export const addExt = (p: string, ext: string = '.md') => {
  return p.includes(ext) ? p : p + ext;
};

export const removeExt = (p: string, ext: string = '.md') => {
  return basename(p, ext);
};


export const transMDToHtml = (m: string) => {
  return marked(m);
};
