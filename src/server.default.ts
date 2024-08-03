import dotenv from "dotenv";
import path from "path";

dotenv.config({
  path: path.resolve(__dirname, "../.env"),
});

import express from "express";
import payload from "payload";

const app = express();
const PORT = process.env.PORT || 3000;

// Redirect root to the admin panel
app.get("/", (_, res) => {
  res.redirect("/admin");
});

const start = async (): Promise<void> => {
  await payload.init({
    express: app,
    onInit: () => {
      payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`);
    },
    secret: process.env.PAYLOAD_SECRET || "",
  });

  app.listen(PORT, () => {
    payload.logger.info(`App URL: ${process.env.PAYLOAD_PUBLIC_SERVER_URL}`);
  });
};

void start();
