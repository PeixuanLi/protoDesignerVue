<script setup lang="ts">
import { ref } from 'vue'
import { packageData, weeklyDownloadData, collaborators } from '@/mock/data'
import { ElMessage } from 'element-plus'

const activeInstallTab = ref('npm')
const copied = ref(false)

const installCommands: Record<string, string> = {
  npm: `npm i ${packageData.name}`,
  yarn: `yarn add ${packageData.name}`,
  pnpm: `pnpm add ${packageData.name}`,
}

function copyInstall() {
  navigator.clipboard.writeText(installCommands[activeInstallTab.value])
  copied.value = true
  ElMessage.success('Copied to clipboard!')
  setTimeout(() => { copied.value = false }, 2000)
}

const maxDownload = Math.max(...weeklyDownloadData)
const chartPoints = weeklyDownloadData
  .slice(-20)
  .map((v, i) => {
    const x = (i / 19) * 100
    const y = 100 - (v / maxDownload) * 100
    return `${x},${y}`
  })
  .join(' ')
</script>

<template>
  <aside class="sidebar">
    <!-- Install -->
    <div class="sidebar__section">
      <h4 class="sidebar__heading">Install</h4>
      <div class="sidebar__install-box">
        <div class="sidebar__install-tabs">
          <button
            v-for="(_, tab) in installCommands"
            :key="tab"
            :class="['sidebar__install-tab', { 'sidebar__install-tab--active': activeInstallTab === tab }]"
            @click="activeInstallTab = tab"
          >{{ tab }}</button>
        </div>
        <div class="sidebar__install-row">
          <code class="sidebar__install-cmd">{{ installCommands[activeInstallTab] }}</code>
          <button class="sidebar__copy-btn" @click="copyInstall">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <rect x="5" y="5" width="9" height="9" rx="1.5" stroke="currentColor" stroke-width="1.2"/>
              <path d="M3 11V3a1 1 0 011-1h8" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/>
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Repository -->
    <div class="sidebar__section">
      <h4 class="sidebar__heading">Repository</h4>
      <a href="#" class="sidebar__link">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M8 1C4.13 1 1 4.13 1 8c0 3.1 2 5.7 4.8 6.6.35.07.48-.15.48-.34v-1.2c-1.95.42-2.37-.94-2.37-.94-.32-.81-.78-1.03-.78-1.03-.64-.44.05-.43.05-.43.7.05 1.07.72 1.07.72.63 1.07 1.65.76 2.05.58.06-.45.24-.76.44-.94-1.56-.18-3.2-.78-3.2-3.47 0-.77.27-1.4.72-1.89-.07-.18-.31-.9.07-1.87 0 0 .59-.19 1.93.72a6.7 6.7 0 013.5 0c1.34-.91 1.93-.72 1.93-.72.38.97.14 1.69.07 1.87.45.49.72 1.12.72 1.89 0 2.7-1.64 3.29-3.21 3.46.25.22.48.65.48 1.31v1.94c0 .19.13.41.48.34C13 13.7 15 11.1 15 8c0-3.87-3.13-7-7-7z" fill="currentColor"/>
        </svg>
        {{ packageData.repository }}
      </a>
    </div>

    <!-- Homepage -->
    <div class="sidebar__section">
      <h4 class="sidebar__heading">Homepage</h4>
      <a href="#" class="sidebar__link">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M6 2a7 7 0 11-1.8 3.4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
          <path d="M1 6l3.5.4L5 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        {{ packageData.homepage }}
      </a>
    </div>

    <!-- Weekly Downloads -->
    <div class="sidebar__section">
      <h4 class="sidebar__heading">Weekly Downloads</h4>
      <div class="sidebar__stats-row">
        <span class="sidebar__stats-number">{{ packageData.weeklyDownloads.toLocaleString() }}</span>
        <svg class="sidebar__sparkline" viewBox="0 0 100 100" preserveAspectRatio="none">
          <polyline
            :points="chartPoints"
            fill="none"
            stroke="#118c55"
            stroke-width="2.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
    </div>

    <div class="sidebar__divider"></div>

    <!-- Meta stats -->
    <div class="sidebar__section">
      <div class="sidebar__stat-item">
        <span class="sidebar__stat-label">Version</span>
        <a href="#" class="sidebar__stat-value sidebar__stat-value--link">{{ packageData.version }}</a>
      </div>
      <div class="sidebar__stat-item">
        <span class="sidebar__stat-label">License</span>
        <span class="sidebar__stat-value">{{ packageData.license }}</span>
      </div>
      <div class="sidebar__stat-item">
        <span class="sidebar__stat-label">Unpacked Size</span>
        <span class="sidebar__stat-value">{{ packageData.unpackedSize }}</span>
      </div>
      <div class="sidebar__stat-item">
        <span class="sidebar__stat-label">Total Files</span>
        <span class="sidebar__stat-value">{{ packageData.totalFiles }}</span>
      </div>
      <div class="sidebar__stat-item">
        <span class="sidebar__stat-label">Last publish</span>
        <span class="sidebar__stat-value">{{ packageData.lastPublish }}</span>
      </div>
    </div>

    <div class="sidebar__divider"></div>

    <!-- Collaborators -->
    <div class="sidebar__section">
      <h4 class="sidebar__heading">Collaborators</h4>
      <div class="sidebar__collaborators">
        <div
          v-for="collab in collaborators"
          :key="collab.name"
          class="sidebar__avatar"
          :title="collab.name"
        >
          {{ collab.avatar }}
        </div>
      </div>
    </div>
  </aside>
