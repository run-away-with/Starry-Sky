<template>
  <div class="about-us">
    <!-- 团队介绍部分 -->
    <section class="team-section">
      <h2 class="section-title">我们的团队</h2>
      <div class="team-cards">
        <!-- 5名团队成员卡片 -->
        <div class="team-card" v-for="(member, index) in teamMembers" :key="index">
          <div class="card-avatar">
            <img :src="`https://picsum.photos/id/${100 + index}/100/100`" :alt="member.name" />
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
              <input type="text" id="name" v-model="formData.name" placeholder="请输入您的姓名" required />
            </div>
            <div class="form-group">
              <label for="email">邮箱：</label>
              <input type="email" id="email" v-model="formData.email" placeholder="请输入您的邮箱" required />
            </div>
            <div class="form-group">
              <label for="message">留言内容：</label>
              <textarea id="message" v-model="formData.message" rows="4" placeholder="请输入您想咨询的内容" required></textarea>
            </div>
            <button type="submit" class="submit-btn">提交</button>
          </form>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// 5人团队数据
const teamMembers = ref([
  {
    name: "徐安",
    role: "组长",
    desc: "负责团队整体规划和技术架构设计，经验丰富"
  },
  {
    name: "王冠清",
    role: "组员",
    desc: "专注前端开发，擅长Vue生态和交互设计"
  },
  {
    name: "王沐阳",
    role: "组员",
    desc: "负责后端接口开发和数据处理，精通数据库"
  },
  {
    name: "王睿毅",
    role: "组员",
    desc: "专注测试和质量保障，确保项目稳定运行"
  },
  {
    name: "朱卫东",
    role: "组员",
    desc: "负责运维部署，保障系统高可用和性能优化"
  }
])
// 表单数据
const formData = ref({
  name: "",
  email: "",
  message: ""
})

// 表单提交处理
const handleSubmit = () => {
  alert(`感谢${formData.value.name}的留言，我们会尽快通过${formData.value.email}回复您！`)
  // 重置表单
  formData.value = { name: "", email: "", message: "" }
}
</script>

<style scoped>
/* 1. 全局重置：彻底消除滚动条和溢出 */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

/* 2. 根容器：强制占满视口，无滚动条，内容自适应 */
.about-us {
  display: grid;
  gap: 3rem; /* 减小间距避免纵向溢出 */
  padding: 2rem 1.5rem; /* 适度内边距，避免触达视口边缘 */
  height: 100vh; /* 固定高度=视口高度，消除纵向滚动 */
  width: 100vw; /* 固定宽度=视口宽度，消除横向滚动 */
  max-width: 100vw;
  max-height: 100vh;
  margin: 0;
  background-color: #1a2435;
  overflow: hidden; /* 核心：隐藏所有溢出，消除滚动条 */
  /* 内容溢出时自动适配（可选） */
  grid-template-rows: auto 1fr;
  align-content: center; /* 垂直居中，避免内容顶边/底边溢出 */
}

/* 标题样式：居中+白色 */
.section-title {
  font-size: 2rem; /* 减小字号避免占高过多 */
  color: #ffffff;
  margin: 0 auto 1.5rem;
  border-bottom: 2px solid #3498db;
  padding-bottom: 0.5rem;
  display: block;
  text-align: center;
  width: fit-content;
}

/* 团队部分：适配视口高度 */
.team-section {
  display: grid;
  place-items: center;
  gap: 1rem;
  width: 100%;
  padding: 0; /* 移除额外padding避免溢出 */
  max-height: calc(50% - 1.5rem); /* 分配高度，避免纵向溢出 */
}

.team-cards {
  display: flex;
  justify-content: center;
  align-items: stretch;
  gap: 0.8rem; /* 减小卡片间距 */
  width: 100%;
  max-width: 100%;
  flex-wrap: wrap;
}

.team-card {
  flex: 1;
  min-width: 120px; /* 进一步减小最小宽度 */
  max-width: 180px; /* 减小最大宽度 */
  background-color: #ffffff;
  padding: 1rem 0.8rem; /* 减小内边距 */
  border-radius: 10px;
  text-align: center;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.15);
  transition: transform 0.3s ease;
}

.team-card:hover {
  transform: translateY(-6px);
}

.card-avatar img {
  width: 70px; /* 减小头像尺寸 */
  height: 70px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 0.8rem;
  border: 3px solid #3498db;
}

/* 团队卡片文字：减小字号 */
.card-name {
  font-size: 1rem;
  color: #000000;
  margin-bottom: 0.5rem;
  font-weight: 600;
}

.card-role {
  color: #000000;
  font-weight: 500;
  margin-bottom: 0.6rem;
  font-size: 0.9rem;
}

.card-desc {
  color: #000000;
  line-height: 1.5;
  font-size: 0.8rem;
}

/* 联系部分：分配剩余高度 */
.contact-wrap {
  width: 100%;
  display: grid;
  gap: 1rem;
  padding: 0; /* 移除额外padding */
  max-height: calc(50% - 1.5rem); /* 分配高度 */
}

