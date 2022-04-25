<script setup lang="ts">
  import { action } from './action';
</script>

<template>
  <el-row class="header">
    <el-col :span="6">
      <div>logo</div>
    </el-col>
    <el-col :span="12" class="action flex justify-center items-center">
      <div
        v-for="(item, index) in action"
        :key="index"
        class="action-item"
        @click="item.event"
      >
        <div class="icon" v-html="item.icon"></div>
        <div>{{ item.lable }}</div>
      </div>
    </el-col>
    <el-col :span="6"> info </el-col>
  </el-row>
</template>

<style lang="scss" scoped>
  @import './index.scss';
</style>
