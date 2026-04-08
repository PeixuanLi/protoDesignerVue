<script setup lang="ts">
import { packageData, pgVersions, apiOptions } from '@/mock/data'
import { ref } from 'vue'
import { ElMessage } from 'element-plus'

const copied = ref(false)

function copyCode(text: string) {
  navigator.clipboard.writeText(text)
  copied.value = true
  ElMessage.success('Copied!')
  setTimeout(() => { copied.value = false }, 2000)
}
</script>

<template>
  <div class="readme">
    <!-- Hero -->
    <div class="readme-hero">
      <div class="readme-hero__bg">
        <!-- Repeating hexagon + elephant pattern -->
        <div v-for="i in 12" :key="i" class="readme-hero__hex" :style="{
          left: `${(i % 6) * 17 + (Math.floor(i / 6) * 8)}%`,
          top: `${Math.floor(i / 6) * 40 + 10}%`,
          opacity: 0.04 + (i % 3) * 0.02,
          transform: `rotate(${i * 15}deg) scale(${0.6 + (i % 3) * 0.3})`
        }">
          <svg width="60" height="52" viewBox="0 0 60 52"><polygon points="30,1 58,14 58,38 30,51 2,38 2,14" fill="#8064a9"/></svg>
        </div>
      </div>
      <div class="readme-hero__content">
        <div class="readme-hero__text">
          <h2 class="readme-hero__title">Embedded Postgres</h2>
          <p class="readme-hero__subtitle">Launch Postgres clusters, straight from NodeJS.</p>
        </div>
        <div class="readme-hero__icon">
          <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
            <polygon points="50,5 93,27 93,73 50,95 7,73 7,27" fill="#8064a9" fill-opacity="0.12" stroke="#8064a9" stroke-width="1"/>
            <polygon points="50,15 83,33 83,67 50,85 17,67 17,33" fill="#8064a9" fill-opacity="0.08"/>
            <text x="50" y="62" text-anchor="middle" font-size="38" fill="#8064a9" font-weight="bold">PG</text>
          </svg>
        </div>
      </div>
    </div>

    <!-- Badges -->
    <div class="readme-badges">
      <span class="readme-badge readme-badge--npm"><span class="readme-badge__label">npm</span><span class="readme-badge__value">v{{ packageData.version }}</span></span>
      <span class="readme-badge readme-badge--types"><span class="readme-badge__label">types</span><span class="readme-badge__value">TypeScript</span></span>
      <span class="readme-badge readme-badge--downloads"><span class="readme-badge__label">downloads</span><span class="readme-badge__value">477k/year</span></span>
      <span class="readme-badge readme-badge--license"><span class="readme-badge__label">license</span><span class="readme-badge__value">MIT</span></span>
      <span class="readme-badge readme-badge--build"><span class="readme-badge__label">build</span><span class="readme-badge__value">passing</span></span>
    </div>

    <!-- Description -->
    <p class="readme-description">{{ packageData.description }}</p>

    <!-- Installation -->
    <section class="readme-section">
      <h2 class="readme-h2">Installation</h2>
      <p><code class="readme-inline-code">embedded-postgres</code> is available from NPM:</p>
      <div class="readme-codeblock">
        <div class="readme-codeblock__header">
          <span class="readme-codeblock__lang">bash</span>
          <button class="readme-codeblock__copy" @click="copyCode('npm i embedded-postgres')">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <rect x="5" y="5" width="9" height="9" rx="1.5" stroke="currentColor" stroke-width="1.2"/>
              <path d="M3 11V3a1 1 0 011-1h8" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/>
            </svg>
          </button>
        </div>
        <pre><code>npm i embedded-postgres</code></pre>
      </div>
      <div class="readme-note">
        <div class="readme-note__icon">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="8" r="7" stroke="currentColor" stroke-width="1.5"/>
            <path d="M8 7v4M8 5v1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
          </svg>
        </div>
        <div class="readme-note__content">
          <strong>Note</strong>
          <p>Embedded Postgres requires post-install scripts to function. If you have those disabled (such as when using PNPM), please approve build scripts manually (in this case by running <code class="readme-inline-code">pnpm approve-builds</code>)</p>
          <p class="readme-note__extra">We require a post-install script to generate symlinks that Postgres requires for operation. This is necessary since NPM doesn't support symlinks in their tarballs.</p>
        </div>
      </div>
    </section>

    <!-- Usage -->
    <section class="readme-section">
      <h2 class="readme-h2">Usage</h2>
      <p>This package contains a simple API that allows you to create clusters, start them, create / delete database and stop any existing processes.</p>
      <div class="readme-codeblock">
        <div class="readme-codeblock__header">
          <span class="readme-codeblock__lang">typescript</span>
          <button class="readme-codeblock__copy" @click="copyCode('import EmbeddedPostgres from ...')">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <rect x="5" y="5" width="9" height="9" rx="1.5" stroke="currentColor" stroke-width="1.2"/>
              <path d="M3 11V3a1 1 0 011-1h8" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/>
            </svg>
          </button>
        </div>
        <pre><code><span class="hl-kw">import</span> EmbeddedPostgres <span class="hl-kw">from</span> <span class="hl-str">'embedded-postgres'</span>;

