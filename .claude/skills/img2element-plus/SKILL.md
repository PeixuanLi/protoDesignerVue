---
name: img2element-plus
description: |
  Screenshot-to-Vue prototype generator. Generates complete Vue 3 + Vite + Element Plus projects from UI screenshots, with iterative refinement and learning memory. Use this skill whenever the user provides a screenshot, mockup, wireframe, or image of any UI and wants it reproduced as a working Vue prototype — or when they want to modify an existing prototype they previously generated. Also triggers on: "照这个做原型", "参考这个图", "把这个页面画出来", "this UI needs to be prototyped", "replicate this design", "convert this mockup to Vue", "帮我出个原型", "根据截图输出页面", or any image attachment combined with requests like "输出页面", "做成页面", "帮我实现". Even if the user just sends a screenshot with a brief instruction like "加一个字段" or "这个也一样", this skill applies — it means they want you to modify or replicate the UI shown. When in doubt, if there's a UI screenshot in the conversation, use this skill.
---

# Image-to-Vue Prototype Skill

You turn UI screenshots into faithful, runnable **Vue 3 + Vite + Element Plus** prototype projects and iteratively refine them based on user feedback. Every interaction is logged, so you get better at understanding this user's style over time.

## First launch: onboarding

When this skill is used for the first time (i.e., `references/learning_log.jsonl` is empty, AND `references/config.json` has `onboarding_completed` as `false`), run through this onboarding flow before producing any prototypes.

### 1. Collect reference images

Ask the user to provide reference screenshots from their existing product or design system. The goal is to extract Element Plus theme overrides and component conventions. Ask something like:

> "为了让原型输出更贴合你的产品风格，请先提供几张你们现有系统的截图（列表页、弹窗、表单等）。我会从中提取 Element Plus 主题变量、组件风格等设计规则，之后所有原型都会自动套用。"

From the provided screenshots, extract and write to `references/design_system.json`:
- Element Plus CSS variable overrides (e.g., `--el-color-primary`, `--el-border-radius-base`)
- Component conventions (form label width, table stripe, dialog width defaults)
- Custom colors outside Element Plus defaults (sidebar bg, page background, etc.)
- Font family
- Any recurring component patterns (custom tags, step wizards, search bars, etc.)

### 2. Confirm requirements document format

Ask the user how they prefer to describe their requirements. Offer a default:

> "每次需求你想怎么描述？默认格式是这样的简要说明：
> • 截图 + 一句话说明改什么
> • 或者截图 + 字段列表（如'标题改成XX，列表字段改成：A、B、C'）
> 如果你有自己的需求文档模板也可以发给我。"

Save the chosen format to `references/config.json` under `requirements_format`.

### 3. Set project output location

Ask the user to choose a root directory for saving prototype projects:

> "原型项目保存到哪个目录？请选择一个根目录，之后所有项目会按 `根目录/MMDD-设计名称/` 的规则保存。"

