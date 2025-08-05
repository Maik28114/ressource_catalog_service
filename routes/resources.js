// Importiert das express-Modul, das helfen wird, einen Web-Server zu erstellen
import express from 'express';
import {readFileSync} from 'fs'; 
import path from 'path';
import { fileURLToPath } from 'url';

const router = express.Router();

// Pfad zu unserer Datei
const __filename = fileURLToPath(import.meta.url);
// Pfad zur vollständigen Datei wo die Daten liegen
const __dirname = path.dirname(__filename);
// Variable(constanten gemeint) wo wir die Datei mit den Daten speichern
const data_file = path.join(__dirname, '../data', 'resources.json');


// Definiert die Route "/resources"
// Wenn ein GET-Request an "/resources" geschickt wird, sendet der Server momentan einen Platzhaltertext zurück
router.get('/', (req, res) => {
    try {
        const data = readFileSync(data_file, 'utf8');
        const resources = JSON.parse(data);
        res.json(resources);
    } catch (error) {
        res.status(500).json({ error: 'Interner Serverfehler beim Laden der Ressourcen-Daten'});
    }
});
// doppelpunkt id verweist auf url id
router.get('/:id', (req, res) => {
    try {
        const resourceId = req.params.id;
        const data = readFileSync(data_file, 'utf8');
        const resources = JSON.parse(data);
        const resource = resources.find(r => r.id === resourceId);

        if (resource) {
            res.json(resource);
        } else {
            res.status(404).json({ error: `Ressource mit ID ${resourceId} nicht gefunden.` })
        }

    } catch (error) {
        res.status(500).json({ error: 'Interner Serverfehler beim Laden der Ressourcen-Daten'});
    }
});

// Gesamte Module wird exportiert
export default router;