// Importiert das express-Modul, das helfen wird, einen Web-Server zu erstellen
import express from 'express';
import resourcesRouter from './routes/resources.js';
// Legt den Port fest, auf dem der Server später laufen soll
const port = 5002;

// Erstellt eine neue Express-Anwendung
const app = express(); 
// um Middelware als Anwendung einzufügen
app.use(express.json());
// Routes hinzufügen
app.use('/resources', resourcesRouter);
// Startet den Server und lässt ihn auf dem angegebenen Port lauschen
// Sobald der Server läuft, wird eine Nachricht in der Konsole ausgegeben
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

