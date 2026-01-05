export type UserRole = 'jobseeker' | 'employer';
//User Entity is how the data looks inside your application.
export default class User {
  private _userId?: number;
  private _name: string;
  private _email: string;
  private _password: string;
  private _phone: string;
  private _role: UserRole;
  private _bio?: string;
  private _resume?: string;
  private _resumePublicId?: string;
  private _profilePicture: string;
  private _profilePicturePublicId: string;
  private _createdAt: Date;
  private _updatedAt: Date;

  constructor(data: {
    userId?: number;
    name: string;
    email: string;
    password: string;
    phone: string;
    role: UserRole;
    bio?: string;
    resume?: string;
    resumePublicId?: string;
    profilePicture: string;
    profilePicturePublicId: string;
    createdAt?: Date;
    updatedAt?: Date;
  }) {
    this._userId = data.userId;
    this._name = data.name;
    this._email = data.email;
    this._password = data.password;
    this._phone = data.phone;
    this._role = data.role;
    this._bio = data.bio;
    this._resume = data.resume;
    this._resumePublicId = data.resumePublicId;
    this._profilePicture = data.profilePicture;
    this._profilePicturePublicId = data.profilePicturePublicId;
    this._createdAt = data.createdAt || new Date();
    this._updatedAt = data.updatedAt || new Date();
  }

  // Getters
  get userId() { return this._userId; }
  get name() { return this._name; }
  get email() { return this._email; }
  get password() { return this._password; }
  get phone() { return this._phone; }
  get role() { return this._role; }
  get bio() { return this._bio; }
  get resume() { return this._resume; }
  get resumePublicId() { return this._resumePublicId; }
  get profilePicture() { return this._profilePicture; }
  get profilePicturePublicId() { return this._profilePicturePublicId; }
  get createdAt() { return this._createdAt; }
  get updatedAt() { return this._updatedAt; }
}
