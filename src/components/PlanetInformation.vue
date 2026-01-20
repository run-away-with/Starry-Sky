<template>
  <div class="planet-information">
    <!-- 行星卡片 -->
    <h2 class="module-title">太阳系 Solar System</h2>
    <div class="scroll-container">
      <div
        v-for="planet in planetList"
        :key="planet.name"
        class="planet-card"
        :style="{ backgroundImage: `url('${planet.img}')` }"
      >
        <div class="planet-basic">
          <h3 class="planet-name">{{ planet.name }}</h3>
          <p class="planet-type">{{ planet.type }}</p>
          <p class="planet-desc">{{ planet.desc }}</p>
        </div>
        <div class="planet-detail">
          <p>直径：{{ planet.diameter }}</p>
          <p>公转周期：{{ planet.orbitalPeriod }}</p>
        </div>
      </div>
    </div>
    <div class="scroll-controls">
      <button class="scroll-btn left" @click="scrollCard('left')">
        <p class="scroll-btn-left-icon">🚀</p>
      </button>
      <button class="scroll-btn right" @click="scrollCard('right')">
        <p class="scroll-btn-right-icon">🚀</p>
      </button>
    </div>
  </div>
</template>

<script setup>
  import { planetList } from '../assets/planetdata';
  import { ref } from 'vue';

  // 平滑滚动容器
  const scrollStep = ref(300);
  function scrollCard(direction) {
    const container = document.querySelector('.scroll-container');
    const step = direction === 'left' ? -scrollStep.value : scrollStep.value;
    // 平滑滚动
    container.scrollBy({
      left: step,
      behavior: 'smooth'
    });
  }
</script>

<style scoped>
  .module-title {
    font-family: 'Orbitron', sans-serif;
    font-weight: 600;
    color: #295ebf;
    margin-bottom: 24px;
    font-size: 1.8em;
    position: relative;
    padding-left: 12px;
  }
  .module-title .title-icon {
    font-size: 1.5em;
  }
  .module-title::before {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 4px;
    height: 1.2em;
    background: linear-gradient(to bottom, #ffd700, #ff8c00);
    border-radius: 2px;
  }

  .planet-information {
    width: 800px;
    padding: 20px;
    background: rgba(0, 0, 0, 0.3);
    border-radius: 0px;
    backdrop-filter: blur(5px);
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
  }

  .scroll-container {
    display: flex;
    gap: 25px;
    padding: 15px;
    overflow-x: auto;
    /* 平滑滑动（避免页面退回前进） */
    scroll-behavior: smooth;
    /* 隐藏原生滚动条 */
    scrollbar-width: none;
  }
  /* 隐藏Chrome/Safari滚动条 */
  .scroll-container::-webkit-scrollbar {
    display: none;
  }

  .planet-card {
    /* 防止单个卡片大小因为布局收缩或是放大 */
    flex: 0 0 280px;
    padding: 10px;
    height: 380px;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    border-radius: 16px;
    position: relative;
    overflow: hidden;
    cursor: pointer;
    transition: transform 0.3s ease;
  }

  .planet-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      to top,
      rgba(0, 0, 0, 0.5) 0%,
      rgba(0, 0, 0, 0) 100%
    );
  }

  .planet-name {
    font-size: 1.5em;
    font-weight: 600;
    color: #394e74;
    margin-bottom: 10px;
  }

  .planet-type {
    color: #72afc3;
    margin-bottom: 15px;
  }

  .planet-desc {
    color: #333;
    line-height: 1.5;
  }

  .planet-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  }

  .planet-detail {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 15px;
    background: rgba(255, 255, 255, 0.9);
    border-radius: 0 0 12px 12px;
    opacity: 0;
    transform: translateY(100%);
    transition: all 0.3s ease;
  }

  .planet-card:hover .planet-detail {
    opacity: 1;
    transform: translateY(0);
  }

  .scroll-btn-left-icon {
    transform: rotate(-90deg);
    transition: transform 0.3s ease;
  }

  .scroll-btn-right-icon {
    transition: transform 0.3s ease;
  }

  .scroll-controls {
    display: flex;
    justify-content: center;
    gap: 90px;
    margin-top: 15px;
  }
  .scroll-btn {
    padding: 8px 16px;
    background: #3267ca;
    color: #fff;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background 0.3s ease;
  }
  .scroll-btn:hover {
    background: #1e4b99;
  }
  .scroll-btn:hover .scroll-btn-left-icon {
    transform: translateX(-5px) rotate(-100deg);
  }
  .scroll-btn:hover .scroll-btn-right-icon {
    transform: translateX(5px) rotate(10deg);
  }
</style>
