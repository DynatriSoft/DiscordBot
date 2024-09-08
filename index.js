import 'dotenv/config';
import http from 'http';
import fs from 'fs';
import path from 'path';

const TOKEN = process.env.TOKEN;

const htmlFilePath = path.join(__dirname, 'index.html');

const server = http.createServer((req, res) => {
    fs.readFile(htmlFilePath, (err, data) => {
        if (err) {
            res.writeHead(500, {'Content-Type': 'text/plain'});
            res.end('Error loading the page');
        } else {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(data);
        }
    });
});

server.listen(process.env.PORT || 3000, async () => {
    console.log('HTTP server running');

    const { ShardingManager } = require('discord.js');
    const manager = new ShardingManager('./bot.js', { token: TOKEN });
    
    manager.on('shardCreate', shard => console.log(`Launched shard ${shard.id}`));
    await manager.spawn();
});