/* 核心：1:1等宽布局，无溢出 */
.contact-content {
  display: flex;
  gap: 1.5rem; /* 减小间距 */
  width: 100%;
  align-items: stretch;
  max-width: 100%;
  height: 100%; /* 高度自适应父容器 */
}

/* 联系我们：适配高度 */
.contact-info {
  flex: 1;
  display: grid;
  gap: 1.2rem;
  font-size: 1.2rem; /* 整体调大联系方式区域基础字号 */
  background-color: rgba(255, 255, 255, 0.1);
  padding: 1.2rem; /* 减小内边距 */
  border-radius: 10px;
  width: 100%;
  min-width: 0; /* 关键：移除最小宽度限制，允许极致压缩 */
  height: 100%;
  align-content: center; /* 内容垂直居中 */
}

/* 核心修改：确保"微信公众号"不换行 */
.contact-item {
  display: flex; /* 改为flex布局，强制单行 */
  align-items: center; /* 垂直居中 */
  gap: 0.5rem;
  white-space: nowrap; /* 禁止所有文字换行 */
}

/* 标签固定宽度，确保值区域有足够空间 */
.item-label {
  color: #ffffff;
  font-weight: 600;
  font-size: 1.15rem; /* 从0.9rem调大到1.15rem */
  flex: 0 0 100px; /* 固定宽度，不收缩不扩展 */
  text-align: right; /* 右对齐，视觉更整洁 */
}

.item-value {
  color: #ffffff;
  opacity: 0.95;
  font-size: 1.15rem; /* 从0.9rem调大到1.15rem，与标签一致 */
  flex: 1; /* 剩余空间自适应 */
  white-space: nowrap; /* 禁止值换行 */
  overflow: hidden; /* 超出部分隐藏（可选，避免极端情况溢出） */
  text-overflow: ellipsis; /* 超出显示省略号，提升体验 */
}

/* 留言咨询：适配高度 */
.contact-form {
  flex: 1;
  background-color: rgba(255, 255, 255, 0.1);
  padding: 1.2rem; /* 减小内边距 */
  border-radius: 10px;
  width: 100%;
  min-width: 0; /* 关键：移除最小宽度限制 */
  height: 100%;
  display: grid;
  grid-template-rows: auto 1fr auto; /* 表单内容自适应高度 */
}

.form-title {
  font-size: 1.2rem; /* 减小字号 */
  color: #ffffff;
  margin-bottom: 1rem;
  text-align: center;
}

.form-group {
  display: grid;
  gap: 0.5rem;
  margin-bottom: 1rem; /* 减小间距 */
  width: 100%;
}

.form-group label {
  color: #ffffff;
  font-weight: 500;
  font-size: 0.9rem;
}

.form-group input,
.form-group textarea {
  padding: 0.7rem; /* 减小内边距 */
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  font-size: 0.85rem; /* 减小字号 */
  width: 100%;
  background-color: rgba(255, 255, 255, 0.08);
  color: #ffffff;
  resize: none; /* 禁止textarea拉伸，避免溢出 */
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
  padding: 0.7rem 2rem; /* 减小按钮尺寸 */
  border-radius: 8px;
  font-size: 0.9rem; /* 减小字号 */
  cursor: pointer;
  transition: background-color 0.3s ease;
  display: block;
  margin: 0 auto;
}

.submit-btn:hover {
  background-color: #2980b9;
}

/* 响应式适配：极致适配小屏 */
@media (max-width: 768px) {
  .about-us {
    padding: 1rem 0.8rem;
    gap: 2rem;
  }
  .contact-content {
    flex-direction: column;
    gap: 1rem;
    height: 100%;
  }
  .contact-info, .contact-form {
    flex: none;
    width: 100%;
    height: auto;
    min-height: unset;
  }
  /* 响应式下联系方式字体稍调，但仍保持较大尺寸 */
  .item-label, .item-value {
    font-size: 1.1rem;
  }
  .contact-info {
    font-size: 1.1rem;
  }
  /* 响应式下调整标签宽度，适配小屏 */
  .item-label {
    flex: 0 0 90px;
  }
  .team-cards {
    gap: 0.6rem;
  }
  .team-card {
    width: calc(50% - 0.3rem);
    max-width: none;
    padding: 0.8rem 0.5rem;
  }
  .section-title {
    font-size: 1.6rem;
  }
}

/* 超小屏适配 */
@media (max-width: 480px) {
  .team-card {
    width: 100%;
  }
  .about-us {
    padding: 0.8rem 0.5rem;
    gap: 1.5rem;
  }
  .team-section, .contact-wrap {
    max-height: none;
  }
  /* 超小屏联系方式字体保持清晰 */
  .item-label, .item-value {
    font-size: 1.05rem;
  }
  /* 超小屏进一步调整标签宽度 */
  .item-label {
    flex: 0 0 85px;
  }
}
</style>