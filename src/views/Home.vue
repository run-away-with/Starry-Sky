<template>
  <div class="home-container">
    <div class="header-wrapper">
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
    background-color: transparent;
    display: grid;
    grid-template-columns: auto auto;
    grid-template-rows: 500px auto auto auto;
    width: 100%;
    gap: 20px;
  }

  .header-wrapper {
    grid-row: 1;
    grid-column: 1/-1;
    position: relative;
    height: 100%;
  }

  .header {
    width: 100%;
    height: 100%;
    background-image: url(src/assets/black-sky.jpg);
    background-size: cover;
    /* 等比缩放覆盖容器，溢出部分裁剪（不会超出屏幕） */
    background-position: center;
    box-sizing: border-box;

    mask-image: linear-gradient(to bottom, black 70%, rgba(0, 0, 0, 0));
    -webkit-mask-image: linear-gradient(
      to bottom,
      black 70%,
      rgba(0, 0, 0, 0.1)
    );

    border-radius: 20px 20px 0 0;
  }

  .home-nav {
    position: absolute;
    bottom: 20px;
    left: 50%;

    transform: translateX(-50%);
    background-color: rgba(255, 255, 255, 0.15); /* 半透明白色*/
    backdrop-filter: blur(5px); /* 毛玻璃效果*/
    padding: 5px 40px;
    border-radius: 30px; /* 胶囊形圆角 */
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
  }

  .home-nav ul {
    list-style-type: none;
    display: flex;
    gap: 30px;
  }

  .home-nav li {
    font-size: 1.2em;
    font-weight: 600;
    color: rgb(41, 94, 191);
    padding: 8px 16px;
    border-radius: 20px;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .home-nav li:hover {
    background-color: rgba(255, 215, 0, 0.2); /* 金色半透明 */
    color: #fff;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(255, 255, 255, 0.3);
  }

  .home-nav a {
    text-decoration: none;
    color: inherit;
  }

  .main {
    grid-row: 3;
    grid-column: 1;

    background-color: lightgray;
  }

  .side {
    grid-row: 3;
    grid-column: 2;

    background-color: rgb(22, 66, 81);
  }

  .footer {
    grid-row: 4;
    grid-column: 1 / -1;

    background-color: darkgray;
  }
</style>
