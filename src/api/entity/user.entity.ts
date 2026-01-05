export interface UserProps {
  id: string;
  email: string;
  deleted: boolean;
  createdAt: number;
  updatedAt: number;
}

export class UserEntity {
  id: string;
  email: string;
  deleted: boolean;
  createdAt: number;
  updatedAt: number;

  constructor(data: UserProps) {
    this.id = data.id;
    this.email = data.email;
    this.deleted = data.deleted;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }
}
