import Database from "better-sqlite3";

type Museum = {
  id: number;
  name: string;
  city: string;
};

type Work = {
  id: number;
  name: string;
  picture: string;
  museumId: number;
};

const db = Database("./db/data.db", { verbose: console.log });

const museums: Museum[] = [
  {
    id: 1,
    name: "Le LOUVRE",
    city: "Paris, France",
  },
  {
    id: 2,
    name: "The Metropolitan Museum of Art",
    city: "New York, USA",
  },
  {
    id: 3,
    name: "The British Museum",
    city: "London, UK",
  },
  {
    id: 4,
    name: "The Uffizi Galleries",
    city: "Florence, Italy",
  },
  {
    id: 5,
    name: "The State Hermitage Museum",
    city: "St Petersburg, Russia",
  },
];

const dropMuseumsTables = db
  .prepare(
    `
DROP TABLE IF EXISTS museums
`
  )
  .run();

const createMoseumsTable = db.prepare(`
CREATE TABLE IF NOT EXISTS museums(
    id INTEGER,
    name TEXT NOT NULL,
    city TEXT NOT NULL,
    PRIMARY KEY (id)
)
`);

createMoseumsTable.run();

const deleteAllMuseums = db.prepare(`
DELETE FROM museums;
`);
deleteAllMuseums.run();

const createMoseum = db.prepare(`
INSERT INTO museums (name, city) VALUES (@name, @city);
`);

for (let museum of museums) {
  createMoseum.run(museum);
}

const works: Work[] = [
  {
    id: 1,
    name: "The Mona Lisa",
    picture: "https://cdn.pariscityvision.com/library/image/5449.jpg",
    museumId: 1,
  },
  {
    id: 2,
    name: "Liberty Leading the People",
    picture: "https://cdn.pariscityvision.com/library/image/5451.jpg",
    museumId: 1,
  },
  {
    id: 3,
    name: "The Death of Socrates",
    picture:
      "https://img.theculturetrip.com/1440x/smart/wp-content/uploads/2015/12/rexfeatures_2543724a.jpg",
    museumId: 2,
  },
  {
    id: 4,
    name: "The Sphinx of Hatshepsut",
    picture:
      "https://img.theculturetrip.com/1440x/smart/wp-content/uploads/2015/12/21v_cat088r6.jpg",
    museumId: 2,
  },
  {
    id: 5,
    name: "Colossal horse from Halikarnassos",
    picture: "https://media.timeout.com/images/102920185/750/562/image.jpg",
    museumId: 3,
  },
  {
    id: 6,
    name: "Assyrian lion hunt reliefs",
    picture: "https://media.timeout.com/images/102920419/750/562/image.jpg",
    museumId: 3,
  },
  {
    id: 7,
    name: "The Birth of Venus",
    picture:
      "https://img.theculturetrip.com/1440x/smart/wp-content/uploads/2019/09/d98j8a.jpg",
    museumId: 4,
  },
  {
    id: 8,
    name: "Laocoön and his Sons",
    picture:
      "https://img.theculturetrip.com/1440x/smart/wp-content/uploads/2019/09/jh1xp8.jpg",
    museumId: 4,
  },
  {
    id: 9,
    name: "Crouching Boy",
    picture:
      "https://imgs.search.brave.com/Aj3hzWLycIdtvQw_NLrOCi4urggY6UaQrDiKmS64qko/rs:fit:1200:1200:1/g:ce/aHR0cHM6Ly8xLmJw/LmJsb2dzcG90LmNv/bS8tcC12NWRvV2xq/QVEvWGZBUlhhWU9f/akkvQUFBQUFBQUFE/ZHMvbjNFUFMwd0V6/TWdnOWxua1Z2bUJF/UHZyOXpXSEVIZEZn/Q0tnQkdBc1lIZy9z/MTYwMC9NaWNoZWxh/bmdlbG8tQnVvbmFy/cm90aS1Dcm91Y2hp/bmctQm95LTE1MzAt/MzQtSGVybWl0YWdl/LU11c2V1bS1TdC1Q/ZXRlcnNidXJnLTUu/anBn",
    museumId: 5,
  },
  {
    id: 10,
    name: "Penitent Magdalene",
    picture:
      "https://imgs.search.brave.com/QsH5ufK9LQNtymEZ5KoVOu2evKBkSmBtoHiPPUdekBI/rs:fit:355:225:1/g:ce/aHR0cHM6Ly90c2U0/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC5S/b3YwMzRVOXRoUXV1/N1RDQldYNGNnSGFK/NCZwaWQ9QXBp",
    museumId: 5,
  },
];

const dropWorksTable = db
  .prepare(
    `
DROP TABLE IF EXISTS works
`
  )
  .run();

const createWorksTable = db.prepare(`
CREATE TABLE IF NOT EXISTS works(
    id INTEGER,
    name TEXT NOT NULL,
    picture TEXT NOT NULL,
    museumId INTEGER NOT NULL,
    PRIMARY KEY (id)
);
`);
createWorksTable.run();

const deleteAllWorks = db
  .prepare(
    `
DELETE FROM works
`
  )
  .run();

const createWork = db.prepare(`
INSERT INTO works (name, picture, museumId) VALUES (@name, @picture, @museumId)
`);

for (let work of works) {
  createWork.run(work);
}
