export type User = {
  username: string;
  password: string;
  email: string;
  active: boolean;
  privilege: string;
};

export type Sequelize = {
  _defaults: any;
  name?: string;
  options?: any;
  associate?: any;
};
