<script setup lang="ts">
import { ref, computed } from 'vue'
import HeaderBar from '@/components/HeaderBar.vue'
import Sidebar from '@/components/Sidebar.vue'
import { resourceData, statusMap, overviewStats, type ResourceItem } from '@/mock/data'

const searchForm = ref({
  name: '',
  status: '',
  ip: '',
})

const tableData = ref<ResourceItem[]>([...resourceData])
const currentPage = ref(1)
const pageSize = ref(10)
const dialogVisible = ref(false)
const dialogTitle = ref('购买弹性云服务器')
const activeTab = ref('list')

const filteredData = computed(() => {
  let data = [...tableData.value]
  if (searchForm.value.name) {
    data = data.filter(item =>
      item.name.toLowerCase().includes(searchForm.value.name.toLowerCase())
    )
  }
  if (searchForm.value.status) {
    data = data.filter(item => item.status === searchForm.value.status)
  }
  if (searchForm.value.ip) {
    data = data.filter(item =>
      item.ip.includes(searchForm.value.ip)
    )
  }
  return data
})

const pagedData = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  return filteredData.value.slice(start, start + pageSize.value)
})

function handleSearch() {
  currentPage.value = 1
}

function handleReset() {
  searchForm.value = { name: '', status: '', ip: '' }
  currentPage.value = 1
}

function getStatusStyle(status: string) {
  return statusMap[status] || statusMap.stopped
}

function handleEdit(row: ResourceItem) {
  console.log('Edit:', row.id)
}

function handleReboot(row: ResourceItem) {
  console.log('Reboot:', row.id)
}

function handleMore(command: string, row: ResourceItem) {
  console.log('More:', command, row.id)
}

const stats = ref(overviewStats)
</script>

<template>
  <div class="console-layout">
    <HeaderBar />
    <Sidebar />

    <main class="main-content">
      <!-- Breadcrumb -->
      <div class="breadcrumb">
        <span class="breadcrumb-item">控制台</span>
        <span class="breadcrumb-sep">/</span>
        <span class="breadcrumb-item breadcrumb-current">弹性云服务器</span>
      </div>

      <!-- Page Title -->
      <div class="page-header">
        <h1 class="page-title">弹性云服务器</h1>
        <div class="page-actions">
          <button class="btn-primary">购买弹性云服务器</button>
        </div>
      </div>

      <!-- Overview Stats -->
      <div class="overview-stats">
        <div v-for="stat in stats" :key="stat.label" class="stat-card">
          <div class="stat-value">{{ stat.value }}<span class="stat-unit">{{ stat.unit }}</span></div>
          <div class="stat-label">{{ stat.label }}</div>
          <div :class="['stat-trend', stat.trend]">
            <svg v-if="stat.trend === 'up'" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="18 15 12 9 6 15"/></svg>
            <svg v-else-if="stat.trend === 'down'" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
            <span>{{ stat.trendValue }}</span>
          </div>
        </div>
      </div>

      <!-- Content Tabs -->
      <div class="content-card">
        <div class="content-tabs">
          <div
            :class="['content-tab', { active: activeTab === 'list' }]"
            @click="activeTab = 'list'"
          >
            云服务器列表
          </div>
          <div
            :class="['content-tab', { active: activeTab === 'monitor' }]"
            @click="activeTab = 'monitor'"
          >
            监控
          </div>
        </div>

        <!-- Search Bar -->
        <div class="search-bar">
          <div class="search-fields">
            <div class="search-field">
              <label class="search-label">名称/ID</label>
              <input
                v-model="searchForm.name"
                placeholder="请输入名称或ID"
                class="hw-input"
              />
            </div>
            <div class="search-field">
              <label class="search-label">状态</label>
              <select v-model="searchForm.status" class="hw-select">
                <option value="">全部</option>
                <option value="running">运行中</option>
                <option value="stopped">已关机</option>
                <option value="building">创建中</option>
                <option value="error">异常</option>
              </select>
            </div>
            <div class="search-field">
              <label class="search-label">IP地址</label>
              <input
                v-model="searchForm.ip"
                placeholder="请输入IP地址"
                class="hw-input"
              />
            </div>
          </div>
          <div class="search-actions">
            <button class="btn-primary btn-sm" @click="handleSearch">查询</button>
            <button class="btn-default btn-sm" @click="handleReset">重置</button>
          </div>
        </div>

        <!-- Table -->
        <div class="table-wrap">
          <table class="hw-table">
            <thead>
              <tr>
                <th class="col-check"><input type="checkbox" /></th>
                <th>名称/ID</th>
                <th>状态</th>
                <th>规格</th>
                <th>镜像</th>
                <th>IP地址</th>
                <th>可用区</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in pagedData" :key="row.id">
                <td class="col-check"><input type="checkbox" /></td>
                <td>
                  <div class="cell-name">
                    <a class="name-link" href="#">{{ row.name }}</a>
                    <span class="name-id">{{ row.id }}</span>
                  </div>
                </td>
                <td>
                  <span
                    class="status-badge"
                    :style="{
                      color: getStatusStyle(row.status).color,
                      backgroundColor: getStatusStyle(row.status).bgColor,
                    }"
                  >
                    {{ getStatusStyle(row.status).label }}
                  </span>
                </td>
                <td>{{ row.flavor }}</td>
                <td>{{ row.image }}</td>
                <td>{{ row.ip }}</td>
                <td>{{ row.az }}</td>
                <td>
                  <div class="action-links">
                    <a class="action-link" @click="handleEdit(row)">更多</a>
                    <a class="action-link" @click="handleReboot(row)">重启</a>
                    <a class="action-link action-link-danger">删除</a>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Pagination -->
        <div class="pagination-wrap">
          <span class="pagination-total">共 {{ filteredData.length }} 条</span>
          <div class="pagination-controls">
            <button class="page-btn" :disabled="currentPage === 1" @click="currentPage--">&lt;</button>
            <button
              v-for="page in Math.ceil(filteredData.length / pageSize)"
              :key="page"
              :class="['page-btn', { active: currentPage === page }]"
              @click="currentPage = page"
            >
              {{ page }}
            </button>
            <button
              class="page-btn"
              :disabled="currentPage >= Math.ceil(filteredData.length / pageSize)"
              @click="currentPage++"
            >
              &gt;
            </button>
          </div>
          <div class="page-size-selector">
            <select v-model="pageSize" class="hw-select hw-select-sm">
              <option :value="10">10条/页</option>
              <option :value="20">20条/页</option>
              <option :value="50">50条/页</option>
            </select>
          </div>
          <span class="pagination-jump">
            跳至
            <input type="number" :value="currentPage" class="jump-input" />
            页
          </span>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
