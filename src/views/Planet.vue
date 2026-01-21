<template>
  <div v-if="planet" class="planet-page">
    <HeaderNav />
    <!-- 返回按钮 -->
    <button class="back-btn" @click="goBack">← Back</button>

    <div class="content">
      <!-- 左侧图片 -->
      <div class="image">
        <img :src="planetImg" :alt="planet.name" />
      </div>

      <!-- 右侧文字信息 -->
      <div class="info">
        <h1>{{ planet.name }}</h1>
        <h3>{{ planet.type }}</h3>
        <p class="desc">{{ planet.desc }}</p>

        <ul class="detail">
          <li>
            <strong>直径：</strong>
            {{ planet.diameter }}
          </li>
          <li>
            <strong>质量：</strong>
            {{ planet.mass }}
          </li>
          <li>
            <strong>表面温度：</strong>
            {{ planet.surfaceTemperature }}
          </li>
          <li v-if="planet.orbitalPeriod">
            <strong>公转周期：</strong>
            {{ planet.orbitalPeriod }}
          </li>
          <li v-if="planet.rotationPeriod">
            <strong>自转周期：</strong>
            {{ planet.rotationPeriod }}
          </li>
          <li v-if="planet.composition">
            <strong>组成：</strong>
            {{ planet.composition }}
          </li>
          <li v-if="planet.feature">
            <strong>特征：</strong>
            {{ planet.feature }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { computed } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { planetList } from '../assets/planetdata.js';

  const route = useRoute();
  const router = useRouter();

  // 把 id 当成数组下标
  const index = Number(route.params.id);

  // 直接通过下标取
  const planet = computed(() => planetList[index]);

  // 处理图片路径（Vite）
  const planetImg = computed(() => {
    if (!planet.value) return '';
    return new URL(
      `../assets/planets/${planet.value.img.split('/').pop()}`,
      import.meta.url
    ).href;
  });

  const goBack = () => {
    router.push('/more');
  };
</script>

<style scoped>
  .planet-page {
    grid-column: 1/4;
    min-height: 100vh;
    color: #fff;
    padding: 40px;
    box-sizing: border-box;
  }

  .back-btn {
    margin-top: 40px;
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid #fff;
    color: #fff;
    padding: 6px 14px;
    border-radius: 20px;
    cursor: pointer;
    position: relative;
    z-index: 10;
  }

  .back-btn:hover {
    background: rgba(255, 255, 255, 0.2);
    transition: background 0.3s ease;
  }

  .content {
    display: flex;
    gap: 60px; /* 调整间距，更合理 */
    margin-top: 60px;
    align-items: flex-start; /* 顶部对齐，避免内容错位 */
    max-width: 1600px;
    margin-left: auto;
    margin-right: auto; /* 水平居中 */
  }

  .image {
    flex-shrink: 0; /* 防止图片容器被压缩 */
    width: 600px; /* 固定宽度，防止过大或过小 */
  }

  .image img {
    width: 100%; /* 图片填满容器 */
    height: auto; /* 保持图片比例 */
    object-fit: cover;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5); /* 添加阴影，提升视觉效果 */
  }

  .info {
    flex: 1; /* 占满剩余宽度 */
    min-width: 400px; /* 最小宽度，保证小屏幕下可读性 */
    /* 磨砂玻璃+渐变背景 */
    background: linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.05) 0%,
      rgba(255, 255, 255, 0.02) 100%
    );
    /* 磨砂效果 */
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    /* 精致边框 */
    border: 1px solid rgba(255, 255, 255, 0.1);
    /* 圆角+阴影 */
    border-radius: 24px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
    /* 内边距 */
    padding: 40px;
    box-sizing: border-box;
  }

  .info h1 {
    font-size: 48px;
    margin-bottom: 10px;
    text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  }

  .info h3 {
    opacity: 0.8;
    margin-bottom: 20px;
    font-size: 24px;
    color: #a8d8ff;
  }

  .desc {
    line-height: 1.8;
    margin-bottom: 30px;
    font-size: 16px;
    color: #e0e0e0;
  }

  .detail {
    list-style: none;
    padding: 0;
  }

  .detail li {
    margin-bottom: 15px;
    font-size: 16px;
    line-height: 1.6;
  }

  .detail li strong {
    color: #ffffff;
    display: inline-block;
    width: 100px; /* 固定标签宽度，排版更整齐 */
  }

  /* 移动端适配：屏幕小于1000px时改为上下排列 */
  @media (max-width: 1000px) {
    .content {
      flex-direction: column;
      gap: 40px;
      padding: 0 20px;
    }

    .image {
      width: 100%; /* 移动端图片占满宽度 */
      max-width: 600px; /* 最大宽度不变 */
      margin: 0 auto; /* 图片居中 */
    }

    .info {
      min-width: unset; /* 取消最小宽度限制 */
      width: 100%;
      padding: 30px 20px;
    }

    .info h1 {
      font-size: 36px;
    }
  }
</style>
