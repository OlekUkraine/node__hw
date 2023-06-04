const fs = require('node:fs/promises');
const path = require('node:path');
const basePath = path.join(process.cwd(), 'db', 'db.json');

module.exports = {
    readDB: async () => {
        const buffer = await fs.readFile(basePath);
        const json = buffer.toString();

        return json ? JSON.parse(json) : [];
    },

    writeDB: async (users) => {
        await fs.writeFile(basePath, JSON.stringify(users));
    }
}