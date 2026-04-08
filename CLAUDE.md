# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Purpose

This is a **Claude Code skills repository** — a curated collection of skills for frontend prototyping and Vue.js development. It is NOT a buildable application. There is no `package.json`, no build step, and no source code to compile.

## Structure

- `.claude/skills/` — All installed skills, each with a `SKILL.md` and optional `references/` directory
- `skills-lock.json` — Pins skill versions and sources (similar to a lockfile)
- The primary custom skill is `img2element-plus/`
- `output/` — Generated prototype projects

## Installed Skills

Skills are sourced from GitHub repos and locked in `skills-lock.json`:

- **antfu** (`antfu/skills`) — Vite, Vue, Pinia, Vitest, Vue best practices, Vue Router, VueUse, web design guidelines
- **element-plus-vue3** (`partme-ai/full-stack-skills`) — Element Plus component library for Vue 3
- **img2element-plus** (local) — Screenshot-to-Vue prototype generator (Vue 3 + Vite + Element Plus)

## The `img2element-plus` Skill

This is the main custom skill. It converts UI screenshots into complete **Vue 3 + Vite + Element Plus** projects with iterative refinement and learning memory. Generated projects are runnable with `npm install && npm run dev`.

**Key data files** (in `.claude/skills/img2element-plus/references/`):
- `config.json` — Output directory, project naming rules, tech stack config, onboarding status
- `design_system.json` — Element Plus theme overrides (CSS variables), component mappings, custom colors
- `learning_log.jsonl` — Append-only interaction history for improving future output

**Workflow**: Read context → Analyze screenshot → Generate Vue project scaffold → Handle modifications → Update learning log

**Output format**: Complete Vue 3 + Vite + Element Plus projects saved as `output/MMDD-设计名称/` directories. Each project includes package.json, vite.config.ts, views, components, mock data, and Element Plus theme overrides. Flowcharts remain as standalone HTML files with Mermaid.js.

## Modifying Skills

Each skill is a `SKILL.md` (frontmatter + markdown instructions) plus optional `references/` files. To update a skill, edit its `SKILL.md` or add/modify reference files. To add a new skill, create a directory under `.claude/skills/` with a `SKILL.md`.
