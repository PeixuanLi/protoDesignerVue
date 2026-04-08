<script setup lang="ts">
</script>

<template>
  <header class="nav-bar">
    <!-- Top gradient strip -->
    <div class="nav-bar__top">
      <div class="nav-bar__top-inner">
        <a href="#" class="nav-bar__logo">
          <svg viewBox="0 0 780 250" width="42" height="17">
            <path fill="#fff" d="M240,228h-56v-56h56V228z M180,168h-48v60h48V168z M120,108h56v120h-56V108z M60,48h48v180H60V48z M0,0h48v228H0V0z"/>
          </svg>
        </a>
        <div class="nav-bar__links">
          <a href="#">Pro</a>
          <a href="#">Teams</a>
          <a href="#">Pricing</a>
          <a href="#">Documentation</a>
        </div>
      </div>
    </div>
    <!-- Search row -->
    <div class="nav-bar__search-row">
      <div class="nav-bar__search-inner">
        <a href="#" class="nav-bar__logo-red">
          <svg viewBox="0 0 780 250" width="52" height="21">
            <path fill="#cb3837" d="M240,228h-56v-56h56V228z M180,168h-48v60h48V168z M120,108h56v120h-56V108z M60,48h48v180H60V48z M0,0h48v228H0V0z"/>
          </svg>
        </a>
        <div class="nav-bar__search-box">
          <el-input
            placeholder="Search packages"
            size="large"
            class="nav-bar__search-input"
          >
            <template #prefix>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M14 14L10 10M11.5 6.5a5 5 0 1 1-10 0 5 5 0 0 1 10 0z" stroke="#8b949e" stroke-width="1.5" stroke-linecap="round"/>
              </svg>
            </template>
          </el-input>
        </div>
        <el-button class="nav-bar__search-btn" size="large">Search</el-button>
        <div class="nav-bar__auth">
          <a href="#" class="nav-bar__sign-up">Sign Up</a>
          <a href="#" class="nav-bar__sign-in">Sign In</a>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>
/* Top gradient strip */
.nav-bar__top {
  background: linear-gradient(90deg, #fb6056, #d63d83);
  padding: 6px 0;
}

.nav-bar__top-inner {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 32px;
  display: flex;
  align-items: center;
  gap: 28px;
}

.nav-bar__links {
  display: flex;
  gap: 24px;
}

.nav-bar__links a {
  color: rgba(255, 255, 255, 0.92);
  text-decoration: none;
  font-size: 13px;
  font-weight: 500;
  letter-spacing: 0.2px;
}

.nav-bar__links a:hover {
  color: #fff;
}

/* Search row */
.nav-bar__search-row {
  background: #fff;
  border-bottom: 1px solid #d0d7de;
  padding: 10px 0;
}

.nav-bar__search-inner {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 32px;
  display: flex;
  align-items: center;
  gap: 12px;
}

.nav-bar__search-box {
  flex: 1;
  max-width: 640px;
}

.nav-bar__search-input :deep(.el-input__wrapper) {
  background: #f6f8fa;
  border-radius: 6px;
  box-shadow: none;
  border: 1px solid #d0d7de;
  padding: 2px 12px;
}

.nav-bar__search-input :deep(.el-input__wrapper:hover),
.nav-bar__search-input :deep(.el-input__wrapper.is-focus) {
  border-color: #0969da;
  background: #fff;
}

.nav-bar__search-btn {
  background: #238636;
  border-color: #238636;
  border-radius: 6px;
  font-weight: 600;
  font-size: 14px;
  padding: 8px 16px;
}

.nav-bar__search-btn:hover {
  background: #2ea043 !important;
  border-color: #2ea043 !important;
}

.nav-bar__auth {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-left: auto;
}

.nav-bar__sign-up {
  padding: 6px 16px;
  border: 1px solid #d0d7de;
  border-radius: 6px;
  color: #24292f;
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  transition: background 0.15s;
}

.nav-bar__sign-up:hover {
  background: #f6f8fa;
}

.nav-bar__sign-in {
  color: #24292f;
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
}

.nav-bar__sign-in:hover {
  text-decoration: underline;
}
</style>
