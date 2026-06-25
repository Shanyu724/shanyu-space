# 用 Obsidian + Vercel 部署你的个人站

> 面向非技术用户的逐步指南。**跟着做就能跑通，不需要懂代码。**

---

## 这是什么？

你用 **Obsidian** 写文章，写完一键发布，**Vercel** 帮你把网站发布到全世界。整条链路是：

```
Obsidian 写文章 → 自动推送到 GitHub → Vercel 自动构建 → 网站更新
```

---

## 总览

| 步骤 | 难度 | 预计时间 |
|------|------|---------|
| ① 注册 GitHub 账号 | 简单 | 5 分钟 |
| ② 注册 Vercel 账号 | 简单 | 2 分钟 |
| ③ 把网站代码推送到 GitHub | 中等 | 10 分钟（一次性） |
| ④ 在 Vercel 部署网站 | 简单 | 5 分钟 |
| ⑤ 在 Obsidian 装"Obsidian Git"插件 | 简单 | 3 分钟（一次性） |
| ⑥ 验证：写一篇文章测试 | 简单 | 2 分钟 |

---

## ① 注册 GitHub 账号

1. 打开 https://github.com
2. 点右上角 **Sign up**
3. 按提示填邮箱、密码、用户名
4. 去邮箱验证

> 💡 用户名会成为你网站仓库的链接一部分，比如 `github.com/zhangsan/shanyu-space`

---

## ② 注册 Vercel 账号

1. 打开 https://vercel.com
2. 点 **Sign Up** → **Continue with GitHub**
3. 用刚注册的 GitHub 账号授权登录
4. 不需要填卡，免费套餐完全够用

---

## ③ 把代码推到 GitHub

### 3.1 在 GitHub 新建仓库

1. 登录 GitHub，点右上角 `+` → **New repository**
2. 填写：
   - **Repository name**: `shanyu-space`（或你喜欢的名字）
   - **Description**: 我的个人站（随便填）
   - 选 **Private**（私有仓库，更安全）
   - **不要勾选**任何初始化选项（README、.gitignore、license 都不勾）
3. 点 **Create repository**

### 3.2 在本地推送代码

⚠️ 这一步需要打开"终端"应用。在 Windows 上：
- 按 `Win + R`，输入 `powershell`，回车
- 或者在开始菜单搜"PowerShell"

把下面的代码复制粘贴到终端里，**逐行执行**（每行回车一次）：

```powershell
# 1. 进入项目目录（替换为你的实际路径）
cd D:\obsidian笔记\shanyu-space

# 2. 初始化 Git
git init

# 3. 配置你的 GitHub 身份（首次使用需要）
git config --global user.name "你的GitHub用户名"
git config --global user.email "你的GitHub注册邮箱"

# 4. 添加所有文件
git add .

# 5. 第一次提交
git commit -m "初始化个人站"

# 6. 关联到你的 GitHub 仓库
# ⚠️ 替换 YOUR_USERNAME 为你的 GitHub 用户名
git remote add origin https://github.com/YOUR_USERNAME/shanyu-space.git

# 7. 推送到 GitHub
git branch -M main
git push -u origin main
```

推送时会弹窗让你登录 GitHub，按提示授权即可。

---

## ④ 在 Vercel 部署

1. 打开 https://vercel.com → 登录
2. 点 **Add New...** → **Project**
3. 在 "Import Git Repository" 找到 `shanyu-space`，点 **Import**
4. 保持所有默认设置不动（Framework Preset 自动识别为 Next.js）
5. 点 **Deploy**
6. 等待 1-2 分钟，看到 🎉 页面表示成功
7. 你的网站地址是 `https://shanyu-space.vercel.app`

> 💡 想用自己的域名？在 Vercel 项目页面 → Settings → Domains 里添加，会教你怎么配 DNS。

---

## ⑤ 在 Obsidian 装"Obsidian Git"插件

这是最关键的一步：装好之后你**以后写完文章只需要关闭 Obsidian**，插件会自动帮你推送到 GitHub。

### 5.1 打开网站仓库作为 Vault

1. 打开 Obsidian
2. 左下角点 **打开另一个 vault** → **打开文件夹作为 vault**
3. 选择 `D:\obsidian笔记\shanyu-space`
4. Obsidian 可能会弹窗问"是否信任这个 vault 的作者"——选**信任并启用**

