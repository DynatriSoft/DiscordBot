import 'dotenv/config';
import express from 'express';
import path from 'path';
import { ShardingManager } from 'discord.js';

const app = express();
const PORT = process.env.PORT || 3000;
const TOKEN = process.env.TOKEN;

const htmlFilePath = path.join(__dirname, 'website/index.html');

app.get('/', (req, res) => {
    res.sendFile(htmlFilePath);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    const manager = new ShardingManager('./bot.js', { token: TOKEN });
    manager.on('shardCreate', shard => console.log(`Launched shard ${shard.id}`));
    manager.spawn();
});
