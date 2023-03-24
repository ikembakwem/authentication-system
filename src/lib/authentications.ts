// Dependencies
import { AuthenticationError } from "apollo-server";

// Utils
import { encrypt, isPasswordMatch } from "@contentpi/lib";

// Interface
import { IUser, IModels, IAuthPayload } from "../types";

// JWT
import { createToken } from "./jwt";

export const getUserBy = async (
  where: any,
  models: IModels
): Promise<IUser> => {
  // Find a user by where condition
  const user = await models.User.findOne({
    where,
    raw: true,
  });

  return user;
};

export const doLogin = async (
  email: string,
  password: string,
  models: IModels
): Promise<IAuthPayload> => {
  // Find a user by email
  const user = await getUserBy({ email }, models);

  // If the user does not exist return an error message
  if (!user) {
    throw new AuthenticationError("Invalid login");
  }

  // Verify that the entered password match the user entered password
  const passwordMatch = isPasswordMatch(encrypt(password), user.password);

  // Validate that the user is active
  const isActive = user.active;

  // If password does not match throw an error
  if (!passwordMatch) {
    throw new AuthenticationError("Invalid login");
  }

  // If account is not active throw an error
  if (!isActive) {
    throw new AuthenticationError("You have to activate your account");
  }

  // If user exists, password matches and account is active. Create the JWT token
  const [token] = await createToken(user);

  // Finally return the token to GraphQL
  return {
    token,
  };
};
