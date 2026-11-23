# Tigerbook's Projects Page

单页个人项目展示网站，正式地址为 **https://www.tigerbook.top/**。

技术栈：Vite、React、TypeScript、Tailwind CSS，使用 Cloudflare Workers Static Assets 托管。不需要后端、数据库或运行时环境变量。

## 本地运行

使用 Node.js 24 或更新版本，pnpm 11。

```bash
pnpm install --frozen-lockfile
pnpm dev
```

打开终端输出的地址。若默认端口被占用：

```bash
pnpm dev --port 5187
```

```bash
pnpm typecheck     # TypeScript 检查
pnpm build         # 检查类型并构建到 dist/
pnpm preview       # 预览生产构建
pnpm deploy:check  # 构建并检查 Cloudflare 部署包，不发布
```

## 页面设计和功能

- 简洁的纯信息作品集布局：绿色点缀、项目简介、技术标签和链接，首页不显示图片或视频。
- 手机单列、桌面双列，重点项目通过边框和标签突出。
- 亮色与暗色模式；首次跟随系统，手动选择后保存在当前浏览器，并同步同源标签页。
- 分类筛选与搜索：搜索项目名称、描述和技术栈。
- 项目可选详细介绍、图片或视频；配置后显示 Details 入口，点击才加载详情中的媒体。未配置的项目不显示入口，也不占用图片位置。
- 详情弹窗支持 Escape、关闭按钮、背景点击。
- 键盘焦点、跳过导航、减少动画偏好、搜索结果提示。
- 本地托管字体与预览图，不依赖第三方图片服务。
- 网站图标、canonical、分享图片、robots.txt、sitemap.xml 和 404 页面。

## 修改项目资料

编辑 **`src/projects.ts`**。项目选择、仓库链接和可见性以站点所有者提供的 GitHub 清单及后续调整为准；描述和技术栈根据本机对应仓库的 README、依赖和源代码核对。当前包含以下 7 个项目：

| 项目 | 分类 | 源码与站点 |
| --- | --- | --- |
| Exchange Rate | Web apps | Public；站点地址来自该项目 README |
| Rambos Grooming | Client work | Private；展示客户项目与所有者提供的 Wix Studio 站点入口，不输出私有仓库链接 |
| Online Mahjong (`new-mj`) | Games | Public；尚未填写演示网址 |
| FAQ RAG | Web apps | Public；尚未填写演示网址 |
| Bun Scripts | Developer tools | Public；提供 `@tigerbook/run-scripts` 和 `@tigerbook/check-env` 的 npm 包入口 |
| Next.js Shopify | Web apps | Public；使用所有者提供的 Vercel 演示地址 |
| MCP Annotation (`mcp-server-anotation`) | Developer tools | Public；MCP server，链接保留仓库实际拼写 |

Rambos Grooming、Next.js Shopify 和两个 npm 包的地址以所有者最新提供的链接为准。当前环境未能访问 GitHub 或验证这些外部站点的远程可访问性，因此以上内容不是 GitHub 在线读取结果，站点入口也不代表已验证新版本上线。不在页面展示过时的相对更新时间。

目前 `public/projects/*.svg` 是为展示页绘制的**项目示意图，不是真实截图**，仅在点击 Details 后展示，弹窗中也会说明。将真实截图或视频放到 `public/projects/` 后，更改对应的可选 `media`。删除 `media` 后不会保留空白图片区域。

```ts
{
  id: 'my-project',
  title: 'My Project',
  tagline: '一句话概述。',
  description: '项目介绍。',
  category: 'Web apps', // Web apps | Client work | Games | Developer tools
  stack: ['React', 'TypeScript'],
  github: 'https://github.com/your-name/your-project',
  website: 'https://your-project.example.com',
  featured: false,
}
```

上面的配置只展示信息卡片。需要详情时，可额外配置 `details`（纯文本，支持换行）和／或 `media`，任一存在就会显示 Details 入口：

```ts
details: '补充项目背景、功能与实现方式。\n\n可以分段说明。',
media: {
  kind: 'image',
  src: '/projects/my-project.webp',
  alt: '项目主页截图',
  caption: '主页截图',
},
```

仅有 `details` 时，详情也可以是纯文本；没有 `details` 和 `media` 的项目直接通过 GitHub、站点和 npm 链接访问。

没有确认部署地址时使用 `website: null`，页面会显示 `No demo linked`；工具可用 `websiteNote` 标注 `Command-line tools`、`Bash extension` 或 `MCP server`。私有项目用 `github: null`，显示 `Private source`。不要填写假地址。`featured: true` 可突出展示一个重点项目。

分类按钮从实际项目内容生成，数量显示同步更新，无需单独维护。

