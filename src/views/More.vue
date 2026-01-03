<template>
  <div class="ring-wrap">
    <!-- 左箭头 -->
    <div class="arrow left" @click="handlePrev">‹</div>

    <!-- 3D 场景 -->
    <div class="scene">
      <div
        class="ring"
        :style="{ transform: `rotateY(${rotateYDeg}deg)` }"
      >
        <div
          v-for="(planet, index) in planetList"
          :key="planet.name"
          class="card"
          :class="{ active: index === current }"
          :style="getItemStyle(index)"
          @click="goPlanet(index)"
        >
          <img :src="planet.img" :alt="planet.name" />

          <div class="info">
            <h2>{{ planet.name }}</h2>
            <p>{{ planet.type }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- 右箭头 -->
    <div class="arrow right" @click="handleNext">›</div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { planetList } from '../assets/planetdata.js';

const router = useRouter();
const route = useRoute();

const current = ref(0);
const isAnimating = ref(false);

/* 累计旋转角度 */
const rotateYDeg = ref(0);

let timer = null;

/* 每个星球之间的角度 */
const angle = computed(() => 360 / planetList.length);

/* 动画锁 */
const lock = () => {
  isAnimating.value = true;
  setTimeout(() => {
    isAnimating.value = false;
  }, 900);
};

/* 上一张 */
const handlePrev = () => {
  if (isAnimating.value) return;
  lock();
  current.value =
    (current.value - 1 + planetList.length) % planetList.length;
  rotateYDeg.value += angle.value;
};

/* 下一张（顺时针旋转，包括最后一张 → 太阳） */
const handleNext = () => {
  if (isAnimating.value) return;
  lock();
  current.value = (current.value + 1) % planetList.length;
  rotateYDeg.value -= angle.value; // 始终向右
};

/* 自动轮播 */
const startAutoPlay = () => {
  stopAutoPlay();
  timer = setInterval(handleNext, 3500);
};

const stopAutoPlay = () => {
  if (timer) {
    clearInterval(timer);
    timer = null;
  }
};

/* 生命周期 */
onMounted(() => {
  const index = Number(route.params.index);
  if (!Number.isNaN(index) && index >= 0 && index < planetList.length) {
    current.value = index;
    rotateYDeg.value = -index * angle.value;
  }
  startAutoPlay();
});

onUnmounted(() => {
  stopAutoPlay();
});

/* 跳转 Planet 页面 */
const goPlanet = index => {
  stopAutoPlay();
  router.push(`/planet/${index}`);
};

/* 3D 环样式（保持原有阴影和大小） */
const getItemStyle = index => {
  const offset =
    (index - current.value + planetList.length) % planetList.length;

  const isActive = offset === 0;

  return {
    transform: `
      rotateY(${index * angle.value}deg)
      translateZ(${isActive ? 680 : 480}px)
      scale(${isActive ? 1.25 : 0.9})
    `,
    opacity: isActive ? 1 : 0.35,
    pointerEvents: isActive ? 'auto' : 'none'
  };
};
</script>

<style scoped>
.ring-wrap {
  width: 100%;
  height: 100%;
  grid-column: 2;
  position: relative;
  overflow: hidden;
}

.scene {
  width: 100%;
  height: 100%;
  perspective: 2400px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.ring {
  position: relative;
  width: 1000px;
  height: 600px;
  transform-style: preserve-3d;
  transition: transform 0.9s ease;
}

.card {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 420px;
  height: 260px;
  margin: -130px -210px;
  border-radius: 22px;
  overflow: hidden;
  transform-style: preserve-3d;
  transition: all 0.9s ease;
  cursor: pointer;
}

.card.active {
  box-shadow:
    0 0 40px rgba(120, 180, 255, 0.9),
    0 50px 100px rgba(0, 0, 0, 0.6);
}

.card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.info {
  position: absolute;
  bottom: 18px;
  width: 100%;
  text-align: center;
  color: #fff;
}

.info h2 {
  font-size: 26px;
}

.info p {
  font-size: 14px;
  opacity: 0.85;
}

.arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  font-size: 64px;
  color: #fff;
  cursor: pointer;
  z-index: 10;
  user-select: none;
}

.arrow.left {
  left: 60px;
}

.arrow.right {
  right: 60px;
}
</style>
