import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Role } from 'src/roles/schemas/role.schema';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ default: true })
  isActive: boolean;

  @Prop({ required: true, select: false })
  password: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Role' })
  role: Role;

  @Prop({ immutable: true, lowercase: true, required: true, unique: true })
  username: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
