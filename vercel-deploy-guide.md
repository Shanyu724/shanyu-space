# 部署到 Vercel

## 前置条件

- 一个 GitHub 账号（如果没有，先去 [github.com](https://github.com) 注册）
- 一个 Vercel 账号（用 GitHub 账号登录 [vercel.com](https://vercel.com) 即可）

---

## 第一步：推送到 GitHub

### 1.1 在 GitHub 新建仓库

- 登录 GitHub，点击右上角 `+` → `New repository`
- Repository name 填 `shanyu-space`（或其他你喜欢的名字）
- 设为 **Public**（Vercel 免费版要求公开仓库，或者你也可以用 Private 但需要付费）
- 不要勾选任何初始化选项（README、.gitignore、license 都不要）
- 点击 "Create repository"

### 1.2 本地推送

打开终端（PowerShell / CMD），进入项目目录：

```bash
cd D:\obsidian笔记\shanyu-space

git init
git add .
git commit -m "初始提交"

# 替换下面的 YOUR_USERNAME 为你的 GitHub 用户名
git remote add origin https://github.com/YOUR_USERNAME/shanyu-space.git
git branch -M main
git push -u origin main
```

---

## 第二步：部署到 Vercel

1. 打开浏览器访问 [vercel.com](https://vercel.com)
2. 点击右上角 **"Add New..."** → **"Project"**
3. 在 "Import Git Repository" 页面找到并选择 `shanyu-space` 仓库
4. **保持所有默认设置不动**（Framework Preset 会自动检测为 Next.js）
5. 点击 **"Deploy"** 按钮
6. 等待大约 1-2 分钟，部署完成后会显示 🎉 庆祝页面
7. 你的站点地址是 `https://shanyu-space.vercel.app`（或类似）

---

## 第三步：（可选）绑定自定义域名

如果你有自己的域名（比如 `shanyu.com`），可以在 Vercel 的项目页面：

- 进入 **Settings** → **Domains**
- 输入你的域名，点击 **Add**
- 根据提示在域名管理后台添加 DNS 记录

---

## 后续更新

以后每次更新内容（添加文章、修改页面等），只需要：

```bash
git add .
git commit -m "更新内容"
git push
```

Vercel 会自动检测到推送，自动重新部署。大约 1-2 分钟后网站就更新好了。

---

## 常见问题

**Q: 部署失败怎么办？**
A: 检查 GitHub 仓库里是否有完整的 `package.json` 和 `next.config.ts`。可以在 Vercel 的 Deployment Logs 里查看具体错误。

**Q: 图片不显示？**
A: 图片要放在 `public/images/` 目录下，在 Markdown 中用 `![描述](/images/文件名)` 引用。

**Q: 新增文章后网站没有更新？**
A: 确认已经 `git push` 成功了，然后等 1-2 分钟。如果还是不更新，去 Vercel 项目页面手动触发一次 "Redeploy"。