> 第一次打开会看到一堆网站代码文件。**不要慌**。看仓库根目录的笔记 **「山雨·个人站 - 使用指南」**，它会告诉你哪些文件夹是你写文章用的。

### 5.2 安装插件

1. Obsidian 左下角齿轮 → **Community plugins**（社区插件）
2. 如果提示"受限模式"，先关掉
3. 点 **Browse**，搜索 **"Obsidian Git"**
4. 点 **Install** → **Enable**

### 5.3 配置自动提交

1. 进入 **Obsidian Git** 插件设置
2. 找到 **"Auto commit-and-sync interval (minutes)"**
3. 设为 **10**（每 10 分钟自动检查一次）
4. 找到 **"Auto pull on startup"** → 打开
5. 保存

### 5.4 第一次手动同步

1. 按 `Ctrl + P`（命令面板）
2. 输入 `Obsidian Git: Commit-and-sync`
3. 回车
4. 第一次会要求登录 GitHub，按提示走 OAuth 流程
5. 完成后，Obsidian Git 就会按你设的间隔自动跑了

---

## ⑥ 验证：写一篇文章测试

### 测试步骤

1. 在 Obsidian 左侧文件树，展开 `content/blog/essays/`
2. 右键 → **新建文件** → 起个名字，比如 `测试一下.md`
3. 写入：
   ```markdown
   ---
   title: "测试一下"
   date: "2026-06-26"
   description: "我的第一篇 Obsidian 文章"
   tags: [测试]
   published: true
   ---

   ## 你好，世界！

   这是我通过 Obsidian 写的第一篇文章。
   ```
4. 按 `Ctrl + S` 保存
5. 等 1-2 分钟（或者按 `Ctrl + P` → `Obsidian Git: Commit-and-sync`）
6. 打开你的 Vercel 域名，应该能看到这篇文章

如果没出现：
- 去 Vercel 项目页面 → Deployments，看最新部署有没有报错
- 看 Obsidian Git 输出的错误信息

---

## 日常使用

### 发一篇文章

1. 在 Obsidian 打开 `content/blog/{分类}/` 文件夹
2. 新建 markdown 文件
3. 写 frontmatter + 正文
4. `Ctrl + S` 保存
5. **关掉 Obsidian 就行**（或等 10 分钟）
6. 1-2 分钟后网站自动更新

### 改一篇文章

跟写一样。改完保存，等 10 分钟，网站更新。

### 不小心改坏了

Obsidian 有 **File Recovery**（文件恢复）插件，已默认开启，30 天内的版本可以找回。

GitHub 也是终极保险：所有历史版本都在那。GitHub 网站上点文件 → **History**，可以看到所有历史版本。

---

## 图片怎么办？

Obsidian 设置里已经配好了：粘贴/拖入图片会自动保存到 `content/assets/`，并插入正确引用。

在 Markdown 里这样用：
```markdown
![描述](image.png)
```

或者拖一张图到编辑器，Obsidian 自动处理。

---

## 高级：自定义域名

1. 买一个域名（比如 `shanyu.com`，在阿里云/Cloudflare 都能买）
2. Vercel 项目 → Settings → Domains → 输入域名 → Add
3. Vercel 告诉你配哪条 DNS 记录
4. 去域名注册商后台，按 Vercel 提示加 DNS
5. 等 DNS 生效（5 分钟到 24 小时），就能用 `shanyu.com` 访问

---

## 常见问题

**Q: 推送失败了？**
A: 90% 是网络问题或凭证失效。`Ctrl+P` → `Obsidian Git: Edit remotes` → 重新填远程地址；或者 `Obsidian Git: Validate` 检查。

**Q: 部署失败了？**
A: Vercel 项目页 → Deployments → 点失败的部署 → 看日志。最常见的是 markdown 格式错、frontmatter 缺字段。

**Q: 我想加新分类？**
A: 在 `content/blog/` 新建文件夹就行。如果想在导航栏出现，告诉 Claude 帮你加。

**Q: 怎么回退到上一版本？**
A: GitHub 仓库 → 文件 → History → 选一个旧版本 → 三点菜单 → Revert。

**Q: Vercel 收费吗？**
A: 个人站完全免费。每月 100GB 流量，你的小站一年都用不完。

---

## 一句话总结

> **装一次插件，之后只在 Obsidian 写文章，关闭即发布。**
