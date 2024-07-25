import { relations } from "drizzle-orm";
import {
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  pgEnum,
  jsonb,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  coins: integer("coins").notNull().default(0),
  xp: integer("xp").notNull().default(0),
  currentLevel: integer("current_level").notNull().default(1),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const stagesEnum = pgEnum("stages_enum", [
  "HTML",
  "CSS",
  "HTML & CSS",
  "JAVASCRIPT",
  "HTML, CSS & JAVASCRIPT",
]);

export const stages = pgTable("stages", {
  id: serial("id").primaryKey(),
  stageName: stagesEnum("stage_name").notNull(),
  requiredXp: integer("required_xp").notNull(),
  stageBgUrl: text("stage_bg_url").notNull(),
});

export const stagesRelations = relations(stages, ({ many }) => ({
  levels: many(levels),
}));

export const levelsTypeEnum = pgEnum("levels_type_enum", [
  "learning",
  "mini-challenge",
  "reward",
  "boss",
]);

export const levelStatusEnum = pgEnum("level_status_enum", [
  "locked",
  "unlocked",
  "completed",
]);

export const levels = pgTable("levels", {
  id: serial("id").primaryKey(),
  stageId: integer("stage_id").references(() => stages.id),
  type: levelsTypeEnum("type").notNull(),
  status: levelStatusEnum("status").notNull().default("locked"),
  name: text("name").notNull(),
  description: text("description").notNull(),
  questions: jsonb("questions"),
  levelNumber: integer("level_number").notNull(),
});

export const levelsRelations = relations(levels, ({ one }) => ({
  stage: one(stages, {
    fields: [levels.stageId],
    references: [stages.id],
  }),
}));
