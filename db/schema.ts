import { Questions } from "@/types";
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
  userId: text("user_id").notNull().unique(),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  coins: integer("coins").notNull().default(0),
  xp: integer("xp").notNull().default(0),
  currentLevel: integer("current_level").notNull().default(1),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const usersRelations = relations(users, ({ many }) => ({
  userProgress: many(userProgress),
}));

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
  stageBgUrl: text("stage_bg_url").notNull(),
});

export const stagesRelations = relations(stages, ({ many }) => ({
  levels: many(levels),
  userProgress: many(userProgress),
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
  stageId: integer("stage_id")
    .references(() => stages.id)
    .notNull(),
  type: levelsTypeEnum("type").notNull(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  questions: jsonb("questions").$type<Questions[]>(),
  levelNumber: integer("level_number").notNull().unique(),
});

export const levelsRelations = relations(levels, ({ one }) => ({
  stage: one(stages, {
    fields: [levels.stageId],
    references: [stages.id],
  }),
  userProgress: one(userProgress, {
    fields: [levels.levelNumber],
    references: [userProgress.levelNumber],
  }),
}));

export const userProgress = pgTable("user_progress", {
  id: serial("id").primaryKey(),
  userId: text("user_id")
    .references(() => users.userId, {
      onDelete: "cascade",
      onUpdate: "cascade",
    })
    .notNull(),
  levelNumber: integer("level_number")
    .references(() => levels.levelNumber)
    .notNull(),
  stageId: integer("stage_id")
    .references(() => stages.id)
    .notNull(),
  status: levelStatusEnum("status").notNull().default("locked"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const userProgressRelations = relations(userProgress, ({ one }) => ({
  user: one(users, {
    fields: [userProgress.userId],
    references: [users.userId],
  }),
  level: one(levels, {
    fields: [userProgress.levelNumber],
    references: [levels.levelNumber],
  }),
  stage: one(stages, {
    fields: [userProgress.stageId],
    references: [stages.id],
  }),
}));
