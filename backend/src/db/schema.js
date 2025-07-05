import {pgTable,serial,text,timestamp,integer} from 'drizzle-orm/pg-core'

export const favouriteTable=pgTable("favorites",{
    id: serial("id").primaryKey(),  // pass id as string
    userId: text("user_id").notNull(),
    recipeId: integer("recipe_id").notNull(),
    title:text("title").notNull(),
    image:text("image"),
    cookTime:text("cook_time"),
    servings:text("servings"),
    createdAt: timestamp("created_at").defaultNow(),

})