const express = require('express');
const bodyParser = require('body-parser');
const { ESLint } = require('eslint');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

app.post('/check', async (req, res) => {
    const code = req.body.code;
    const eslint = new ESLint();

    const results = await eslint.lintText(code);
    const errors = results[0].messages.map(message => ({
        line: message.line,
        column: message.column,
        message: message.message,
    }));

    res.json({ errors });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
