import { userCharacters, users } from "@/db/schema";

export type Questions = {
  question: string;
  answer: string;
  clue: string;
};

export type Leaderboard = typeof users.$inferSelect;

export type UserCharacters = typeof userCharacters.$inferSelect;

export type Characters = "male_homeless" | "female_homeless";

export type CharacterState =
  | "idle"
  | "running"
  | "walk"
  | "attack"
  | "hurt"
  | "attack-2"
  | "dead";

export type NPCState = "idle" | "dialogue";

export type BossState = "idle" | "hurt" | "death" | "attack" | "walk";

export type TreasureState = "open" | "closed";

export type LevelsType = "learning" | "mini-challenge" | "boss" | "reward";

export type LevelsName = "html" | "css" | "htmlcss" | "js" | "htmlcssjs";

export type LevelsQuestions = {
  question: string;
  answer: string;
  clue: string;
}[];

export type Levels = {
  id: number;
  stage_id: number;
  type: LevelsType;
  name: LevelsName;
  description: string;
  questions: LevelsQuestions | null;
  level_number: number;
};
