import express from "express";
import cors from "cors";
import Database from "better-sqlite3";

const db = Database("./db/data.db", { verbose: console.log });
const app = express();
app.use(cors());
app.use(express.json());

const port = 4000;

const getMuseums = db.prepare(`
SELECT * FROM museums;
`);

const getMuseumById = db.prepare(`
SELECT * FROM museums WHERE id=?;
`);

const getWorksForMuseum = db.prepare(`
SELECT * FROM works WHERE museumId = @museumId;
`);

app.get("/museums", (req, res) => {
  const museums = getMuseums.all();

  for (let museum of museums) {
    const works = getWorksForMuseum.all({ museumId: museum.id });
    museum.works = works;
  }

  res.send(museums);
});

app.get("/museums/:id", (req, res) => {});

app.get("/works", (req, res) => {});

app.get("/works/:id", (req, res) => {});

app.listen(port, () => {
  console.log(`app running: https://localhost:${port}`);
});
