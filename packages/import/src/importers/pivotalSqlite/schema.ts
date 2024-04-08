import {InferInsertModel} from 'drizzle-orm'
import {blob, integer, real, sqliteTable, text, uniqueIndex} from 'drizzle-orm/sqlite-core'


export const projectTable = sqliteTable('project', {
  id: integer('id').primaryKey().notNull(),
  name: text('name').notNull(),
  description: text('description'),
  status: text('status'),
  iteration_length: integer('iteration_length'),
  created_at: text('created_at'),
  updated_at: text('updated_at'),
})

export const storyTable = sqliteTable('story', {
  id: integer('id').primaryKey().notNull(),
  project_id: integer('project_id').notNull().references(() => projectTable.id),
  name: text('name').notNull(),
  description: text('description'),
  story_type: text('story_type').notNull(),
  current_state: text('current_state').notNull(),
  estimate: real('estimate'),
  accepted_at: text('accepted_at'),
  created_at: text('created_at').notNull(),
  owned_by_id: integer('owned_by_id').references(() => personTable.id),
  requested_by_id: integer('requested_by_id').notNull().references(() => personTable.id),
  updatedAt: text('updated_at'),
})

export const storyLabelTable = sqliteTable('story_label', {
  story_id: integer('story_id').notNull().references(() => storyTable.id),
  label_id: integer('label_id').notNull().references(() => labelTable.id),
})

export const personTable = sqliteTable('person', {
  id: integer('id').primaryKey().notNull(),
  name: text('name'),
  email: text('email'),
  initials: text('initials'),
  username: text('username'),
})

export const commentTable = sqliteTable('comment', {
  id: integer('id').primaryKey().notNull(),
  story_id: integer('story_id').notNull().references(() => storyTable.id),
  text: text('text'),
  person_id: integer('person_id').notNull().references(() => personTable.id),
  created_at: text('created_at').notNull(),
  updatedAt: text('updated_at'),
})

export const labelTable = sqliteTable('label', {
  id: integer('id').primaryKey().notNull(),
  project_id: integer('project_id').notNull().references(() => projectTable.id),
  name: text('name').notNull(),
  description: text('description'),
  created_at: text('created_at'),
  updatedAt: text('updated_at'),
})

export const epicTable = sqliteTable('epic', {
  id: integer('id').primaryKey().notNull(),
  project_id: integer('project_id').notNull().references(() => projectTable.id),
  label_id: integer('label_id').notNull().references(() => labelTable.id),
  name: text('name'),
  description: text('description'),
  created_at: text('created_at'),
  updatedAt: text('updated_at'),
})

export const fileAttachmentTable = sqliteTable('file_attachment', {
  id: integer('id').primaryKey().notNull(),
  filename: text('filename'),
  content_type: text('content_type'),
  size: integer('size'),
  download_url: text('download_url'),
  uploader_id: integer('uploader_id'),
  created_at: text('created_at'),
  comment_id: integer('comment_id').references(() => commentTable.id), // this doesn't come back from the API
})

export const fileAttachmentFileTable = sqliteTable(
  'file_attachment_file',
  {
    file_attachment_id: integer('file_attachment_id').notNull().references(() => fileAttachmentTable.id),
    blob: blob('blob', {mode: "buffer"}).notNull(),
  },
  (table) => {
    return {
      file_attachment_id: uniqueIndex('file_attachment_id_idx').on(table.file_attachment_id),
    }
  },
)

export type Project = InferInsertModel<typeof projectTable>
export type Story = InferInsertModel<typeof storyTable>
export type Person = InferInsertModel<typeof personTable>
export type Comment = InferInsertModel<typeof commentTable>
export type FileAttachment = InferInsertModel<typeof fileAttachmentTable>
export type Epic = InferInsertModel<typeof epicTable>
export type Label = InferInsertModel<typeof labelTable>
