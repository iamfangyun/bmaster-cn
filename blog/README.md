# bmaster.cn Blog System

博客系统部署在 `blog.bmaster.cn`，支持中英文双语、评论功能和 SEO 优化。

## 📁 目录结构

```
blog/
├── index.html              # 英文首页
├── index_zh.html           # 中文首页
├── article-template.html    # 文章模板
├── assets/
│   ├── css/
│   │   └── styles.css     # 统一样式
│   └── js/
│       └── comments.js    # 评论加载脚本
├── components/
│   └── comments.html     # 评论组件
├── articles/              # 英文文章目录
│   └── [article-name].html
└── zh/                    # 中文版本
    ├── index.html
    └── articles/
        └── [article-name].html
```

## 🚀 快速开始

### 1. 创建新文章

复制 `article-template.html`：

```bash
cp blog/article-template.html blog/articles/your-article.html
cp blog/article-template.html blog/zh/articles/your-article.html
```

### 2. 配置 giscus 评论

1. 访问 https://github.com/apps/giscus
2. 安装 giscus 到你的 GitHub 仓库
3. 在仓库设置中启用 Discussions
4. 配置完成后，更新 `assets/js/comments.js` 中的配置：

```javascript
const GISCUS_CONFIG = {
  repo: 'your-username/your-repo',  // 你的仓库
  repoId: 'R_kgDO...',              // 从 giscus 获取
  category: 'Announcements',        // 讨论区分类
  categoryId: 'DIC_kwDO...'         // 从 giscus 获取
};
```

### 3. 更新文章列表

在 `index.html` 和 `index_zh.html` 中添加新文章卡片：

```html
<article class="article-card">
  <div class="meta">June 26, 2026 · 5 min read</div>
  <h2><a href="/blog/articles/your-article.html">文章标题</a></h2>
  <p class="excerpt">文章摘要...</p>
  <div class="tags">
    <span class="tag">标签1</span>
    <span class="tag">标签2</span>
  </div>
</article>
```

## 🌐 多语言配置

每篇文章需要创建两个版本：
- 英文版：`/blog/articles/article.html`
- 中文版：`/blog/zh/articles/article.html`

确保在 `<head>` 中正确设置语言和 hreflang 标签。

## 📊 SEO 优化

### Meta 标签
每个文章页面包含完整的 SEO 标签：
- Title
- Description
- Keywords
- Canonical URL
- Alternate hreflang
- Open Graph

### Sitemap
生成并提交 sitemap 到搜索引擎：
- Google Search Console
- Bing Webmaster Tools

## 💬 评论系统说明

使用 [giscus](https://giscus.app/) 作为评论系统：

**优点**：
- ✅ 完全免费
- ✅ 数据存储在 GitHub Discussions
- ✅ 支持 Markdown、表情、回复
- ✅ 多语言支持
- ✅ 无需服务器

**配置步骤**：
1. 确保 GitHub 仓库启用了 Discussions
2. 在 giscus.app 配置你的仓库
3. 复制配置到 `assets/js/comments.js`
4. 每个文章页面自动加载评论

## 🔧 自定义配置

### 修改主题色
编辑 `assets/css/styles.css`：

```css
:root{
  --primary: #2563eb;     /* 主色调 */
  --primary-dark: #1e40af; /* 深色调 */
  /* ... 其他颜色 */
}
```

### 修改导航链接
编辑每个页面的 `<nav>` 部分。

## 📝 文章编写规范

1. **文件命名**：使用小写字母和连字符，如 `ai-cost-report.html`
2. **标题长度**：建议 50-60 个字符
3. **摘要长度**：建议 150-160 个字符
4. **标签数量**：建议 3-5 个相关标签

## 🚢 部署到 GitHub Pages

1. 推送代码到 GitHub 仓库
2. 在仓库设置中启用 GitHub Pages
3. 选择源目录为 `/blog` 或根目录
4. 配置自定义域名 `blog.bmaster.cn`

## 🔗 域名配置

在域名 DNS 设置中添加 CNAME 记录：
```
blog → [your-username].github.io
```

## 📈 性能优化

- ✅ CSS 内联到 HTML
- ✅ 图片使用 WebP 格式
- ✅ 启用 gzip 压缩
- ✅ 使用 CDN 加速

## 📄 许可证

所有文章采用 CC BY-NC-SA 4.0 许可
