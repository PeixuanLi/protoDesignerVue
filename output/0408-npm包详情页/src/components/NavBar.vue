<script setup lang="ts">
</script>

<template>
  <header class="nav-bar">
    <nav class="nav-bar__top">
      <div class="nav-bar__top-inner">
        <a href="#" class="nav-bar__logo">
          <svg viewBox="0 0 780 250" width="40" height="16">
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
    </nav>
    <div class="nav-bar__search-row">
      <div class="nav-bar__search-inner">
        <a href="#" class="nav-bar__logo-black">
          <svg viewBox="0 0 780 250" width="50" height="20">
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
                <path d="M14 14L10 10M11.5 6.5a5 5 0 1 1-10 0 5 5 0 0 1 10 0z" stroke="#999" stroke-width="1.5" stroke-linecap="round"/>
              </svg>
            </template>
          </el-input>
        </div>
        <el-button type="primary" class="nav-bar__search-btn" size="large">Search</el-button>
        <div class="nav-bar__auth">
          <a href="#" class="nav-bar__sign-up">Sign Up</a>
          <a href="#" class="nav-bar__sign-in">Sign In</a>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>
.nav-bar__top {
  background: linear-gradient(90deg, var(--npm-gradient-start), var(--npm-gradient-end));
  padding: 8px 0;
}

.nav-bar__top-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  display: flex;
  align-items: center;
  gap: 24px;
}

.nav-bar__links {
  display: flex;
  gap: 20px;
}

.nav-bar__links a {
  color: #fff;
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
}

.nav-bar__links a:hover {
  text-decoration: underline;
}

.nav-bar__search-row {
  background: #fff;
  border-bottom: 1px solid var(--npm-border);
  padding: 12px 0;
}

.nav-bar__search-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  display: flex;
  align-items: center;
  gap: 12px;
}

.nav-bar__search-box {
  flex: 1;
  max-width: 600px;
}

.nav-bar__search-input :deep(.el-input__wrapper) {
  background: var(--npm-gray-bg);
  border-radius: 6px;
  box-shadow: none;
  border: 1px solid transparent;
}

.nav-bar__search-input :deep(.el-input__wrapper:hover) {
  border-color: var(--npm-border);
}

.nav-bar__search-btn {
  background: #1b1f23;
  border-color: #1b1f23;
  border-radius: 6px;
  font-weight: 600;
}

.nav-bar__search-btn:hover {
  background: #333 !important;
  border-color: #333 !important;
}

.nav-bar__auth {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-left: auto;
}

.nav-bar__sign-up {
  padding: 6px 16px;
  border: 1px solid var(--npm-border);
  border-radius: 6px;
  color: var(--npm-text-primary);
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
}

.nav-bar__sign-up:hover {
  background: var(--npm-gray-bg);
}

.nav-bar__sign-in {
  color: var(--npm-text-primary);
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
}

.nav-bar__sign-in:hover {
  text-decoration: underline;
}
</style>
