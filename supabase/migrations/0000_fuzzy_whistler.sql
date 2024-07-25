DO $$ BEGIN
 CREATE TYPE "public"."level_status_enum" AS ENUM('locked', 'unlocked', 'completed');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."levels_type_enum" AS ENUM('learning', 'mini-challenge', 'reward', 'boss');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."stages_enum" AS ENUM('HTML', 'CSS', 'HTML & CSS', 'JAVASCRIPT', 'HTML, CSS & JAVASCRIPT');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "levels" (
	"id" serial PRIMARY KEY NOT NULL,
	"stage_id" integer,
	"type" "levels_type_enum" NOT NULL,
	"status" "level_status_enum" DEFAULT 'locked' NOT NULL,
	"name" text NOT NULL,
	"description" text NOT NULL,
	"questions" jsonb NOT NULL,
	"level_number" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "stages" (
	"id" serial PRIMARY KEY NOT NULL,
	"stage_name" "stages_enum" NOT NULL,
	"required_xp" integer NOT NULL,
	"stage_bg_url" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"username" text NOT NULL,
	"email" text NOT NULL,
	"coins" integer DEFAULT 0 NOT NULL,
	"xp" integer DEFAULT 0 NOT NULL,
	"current_level" integer DEFAULT 1 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_username_unique" UNIQUE("username"),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "levels" ADD CONSTRAINT "levels_stage_id_stages_id_fk" FOREIGN KEY ("stage_id") REFERENCES "public"."stages"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
