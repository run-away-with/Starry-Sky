<template>
  <div class="home-container">
    <div class="header-wrapper">
      <HeaderNav />
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
      <!-- 1. 行星信息模块 -->
      <PlanetInformation />
      <!-- 2. 行星百科模块 -->
      <PlanetEncyclopedia />
    </div>
    <div class="side">
      <!-- 侧边栏：快速检索 -->
      <SearchBox />
      <!-- 其他侧边栏模块（科普工具/今日天文现象） -->
      <div class="science-tools">
        <h3 class="sidebar-title">
          <span class="title-icon">🛠️</span>
          科普工具
        </h3>
        <!-- 工具列表 -->
        <div class="tool-tabs">
          <div
            class="tool-tab"
            :class="{ active: activeTool === 'starMap' }"
            @click="activeTool = 'starMap'"
          >
            星图查询
          </div>
          <div
            class="tool-tab"
            :class="{ active: activeTool === 'unitConvert' }"
            @click="activeTool = 'unitConvert'"
          >
            单位换算
          </div>
          <div
            class="tool-tab"
            :class="{ active: activeTool === 'distanceCalc' }"
            @click="activeTool = 'distanceCalc'"
          >
            距离计算
          </div>
        </div>
        <!-- 工具内容区 -->
        <div class="tool-content">
          <!-- 1. 星图查询工具 -->
          <StarMap v-if="activeTool === 'starMap'" />
          <!-- 2. 天文单位换算工具 -->
          <UnitConvert v-if="activeTool === 'unitConvert'" />
          <!-- 3. 行星距离计算工具 -->
          <DistanceCalc v-if="activeTool === 'distanceCalc'" />
        </div>
      </div>
    </div>
    <div class="footer">
      <div class="footer-main">
        <!-- 左侧：品牌&简介 -->
        <div class="footer-brand">
          <h3 class="brand-name">
            <span class="brand-icon">🌍</span>
            行星百科
          </h3>
          <p class="brand-desc">
            专注于太阳系行星科普的公益性平台，致力于普及天文知识，探索宇宙奥秘。
          </p>
        </div>
        <!-- 中间：快速链接 -->
        <div class="link-group">
          <h4 class="link-title">科普资源</h4>
          <ul class="link-list">
            <li><a href="https://solarsystem.nasa.gov/">NASA 行星数据库</a></li>
            <li><a href="http://www.nao.cas.cn/">中国国家天文台</a></li>
            <li>
              <a href="https://interesting-sky.china-vo.org/">有趣天文奇观</a>
            </li>
            <li><a href="https://hubblesite.org/">行星高清影像库</a></li>
          </ul>
        </div>
        <!-- 订阅通知 -->
        <div class="footer-subscribe">
          <h4 class="subscribe-title">天文快讯订阅</h4>
          <p class="subscribe-desc">订阅我们的周刊，获取最新行星探索资讯</p>
          <div class="subscribe-form">
            <input
              type="email"
              placeholder="输入您的邮箱地址"
              class="subscribe-input"
            />
            <button class="subscribe-btn">订阅</button>
          </div>
          <p class="subscribe-tips">我们尊重您的隐私，不会发送垃圾邮件</p>
        </div>
      </div>
      <!-- 页脚底部 -->
      <div class="footer-bottom">
        <div class="bottom-left">
          © {{ currentYear }} 行星百科 All Rights Reserved.
          备案号:粤ICP备XXXXXXX号
        </div>
        <div class="bottom-right">
          <a href="#" class="bottom-link">隐私政策</a>
          <a href="#" class="bottom-link">用户协议</a>
          <a href="#" class="bottom-link">数据声明</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import PlanetEncyclopedia from '../components/PlanetEncyclopedia.vue';
  import PlanetInformation from '../components/PlanetInformation.vue';
  import SearchBox from '../components/SearchBox.vue';
  import StarMap from '../components/StarMap.vue';
  import UnitConvert from '../components/UnitConvert.vue';
  import DistanceCalc from '../components/DistanceCalc.vue';
  import { ref } from 'vue';

  // 科普工具核心变量
  const activeTool = ref('starMap'); // 默认激活星图查询

  // 获取年份
  const currentYear = ref(new Date().getFullYear());
</script>

