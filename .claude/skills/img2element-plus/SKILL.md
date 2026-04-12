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
4. **Any `DESIGN.md` or `HW-DESIGN.md` files in the project root** — user-authored design specs that describe the target visual style. These are the highest-priority source of truth for colors, typography, spacing, and component styling. Read them FIRST and use them to override both Element Plus defaults and the `design_system.json` defaults.

If `config.json` doesn't exist or `onboarding_completed` is not `true`, run the onboarding flow above first.

**Design spec priority order**: User-provided DESIGN.md > references/design_system.json > Element Plus defaults.

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

#### Scaffold with init script (MANDATORY — saves ~2000 tokens)

Run the init script to create the project scaffold. This copies all boilerplate files (vite.config.ts, tsconfig files, main.ts, App.vue, router, env.d.ts) from `_templates/base/` so you don't need to write them:

```bash
bash .claude/skills/img2element-plus/init.sh "MMDD-设计名称" output
```

This creates the full directory structure with all config files. After scaffolding, you only need to write the **project-specific files**:

```
MMDD-设计名称/
├── (package.json, vite.config.ts, tsconfig*, index.html, src/main.ts, App.vue, router/  ← auto-generated by init.sh)
├── src/
│   ├── views/
│   │   └── MainView.vue          # YOU WRITE: Main page matching the screenshot
│   ├── components/
│   │   └── ...                    # YOU WRITE: Extracted sub-components
│   ├── styles/
│   │   └── element-overrides.css  # YOU WRITE: Element Plus theme overrides (replace placeholder)
│   └── mock/
│       └── data.ts                # YOU WRITE: Realistic mock data
```

Only include Pinia stores (`src/stores/`) if the prototype actually needs shared state management. Skip it for simple pages.

#### Design principles

1. **Fidelity first.** Match the screenshot as closely as possible. When a DESIGN.md exists, follow it as the ultimate authority. Override CSS variables in `element-overrides.css` when defaults don't match.

2. **Component decomposition.** Split the page into focused `.vue` components. A list page with search + table + dialog becomes `SearchBar.vue`, `DataTable.vue`, `EditDialog.vue`. Each component uses `<script setup lang="ts">`.

3. **Choose the right component strategy.** When the target design closely matches Element Plus defaults, use Element Plus components (`el-table`, `el-form`, `el-pagination`). When the design system is significantly different (like Huawei Cloud, Ant Design, or a custom enterprise theme), **write raw HTML/CSS** for those components and only use Element Plus for interactive primitives (dialogs, dropdowns, tooltips). See "Pitfalls & Lessons Learned" below for detailed guidance.

4. **Realistic mock data.** Generate Chinese-language mock data in `src/mock/data.ts` with realistic field names and values. Tables should show 10-15 rows, forms should have plausible default values.

5. **Functional interactivity.** All implied behavior must work: tabs switch, dialogs open/close, forms validate, steps navigate, tables sort, pagination works. Use Vue 3 reactivity — no vanilla DOM manipulation.

6. **Element Plus conventions.** Use the component API correctly:
   - Form validation with `rules` and `ref="formRef"`
   - Table columns with `prop`, `label`, `width`, `#default` slots
   - Dialog with `v-model` for visibility, `@close` handler
   - Pagination with `v-model:current-page` and `v-model:page-size`
   - Message/Notification for feedback (not `alert()`)

7. **No emoji, no watermarks.** Use Element Plus built-in icons (`<el-icon>`) or clean inline SVG. Only use emoji if the user specifically asks.

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

## Enterprise Console Layout Patterns

When replicating cloud consoles (AWS, Huawei Cloud, Alibaba Cloud, etc.) or enterprise admin panels, these layout patterns consistently appear:

### Fixed Header + Sidebar + Scrollable Content

The standard enterprise console layout. Use CSS `position: fixed` for header and sidebar, `margin` on main content:

```css
/* Header - fixed top bar */
.header-bar {
  height: 48px;
  background: #FFFFFF;
  border-bottom: 1px solid #E8E8E8;
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
}

/* Sidebar - fixed left panel */
.sidebar {
  width: 200px;
  background: #FFFFFF;
  border-right: 1px solid #E8E8E8;
  position: fixed;
  top: 48px; left: 0; bottom: 0;
  overflow-y: auto;
  z-index: 50;
}

/* Main content - scrollable */
.main-content {
  margin-top: 48px;
  margin-left: 200px;
  padding: 16px 24px;
  min-height: calc(100vh - 48px);
  background: #F5F7FA; /* gray page background */
}
```

**Pitfall**: Do NOT use flex layout for this. Flex-based layouts with fixed header/sidebar cause resize and scroll issues. The `margin` approach is simpler and more reliable.

### Console Header Bar

```vue
<header class="header-bar">
  <div class="header-left">
    <div class="header-logo"><!-- SVG logo + text --></div>
    <nav class="header-nav">
      <a v-for="item in navItems" :class="['nav-item', { active: activeNav === item.label }]">
        {{ item.label }}
      </a>
    </nav>
  </div>
  <div class="header-right">
    <div class="region-selector"><!-- Region dropdown --></div>
    <button class="icon-btn"><!-- Search icon --></button>
    <button class="icon-btn notification-btn">
      <!-- Bell icon -->
      <span class="notification-badge">3</span>
    </button>
    <div class="user-avatar"><!-- User icon/avatar --></div>
  </div>
</header>
```

Active nav tab: `color: primary; border-bottom: 2px solid primary;`. Notification badge: `position: absolute; top: 2px; right: 2px; background: red; border-radius: 50%; width: 16px; height: 16px; font-size: 10px`.

### Collapsible Sidebar Navigation

```vue
<aside class="sidebar">
  <div v-for="category in categories" :key="category.id" class="sidebar-category">
    <div class="category-header" @click="toggleCategory(category.id)">
      <span>{{ category.label }}</span>
      <svg :class="['chevron-icon', { expanded: isExpanded(category.id) }]">...</svg>
    </div>
    <div v-if="isExpanded(category.id)" class="category-items">
      <div v-for="item in category.items" :class="['sidebar-item', { active: activeItem === item.id }]">
        <span>{{ item.label }}</span>
        <span v-if="item.badge" :class="['item-badge', item.badgeType]">{{ item.badge }}</span>
      </div>
    </div>
  </div>
</aside>
```

**Key CSS**:
- Active item: `color: primary` with `::before` pseudo-element: `position: absolute; left: 0; width: 2px; background: primary`
- Category expand/collapse: `chevron-icon.expanded { transform: rotate(90deg); }`
- Use `expandedCategories: ref<string[]>([])` array to track open categories
- Badge styles: HOT = orange tint (`#FFF7E6` bg, `#FA8C16` text), NEW = blue tint (`#E6F0FF` bg, `#0066FF` text)
- Custom scrollbar: `.sidebar::-webkit-scrollbar { width: 4px; } .sidebar::-webkit-scrollbar-thumb { background: #E8E8E8; border-radius: 2px; }`

### Overview Stats Grid

```vue
<div class="overview-stats">
  <div v-for="stat in stats" :key="stat.label" class="stat-card">
    <div class="stat-value">{{ stat.value }}<span class="stat-unit">{{ stat.unit }}</span></div>
    <div class="stat-label">{{ stat.label }}</div>
    <div :class="['stat-trend', stat.trend]">
      <!-- up/down/flat SVG arrow -->
      <span>{{ stat.trendValue }}</span>
    </div>
  </div>
</div>
```

Layout: `display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px`. Each card: `background: #FFFFFF; border: 1px solid #E8E8E8; border-radius: 4px; padding: 16px; box-shadow: 0 1px 2px rgba(0,0,0,0.05)`.

### Status Badge with Tinted Background

