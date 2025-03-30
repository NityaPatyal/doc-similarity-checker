import Document from '../models/document.js';
import { calculateSimilarity } from '../utils/similarity.js';
import logger from '../utils/logger.js';

export const uploadAndCompareDocuments = async (req, res) => {
    try {
        if (req.files.length !== 2) {
            logger.warn('User uploaded incorrect number of files'); // Logging warning
            return res.status(400).json({ error: 'Please upload exactly two documents.' });
        }

        const text1 = req.files[0].buffer.toString('utf-8');
        const text2 = req.files[1].buffer.toString('utf-8');

        // Log file upload event
        logger.info(`Files uploaded: ${req.files[0].originalname}, ${req.files[1].originalname}`);

        // Save documents in DB
        await Document.create({ name: req.files[0].originalname, content: text1 });
        await Document.create({ name: req.files[1].originalname, content: text2 });
        logger.info('Documents saved in the database');

        // Compute Similarity
        const similarityScore = calculateSimilarity(text1, text2);
        logger.info(`Similarity score computed: ${similarityScore}`);

        res.json({ similarity: similarityScore });
    } catch (error) {
        logger.error(`Error in uploadAndCompareDocuments: ${error.message}`); // Logging error
        res.status(500).json({ error: 'Internal Server Error' });
    }
};