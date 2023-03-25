// Lib
import { getUserData } from "../../lib/jwt";

// Interfaces
import {
  IUser,
  ICreateUserInput,
  IModels,
  ILoginInput,
  IAuthPayload,
} from "../../types";

// Utils
import { doLogin, getUserBy } from "../../lib/authentications";

export default {
  Query: {
    getUsers: (_: any, args: any, { models }: { models: IModels }): IUser[] => {
      return models.User.findAll();
    },
    getUserData: async (
      _: any,
      { accessToken }: { accessToken: string },
      { models }: { models: IModels }
    ): Promise<any> => {
      // Get current connected user
      const connectedUser = await getUserData(accessToken);

      if (connectedUser) {
        const user = await getUserBy(
          {
            id: connectedUser.id,
            email: connectedUser.email,
            privilege: connectedUser.privilege,
            active: connectedUser.active,
          },
          models
        );

        if (user) {
          return connectedUser;
        }
      }

      return {
        id: "",
        username: "",
        email: "",
        password: "",
        active: "",
        privilege: false,
      };
    },
  },
  Mutation: {
    createUser: (
      _: any,
      { input }: { input: ICreateUserInput },
      { models }: { models: IModels }
    ): IUser => {
      return models.User.create({ ...input });
    },
    login: (
      _: any,
      { input }: { input: ILoginInput },
      { models }: { models: IModels }
    ): Promise<IAuthPayload> => {
      return doLogin(input.email, input.password, models);
    },
  },
};
