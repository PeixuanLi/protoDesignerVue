# img2element-plus

基于 Claude Code 的 UI 截图转 Vue 原型工具。将 UI 截图/设计稿自动转换为可运行的 **Vue 3 + Vite + Element Plus** 项目。

## 它是什么

这是一个 [Claude Code](https://claude.ai/code) skills 仓库，核心能力是 `img2element-plus` 技能：

- 输入：任意 UI 截图、设计稿、线框图
- 输出：完整的 Vue 3 + Vite + Element Plus 项目，`npm install && npm run dev` 即可运行
- 支持迭代修改和持续学习

## 前置要求

- [Claude Code CLI](https://docs.anthropic.com/en/docs/claude-code) 已安装并登录
- Node.js >= 18
- npm

## 快速开始

### 1. 在 Claude Code 中打开本项目

```bash
cd protoDesignerVue
claude
```

### 2. 发送截图 + 指令

在 Claude Code 对话中直接粘贴或拖入截图，配合以下任意指令触发技能：

| 指令示例 | 说明 |
|---------|------|
| `复刻这张图` / `照这个做原型` | 根据截图生成完整原型 |
| `参考这个图，做一个XX页面` | 带需求描述的生成 |
| `加一个XX字段` / `顶部显示XX` | 在已有原型上修改 |
| `这个也一样` | 复用上一次的修改模式 |
| `输出设计说明` | 查看当前原型的设计说明 |

也可以用英文触发：`replicate this design`、`convert this mockup to Vue` 等。

### 3. 运行生成的原型

```bash
cd output/0408-设计名称
npm install
npm run dev
```

## 技能工作流

```
截图 + 指令
    ↓
读取上下文 (config / design_system / learning_log)
    ↓
分析截图 (布局 / 组件 / 配色 / 交互)
    ↓
生成 Vue 项目
    ├── package.json
    ├── vite.config.ts
    ├── src/
    │   ├── views/MainView.vue
    │   ├── components/...
    │   ├── styles/element-overrides.css
    │   └── mock/data.ts
    ↓
迭代修改 (按需)
    ↓
更新学习日志
```

## 项目结构

```
protoDesignerVue/
├── .claude/skills/
│   ├── img2element-plus/          # 核心技能
│   │   ├── SKILL.md               # 技能定义和工作流
│   │   └── references/
│   │       ├── config.json        # 输出配置、技术栈
│   │       ├── design_system.json # Element Plus 主题、组件映射
│   │       └── learning_log.jsonl # 交互学习记录
│   ├── antfu/                     # Vue/Vite 最佳实践
│   ├── element-plus-vue3/         # Element Plus 组件参考
│   └── ...                        # 其他辅助技能
├── output/                        # 生成的原型项目
│   └── 0408-npm包详情页/          # 示例原型
├── skills-lock.json               # 技能版本锁定
├── CLAUDE.md                      # Claude Code 项目指引
└── README.md
```

## 技术栈

生成的原型统一使用：

- **Vue 3** + Composition API (`<script setup>`)
- **Vite** 构建工具
- **Element Plus** UI 组件库
- **TypeScript**
- **Vue Router**（按需）
- **Pinia**（按需）

## 配置说明

### config.json

| 字段 | 默认值 | 说明 |
|------|--------|------|
| `output_root` | `"output"` | 原型输出根目录 |
| `project_naming` | `"MMDD-设计名称"` | 项目命名规则 |
| `onboarding_completed` | `false` | 是否完成首次引导 |
| `tech_stack` | 见下方 | 技术栈配置 |

### design_system.json

维护 Element Plus 主题覆盖变量、组件映射规则和自定义配色方案。每次生成原型时会读取此文件，发现新模式时自动更新。

### learning_log.jsonl

追加写入的交互日志，记录每次生成的截图描述、使用的组件、用户偏好等。随使用积累，输出质量会逐步提升。

## 常见场景

### 场景一：从零生成原型

```
用户: [发送截图] 复刻这个页面
Claude: [分析截图 → 生成完整 Vue 项目 → 输出路径和启动命令]
```

### 场景二：迭代修改

```
用户: 筛选框增加一个"状态"下拉框
Claude: [修改 SearchBar.vue → 添加 el-select → 更新 mock 数据]
```

### 场景三：复用模式

```
用户: [发送另一张截图] 这个也一样
Claude: [理解"也一样"指代上一轮的修改模式 → 应用到新截图]
```

### 场景四：生成流程图

```
用户: 帮我画一个用户注册的流程图
Claude: [生成独立 HTML 文件，使用 Mermaid.js 渲染]
```

## 许可

MIT
