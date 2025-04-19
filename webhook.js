const express = require('express');
const { spawn } = require('child_process');

const app = express();
app.use(express.json());

app.get('/webhook', (req, res) => {
  res.send('Webhook listener aktif ✅');
});

app.post('/webhook', (req, res) => {
  const branch = req.body?.ref;
  console.log('Webhook POST received:', branch);

  if (branch === 'refs/heads/main') {
    console.log('Triggering deploy.sh...');
    const deployProcess = spawn('bash', ['/home/cobanext/deployer/deploy.sh']);

    deployProcess.stdout.on('data', (data) => {
      process.stdout.write(`stdout: ${data}`);
    });

    deployProcess.stderr.on('data', (data) => {
      process.stderr.write(`stderr: ${data}`);
    });

    deployProcess.on('close', (code) => {
      console.log(`deploy.sh exited with code ${code}`);
    });
  }

  res.status(200).send('OK');
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Webhook listening on port ${PORT}`);
});
