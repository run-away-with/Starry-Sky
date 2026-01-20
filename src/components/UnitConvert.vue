<template>
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
    <p class="result-desc">注:1AU = 1.496x10⁸千米 | 1光年 = 63241.1AU</p>
  </div>
</template>

<script setup>
  import { ref } from 'vue';

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
