import { pgTable, text, boolean, bigint, uniqueIndex } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: text('id').primaryKey(),
  email: text('email').notNull(),
  deleted: boolean('deleted').default(false).notNull(),
  createdAt: bigint('created_at', { mode: 'number' }).notNull(),
  updatedAt: bigint('updated_at', { mode: 'number' }).notNull(),
}, (users) => ({
  emailIndex: uniqueIndex('email_idx').on(users.email),
}));