<style scoped>
  .home-container {
    grid-column: 2;
    background-color: transparent;
    display: grid;
    grid-template-columns: 2fr 1fr;
    grid-template-rows: 500px auto auto;
    width: 100%;
    gap: 20px;
  }

  .header-wrapper {
    grid-row: 1;
    grid-column: 1/-1;
    position: relative;
    height: 100%;
    width: 100%;
  }

  .header-wrapper::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url(src/assets/solar-system-background.jpeg);
    background-size: cover;
    background-position: center;
    mask-image: linear-gradient(to bottom, black 70%, rgba(0, 0, 0, 0));
    -webkit-mask-image: linear-gradient(
      to bottom,
      black 70%,
      rgba(0, 0, 0, 0.1)
    );
    /* 伪元素层级低于导航栏 */
    z-index: 1;
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
    z-index: 2;
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
  }

  /* 侧边栏 */
  .side {
    grid-row: 3;
    grid-column: 2;
    max-width: 800px;
    position: sticky;

    background: linear-gradient(
      180deg,
      rgba(0, 0, 30, 0.9),
      rgba(0, 0, 50, 0.95)
    );
    border-radius: 12px;
    padding: 20px;
    /* 星点纹理：用渐变+背景图实现 */
    background-image:
      radial-gradient(circle, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(34, 34, 86, 0.9), rgba(0, 0, 40, 0.9));
    background-size:
      50px 50px,
      100% 100%; /* 星点间距+渐变覆盖 */
  }

  .sidebar-title {
    color: #fff;
    font-family: 'Orbitron', sans-serif;
    margin-bottom: 15px;
    font-size: 1.2em;
    display: flex;
    gap: 8px;
    position: relative;
    padding-bottom: 10px;
  }
  .sidebar-title::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 60px;
    height: 2px;
    background: linear-gradient(90deg, #ffd700, transparent);
  }
  .sidebar-title .title-icon {
    font-size: 1.4em;
  }

  /* 科普工具模块 */
  .science-tools {
    margin-bottom: 30px;
  }
  .tool-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .tool-item {
    padding: 10px 16px;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 8px;
    color: #fff;
    cursor: pointer;
    transition: all 0.3s ease;
    border-left: 3px solid transparent;
  }
  .tool-item:hover {
    background: rgba(255, 255, 255, 0.1);
    border-left-color: #ffd700;
    transform: translateX(3px);
  }

  /* 侧边栏滚动条美化 */
  .sidebar::-webkit-scrollbar {
    width: 6px;
  }
  .sidebar::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.2);
    border-radius: 3px;
  }
  .sidebar::-webkit-scrollbar-thumb {
    background: rgba(255, 215, 0, 0.5);
    border-radius: 3px;
  }
  .sidebar::-webkit-scrollbar-thumb:hover {
    background: #ffd700;
  }

  /* 科普工具样式 */
  .science-tools {
    margin-bottom: 30px;
  }

  /* 工具标签导航 */
  .tool-tabs {
    display: flex;
    gap: 8px;
    margin-bottom: 20px;
    flex-wrap: wrap;
  }
  .tool-tab {
    padding: 8px 16px;
    background: rgba(255, 255, 255, 0.05);
    color: rgba(255, 255, 255, 0.8);
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
    font-size: 0.95em;
  }
  .tool-tab.active {
    background: linear-gradient(135deg, #0059ff, #202631);
    color: #fff;
    box-shadow: 0 4px 10px rgba(41, 94, 191, 0.2);
  }
  .tool-tab:hover:not(.active) {
    background: rgba(255, 255, 255, 0.1);
    transform: translateY(-2px);
  }

  /* 工具内容区 */
  .tool-content {
    padding: 2px;
    border-radius: 12px;
    overflow: hidden;
  }

  .footer {
    grid-row: 4;
    grid-column: 1 / -1;

    background: linear-gradient(
      180deg,
      rgba(9, 48, 77, 0.95),
      rgba(0, 0, 10, 1)
    );
    color: rgba(255, 255, 255, 0.8);
    padding: 60px 20px 20px;
    position: relative;
    overflow: hidden;
    margin-top: 80px;
    font-family: 'Microsoft YaHei', sans-serif;
  }

  /* 页脚主体布局 */
  .footer-main {
    max-width: 1200px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 2fr 1fr 2fr;
    gap: 40px;
    position: relative;
    z-index: 1;
    margin-bottom: 40px;
  }

  /* 左侧品牌区域 */
  .footer-brand {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  .brand-name {
    font-family: 'Orbitron', sans-serif;
    font-size: 1.8em;
    color: #fff;
    margin: 0;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .brand-icon {
    font-size: 1.5em;
    animation: rotate 20s linear infinite;
  }
  @keyframes rotate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  .brand-desc {
    line-height: 1.6;
    color: rgba(255, 255, 255, 0.6);
    font-size: 0.95em;
  }
  /* 中间快速链接区域 */
  .footer-links {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
  }
  .link-group {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
  .link-title {
    color: #fff;
    font-size: 1.1em;
    font-weight: 600;
    margin: 0;
    position: relative;
    padding-bottom: 8px;
  }
  .link-title::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 30px;
    height: 2px;
    background: #ffd700;
  }
  .link-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .link-list li a {
    color: rgba(255, 255, 255, 0.6);
    text-decoration: none;
    transition: all 0.3s ease;
    font-size: 0.95em;
  }
  .link-list li a:hover {
    color: #ffd700;
    padding-left: 5px;
  }

  /* 右侧订阅区域 */
  .footer-subscribe {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
  .subscribe-title {
    color: #fff;
    font-size: 1.1em;
    font-weight: 600;
    margin: 0;
  }
  .subscribe-desc {
    color: rgba(255, 255, 255, 0.6);
    font-size: 0.95em;
    line-height: 1.5;
  }
  .subscribe-form {
    padding: 2px;
    display: flex;
    gap: 0;
    overflow: hidden;
  }
  .subscribe-input {
    flex: 1;
    max-width: 500px;
    padding: 12px 16px;
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.15);
    color: #fff;
    outline: none;
    font-size: 0.95em;
  }
  .subscribe-input::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
  .subscribe-input:focus {
    border-color: #ffd700;
    box-shadow: 0 0 0 2px rgba(255, 215, 0, 0.2);
  }
  .subscribe-btn {
    padding: 12px 20px;
    background: linear-gradient(135deg, #295ebf, #4a7bd8);
    color: #fff;
    border: none;
    cursor: pointer;
    transition: all 0.3s ease;
    font-weight: 600;
  }
  .subscribe-btn:hover {
    background: linear-gradient(135deg, #1e4b99, #295ebf);
    transform: translateY(-2px);
  }
  .subscribe-tips {
    font-size: 0.85em;
    color: rgba(255, 255, 255, 0.5);
    line-height: 1.4;
  }

  /* 页脚底部 */
  .footer-bottom {
    margin: 0 auto;
    padding-top: 20px;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    font-size: 0.9em;
    color: rgba(255, 255, 255, 0.5);
  }
  .bottom-left {
    line-height: 1.5;
  }
  .bottom-right {
    display: flex;
    gap: 20px;
  }
  .bottom-link {
    color: rgba(255, 255, 255, 0.5);
    text-decoration: none;
    transition: all 0.3s ease;
  }
  .bottom-link:hover {
    color: #ffd700;
  }

  /* 响应式适配 */
  /* 平板端 (768px - 1024px) */
  @media (max-width: 1024px) {
    .home-container {
      grid-column: 2;
      grid-template-columns: 1fr;
      grid-template-rows: 500px auto auto auto;
      justify-items: center;
    }
    .header-wrapper {
      grid-row: 1;
    }
    .main {
      grid-row: 2;
    }
    .side {
      grid-row: 3;
      grid-column: 1;
      width: 800px;
    }
    .footer {
      grid-row: 4;
    }
    .footer-main {
      grid-template-columns: 1fr 1fr;
      gap: 30px;
    }
    .footer-subscribe {
      grid-column: 1 / -1;
      width: 100%;
      margin: 0 auto;
    }
  }
  /* 移动端 (≤768px) */
  @media (max-width: 768px) {
    /* main部分 */
    .planet-information,
    .planet-encyclopedia {
      width: 500px;
    }
    /* 侧边 */
    .side {
      height: auto;
      position: static;
      margin-top: 20px;
      width: 500px;
    }
    .tool-tabs {
      flex-direction: column;
    }
    /* 页脚 */
    .footer-main {
      grid-template-columns: 1fr;
      gap: 40px;
    }
    .footer-subscribe {
      width: 100%;
    }
    .footer-bottom {
      flex-direction: column;
      gap: 15px;
      text-align: center;
    }
    .bottom-right {
      flex-wrap: wrap;
      justify-content: center;
    }
  }
</style>
