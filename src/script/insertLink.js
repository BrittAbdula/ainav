const { Client } = require('pg');
const fs = require('fs'); // Import the fs module


// convert string to URL friendly string, support veraity of languages, emojis, and special characters
function strToURL(str) {
    // remove / ? : @ & = + $ # . , % and replace space with -
    let pattern = str.trim().replace(/\/|\?|:|@|&|=|\+|\$|#|\.|,|%| /g, '-');
    // collapse multiple hyphens into one
    pattern = pattern.replace(/-+/g, '-');
    return encodeURIComponent(pattern);
}

function removeQueryParams(url) {
    // Use a URL object to parse and manipulate the URL easily
    const parsedUrl = new URL(url);

    // Clear the search parameters
    parsedUrl.search = '';

    // Return the URL without query parameters
    return parsedUrl.href;
}

// PostgreSQL client configuration
// DATABASE_URL="postgres://default:KGmhFYr9ipk3@ep-bold-cake-90628992.us-east-1.aws.neon.tech:5432/verceldb?sslmode=require"
const client = new Client({
    // Your database configuration here
    host: 'ep-bold-cake-90628992.us-east-1.aws.neon.tech',
    user: 'default',
    password: 'KGmhFYr9ipk3',
    database: 'verceldb',
    port: 5432,
    ssl: {
        rejectUnauthorized: false, // 注意：在生产环境中，您应该将证书配置正确，不要使用这个选项。
        // 对于生产环境，请配置证书信息或将 rejectUnauthorized 设为 true
    },
});

// Data to be inserted
const tasks = [
    {
        "id": "42367",
        "name": "Nendo",
        "task": "Music samples",
        "task_id": "6172",
        "url": "https://nendo.ai/?ref=YOURREF&utm_source=YOURREF&utm_medium=referral",
        "task_slug": "music-samples"
    }
];

// Connect to the PostgreSQL database
client.connect();

// Function to insert data into the database
async function insertData(tasks) {
    try {
        await client.query('BEGIN'); // Start a transaction
        let i = 0;
        let j = 0;

        for (const item of tasks) {
            // 检查 Task 中是否已存在相同的 title
            const checkTitleText = 'SELECT * FROM "Task" WHERE "task" = $1';
            const checkRes = await client.query(checkTitleText, [item.task]);

            let taskId = null;
            const innerUrl = strToURL(item.name);
            const url = removeQueryParams(item.url);

            if (checkRes.rows.length === 0) {
                // Insert into Task table
                const insertTaskText = 'INSERT INTO "Task"("task", "taskSlug", "updatedAt") VALUES($1, $2, $3) RETURNING "id"';
                const resTask = await client.query(insertTaskText, [item.task, item.task_slug, new Date()]);
                taskId = resTask.rows[0].id;
            } else {
                // 如果 title 已存在，使用现有的 taskId
                taskId = checkRes.rows[0].id;
            }

            // 检查 Link 中是否已存在相同的 url
            const checkLinkText = 'SELECT * FROM "Link" WHERE "url" = $1 or "innerUrl" = $2';
            const checkLinkRes = await client.query(checkLinkText, [url, innerUrl]);

            if (checkLinkRes.rows.length > 0) {
                // 如果 title 已存在，跳过
                console.log('skipping ---i,j, title, innerUrl, url:', ++i, j, item.name, innerUrl, url);
                continue;
                //console.log('updating ---i,j, title:', i, j, item.name);
            }
            // // Insert into Link table
            // const insertLinkText = `INSERT INTO "Link"("title", "innerUrl", "url", "taskId", "updatedAt")
            // VALUES($1, $2, $3, $4, $5)
            // ON CONFLICT ("url")
            // DO UPDATE SET
            //     "innerUrl" = EXCLUDED."innerUrl",
            //     "title" = EXCLUDED."title",
            //     "taskId" = EXCLUDED."taskId",
            //     "updatedAt" = EXCLUDED."updatedAt";
            // `;
            const insertLinkText = `INSERT INTO "Link"("title", "innerUrl", "url", "taskId", "updatedAt") VALUES($1, $2, $3, $4, $5)`;
            await client.query(insertLinkText, [item.name, innerUrl, url , taskId, new Date()]);
            console.log('processing ---i,j, title, innerUrl, url:', ++i, j, item.name, innerUrl, url);
            if (i >= 10) {
                await client.query('COMMIT'); // Commit the transaction
                i = 0;
                j++;
            }
        }

    } catch (e) {
        await client.query('ROLLBACK'); // Rollback the transaction on error
        throw e;
    } finally {
        await client.end(); // Close the database connection
    }
}


// 读取data.json文件
const data = JSON.parse(fs.readFileSync('theresanaiforthat.json', 'utf8'));

// Call the function to insert data
// insertData(tasks).catch(console.error);
insertData(data).catch(console.error);