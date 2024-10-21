const express = require('express');
const path = require('path');
const app = express();

const staticPath = path.join(__dirname, 'dist'); // Diretório de saída do Parcel
app.use(express.static(staticPath));

app.get('/', (req, res) => {
    res.sendFile(path.join(staticPath, 'index.html'));
});

app.get('/app', (req, res) => {
    res.sendFile(path.join(staticPath, 'app.html'));
});

app.use((req, res, next) => {
    res.status(404).sendFile(path.join(staticPath, 'index.html'));
});

const PORT = process.env.PORT || 1234;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});