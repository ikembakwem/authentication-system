// Dependencies
import jwt from "jsonwebtoken";
import { encrypt, setBase64, getBase64 } from "@contentpi/lib";

// Configuration
import { $security } from "../../config";

// Interface
import { IUser } from "../types";

// Grab the secret key
const { secretKey } = $security;

export function jwtVerify(accessToken: string, callback: any): void {
  // Verify JWT token using the accessToken and secretKey
  jwt.verify(
    accessToken,
    secretKey,
    (error: any, accessTokenData: any = {}) => {
      const { data: user } = accessTokenData;

      // If we get an error or the user is not found, we return false
      if (error || !user) {
        return callback(false);
      }

      // The user data is on base64, getBase64 will retrieve the info as JSON object
      const userData = getBase64(user);
      return callback(userData);
    }
  );
}

export async function getUserData(accessToken: string): Promise<any> {
  // Resolve jwtVerify Promise to get userData
  const UserPromise = new Promise((resolve) =>
    jwtVerify(accessToken, (user: any) => resolve(user))
  );

  // This gets the user data or returns false if user is not connected
  const user = await UserPromise;

  return user;
}

export const createToken = async (user: IUser): Promise<string[]> => {
  // Extracting the user data
  const { id, username, password, email, privilege, active } = user;

  // Encrypt password by combining secretKey and password then convert to base64
  const token = setBase64(`${encrypt($security.secretKey)}${password}`);

  // The token is used as an alias for password in this case
  const userData = { id, username, token, email, privilege, active };

  // Sign JWT and save data as base64
  const _createToken = jwt.sign(
    { data: setBase64(userData) },
    $security.secretKey,
    { expiresIn: $security.expiresIn }
  );
  return Promise.all([_createToken]);
};
