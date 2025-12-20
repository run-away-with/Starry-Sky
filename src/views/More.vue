<template>
  <div class="ring-wrap">
    <!-- 左箭头 -->
    <div class="arrow left" @click="prev">‹</div>

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
        >
          <img :src="planet.img" />

          <div class="info">
            <h2>{{ planet.name }}</h2>
            <p>{{ planet.type }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- 右箭头 -->
    <div class="arrow right" @click="next">›</div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { planetList } from '../assets/planetdata.js'

const current = ref(0)
let timer = null

/* 每个星球的角度 */
const angle = computed(() => 360 / planetList.length)

/* 切换 */
const prev = () => {
  current.value =
    (current.value - 1 + planetList.length) % planetList.length
}

const next = () => {
  current.value =
    (current.value + 1) % planetList.length
}

/* 自动旋转 */
onMounted(() => {
  timer = setInterval(() => {
    next()
  }, 3500)
})

onUnmounted(() => {
  clearInterval(timer)
})

/* 环形 + 椭圆轨道 */
const getItemStyle = (index) => {
  const offset =
    (index - current.value + planetList.length) % planetList.length

  const scale = offset === 0 ? 1.15 : 0.85
  const opacity = offset === 0 ? 1 : 0.35
  const z = offset === 0 ? 520 : 380

  return {
    transform: `
      rotateY(${index * angle.value}deg)
      translateZ(${z}px)
      scale(${scale})
    `,
    opacity
  }
}
</script>

<style scoped>
/* 容器 */
.ring-wrap {
  width: 100vw;
  height: 100vh;
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

/* 环（椭圆靠 transform-origin + Z 控制） */
.ring {
  position: relative;
  width: 700px;
  height: 420px;
  transform-style: preserve-3d;
  transition: transform 1s ease;
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
  transition: all 0.8s ease;
  filter: brightness(0.7);
}

/* 当前星球发光 */
.card.active {
  filter: brightness(1.15);
  box-shadow:
    0 0 30px rgba(120,180,255,.8),
    0 40px 80px rgba(0,0,0,.5);
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
  color: white;
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
  color: white;
  cursor: pointer;
  z-index: 10;
  user-select: none;
}

.arrow.left {
  left: 100px;
}

.arrow.right {
  right: 100px;
}
</style>
