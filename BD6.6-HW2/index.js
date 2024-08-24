const express = require("express");
const app = express();
const cors = require("cors");
const { getAllGames, getGameById } = require("./controllers/index.controller");
app.use(cors());
app.use(express.json());

// Exercise 1: Retrieve All Games 🟢

app.get("/games", async (req,res) => {
  try {
    let games = await getAllGames();
    if (!games) {
      return res.status(404).json({ message: "No games found" });
    }
    return res.status(200).json({ games });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// Exercise 2: Retrieve Game by ID 🟢

app.get('/games/details/:id', async (req,res)=>{
  try{
    let id = parseInt(req.params.id);
    let game = await getGameById(id);
    if(!game){
      return res.status(404).json({message: 'Game not found'})
    }
    return res.status(200).json({game})
  }catch(error){
    return res.status(500).json({ message: error.message });
  }
})

module.exports = {
  app,
};
