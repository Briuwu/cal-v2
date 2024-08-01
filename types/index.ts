export type Questions = {
  question: string;
  answer: string;
  clue: string;
};

export type Characters = "male_homeless" | "female_homeless";

export type CharacterState = "idle" | "running" | "walk" | "attack" | "hurt";

export type NPCState = "idle" | "dialogue";

export type BossState = "idle" | "hurt" | "death" | "attack";

export type TreasureState = "open" | "closed";
