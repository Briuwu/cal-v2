ALTER TABLE "users" DROP CONSTRAINT "users_character_type_characters_character_type_fk";
--> statement-breakpoint
ALTER TABLE "characters" ADD COLUMN "character_url" text NOT NULL;--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN IF EXISTS "character_type";--> statement-breakpoint
ALTER TABLE "characters" ADD CONSTRAINT "characters_character_type_unique" UNIQUE("character_type");