When the design system uses custom status colors (not matching Element Plus tag types), use a statusMap with inline styles:

```ts
// In mock/data.ts
export const statusMap: Record<string, { label: string; color: string; bgColor: string }> = {
  running: { label: '运行中', color: '#52C41A', bgColor: '#F6FFED' },
  stopped: { label: '已关机', color: '#909399', bgColor: '#F4F4F5' },
  building: { label: '创建中', color: '#0066FF', bgColor: '#E6F0FF' },
  error: { label: '异常', color: '#FF4D4F', bgColor: '#FFF1F0' },
}
```

```vue
<span class="status-badge" :style="{ color: statusMap[row.status].color, backgroundColor: statusMap[row.status].bgColor }">
  {{ statusMap[row.status].label }}
</span>
```

CSS: `.status-badge { display: inline-block; padding: 2px 8px; border-radius: 2px; font-size: 12px; }`

**Why not `<el-tag>`**: `el-tag` has fixed color mappings tied to Element Plus theme. When the design spec provides exact hex colors for each status, overriding `el-tag` requires fighting against its built-in styles. Inline styles with a lookup map is cleaner and more maintainable.

### Custom Tab Bar (Not `<el-tabs>`)

When the design uses bottom-border indicator tabs (common in enterprise consoles):

```vue
<div class="content-tabs">
  <div v-for="tab in tabs" :class="['content-tab', { active: activeTab === tab.key }]" @click="activeTab = tab.key">
    {{ tab.label }}
  </div>
</div>
```

CSS: `.content-tab { padding: 12px 16px; border-bottom: 2px solid transparent; color: #666; }` / `.content-tab.active { color: primary; border-bottom-color: primary; font-weight: 500; }`

---

## Design Spec Integration (DESIGN.md)

When the project contains a `DESIGN.md`, `HW-DESIGN.md`, or similar design spec file, it takes priority over everything else. Here's how to apply it:

### Step 1: Extract CSS variable mapping

Map design spec colors to Element Plus CSS variables in `element-overrides.css`. You need BOTH `:root` variable overrides AND component-level selectors:

```css
/* :root overrides set the base theme */
:root {
  --el-color-primary: #0066FF;          /* design spec primary */
  --el-color-primary-light-3: #3385FF;  /* 30% lighter */
  --el-color-primary-light-5: #66A3FF;  /* 50% lighter */
  --el-color-primary-light-7: #99C2FF;  /* 70% lighter */
  --el-color-primary-light-8: #B3D1FF;  /* 80% lighter */
  --el-color-primary-light-9: #E6F0FF;  /* 90% lighter - used for tinted backgrounds */
  --el-color-primary-dark-2: #0052CC;   /* 20% darker - hover state */
  --el-text-color-primary: #1A1A1A;
  --el-text-color-regular: #666666;
  --el-text-color-placeholder: #999999;
  --el-border-color: #E8E8E8;
  --el-border-radius-base: 4px;
  --el-font-size-base: 13px;
  --el-bg-color-page: #F5F7FA;
}

/* Component-level overrides handle what :root can't */
.el-button--primary {
  --el-button-bg-color: #0066FF;
  --el-button-border-color: #0066FF;
  --el-button-hover-bg-color: #0052CC;  /* from design spec hover state */
  --el-button-active-bg-color: #003D99; /* from design spec active state */
}
```

### Step 2: Generate the full color scale

Element Plus requires a complete color scale for each semantic color. When the design spec provides one base color (e.g., `#0066FF`), you must generate:

| Variable | Purpose | How to derive |
|----------|---------|---------------|
| `--el-color-primary` | Base | From design spec |
| `--el-color-primary-light-3` | 30% lighter | Mix with white |
| `--el-color-primary-light-5` | 50% lighter | Mix with white |
| `--el-color-primary-light-7` | 70% lighter | Mix with white |
| `--el-color-primary-light-8` | 80% lighter | Mix with white |
| `--el-color-primary-light-9` | Tinted background (90%) | Very light version, used for selected items, focus bg |
| `--el-color-primary-dark-2` | Hover state | 20% darker than base |

