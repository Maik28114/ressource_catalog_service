import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { v4 as uuidv4 } from 'uuid';

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






router.post('/', (req, res, next) => {
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