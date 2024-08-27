import http from "http";
import {exec} from 'child_process';

const server = http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Bot is running\n');
});

server.listen(process.env.PORT || 3000, async () => {
    console.log('HTTP server running');
    exec('bun run ./bot.ts', (error, stdout, stderr) => {
        console.log('Bot started');
        if (error) {
            console.error(`Error executing bot: ${error.message}`);
            return;
        }
        if (stderr) {
            console.error(`Error output: ${stderr}`);
            return;
        }
        console.log(`Bot output: ${stdout}`);
    });
});