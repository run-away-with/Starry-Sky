<template>
  <div class="page-container">
    <h1 class="title">Solar System</h1>

    <div class="planet-grid">
      <div
        v-for="planet in planets"
        :key="planet.id"
        class="planet-card"
        @click="goToPlanet(planet.id)"
      >
        <!-- 轮播图 -->
        <div class="carousel">
          <img
            v-if="planetImages[planet.id]?.length"
            :src="planetImages[planet.id][currentIndexMap[planet.id]]"
            :alt="planet.name"
            class="planet-image"
          />

          <button class="nav prev" @click.stop="prev(planet.id)">‹</button>
          <button class="nav next" @click.stop="next(planet.id)">›</button>
          <button
            v-if="planetImages[planet.id]?.length > 1"
            class="nav prev"
            @click.stop="prev(planet.id)"
          >
            ‹
          </button>
          <button
            v-if="planetImages[planet.id]?.length > 1"
            class="nav next"
            @click.stop="next(planet.id)"
          >
            ›
          </button>
        </div>

        <h2 class="planet-name">{{ planet.name }}</h2>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { reactive } from 'vue';
  import { useRouter } from 'vue-router';
  import planetData from '@/data/planetdata.json';

  /* ======================
   原有逻辑
====================== */
  const router = useRouter();
  const planets = planetData;

  const goToPlanet = id => {
    router.push(`/planet/${id}`);
  };

  /* ======================
   自动读取 assets/planets
   目录结构要求：
   src/assets/planets/{id}/xxx.png
====================== */

  /**
   * 读取所有星球图片
   * 示例 key：
   * /src/assets/planets/earth/1.png
   */
  const rawImages = import.meta.glob('/src/assets/planets/*/*', {
    eager: true,
    import: 'default'
  });

  /**
   * 按星球 id 整理图片
   * {
   *   earth: [img1, img2],
   *   mars: [img1]
   * }
   */
  const planetImages = reactive({});

  planets.forEach(planet => {
    planetImages[planet.id] = Object.entries(rawImages)
      .filter(([path]) => path.includes(`/planets/${planet.id}/`))
      .map(([, img]) => img);
  });

  /* ======================
   轮播状态
/* ======================
   轮播控制
====================== */
  const currentIndexMap = reactive({});

  planets.forEach(planet => {
    currentIndexMap[planet.id] = 0;
  });

  const next = id => {
    const length = planetImages[id].length;
    currentIndexMap[id] = (currentIndexMap[id] + 1) % length;
  };

  const prev = id => {
    const length = planetImages[id].length;
    currentIndexMap[id] = (currentIndexMap[id] - 1 + length) % length;
  };
</script>

<style scoped>
  /* 页面容器 */
  .page-container {
    display: grid;
    grid-column: 2;
    background-color: white;
    padding: 32px;
    row-gap: 32px;
  }

  /* 标题 */
  .title {
    font-size: 36px;
    text-align: center;
  }

  /* 星球列表 */
  .planet-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: 32px;
  }

  /* 星球卡片 */
  .planet-card {
    display: grid;
    row-gap: 16px;
    justify-items: center;
    padding: 24px;
    background-color: #f6f6f6;
    border-radius: 18px;
    cursor: pointer;
    transition:
      transform 0.2s ease,
      box-shadow 0.2s ease;
  }

  .planet-card:hover {
    transform: translateY(-6px);
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
  }

  /* 轮播区域 */
  .carousel {
    position: relative;
    width: 100%;
    display: grid;
    justify-items: center;
  }

  /* 图片 */
  .planet-image {
    width: 100%;
    max-width: 180px;
    border-radius: 50%;
  }

  /* 左右按钮 */
  .nav {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: rgba(0, 0, 0, 0.55);
    color: white;
    border: none;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    font-size: 20px;
    cursor: pointer;
  }

  .prev {
    left: 0;
  }

  .next {
    right: 0;
  }

  /* 星球名 */
  .planet-name {
    font-size: 20px;
  }
</style>
