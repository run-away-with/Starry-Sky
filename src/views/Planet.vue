<template>
  <div class="planet-page" v-if="planet">
    <!-- 返回按钮 -->
    <button class="back-btn" @click="goBack">← Back</button>

    <div class="content">
      <!-- 左侧文字信息 -->
      <div class="info">
        <h1>{{ planet.name }}</h1>
        <h3>{{ planet.type }}</h3>
        <p class="desc">{{ planet.desc }}</p>

        <ul class="detail">
          <li><strong>直径：</strong>{{ planet.diameter }}</li>
          <li><strong>质量：</strong>{{ planet.mass }}</li>
          <li><strong>表面温度：</strong>{{ planet.surfaceTemperature }}</li>
          <li v-if="planet.orbitalPeriod">
            <strong>公转周期：</strong>{{ planet.orbitalPeriod }}
          </li>
          <li v-if="planet.rotationPeriod">
            <strong>自转周期：</strong>{{ planet.rotationPeriod }}
          </li>
          <li v-if="planet.composition">
            <strong>组成：</strong>{{ planet.composition }}
          </li>
          <li v-if="planet.feature">
            <strong>特征：</strong>{{ planet.feature }}
          </li>
        </ul>
      </div>

      <!-- 右侧图片 -->
      <div class="image">
        <img :src="planetImg" :alt="planet.name" />
      </div>
    </div>
  </div>

  <!-- 找不到时 -->
  <div v-else class="not-found">
    <p>未找到该星球</p>
    <button @click="goBack">返回 More</button>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {planetList} from '../assets/planetdata.js'

const route = useRoute()
const router = useRouter()

// ⚠️ 关键：把 id 当成数组下标
const index = Number(route.params.id)

// 直接通过下标取
const planet = computed(() => planetList[index])

// 处理图片路径（Vite）
const planetImg = computed(() => {
  if (!planet.value) return ''
  return new URL(`../assets/planets/${planet.value.img.split('/').pop()}`, import.meta.url).href
})

const goBack = () => {
  router.push('/more')
}
</script>

<style scoped>
.planet-page {
  min-height: 100vh;
  color: #fff;
  padding: 40px;
}

.back-btn {
  background: rgba(255,255,255,0.1);
  border: 1px solid #fff;
  color: #fff;
  padding: 6px 14px;
  border-radius: 20px;
  cursor: pointer;
}

.content {
  display: flex;
  gap: 150px;
  margin-top: 40px;
}

.info {
  width:800%;
}

.info h1 {
  font-size: 48px;
  margin-bottom: 10px;
}

.info h3 {
  opacity: 0.8;
  margin-bottom: 20px;
}

.desc {
  line-height: 1.8;
  margin-bottom: 30px;
}

.detail li {
  margin-bottom: 10px;
}

.image {
  width: 80%;
}

.image img {
  width: 4500%;
  border-radius: 30px;
  object-fit: cover;
}

.not-found {
  color: white;
  padding: 60px;
}
</style>
