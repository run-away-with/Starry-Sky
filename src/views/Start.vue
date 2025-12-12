<template>
  <div class="start-container">
    <!-- 星空粒子背景装饰 -->
    <div class="stars"></div>
    <div class="content-wrapper">
      <h1 class="title">欢迎来到星空探索应用</h1>
      <p class="subtitle">点击下方按钮开始您的旅程！</p>
      <button class="enter-btn" @click="goToHome">
        <span class="btn-text">开始探索</span>
        <span class="btn-icon">🚀</span>
      </button>
    </div>
    <!-- 渐变遮罩（增强层次感） -->
    <div class="overlay"></div>
  </div>
</template>

<script setup>
  import { useRouter } from 'vue-router';

  // 初始化路由实例
  const router = useRouter();

  // 点击按钮跳转至Home页面
  const goToHome = () => {
    router.push('/home');
  };
</script>

<style scoped>
  .start-container {
    grid-column: 1/4;
    margin: 0;
    padding: 0;

    background-image: url('src/assets/black-sky.jpg');
    background-repeat: no-repeat;
    /* 禁止重复 */
    background-position: center center;
    /* 居中显示 */
    background-size: cover;
    /* 等比缩放覆盖容器，溢出部分裁剪（不会超出屏幕） */
    background-attachment: local;
    /* 移动端适配，避免滚动异常 */

    /* 弹性布局，方便按钮定位 */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    overflow: hidden;
  }

  .stars {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: transparent;
    z-index: 1;
    /* 不影响点击 */
    pointer-events: none;
  }

  .stars::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background:
      radial-gradient(4px 4px at 20px 30px, #fff, transparent),
      radial-gradient(3px 3px at 40px 70px, #ffeb3b, transparent),
      radial-gradient(2px 2px at 50px 160px, #e0e8ff, transparent),
      radial-gradient(5px 5px at 90px 40px, #fff, transparent),
      radial-gradient(2px 2px at 130px 80px, #e0e8ff, transparent),
      radial-gradient(3px 3px at 180px 120px, #ffeb3b, transparent),
      radial-gradient(2px 2px at 70px 190px, #fff, transparent);
    /* 让星星图案重复平铺整个伪元素 */
    background-repeat: repeat;
    background-size: 250px 250px;
    animation: twinkle 3s linear infinite;
    opacity: 1;
  }

  .stars::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background:
      radial-gradient(1px 1px at 60px 100px, #fff, transparent),
      radial-gradient(2px 2px at 110px 150px, #e0e8ff, transparent),
      radial-gradient(1px 1px at 200px 80px, #ffeb3b, transparent),
      radial-gradient(2px 2px at 250px 150px, #fff, transparent);
    background-repeat: repeat;
    background-size: 200px 200px;
    animation: twinkle 5s linear infinite;
    animation-delay: 1s;
    opacity: 1;
  }

  /* 渐变遮罩（增强氛围） */
  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      to bottom,
      rgba(0, 0, 44, 0) 0%,
      rgba(0, 0, 50, 0.5) 50%,
      rgba(0, 0, 20, 0.9) 100%
    );
    z-index: 2; /* 低于内容，高于背景 */
  }

  .content-wrapper {
    position: relative;
    z-index: 3; /* 高于背景和遮罩 */
    text-align: center;
  }

  .title {
    /* 响应式字体，最小2.5rem,最大3.8rem，优先6vw */
    font-size: clamp(2.5rem, 6vw, 3.8rem);
    margin-bottom: 1.5rem;
    text-shadow:
      0 0 15px rgba(100, 150, 255, 1),
      2px 2px 4px rgba(0, 0, 0, 0.5);
    letter-spacing: 2px;
    font-weight: 700;
    background: linear-gradient(to right, #a8d8ff, #ffffff);
    background-clip: text;
    color: transparent; /* 渐变文字 */
    animation: fadeInUp 1s ease-out;
  }

  /* 副标题美化 */
  .subtitle {
    font-size: clamp(1.2rem, 3vw, 1.5rem);
    margin-bottom: 3rem;
    text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.8);
    color: #808594;
    line-height: 1.5;
    animation: fadeInUp 1s ease-out 0.3s both;
  }

  button.enter-btn {
    font-size: clamp(1rem, 2vw, 1.25rem);
    color: #ffffff;
    background: linear-gradient(135deg, #011aad 0%, #26d0ce 100%);
    border: none;
    border-radius: 50px; /* 圆角更圆润 */
    padding: 16px 40px;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow:
      0 4px 15px rgba(38, 208, 206, 0.3),
      inset 0 1px 0 rgba(255, 255, 255, 0.2);
    display: inline-flex;
    align-items: center;
    gap: 10px;
    font-weight: 600;
    letter-spacing: 1px;
    position: relative;
    overflow: hidden;
    /* 出场动画 */
    animation: fadeInUp 1s ease-out 0.6s both;
  }

  /* 按钮hover效果 */
  .enter-btn:hover {
    box-shadow:
      0 8px 20px rgba(38, 208, 206, 0.5),
      inset 0 1px 0 rgba(255, 255, 255, 0.3);
    background: linear-gradient(135deg, #152268 0%, #21b8b5 100%);
    /* 按钮放大 */
    scale: 1.05;
  }

  /* 按钮点击反馈 */
  .enter-btn:active {
    transform: translateY(1px);
    box-shadow:
      0 2px 10px rgba(38, 208, 206, 0.4),
      inset 0 1px 0 rgba(255, 255, 255, 0.2);
  }

  /* 按钮流光效果 */
  .enter-btn::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: linear-gradient(
      to right,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent
    );
    animation: shine 3s linear infinite;
  }

  /* 图标动效 */
  .btn-icon {
    transition: transform 0.3s ease;
  }

  .enter-btn:hover .btn-icon {
    transform: translateX(5px) rotate(10deg);
  }

  /* 动画定义 */
  /* 星星闪烁 */
  @keyframes twinkle {
    0%,
    100% {
      opacity: 0.8;
    }
    25% {
      opacity: 0.4;
    }
    50% {
      opacity: 0.1;
    }
    75% {
      opacity: 0.5;
    }
  }

  /* 内容渐入上移 */
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  /* 按钮流光 */
  @keyframes shine {
    0% {
      transform: translateX(-100%) rotate(45deg);
    }
    100% {
      transform: translateX(100%) rotate(45deg);
    }
  }

  /* 移动端适配优化 */
  @media (max-width: 768px) {
    .content-wrapper {
      padding: 0 15px;
    }

    .enter-btn {
      padding: 14px 30px;
    }
  }
</style>
