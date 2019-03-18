import * as React from 'react';
import uniqueId from 'lodash/uniqueId';

const newlineRegex = /(\r\n|\r|\n)/g;

export default (str: string | number) => {
  if (typeof str === 'number') {
    return str;
  }
  if (typeof str !== 'string') {
    return '';
  }
  return str.split(newlineRegex).map(line => {
    if (line.match(newlineRegex)) {
      return <br key={uniqueId()} />;
    }
    return line;
  });
};
