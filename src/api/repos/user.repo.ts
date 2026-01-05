import { eq } from 'drizzle-orm';
import { db } from '../../db/connection';
import { users, NewUser } from '../../db/schema';
import { UserEntity } from '../entity/user.entity';

export class UserRepository {
  async create(userData: NewUser): Promise<UserEntity> {
    const [createdUser] = await db.insert(users).values(userData).returning();
    return new UserEntity(createdUser);
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user ? new UserEntity(user) : null;
  }

  async findAll(): Promise<UserEntity[]> {
    const allUsers = await db.select().from(users);
    return allUsers.map(user => new UserEntity(user));
  }
}
