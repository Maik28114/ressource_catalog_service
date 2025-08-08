import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { v4 as uuidv4 } from 'uuid';
import { validateResource } from '../middleware/validation.js';


const router = express.Router();


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_FILE = path.join(__dirname, '../data', 'resources.json');
const FEEDBACK_FILE = path.join(__dirname, '../data', 'feedback.json');




router.get('/', (req, res, next) => {
    try {
        const data = fs.readFileSync(DATA_FILE, 'utf8');
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
        const data = fs.readFileSync(DATA_FILE, 'utf8');
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


router.post('/:resourceId/feedback', (req, res, next) => {
    const resourceId = req.params.resourceId;
    const { feedbackText, userId } = req.body;

    // Schritt 5: Validierung
    if (!feedbackText || feedbackText.trim().length < 10 || feedbackText.trim().length > 500) {
        return res.status(400).json({ error: 'Feedback-Text muss zwischen 10 und 500 Zeichen lang sein.' });
    }

    // Schritt 6: Neues Feedback-Objekt
    const newFeedback = {
        id: uuidv4(),
        resourceId: resourceId,
        feedbackText: feedbackText.trim(),
        userId: userId || 'anonymous',
        timestamp: new Date().toISOString()
    };

    // Schritt 7: Feedback speichern
    try {
        const data = fs.readFileSync(FEEDBACK_FILE, 'utf-8');
        const feedback = JSON.parse(data);

        feedback.push(newFeedback);

        const newFeedbackData = JSON.stringify(feedback, null, 2);
        fs.writeFileSync(FEEDBACK_FILE, newFeedbackData, 'utf-8');

        res.status(201).json(newFeedback);
    } catch (error) {
        console.error('Fehler beim Schreiben des Feedbacks in die Datei:', error);
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