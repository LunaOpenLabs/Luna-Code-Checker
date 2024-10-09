document.getElementById('checkButton').addEventListener('click', async () => {
    const code = document.getElementById('codeInput').value;
    const resultElement = document.getElementById('result');
    
    resultElement.textContent = 'Checking...';

    const response = await fetch('/check', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
    });

    const result = await response.json();
    
    if (result.errors.length === 0) {
        resultElement.textContent = 'No issues found!';
        resultElement.style.color = 'green';
    } else {
        resultElement.textContent = result.errors.map(err => `${err.line}:${err.column} - ${err.message}`).join('\n');
        resultElement.style.color = 'red';
    }
});
