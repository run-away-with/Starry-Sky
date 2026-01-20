<template>
  <!-- 父容器：占满整个屏幕，用于居中 -->
  <div class="carousel-center-wrapper">
    <!-- 3D 圆形轮转容器 -->
    <div
      class="carousel-3d-container"
      @mouseenter="stopAutoPlay"
      @mouseleave="startAutoPlay"
    >
      <!-- 3D 轮转核心容器（整体旋转） -->
      <div
        class="carousel-3d-wrapper"
        :style="{ transform: `rotateY(${rotateDeg}deg)` }"
      >
        <div
          v-for="(item, index) in planetList"
          :key="index"
          class="carousel-3d-item"
          :style="[
            getItemBaseStyle(index),
            { pointerEvents: isClickable(index) ? 'auto' : 'none' }
          ]"
          :class="{ 'active-item': isClickable(index) }"
          @click="handlePlanetClick(index)"
        >
          <img
            :src="item.img"
            :alt="item.name"
            class="carousel-3d-img"
            @error="handleImgError($event, item.name)"
          />
          <div class="planet-name">{{ item.name }}</div>
        </div>
      </div>

      <!-- 手动切换按钮 -->
      <button class="carousel-btn prev" @click="rotatePrev">←</button>
      <button class="carousel-btn next" @click="rotateNext">→</button>
    </div>
  </div>
</template>

<script setup>
  import { ref, computed, onMounted, onUnmounted } from 'vue';
  import { useRouter } from 'vue-router';
  import { planetList } from '../assets/planetdata.js';

  // 核心响应式变量
  const router = useRouter();
  const rotateDeg = ref(0); // 容器旋转角度
  const autoPlayTimer = ref(null); // 自动播放定时器
  const itemCount = computed(() => planetList.length); // 行星数量（9颗）
  const singleAngle = computed(() => 360 / itemCount.value); // 每颗行星的间隔角度（40°）
  const radiusZ = 500; // 圆形轨道半径
  // 判断行星是否可点击（位于正面±15范围内）
  const clickThreshold = 15;
  const isClickable = computed(() => index => {
    // 计算当前行星相对于容器旋转后的绝对角度
    const currentAngle = (index * singleAngle.value - rotateDeg.value) % 360;
    // 归一化角度到 [-180, 180] 范围，方便判断
    const normalizedAngle =
      currentAngle > 180 ? currentAngle - 360 : currentAngle;
    // 角度绝对值小于阈值 → 正中央 → 可点击
    return Math.abs(normalizedAngle) <= clickThreshold;
  });

  // 计算每颗行星的基础位置（固定分布在圆形轨道）
  const getItemBaseStyle = index => {
    const baseAngle = index * singleAngle.value;
    return {
      transform: `rotateY(${-baseAngle}deg) translateZ(${radiusZ}px)`,
      backfaceVisibility: 'hidden'
    };
  };

  // 行星图片点击事件
  const handlePlanetClick = index => {
    stopAutoPlay(); // 跳转前暂停轮转
    router.push({
      path: `/planet/${index}`
    });
  };

  // 单向旋转逻辑
  const rotateNext = () => {
    rotateDeg.value -= singleAngle.value;
  };
  const rotatePrev = () => {
    rotateDeg.value += singleAngle.value;
  };

  // 自动播放逻辑
  const startAutoPlay = () => {
    if (autoPlayTimer.value) clearInterval(autoPlayTimer.value);
    autoPlayTimer.value = setInterval(() => rotateNext(), 5000);
  };
  const stopAutoPlay = () => {
    if (autoPlayTimer.value) clearInterval(autoPlayTimer.value);
  };

  // 生命周期
  onMounted(() => startAutoPlay());
  onUnmounted(() => stopAutoPlay());
</script>

<style scoped>
  /* 全屏居中父容器 */
  .carousel-center-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: url('../assets/black-sky.jpg') no-repeat center center fixed;
    background-size: cover;
    overflow: hidden;
  }

  /* 3D 轮转容器 */
  .carousel-3d-container {
    width: 400px; /* 行星图片尺寸 */
    height: 400px;
    perspective: 2500px; /* 增大透视，适配9颗行星的3D效果 */
    position: relative;
    margin-bottom: 100px;
  }

  /* 3D 轮转核心容器 */
  .carousel-3d-wrapper {
    position: relative;
    width: 100%;
    height: 100%;
    transform-style: preserve-3d;
    transition: transform 1s cubic-bezier(0.25, 0.8, 0.25, 1);
  }

  /* 行星项样式 */
  .carousel-3d-item {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transform-origin: center;
  }

  /* 正中央可点击行星的高亮样式 */
  .active-item {
    cursor: pointer; /* 手型光标提示可点击 */
  }
  .active-item .carousel-3d-img {
    box-shadow:
      0 0 60px rgba(255, 255, 255, 0.8),
      inset 0 0 20px rgba(0, 0, 0, 0.5),
      0 200px 60px -80px rgba(0, 0, 0, 0.5);
    transform: scale(1.2); /* 中心图片放大突出 */
  }

  /* 行星图片样式 */
  .carousel-3d-img {
    width: 200px; /* 缩小图片尺寸*/
    height: 200px;
    border-radius: 50%; /* 圆形图片，适配行星外观 */
    object-fit: cover;
    box-shadow:
      0 0 40px rgba(255, 255, 255, 0.3),
      inset 0 0 20px rgba(0, 0, 0, 0.5),
      0 200px 60px -80px rgba(0, 0, 0, 0.5);
    transition: all 0.4s ease;
    border: 2px solid rgba(255, 255, 255, 0.5);
  }

  /* 行星名称样式 */
  .planet-name {
    margin-top: 20px;
    color: #fff;
    font-size: 18px;
    font-weight: bold;
    text-shadow: 0 0 10px #000;
    text-align: center;
  }
  .active-item .planet-name {
    color: #4fc3f7; /* 中心行星名称变色 */
  }

  /* 切换按钮样式 */
  .carousel-btn {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 70px;
    height: 70px;
    border: none;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.2);
    color: #fff;
    font-size: 28px;
    cursor: pointer;
    z-index: 10;
    transition: all 0.3s ease;
    backdrop-filter: blur(5px); /* 毛玻璃效果 */
  }
  .prev {
    left: -100px;
  }
  .next {
    right: -100px;
  }
  .carousel-btn:hover {
    background: rgba(255, 255, 255, 0.4);
    transform: translateY(-50%) scale(1.1);
  }
</style>
