<template>
  <div style="padding: 30px">
    <el-alert :closable="false" title="menu 1">
      <keep-alive>
        <router-view />
      </keep-alive>
    </el-alert>
  </div>
</template>
