<script setup lang="ts">
import { ref } from 'vue'

const activeTab = ref('readme')

const tabs = [
  { name: 'readme', label: 'Readme', color: 'var(--npm-yellow)', icon: 'book' },
  { name: 'code', label: 'Code', color: 'var(--npm-red)', icon: 'code' },
  { name: 'dependencies', label: '10 Dependencies', color: 'var(--npm-purple)', icon: 'deps' },
  { name: 'dependents', label: '43 Dependents', color: 'var(--npm-blue)', icon: 'users' },
  { name: 'versions', label: '164 Versions', color: 'var(--npm-teal)', icon: 'versions' },
]
</script>

<template>
  <div class="package-tabs">
    <div
      v-for="tab in tabs"
      :key="tab.name"
      :class="['package-tabs__item', { 'package-tabs__item--active': activeTab === tab.name }]"
      @click="activeTab = tab.name"
    >
      <span class="package-tabs__icon" :style="{ background: tab.color }">
        <!-- Book icon -->
        <svg v-if="tab.icon === 'book'" width="14" height="14" viewBox="0 0 16 16" fill="none">
          <path d="M2 2h5v12H2V2zm7 0h5v12H9V2z" :stroke="'#fff'" stroke-width="1.2"/>
        </svg>
        <!-- Code icon -->
        <svg v-else-if="tab.icon === 'code'" width="14" height="14" viewBox="0 0 16 16" fill="none">
          <path d="M5 4L1 8l4 4M11 4l4 4-4 4" :stroke="'#fff'" stroke-width="1.5" stroke-linecap="round"/>
        </svg>
        <!-- Dependencies icon -->
        <svg v-else-if="tab.icon === 'deps'" width="14" height="14" viewBox="0 0 16 16" fill="none">
          <circle cx="8" cy="4" r="2" :stroke="'#fff'" stroke-width="1.3"/>
          <circle cx="4" cy="12" r="2" :stroke="'#fff'" stroke-width="1.3"/>
          <circle cx="12" cy="12" r="2" :stroke="'#fff'" stroke-width="1.3"/>
          <path d="M6.5 5.5L5 10M9.5 5.5L11 10" :stroke="'#fff'" stroke-width="1.2"/>
        </svg>
        <!-- Users icon -->
        <svg v-else-if="tab.icon === 'users'" width="14" height="14" viewBox="0 0 16 16" fill="none">
          <circle cx="5" cy="6" r="2.5" :stroke="'#fff'" stroke-width="1.3"/>
          <circle cx="11" cy="6" r="2.5" :stroke="'#fff'" stroke-width="1.3"/>
          <path d="M0 14c0-2.8 2.2-5 5-5s5 2.2 5 5" :stroke="'#fff'" stroke-width="1.3"/>
          <path d="M10 9c2.8 0 5 2.2 5 5" :stroke="'#fff'" stroke-width="1.3"/>
        </svg>
        <!-- Versions icon -->
        <svg v-else width="14" height="14" viewBox="0 0 16 16" fill="none">
          <rect x="2" y="2" width="12" height="12" rx="2" :stroke="'#fff'" stroke-width="1.3"/>
          <path d="M2 6h12M6 2v12" :stroke="'#fff'" stroke-width="1.3"/>
        </svg>
      </span>
      <span class="package-tabs__label">{{ tab.label }}</span>
      <div
        v-if="activeTab === tab.name"
        class="package-tabs__underline"
        :style="{ background: tab.color }"
      ></div>
    </div>
  </div>
</template>

<style scoped>
.package-tabs {
  display: flex;
  gap: 0;
  border-bottom: 1px solid var(--npm-border);
  padding: 0;
}

.package-tabs__item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  cursor: pointer;
  position: relative;
  color: var(--npm-text-secondary);
  font-size: 14px;
  font-weight: 500;
  transition: color 0.2s;
}

.package-tabs__item:hover {
  color: var(--npm-text-primary);
}

.package-tabs__item--active {
  color: var(--npm-text-primary);
  font-weight: 600;
}

.package-tabs__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  border-radius: 4px;
  flex-shrink: 0;
}

.package-tabs__underline {
  position: absolute;
  bottom: -1px;
  left: 0;
  right: 0;
  height: 3px;
  border-radius: 2px 2px 0 0;
}
</style>
