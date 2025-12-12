<template>
  <div class="start-container">
    <h1>欢迎来到星空探索应用</h1>
    <p>点击下方按钮开始您的旅程！</p>
    <button class="enter-btn" @click="goToHome">开始探索</button>
  </div>
</template>

<script setup>
  import { useRouter } from 'vue-router';

  // 初始化路由实例
  const router = useRouter();

  // 点击按钮跳转至Home页面
  const goToHome = () => {
    router.push('/home');
  };
</script>

<style scoped>
  .start-container {
    grid-column: 1/4;
    margin: 0;
    padding: 0;

    background-image: url('src/assets/starry-sky-background.jpg');
    background-repeat: no-repeat;
    /* 禁止重复 */
    background-position: center center;
    /* 居中显示 */
    background-size: cover;
    /* 等比缩放覆盖容器，溢出部分裁剪（不会超出屏幕） */
    background-attachment: local;
    /* 移动端适配，避免滚动异常 */

    /* 弹性布局，方便按钮定位 */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
</style>
