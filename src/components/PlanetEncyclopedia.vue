<template>
  <div class="planet-encyclopedia">
    <h2 class="module-title">
      <span class="title-icon">🪐</span>
      行星百科 Planetary Encyclopedia
    </h2>
    <div class="tab-nav">
      <div
        class="tab-item"
        :class="{ active: activeTab === 'terrestrial' }"
        @click="activeTab = 'terrestrial'"
      >
        🌍类地行星
      </div>
      <div
        class="tab-item"
        :class="{ active: activeTab === 'gas' }"
        @click="activeTab = 'gas'"
      >
        🪨气态巨行星
      </div>
      <div
        class="tab-item"
        :class="{ active: activeTab === 'ice' }"
        @click="activeTab = 'ice'"
      >
        ❄️冰巨行星
      </div>
      <div
        class="tab-item"
        :class="{ active: activeTab === 'star' }"
        @click="activeTab = 'star'"
      >
        ☀️恒星（太阳）
      </div>
    </div>
    <div class="tab-content">
      <!-- 类地行星内容 -->
      <div v-if="activeTab === 'terrestrial'" class="content-panel">
        <div
          v-for="item in terrestrialPlanets"
          :key="item.name"
          class="planet-item"
        >
          <div class="planet-header">
            <span class="planet-badge">类地行星</span>
            <h3 class="planet-name">{{ item.name }}</h3>
          </div>
          <p class="planet-desc">{{ item.desc }}</p>
          <div class="planet-meta">
            <div class="meta-item">
              <span class="meta-label">直径：</span>
              <span class="meta-value">{{ item.diameter }}</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">公转周期：</span>
              <span class="meta-value">{{ item.orbitalPeriod }}</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">表面温度：</span>
              <span class="meta-value">{{ item.surfaceTemperature }}</span>
            </div>
          </div>
        </div>
      </div>
      <!-- 气态巨行星 -->
      <div v-if="activeTab === 'gas'" class="content-panel">
        <div v-for="item in gasPlanets" :key="item.name" class="planet-item">
          <div class="planet-header">
            <span class="planet-badge">气态巨行星</span>
            <h3 class="planet-name">{{ item.name }}</h3>
          </div>
          <p class="planet-desc">{{ item.desc }}</p>
          <div class="planet-meta">
            <div class="meta-item">
              <span class="meta-label">直径：</span>
              <span class="meta-value">{{ item.diameter }}</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">公转周期：</span>
              <span class="meta-value">{{ item.orbitalPeriod }}</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">表面温度：</span>
              <span class="meta-value">{{ item.surfaceTemperature }}</span>
            </div>
          </div>
        </div>
      </div>
      <!-- 冰巨行星 -->
      <div v-if="activeTab === 'ice'" class="content-panel">
        <div v-for="item in icePlanets" :key="item.name" class="planet-item">
          <div class="planet-header">
            <span class="planet-badge">冰巨行星</span>
            <h3 class="planet-name">{{ item.name }}</h3>
          </div>
          <p class="planet-desc">{{ item.desc }}</p>
          <div class="planet-meta">
            <div class="meta-item">
              <span class="meta-label">直径：</span>
              <span class="meta-value">{{ item.diameter }}</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">公转周期：</span>
              <span class="meta-value">{{ item.orbitalPeriod }}</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">表面温度：</span>
              <span class="meta-value">{{ item.surfaceTemperature }}</span>
            </div>
          </div>
        </div>
      </div>
      <!-- 恒星（太阳） -->
      <div v-if="activeTab === 'star'" class="content-panel">
        <div v-for="item in starData" :key="item.name" class="star-card">
          <div class="planet-header">
            <span class="planet-badge">恒星</span>
            <h3 class="planet-name">{{ item.name }}</h3>
          </div>
          <p class="planet-desc">{{ item.desc }}</p>
          <div class="planet-meta">
            <div class="meta-item">
              <span class="meta-label">直径：</span>
              <span class="meta-value">{{ item.diameter }}</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">公转周期：</span>
              <span class="meta-value">{{ item.orbitalPeriod }}</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">表面温度：</span>
              <span class="meta-value">{{ item.surfaceTemperature }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, computed } from 'vue';
  import { planetList } from '../assets/planetdata.js';

  // 激活的标签
  const activeTab = ref('terrestrial');

  // 分类数据（基于planetList过滤，保证数据一致性）
  const terrestrialPlanets = computed(() => {
    return planetList.filter(item => item.type === '类地行星');
  });

  const gasPlanets = computed(() => {
    return planetList.filter(item => item.type === '气态巨行星');
  });

  const icePlanets = computed(() => {
    return planetList.filter(item => item.type === '冰巨行星');
  });

  const starData = computed(() => {
    return planetList.filter(item => item.type === '恒星');
  });
</script>

<style scoped>
  .planet-encyclopedia {
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

  .tab-nav {
    display: flex;
    gap: 12px;
    margin-bottom: 30px;
    flex-wrap: wrap;
  }
  .tab-item {
    padding: 10px 24px;
    background: rgba(41, 94, 191, 0.1);
    color: #295ebf;
    border-radius: 28px;
    cursor: pointer;
    transition: all 0.3s ease;
    font-weight: 500;
    font-size: 1em;
    border: 1px solid transparent;
  }
  .tab-item:hover {
    background: rgba(41, 94, 191, 0.2);
    transform: translateY(-2px);
  }
  .tab-item.active {
    background: #295ebf;
    color: #fff;
    box-shadow: 0 4px 12px rgba(41, 94, 191, 0.2);
    border-color: #4a7bd8;
  }
  .tab-content {
    min-height: 300px;
  }

  .content-panel {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 20px;
  }

  .planet-item {
    padding: 20px;
    border-radius: 12px;
    background: linear-gradient(135deg, #6fdeff, #ffffff);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
    transition: all 0.3s ease;
    border: 1px solid rgba(0, 0, 0, 0.05);
  }
  .planet-item:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  }
  .star-card {
    grid-column: 1 / -1;
    padding: 20px;
    border-radius: 12px;
    background: linear-gradient(135deg, #e7c880, #a45555);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
    transition: all 0.3s ease;
    border: 1.4px solid #eade9c;
  }
  .star-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  }
  .planet-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
    padding-bottom: 12px;
    border-bottom: 1px dashed rgba(0, 0, 0, 0.08);
  }
  .planet-badge {
    padding: 4px 12px;
    border-radius: 16px;
    font-size: 0.8em;
    font-weight: 600;
    background: rgba(83, 136, 236, 0.1);
    color: #295ebf;
  }
  .planet-name {
    font-size: 1.6em;
    color: #1a3b70;
    font-weight: 700;
    margin: 0;
    font-family: 'Orbitron', sans-serif;
  }

  .planet-desc {
    color: #4b4a4a;
    line-height: 1.6;
    margin-bottom: 16px;
  }

  .planet-meta {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 8px;
    font-size: 0.9em;
  }

  .meta-item {
    display: flex;
    padding: 8px;
    flex-direction: column;
    background: rgba(0, 0, 0, 0.2);
    border-radius: 8px;
  }

  .meta-label {
    color: #7b6767;
    font-size: 0.85em;
    margin-bottom: 4px;
  }

  .meta-value {
    color: #333;
    font-weight: 500;
    font-family: 'Roboto Mono', monospace;
  }
</style>
