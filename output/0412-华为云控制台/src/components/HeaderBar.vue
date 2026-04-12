<script setup lang="ts">
import { ref } from 'vue'
import { headerNavItems, regions } from '@/mock/data'

const currentRegion = ref('华北-北京四')
const showRegionDropdown = ref(false)
const searchText = ref('')
const showSearch = ref(false)

const navItems = ref(headerNavItems)
const activeNav = ref('控制台')

function setActiveNav(label: string) {
  activeNav.value = label
}

function toggleRegionDropdown() {
  showRegionDropdown.value = !showRegionDropdown.value
}

function selectRegion(region: string) {
  currentRegion.value = region
  showRegionDropdown.value = false
}

function toggleSearch() {
  showSearch.value = !showSearch.value
  if (!showSearch.value) {
    searchText.value = ''
  }
}
</script>

<template>
  <header class="header-bar">
    <div class="header-left">
      <div class="header-logo">
        <svg class="hw-logo" width="28" height="28" viewBox="0 0 28 28" fill="none">
          <rect width="28" height="28" rx="4" fill="#C7000B"/>
          <path d="M7 8h4v4H7V8zm5 0h4v4h-4V8zm5 0h4v4h-4V8zM7 13h4v4H7v-4zm5 0h4v4h-4v-4zm5 0h4v4h-4v-4zM7 18h4v4H7v-4zm5 0h4v4h-4v-4zm5 0h4v4h-4v-4z" fill="rgba(255,255,255,0.9)"/>
        </svg>
        <span class="hw-logo-text">华为云</span>
      </div>

      <nav class="header-nav">
        <a
          v-for="item in navItems"
          :key="item.label"
          :class="['nav-item', { active: activeNav === item.label }]"
          @click="setActiveNav(item.label)"
        >
          {{ item.label }}
        </a>
      </nav>
    </div>

    <div class="header-right">
      <div class="region-selector" @click="toggleRegionDropdown">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
          <circle cx="12" cy="10" r="3"/>
        </svg>
        <span>{{ currentRegion }}</span>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="6 9 12 15 18 9"/>
        </svg>

        <div v-if="showRegionDropdown" class="region-dropdown">
          <div
            v-for="region in regions"
            :key="region"
            :class="['region-item', { active: currentRegion === region }]"
            @click.stop="selectRegion(region)"
          >
            {{ region }}
          </div>
        </div>
      </div>

      <div class="search-box">
        <div v-if="showSearch" class="search-input-wrap">
          <input
            v-model="searchText"
            placeholder="搜索服务"
            class="search-input"
            autofocus
          />
          <svg class="search-icon-inner" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#999" stroke-width="2">
            <circle cx="11" cy="11" r="8"/>
            <path d="m21 21-4.35-4.35"/>
          </svg>
        </div>
        <button v-else class="icon-btn" @click="toggleSearch">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="8"/>
            <path d="m21 21-4.35-4.35"/>
          </svg>
        </button>
      </div>

      <button class="icon-btn notification-btn">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
          <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
        </svg>
        <span class="notification-badge">3</span>
      </button>

      <div class="user-avatar">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
          <circle cx="12" cy="7" r="4"/>
        </svg>
      </div>
    </div>
  </header>
</template>

<style scoped>
.header-bar {
  height: 48px;
  background: #FFFFFF;
  border-bottom: 1px solid #E8E8E8;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 24px;
}

.header-logo {
  display: flex;
  align-items: center;
  gap: 8px;
}

.hw-logo {
  flex-shrink: 0;
}

.hw-logo-text {
  font-size: 16px;
  font-weight: 500;
  color: #1A1A1A;
}

.header-nav {
  display: flex;
  align-items: center;
  gap: 4px;
}

.nav-item {
  font-size: 14px;
  color: #666666;
  padding: 4px 12px;
  cursor: pointer;
  border-bottom: 2px solid transparent;
  transition: all 0.2s;
  text-decoration: none;
  line-height: 44px;
}

.nav-item:hover {
  color: #0066FF;
}

.nav-item.active {
  color: #0066FF;
  border-bottom-color: #0066FF;
  font-weight: 500;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 12px;
}

.region-selector {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  color: #666666;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 4px;
  position: relative;
}

.region-selector:hover {
  background: #F0F0F0;
  color: #1A1A1A;
}

.region-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  background: #FFFFFF;
  border: 1px solid #E8E8E8;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  min-width: 160px;
  z-index: 200;
  margin-top: 4px;
}

.region-item {
  padding: 8px 12px;
  font-size: 12px;
  color: #666666;
  cursor: pointer;
  transition: all 0.15s;
}

.region-item:hover {
  background: #F0F0F0;
  color: #0066FF;
}

.region-item.active {
  color: #0066FF;
  font-weight: 500;
}

.search-box {
  display: flex;
  align-items: center;
}

.search-input-wrap {
  position: relative;
  display: flex;
  align-items: center;
}

.search-input {
  width: 180px;
  height: 28px;
  border: 1px solid #E8E8E8;
  border-radius: 4px;
  padding: 0 28px 0 8px;
  font-size: 12px;
  color: #1A1A1A;
  outline: none;
  font-family: inherit;
}

.search-input:focus {
  border-color: #0066FF;
}

.search-input::placeholder {
  color: #999999;
}

.search-icon-inner {
  position: absolute;
  right: 8px;
}

.icon-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: none;
  background: transparent;
  color: #666666;
  cursor: pointer;
  border-radius: 4px;
  transition: all 0.15s;
}

.icon-btn:hover {
  background: #F0F0F0;
  color: #1A1A1A;
}

.notification-btn {
  position: relative;
}

.notification-badge {
  position: absolute;
  top: 2px;
  right: 2px;
  width: 16px;
  height: 16px;
  background: #FF4D4F;
  color: #FFFFFF;
  font-size: 10px;
  font-weight: 500;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
}

.user-avatar {
  width: 28px;
  height: 28px;
  background: #E6F0FF;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #0066FF;
  cursor: pointer;
}
</style>