Apply this pattern to ALL semantic colors: `success`, `danger`, `warning`, `info`.

### Step 3: Handle design spec specifics

Common design spec properties and their CSS mapping:

| Design Spec Property | CSS Target | Notes |
|---------------------|------------|-------|
| Primary color | `--el-color-primary` + full scale | Must generate all light variants |
| Hover state | `--el-color-primary-dark-2` | Usually 20% darker |
| Active/pressed state | `--el-button-active-bg-color` | Usually 40% darker |
| Border color | `--el-border-color` | Often `#E8E8E8` for enterprise |
| Border radius | `--el-border-radius-base` | 4px is enterprise standard |
| Page background | `--el-bg-color-page` | Often `#F5F7FA` or `#F0F2F5` |
| Table header bg | `--el-table-header-bg-color` | Often `#FAFAFA` |
| Table hover | `--el-table-row-hover-bg-color` | Often `#F0F0F0` |
| Font family | `--el-font-family` | Chinese-first: PingFang SC |
| Font size base | `--el-font-size-base` | Enterprise: 12-13px |
| Shadow card | `--el-box-shadow` | Enterprise: `0 1px 2px rgba(0,0,0,0.05)` |

---

## Pitfalls & Lessons Learned

### 1. When to bypass Element Plus components

**Rule**: If the design spec is a specific enterprise design system (Huawei Cloud, Ant Design, custom brand), write raw HTML/CSS for layout-heavy components. Only use Element Plus for interactive primitives.

| Element | Use Element Plus? | Why |
|---------|:-:|-----|
| Dialog/Modal | YES | Complex interaction, focus trap, keyboard handling |
| Dropdown/Select | YES | Accessibility, keyboard nav, search filtering |
| Tooltip/Popover | YES | Positioning logic is complex |
| Form validation | YES | Rules engine, error display |
| Message/Notification | YES | Stacking, auto-close, positioning |
| Table | SOMETIMES | If design matches EP defaults, use `el-table`. If custom borders/spacing, raw `<table>` is easier |
| Pagination | SOMETIMES | Custom pagination gives pixel control. `el-pagination` for standard layouts |
| Sidebar nav | NO | `el-menu` never matches enterprise sidebar styles. Custom is always better |
| Tab bar | NO | `el-tabs` has rigid styling. Custom div tabs with border-bottom are trivial |
| Search bar | NO | Enterprise search bars have label-above-input layout, not EP's inline form style |
| Buttons | SOMETIMES | If you override EP button colors anyway, custom buttons are cleaner |
| Status badges | NO | `el-tag` color mapping is inflexible. Use `statusMap` with inline styles |

### 2. Element Plus CSS override gotchas

**Pitfall: `--el-color-primary` alone is not enough**
Element Plus computes many derived values from the primary color. You MUST provide the full light scale (`light-3` through `light-9`) and `dark-2`. Without these, hover states, disabled states, and tinted backgrounds will use wrong colors.

**Pitfall: Buttons need component-level overrides**
Setting `--el-color-primary` does NOT fully change button colors. You must also override:
```css
.el-button--primary {
  --el-button-bg-color: #0066FF;
  --el-button-border-color: #0066FF;
  --el-button-hover-bg-color: #0052CC;
  --el-button-hover-border-color: #0052CC;
  --el-button-active-bg-color: #003D99;
  --el-button-active-border-color: #003D99;
}
```

**Pitfall: Input focus uses `box-shadow`, not `border`**
Element Plus inputs use `box-shadow: 0 0 0 1px <color> inset` for focus state, not `border-color`. To change focus color:
```css
.el-input__wrapper:hover,
.el-input__wrapper.is-focus {
  box-shadow: 0 0 0 1px #0066FF inset;
}
```