.console-layout {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: #F5F7FA;
}

.main-content {
  margin-top: 48px;
  margin-left: 200px;
  padding: 16px 24px;
  min-height: calc(100vh - 48px);
}

/* Breadcrumb */
.breadcrumb {
  display: flex;
  align-items: center;
  gap: 4px;
  margin-bottom: 12px;
  font-size: 12px;
}

.breadcrumb-item {
  color: #999999;
  cursor: pointer;
}

.breadcrumb-item:hover {
  color: #0066FF;
}

.breadcrumb-sep {
  color: #E8E8E8;
}

.breadcrumb-current {
  color: #666666;
  cursor: default;
}

.breadcrumb-current:hover {
  color: #666666;
}

/* Page Header */
.page-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}

.page-title {
  font-size: 20px;
  font-weight: 500;
  color: #1A1A1A;
  margin: 0;
}

/* Buttons */
.btn-primary {
  background: #0066FF;
  color: #FFFFFF;
  border: 1px solid #0066FF;
  border-radius: 4px;
  padding: 0 16px;
  height: 32px;
  font-size: 13px;
  cursor: pointer;
  font-family: inherit;
  display: inline-flex;
  align-items: center;
  transition: all 0.15s;
}

.btn-primary:hover {
  background: #0052CC;
  border-color: #0052CC;
}

.btn-primary:active {
  background: #003D99;
}

.btn-sm {
  height: 28px;
  padding: 0 12px;
  font-size: 12px;
}

.btn-default {
  background: #FFFFFF;
  color: #666666;
  border: 1px solid #E8E8E8;
  border-radius: 4px;
  padding: 0 16px;
  height: 32px;
  font-size: 13px;
  cursor: pointer;
  font-family: inherit;
  display: inline-flex;
  align-items: center;
  transition: all 0.15s;
}

.btn-default:hover {
  color: #0066FF;
  border-color: #0066FF;
}

/* Overview Stats */
.overview-stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-bottom: 16px;
}

