CREATE TABLE IF NOT EXISTS "characters" (
	"id" serial PRIMARY KEY NOT NULL,
	"character_name" text NOT NULL,
	"character_type" text NOT NULL,
	CONSTRAINT "characters_character_name_unique" UNIQUE("character_name")
);
--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "character_type" text;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users" ADD CONSTRAINT "users_character_type_characters_character_type_fk" FOREIGN KEY ("character_type") REFERENCES "public"."characters"("character_type") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
