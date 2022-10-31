import express from 'express';
import { requireSignIn } from "../middleware/middlewareAuth.js";
import { crudSchema } from "../models/crudSchema.js";
const router = express.Router();

export async function create(req, res) {
    try {
        const newEntry = req.body;
        crudSchema.create(newEntry, (err, newEntry) => {
            if (err) {
                return res.status(400).json({
                    status: 'false',
                    message: "creation failed Please contact support",
                    data: { err }
                });
            } else {
                return res.status(200).json({
                    status: 'true',
                    message: "collection added successfully",
                    data: { newEntry }
                });
            }
        });
    } catch (err) {
        return res.status(500).json({
            status: "false",
            message: "internal error please contact support",
            data: { err }
        })
    }
};


export async function readMany(req, res) {
    try {
        const query = res.locals.query || {};
        crudSchema.find(query, (err, result) => {
            if (err) {
                return res.status(400).json({
                    status: "false",
                    message: "something went wrong, failed to fetch data",
                    data: { err }
                });
            } else if (result.length === 0 || result == null) {
                return res.status(200).json({
                    status: "false",
                    message: "failed, no data found",
                    data: { result }
                });
            }
            else {
                return res.status(200).json({
                    status: "true",
                    message: "data fetched successfully",
                    data: { result }
                });
            }
        });
    } catch (err) {
        return res.status(500).json({
            status: "false",
            message: "internal error please contact support",
            data: { err }
        });
    }
};


export async function readOne(req, res) {
    try {
        const { _id } = req.params;
        crudSchema.findById(_id, (err, result) => {
            if (err) {
                return res.status(400).json({
                    status: "false",
                    message: "something went wrong, failed to fetch data",
                    data: { err }
                });
            } else if (result == null) {
                return res.status(200).json({
                    status: "false",
                    message: "failed, no data found",
                    data: { result }
                });
            } else {
                return res.status(200).json({
                    status: "true",
                    message: "data fetched successfully",
                    data: { result }
                });
            }
        });
    } catch (err) {
        return res.status(500).json({
            status: "false",
            message: "internal error please contact support",
            data: { err }
        });
    }
};


export async function update(req, res) {
    try {
        const changedEntry = req.body;
        crudSchema.updateOne({ _id: req.params._id }, { $set: changedEntry }, (err) => {
            if (err)
                return res.status(400).json({
                    status: "false",
                    message: "something went wrong, failed to update data",
                    data: { err }
                });
            else
                return res.status(200).json({
                    status: "true",
                    message: "data update successfully",
                    data: { changedEntry }
                });
        });
    } catch (err) {
        return res.status(500).json({
            status: "false",
            message: "internal error please contact support",
            data: { err }
        });
    }
};


export async function remove(req, res) {
    try {
        crudSchema.deleteOne({ _id: req.params._id }, (err) => {
            if (err)
                return res.status(400).json({
                    status: "false",
                    message: "something went wrong, failed to delete data",
                    data: { err }
                });
            else
                return res.status(200).json({
                    status: "true",
                    message: "data deleted successfully",
                    data: {}
                });
        });
    } catch (err) {
        return res.status(500).json({
            status: "false",
            message: "internal error please contact support",
            data: { err }
        });
    }
};




router.post('/', requireSignIn, create);
router.get('/', requireSignIn, readMany);
router.get('/:_id', requireSignIn, readOne);
router.put('/:_id', requireSignIn, update);
router.delete('/:_id', requireSignIn, remove);


export const crudRouter = router