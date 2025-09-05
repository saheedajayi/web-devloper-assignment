import sqlite3 from "sqlite3";
import path from "path";

const dbPath = path.resolve(__dirname, "../../data.db");
const db = new sqlite3.Database(dbPath);

const addresses = [
    { street: "123 Main St", city: "Lagos", state: "LA", zipcode: "100001" },
    { street: "456 Market Rd", city: "Abuja", state: "FC", zipcode: "900001" },
    { street: "789 Broad Ave", city: "Kano", state: "KN", zipcode: "700001" },
    { street: "321 Palm St", city: "Ibadan", state: "OY", zipcode: "200001" }
];

db.all("SELECT id FROM users", (err, rows) => {
    if (err) throw err;

    rows.forEach((row: any, index: number) => {
        const addr = addresses[index % addresses.length];
        db.run(
            `UPDATE users
             SET street = ?,
                 city = ?,
                 state = ?,
                 zipcode = ?
             WHERE id = ?`,
            [addr.street, addr.city, addr.state, addr.zipcode, row.id]
        );
    });
});

db.close();
