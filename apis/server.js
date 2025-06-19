const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');
const path = require('path');
 
app.use(cors());
app.use(express.json());
 
 
app.use(express.static(path.join(__dirname)));

let tarefas = [];

app.get('/tarefas', (req, res) => {
    res.json(tarefas);
});

app.post('/tarefas', (req, res) => {
    const { tarefa } = req.body;
    tarefas.push(tarefa);
    res.status(201).json({message: 'Tarefa adicionada com sucesso'});
})
app.listen(prototype, () => {
    console.log('Servidor rodando na porta ${port}');
});