import { connection } from "../../db/connection";
import { UserRole } from "../entity/user.entity";

// This is the data structure returned by the DB (Snake Case) UserRow is how the data looks inside the database.
export interface UserRow {
  user_id?: number;
  name: string;
  email: string;
  password: string;
  phone: string;
  role: UserRole;
  bio?: string;
  resume?: string;
  resume_public_id?: string;
  profile_picture: string;
  profile_picture_public_id: string;
  created_at?: Date;
  updated_at?: Date;
}

export class UserDAO {
  async save(row: UserRow): Promise<UserRow> {
    const query = `
      INSERT INTO users (name, email, password, phone, role, profile_picture, profile_picture_public_id)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *
    `;
    const values = [row.name, row.email, row.password, row.phone, row.role, row.profile_picture, row.profile_picture_public_id];
    const result = await connection.query(query, values);
    return result.rows[0];
  }

  async getByEmail(email: string): Promise<UserRow | null> {
    const result = await connection.query("SELECT * FROM users WHERE email = $1", [email]);
    return result.rows[0] || null;
  }

  async delete(id: number): Promise<void> {
    await connection.query("DELETE FROM users WHERE user_id = $1", [id]);
  }
}