<span class="hl-kw">async function</span> <span class="hl-fn">main</span>() {
  <span class="hl-cmt">// Create the object</span>
  <span class="hl-kw">const</span> pg = <span class="hl-kw">new</span> <span class="hl-fn">EmbeddedPostgres</span>({
    databaseDir: <span class="hl-str">'./data/db'</span>,
    user: <span class="hl-str">'postgres'</span>,
    password: <span class="hl-str">'password'</span>,
    port: <span class="hl-num">5432</span>,
    persistent: <span class="hl-kw">true</span>,
  });

  <span class="hl-cmt">// Create the cluster config files</span>
  <span class="hl-kw">await</span> pg.<span class="hl-fn">initialise</span>();

  <span class="hl-cmt">// Start the server</span>
  <span class="hl-kw">await</span> pg.<span class="hl-fn">start</span>();

  <span class="hl-cmt">// Create and/or drop database</span>
  <span class="hl-kw">await</span> pg.<span class="hl-fn">createDatabase</span>(<span class="hl-str">'TEST'</span>);
  <span class="hl-kw">await</span> pg.<span class="hl-fn">dropDatabase</span>(<span class="hl-str">'TEST'</span>);

  <span class="hl-cmt">// Initialize a node-postgres client</span>
  <span class="hl-kw">const</span> client = pg.<span class="hl-fn">getPgClient</span>();
  <span class="hl-kw">await</span> client.<span class="hl-fn">connect</span>();
  <span class="hl-kw">const</span> result = <span class="hl-kw">await</span> client.<span class="hl-fn">query</span>(<span class="hl-str">'SELECT datname FROM pg_database'</span>);

  <span class="hl-cmt">// Stop the server</span>
  <span class="hl-kw">await</span> pg.<span class="hl-fn">stop</span>();
}

