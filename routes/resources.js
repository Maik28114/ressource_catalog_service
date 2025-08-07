import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { v4 as uuidv4 } from 'uuid';
import { validateResource } from '../middleware/validation.js';


const router = express.Router();


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const data_file = path.join(__dirname, '../data', 'resources.json');




router.get('/', (req, res, next) => {
    try {
        const data = fs.readFileSync(data_file, 'utf8');
        let resources = JSON.parse(data);
        const {type, authorId } = req.query;

        if (type) {
            resources = resources.filter(r => r.type === type);
        }
        if (authorId) {
            resources = resources.filter(r => r.authorId === authorId);
        }

        res.json(resources);
    } catch (error) {
        next(error);
    }
});








router.get('/:id', (req, res, next) => {
    try {
        const data = fs.readFileSync(DATA_FILE, 'utf-8');
        let resources = JSON.parse(data);
        const { type, authorId } = req.query;

        if (type) {
            resources = resources.filter(r => r.type === type);
        }
        if (authorId) {
            resources = resources.filter(r => r.authorId === authorId);
        }

        res.json(resources);
    } catch (error) {
        next(error);
    }
});






router.post('/', validateResource, (req, res) => {
     const newResourceData = req.body;


    const newResource = {
        id: uuidv4(),
        ...newResourceData
    };
    
    try {
        // 2. Vorhandene Daten aus der Datei lesen und in einem Array speichern.
        const data = fs.readFileSync(data_file, 'utf8');
        const resources = JSON.parse(data);
        // 3. Das neue Objekt in das Array hinzufuegen.
        resources.push(newResource);
        // 4. Das neue Array in die Datei schreiben.
        writeFileSync(data_file, JSON.stringify(resources, null, 2), 'utf8');
        // 5. Antwort schicken.
        res.status(201).json(newResource);

    } catch (error) {
        next(error);
    }

});




router.put('/:id', (req, res, next) => {
      try {
        const data = fs.readFileSync(DATA_FILE, 'utf-8');
        let resources = JSON.parse(data);
        const { type, authorId } = req.query;

        if (type) {
            resources = resources.filter(r => r.type === type);
        }
        if (authorId) {
            resources = resources.filter(r => r.authorId === authorId);
        }

        res.json(resources);
    } catch (error) {
        next(error);
    }
});


router.delete('/:id', (req, res, next) => {
    try {
        const data = fs.readFileSync(DATA_FILE, 'utf-8');
        let resources = JSON.parse(data);
        const { type, authorId } = req.query;

        if (type) {
            resources = resources.filter(r => r.type === type);
        }
        if (authorId) {
            resources = resources.filter(r => r.authorId === authorId);
        }

        res.json(resources);
    } catch (error) {
        next(error);
    }
});

export default router;