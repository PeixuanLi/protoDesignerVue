<script setup lang="ts">
import { ref } from 'vue'
import { packageData, weeklyDownloadData } from '@/mock/data'
import { ElMessage } from 'element-plus'

const copied = ref(false)

function copyInstall() {
  navigator.clipboard.writeText(`npm i ${packageData.name}`)
  copied.value = true
  ElMessage.success('Copied to clipboard!')
  setTimeout(() => { copied.value = false }, 2000)
}

// Mini sparkline chart computed from download data
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
        <code class="sidebar__install-cmd">npm i {{ packageData.name }}</code>
        <button class="sidebar__copy-btn" @click="copyInstall">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <rect x="5" y="5" width="9" height="9" rx="1.5" stroke="currentColor" stroke-width="1.2"/>
            <path d="M3 11V3a1 1 0 011-1h8" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/>
          </svg>
        </button>
      </div>
    </div>

    <!-- Repository -->
    <div class="sidebar__section">
      <h4 class="sidebar__heading">Repository</h4>
      <a href="#" class="sidebar__link">
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
          <path d="M6 3L1 8l5 5M12 3l5 5-5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" style="margin-right: 2px">
          <path d="M8 1C4.13 1 1 4.13 1 8c0 3.1 2 5.7 4.8 6.6.35.07.48-.15.48-.34v-1.2c-1.95.42-2.37-.94-2.37-.94-.32-.81-.78-1.03-.78-1.03-.64-.44.05-.43.05-.43.7.05 1.07.72 1.07.72.63 1.07 1.65.76 2.05.58.06-.45.24-.76.44-.94-1.56-.18-3.2-.78-3.2-3.47 0-.77.27-1.4.72-1.89-.07-.18-.31-.9.07-1.87 0 0 .59-.19 1.93.72a6.7 6.7 0 013.5 0c1.34-.91 1.93-.72 1.93-.72.38.97.14 1.69.07 1.87.45.49.72 1.12.72 1.89 0 2.7-1.64 3.29-3.21 3.46.25.22.48.65.48 1.31v1.94c0 .19.13.41.48.34C13 13.7 15 11.1 15 8c0-3.87-3.13-7-7-7z" fill="currentColor"/>
        </svg>
        {{ packageData.repository }}
      </a>
    </div>

    <!-- Homepage -->
    <div class="sidebar__section">
      <h4 class="sidebar__heading">Homepage</h4>
      <a href="#" class="sidebar__link">
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
          <path d="M7 2L3 14M9 2l4 12M5 7h8M3 10h10" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/>
        </svg>
        {{ packageData.homepage }}
      </a>
    </div>

    <!-- Stats -->
    <div class="sidebar__section">
      <h4 class="sidebar__heading">Weekly Downloads</h4>
      <div class="sidebar__stats-row">
        <span class="sidebar__stats-number">{{ packageData.weeklyDownloads.toLocaleString() }}</span>
        <svg class="sidebar__sparkline" viewBox="0 0 100 100" preserveAspectRatio="none">
          <polyline
            :points="chartPoints"
            fill="none"
            stroke="#4caf50"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
    </div>

    <div class="sidebar__divider"></div>

    <div class="sidebar__section">
      <div class="sidebar__stat-item">
        <span class="sidebar__stat-label">Version</span>
        <span class="sidebar__stat-value">{{ packageData.version }}</span>
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
    </div>
  </aside>
</template>

<style scoped>
.sidebar {
  width: 300px;
  flex-shrink: 0;
}

.sidebar__section {
  margin-bottom: 20px;
}

.sidebar__heading {
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: var(--npm-text-secondary);
  margin: 0 0 8px;
}

.sidebar__install-box {
  display: flex;
  align-items: center;
  background: var(--npm-gray-bg);
  border: 1px solid var(--npm-border);
  border-radius: 6px;
  padding: 8px 12px;
  gap: 8px;
}

.sidebar__install-cmd {
  font-family: 'SFMono-Regular', Consolas, monospace;
  font-size: 13px;
  color: var(--npm-text-primary);
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.sidebar__copy-btn {
  background: none;
  border: none;
  color: var(--npm-text-secondary);
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  transition: all 0.2s;
}

.sidebar__copy-btn:hover {
  color: var(--npm-text-primary);
  background: #e8e8e8;
}

.sidebar__link {
  display: flex;
  align-items: center;
  gap: 6px;
  color: var(--npm-blue);
  text-decoration: none;
  font-size: 14px;
  word-break: break-all;
}

.sidebar__link:hover {
  text-decoration: underline;
}

.sidebar__stats-row {
  display: flex;
  align-items: center;
  gap: 12px;
}

.sidebar__stats-number {
  font-size: 20px;
  font-weight: 700;
  color: var(--npm-text-primary);
}

.sidebar__sparkline {
  width: 100px;
  height: 30px;
}

.sidebar__divider {
  height: 1px;
  background: var(--npm-border);
  margin: 16px 0;
}

.sidebar__stat-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid #f0f0f0;
}

.sidebar__stat-item:last-child {
  border-bottom: none;
}

.sidebar__stat-label {
  font-size: 14px;
  color: var(--npm-text-secondary);
}

.sidebar__stat-value {
  font-size: 14px;
  font-weight: 600;
  color: var(--npm-text-primary);
}
</style>
