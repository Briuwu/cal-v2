ALTER TYPE "stages_enum" ADD VALUE 'HTML - Doomsdale Town';--> statement-breakpoint
ALTER TYPE "stages_enum" ADD VALUE 'CSS - Terraquill';--> statement-breakpoint
ALTER TYPE "stages_enum" ADD VALUE 'HTML & CSS - Nemorosa';--> statement-breakpoint
ALTER TYPE "stages_enum" ADD VALUE 'JAVASCRIPT - Rimegate';--> statement-breakpoint
ALTER TYPE "stages_enum" ADD VALUE 'HTML, CSS & JAVASCRIPT - Sunfire Isle';--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "achievements" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text NOT NULL,
	"xp" integer NOT NULL,
	"coins" integer NOT NULL,
	"rewarded_at" integer,
	CONSTRAINT "achievements_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user_characters" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"character_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users_achievements" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"achievement_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "characters" DROP CONSTRAINT "characters_character_type_unique";--> statement-breakpoint
ALTER TABLE "characters" ADD COLUMN "character_src" text NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "selected_character" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "avatar" text;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "achievements" ADD CONSTRAINT "achievements_rewarded_at_levels_level_number_fk" FOREIGN KEY ("rewarded_at") REFERENCES "public"."levels"("level_number") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_characters" ADD CONSTRAINT "user_characters_user_id_users_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("user_id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_characters" ADD CONSTRAINT "user_characters_character_id_characters_id_fk" FOREIGN KEY ("character_id") REFERENCES "public"."characters"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users_achievements" ADD CONSTRAINT "users_achievements_user_id_users_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("user_id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users_achievements" ADD CONSTRAINT "users_achievements_achievement_id_achievements_id_fk" FOREIGN KEY ("achievement_id") REFERENCES "public"."achievements"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users" ADD CONSTRAINT "users_selected_character_characters_id_fk" FOREIGN KEY ("selected_character") REFERENCES "public"."characters"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "characters" DROP COLUMN IF EXISTS "character_type";--> statement-breakpoint
ALTER TABLE "characters" DROP COLUMN IF EXISTS "character_url";