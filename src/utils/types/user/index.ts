import { IEntityBase } from '..';

export interface IUser extends IEntityBase {
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
}

export type Company = {
  name: string;
  catchPhrase: string;
  bs: string;
};

export type Address = {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: {
    lat: string;
    lng: string;
  };
};

export type UserPayload = Omit<IUser, 'id'>;

export type UserState = {
  users?: IUser[] | null | undefined;
  user?: IUser | null | undefined;
};
