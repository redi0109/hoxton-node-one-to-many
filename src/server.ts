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
SELECT * FROM museums WHERE id = @id;
`);

const getWorksForMuseum = db.prepare(`
SELECT * FROM works WHERE museumId = @museumId;
`);

const getWorks = db.prepare(`
SELECT * FROM works;
`);

const getWorkByID = db.prepare(`
SELECT * FROM works WHERE id = @id;
`);

const createMuseum = db.prepare(`
INSERT INTO museums (name, city) VALUES (@name, @city);
`);

const createWork = db.prepare(`
INSERT INTO works (name, picture, museumId) VALUES (@name, @picture, @museumId)
`);

app.get("/museums", (req, res) => {
  const museums = getMuseums.all();

  for (let museum of museums) {
    const works = getWorksForMuseum.all({ museumId: museum.id });
    museum.works = works;
  }

  res.send(museums);
});

app.get("/museums/:id", (req, res) => {
  const museum = getMuseumById.get(req.params);
  const works = getWorksForMuseum.all({ museumId: museum.id });
  museum.works = works;

  if (museum) {
    res.send(museum);
  } else {
    res.status(404).send({ error: "Museum not found" });
  }
});

app.get("/works", (req, res) => {
  const works = getWorks.all();

  for (let work of works) {
    const museum = getMuseumById.get({ id: work.museumId });
    work.museum = museum;
  }
  res.send(works);
});

app.get("/works/:id", (req, res) => {
  const work = getWorkByID.get(req.params);

  if (work) {
    const museum = getMuseumById.get({ id: work.museumId });
    work.museum = museum;
    res.send(work);
  } else {
    res.status(404).send({ error: "Work not found" });
  }
});

app.post("/museums", (req, res) => {
    let errors: string[] = [];
  
    if (typeof req.body.name !== "string") {
      errors.push("Name is missing or not a string");
    }
  
    if (typeof req.body.city !== "string") {
      errors.push("City is missing or not a string");
    }
  
    if (errors.length === 0) {
      const addData = createMuseum.run(req.body);
      const museum = getMuseumById.get({ id: addData.lastInsertRowid });
      const works = getWorksForMuseum.all({ museumId: museum.id})
      museum.works=works
      res.send(museum);
    } else {
      res.status(400).send({ errors });
    }
  });

  app.post("/works", (req, res) => {
    let errors: string[] = [];
  
    if (typeof req.body.name !== "string") {
      errors.push("Name is missing or not a string");
    }
  
    if (typeof req.body.image !== "string") {
      errors.push("Image is missing or not a string");
    }

    if (typeof req.body.museumId !== "number") {
        errors.push("MuseumId is missing or not a number");
      }
  
    if (errors.length === 0) {
      const addData = createWork.run(req.body);
      const work = getWorkByID.get({ id: addData.lastInsertRowid });
      const museum = getMuseumById.all({ id: work.museumId })
      work.museum = museum
      res.send(work);
    } else {
      res.status(400).send({ errors });
    }
  });

app.listen(port, () => {
  console.log(`app running: https://localhost:${port}`);
});
