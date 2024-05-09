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

ALTER TABLE "Link"
ADD COLUMN "describe" text;

update  "Link"
set "describe" = 'We believe our research will eventually lead to artificial general intelligence, a system that can solve human-level problems. Building safe and beneficial AGI is our mission.'
where id=5;


update  "Link"
set "describe" = 'Talk with Claude, an AI assistant from Anthropic
'
where id=6