</template>

<style scoped>
.sidebar {
  width: 280px;
  flex-shrink: 0;
}

.sidebar__section {
  margin-bottom: 20px;
}

.sidebar__heading {
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  color: #666;
  margin: 0 0 8px;
}

/* Install box */
.sidebar__install-box {
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  overflow: hidden;
}

.sidebar__install-tabs {
  display: flex;
  border-bottom: 1px solid #e0e0e0;
  background: #f6f8fa;
}

.sidebar__install-tab {
  flex: 1;
  padding: 6px 0;
  border: none;
  background: none;
  font-size: 12px;
  font-weight: 600;
  color: #666;
  cursor: pointer;
  transition: all 0.15s;
  border-bottom: 2px solid transparent;
}

.sidebar__install-tab--active {
  color: #1b1f23;
  background: #fff;
  border-bottom-color: #cb3837;
}

.sidebar__install-tab:hover:not(.sidebar__install-tab--active) {
  background: #eaecef;
}

.sidebar__install-row {
  display: flex;
  align-items: center;
  padding: 8px 12px;
  gap: 8px;
}

.sidebar__install-cmd {
  font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;
  font-size: 13px;
  color: #24292f;
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.sidebar__copy-btn {
  background: none;
  border: none;
  color: #666;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  transition: all 0.15s;
}

.sidebar__copy-btn:hover {
  color: #24292f;
  background: #e0e0e0;
}

/* Links */
.sidebar__link {
  display: flex;
  align-items: center;
  gap: 6px;
  color: #238636;
  text-decoration: none;
  font-size: 14px;
  word-break: break-all;
}

.sidebar__link:hover {
  text-decoration: underline;
  color: #1a7f37;
}

/* Stats */
.sidebar__stats-row {
  display: flex;
  align-items: flex-end;
  gap: 12px;
}

.sidebar__stats-number {
  font-size: 24px;
  font-weight: 700;
  color: #24292f;
  line-height: 1;
}

.sidebar__sparkline {
  flex: 1;
  height: 36px;
}

.sidebar__divider {
  height: 1px;
  background: #e0e0e0;
  margin: 16px 0;
}

.sidebar__stat-item {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  padding: 6px 0;
  border-bottom: 1px solid #f0f0f0;
}

.sidebar__stat-item:last-child {
  border-bottom: none;
}

.sidebar__stat-label {
  font-size: 13px;
  color: #666;
}

.sidebar__stat-value {
  font-size: 13px;
  font-weight: 500;
  color: #24292f;
}

.sidebar__stat-value--link {
  color: #238636;
  cursor: pointer;
}

.sidebar__stat-value--link:hover {
  text-decoration: underline;
}

/* Collaborators */
.sidebar__collaborators {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.sidebar__avatar {
  width: 36px;
  height: 36px;
  border-radius: 4px;
  background: #f6f8fa;
  border: 1px solid #e0e0e0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: 700;
  color: #666;
  cursor: pointer;
  transition: border-color 0.15s;
}

.sidebar__avatar:hover {
  border-color: #238636;
}
</style>