一个项目有多个 npm 包时，使用 `packages: [{ name: '@scope/package', url: 'https://www.npmjs.com/package/@scope/package' }]` 配置，卡片会分别显示包入口，并保留 GitHub 链接。

视频配置示例：

```ts
media: {
  kind: 'video',
  src: '/projects/demo.mp4',
  poster: '/projects/demo-cover.webp',
  alt: '项目功能演示',
  caption: '功能演示视频',
}
```

建议提供视频封面；视频在弹窗中手动播放，不自动播放。大视频可托管在外部媒体服务，`src` 使用 HTTPS 直链。

## Cloudflare 部署

部署配置在 **`wrangler.jsonc`**：

- Worker 名称：`tigerbook-projects`
- 静态文件目录：`dist/`
- 自定义域名：`www.tigerbook.top`
- 不含后端 Worker、数据库或其他资源绑定。
- 未知路径使用 `public/404.html`，不回退到首页。

### 通过本机部署

在你拥有 `tigerbook.top` DNS 区域的 Cloudflare 账户完成认证：

```bash
pnpm exec wrangler login
pnpm exec wrangler whoami
pnpm deploy
```

部署时配置中的自定义域名会交由 Cloudflare 处理。如果该域名已有其他服务，先确认现有 DNS 和服务用途。

### Git 自动构建部署

将项目提交到 GitHub，在 Cloudflare 的 Workers & Pages 中创建 Worker 并连接仓库。

| 设置 | 值 |
| --- | --- |
| Worker 名称 | `tigerbook-projects` |
| 项目根目录 | 仓库根目录 |
| 构建命令 | `pnpm build` |
| 部署命令 | `pnpm exec wrangler deploy` |
| Node 版本 | 24 |
| pnpm 版本 | 11 |

Cloudflare 中的 Worker 名称应与 `wrangler.jsonc` 一致。安装依赖时使用提交的 `pnpm-lock.yaml`。构建步骤已生成产物，部署命令无需再运行一次 build。

在 **Settings → Builds → Build variables and secrets** 中设置普通构建变量：

| 变量 | 值 |
| --- | --- |
| `NODE_VERSION` | `24` |
| `PNPM_VERSION` | `11` |

`engines.pnpm: "11.x"` 仅声明项目兼容范围，不会让 Cloudflare 自动选择 pnpm 11。这里通过 `PNPM_VERSION=11` 选择 11 系列，不固定小版本。变量必须放在构建设置中，不能只添加到 Worker 的运行时变量。

`pnpm-workspace.yaml` 显式声明 `packages: [.]`，并保留 esbuild 与 workerd 的构建脚本许可。若日志仍出现 `pnpm@9.10.0` 和 `packages field missing or empty`，先确认当前构建拉取了这份配置，再检查上述构建变量。保存变量后重试失败的构建，或等待新的 Git 推送触发。

### 根域名跳转到 www

正式地址使用 `www.tigerbook.top`。如需 `https://tigerbook.top/...` 自动跳转，在 Cloudflare 对根域名设置 **301 Redirect Rule**：

- 匹配主机名：`tigerbook.top`
- 目标：`https://www.tigerbook.top` 加原始请求路径。
- 保留查询参数。
- 确保根域名有合适的代理 DNS 记录，以便流量进入 Cloudflare 规则。

这属于 Cloudflare 区域设置，不在前端 JavaScript 中做跳转。

## 文件位置

```text
src/App.tsx          页面、主题、筛选与可选详情弹窗
src/projects.ts      项目内容和媒体配置
src/style.css        Tailwind 入口、主题变量和响应式样式
public/projects/    项目预览素材
public/_headers     静态资源缓存与响应头
wrangler.jsonc      Cloudflare 部署和正式域名
```

本地构建或 dry run 成功不代表已发布。只有真实部署成功，并验证域名后才能确认线上版本。

## 本次验证范围

- `pnpm install --offline --frozen-lockfile`：通过，使用当前环境已缓存的依赖。
- `pnpm build`：通过，包含 TypeScript 检查。
- DOM 交互检查：分类、搜索、空结果重置、详情开关、媒体按需显示、滚动恢复、主题持久化、跟随系统及外链属性。
- 静态产物检查、SVG/XML 解析、Cloudflare `deploy --dry-run`：通过。
- 当前环境限制浏览器启动，手机和桌面的真实渲染、视觉效果、原生弹窗焦点行为尚未完成浏览器验收。
- 初版已由用户执行 `pnpm deploy` 发布到 `www.tigerbook.top`，日志版本为 `bb9afe4a-fafc-446d-833d-3a3638c563e3`；此后本地修改需要再次发布。当前环境的 Cloudflare 认证服务连接此前受限，未改动已保存凭据。
