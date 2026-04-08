<script setup lang="ts">
import NavBar from '@/components/NavBar.vue'
import PackageHeader from '@/components/PackageHeader.vue'
import PackageTabs from '@/components/PackageTabs.vue'
import ReadmeContent from '@/components/ReadmeContent.vue'
import PackageSidebar from '@/components/PackageSidebar.vue'
</script>

<template>
  <div class="page">
    <NavBar />
    <div class="page__body">
      <PackageHeader />
      <PackageTabs />
      <div class="page__main-area">
        <div class="page__content">
          <ReadmeContent />
        </div>
        <PackageSidebar />
      </div>
    </div>
  </div>
</template>

<style scoped>
.page {
  min-height: 100vh;
  background: #fff;
}

.page__body {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 32px;
}

.page__main-area {
  display: flex;
  gap: 32px;
}

.page__content {
  flex: 1;
  min-width: 0;
  border-right: 1px solid #e0e0e0;
  padding-right: 32px;
}
</style>
