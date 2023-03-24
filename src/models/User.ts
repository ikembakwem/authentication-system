// Dependencies
import { encrypt } from "@contentpi/lib";

// Interfaces
import { IUser, IDataTypes } from "../types";

export default (sequelize: any, DataTypes: IDataTypes): IUser => {
  const User = sequelize.define(
    "User",
    {
      id: {
        primaryKey: true,
        allowNull: false,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4(),
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isAlphanumeric: {
            args: true,
            msg: "The username accepts only alphanumeric characters",
          },
          len: {
            args: [5, 28],
            msg: "Username length must be in the range of 5 and 28 characters",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: {
            args: true,
            msg: "Please enter a valid email address",
          },
        },
      },
      privilege: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "user",
      },
      active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        default: false,
      },
    },
    {
      hooks: {
        beforeCreate: (user: IUser): void => {
          user.password = encrypt(user.password);
        },
      },
    }
  );

  return User;
};
