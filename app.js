import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import "dotenv/config";
import { startDB } from "./src/config/database.js";


import { userRouter } from "./src/routes/user.routes.js";
import { profileRouter } from "./src/routes/profile.routes.js";
import { projectRouter } from "./src/routes/project.routes.js";
import { technologyRouter } from "./src/routes/technology.routes.js";

const app = express();
const PORT = process.env.PORT || 3003;


app.use(express.json());
app.use(cookieParser());
app.use(cors());


app.use("/api", userRouter);
app.use("/api", profileRouter);
app.use("/api", projectRouter);
app.use("/api", technologyRouter);

app.listen(PORT, async () => {
  await startDB();
  console.log(`Servidor listo en el puerto ${PORT}`);
});