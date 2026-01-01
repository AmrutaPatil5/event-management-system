import dotenv from "dotenv";
import connectDB from "./db/db_index.js";
import { app } from "./app.js";

// 1. Configure dotenv as early as possible
dotenv.config({
  path: "./.env",
});

const PORT = process.env.PORT || 8000;

// 2. Connect to Database
connectDB()
  .then(() => {
    // 3. Handle Express errors before listening (Optional but Pro)
    app.on("error", (error) => {
      console.log("ERR: ", error);
      throw error;
    });

    // 4. Start listening
    app.listen(PORT, () => {
      console.log(`⚙️  Server is running at port : ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
  });
