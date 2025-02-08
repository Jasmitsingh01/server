import { config } from "dotenv";
config();

import connectDB from "./Database/index.js";
import app from "./app.js";

(async () => {
  try {
    await connectDB();

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`user Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error(`Error: ${error?.message}`);
    process.exit(1);
  }
})();
