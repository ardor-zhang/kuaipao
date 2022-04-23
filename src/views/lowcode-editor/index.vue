<script setup lang="ts">
  import Header from './components/Header/index.vue';
  import LeftAside from './components/LeftAside';
  import RightAside from './components/RightAside/index.vue';
  import Editor from './components/Editor/index.vue';
</script>

<template>
  <el-container class="lowcode-editor-layout">
    <el-header height="80px" class="flex items-center shadow-md">
      <Header />
    </el-header>
    <el-container class="lowcode-editor-layout-container">
      <el-aside width="380px" class="shadow-lg">
        <LeftAside />
      </el-aside>

      <el-main class="p-0"><Editor /></el-main>

      <el-aside class="shadow-md">
        <RightAside />
      </el-aside>
    </el-container>
  </el-container>
</template>

<style scoped lang="scss">
  .lowcode-editor-layout {
    &-container {
      height: calc(100vh - 80px);
    }
  }
</style>
