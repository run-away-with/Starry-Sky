<template>
  <h3 class="sidebar-title">
    <span class="title-icon">🔍</span>
    快速检索
  </h3>
  <div class="search-box">
    <input
      v-model="searchKey"
      type="text"
      placeholder="输入行星名称/类型..."
      class="search-input"
      @keyup.enter="searchPlanet"
      @input="handleInputChange"
    />
    <button class="search-btn" @click="searchPlanet">搜索</button>
    <div v-if="isSearched && searchResult.length" class="search-result">
      <div class="result-header">找到 {{ searchResult.length }} 个结果</div>
      <div v-for="item in searchResult" :key="item.name" class="result-item">
        <span class="result-icon" :class="getPlanetIcon(item.type)">
          {{ getPlanetIcon(item.type) }}
        </span>
        <div class="result-info">
          <h4 class="result-name">{{ item.name }}</h4>
          <span class="result-type">{{ item.type || '未知类型' }}</span>
        </div>
      </div>
    </div>
    <div v-else-if="isSearched && searchKey" class="empty-result">
      未找到相关行星，请重试～
    </div>
  </div>
</template>
<script setup>
  import { planetList } from '../assets/planetdata';
  import { ref } from 'vue';

  // 检索
  const searchKey = ref('');
  const searchResult = ref([]);
  // 默认没有进行检索
  const isSearched = ref(false);
  const searchPlanet = () => {
    // 标记为“已执行搜索”
    isSearched.value = true;
    if (!searchKey.value.trim()) {
      searchResult.value = [];
      return;
    }
    // 搜索逻辑：匹配planetList中名称/类型包含searchKey的项
    searchResult.value = planetList.filter(
      item =>
        item.name.includes(searchKey.value) ||
        item.type.includes(searchKey.value)
    );
  };

  const resetSearch = () => {
    searchKey.value = '';
    searchResult.value = [];
    isSearched.value = false;
  };

  const handleInputChange = () => {
    // 如果输入框内容为空，自动重置搜索状态
    if (!searchKey.value.trim()) {
      resetSearch();
    }
  };

  const getPlanetIcon = type => {
    switch (type) {
      case '类地行星':
        return '🌍';
      case '气态巨行星':
        return '🪨';
      case '冰巨行星':
        return '❄️';
      case '恒星':
        return '☀️';
      default:
        return '🪐';
    }
  };
</script>
<style scoped>
  .sidebar-title {
    color: #fff;
    font-family: 'Orbitron', sans-serif;
    margin-bottom: 15px;
    font-size: 1.2em;
    display: flex;
    gap: 8px;
    position: relative;
    padding-bottom: 10px;
  }
  .sidebar-title::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 60px;
    height: 2px;
    background: linear-gradient(90deg, #ffd700, transparent);
  }
  .sidebar-title .title-icon {
    font-size: 1.4em;
  }

  /* 搜索功能 */
  .quick-search,
  .science-tools {
    margin-bottom: 30px;
  }
  .search-box {
    padding: 5px;
    display: flex;
    flex-wrap: wrap;
    gap: 0;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  }
  .search-input {
    flex: 1;
    padding: 12px 10px;
    border: none;
    background: rgba(255, 255, 255, 0.1);
    color: #fff;
    font-size: 1em;
    outline: none;
    transition: all 0.3s ease;
    border: 1px solid transparent;
  }
  .search-input::placeholder {
    color: rgba(255, 255, 255, 0.6);
  }
  .search-input:focus {
    background: rgba(255, 255, 255, 0.15);
    border-color: rgba(234, 218, 127, 0.5);
    box-shadow: 0 0 0 2px rgba(255, 217, 0, 0.2);
  }
  .search-btn {
    padding: 12px 20px;
    background: linear-gradient(135deg, #295ebf, #4a7bd8);
    color: #fff;
    border: none;
    cursor: pointer;
    transition: all 0.3s ease;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 6px;
  }
  .search-btn:hover {
    background: linear-gradient(135deg, #1e4b99, #295ebf);
    transform: translateY(-1px);
  }

  .search-result {
    flex: auto;
    margin-top: 20px;
    border-radius: 10px;
    overflow: hidden;
  }
  .result-header {
    padding: 8px 12px;
    background: rgba(255, 255, 255, 0.05);
    color: rgba(255, 255, 255, 0.8);
    font-size: 0.9em;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }
  .result-item {
    padding: 12px 16px;
    background: rgba(255, 255, 255, 0.03);
    display: flex;
    align-items: center;
    gap: 12px;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  .result-item:hover {
    background: rgba(255, 255, 255, 0.08);
    transform: translateX(5px);
  }
  .result-icon {
    font-size: 1.4em;
    text-align: center;
  }
  .result-info {
    flex: 1;
  }
  .result-name {
    color: #fff;
    font-size: 1.1em;
    margin: 0;
    font-weight: 600;
  }
  .result-type {
    color: rgba(255, 255, 255, 0.6);
    font-size: 0.85em;
  }
  /* 空结果提示 */
  .empty-result {
    margin-top: 20px;
    padding: 12px;
    color: rgba(255, 255, 255, 0.6);
    font-size: 0.9em;
    text-align: center;
    background: rgba(255, 255, 255, 0.03);
    border-radius: 8px;
  }
</style>
