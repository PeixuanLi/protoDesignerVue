<script setup lang="ts">
import { packageData } from '@/mock/data'
</script>

<template>
  <div class="package-header">
    <div class="package-header__name-row">
      <h1 class="package-header__name">{{ packageData.name }}</h1>
      <span class="package-header__version">{{ packageData.version }}</span>
      <span class="package-header__badge">Public</span>
    </div>
    <p class="package-header__meta">Published {{ packageData.published }}</p>
  </div>
</template>

<style scoped>
.package-header {
  padding: 24px 0 16px;
}

.package-header__name-row {
  display: flex;
  align-items: baseline;
  gap: 10px;
  flex-wrap: wrap;
}

.package-header__name {
  font-size: 28px;
  font-weight: 700;
  color: var(--npm-text-primary);
  margin: 0;
}

.package-header__version {
  font-size: 16px;
  color: var(--npm-text-secondary);
}

.package-header__badge {
  display: inline-block;
  padding: 2px 8px;
  background: #dcffe4;
  color: var(--npm-tag-green);
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
}

.package-header__meta {
  margin-top: 8px;
  font-size: 14px;
  color: var(--npm-text-secondary);
}
</style>
