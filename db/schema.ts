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
  selectedCharacter: integer("selected_character")
    .references(() => characters.id)
    .notNull(),
  avatar: text("avatar"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const usersRelations = relations(users, ({ many, one }) => ({
  userProgress: many(userProgress),
  selectedCharacter: one(characters, {
    fields: [users.selectedCharacter],
    references: [characters.id],
  }),
  usersAchievements: many(usersAchievements),
  userCharacters: many(userCharacters),
}));

export const characters = pgTable("characters", {
  id: serial("id").primaryKey(),
  characterName: text("character_name").notNull().unique(),
  characterSrc: text("character_src").notNull(),
});

export const charactersRelations = relations(characters, ({ one }) => ({
  users: one(users, {
    fields: [characters.id],
    references: [users.selectedCharacter],
  }),
}));

export const userCharacters = pgTable("user_characters", {
  id: serial("id").primaryKey(),
  userId: text("user_id")
    .references(() => users.userId, {
      onDelete: "cascade",
      onUpdate: "cascade",
    })
    .notNull(),
  characterId: integer("character_id")
    .references(() => characters.id)
    .notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const userCharactersRelations = relations(userCharacters, ({ one }) => ({
  user: one(users, {
    fields: [userCharacters.userId],
    references: [users.userId],
  }),
  character: one(characters, {
    fields: [userCharacters.characterId],
    references: [characters.id],
  }),
}));

export const stagesEnum = pgEnum("stages_enum", [
  "HTML - Doomsdale Town",
  "CSS - Terraquill",
  "HTML & CSS - Nemorosa",
  "JAVASCRIPT - Rimegate",
  "HTML, CSS & JAVASCRIPT - Sunfire Isle",
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

export const achievements = pgTable("achievements", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(),
  description: text("description").notNull(),
  xp: integer("xp").notNull(),
  coins: integer("coins").notNull(),
});

export const usersAchievements = pgTable("users_achievements", {
  id: serial("id").primaryKey(),
  userId: text("user_id")
    .references(() => users.userId, {
      onDelete: "cascade",
      onUpdate: "cascade",
    })
    .notNull(),
  achievementId: integer("achievement_id")
    .references(() => achievements.id)
    .notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const usersAchievementsRelations = relations(
  usersAchievements,
  ({ one }) => ({
    user: one(users, {
      fields: [usersAchievements.userId],
      references: [users.userId],
    }),
    achievement: one(achievements, {
      fields: [usersAchievements.achievementId],
      references: [achievements.id],
    }),
  }),
);
