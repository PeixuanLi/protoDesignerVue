<script setup lang="ts">
import { ref } from 'vue'
import { sidebarCategories, type SidebarCategory, type MenuItem } from '@/mock/data'

const categories = ref<SidebarCategory[]>(sidebarCategories)
const activeItem = ref('dashboard')
const expandedCategories = ref<string[]>(['overview', 'compute'])

function toggleCategory(categoryId: string) {
  const idx = expandedCategories.value.indexOf(categoryId)
  if (idx === -1) {
    expandedCategories.value.push(categoryId)
  } else {
    expandedCategories.value.splice(idx, 1)
  }
}

function selectItem(item: MenuItem) {
  activeItem.value = item.id
}

function isExpanded(categoryId: string) {
  return expandedCategories.value.includes(categoryId)
}
</script>

<template>
  <aside class="sidebar">
    <div class="sidebar-scroll">
      <div
        v-for="category in categories"
        :key="category.id"
        class="sidebar-category"
      >
        <div
          class="category-header"
          @click="toggleCategory(category.id)"
        >
          <span class="category-label">{{ category.label }}</span>
          <svg
            :class="['chevron-icon', { expanded: isExpanded(category.id) }]"
            width="12" height="12" viewBox="0 0 24 24"
            fill="none" stroke="currentColor" stroke-width="2"
          >
            <polyline points="9 18 15 12 9 6"/>
          </svg>
        </div>

        <div v-if="isExpanded(category.id)" class="category-items">
          <div
            v-for="item in category.items"
            :key="item.id"
            :class="['sidebar-item', { active: activeItem === item.id }]"
            @click="selectItem(item)"
          >
            <span class="item-label">{{ item.label }}</span>
            <span
              v-if="item.badge"
              :class="['item-badge', item.badgeType]"
            >
              {{ item.badge }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </aside>
</template>

<style scoped>
.sidebar {
  width: 200px;
  min-width: 200px;
  background: #FFFFFF;
  border-right: 1px solid #E8E8E8;
  position: fixed;
  top: 48px;
  left: 0;
  bottom: 0;
  overflow-y: auto;
  z-index: 50;
}

.sidebar::-webkit-scrollbar {
  width: 4px;
}

.sidebar::-webkit-scrollbar-thumb {
  background: #E8E8E8;
  border-radius: 2px;
}

.sidebar-scroll {
  padding: 8px 0;
}

.sidebar-category {
  margin-bottom: 0;
}

.category-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 16px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  color: #1A1A1A;
  transition: background 0.15s;
}

.category-header:hover {
  background: #F0F0F0;
}

.category-label {
  flex: 1;
}

.chevron-icon {
  color: #999999;
  transition: transform 0.2s;
  flex-shrink: 0;
}

.chevron-icon.expanded {
  transform: rotate(90deg);
}

.category-items {
  padding: 0;
}

.sidebar-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 9px 16px 9px 32px;
  font-size: 13px;
  color: #666666;
  cursor: pointer;
  transition: all 0.15s;
  position: relative;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.sidebar-item:hover {
  background: #F0F0F0;
  color: #1A1A1A;
}

.sidebar-item.active {
  color: #0066FF;
  background: #FFFFFF;
}

.sidebar-item.active::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 2px;
  background: #0066FF;
}

.item-label {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
}

.item-badge {
  font-size: 10px;
  padding: 1px 4px;
  border-radius: 2px;
  font-weight: 500;
  flex-shrink: 0;
  margin-left: 4px;
}

.item-badge.hot {
  background: #FFF7E6;
  color: #FA8C16;
}

.item-badge.new {
  background: #E6F0FF;
  color: #0066FF;
}
</style>
