CREATE TABLE IF NOT EXISTS "pvp_leaderboard" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"time" integer NOT NULL,
	"score" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "pvp_questions" (
	"id" serial PRIMARY KEY NOT NULL,
	"question" text NOT NULL,
	"answer" text NOT NULL,
	"options" jsonb
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "pvp_leaderboard" ADD CONSTRAINT "pvp_leaderboard_user_id_users_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("user_id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
