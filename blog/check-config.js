/**
 * 博客系统配置检查脚本
 * 运行此脚本验证配置是否正确
 */

const fs = require('fs');
const path = require('path');

// 颜色输出
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m'
};

// 获取当前脚本所在目录的父目录（bmaster-cn）
const BASE_DIR = path.join(__dirname, '..');

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function checkFile(filePath, description) {
  const fullPath = path.join(BASE_DIR, 'blog', filePath);
  if (fs.existsSync(fullPath)) {
    log(`✅ ${description}: ${filePath}`, 'green');
    return true;
  } else {
    log(`❌ ${description} 缺失: ${filePath}`, 'red');
    return false;
  }
}

function checkFileContent(filePath, requiredContent, description) {
  const fullPath = path.join(BASE_DIR, 'blog', filePath);
  if (!fs.existsSync(fullPath)) {
    log(`❌ 文件不存在: ${filePath}`, 'red');
    return false;
  }

  const content = fs.readFileSync(fullPath, 'utf8');
  const hasRequired = requiredContent.some(item => content.includes(item));

  if (hasRequired) {
    log(`✅ ${description}`, 'green');
    return true;
  } else {
    log(`⚠️ ${description} 需要配置`, 'yellow');
    return false;
  }
}

console.log('\n🔍 博客系统配置检查\n'.repeat(2));

let allPassed = true;

// 检查目录结构
log('📁 检查目录结构...', 'blue');
const dirs = [
  'assets',
  'assets/css',
  'assets/js',
  'components',
  'articles',
  'zh',
  'zh/articles'
];

dirs.forEach(dir => {
  const dirPath = path.join(BASE_DIR, 'blog', dir);
  if (fs.existsSync(dirPath)) {
    log(`✅ blog/${dir}/`, 'green');
  } else {
    log(`❌ blog/${dir}/ 不存在`, 'red');
    allPassed = false;
  }
});

// 检查核心文件
log('\n📄 检查核心文件...', 'blue');
const files = [
  { path: 'index.html', desc: '英文首页' },
  { path: 'index_zh.html', desc: '中文首页' },
  { path: 'assets/css/styles.css', desc: '样式文件' },
  { path: 'assets/js/comments.js', desc: '评论脚本' },
  { path: 'components/comments.html', desc: '评论组件' },
  { path: 'article-template.html', desc: '文章模板' },
  { path: 'README.md', desc: '说明文档' }
];

files.forEach(file => {
  if (!checkFile(file.path, file.desc)) {
    allPassed = false;
  }
});

// 检查 giscus 配置
log('\n💬 检查评论系统配置...', 'blue');
const commentsJsPath = path.join(BASE_DIR, 'blog', 'assets/js/comments.js');

if (fs.existsSync(commentsJsPath)) {
  const commentsContent = fs.readFileSync(commentsJsPath, 'utf8');

  const hasRepoConfig = commentsContent.includes('GISCUS_CONFIG');
  const hasPlaceholder = commentsContent.includes('your-username/your-repo');

  if (!hasRepoConfig) {
    log('❌ GISCUS_CONFIG 对象不存在', 'red');
    allPassed = false;
  } else if (hasPlaceholder) {
    log('⚠️ giscus 配置需要更新 (当前为占位符)', 'yellow');
    log('   请参考 blog/GISCUS_SETUP.md 进行配置', 'yellow');
  } else {
    log('✅ giscus 配置已设置', 'green');
  }
} else {
  log('❌ comments.js 不存在', 'red');
  allPassed = false;
}

// 检查文章页面是否包含评论组件
log('\n📝 检查文章页面...', 'blue');
const articlesDir = path.join(BASE_DIR, 'blog', 'articles');
if (fs.existsSync(articlesDir)) {
  const articleFiles = fs.readdirSync(articlesDir).filter(f => f.endsWith('.html'));

  if (articleFiles.length > 0) {
    log(`找到 ${articleFiles.length} 篇文章`, 'green');

    articleFiles.forEach(article => {
      const articlePath = path.join(articlesDir, article);
      const content = fs.readFileSync(articlePath, 'utf8');

      if (content.includes('comments-component') || content.includes('comments.html')) {
        log(`✅ ${article} 包含评论组件`, 'green');
      } else {
        log(`⚠️ ${article} 缺少评论组件`, 'yellow');
      }
    });
  } else {
    log('📭 articles 目录为空', 'blue');
  }
} else {
  log('📭 articles 目录不存在', 'blue');
}

// 最终结果
log('\n' + '='.repeat(50) + '\n', 'blue');

if (allPassed) {
  log('✅ 所有检查通过！博客系统配置正确。', 'green');
  log('\n下一步：', 'blue');
  log('1. 配置 giscus 评论系统 (参考 GISCUS_SETUP.md)', 'blue');
  log('2. 创建你的第一篇文章 (复制 article-template.html)', 'blue');
  log('3. 更新首页的文章列表', 'blue');
  log('4. 推送到 GitHub 并部署', 'blue');
} else {
  log('❌ 部分检查失败，请修复上述问题。', 'red');
  log('\n建议操作：', 'blue');
  log('1. 确保所有必要文件已创建', 'blue');
  log('2. 检查目录结构是否完整', 'blue');
  log('3. 配置 giscus 评论系统', 'blue');
}

console.log('\n');
