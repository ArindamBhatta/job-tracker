import { UserDAO, UserRow } from "../daos/user.dao";
import User from "../entity/user.entity";

export class UserRepository {
  private dao: UserDAO;

  constructor() {
    this.dao = new UserDAO();
  }

  async create(user: User): Promise<User> {
    // Map Entity -> DAO Row
    const row: UserRow = {
      name: user.name,
      email: user.email,
      password: user.password,
      phone: user.phone,
      role: user.role,
      profile_picture: user.profilePicture,
      profile_picture_public_id: user.profilePicturePublicId
    };

    const savedRow = await this.dao.save(row);

    // Map DAO Row -> Entity
    return new User({
      userId: savedRow.user_id,
      name: savedRow.name,
      email: savedRow.email,
      password: savedRow.password,
      phone: savedRow.phone,
      role: savedRow.role,
      profilePicture: savedRow.profile_picture,
      profilePicturePublicId: savedRow.profile_picture_public_id,
      createdAt: savedRow.created_at,
      updatedAt: savedRow.updated_at
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    const row = await this.dao.getByEmail(email);
    if (!row) return null;

    return new User({
      userId: row.user_id,
      name: row.name,
      email: row.email,
      password: row.password,
      phone: row.phone,
      role: row.role,
      profilePicture: row.profile_picture,
      profilePicturePublicId: row.profile_picture_public_id,
      createdAt: row.created_at,
      updatedAt: row.updated_at
    });
  }
}
