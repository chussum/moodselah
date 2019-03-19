import dotenv from "dotenv";
dotenv.config({ path: '../../.env' });

import jwt from "jsonwebtoken";

const createJWT = (id: number): string => {
  const token = jwt.sign(
    {
      id
    },
    process.env.JWT_TOKEN || ""
  );
  return token;
};

export default createJWT;
