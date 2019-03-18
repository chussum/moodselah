import isObject from 'lodash-es/isObject';
import isArray from 'lodash-es/isArray';

export const KEY = {
  USER: 'user'
};

const prefix = 'MOODSELAH_';
const storage =
  typeof localStorage === 'object'
    ? localStorage
    : {
        clear: () => {},
        getItem: () => {},
        setItem: () => {},
        removeItem: () => {}
      };

const clear = () => storage.clear();

const get = (key: string, defaultValue?: string): any => {
  const value = storage.getItem(prefix + key);
  if (!value) {
    return defaultValue;
  }
  try {
    return JSON.parse(value);
  } catch (e) {
    return value;
  }
};

const setObject = (key: string, value: any) => {
  storage.setItem(prefix + key, JSON.stringify(value));
  return get(key);
};

const set = (key: string, value: any): any => {
  if (isObject(value) || isArray(value)) {
    return setObject(key, value);
  }
  storage.setItem(prefix + key, value);
  return get(key);
};

const remove = (key: string) => {
  storage.removeItem(prefix + key);
};

export default {
  get,
  set,
  setObject,
  remove,
  clear
};
