<template>
  <div v-if="currentPlanet" class="planet-detail">
    <!-- 返回首页按钮 -->
    <button @click="router.push('/')">返回首页</button>
    <!-- 渲染当前动物的内容 -->
    <h1>{{ currentPlanet.name }}</h1>
    <!-- <img :src="currentPlanet.img" :alt="currentPlanet.name" class="detail-img" /> -->
    <div class="detail-content">
      <p>{{ currentPlanet.desc }}</p>
      <p>
        <strong>栖息地：</strong>
        {{ currentPlanet.habitat }}
      </p>
    </div>
  </div>
  <!-- 无匹配动物时的提示 -->
  <div v-else class="not-found">
    <h1>未找到该行星信息</h1>
    <button @click="router.push('/')">返回首页</button>
  </div>
</template>

<script setup>
  import { useRoute, useRouter } from 'vue-router';
  import { ref, onMounted } from 'vue';
  import { planetList } from '../assets/planetdata.js';

  const route = useRoute();
  const router = useRouter();
  const currentPlanet = ref(null);

  // 页面加载时，根据路由参数匹配行星数据
  onMounted(() => {
    // 获取路由参数中的id（注意转成数字，和数据中的id类型一致）
    const planetId = Number(route.params.id);
    // 匹配对应行星数据
    currentPlanet.value = planetList.find(item => item.id === planetId);
  });
</script>

<style scoped>
  .planet-detail {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    text-align: center;
  }

  .detail-img {
    width: 400px;
    height: 300px;
    object-fit: cover;
    border-radius: 8px;
    margin: 20px 0;
  }

  .detail-content {
    text-align: left;
    line-height: 1.6;
  }

  .not-found {
    text-align: center;
    margin-top: 50px;
  }

  button {
    padding: 8px 16px;
    cursor: pointer;
    background-color: #42b983;
    color: white;
    border: none;
    border-radius: 4px;
  }
</style>