Save the path to `references/config.json` under `output_root`. Default: `output` (relative to the skill's repo root).

### 4. Write initial config

After onboarding, update `references/config.json`:

```json
{
  "output_root": "output",
  "project_naming": "MMDD-设计名称",
  "requirements_format": "screenshot + brief Chinese description",
  "onboarding_completed": true,
  "tech_stack": {
    "framework": "vue3",
    "build_tool": "vite",
    "ui_library": "element-plus",
    "language": "typescript",
    "router": true,
    "state_management": "pinia"
  }
}
```

Once onboarding is done, proceed directly to the normal workflow in future sessions.

---

## Core workflow

### Step 1: Read context

Before doing anything, read these files (if they exist):

1. `references/config.json` — output directory, naming rules, tech stack, format preferences
2. `references/design_system.json` — Element Plus theme overrides, component mappings, custom colors
3. `references/learning_log.jsonl` — last 20 entries of accumulated interaction history

If `config.json` doesn't exist or `onboarding_completed` is not `true`, run the onboarding flow above first.

### Step 2: Analyze the screenshot

When the user provides a screenshot, study it carefully and extract:

- **Layout structure**: How is the page organized? (list page with search, modal/dialog, form, dashboard, tab-based, step wizard, etc.)
- **Component inventory**: What UI elements are present? Map each to an Element Plus component:
  - Tables → `<el-table>` + `<el-table-column>` + `<el-pagination>`
  - Forms → `<el-form>` + `<el-form-item>` + `<el-input>` / `<el-select>` / `<el-date-picker>`
  - Modals/Dialogs → `<el-dialog>`
  - Buttons → `<el-button>` with type/size
  - Tags → `<el-tag>` with type
  - Tabs → `<el-tabs>` + `<el-tab-pane>`
  - Steps → `<el-steps>` + `<el-step>`
  - Search bars → `<el-form :inline="true">`
  - Dropdowns → `<el-dropdown>`
  - Breadcrumbs → `<el-breadcrumb>`
  - Loading → `v-loading` directive
- **Color palette**: What Element Plus CSS variables need overriding?
- **Typography**: Font sizes, weights for headings, labels, values
- **Spacing patterns**: Padding, margins, gaps
- **Interactive behavior**: Tab switching, dialog open/close, form submission, step navigation, table sorting/filtering

Don't just glance at it — really look. Match the exact colors, spacing, and component styles using Element Plus's customization capabilities.

### Step 3: Generate the Vue project

**Output: A complete Vue 3 + Vite + Element Plus project** that runs with `npm install && npm run dev`.

**Project naming**: Follow the rule in `config.json` — default is `MMDD-设计名称`. Save to the `output_root` directory. Each prototype is a subdirectory.

**Project structure**:

```
MMDD-设计名称/
├── package.json
├── vite.config.ts
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
├── index.html
├── src/
│   ├── main.ts
│   ├── App.vue
│   ├── router/
│   │   └── index.ts
│   ├── views/
│   │   └── MainView.vue          # Main page matching the screenshot
│   ├── components/
│   │   └── ...                    # Extracted sub-components
│   ├── styles/
│   │   └── element-overrides.css  # Element Plus theme overrides
│   └── mock/
│       └── data.ts                # Realistic mock data
```

Only include Pinia stores (`src/stores/`) if the prototype actually needs shared state management. Skip it for simple pages.

#### package.json

```json
{
  "name": "prototype-MMDD-设计名称",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vue-tsc -b && vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "vue": "^3.5.13",
    "vue-router": "^4.5.0",
    "element-plus": "^2.9.0",
    "pinia": "^3.0.0"
  },
  "devDependencies": {
    "@vitejs/plugin-vue": "^5.2.0",
    "typescript": "~5.7.0",
    "vite": "^6.0.0",
    "vue-tsc": "^2.2.0"
  }
}
```

Use exact versions that are current at generation time. Only include `pinia` in dependencies if stores are actually generated.

#### vite.config.ts

```ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
})
```

#### src/main.ts

```ts
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './styles/element-overrides.css'
import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.use(ElementPlus, { locale: undefined }) // set zhCn if needed
app.mount('#app')
```

Remove pinia import if no stores are used.

#### Design principles

1. **Fidelity first.** Match the screenshot as closely as possible using Element Plus components. Override CSS variables in `element-overrides.css` when defaults don't match.

2. **Component decomposition.** Split the page into focused `.vue` components. A list page with search + table + dialog becomes `SearchBar.vue`, `DataTable.vue`, `EditDialog.vue`. Each component uses `<script setup lang="ts">`.

3. **Realistic mock data.** Generate Chinese-language mock data in `src/mock/data.ts` with realistic field names and values. Tables should show 10-15 rows, forms should have plausible default values.

4. **Functional interactivity.** All implied behavior must work: tabs switch, dialogs open/close, forms validate, steps navigate, tables sort, pagination works. Use Vue 3 reactivity — no vanilla DOM manipulation.

5. **Element Plus conventions.** Use the component API correctly:
   - Form validation with `rules` and `ref="formRef"`
   - Table columns with `prop`, `label`, `width`, `#default` slots
   - Dialog with `v-model` for visibility, `@close` handler
   - Pagination with `v-model:current-page` and `v-model:page-size`
   - Message/Notification for feedback (not `alert()`)

6. **No emoji, no watermarks.** Use Element Plus built-in icons (`<el-icon>`) or clean inline SVG. Only use emoji if the user specifically asks.

### Step 4: Handle modification requests

Users often send follow-up requests to modify prototypes. These requests tend to be brief and contextual:

- **"这个也一样"** / **"这个弹窗也是一样"** — Apply the same pattern/change from a previous prototype to this new screenshot. Understand what "一样" refers to from the conversation context.

- **"加一个XX字段"** / **"顶部显示XX"** — Add a specific field or element. Update the relevant `.vue` component and mock data.

- **"筛选框增加一个 XX"** — Add a filter to `SearchBar.vue`. Add an `<el-form-item>` to the inline form.

- **"弹窗宽一些"** — Adjust the dialog `width` prop. Consider how the wider space affects form layout.

- **"去掉XX"** / **"不要 emoji"** — Remove specific elements. Remember this preference for future prototypes.

- **"输出设计说明"** — The user wants a brief summary of the design changes made, in list form.

When modifying an existing project, use the Edit tool for targeted changes to specific `.vue` files rather than rewriting the entire project. When the modification is so extensive that the project structure changes fundamentally, use Write to replace affected files.

### Step 5: Update the learning log

After completing each prototype or modification, append a log entry to `references/learning_log.jsonl`. Each entry is a single JSON line:

```json
{"timestamp": "2026-04-08T14:30:00Z", "action": "create|modify", "project": "0408-模型类型配置", "screenshot_description": "Brief description of the UI", "changes": "What you created or modified", "vue_components_used": ["ElTable", "ElForm", "ElDialog", "ElPagination"], "element_plus_patterns": ["inline-form-search", "pagination-table", "dialog-form-crud"], "user_instruction_style": "How the user communicated", "user_preferences_learned": ["preference discovered"], "mock_data_structure": {"main_table": ["columns used"]}}
```

**What to capture**:
- `timestamp`: When this interaction happened
- `action`: "create" for new projects, "modify" for changes
- `project`: The project directory name
- `screenshot_description`: Brief description of what the screenshot showed
- `changes`: What you did
- `vue_components_used`: Element Plus components used
- `element_plus_patterns`: Reusable patterns applied
- `user_instruction_style`: How the user communicated
- `user_preferences_learned`: New preferences discovered
- `mock_data_structure`: Key fields in mock data

This log is append-only — never overwrite it.

---

## Design system reference

Maintain a living reference in `references/design_system.json`. Update it whenever you discover new patterns. Structure:

```json
{
  "element_plus_theme": {
    "--el-color-primary": "#409eff",
    "--el-color-success": "#67c23a",
    "--el-color-danger": "#f56c6c",
    "--el-color-warning": "#e6a23c",
    "--el-color-info": "#909399",
    "--el-border-radius-base": "4px",
    "--el-font-size-base": "14px",
    "--el-component-size": "36px"
  },
  "component_mappings": {
    "status_tags": { "type_a": "success", "type_b": "danger", "type_c": "warning" },
    "form_label_width": "110px",
    "dialog_default_width": "50%",
    "table_stripe": true,
    "pagination_layout": "total, sizes, prev, pager, next, jumper"
  },
  "custom_colors": {
    "background": "#f0f2f5",
    "sidebar_bg": "#304156",
    "text_primary": "#303133",
    "text_regular": "#606266"
  },
  "font_family": "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Microsoft YaHei', sans-serif"
}
```

Read this file at the start of each session. If it doesn't exist, create it from the first prototype.

---

## Common patterns

These patterns recur across prototypes. When you see them in a screenshot, reproduce them:

### README / Markdown content rendering

For package detail pages, documentation pages, or any page showing rendered markdown:

```vue
<!-- Code block with copy button -->
<div class="codeblock">
  <div class="codeblock__header">
    <span class="codeblock__lang">typescript</span>
    <button class="codeblock__copy" @click="copyCode('...')">Copy SVG icon</button>
  </div>
  <pre><code>...</code></pre>
</div>

<!-- Note / Callout block -->
<div class="note">
  <div class="note__icon">Info SVG</div>
  <div class="note__content">
    <strong>Note</strong>
    <p>Message text</p>
  </div>
</div>

<!-- Shields.io style badges -->
<span class="badge">
  <span class="badge__label">npm</span>
  <span class="badge__value">v1.0.0</span>
</span>

<!-- Markdown table -->
<div class="table-wrap">
  <table>
    <thead><tr><th>Col</th></tr></thead>
    <tbody><tr><td>Value</td></tr></tbody>
  </table>
</div>
```

**CSS for code blocks**: Use `background: #f6f8fa`, `border: 1px solid #d0d7de`, monospace font. Syntax highlighting via CSS classes: `.hl-kw` (red, keywords), `.hl-str` (blue, strings), `.hl-cmt` (gray, comments), `.hl-fn` (purple, functions), `.hl-num` (blue, numbers).

**CSS for note blocks**: `border-left: 4px solid #0969da`, light blue background. Tip variant uses green border + green background.

**CSS for badges**: Two-tone inline-flex, left half darker (`background: #555`), right half colored per type. Rounded `3px`, `height: 22px`, `font-size: 11px`.

### Sidebar with install tabs

```vue
<div class="install-box">
  <div class="install-tabs">
    <button v-for="tab in ['npm', 'yarn', 'pnpm']" :class="{ active: activeTab === tab }">{{ tab }}</button>
  </div>
  <div class="install-row">
    <code>{{ commands[activeTab] }}</code>
    <button @click="copy">Copy icon</button>
  </div>
</div>
```

Active tab: white bg + colored bottom border. Inactive: light gray bg. Install box has `border: 1px solid #e0e0e0`, rounded `6px`.

### Sparkline chart

```vue
<svg viewBox="0 0 100 100" preserveAspectRatio="none" style="width:100px; height:36px">
  <polyline :points="chartPoints" fill="none" stroke="#118c55" stroke-width="2.5" />
</svg>
```

Compute points from data: `data.map((v, i) => ${(i/(len-1))*100},${100-(v/max)*100}).join(' ')`.

---

## Common Element Plus-specific patterns

When using Element Plus components:

### Status / category tags
```vue
<el-tag :type="tagType">{{ label }}</el-tag>
```
Map categories to Element Plus tag types: `success` (green), `danger` (red), `warning` (orange), `info` (gray), `primary` (blue, default).

### List page with search + table + pagination
```vue
<!-- SearchBar.vue -->
<el-form :inline="true" :model="searchForm">
  <el-form-item label="名称">
    <el-input v-model="searchForm.name" placeholder="请输入" clearable />
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="handleSearch">查询</el-button>
    <el-button @click="handleReset">重置</el-button>
  </el-form-item>
</el-form>

<!-- DataTable.vue -->
<el-table :data="tableData" stripe border>
  <el-table-column prop="name" label="名称" />
  <el-table-column prop="status" label="状态">
    <template #default="{ row }">
      <el-tag :type="row.status ? 'success' : 'info'">{{ row.status ? '启用' : '禁用' }}</el-tag>
    </template>
  </el-table-column>
  <el-table-column label="操作" width="200">
    <template #default="{ row }">
      <el-button link type="primary" @click="handleEdit(row)">编辑</el-button>
      <el-button link type="danger" @click="handleDelete(row)">删除</el-button>
    </template>
  </el-table-column>
</el-table>
<el-pagination
  v-model:current-page="page.current"
  v-model:page-size="page.size"
  :total="page.total"
  :page-sizes="[10, 20, 50]"
  layout="total, sizes, prev, pager, next, jumper"
  @change="fetchData"
/>
```

### Dialog with form (CRUD)
```vue
<el-dialog v-model="dialogVisible" :title="dialogTitle" width="50%" @close="resetForm">
  <el-form ref="formRef" :model="form" :rules="rules" label-width="110px">
    <el-form-item label="名称" prop="name">
      <el-input v-model="form.name" />
    </el-form-item>
  </el-form>
  <template #footer>
    <el-button @click="dialogVisible = false">取消</el-button>
    <el-button type="primary" @click="handleSubmit">确定</el-button>
  </template>
</el-dialog>
```

### Step wizard
```vue
<el-steps :active="activeStep" finish-status="success">
  <el-step title="基本信息" />
  <el-step title="配置参数" />
  <el-step title="确认提交" />
</el-steps>
<div v-show="activeStep === 0"><!-- Step 1 form --></div>
<div v-show="activeStep === 1"><!-- Step 2 form --></div>
<div v-show="activeStep === 2"><!-- Step 3 summary --></div>
<el-button v-if="activeStep > 0" @click="activeStep--">上一步</el-button>
<el-button v-if="activeStep < 2" type="primary" @click="activeStep++">下一步</el-button>
<el-button v-if="activeStep === 2" type="success" @click="handleSubmit">提交</el-button>
```

### Two-column form layout
```vue
<el-form :model="form" label-width="110px">
  <el-row :gutter="20">
    <el-col :span="12">
      <el-form-item label="字段A" prop="fieldA">
        <el-input v-model="form.fieldA" />
      </el-form-item>
    </el-col>
    <el-col :span="12">
      <el-form-item label="字段B" prop="fieldB">
        <el-select v-model="form.fieldB" style="width: 100%">
          <el-option label="选项1" value="1" />
        </el-select>
      </el-form-item>
    </el-col>
  </el-row>
</el-form>
```

### Tabs with content panels
```vue
<el-tabs v-model="activeTab">
  <el-tab-pane label="基本信息" name="basic">
    <!-- Basic info content -->
  </el-tab-pane>
  <el-tab-pane label="配置参数" name="config">
    <!-- Config content -->
  </el-tab-pane>
</el-tabs>
```

### Message feedback
```ts
import { ElMessage, ElMessageBox } from 'element-plus'

// Success toast
ElMessage.success('操作成功')

// Confirm dialog
await ElMessageBox.confirm('确定删除该条记录？', '提示', {
  confirmButtonText: '确定',
  cancelButtonText: '取消',
  type: 'warning',
})
```

---

## Flowchart / Mermaid diagrams

When the user describes a process flow and asks for a flowchart, generate a standalone HTML file that loads Mermaid.js from CDN. This remains a single HTML file (not a Vue project) since flowcharts are standalone visual artifacts.

Save as `output_root/MMDD-流程名称-flowchart.html`.

### Default style: Notion-style black & white

Unless the user asks for a specific color scheme, use a clean Notion-inspired monochrome style:

- **Background**: pure white `#fff`
- **Main nodes**: white fill, `#37352f` dark border (2px), `#37352f` text, rounded corners `rx:4`
- **Sub-nodes**: light gray fill `#f7f6f3`, gray border `#e3e2de` (1px)
- **Terminal node**: dark fill `#37352f`, white text
- **Lines**: light gray `#d3d1cb`, 1.5px
- **Font**: system font stack, 14px

**Mermaid themeVariables:**
```js
{
  theme: 'base',
  themeVariables: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "PingFang SC", "Microsoft YaHei", sans-serif',
    fontSize: '14px',
    lineColor: '#d3d1cb',
    primaryColor: '#fff',
    primaryTextColor: '#37352f',
    primaryBorderColor: '#37352f',
    secondaryColor: '#f7f6f3',
    tertiaryColor: '#f7f6f3'
  }
}
```

Use Unicode circled numbers (①②③...) via `&#9312;` through `&#9326;` for main flow nodes.

---

## Quality checklist

Before delivering any prototype, verify:

- [ ] Project structure is complete (package.json, vite.config.ts, src/ with all files)
- [ ] Element Plus components render correctly with proper props and events
- [ ] Colors match the screenshot (override CSS variables in element-overrides.css)
- [ ] Layout proportions feel right (column widths, dialog dimensions, spacing)
- [ ] All interactive elements work (tabs switch, dialogs open/close, form validation, pagination)
- [ ] Mock data is realistic and fills the UI properly
- [ ] Project can build without TypeScript errors
- [ ] No emoji anywhere (unless user specifically requested)
- [ ] Project is saved to correct directory with proper naming
- [ ] Learning log is updated
- [ ] Design system is updated if new patterns were discovered

## Handling "输出设计说明"

When the user asks for design notes, output a concise list:

**页面名称 设计说明**
- 变更 1：简要描述
- 变更 2：简要描述
- Element Plus 组件：使用了哪些组件
- 项目路径：`output/MMDD-设计名称/`
- 启动方式：`cd output/MMDD-设计名称 && npm install && npm run dev`

Keep it factual and brief.
