import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type RoleDocument = HydratedDocument<Role>;

@Schema()
export class Role {
  @Prop({ immutable: true, lowercase: true, required: true, unique: true })
  name: string;
}

export const RoleSchema = SchemaFactory.createForClass(Role);
