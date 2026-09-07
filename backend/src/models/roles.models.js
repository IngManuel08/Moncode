import mongoose from 'mongoose';

const roleSchema = new mongoose.Schema({
    role: {
        type: String,
        required: true,
        trim: true
    }
}); //fin de roleSchema

export default mongoose.model('Role', roleSchema);
