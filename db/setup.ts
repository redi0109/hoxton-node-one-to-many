import Database from "better-sqlite3";

const db= Database('./db/data.db', {verbose: console.log})

const museums = [
    {
        id: 1,
        name:"Le LOUVRE",
        city: "Paris, France"
    },
    {
        id: 2,
        name:"The Metropolitan Museum of Art",
        city: "New York, USA"
    },
    {
        id: 3,
        name:"The British Museum",
        city: "London, UK"
    },
    {
        id: 4,
        name:"The Uffizi Galleries",
        city: "Florence, Italy"
    },
    {
        id: 5,
        name:"The State Hermitage Museum",
        city: "St Petersburg, Russia"
    },
]

const createMoseumsTable = db.prepare(`
CREATE TABLE IF NOT EXISTS museums(
    id INTEGER,
    name TEXT NOT NULL,
    city TEXT NOT NULL,
    PRIMARY KEY (id)
)
`);

createMoseumsTable.run();