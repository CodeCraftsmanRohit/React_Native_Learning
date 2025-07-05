import express from "express";
import "dotenv/config";
import { ENV } from "./config/env.js";
import { db } from "./config/db.js";
import { favouriteTable } from "./db/schema.js";
const app = express();
const PORT = ENV.PORT || 8001;

app.use(express.json());

app.get("/api/health", (req, res) => {
  res.status(200).json({ success: true });
});

app.post("/api/favorites", async (req, res) => {
  try {
    const { userId, recipeId, title, image, cookTime, servings } = req.body;

    if (!userId || !recipeId || !title) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const newFavourite = await db
      .insert(favouriteTable)
      .values({
        userId,
        recipeId,
        title,
        image,
        cookTime,
        servings,
      })
      .returning();

    res.status(201).json(newFavourite[0]);
  } catch (error) {
    console.log("Error adding favourite", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.delete("/api/favorites/:userId/:recipeId", async (req, res) => {
  try {
    const { userId, recipeId } = req.params;

    await db
      .delete(favouriteTable)
      .where(
        and(
          eq(favouriteTable.userId, userId),
          eq(favouriteTable.recipeId, parseInt(recipeId))
        )
      );
    res.status(200).json({ message: "Favorite removed successfully" });
  } catch (error) {
    console.log("Error removing a favourite", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.get("/api/favorites/:userId",async(req,res)=>{
    try {

        const {userId}=req.params;
        const userFavorites=await db
        .select()
        .from(favouriteTable)
        .where(eq(favouriteTable.userId,userId));

    res.status(200).json(userFavorites);

    } catch (error) {
        console.log("Error fetching the favorites",error);
        res.status(500).json({error:"Something went wrong"})


    }
})



app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
