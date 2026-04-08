<script setup lang="ts">
import { packageData } from '@/mock/data'
import { ElMessage } from 'element-plus'
import { ref } from 'vue'

const copied = ref(false)

function copyInstall() {
  navigator.clipboard.writeText('npm i embedded-postgres')
  copied.value = true
  ElMessage.success('Copied to clipboard!')
  setTimeout(() => { copied.value = false }, 2000)
}
</script>

<template>
  <div class="readme-content">
    <!-- Hero Section -->
    <div class="readme-hero">
      <div class="readme-hero__text">
        <h2 class="readme-hero__title">Embedded Postgres</h2>
        <p class="readme-hero__subtitle">Launch Postgres clusters, straight from NodeJS.</p>
      </div>
      <div class="readme-hero__icon">
        <!-- Elephant / Postgres icon in hexagon -->
        <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
          <path d="M40 4L73 22v36L40 76 7 58V22L40 4z" fill="#8064a9" opacity="0.15" stroke="#8064a9" stroke-width="1.5"/>
          <text x="40" y="48" text-anchor="middle" font-size="32" fill="#8064a9">&#x1F418;</text>
        </svg>
      </div>
      <!-- Background pattern -->
      <div class="readme-hero__pattern"></div>
    </div>

    <!-- Badges -->
    <div class="readme-badges">
      <span class="readme-badge readme-badge--npm">
        <span class="readme-badge__icon">npm</span>
        <span class="readme-badge__text">v{{ packageData.version }}</span>
      </span>
      <span class="readme-badge readme-badge--types">
        <span class="readme-badge__icon">TS</span>
        <span class="readme-badge__text">TypeScript</span>
      </span>
      <span class="readme-badge readme-badge--downloads">
        <span class="readme-badge__icon">
          <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M2 12l6-8 6 8" stroke="#fff" stroke-width="2" stroke-linecap="round"/></svg>
        </span>
        <span class="readme-badge__text">477k/year</span>
      </span>
      <span class="readme-badge readme-badge--license">
        <span class="readme-badge__icon">
          <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M8 2v12M4 6h8" stroke="#fff" stroke-width="1.5"/></svg>
        </span>
        <span class="readme-badge__text">MIT</span>
      </span>
      <span class="readme-badge readme-badge--build">
        <span class="readme-badge__icon">
          <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M3 8l3 3 7-7" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </span>
        <span class="readme-badge__text">passing</span>
      </span>
    </div>

    <!-- Description -->
    <p class="readme-description">{{ packageData.description }}</p>

    <!-- Installation -->
    <div class="readme-install">
      <h3 class="readme-install__heading">Installation</h3>
      <p class="readme-install__text">embedded-postgres is available from NPM:</p>
      <div class="readme-install__code">
        <code>npm i embedded-postgres</code>
        <button class="readme-install__copy" @click="copyInstall">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <rect x="5" y="5" width="9" height="9" rx="1.5" stroke="currentColor" stroke-width="1.2"/>
            <path d="M3 11V3a1 1 0 011-1h8" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.readme-content {
  padding: 24px 0;
}

.readme-hero {
  background: linear-gradient(135deg, #f8f0ff 0%, #f0f4ff 50%, #fff5f0 100%);
  border-radius: 8px;
  padding: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  overflow: hidden;
  margin-bottom: 20px;
}

.readme-hero__text {
  position: relative;
  z-index: 1;
}

.readme-hero__title {
  font-size: 32px;
  font-weight: 700;
  color: var(--npm-text-primary);
  margin: 0 0 8px;
}

.readme-hero__subtitle {
  font-size: 16px;
  color: var(--npm-text-secondary);
  margin: 0;
}

.readme-hero__icon {
  position: relative;
  z-index: 1;
  opacity: 0.8;
}

.readme-badges {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
}

.readme-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
}

.readme-badge__icon {
  display: flex;
  align-items: center;
  justify-content: center;
}

.readme-badge--npm {
  background: #cb3837;
  color: #fff;
}

.readme-badge--types {
  background: #3072c6;
  color: #fff;
}

.readme-badge--downloads {
  background: #4caf50;
  color: #fff;
}

.readme-badge--license {
  background: #6e7781;
  color: #fff;
}

.readme-badge--build {
  background: #1a9f3e;
  color: #fff;
}

.readme-description {
  font-size: 16px;
  color: var(--npm-text-primary);
  margin-bottom: 24px;
  line-height: 1.6;
}

.readme-install {
  margin-bottom: 24px;
}

.readme-install__heading {
  font-size: 22px;
  font-weight: 700;
  color: var(--npm-text-primary);
  margin: 0 0 12px;
  padding-bottom: 8px;
  border-bottom: 1px solid var(--npm-border);
}

.readme-install__text {
  font-size: 14px;
  color: var(--npm-text-secondary);
  margin: 0 0 12px;
}

.readme-install__code {
  background: #1b1f23;
  color: #e0e0e0;
  padding: 14px 20px;
  border-radius: 6px;
  font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.readme-install__copy {
  background: none;
  border: none;
  color: #999;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  transition: color 0.2s;
}

.readme-install__copy:hover {
  color: #fff;
}
</style>
