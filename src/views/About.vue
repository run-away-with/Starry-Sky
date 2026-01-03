<template>
  <div class="about-us">
    <!-- 团队介绍部分 -->
    <section class="team-section">
      <!-- 调整标题样式类名+文案，匹配导航栏风格 -->
      <h2 class="section-title">我们的团队</h2>
      <div class="team-cards">
        <!-- 5名团队成员卡片 -->
        <div
          v-for="(member, index) in teamMembers"
          :key="index"
          class="team-card"
        >
          <div class="card-avatar">
            <img
              :src="`/src/assets/team/member${index + 1}.png`"
              :alt="member.name"
            />
          </div>
          <h3 class="card-name">{{ member.name }}</h3>
          <p class="card-role">{{ member.role }}</p>
          <p class="card-desc">{{ member.desc }}</p>
        </div>
      </div>
    </section>

    <!-- 联系+留言 同排容器（1:1等宽） -->
    <section class="contact-wrap">
      <!-- 调整标题样式类名+文案，匹配导航栏风格 -->
      <h2 class="section-title">联系我们</h2>
      <div class="contact-content">
        <!-- 联系我们部分：占50%宽度 -->
        <div class="contact-info">
          <div class="contact-item">
            <span class="item-label">邮箱：</span>
            <span class="item-value">xxxxx</span>
          </div>
          <div class="contact-item">
            <span class="item-label">电话：</span>
            <span class="item-value">xxxxx</span>
          </div>
          <div class="contact-item">
            <span class="item-label">地址：</span>
            <span class="item-value">xxxxx</span>
          </div>
          <div class="contact-item">
            <span class="item-label">微信公众号：</span>
            <span class="item-value">xxxxx</span>
          </div>
        </div>

        <!-- 留言咨询部分：占50%宽度 -->
        <div class="contact-form">
          <!-- 调整子标题样式，匹配导航栏的浅色+发光风格 -->
          <h3 class="form-title">留言咨询</h3>
          <form @submit.prevent="handleSubmit">
            <div class="form-group">
              <label for="name">姓名：</label>
              <input
                id="name"
                v-model="formData.name"
                type="text"
                placeholder="请输入您的姓名"
                required
              />
            </div>
            <div class="form-group">
              <label for="email">邮箱：</label>
              <input
                id="email"
                v-model="formData.email"
                type="email"
                placeholder="请输入您的邮箱"
                required
              />
            </div>
            <div class="form-group">
              <label for="message">留言内容：</label>
              <textarea
                id="message"
                v-model="formData.message"
                rows="4"
                placeholder="请输入您想咨询的内容"
                required
              ></textarea>
            </div>
            <button type="submit" class="submit-btn">提交</button>
          </form>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
  import { ref } from 'vue';

  // 5人团队数据（补充desc字段，完善信息）
  const teamMembers = ref([
    {
      name: '徐安',
      role: '组长',
    
    },
    {
      name: '王冠清',
      role: '组员',
     
    },
    {
      name: '王沐阳',
      role: '组员',
     
    },
    {
      name: '王睿毅',
      role: '组员',
    
    },
    {
      name: '朱卫东',
      role: '组员',
    
    }
  ]);

  // 表单数据（统一代码规范：单引号、分号结尾）
  const formData = ref({
    name: '',
    email: '',
    message: ''
  });

  // 表单提交处理
  const handleSubmit = () => {
    alert(
      `感谢${formData.value.name}的留言，我们会尽快通过${formData.value.email}回复您！`
    );
    // 重置表单
    formData.value = { name: '', email: '', message: '' };
  };
</script>

