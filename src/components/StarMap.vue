<template>
  <div class="tool-form">
    <div class="form-item">
      <label class="form-label">查询日期</label>
      <input v-model="starMapForm.date" type="date" class="form-input" />
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
</template>

<script setup>
  import { ref } from 'vue';
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
</script>

<style scoped>
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
</style>
