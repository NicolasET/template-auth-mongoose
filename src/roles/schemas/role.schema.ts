import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Role as RoleType } from '../types/role.type';

export type RoleDocument = HydratedDocument<Role>;

@Schema()
export class Role {
  @Prop({ immutable: true, lowercase: true, required: true, unique: true })
  name: RoleType;
}

export const RoleSchema = SchemaFactory.createForClass(Role);
