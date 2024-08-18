import express from 'express';

const app = express();

app.use(express.json());

const validUser = {
    username: 'escorpiao',
    password: 'escorpiao'
};
let products = [];
let nextId = 1;

app.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (username === validUser.username && password === validUser.password) {
        return res.status(200).json({ message: 'Login realizado com sucesso' });
    } else {
        return res.status(401).json({ message: 'Credenciais inválidas' });
    }
});
app.post('/products', (req, res) => {
    const { name, price, stock } = req.body;

    if (!name || !price || !stock) {
        return res.status(400).json({ message: 'Todos os campos são necessários!' });}

    const newProduct = { id: nextId++, name, price, stock };
    products.push(newProduct);
    res.status(201).json(newProduct); 
});

// Rota para recuperar um produto pelo ID
app.get('/products/:id', (req, res) => {
    const { id } = req.params;
    const product = products.find(p => p.id === parseInt(id, 10));

    if (product) {
        res.status(200).json(product); 
    } else {
        res.status(404).json({ message: 'Produto não encontrado!' });
    }
});

// Rota para atualizar um produto existente
app.put('/products/:id', (req, res) => {
    const { id } = req.params;
    const { name, price, stock } = req.body;
    const productIndex = products.findIndex(p => p.id === parseInt(id, 10));

    if (productIndex === -1) {
        return res.status(404).json({ message: 'Produto não encontrado!' }); 
    }

    const updatedProduct = { id: parseInt(id, 10), name, price, stock };
    products[productIndex] = updatedProduct;
    res.status(200).json(updatedProduct);
});

// Rota para deletar um produto
app.delete('/products/:id', (req, res) => {
    const { id } = req.params;
    const productIndex = products.findIndex(p => p.id === parseInt(id, 10));

    if (productIndex === -1) {
        return res.status(404).json({ message: 'Produto não encontrado!' }); 
    }

    products.splice(productIndex, 1);
    res.status(204).send(); 
});

export default app;