<style scoped>
  /* 全局重置：统一盒模型 */
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  /* 根容器：全屏背景，自适应内容高度（修复overflow:hidden导致的内容截断） */
  .about-us {
    display: grid;
    gap: 3rem;
    padding: 2rem 1.5rem 2rem 1.5rem; /* 适配固定导航栏，增加顶部内边距 */
    padding-top: 80px; /* 给顶部固定导航栏留出空间 */
    min-height: 100vh; /* 最小高度占满视口，内容超出时自动扩展 */
    width: 100vw;
    max-width: 100vw;
    margin: 0;
    background-color: #1a2435;
    overflow-x: hidden; /* 仅隐藏横向滚动，纵向允许滚动 */
    align-content: start; /* 内容从上到下排列，避免居中导致的截断 */
  }

  /* 标题样式：匹配导航栏的蓝色发光风格 + 居中+白色 */
  .section-title {
    font-size: 2rem;
    color: #64b5f6; /* 匹配导航栏主色调 */
    text-shadow: 0 0 10px rgba(100, 181, 246, 0.8); /* 增加导航栏同款发光效果 */
    margin: 0 auto 1.5rem;
    border-bottom: 2px solid #64b5f6;
    padding-bottom: 0.5rem;
    display: block;
    text-align: center;
    width: fit-content;
    font-weight: 600;
    transition: color 0.3s ease;
  }

  /* 标题hover效果，匹配导航栏交互 */
  .section-title:hover {
    color: #90caf9;
  }

  /* 团队部分：适配布局 */
  .team-section {
    display: grid;
    place-items: center;
    gap: 1rem;
    width: 100%;
    padding: 0;
  }

  .team-cards {
    display: flex;
    justify-content: center;
    align-items: stretch;
    gap: 0.8rem;
    width: 100%;
    max-width: 100%;
    flex-wrap: wrap;
  }

  .team-card {
    flex: 1;
    min-width: 120px;
    max-width: 180px;
    background-color: #ffffff;
    padding: 1rem 0.8rem;
    border-radius: 10px;
    text-align: center;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.15);
    transition: transform 0.3s ease;
  }

  .team-card:hover {
    transform: translateY(-6px);
  }

  .card-avatar img {
    width: 70px;
    height: 70px;
    border-radius: 50%;
    object-fit: cover;
    margin-bottom: 0.8rem;
    border: 3px solid #64b5f6; /* 匹配导航栏主色调 */
  }

  /* 团队卡片文字样式 */
  .card-name {
    font-size: 1rem;
    color: #000000;
    margin-bottom: 0.5rem;
    font-weight: 600;
  }

  .card-role {
    color: #64b5f6; /* 角色文字用主色调突出 */
    font-weight: 500;
    margin-bottom: 0.6rem;
    font-size: 0.9rem;
  }

  .card-desc {
    color: #666666;
    line-height: 1.5;
    font-size: 0.8rem;
  }

  /* 联系部分布局 */
  .contact-wrap {
    width: 100%;
    display: grid;
    gap: 1rem;
    padding: 0;
  }

  /* 核心：1:1等宽布局 */
  .contact-content {
    display: flex;
    gap: 1.5rem;
    width: 100%;
    align-items: stretch;
    max-width: 100%;
  }

  /* 联系我们：适配高度 */
  .contact-info {
    flex: 1;
    display: grid;
    gap: 1.2rem;
    font-size: 1.2rem;
    background-color: rgba(255, 255, 255, 0.1);
    padding: 1.2rem;
    border-radius: 10px;
    width: 100%;
    min-width: 0; /* 允许极致压缩 */
    align-content: center;
  }

  /* 联系方式项：单行显示，避免换行 */
  .contact-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    white-space: nowrap;
  }

  .item-label {
    color: #64b5f6; /* 标签用主色调突出，匹配导航栏 */
    font-weight: 600;
    font-size: 1.15rem;
    flex: 0 0 100px;
    text-align: right;
    text-shadow: 0 0 5px rgba(100, 181, 246, 0.5); /* 增加轻微发光 */
  }

  .item-value {
    color: #ffffff;
    opacity: 0.95;
    font-size: 1.15rem;
    flex: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  /* 留言咨询：适配高度 */
  .contact-form {
    flex: 1;
    background-color: rgba(255, 255, 255, 0.1);
    padding: 1.2rem;
    border-radius: 10px;
    width: 100%;
    min-width: 0;
    display: grid;
    grid-template-rows: auto 1fr auto;
  }

  /* 表单标题：匹配导航栏的发光风格 */
  .form-title {
    font-size: 1.2rem;
    color: #64b5f6;
    text-shadow: 0 0 8px rgba(100, 181, 246, 0.8);
    margin-bottom: 1rem;
    text-align: center;
    font-weight: 600;
  }

  .form-group {
    display: grid;
    gap: 0.5rem;
    margin-bottom: 1rem;
    width: 100%;
  }

  .form-group label {
    color: #e0e0ff; /* 匹配导航栏文字颜色 */
    font-weight: 500;
    font-size: 0.9rem;
  }

  .form-group input,
  .form-group textarea {
    padding: 0.7rem;
    border: 1px solid rgba(100, 181, 246, 0.3); /* 边框用主色调 */
    border-radius: 8px;
    font-size: 0.85rem;
    width: 100%;
    background-color: rgba(255, 255, 255, 0.08);
    color: #ffffff;
    resize: none; /* 禁止拉伸 */
    transition: all 0.3s ease;
  }

  /* 输入框占位符颜色 */
  .form-group input::placeholder,
  .form-group textarea::placeholder {
    color: rgba(255, 255, 255, 0.6);
  }

  /* 输入框聚焦样式：强化主色调效果 */
  .form-group input:focus,
  .form-group textarea:focus {
    outline: none;
    border-color: #64b5f6;
    box-shadow: 0 0 0 3px rgba(100, 181, 246, 0.3);
    background-color: rgba(255, 255, 255, 0.12);
  }

  /* 提交按钮：匹配导航栏交互风格 */
  .submit-btn {
    background-color: rgba(100, 181, 246, 0.2);
    border: 1px solid #64b5f6;
    color: #64b5f6;
    padding: 0.7rem 2rem;
    border-radius: 8px;
    font-size: 0.9rem;
    cursor: pointer;
    transition: all 0.3s ease;
    display: block;
    margin: 0 auto;
    text-shadow: 0 0 5px rgba(100, 181, 246, 0.5);
  }

  .submit-btn:hover {
    background-color: rgba(100, 181, 246, 0.4);
    color: #ffffff;
    box-shadow: 0 0 10px rgba(100, 181, 246, 0.5);
  }

  /* 响应式适配：平板及以下 */
  @media (max-width: 768px) {
    .about-us {
      padding: 1rem 0.8rem;
      padding-top: 70px; /* 适配小屏幕导航栏高度 */
      gap: 2rem;
    }
    .contact-content {
      flex-direction: column;
      gap: 1rem;
    }
    .contact-info,
    .contact-form {
      flex: none;
      width: 100%;
      height: auto;
    }
    .item-label,
    .item-value {
      font-size: 1.1rem;
    }
    .contact-info {
      font-size: 1.1rem;
    }
    .item-label {
      flex: 0 0 90px;
    }
    .team-cards {
      gap: 0.6rem;
    }
    .team-card {
      width: calc(50% - 0.3rem);
    }
    .section-title {
      font-size: 1.8rem;
    }
  }

  /* 超小屏适配（手机） */
  @media (max-width: 480px) {
    .team-card {
      width: 100%;
    }
    .about-us {
      padding: 0.8rem 0.5rem;
      padding-top: 65px;
      gap: 1.5rem;
    }
    .item-label,
    .item-value {
      font-size: 1.05rem;
    }
    .item-label {
      flex: 0 0 85px;
    }
    .section-title {
      font-size: 1.6rem;
    }
    .form-title {
      font-size: 1.1rem;
    }
  }
</style>