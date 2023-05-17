import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import config from 'config';

export interface UserInput {
  email: string;
  name: string;
  password: string;
}

export interface UserDocument extends UserInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

userSchema.pre('save', async function (next) {
  let user = this as UserDocument;
  if (!user.isModified('password')) {
    return next();
  }

  const salt = await bcrypt.genSalt(config.get<number>('saltWorkFactor'));

  const hash = await bcrypt.hash(user.password, salt);

  user.password = hash;
  return next();
});

userSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  const user = this as UserDocument;

  return bcrypt.compare(candidatePassword, user.password).catch(error => false);
};

const UserModel = mongoose.model('User', userSchema);

/* ---------------------------------------------------------------------------------------------- */
/*                                        mongoose document                                       */
/* ---------------------------------------------------------------------------------------------- */

// interface IUser {
//   email: string;
//   name: string;
//   password: string;
//   createdAt: Date;
//   updatedAt: Date;
// }

// const userSchema = new mongoose.Schema<IUser>(
//   {
//     email: { type: String, required: true, unique: true },
//     name: { type: String, required: true },
//     password: { type: String, required: true },
//   },
//   { timestamps: true }
// );

// const UserModel = mongoose.model<IUser>('User', userSchema);

export default UserModel;
