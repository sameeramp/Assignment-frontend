const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const Joi = require('joi');
const db = require('./dbConnection.js');
const Todo = require('./model/todo.js');
const Count = require('./model/count.js');

const app = express();
const PORT = process.env.PORT || 3001

app.use(bodyParser.json())
app.use(cors());

const validation = (value) => {
    const schema = Joi.object({
        content: Joi.string()
            .min(1)
            .max(100)
            .required(),
        id: Joi.string()
        })
        return schema.validate(value);
};

app.post('/api/add', async(req, res) => {
    const newData = req.body;
    const {error, value} = validation(newData);
    if(error) return res.status(422).json({message: "Validation error", data: value, success: false});
    try {
        const todo = await Todo.create(value);
        todo.save();
        await Count.updateOne({count: "count"}, { $inc: { add: 1 } });
        return res.status(201).json({ message: 'Data added Successfully', data: todo, success: true });
    } catch (error) {
        return res.status(500).json({message: "Internal server error", data: error?.message, success: false});
    }
})

app.put('/api/update', async(req, res) => {
    const newData = req.body;
    const {error, value} = validation(newData);
    if(error) return res.status(422).json({message: "Validation error", data: value, success: false});
    try {
        const todo = await Todo.updateOne({_id: newData._id, content: newData.content});
        await Count.updateOne({count: "count"}, { $inc: { update: 1 } });
        return res.status(201).json({ message: 'Data updated Successfully', data: todo, success: true });
    } catch (error) {
        return res.status(500).json({message: "Internal server error", data: error?.message, success: false});
    }
});

app.delete('/api/delete', async(req, res) => {
    const {id} = req.query;
    try {
        const todo = await Todo.deleteOne({_id: id});
        await Count.updateOne({count: "count"}, { $inc: { delete: 1 } });
        return res.status(200).json({ message: 'Data deleted Successfully', data: todo, success: true });
    } catch (error) {
        return res.status(500).json({message: "Internal server error", data: error?.message, success: false});
    }
});

app.get('/api/list', async(req, res) => {
    try {
        const todos = await Todo.find().select({content: 1});
        return res.status(200).json({ message: 'Data fetched Successfully', data: todos, success: true });   
    } catch (error) {
        return res.status(500).json({message: "Internal server error", data: error?.message, success: false});
    }
});

app.get('/api/count', async(req, res) => {
    try {
        const count = await Count.findOne({count: "count"});
        return res.status(200).json({ message: 'Data fetched Successfully', data: count, success: true });   
    } catch (error) {
        return res.status(500).json({message: "Internal server error", data: error?.message, success: false});
    }
});

app.listen(PORT, () => {
    console.log(`server is ruuning on port ${PORT}`)
})