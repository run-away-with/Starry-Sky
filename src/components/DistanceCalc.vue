<template>
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
</template>

<script setup>
  import { ref } from 'vue';
  import { planetList } from '../assets/planetdata.js';

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
</style>
