# giscus 评论系统配置指南

## 🎯 什么是 giscus？

giscus 是一个基于 GitHub Discussions 的评论系统，完全免费、无需服务器、支持多种功能。

## 📋 配置步骤

### 第一步：准备工作

确保你有一个 GitHub 仓库，且：
1. 仓库是公开的（public）
2. 仓库已启用 Discussions 功能

### 第二步：启用 Discussions

1. 进入你的 GitHub 仓库
2. 点击 **Settings** 标签
3. 滚动到 "Features" 部分
4. 勾选 **Discussions**
5. 确认启用

### 第三步：安装 giscus 应用

1. 访问 https://github.com/apps/giscus
2. 点击 **Install**
3. 选择你要安装到的仓库
4. 确认安装权限

### 第四步：配置 giscus

1. 访问 https://giscus.app
2. 填写配置表单：

| 配置项 | 推荐值 | 说明 |
|--------|--------|------|
| **仓库** | `your-username/blog` | 你的 GitHub 仓库 |
| **页 ↔️ Discussions 映射** | `pathname` | 每个 URL 对应一个讨论 |
| **Discussion 分类** | `Announcements` | 讨论区分类 |
| **主题** | `light` | 浅色主题 |
| **语言** | 根据`文章语言` | 自动检测 |

3. 配置完成后，你会看到类似这样的配置：

```javascript
<script src="https://giscus.app/client.js"
        data-repo="your-username/blog"
        data-repo-id="R_kgDO..."
        data-category="Announcements"
        data-category-id="DIC_kwDO..."
        data-mapping="pathname"
        data-strict="0"
        data-reactions-enabled="1"
        data-emit-metadata="0"
        data-input-position="bottom"
        data-theme="preferred_color_scheme"
        data-lang="en"
        data-loading="lazy"
        crossorigin="anonymous"
        async>
</script>
```

### 第五步：更新博客配置

复制以下配置到 `blog/assets/js/comments.js`：

```javascript
const GISCUS_CONFIG = {
  repo: 'your-username/blog',  // 你的仓库
  repoId: 'R_kgDO...',         // 从上面的配置复制
  category: 'Announcements',
  categoryId: 'DIC_kwDO...'     // 从上面的配置复制
};
```

### 第六步：测试

1. 打开任意文章页面
2. 滚动到底部评论区域
3. 使用 GitHub 账号登录
4. 发布一条测试评论

## 🔧 高级配置

### 自动主题切换

```javascript
// 根据系统偏好自动切换主题
theme: 'preferred_color_scheme'
```

### 多语言自动检测

博客系统会自动检测页面语言并设置对应语言：
- `en` → 英文界面
- `zh-CN` → 中文界面
- 其他语言查看 giscus 文档

### 评论数据管理

所有评论存储在 GitHub Discussions 中：
- 每篇文章对应一个 Discussion
- 可以在仓库的 Discussions 标签查看所有评论
- 支持 GitHub 的所有管理功能

## 🎨 自定义样式

可以通过 CSS 自定义评论样式，添加到 `assets/css/styles.css`：

```css
/* 自定义 giscus 样式 */
.giscus-frame {
  border-radius: 12px;
}
```

## 📊 评论数据查看

1. 进入你的 GitHub 仓库
2. 点击 **Discussions** 标签
3. 可以看到所有文章的评论

## 🔒 隐私和安全

- 用户需要 GitHub 账号才能评论
- 所有评论公开可见
- 可以设置评论审核模式
- 支持举报不当内容

## ❓ 常见问题

**Q: 评论加载不出来？**
A: 检查 JavaScript 控制台是否有错误，确认 repoId 和 categoryId 配置正确。

**Q: 如何删除评论？**
A: 在 GitHub Discussions 中找到对应的讨论，删除即可。

**Q: 如何迁移现有评论？**
A: giscus 基于 GitHub Discussions，评论数据属于仓库，无需迁移。

**Q: 支持匿名评论吗？**
A: 不支持，用户需要 GitHub 账号登录。

## 📚 更多信息

- [giscus 官方文档](https://github.com/giscus/giscus)
- [giscus 组件库](https://giscus.app)
- [GitHub Discussions 文档](https://docs.github.com/en/discussions)
