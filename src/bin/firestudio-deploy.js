import { exec } from 'child_process'

exec('cd \"dist/functions\" && npm install && cd \"../\" && firebase deploy', (err, stdout) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(stdout);
})
