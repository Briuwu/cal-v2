export type Questions = {
  question: string;
  answer: string;
  coins: number;
  xp: number;
};

export type CharacterState = "idle" | "running" | "walk" | "attack" | "hurt";

export type BossState = "idle" | "hurt" | "death" | "attack";