.stat-card {
  background: #FFFFFF;
  border: 1px solid #E8E8E8;
  border-radius: 4px;
  padding: 16px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.stat-value {
  font-size: 28px;
  font-weight: 500;
  color: #1A1A1A;
  line-height: 1.2;
}

.stat-unit {
  font-size: 12px;
  font-weight: 400;
  color: #999999;
  margin-left: 2px;
}

.stat-label {
  font-size: 12px;
  color: #666666;
  margin-top: 4px;
}

.stat-trend {
  display: flex;
  align-items: center;
  gap: 2px;
  font-size: 12px;
  margin-top: 8px;
}

.stat-trend.up {
  color: #52C41A;
}

.stat-trend.down {
  color: #FF4D4F;
}

.stat-trend.flat {
  color: #999999;
}

/* Content Card */
.content-card {
  background: #FFFFFF;
  border: 1px solid #E8E8E8;
  border-radius: 4px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.content-tabs {
  display: flex;
  border-bottom: 1px solid #E8E8E8;
  padding: 0 16px;
}

.content-tab {
  padding: 12px 16px;
  font-size: 14px;
  color: #666666;
  cursor: pointer;
  border-bottom: 2px solid transparent;
  transition: all 0.15s;
}

.content-tab:hover {
  color: #0066FF;
}

.content-tab.active {
  color: #0066FF;
  border-bottom-color: #0066FF;
  font-weight: 500;
}

/* Search Bar */
.search-bar {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  padding: 16px;
  border-bottom: 1px solid #E8E8E8;
}

.search-fields {
  display: flex;
  align-items: flex-end;
  gap: 16px;
}

.search-field {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.search-label {
  font-size: 12px;
  color: #666666;
}

.hw-input {
  width: 180px;
  height: 28px;
  border: 1px solid #E8E8E8;
  border-radius: 4px;
  padding: 0 8px;
  font-size: 12px;
  color: #1A1A1A;
  outline: none;
  font-family: inherit;
}

.hw-input:focus {
  border-color: #0066FF;
}

.hw-input::placeholder {
  color: #999999;
}

.hw-select {
  width: 140px;
  height: 28px;
  border: 1px solid #E8E8E8;
  border-radius: 4px;
  padding: 0 8px;
  font-size: 12px;
  color: #1A1A1A;
  outline: none;
  font-family: inherit;
  background: #FFFFFF;
  appearance: auto;
}

.hw-select:focus {
  border-color: #0066FF;
}

.hw-select-sm {
  width: auto;
  height: 28px;
}

.search-actions {
  display: flex;
  gap: 8px;
}

/* Table */
.table-wrap {
  overflow-x: auto;
}

.hw-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
}

.hw-table th {
  background: #FAFAFA;
  font-weight: 500;
  font-size: 12px;
  color: #666666;
  text-align: left;
  padding: 12px 16px;
  border-bottom: 1px solid #E8E8E8;
  white-space: nowrap;
}

.hw-table td {
  padding: 12px 16px;
  border-bottom: 1px solid #E8E8E8;
  color: #1A1A1A;
  vertical-align: middle;
}

.hw-table tr:hover td {
  background: #F0F0F0;
}

.col-check {
  width: 40px;
  text-align: center;
}

.col-check input {
  width: 14px;
  height: 14px;
  cursor: pointer;
  accent-color: #0066FF;
}

.cell-name {
  display: flex;
  flex-direction: column;
}

.name-link {
  color: #0066FF;
  cursor: pointer;
  font-size: 13px;
  text-decoration: none;
}

.name-link:hover {
  text-decoration: underline;
}

.name-id {
  font-size: 12px;
  color: #999999;
  margin-top: 2px;
}

.status-badge {
  display: inline-block;
  padding: 2px 8px;
  border-radius: 2px;
  font-size: 12px;
  white-space: nowrap;
}

.action-links {
  display: flex;
  gap: 8px;
  align-items: center;
}

.action-link {
  color: #0066FF;
  font-size: 12px;
  cursor: pointer;
  text-decoration: none;
  white-space: nowrap;
}

.action-link:hover {
  text-decoration: underline;
}

.action-link-danger {
  color: #FF4D4F;
}

.action-link-danger:hover {
  color: #D9363E;
}

/* Pagination */
.pagination-wrap {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  gap: 16px;
  border-top: 1px solid #E8E8E8;
  font-size: 12px;
  color: #666666;
}

.pagination-total {
  color: #999999;
}

.pagination-controls {
  display: flex;
  gap: 4px;
}

.page-btn {
  width: 28px;
  height: 28px;
  border: 1px solid #E8E8E8;
  border-radius: 4px;
  background: #FFFFFF;
  color: #666666;
  cursor: pointer;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: inherit;
  transition: all 0.15s;
}

.page-btn:hover:not(:disabled) {
  color: #0066FF;
  border-color: #0066FF;
}

.page-btn.active {
  background: #0066FF;
  color: #FFFFFF;
  border-color: #0066FF;
}

.page-btn:disabled {
  color: #E8E8E8;
  cursor: not-allowed;
}

.pagination-jump {
  display: flex;
  align-items: center;
  gap: 4px;
  color: #999999;
}

.jump-input {
  width: 40px;
  height: 28px;
  border: 1px solid #E8E8E8;
  border-radius: 4px;
  text-align: center;
  font-size: 12px;
  outline: none;
  font-family: inherit;
}

.jump-input:focus {
  border-color: #0066FF;
}
</style>
