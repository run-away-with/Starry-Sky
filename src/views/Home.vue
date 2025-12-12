<template>
  <div class="home-container">
    <div class="header">
      <p>输入内容</p>
    </div>
    <!-- 仅首页显示的导航栏 -->
    <div class="home-nav">
      <ul>
        <li>
          <router-link to="/home">首页</router-link>
        </li>
        <li>
          <router-link to="/login">登录</router-link>
        </li>
        <li>
          <router-link to="/about">关于我们</router-link>
        </li>
        <li>
          <router-link to="/more">更多内容</router-link>
        </li>
      </ul>
    </div>
    <div class="main">
      <h1>添加主要内容</h1>
    </div>
    <div class="side">
      <h1>添加侧边栏内容</h1>
    </div>
    <div class="footer">
      <h1>添加内容</h1>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
  .home-container {
    grid-column: 2;
    background-color: black;
    display: grid;
    justify-items: center;
    grid-template-columns: auto auto;
    grid-template-rows: auto auto auto auto;
    gap: 10px;
  }

  .header {
    grid-row: 1;
    grid-column: 1 / span 2;

    background-image: url(/src/assets/starry-sky-background.jpg);
    background-size: cover;
    /* 等比缩放覆盖容器，溢出部分裁剪（不会超出屏幕） */
    width: 100%;
    height: 300px;

    padding: 0;
    margin: 0;
  }

  .home-nav {
    grid-row: 2;
    grid-column: 1 / span 2;

    height: auto;
    width: 100%;
  }

  .home-nav ul {
    list-style-type: none;
    padding: 0;
    display: flex;
    justify-content: center;
    gap: 20px;
  }

  .main {
    grid-row: 3;
    grid-column: 1;
  }

  .side {
    grid-row: 3;
    grid-column: 2;
  }

  .footer {
    grid-row: 4;
    grid-column: 1 / span 2;
  }
</style>