<span class="hl-fn">main</span>();</code></pre>
      </div>
    </section>

    <!-- PostgreSQL Versions -->
    <section class="readme-section">
      <h2 class="readme-h2">PostgreSQL Versions</h2>
      <p>This package aims to track the PostgreSQL support policy for supported versions. Additionally, we track the binaries that are created upstream in zonky's embedded-postgres-binaries.</p>
      <div class="readme-table-wrap">
        <table class="readme-table">
          <thead>
            <tr>
              <th>Platform / Architecture</th>
              <th>12.20.0</th>
              <th>13.16.0</th>
              <th>14.13.0</th>
              <th>15.8.0</th>
              <th>16.4.0</th>
              <th>17.0.0</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in pgVersions" :key="row.platform">
              <td>{{ row.platform }}</td>
              <td v-for="ver in [row.v12, row.v13, row.v14, row.v15, row.v16, row.v17]" :key="String(ver)">
                <span v-if="ver" class="readme-check">&#10003;</span>
                <span v-else class="readme-cross">&#10007;</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>In order to install a particular version, look for the latest tag in NPM. For example, if you would like to install <code class="readme-inline-code">v10.20.0</code>, you can currently use the following tag:</p>
      <div class="readme-codeblock">
        <div class="readme-codeblock__header">
          <span class="readme-codeblock__lang">bash</span>
          <button class="readme-codeblock__copy" @click="copyCode('npm i embedded-postgres@10.20.0-beta.6')">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <rect x="5" y="5" width="9" height="9" rx="1.5" stroke="currentColor" stroke-width="1.2"/>
              <path d="M3 11V3a1 1 0 011-1h8" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/>
            </svg>
          </button>
        </div>
        <pre><code>npm i embedded-postgres@10.20.0-beta.6</code></pre>
      </div>
    </section>

    <!-- API -->
    <section class="readme-section">
      <h2 class="readme-h2">API</h2>
      <p>Options in the constructor can be used to modify the behaviour of the application. The parameters that are available as part of the options can be seen here:</p>
      <div class="readme-table-wrap">
        <table class="readme-table">
          <thead>
            <tr>
              <th>Property</th>
              <th>Type</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="opt in apiOptions" :key="opt.property">
              <td><code class="readme-inline-code">{{ opt.property }}</code></td>
              <td><code class="readme-inline-code">{{ opt.type }}</code></td>
              <td>{{ opt.description }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- Contributing -->
    <section class="readme-section">
      <h2 class="readme-h2">Contributing</h2>
      <p>This package is open to issues, feedback, ideas and pull requests. Create an issue on this repository to get started! In order to get started with development, you might need some extra pointers.</p>

      <h3 class="readme-h3">Development</h3>
      <p>In order to get yourself situated for development, you will need to get the repository up and running. Start with a relatively recent install of NodeJS (at least v18, v20+ recommended). You can then run this command to install all packages:</p>
      <div class="readme-codeblock">
        <div class="readme-codeblock__header">
          <span class="readme-codeblock__lang">bash</span>
          <button class="readme-codeblock__copy" @click="copyCode('npm install --force')">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <rect x="5" y="5" width="9" height="9" rx="1.5" stroke="currentColor" stroke-width="1.2"/>
              <path d="M3 11V3a1 1 0 011-1h8" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/>
            </svg>
          </button>
        </div>
        <pre><code>npm install --force</code></pre>
      </div>
      <div class="readme-note readme-note--tip">
        <div class="readme-note__icon">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="8" r="7" stroke="currentColor" stroke-width="1.5"/>
            <path d="M8 7v4M8 5v1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
          </svg>
        </div>
        <div class="readme-note__content">
          <strong>Note</strong>
          <p>You must include <code class="readme-inline-code">--force</code> or else NPM will refuse to install the dependencies for all packages, including those not for the current architecture.</p>
        </div>
      </div>
      <p>Then, you must pre-compile all TypeScript using the following command:</p>
      <div class="readme-codeblock">
        <div class="readme-codeblock__header">
          <span class="readme-codeblock__lang">bash</span>
          <button class="readme-codeblock__copy" @click="copyCode('npm run build')">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <rect x="5" y="5" width="9" height="9" rx="1.5" stroke="currentColor" stroke-width="1.2"/>
              <path d="M3 11V3a1 1 0 011-1h8" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/>
            </svg>
          </button>
        </div>
        <pre><code>npm run build</code></pre>
      </div>
    </section>

    <!-- Troubleshooting -->
    <section class="readme-section">
      <h2 class="readme-h2">Troubleshooting</h2>
      <h3 class="readme-h3">Running in Docker containers</h3>
      <p>Running in Docker containers might fail, because many are setup to run with the root user as default. Either you resolve to setting up a container with a specific user yourself, or you set the <code class="readme-inline-code">createPostgresUser</code> option to true, after which embedded-postgres will automatically set up a postgres user on the system for usage by your script.</p>
    </section>

    <!-- Credits -->
    <section class="readme-section">
      <h2 class="readme-h2">Credits and Licensing</h2>
      <p>Embedded Postgres was created by Lei Nelissen for BMD Studio. It is based on zonky's embedded-postgres-binaries. The binaries are made available under the Apache License 2.0, whereas the specific code in this package is made available under the MIT license.</p>
    </section>
  </div>
</template>

<style scoped>
.readme {
  padding: 24px 0 48px;
  font-size: 16px;
  line-height: 1.6;
  color: #24292f;
}

.readme p {
  margin: 0 0 16px;
}

/* Hero */
.readme-hero {
  position: relative;
  background: linear-gradient(135deg, #f6f0ff 0%, #eee8ff 40%, #f0f4ff 60%, #fff5f0 100%);
  border-radius: 8px;
  padding: 48px 40px;
  margin-bottom: 24px;
  overflow: hidden;
  border: 1px solid #e8e0f0;
}

.readme-hero__bg {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.readme-hero__hex {
  position: absolute;
  pointer-events: none;
}

.readme-hero__content {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.readme-hero__title {
  font-size: 36px;
  font-weight: 700;
  color: #1b1f23;
  margin: 0 0 8px;
}

.readme-hero__subtitle {
  font-size: 18px;
  color: #57606a;
  margin: 0;
}

.readme-hero__icon {
  opacity: 0.9;
}

/* Badges */
.readme-badges {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 20px;
}

.readme-badge {
  display: inline-flex;
  align-items: center;
  border-radius: 3px;
  overflow: hidden;
  font-size: 11px;
  height: 22px;
  line-height: 1;
}

.readme-badge__label {
  padding: 0 6px;
  background: #555;
  color: #fff;
  font-weight: 600;
  height: 100%;
  display: flex;
  align-items: center;
}

.readme-badge__value {
  padding: 0 6px;
  background: #4c1;
  color: #fff;
  font-weight: 600;
  height: 100%;
  display: flex;
  align-items: center;
}

.readme-badge--npm .readme-badge__value { background: #cb3837; }
.readme-badge--npm .readme-badge__label { background: #555; }
.readme-badge--types .readme-badge__value { background: #3178c6; }
.readme-badge--types .readme-badge__label { background: #555; }
.readme-badge--downloads .readme-badge__value { background: #97ca00; }
.readme-badge--downloads .readme-badge__label { background: #555; }
.readme-badge--license .readme-badge__value { background: #6e7781; }
.readme-badge--license .readme-badge__label { background: #555; }
.readme-badge--build .readme-badge__value { background: #18b300; }
.readme-badge--build .readme-badge__label { background: #555; }

.readme-description {
  font-size: 16px;
  color: #24292f;
  margin-bottom: 28px;
}

/* Sections */
.readme-section {
  margin-bottom: 32px;
}

.readme-h2 {
  font-size: 24px;
  font-weight: 600;
  color: #1b1f23;
  margin: 0 0 16px;
  padding-bottom: 8px;
  border-bottom: 1px solid #d0d7de;
}

.readme-h3 {
  font-size: 20px;
  font-weight: 600;
  color: #1b1f23;
  margin: 24px 0 12px;
}

/* Inline code */
.readme-inline-code {
  background: #eff1f3;
  padding: 2px 6px;
  border-radius: 4px;
  font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;
  font-size: 85%;
  color: #24292f;
}

/* Code blocks */
.readme-codeblock {
  border: 1px solid #d0d7de;
  border-radius: 6px;
  overflow: hidden;
  margin: 0 0 16px;
  background: #f6f8fa;
}

.readme-codeblock__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  background: #f6f8fa;
  border-bottom: 1px solid #d0d7de;
}

.readme-codeblock__lang {
  font-size: 12px;
  color: #666;
  font-weight: 500;
}

.readme-codeblock__copy {
  background: none;
  border: none;
  color: #666;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  display: flex;
  transition: all 0.15s;
}

.readme-codeblock__copy:hover {
  color: #24292f;
  background: #e0e0e0;
}

.readme-codeblock pre {
  margin: 0;
  padding: 14px 16px;
  overflow-x: auto;
  background: #f6f8fa;
}

.readme-codeblock code {
  font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;
  font-size: 13px;
  line-height: 1.5;
  color: #24292f;
}

/* Syntax highlights */
.hl-kw { color: #cf222e; }
.hl-str { color: #0a3069; }
.hl-cmt { color: #6e7781; }
.hl-fn { color: #8250df; }
.hl-num { color: #0550ae; }

/* Note / Callout */
.readme-note {
  display: flex;
  gap: 12px;
  padding: 16px;
  border: 1px solid #d0d7de;
  border-left: 4px solid #0969da;
  border-radius: 6px;
  margin: 0 0 16px;
  background: #ddf4ff;
}

.readme-note--tip {
  border-left-color: #1a7f37;
  background: #dafbe1;
}

.readme-note__icon {
  flex-shrink: 0;
  color: #0969da;
  margin-top: 2px;
}

.readme-note--tip .readme-note__icon {
  color: #1a7f37;
}

.readme-note__content {
  flex: 1;
  min-width: 0;
}

.readme-note__content strong {
  color: #24292f;
  margin-bottom: 4px;
  display: block;
}

.readme-note__content p {
  margin: 4px 0 0;
  font-size: 14px;
  line-height: 1.5;
}

.readme-note__extra {
  margin-top: 8px !important;
  padding-top: 8px;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  font-size: 13px !important;
  color: #57606a;
}

/* Tables */
.readme-table-wrap {
  overflow-x: auto;
  margin: 0 0 16px;
  border: 1px solid #d0d7de;
  border-radius: 6px;
}

.readme-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
}

.readme-table th {
  background: #f6f8fa;
  padding: 10px 14px;
  text-align: left;
  font-weight: 600;
  color: #24292f;
  border-bottom: 2px solid #d0d7de;
  white-space: nowrap;
}

.readme-table td {
  padding: 8px 14px;
  border-bottom: 1px solid #d0d7de;
  color: #57606a;
  vertical-align: middle;
}

.readme-table tr:last-child td {
  border-bottom: none;
}

.readme-table tr:hover td {
  background: #f6f8fa;
}

.readme-check {
  color: #1a7f37;
  font-weight: 700;
}

.readme-cross {
  color: #cf222e;
  font-weight: 700;
}
</style>
