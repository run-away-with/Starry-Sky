<template>
  <div class="ring-wrap">
    <div class="arrow left" @click="prev">‹</div>

    <div class="scene">
      <div
        class="ring"
        :style="{ transform: `rotateY(${rotateDeg}deg)` }"
      >
        <div
          v-for="(planet, index) in planetList"
          :key="planet.name"
          class="card"
          :class="{ active: index === visualIndex }"
          :style="getItemStyle(index)"
          @click="handleClick(index)"
        >
          <img :src="planet.img" />
          <div class="info">
            <h2>{{ planet.name }}</h2>
            <p>{{ planet.type }}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="arrow right" @click="next">›</div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { planetList } from '../assets/planetdata.js'

const router = useRouter()

/* 逻辑索引（可无限增长） */
const current = ref(0)

/* 动画锁 */
const isAnimating = ref(false)

/* 自动轮播 */
let timer = null

const angle = computed(() => 360 / planetList.length)

/* 当前可视索引（0 ~ length-1） */
const visualIndex = computed(() => {
  return ((current.value % planetList.length) + planetList.length) % planetList.length
})

const rotateDeg = computed(() => {
  return -current.value * angle.value
})

/* ===== 自动轮播 ===== */
const startAuto = () => {
  stopAuto()
  timer = setInterval(() => {
    next(true)
  }, 3500)
}

const stopAuto = () => {
  if (timer) {
    clearInterval(timer)
    timer = null
  }
}

/* ===== 切换核心 ===== */
const move = (step, isAuto = false) => {
  if (isAnimating.value) return

  if (!isAuto) stopAuto()

  isAnimating.value = true
  current.value += step

  setTimeout(() => {
    isAnimating.value = false
    if (!isAuto) startAuto()
  }, 1000)
}

const next = (isAuto = false) => move(1, isAuto)
const prev = () => move(-1)

/* ===== 点击 ===== */
const handleClick = (index) => {
  if (index !== visualIndex.value) return

  stopAuto()

  router.push(`/planet/${planetList[index].name}`)

  startAuto()
}

/* ===== 样式计算 ===== */
const getItemStyle = (index) => {
  let offset = index - visualIndex.value

  if (offset > planetList.length / 2) offset -= planetList.length
  if (offset < -planetList.length / 2) offset += planetList.length

  const scale = offset === 0 ? 1.2 : 0.85
  const opacity = Math.abs(offset) <= 2 ? 1 : 0.3
  const z = offset === 0 ? 520 : 380

  return {
    transform: `
      rotateY(${index * angle.value}deg)
      translateZ(${z}px)
      scale(${scale})
    `,
    opacity,
    zIndex: 10 - Math.abs(offset)
  }
}

onMounted(startAuto)
onUnmounted(stopAuto)
</script>

<style scoped>
.ring-wrap {
  width: 100vw;
  height: 100vh;
  position: relative;
  overflow: hidden;
}

.scene {
  width: 100%;
  height: 100%;
  perspective: 1800px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.ring {
  position: relative;
  width: 720px;
  height: 420px;
  transform-style: preserve-3d;
  transition: transform 1s ease;
}

.card {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 320px;
  height: 200px;
  margin: -100px -160px;
  border-radius: 18px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.8s ease;
  filter: brightness(0.7);
}

.card.active {
  filter: brightness(1.2);
  box-shadow:
    0 0 30px rgba(120,180,255,.8),
    0 40px 80px rgba(0,0,0,.5);
}

.card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.info {
  position: absolute;
  bottom: 14px;
  width: 100%;
  text-align: center;
  color: white;
}

.arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  font-size: 52px;
  color: white;
  cursor: pointer;
  z-index: 10;
}
.arrow.left { left: 100px; }
.arrow.right { right: 100px; }
</style>
