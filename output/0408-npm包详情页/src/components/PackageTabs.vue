<script setup lang="ts">
import { ref } from 'vue'

const activeTab = ref('readme')

const tabs = [
  { name: 'readme', label: 'Readme', color: '#f0c040', icon: 'book' },
  { name: 'code', label: 'Code', color: '#cb3837', icon: 'code' },
  { name: 'dependencies', label: '10 Dependencies', color: '#8064a9', icon: 'deps' },
  { name: 'dependents', label: '43 Dependents', color: '#238636', icon: 'users' },
  { name: 'versions', label: '164 Versions', color: '#0969da', icon: 'versions' },
]
</script>

<template>
  <div class="pkg-tabs">
    <div
      v-for="tab in tabs"
      :key="tab.name"
      :class="['pkg-tabs__item', { 'pkg-tabs__item--active': activeTab === tab.name }]"
      @click="activeTab = tab.name"
    >
      <span class="pkg-tabs__icon" :style="{ background: tab.color }">
        <svg v-if="tab.icon === 'book'" width="12" height="12" viewBox="0 0 16 16" fill="none">
          <path d="M2 2h5v12H2V2zm7 0h5v12H9V2z" stroke="#fff" stroke-width="1.3"/>
        </svg>
        <svg v-else-if="tab.icon === 'code'" width="12" height="12" viewBox="0 0 16 16" fill="none">
          <path d="M5 4L1 8l4 4M11 4l4 4-4 4" stroke="#fff" stroke-width="1.5" stroke-linecap="round"/>
        </svg>
        <svg v-else-if="tab.icon === 'deps'" width="12" height="12" viewBox="0 0 16 16" fill="none">
          <rect x="1" y="1" width="6" height="6" rx="1" stroke="#fff" stroke-width="1.3"/>
          <rect x="9" y="1" width="6" height="6" rx="1" stroke="#fff" stroke-width="1.3"/>
          <rect x="5" y="9" width="6" height="6" rx="1" stroke="#fff" stroke-width="1.3"/>
        </svg>
        <svg v-else-if="tab.icon === 'users'" width="12" height="12" viewBox="0 0 16 16" fill="none">
          <circle cx="5.5" cy="5" r="2.5" stroke="#fff" stroke-width="1.3"/>
          <circle cx="10.5" cy="5" r="2.5" stroke="#fff" stroke-width="1.3"/>
          <path d="M0 14c0-2.8 2.5-5 5.5-5s5.5 2.2 5.5 5" stroke="#fff" stroke-width="1.3"/>
        </svg>
        <svg v-else width="12" height="12" viewBox="0 0 16 16" fill="none">
          <rect x="2" y="2" width="12" height="12" rx="2" stroke="#fff" stroke-width="1.3"/>
          <path d="M2 6h12M6 2v12" stroke="#fff" stroke-width="1.3"/>
        </svg>
      </span>
      <span class="pkg-tabs__label">{{ tab.label }}</span>
      <div
        v-if="activeTab === tab.name"
        class="pkg-tabs__bar"
        :style="{ background: tab.color }"
      ></div>
    </div>
  </div>
</template>

<style scoped>
.pkg-tabs {
  display: flex;
  gap: 0;
  border-bottom: 1px solid #d0d7de;
  margin-bottom: 0;
}

.pkg-tabs__item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  cursor: pointer;
  position: relative;
  color: #57606a;
  font-size: 14px;
  font-weight: 500;
  transition: color 0.15s;
  white-space: nowrap;
}

.pkg-tabs__item:hover {
  color: #24292f;
}

.pkg-tabs__item--active {
  color: #24292f;
  font-weight: 600;
}

.pkg-tabs__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border-radius: 3px;
  flex-shrink: 0;
}

.pkg-tabs__bar {
  position: absolute;
  bottom: -1px;
  left: 0;
  right: 0;
  height: 3px;
  border-radius: 3px 3px 0 0;
}
</style>
