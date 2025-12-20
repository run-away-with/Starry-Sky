<template>
  <div class="container">
    <div class="carousel-3d">
      <button class="nav left" @click="prev">‹</button>

      <div class="stage">
        <div
          v-for="(planet, index) in planetList"
          :key="planet.name"
          class="card"
          :style="cardStyle(index)"
          @click="goPlanet(planet.name)"
        >
          <img :src="planet.img" />
          <h3>{{ planet.name }}</h3>
          <p>{{ planet.type }}</p>
        </div>
      </div>

      <button class="nav right" @click="next">›</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import planetList from '../assets/planetdata.js'

const router = useRouter()
const current = ref(0)

const next = () => {
  current.value = (current.value + 1) % planetList.length
}

const prev = () => {
  current.value =
    (current.value - 1 + planetList.length) % planetList.length
}

const cardStyle = (index) => {
  const offset = index - current.value
  return {
    transform: `
      translateX(${offset * 260}px)
      translateZ(${offset === 0 ? 200 : 0}px)
      rotateY(${offset * -18}deg)
    `,
    opacity: Math.abs(offset) > 2 ? 0 : 1,
    zIndex: 10 - Math.abs(offset)
  }
}

const goPlanet = (name) => {
  router.push(`/planet/${name}`)
}
</script>

<style scoped>
/* 整个页面背景 */
.container {
  width: 100vw;
  height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;

  background-image: url('../assets/starry-sky-background.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  overflow: hidden;
}

/* ⭐ 轮播整体：放大 2 倍 */
.carousel-3d {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  perspective: 1200px;

  transform: scale(1.5) translateX(-105px);        /* 🔥 关键：放大一倍 */
}

/* 舞台 */
.stage {
  position: relative;
  width: 600px;
  height: 360px;
  transform-style: preserve-3d;
}

/* 卡片 */
.card {
  position: absolute;
  left: 50%;
  top: 0;

  width: 220px;
  height: 320px;
  padding: 12px;

  background: rgba(0, 0, 0, 0.55);
  backdrop-filter: blur(6px);
  border-radius: 16px;

  text-align: center;
  color: #fff;
  cursor: pointer;

  transition: all 0.6s ease;
}

.card img {
  width: 100%;
  height: 200px;
  object-fit: contain;
}

.card h3 {
  margin: 8px 0 4px;
}

.card p {
  font-size: 14px;
  opacity: 0.8;
}

/* 左右按钮 */
.nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  font-size: 48px;

  background: none;
  border: none;
  color: white;
  cursor: pointer;

  z-index: 20;
}

.nav.left {
  left: 50px;
}

.nav.right {
  right: -150px;
}
</style>
