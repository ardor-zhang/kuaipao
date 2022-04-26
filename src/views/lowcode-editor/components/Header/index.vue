<script setup lang="ts">
  import { onUnmounted } from 'vue';
  import { actions, bindKeybordEvent } from './actions';

  onUnmounted(() => {
    bindKeybordEvent();
  });
</script>

<template>
  <el-row class="header">
    <el-col :span="6" class="flex items-center">
      <div>logo</div>
    </el-col>
    <el-col :span="12" class="action flex justify-center items-center">
      <div
        v-for="(item, index) in actions"
        :key="index"
        class="action-item"
        @click="item.event"
      >
        <div class="icon" v-html="item.icon"></div>
        <div>{{ item.lable }}</div>
      </div>
    </el-col>
    <el-col :span="6" class="flex items-center"> info </el-col>
  </el-row>
</template>

<style lang="scss" scoped>
  @import './index.scss';
</style>
