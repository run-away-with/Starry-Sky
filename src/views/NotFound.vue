<template>
  <!-- 404页面模板 -->
  <div class="not-found-page">
    <h1>404 - 页面未找到</h1>
    <p>你访问的页面不存在或已被删除</p>
    <button class="back-home-btn" @click="goBackHome">返回首页</button>
  </div>
</template>

<script setup>
  import { useRouter } from 'vue-router';
  const router = useRouter();
  const goBackHome = () => {
    router.push({ name: 'Home' });
  };
</script>

<style>
  .not-found-page {
    grid-column: 2;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    font-size: 18px;
    color: #333;
  }

  .back-home-btn {
    margin-top: 20px;
    padding: 8px 20px;
    border: none;
    border-radius: 4px;
    background: #2196f3;
    color: #fff;
    cursor: pointer;
  }

  .back-home-btn:hover {
    background: #1976d2;
  }
</style>
