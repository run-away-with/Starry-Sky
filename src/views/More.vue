<template>
  <div class="ring-wrap">
    <!-- 左箭头 -->
    <div class="arrow left" @click="handlePrev">‹</div>

    <!-- 3D 场景 -->
    <div class="scene">
      <div
        class="ring"
        :style="{ transform: `rotateY(${-current * angle}deg)` }"
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
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { planetList } from '../assets/planetdata.js'

/* ======================
   基础
====================== */
const router = useRouter()
const route = useRoute()

const current = ref(0)
const isAnimating = ref(false)
let timer = null

/* 每个星球之间的角度 */
const angle = computed(() => 360 / planetList.length)

/* ======================
   动画锁（防止连点 + 自动）
====================== */
const lock = () => {
  isAnimating.value = true
  setTimeout(() => {
    isAnimating.value = false
  }, 900)
}

/* 上一张 */
const handlePrev = () => {
  if (isAnimating.value) return
  lock()
  current.value =
    (current.value - 1 + planetList.length) % planetList.length
}

/* 下一张 */
const handleNext = () => {
  if (isAnimating.value) return
  lock()
  current.value = (current.value + 1) % planetList.length
}

/* ======================
   自动轮播
====================== */
const startAutoPlay = () => {
  stopAutoPlay()
  timer = setInterval(() => {
    handleNext()
  }, 3500)
}

const stopAutoPlay = () => {
  if (timer) {
    clearInterval(timer)
    timer = null
  }
}

/* ======================
   生命周期
====================== */
onMounted(() => {
  const index = Number(route.params.index)
  if (!Number.isNaN(index) && index >= 0 && index < planetList.length) {
    current.value = index
  }
  startAutoPlay()
})

onUnmounted(() => {
  stopAutoPlay()
})

/* ======================
   跳转 Planet 页面（关键）
====================== */
const goPlanet = (index) => {
  stopAutoPlay()
  router.push(`/planet/${index}`)
}

/* ======================
   3D 环样式
====================== */
const getItemStyle = (index) => {
  const offset =
    (index - current.value + planetList.length) % planetList.length

  const isActive = offset === 0

  return {
    transform: `
      rotateY(${index * angle.value}deg)
      translateZ(${isActive ? 520 : 360}px)
      scale(${isActive ? 1.15 : 0.85})
    `,
    opacity: isActive ? 1 : 0.35,
    pointerEvents: isActive ? 'auto' : 'none'
  }
}
</script>

<style scoped>
/* 页面容器 */
.ring-wrap {
  width: 100%;
  height: 100%;
  grid-column: 2;
  position: relative;
  overflow: hidden;
}

/* 3D 透视 */
.scene {
  width: 100%;
  height: 100%;
  perspective: 1800px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 环 */
.ring {
  position: relative;
  width: 700px;
  height: 420px;
  transform-style: preserve-3d;
  transition: transform 0.9s ease;
}

/* 星球卡片 */
.card {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 320px;
  height: 200px;
  margin: -100px -160px;
  border-radius: 18px;
  overflow: hidden;
  transform-style: preserve-3d;
  transition: all 0.9s ease;
  cursor: pointer;
}

/* 当前星球高亮 */
.card.active {
  box-shadow:
    0 0 30px rgba(120, 180, 255, 0.8),
    0 40px 80px rgba(0, 0, 0, 0.5);
}

/* 图片 */
.card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* 文本 */
.info {
  position: absolute;
  bottom: 14px;
  width: 100%;
  text-align: center;
  color: #fff;
}

.info h2 {
  font-size: 22px;
}

.info p {
  font-size: 13px;
  opacity: 0.8;
}

/* 箭头 */
.arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  font-size: 52px;
  color: #fff;
  cursor: pointer;
  z-index: 10;
  user-select: none;
}

.arrow.left {
  left: 80px;
}

.arrow.right {
  right: 80px;
}
</style>
