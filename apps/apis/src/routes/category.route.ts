import express from 'express';
import { createCategory, deleteCategory } from '../controllers/category.controller';

const router: express.Router = express.Router();
console.log('Category routes initialized');

router.post('/', createCategory);
router.delete('/:id', deleteCategory);

export default router;