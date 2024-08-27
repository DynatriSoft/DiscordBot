import 'dotenv/config';
import http from "http";

const TOKEN = process.env.TOKEN;

const server = http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Bot is running\n');
});

server.listen(process.env.PORT || 3000, async () => {
    console.log('HTTP server running');

    const { ShardingManager } = require('discord.js');
    const manager = new ShardingManager('./bot.js', { token: TOKEN });
    manager.on('shardCreate', shard => console.log(`Launched shard ${shard.id}`));
    await manager.spawn();
});