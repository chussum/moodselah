import JSON5 from "json5";
import isArray from "lodash/isArray";
import isObject from "lodash/isObject";
import { Between, In, LessThan, Like, MoreThan, Not } from "typeorm";

const OPERATORS = {
  lt: LessThan,
  gt: MoreThan,
  not: Not,
  like: Like,
  in: In,
  between: Between
};

const matchOperators = (obj: any) => {
  const data = {};
  Object.keys(obj).forEach(key => {
    const value = obj[key];
    if (!isArray(value) && isObject(value)) {
      data[key] = matchOperators(value);
      return;
    }
    const matches = key.match(/(.+)\_(.+)/);
    if (!matches || matches.length !== 3) {
      data[key] = value;
      return;
    }
    const column = matches[1];
    const operator = matches[2];
    switch (operator) {
      case "between":
        data[column] = OPERATORS[operator](value[0], value[1]);
        break;
      default:
        data[column] = OPERATORS[operator](value);
        break;
    }
  });
  return data;
};

export const parseWhereString = (where: any): any => {
  try {
    const json = JSON5.parse(where);
    return matchOperators(json);
  } catch (error) {
    return undefined;
  }
};

export const parseWhere = (where: any): any => {
  if (typeof where === "string") {
    return parseWhereString(where);
  }
  if (isObject(where)) {
    let whereObj = {};
    if (typeof where.where === "string") {
      try {
        whereObj = JSON5.parse(where.where);
        delete where.where;
      } catch (error) {
        // nothing todo
      }
    }
    whereObj = {
      ...whereObj,
      ...where
    };
    return matchOperators(whereObj);
  }
  return undefined;
};

export default parseWhere;