**Pitfall: Table header selector specificity**
EP table headers use `th.el-table__cell`, not just `th`. To override header background:
```css
.el-table th.el-table__cell {
  background-color: #FAFAFA;
  font-weight: 500;
  color: #666666;
}
```

### 3. Layout pitfalls

**Pitfall: Don't use flex for fixed chrome + scrollable content**
Using `display: flex` with `height: 100vh` for the entire page causes issues when the content needs independent scrolling. The `position: fixed` header/sidebar + `margin` content approach is more reliable.

**Pitfall: Sidebar needs custom scrollbar**
Long sidebar menus with many items need scrollbar styling. Without it, the browser's default thick scrollbar looks jarring:
```css
.sidebar::-webkit-scrollbar { width: 4px; }
.sidebar::-webkit-scrollbar-thumb { background: #E8E8E8; border-radius: 2px; }
```

**Pitfall: z-index layering**
Use consistent z-index layers: header (100) > sidebar (50) > dropdowns/popovers (200) > modals (1000+). If header and sidebar share the same z-index, dropdowns from the header may appear behind the sidebar.

### 4. Dependency management

**Pitfall: Don't include Pinia if you don't need it**
For single-page console prototypes with no shared state between components, skip Pinia entirely. Remove it from `main.ts` imports and `package.json` dependencies. Components use their own `ref()` and `computed()` for local state.

**Pitfall: Don't include `@element-plus/icons-vue` for custom UIs**
When building console-style prototypes with inline SVG icons, you don't need the Element Plus icon package. Only include it if you're using `<el-icon>` with EP icon components.

### 5. SVG icon best practices

For enterprise console prototypes, use inline SVGs with consistent conventions:

```vue
<!-- Standard icon pattern: viewBox="0 0 24 24", stroke-based -->
<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
  <circle cx="11" cy="11" r="8"/>
  <path d="m21 21-4.35-4.35"/>
</svg>
```

Rules:
- Use `viewBox="0 0 24 24"` for all icons (standard Feather/Lucide convention)
- Use `stroke="currentColor"` so icons inherit text color
- Use `stroke-width="2"` for consistent weight
- Set display size via `width`/`height` attributes (16px for small, 14px for inline, 12px for micro)
- Don't use `fill` on stroke-based icons (use `fill="none"`)

---

## Quality checklist

Before delivering any prototype, verify:

- [ ] Project structure is complete (package.json, vite.config.ts, src/ with all files)
- [ ] **DESIGN.md compliance**: If a design spec file exists, verify all colors, font sizes, border-radius, and spacing values match the spec exactly
- [ ] Element Plus CSS variables fully overridden (primary color + full light/dark scale, border, font, etc.)
- [ ] Component-level CSS overrides applied where needed (buttons, inputs, table headers)
- [ ] Colors match the screenshot (override CSS variables in element-overrides.css)
- [ ] Layout proportions feel right (column widths, dialog dimensions, spacing)
- [ ] All interactive elements work (tabs switch, dialogs open/close, form validation, pagination)
- [ ] Mock data is realistic and fills the UI properly
- [ ] Project can build without TypeScript errors
- [ ] No emoji anywhere (unless user specifically requested)
- [ ] Project is saved to correct directory with proper naming
- [ ] Learning log is updated
- [ ] Design system is updated if new patterns were discovered
- [ ] Pinia removed from dependencies if no shared state is needed
- [ ] SVG icons use consistent viewBox="0 0 24 24" with stroke="currentColor"

## Handling "输出设计说明"

When the user asks for design notes, output a concise list:

**页面名称 设计说明**
- 变更 1：简要描述
- 变更 2：简要描述
- Element Plus 组件：使用了哪些组件
- 项目路径：`output/MMDD-设计名称/`
- 启动方式：`cd output/MMDD-设计名称 && npm install && npm run dev`

Keep it factual and brief.
