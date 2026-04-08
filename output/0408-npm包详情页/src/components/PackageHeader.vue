<script setup lang="ts">
import { packageData } from '@/mock/data'
</script>

<template>
  <div class="pkg-header">
    <div class="pkg-header__row">
      <h1 class="pkg-header__name">{{ packageData.name }}</h1>
      <span class="pkg-header__version">{{ packageData.version }}</span>
      <span class="pkg-header__public">Public</span>
    </div>
    <p class="pkg-header__meta">Published <span class="pkg-header__date">{{ packageData.published }}</span></p>
  </div>
</template>

<style scoped>
.pkg-header {
  padding: 20px 0 12px;
}

.pkg-header__row {
  display: flex;
  align-items: baseline;
  gap: 8px;
  flex-wrap: wrap;
}

.pkg-header__name {
  font-size: 24px;
  font-weight: 700;
  color: #24292f;
  margin: 0;
  letter-spacing: -0.3px;
}

.pkg-header__version {
  font-size: 14px;
  color: #57606a;
  font-weight: 400;
}

.pkg-header__public {
  display: inline-flex;
  align-items: center;
  padding: 1px 8px;
  background: #dafbe1;
  color: #1a7f37;
  border-radius: 16px;
  font-size: 12px;
  font-weight: 500;
  line-height: 20px;
}

.pkg-header__meta {
  margin-top: 6px;
  font-size: 13px;
  color: #57606a;
}

.pkg-header__date {
  color: #57606a;
}
</style>
