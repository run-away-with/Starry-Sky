<template>
  <div class="about-us">
    <!-- 团队介绍部分 -->
    <section class="team-section">
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
              :src="`https://picsum.photos/id/${100 + index}/100/100`"
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

  // 5人团队数据
  const teamMembers = ref([
    {
      name: '徐安',
      role: '组长'
    },
    {
      name: '王冠清',
      role: '组员'
    },
    {
      name: '王沐阳',
      role: '组员'
    },
    {
      name: '王睿毅',
      role: '组员'
    },
    {
      name: '朱卫东',
      role: '组员'
    }
  ]);
  // 表单数据
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
  /* 核心：占满整行宽度（100vw）+ 全屏背景 */
  .about-us {
    display: grid;
    gap: 5rem;
    padding: 3rem 2rem;
    min-height: 100vh; /* 全屏背景高度 */
    width: 100vw; /* 占满整行宽度（100%视口） */
    max-width: none; /* 移除最大宽度限制 */
    margin: 0; /* 清除居中边距 */
    background-color: #1a2435;
    overflow-x: hidden;
  }

  /* 标题样式：居中+白色 */
  .section-title {
    font-size: 2.2rem;
    color: #ffffff;
    margin: 0 auto 2rem;
    border-bottom: 2px solid #3498db;
    padding-bottom: 0.6rem;
    display: block;
    text-align: center;
    width: fit-content;
  }

  /* 团队部分：占满整行的单行布局 */
  .team-section {
    display: grid;
    place-items: center;
    gap: 1.5rem;
    width: 100%;
    padding: 0 0.5rem;
  }

  .team-cards {
    display: flex;
    justify-content: center;
    align-items: stretch;
    gap: 1.2rem;
    width: 100%;
    max-width: none;
  }

  .team-card {
    flex: 1;
    min-width: 160px;
    max-width: 200px;
    background-color: #ffffff;
    padding: 1.5rem 1rem;
    border-radius: 10px;
    text-align: center;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.15);
    transition: transform 0.3s ease;
  }

  .team-card:hover {
    transform: translateY(-6px);
  }

  .card-avatar img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    object-fit: cover;
    margin-bottom: 1rem;
    border: 3px solid #3498db;
  }

  /* 团队卡片文字（黑色+适配字号） */
  .card-name {
    font-size: 1.1rem;
    color: #000000;
    margin-bottom: 0.6rem;
    font-weight: 600;
  }

  .card-role {
    color: #000000;
    font-weight: 500;
    margin-bottom: 0.8rem;
    font-size: 1rem;
  }

  .card-desc {
    color: #000000;
    line-height: 1.6;
    font-size: 0.9rem;
  }

  /* 联系+留言 同排容器：占满整行 */
  .contact-wrap {
    width: 100%;
    display: grid;
    gap: 1.5rem;
    padding: 0 0.5rem;
  }

  /* 核心：1:1等宽布局 */
  .contact-content {
    display: flex;
    gap: 2rem; /* 中间间距 */
    width: 100%;
    align-items: stretch; /* 两个模块高度对齐 */
    max-width: none;
  }

  /* 联系我们：严格占50%宽度（扣除间距后） */
  .contact-info {
    flex: 1; /* 等宽核心：flex:1 平分宽度 */
    display: grid;
    gap: 1.5rem;
    font-size: 1.1rem;
    background-color: rgba(255, 255, 255, 0.1);
    padding: 1.8rem;
    border-radius: 10px;
    width: 100%;
    min-width: 280px; /* 最小宽度，避免小屏挤压 */
  }

  .contact-item {
    display: grid;
    grid-template-columns: 80px 1fr;
    gap: 0.6rem;
  }

  /* 联系方式文字（白色） */
  .item-label {
    color: #ffffff;
    font-weight: 600;
    font-size: 1rem;
  }

  .item-value {
    color: #ffffff;
    opacity: 0.95;
    font-size: 1rem;
  }

  /* 留言咨询：严格占50%宽度（扣除间距后） */
  .contact-form {
    flex: 1; /* 等宽核心：flex:1 平分宽度 */
    background-color: rgba(255, 255, 255, 0.1);
    padding: 1.8rem;
    border-radius: 10px;
    width: 100%;
    min-width: 280px; /* 最小宽度，避免小屏挤压 */
  }

  .form-title {
    font-size: 1.4rem;
    color: #ffffff;
    margin-bottom: 1.5rem;
    text-align: center;
  }

  .form-group {
    display: grid;
    gap: 0.6rem;
    margin-bottom: 1.5rem;
    width: 100%;
  }

  .form-group label {
    color: #ffffff;
    font-weight: 500;
    font-size: 1rem;
  }

  .form-group input,
  .form-group textarea {
    padding: 0.9rem;
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 8px;
    font-size: 0.95rem;
    width: 100%;
    background-color: rgba(255, 255, 255, 0.08);
    color: #ffffff;
  }

  /* 输入框占位符颜色 */
  .form-group input::placeholder,
  .form-group textarea::placeholder {
    color: rgba(255, 255, 255, 0.6);
  }

  /* 输入框聚焦样式 */
  .form-group input:focus,
  .form-group textarea:focus {
    outline: none;
    border-color: #3498db;
    box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.3);
    background-color: rgba(255, 255, 255, 0.12);
  }

  .submit-btn {
    background-color: #3498db;
    color: white;
    border: none;
    padding: 0.9rem 2.5rem;
    border-radius: 8px;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.3s ease;
    display: block;
    margin: 0 auto;
    margin-top: 1rem;
  }

  .submit-btn:hover {
    background-color: #2980b9;
  }

  /* 响应式适配：小屏自动换行，仍保持1:1（换行后各占100%） */
  @media (max-width: 768px) {
    .about-us {
      padding: 1.5rem 1rem;
      gap: 3rem;
    }
    .contact-content {
      flex-direction: column; /* 小屏换行 */
      gap: 1.5rem;
    }
    .contact-info,
    .contact-form {
      flex: none;
      width: 100%; /* 换行后各占100%，视觉上仍1:1 */
      min-width: unset;
    }
    .team-cards {
      flex-wrap: wrap;
    }
    .team-card {
      width: calc(50% - 0.6rem);
      max-width: none;
    }
    .contact-item {
      grid-template-columns: 1fr;
    }
  }
</style>
