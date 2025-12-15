<template>
  <div class="home-container">
    <div class="header-wrapper">
      <!-- 仅首页显示的导航栏 -->
      <div class="home-nav">
        <ul>
          <li>
            <router-link to="/home">首页</router-link>
          </li>
          <li>
            <router-link to="/login">登录</router-link>
          </li>
          <li>
            <router-link to="/about">关于我们</router-link>
          </li>
          <li>
            <router-link to="/more">更多内容</router-link>
          </li>
        </ul>
      </div>
    </div>
    <div class="main">
      <div class="planet-information">
        <!-- 行星卡片 -->
        <h2 class="module-title">太阳系</h2>
        <div class="scroll-container">
          <div
            v-for="planet in planetList"
            :key="planet.name"
            class="planet-card"
            :style="{ backgroundImage: `url('${planet.img}')` }"
          >
            <div class="planet-basic">
              <h3 class="planet-name">{{ planet.name }}</h3>
              <p class="planet-type">{{ planet.type }}</p>
              <p class="planet-desc">{{ planet.desc }}</p>
            </div>
            <div class="planet-detail">
              <p>直径：{{ planet.diameter }}</p>
              <p>公转周期：{{ planet.orbitalPeriod }}</p>
            </div>
          </div>
        </div>
        <div class="scroll-controls">
          <button class="scroll-btn left" @click="scrollCard('left')">
            <p class="scroll-btn-left-icon">🚀</p>
          </button>
          <button class="scroll-btn right" @click="scrollCard('right')">
            <p class="scroll-btn-right-icon">🚀</p>
          </button>
        </div>
      </div>
      <!-- 2. 行星百科模块 -->
      <div class="planet-encyclopedia">
        <h2 class="module-title">
          <span class="title-icon">🪐</span>
          行星百科 Planetary Encyclopedia
        </h2>
        <div class="tab-nav">
          <div
            class="tab-item"
            :class="{ active: activeTab === 'terrestrial' }"
            @click="activeTab = 'terrestrial'"
          >
            🌍类地行星
          </div>
          <div
            class="tab-item"
            :class="{ active: activeTab === 'gas' }"
            @click="activeTab = 'gas'"
          >
            🪨气态巨行星
          </div>
          <div
            class="tab-item"
            :class="{ active: activeTab === 'ice' }"
            @click="activeTab = 'ice'"
          >
            ❄️冰巨行星
          </div>
          <div
            class="tab-item"
            :class="{ active: activeTab === 'star' }"
            @click="activeTab = 'star'"
          >
            ☀️恒星（太阳）
          </div>
        </div>
        <div class="tab-content">
          <!-- 类地行星内容 -->
          <div v-if="activeTab === 'terrestrial'" class="content-panel">
            <div
              v-for="item in terrestrialPlanets"
              :key="item.name"
              class="planet-item"
            >
              <div class="planet-header">
                <span class="planet-badge">类地行星</span>
                <h3 class="planet-name">{{ item.name }}</h3>
              </div>
              <p class="planet-desc">{{ item.desc }}</p>
              <div class="planet-meta">
                <div class="meta-item">
                  <span class="meta-label">直径：</span>
                  <span class="meta-value">{{ item.diameter }}</span>
                </div>
                <div class="meta-item">
                  <span class="meta-label">公转周期：</span>
                  <span class="meta-value">{{ item.orbitalPeriod }}</span>
                </div>
                <div class="meta-item">
                  <span class="meta-label">表面温度：</span>
                  <span class="meta-value">{{ item.surfaceTemperature }}</span>
                </div>
              </div>
            </div>
          </div>
          <!-- 气态巨行星 -->
          <div v-if="activeTab === 'gas'" class="content-panel">
            <div
              v-for="item in gasPlanets"
              :key="item.name"
              class="planet-item"
            >
              <div class="planet-header">
                <span class="planet-badge">气态巨行星</span>
                <h3 class="planet-name">{{ item.name }}</h3>
              </div>
              <p class="planet-desc">{{ item.desc }}</p>
              <div class="planet-meta">
                <div class="meta-item">
                  <span class="meta-label">直径：</span>
                  <span class="meta-value">{{ item.diameter }}</span>
                </div>
                <div class="meta-item">
                  <span class="meta-label">公转周期：</span>
                  <span class="meta-value">{{ item.orbitalPeriod }}</span>
                </div>
                <div class="meta-item">
                  <span class="meta-label">表面温度：</span>
                  <span class="meta-value">{{ item.surfaceTemperature }}</span>
                </div>
              </div>
            </div>
          </div>
          <!-- 冰巨行星 -->
          <div v-if="activeTab === 'ice'" class="content-panel">
            <div
              v-for="item in icePlanets"
              :key="item.name"
              class="planet-item"
            >
              <div class="planet-header">
                <span class="planet-badge">冰巨行星</span>
                <h3 class="planet-name">{{ item.name }}</h3>
              </div>
              <p class="planet-desc">{{ item.desc }}</p>
              <div class="planet-meta">
                <div class="meta-item">
                  <span class="meta-label">直径：</span>
                  <span class="meta-value">{{ item.diameter }}</span>
                </div>
                <div class="meta-item">
                  <span class="meta-label">公转周期：</span>
                  <span class="meta-value">{{ item.orbitalPeriod }}</span>
                </div>
                <div class="meta-item">
                  <span class="meta-label">表面温度：</span>
                  <span class="meta-value">{{ item.surfaceTemperature }}</span>
                </div>
              </div>
            </div>
          </div>
          <!-- 恒星（太阳） -->
          <div v-if="activeTab === 'star'" class="content-panel">
            <div v-for="item in starData" :key="item.name" class="star-card">
              <div class="planet-header">
                <span class="planet-badge">恒星</span>
                <h3 class="planet-name">{{ item.name }}</h3>
              </div>
              <p class="planet-desc">{{ item.desc }}</p>
              <div class="planet-meta">
                <div class="meta-item">
                  <span class="meta-label">直径：</span>
                  <span class="meta-value">{{ item.diameter }}</span>
                </div>
                <div class="meta-item">
                  <span class="meta-label">公转周期：</span>
                  <span class="meta-value">{{ item.orbitalPeriod }}</span>
                </div>
                <div class="meta-item">
                  <span class="meta-label">表面温度：</span>
                  <span class="meta-value">{{ item.surfaceTemperature }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="side">
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
          <div
            v-for="item in searchResult"
            :key="item.name"
            class="result-item"
          >
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
      <!-- 其他侧边栏模块（科普工具/今日天文现象） -->
      <div class="science-tools">
        <h3 class="sidebar-title">
          <span class="title-icon">🛠️</span>
          科普工具
        </h3>
        <!-- 工具列表 -->
        <div class="tool-tabs">
          <div
            class="tool-tab"
            :class="{ active: activeTool === 'starMap' }"
            @click="activeTool = 'starMap'"
          >
            星图查询
          </div>
          <div
            class="tool-tab"
            :class="{ active: activeTool === 'unitConvert' }"
            @click="activeTool = 'unitConvert'"
          >
            单位换算
          </div>
          <div
            class="tool-tab"
            :class="{ active: activeTool === 'distanceCalc' }"
            @click="activeTool = 'distanceCalc'"
          >
            距离计算
          </div>
        </div>
        <!-- 工具内容区 -->
        <div class="tool-content">
          <!-- 1. 星图查询工具 -->
          <div v-if="activeTool === 'starMap'" class="tool-panel">
            <div class="tool-form">
              <div class="form-item">
                <label class="form-label">查询日期</label>
                <input
                  v-model="starMapForm.date"
                  type="date"
                  class="form-input"
                />
              </div>
              <div class="form-item">
                <label class="form-label">观测地点</label>
                <select v-model="starMapForm.location" class="form-input">
                  <option value="beijing">北京</option>
                  <option value="shanghai">上海</option>
                  <option value="guangzhou">广州</option>
                  <option value="shenzhen">深圳</option>
                </select>
              </div>
              <button class="tool-btn" @click="queryStarMap">生成星图</button>
            </div>
            <!-- 星图结果 -->
            <div v-if="starMapResult" class="tool-result">
              <div class="result-title">
                🗺️ {{ starMapForm.location }} {{ starMapForm.date }} 星图
              </div>
              <div class="star-map-preview"></div>
              <p class="result-desc">
                观测提示：{{ starMapResult.tips }}
                <br />
                可见行星：{{ starMapResult.planets.join('、') }}
              </p>
            </div>
          </div>
          <!-- 2. 天文单位换算工具 -->
          <div v-if="activeTool === 'unitConvert'" class="tool-panel">
            <div class="tool-form">
              <div class="form-item">
                <label class="form-label">输入数值</label>
                <input
                  v-model="convertForm.value"
                  type="number"
                  class="form-input"
                  placeholder="请输入数值"
                />
              </div>
              <div class="form-item">
                <label class="form-label">换算类型</label>
                <select v-model="convertForm.type" class="form-input">
                  <option value="au2km">AU → 千米</option>
                  <option value="km2au">千米 → AU</option>
                  <option value="au2ly">AU → 光年</option>
                  <option value="ly2au">光年 → AU</option>
                </select>
              </div>
              <button class="tool-btn" @click="convertUnit">开始换算</button>
            </div>
            <!-- 换算结果 -->
            <div v-if="convertResult" class="tool-result">
              <div class="result-title">🔢 换算结果</div>
              <p class="result-value">{{ convertResult }}</p>
              <p class="result-desc">
                注:1AU = 1.496x10⁸千米 | 1光年 = 63241.1AU
              </p>
            </div>
          </div>
          <!-- 3. 行星距离计算工具 -->
          <div v-if="activeTool === 'distanceCalc'" class="tool-panel">
            <div class="tool-form">
              <div class="form-item">
                <label class="form-label">行星A</label>
                <select v-model="distanceForm.planetA" class="form-input">
                  <option
                    v-for="planet in planetList"
                    :key="planet.name"
                    :value="planet.name"
                  >
                    {{ planet.name }}
                  </option>
                </select>
              </div>
              <div class="form-item">
                <label class="form-label">行星B</label>
                <select v-model="distanceForm.planetB" class="form-input">
                  <option
                    v-for="planet in planetList"
                    :key="planet.name"
                    :value="planet.name"
                  >
                    {{ planet.name }}
                  </option>
                </select>
              </div>
              <button
                class="tool-btn"
                :disabled="distanceForm.planetA === distanceForm.planetB"
                @click="calcDistance"
              >
                计算距离
              </button>
            </div>
            <!-- 计算结果 -->
            <div v-if="distanceResult" class="tool-result">
              <div class="result-title">
                📏 {{ distanceForm.planetA }} ↔ {{ distanceForm.planetB }} 距离
              </div>
              <p class="result-value">
                {{ distanceResult.au }} AU ({{ distanceResult.km }})
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="footer">
      <div class="footer-main">
        <!-- 左侧：品牌&简介 -->
        <div class="footer-brand">
          <h3 class="brand-name">
            <span class="brand-icon">🌍</span>
            行星百科
          </h3>
          <p class="brand-desc">
            专注于太阳系行星科普的公益性平台，致力于普及天文知识，探索宇宙奥秘。
          </p>
        </div>
        <!-- 中间：快速链接 -->
        <div class="link-group">
          <h4 class="link-title">科普资源</h4>
          <ul class="link-list">
            <li><a href="#">NASA 行星数据库</a></li>
            <li><a href="#">中国国家天文台</a></li>
            <li><a href="#">天文观测指南</a></li>
            <li><a href="#">行星高清影像库</a></li>
          </ul>
        </div>
        <!-- 订阅通知 -->
        <div class="footer-subscribe">
          <h4 class="subscribe-title">天文快讯订阅</h4>
          <p class="subscribe-desc">订阅我们的周刊，获取最新行星探索资讯</p>
          <div class="subscribe-form">
            <input
              type="email"
              placeholder="输入您的邮箱地址"
              class="subscribe-input"
            />
            <button class="subscribe-btn">订阅</button>
          </div>
          <p class="subscribe-tips">我们尊重您的隐私，不会发送垃圾邮件</p>
        </div>
      </div>
      <!-- 页脚底部 -->
      <div class="footer-bottom">
        <div class="bottom-left">
          © {{ currentYear }} 行星百科 All Rights Reserved.
          备案号:粤ICP备XXXXXXX号
        </div>
        <div class="bottom-right">
          <a href="#" class="bottom-link">隐私政策</a>
          <a href="#" class="bottom-link">用户协议</a>
          <a href="#" class="bottom-link">数据声明</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { planetList } from '../assets/planetdata';
  import { ref, computed } from 'vue';

  // 平滑滚动容器
  const scrollStep = ref(300);
  function scrollCard(direction) {
    const container = document.querySelector('.scroll-container');
    const step = direction === 'left' ? -scrollStep.value : scrollStep.value;
    // 平滑滚动
    container.scrollBy({
      left: step,
      behavior: 'smooth'
    });
  }

  // 激活的标签
  const activeTab = ref('terrestrial');

  // 分类数据（基于planetList过滤，保证数据一致性）
  const terrestrialPlanets = computed(() => {
    return planetList.filter(item => item.type === '类地行星');
  });

  const gasPlanets = computed(() => {
    return planetList.filter(item => item.type === '气态巨行星');
  });

  const icePlanets = computed(() => {
    return planetList.filter(item => item.type === '冰巨行星');
  });

  const starData = computed(() => {
    return planetList.filter(item => item.type === '恒星');
  });

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

  // 科普工具核心变量
  const activeTool = ref('starMap'); // 默认激活星图查询

  // 1. 星图查询表单&结果
  const starMapForm = ref({
    date: new Date().toISOString().split('T')[0], // 默认今天
    location: 'beijing'
  });
  const starMapResult = ref(null);
  const queryStarMap = () => {
    // 模拟星图查询（实际可对接NASA/天文API）
    const locationTips = {
      beijing: '北京地区今晚可见木星、土星,观测时间20:00-22:00',
      shanghai: '上海地区今晚可见金星、火星,观测时间19:30-21:30',
      guangzhou: '广州地区今晚可见水星、木星,观测时间19:00-21:00',
      shenzhen: '深圳地区今晚可见火星、土星,观测时间19:15-21:15'
    };
    const planetList = {
      beijing: ['木星', '土星'],
      shanghai: ['金星', '火星'],
      guangzhou: ['水星', '木星'],
      shenzhen: ['火星', '土星']
    };
    starMapResult.value = {
      tips: locationTips[starMapForm.value.location],
      planets: planetList[starMapForm.value.location]
    };
  };

  // 2. 天文单位换算表单&结果
  const convertForm = ref({
    value: '',
    type: 'au2km'
  });
  const convertResult = ref(null);
  const convertUnit = () => {
    if (!convertForm.value.value) return;
    const value = Number(convertForm.value.value);
    const AU_TO_KM = 149600000; // 1AU=1.496×10⁸千米
    const LY_TO_AU = 63241.1; // 1光年=63241.1AU

    let result = '';
    switch (convertForm.value.type) {
      case 'au2km':
        result = `${value} AU = ${(value * AU_TO_KM).toExponential(3)} 千米`;
        break;
      case 'km2au':
        result = `${value} 千米 = ${(value / AU_TO_KM).toFixed(6)} AU`;
        break;
      case 'au2ly':
        result = `${value} AU = ${(value / LY_TO_AU).toFixed(6)} 光年`;
        break;
      case 'ly2au':
        result = `${value} 光年 = ${(value * LY_TO_AU).toFixed(2)} AU`;
        break;
    }
    convertResult.value = result;
  };

  // 3. 行星距离计算表单&结果（简化模型：基于行星到太阳的平均距离）
  const distanceForm = ref({
    planetA: '水星',
    planetB: '金星'
  });
  const distanceResult = ref(null);
  // 行星到太阳的平均距离（AU）
  const planetSunDistance = {
    太阳: 0,
    水星: 0.39,
    金星: 0.72,
    地球: 1.0,
    火星: 1.52,
    木星: 5.2,
    土星: 9.54,
    天王星: 19.22,
    海王星: 30.06
  };
  const calcDistance = () => {
    const distA = planetSunDistance[distanceForm.value.planetA];
    const distB = planetSunDistance[distanceForm.value.planetB];
    const auDistance = Math.abs(distA - distB).toFixed(2);
    const kmDistance = (auDistance * 149600000).toExponential(3) + ' 千米';

    distanceResult.value = {
      au: auDistance,
      km: kmDistance
    };
  };

  // 获取年份
  const currentYear = ref(new Date().getFullYear());
</script>

<style scoped>
  .home-container {
    grid-column: 2;
    background-color: transparent;
    display: grid;
    grid-template-columns: 2fr 1fr;
    grid-template-rows: 500px auto auto;
    width: 100%;
    gap: 20px;
  }

  .header-wrapper {
    grid-row: 1;
    grid-column: 1/-1;
    position: relative;
    height: 100%;
    width: 100%;
  }

  .header-wrapper::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url(src/assets/black-sky.jpg);
    background-size: cover;
    background-position: center;
    mask-image: linear-gradient(to bottom, black 70%, rgba(0, 0, 0, 0));
    -webkit-mask-image: linear-gradient(
      to bottom,
      black 70%,
      rgba(0, 0, 0, 0.1)
    );
    /* 伪元素层级低于导航栏 */
    z-index: 1;
  }

  .home-nav {
    position: absolute;
    bottom: 20px;
    left: 50%;

    transform: translateX(-50%);
    background-color: rgba(255, 255, 255, 0.15); /* 半透明白色*/
    backdrop-filter: blur(5px); /* 毛玻璃效果*/
    padding: 5px 40px;
    border-radius: 30px; /* 胶囊形圆角 */
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
    z-index: 2;
  }

  .home-nav ul {
    list-style-type: none;
    display: flex;
    gap: 30px;
  }

  .home-nav li {
    font-size: 1.2em;
    font-weight: 600;
    color: rgb(41, 94, 191);
    padding: 8px 16px;
    border-radius: 20px;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .home-nav li:hover {
    background-color: rgba(255, 215, 0, 0.2); /* 金色半透明 */
    color: #fff;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(255, 255, 255, 0.3);
  }

  .home-nav a {
    text-decoration: none;
    color: inherit;
  }

  .main {
    grid-row: 3;
    grid-column: 1;
  }

  /* 第一部分 */
  .planet-information,
  .planet-encyclopedia {
    width: 800px;
    padding: 20px;
    background: rgba(0, 0, 0, 0.3);
    border-radius: 16px;
    backdrop-filter: blur(5px);
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
  }

  .scroll-container {
    display: flex;
    gap: 25px;
    padding: 15px;
    overflow-x: auto;
    /* 平滑滑动（避免页面退回前进） */
    scroll-behavior: smooth;
    /* 隐藏原生滚动条 */
    scrollbar-width: none;
  }
  /* 隐藏Chrome/Safari滚动条 */
  .scroll-container::-webkit-scrollbar {
    display: none;
  }

  .planet-card {
    /* 防止单个卡片大小因为布局收缩或是放大 */
    flex: 0 0 280px;
    padding: 10px;
    height: 380px;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    border-radius: 16px;
    position: relative;
    overflow: hidden;
    cursor: pointer;
    transition: transform 0.3s ease;
  }

  .planet-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      to top,
      rgba(0, 0, 0, 0.5) 0%,
      rgba(0, 0, 0, 0) 100%
    );
  }

  .planet-name {
    font-size: 1.5em;
    font-weight: 600;
    color: #394e74;
    margin-bottom: 10px;
  }

  .planet-type {
    color: #72afc3;
    margin-bottom: 15px;
  }

  .planet-desc {
    color: #333;
    line-height: 1.5;
  }

  .planet-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  }

  .planet-detail {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 15px;
    background: rgba(255, 255, 255, 0.9);
    border-radius: 0 0 12px 12px;
    opacity: 0;
    transform: translateY(100%);
    transition: all 0.3s ease;
  }

  .planet-card:hover .planet-detail {
    opacity: 1;
    transform: translateY(0);
  }

  .scroll-btn-left-icon {
    transform: rotate(-90deg);
    transition: transform 0.3s ease;
  }

  .scroll-btn-right-icon {
    transition: transform 0.3s ease;
  }

  .scroll-controls {
    display: flex;
    justify-content: center;
    gap: 90px;
    margin-top: 15px;
  }
  .scroll-btn {
    padding: 8px 16px;
    background: #3267ca;
    color: #fff;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background 0.3s ease;
  }
  .scroll-btn:hover {
    background: #1e4b99;
  }
  .scroll-btn:hover .scroll-btn-left-icon {
    transform: translateX(-5px) rotate(-100deg);
  }
  .scroll-btn:hover .scroll-btn-right-icon {
    transform: translateX(5px) rotate(10deg);
  }

  /* 第二部分 */
  /* 模块标题美化 */
  .module-title {
    font-family: 'Orbitron', sans-serif;
    font-weight: 600;
    color: #295ebf;
    margin-bottom: 24px;
    font-size: 1.8em;
    position: relative;
    padding-left: 12px;
  }
  .module-title .title-icon {
    font-size: 1.5em;
  }
  .module-title::before {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 4px;
    height: 1.2em;
    background: linear-gradient(to bottom, #ffd700, #ff8c00);
    border-radius: 2px;
  }

  .tab-nav {
    display: flex;
    gap: 12px;
    margin-bottom: 30px;
    flex-wrap: wrap;
  }
  .tab-item {
    padding: 10px 24px;
    background: rgba(41, 94, 191, 0.1);
    color: #295ebf;
    border-radius: 28px;
    cursor: pointer;
    transition: all 0.3s ease;
    font-weight: 500;
    font-size: 1em;
    border: 1px solid transparent;
  }
  .tab-item:hover {
    background: rgba(41, 94, 191, 0.2);
    transform: translateY(-2px);
  }
  .tab-item.active {
    background: #295ebf;
    color: #fff;
    box-shadow: 0 4px 12px rgba(41, 94, 191, 0.2);
    border-color: #4a7bd8;
  }

  .tab-content {
    min-height: 300px;
  }
  .content-panel {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 20px;
  }

  .planet-item {
    padding: 20px;
    border-radius: 12px;
    background: linear-gradient(135deg, #6fdeff, #ffffff);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
    transition: all 0.3s ease;
    border: 1px solid rgba(0, 0, 0, 0.05);
  }
  .planet-item:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  }

  .star-card {
    grid-column: 1 / -1;
    padding: 20px;
    border-radius: 12px;
    background: linear-gradient(135deg, #e7c880, #a45555);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
    transition: all 0.3s ease;
    border: 1.4px solid #eade9c;
  }
  .star-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  }

  .planet-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
    padding-bottom: 12px;
    border-bottom: 1px dashed rgba(0, 0, 0, 0.08);
  }
  .planet-badge {
    padding: 4px 12px;
    border-radius: 16px;
    font-size: 0.8em;
    font-weight: 600;
    background: rgba(83, 136, 236, 0.1);
    color: #295ebf;
  }
  .planet-name {
    font-size: 1.6em;
    color: #1a3b70;
    font-weight: 700;
    margin: 0;
    font-family: 'Orbitron', sans-serif;
  }

  .planet-desc {
    color: #4b4a4a;
    line-height: 1.6;
    margin-bottom: 16px;
  }

  .planet-meta {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 8px;
    font-size: 0.9em;
  }

  .meta-item {
    display: flex;
    padding: 8px;
    flex-direction: column;
    background: rgba(0, 0, 0, 0.2);
    border-radius: 8px;
  }
  .meta-label {
    color: #7b6767;
    font-size: 0.85em;
    margin-bottom: 4px;
  }
  .meta-value {
    color: #333;
    font-weight: 500;
    font-family: 'Roboto Mono', monospace;
  }

  /* 侧边栏 */
  .side {
    grid-row: 3;
    grid-column: 2;
    max-width: 800px;
    position: sticky;

    background: linear-gradient(
      180deg,
      rgba(0, 0, 30, 0.9),
      rgba(0, 0, 50, 0.95)
    );
    border-radius: 12px;
    padding: 20px;
    /* 星点纹理：用渐变+背景图实现 */
    background-image:
      radial-gradient(circle, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(34, 34, 86, 0.9), rgba(0, 0, 40, 0.9));
    background-size:
      50px 50px,
      100% 100%; /* 星点间距+渐变覆盖 */
  }

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

  /* 科普工具模块 */
  .science-tools {
    margin-bottom: 30px;
  }
  .tool-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .tool-item {
    padding: 10px 16px;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 8px;
    color: #fff;
    cursor: pointer;
    transition: all 0.3s ease;
    border-left: 3px solid transparent;
  }
  .tool-item:hover {
    background: rgba(255, 255, 255, 0.1);
    border-left-color: #ffd700;
    transform: translateX(3px);
  }

  /* 侧边栏滚动条美化 */
  .sidebar::-webkit-scrollbar {
    width: 6px;
  }
  .sidebar::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.2);
    border-radius: 3px;
  }
  .sidebar::-webkit-scrollbar-thumb {
    background: rgba(255, 215, 0, 0.5);
    border-radius: 3px;
  }
  .sidebar::-webkit-scrollbar-thumb:hover {
    background: #ffd700;
  }

  /* 科普工具样式（核心新增） */
  .science-tools {
    margin-bottom: 30px;
  }

  /* 工具标签导航 */
  .tool-tabs {
    display: flex;
    gap: 8px;
    margin-bottom: 20px;
    flex-wrap: wrap;
  }
  .tool-tab {
    padding: 8px 16px;
    background: rgba(255, 255, 255, 0.05);
    color: rgba(255, 255, 255, 0.8);
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
    font-size: 0.95em;
  }
  .tool-tab.active {
    background: linear-gradient(135deg, #0059ff, #202631);
    color: #fff;
    box-shadow: 0 4px 10px rgba(41, 94, 191, 0.2);
  }
  .tool-tab:hover:not(.active) {
    background: rgba(255, 255, 255, 0.1);
    transform: translateY(-2px);
  }

  /* 工具内容区 */
  .tool-content {
    padding: 2px;
    border-radius: 12px;
    overflow: hidden;
  }
  .tool-panel {
    padding: 20px;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 10px;
  }

  /* 工具表单样式 */
  .tool-form {
    display: flex;
    flex-direction: column;
    gap: 15px;
    margin-bottom: 20px;
  }
  .form-item {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }
  .form-label {
    color: rgba(255, 255, 255, 0.8);
    font-size: 0.9em;
  }
  .form-input {
    padding: 10px 12px;
    background: rgba(255, 255, 255, 0.1);
    color: #000000;
    border: 1px solid rgba(255, 255, 255, 0.15);
    border-radius: 8px;
    outline: none;
    transition: all 0.3s ease;
  }
  .form-input:focus {
    border-color: rgba(255, 215, 0, 0.5);
    box-shadow: 0 0 0 2px rgba(255, 215, 0, 0.2);
  }
  .form-input::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }

  /* 工具按钮样式 */
  .tool-btn {
    padding: 10px 0;
    background: linear-gradient(135deg, #295ebf, #28344b);
    color: #fff;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
    font-weight: 600;
    margin-top: 5px;
  }
  .tool-btn:disabled {
    background: rgba(255, 255, 255, 0.1);
    cursor: not-allowed;
    color: rgba(255, 255, 255, 0.5);
  }
  .tool-btn:hover:not(:disabled) {
    background: linear-gradient(135deg, #1e4b99, #295ebf);
    transform: translateY(-2px);
    box-shadow: 0 4px 10px rgba(41, 94, 191, 0.2);
  }

  /* 工具结果样式 */
  .tool-result {
    padding: 15px;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 8px;
    border: 1px solid rgba(255, 255, 255, 0.1);
  }
  .result-title {
    color: #fff;
    font-weight: 600;
    font-size: 1em;
    margin-bottom: 10px;
  }
  .result-value {
    color: #ffd900;
    font-size: 1.1em;
    font-weight: 600;
    margin: 10px 0;
    font-family: 'Orbitron', sans-serif;
  }
  .result-desc {
    color: rgba(255, 255, 255, 0.7);
    font-size: 0.85em;
    line-height: 1.5;
    margin: 0;
  }

  /* 星图预览样式（模拟） */
  .star-map-preview {
    width: 100%;
    height: 120px;
    background: rgba(0, 0, 20, 0.8);
    border-radius: 6px;
    position: relative;
    margin: 10px 0;
    overflow: hidden;
  }
  .footer {
    grid-row: 4;
    grid-column: 1 / -1;

    background: linear-gradient(
      180deg,
      rgba(9, 48, 77, 0.95),
      rgba(0, 0, 10, 1)
    );
    color: rgba(255, 255, 255, 0.8);
    padding: 60px 20px 20px;
    position: relative;
    overflow: hidden;
    margin-top: 80px;
    font-family: 'Microsoft YaHei', sans-serif;
  }

  /* 页脚主体布局 */
  .footer-main {
    max-width: 1200px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 2fr 1fr 2fr;
    gap: 40px;
    position: relative;
    z-index: 1;
    margin-bottom: 40px;
  }

  /* 左侧品牌区域 */
  .footer-brand {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  .brand-name {
    font-family: 'Orbitron', sans-serif;
    font-size: 1.8em;
    color: #fff;
    margin: 0;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .brand-icon {
    font-size: 1.5em;
    animation: rotate 20s linear infinite;
  }
  @keyframes rotate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  .brand-desc {
    line-height: 1.6;
    color: rgba(255, 255, 255, 0.6);
    font-size: 0.95em;
  }
  /* 中间快速链接区域 */
  .footer-links {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
  }
  .link-group {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
  .link-title {
    color: #fff;
    font-size: 1.1em;
    font-weight: 600;
    margin: 0;
    position: relative;
    padding-bottom: 8px;
  }
  .link-title::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 30px;
    height: 2px;
    background: #ffd700;
  }
  .link-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .link-list li a {
    color: rgba(255, 255, 255, 0.6);
    text-decoration: none;
    transition: all 0.3s ease;
    font-size: 0.95em;
  }
  .link-list li a:hover {
    color: #ffd700;
    padding-left: 5px;
  }

  /* 右侧订阅区域 */
  .footer-subscribe {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
  .subscribe-title {
    color: #fff;
    font-size: 1.1em;
    font-weight: 600;
    margin: 0;
  }
  .subscribe-desc {
    color: rgba(255, 255, 255, 0.6);
    font-size: 0.95em;
    line-height: 1.5;
  }
  .subscribe-form {
    padding: 2px;
    display: flex;
    gap: 0;
    overflow: hidden;
  }
  .subscribe-input {
    flex: 1;
    max-width: 500px;
    padding: 12px 16px;
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.15);
    color: #fff;
    outline: none;
    font-size: 0.95em;
  }
  .subscribe-input::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
  .subscribe-input:focus {
    border-color: #ffd700;
    box-shadow: 0 0 0 2px rgba(255, 215, 0, 0.2);
  }
  .subscribe-btn {
    padding: 12px 20px;
    background: linear-gradient(135deg, #295ebf, #4a7bd8);
    color: #fff;
    border: none;
    cursor: pointer;
    transition: all 0.3s ease;
    font-weight: 600;
  }
  .subscribe-btn:hover {
    background: linear-gradient(135deg, #1e4b99, #295ebf);
    transform: translateY(-2px);
  }
  .subscribe-tips {
    font-size: 0.85em;
    color: rgba(255, 255, 255, 0.5);
    line-height: 1.4;
  }

  /* 页脚底部 */
  .footer-bottom {
    margin: 0 auto;
    padding-top: 20px;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    font-size: 0.9em;
    color: rgba(255, 255, 255, 0.5);
  }
  .bottom-left {
    line-height: 1.5;
  }
  .bottom-right {
    display: flex;
    gap: 20px;
  }
  .bottom-link {
    color: rgba(255, 255, 255, 0.5);
    text-decoration: none;
    transition: all 0.3s ease;
  }
  .bottom-link:hover {
    color: #ffd700;
  }

  /* 响应式适配 */
  /* 平板端 (768px - 1024px) */
  @media (max-width: 1024px) {
    .home-container {
      grid-column: 2;
      grid-template-columns: 1fr;
      grid-template-rows: 500px auto auto auto;
      justify-items: center;
    }
    .header-wrapper {
      grid-row: 1;
    }
    .main {
      grid-row: 2;
    }
    .side {
      grid-row: 3;
      grid-column: 1;
      width: 800px;
    }
    .footer {
      grid-row: 4;
    }
    .footer-main {
      grid-template-columns: 1fr 1fr;
      gap: 30px;
    }
    .footer-subscribe {
      grid-column: 1 / -1;
      width: 100%;
      margin: 0 auto;
    }
  }
  /* 移动端 (≤768px) */
  @media (max-width: 768px) {
    /* main部分 */
    .planet-information,
    .planet-encyclopedia {
      width: 500px;
    }
    /* 侧边 */
    .side {
      height: auto;
      position: static;
      margin-top: 20px;
      width: 500px;
    }
    .tool-tabs {
      flex-direction: column;
    }
    /* 页脚 */
    .footer-main {
      grid-template-columns: 1fr;
      gap: 40px;
    }
    .footer-subscribe {
      width: 100%;
    }
    .footer-bottom {
      flex-direction: column;
      gap: 15px;
      text-align: center;
    }
    .bottom-right {
      flex-wrap: wrap;
      justify-content: center;
    }
  }
</style>
