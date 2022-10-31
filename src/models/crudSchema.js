import mongoose from "mongoose";


const jsonSchema = mongoose.Schema({
    content: { type: String },
    created: { type: Date, default: Date.now }
},
    { strict: false }
);


export const crudSchema = mongoose.model('crud', jsonSchema);
