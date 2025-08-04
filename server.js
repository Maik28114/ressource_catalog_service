// Importiert das express-Modul, das helfen wird, einen Web-Server zu erstellen
import express from 'express'
import {readFileSync} from 'fs'; 
import path from 'path';
import { fileURLToPath } from 'url';


// Erstellt eine neue Express-Anwendung
const app = express();

// Legt den Port fest, auf dem der Server später laufen soll
const port = 5002;

// Pfad zu unserer Datei
const __filename = fileURLToPath(import.meta.url);

// Pfad zur vollständigen Datei wo die Daten liegen
const __dirname = path.dirname();

// Variable(constanten gemeint) wo wir die Datei mit den Daten speichern
const data_file = path.join(__dirname, 'data', 'resources.json');

// Definiert die Route für die Startseite ("/")
// Wenn ein GET-Request an die Startseite geschickt wird, antwortet der Server mit "Welcome to Resource Catalog"
app.get('/', (req, res) => {
    res.send('Welcome to Resource Catalog');
});

// Definiert die Route "/resources"
// Wenn ein GET-Request an "/resources" geschickt wird, sendet der Server momentan einen Platzhaltertext zurück
app.get('/resources', (req, res) => {
    try {
        const data = readFileSync(data_file, 'utf8');
        const resources = JSON.parse(data);
        res.json(resources);
    } catch (error) {
        res.status(500).json({ error: 'Interner Serverfehler beim Laden der Daten'});
    }
});

// Startet den Server und lässt ihn auf dem angegebenen Port lauschen
// Sobald der Server läuft, wird eine Nachricht in der Konsole ausgegeben
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

