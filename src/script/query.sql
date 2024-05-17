-- 插入类别数据
INSERT INTO "Category" ("title","updatedAt") VALUES
('Product', now()),
('Learning Resources', now()),
('Company Info', now());

-- 插入链接数据
-- 假设类别ID为：1-产品，2-学习资源，3-公司信息
INSERT INTO "Link" ("title", "url", "imageUrl", "categoryId","updatedAt") VALUES
('ChatGPT', 'https://openai.com/', 'openai.png', 2, now()),
('Claude', 'https://claude.ai/', 'https://example.com/image/codex.jpg', 2, now());


--- 获取 icon
https://t0.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://emojitell.com&size=128