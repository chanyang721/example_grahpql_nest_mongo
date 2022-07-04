import { SchemaOptions } from '@nestjs/mongoose';

export const schemaOptions = (schemaName: string): SchemaOptions => ({
  collection: schemaName,
  versionKey: false,
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
  toJSON: {
    virtuals: true,
    transform: (doc, ret) => {
      delete ret._id;
    },
  },
});
