import { chdir, cwd } from 'node:process';

console.log(`Starting directory: ${cwd()}`);
try {
  chdir('tmp');
  console.log(`In directory: ${cwd()}`);
} catch (err) {
  console.error(`chdir: ${err}`);
}
