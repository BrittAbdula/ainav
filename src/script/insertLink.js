const { Client } = require('pg');

// convert string to URL friendly string, support veraity of languages, emojis, and special characters
function strToURL(str) {
    // remove / ? : @ & = + $ # . , % and replace space with -
    let pattern = str.trim().replace(/\/|\?|:|@|&|=|\+|\$|#|\.|,|%| /g, '-');
    // collapse multiple hyphens into one
    pattern = pattern.replace(/-+/g, '-');
    return encodeURIComponent(pattern);
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
    },
    {
        "id": "42365",
        "name": "AI Children's Book Creator",
        "task": "Children's stories",
        "task_id": "68",
        "url": "https://kidsbook.connelly.casa/?ref=YOURREF&utm_source=YOURREF&utm_medium=referral",
        "task_slug": "children-s-stories"
    },
    {
        "id": "42360",
        "name": "MyTask",
        "task": "Task management",
        "task_id": "13850",
        "url": "https://mytaskai.vercel.app/?ref=YOURREF&utm_source=YOURREF&utm_medium=referral",
        "task_slug": "task-management"
    },
    {
        "id": "42359",
        "name": "IntelliGeniusAI",
        "task": "Content generation",
        "task_id": "662",
        "url": "https://intelligenius.ai/home/?ref=YOURREF&utm_source=YOURREF&utm_medium=referral",
        "task_slug": "content-generation"
    },
    {
        "id": "42345",
        "name": "LocalGPT",
        "task": "Private conversations",
        "task_id": "30150",
        "url": "https://chromewebstore.google.com/detail/localgpt-local-private-fr/olmanpjepeepjakgebgggedhjmlfjonf?ref=YOURREF&utm_source=YOURREF&utm_medium=referral",
        "task_slug": "private-conversations"
    },
];

// 读取data.json文件
//  const data = JSON.parse(fs.readFileSync('data.json', 'utf8'));

// Connect to the PostgreSQL database
client.connect();

// Function to insert data into the database
async function insertData(tasks) {
    try {
        await client.query('BEGIN'); // Start a transaction

        for (const item of tasks) {
            // 检查 Task 中是否已存在相同的 title
            const checkTitleText = 'SELECT * FROM "Task" WHERE "task" = $1';
            const checkRes = await client.query(checkTitleText, [item.task]);

            let taskId = null;
            if (checkRes.rows.length === 0) {
                // Insert into Task table
                const insertTaskText = 'INSERT INTO "Task"("task", "taskSlug", "updatedAt") VALUES($1, $2, $3) RETURNING "id"';
                const resTask = await client.query(insertTaskText, [item.task, item.task_slug, new Date()]);
                taskId = resTask.rows[0].id;
            } else {
                // 如果 title 已存在，使用现有的 taskId
                taskId = checkRes.rows[0].id;
            }

            // 检查 Link 中是否已存在相同的 title
            const checkLinkText = 'SELECT * FROM "Link" WHERE "title" = $1';
            const checkLinkRes = await client.query(checkLinkText, [item.name]);

            if (checkLinkRes.rows.length > 0) {
                // 如果 title 已存在，跳过
                continue;
            }
            const innerUrl = strToURL(item.name);
            // Insert into Link table
            const insertLinkText = 'INSERT INTO "Link"("title", "innerUrl", "url", "taskId", "updatedAt") VALUES($1, $2, $3, $4, $5)';
            await client.query(insertLinkText, [item.name, innerUrl, item.url, taskId, new Date()]);
        }

        await client.query('COMMIT'); // Commit the transaction
    } catch (e) {
        await client.query('ROLLBACK'); // Rollback the transaction on error
        throw e;
    } finally {
        await client.end(); // Close the database connection
    }
}

// Call the function to insert data
insertData(tasks).catch(console.error);