<template>
  <div class="more-container">
    <!-- 将行星的照片全部列出，点击照片可以跳转至对应页面 -->
    <h1>更多行星信息</h1>
    <div class="planet-list">
      <div v-for="planet in planetList" :key="planet.id" class="planet-item">
        <img :src="planet.img" :alt="planet.name" class="planet-img" />
        <h3>{{ planet.name }}</h3>
      </div>
    </div>
  </div>
</template>

<script>
  import { planetList } from '../assets/planetdata.js';

  export default {
    data() {
      return {
        planetList
      };
    }
  };
</script>
