// Importiert das express-Modul, das helfen wird, einen Web-Server zu erstellen
import express from 'express';
import {readFileSync, writeFileSync} from 'fs'; 
import path from 'path';
import { fileURLToPath } from 'url';
import { v4 as uuidv4 } from 'uuid';  // neue id generiert

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
        res.status(500).json({ error: 'Interner Serverfehler beim Laden der Ressourcen-Daten.'});
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
        res.status(500).json({ error: 'Interner Serverfehler beim Laden der Ressourcen-Daten.'});
    }
});


router.post('/', (req, res) => {
    const newData = req.body;

    if (!newData.title || !newData.type) {
        res.status(400).json({error: 'title und type sind erforderlich.'});
        return; 
    }

    // 1. Neues Resource Objekt
    const newReource = {
        id: uuidv4(),
        ...newData
    }
    
    try {
        // 2. Vorhandene Daten aus der Datei lesen und in einem Array speichern.
        const data = readFileSync(data_file, 'utf8');
        const resources = JSON.parse(data);
        // 3. Das Neue Objekt in das Array hinzufuegen.
        resources.push(newReource);
        // 4. Das Neue Array in die Datei schreiben.
        writeFileSync(data_file, JSON.stringify(resources, null, 2), 'utf8');
        // 5. Antwort schicken
        res.status(201).json(newReource);
    } catch (error) {
        res.status(500).json({ error: 'Interner Serverfehler bei der Verarbeitung der Ressourcen-Daten.'});
    }


});


// Neuen Endpunkt implementieren
router.put('/:id', (req, res) => {
    // 1. ID auslesen
    const resourceId = req.params.id;
    const newData = req.body;

    if (Object.keys(newData).lenght === 0) {
        res.status(400).json({ error: 'Keine Daten zum Aktualisieren vorhanden.'});
        return;


    }
    
    try {
         // 2. Die Ressourcen laden
        const data = readFileSync(data_file, 'utf8');
        const resources = JSON.parse(data);
        // 3. Die Ressource nach ID suchen
        // const resource = resources.find(r => r.id === resourceId);
        const resourceIndex = resources.findIndex(r => r.id === resourceId);

        // 4. Wenn die Ressource nicht existiert-dann zeige 404
        if (resourceIndex === -1) {
            res.status(404).json({ error: `Ressource mit ID ${resourceId} nicht gefunden`});
            return;
        }

        // 5. Wenn die Ressource existiert-updaten
        resources[resourceIndex] = {...resources[resourceIndex], ...newData};

         // 6. Updates in der Datei speichern.
          writeFileSync(data_file, JSON.stringify(resources, null, 2), 'utf8');

        // 7. Antwort schicken
          res.status(200).json(resources[resourceIndex]);



    } catch (error) {
        res.status(500).json({ error: 'Interner Serverfehler bei der Verarbeitung der Ressourcen-Daten.'});
    }
        
   
   

});

// Gesamte Module wird exportiert
export default router;