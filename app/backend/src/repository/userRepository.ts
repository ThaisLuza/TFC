import Model from '../database/models/UserModel';
import { IUserModel, IUser } from '../database/interfaces';

export default class UserRepository implements IUserModel {
  constructor(private model = Model) {
    this.model = model;
  }

  async login(email: string): Promise<IUser | null> {
    const findUser = await this.model.findOne({ where: { email } });

    return findUser;
  }
}
