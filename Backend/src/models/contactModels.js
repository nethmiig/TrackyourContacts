// Import the mongoose library
import mongoose from 'mongoose';

// Define a schema for contacts
const contactSchema = new mongoose.Schema({
    first: {
        type: String, // First name of the contact
    },
    last: {
        type: String, // Last name of the contact
    },
    twitter: {
        type: String // Twitter handle of the contact
    },
    avatar: {
        type: String // URL to the avatar image of the contact
    },
    notes: {
        type: String // Additional notes about the contact
    }
});

// Specify the option to transform _id to id when converting to JSON
contactSchema.set('toJSON', {
    transform: (doc, ret) => {
        ret.id = ret._id; // Set 'id' property to the value of '_id'
        delete ret._id; // Remove the '_id' property
    }
});

// Create a mongoose model for contacts using the defined schema
const Contact = mongoose.model('Contact', contactSchema);

// Export the model to be used in other parts of the application
export default Contact;
