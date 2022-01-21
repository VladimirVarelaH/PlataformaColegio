import database from "./src/database.js";
import server from "./src/server.js";

server.listen(8080, () =>
	console.log(`Backend corriendo en http://localhost:8080`)
);