import mongoose from 'mongoose';

const DocumentSchema = new mongoose.Schema({
    name: String,
    content: String
});

export default mongoose.model('Document', DocumentSchema);