<template>
  <div class="profile-page">
    <div class="profile-container">
      <div class="profile-header">
        <h2>个人中心</h2>
        <p class="subtitle">管理你的个人信息</p>
      </div>

      <!-- 未登录状态 -->
      <div v-if="!isLoggedIn" class="not-login">
        <p>请先登录以查看个人信息</p>
        <button class="login-btn" @click="goToLogin">去登录</button>
      </div>

      <!-- 已登录状态 -->
      <div v-else class="profile-content">
        <div class="profile-info-card">
          <div class="avatar-container">
            <img 
              :src="userInfo.avatar || defaultAvatar" 
              alt="用户头像" 
              class="avatar"
            />
            <label class="avatar-upload">
              <input type="file" accept="image/*" @change="handleAvatarUpload" />
              <span class="upload-icon">📷</span>
            </label>
          </div>
          <h3 class="nickname">{{ userInfo.nickname || userInfo.username }}</h3>
          <p class="email">{{ userInfo.email || '无' }}</p>
        </div>

        <div class="profile-edit-form">
          <form @submit.prevent="handleUpdate">
            <div class="form-group">
              <label for="nickname">昵称</label>
              <input
                id="nickname"
                v-model="editForm.nickname"
                type="text"
                placeholder="请输入昵称"
              />
            </div>

            <div class="form-group">
              <label for="email">邮箱</label>
              <input
                id="email"
                v-model="editForm.email"
                type="email"
                placeholder="请输入邮箱"
              />
            </div>

            <div class="form-group">
              <label for="oldPassword">原密码</label>
              <input
                id="oldPassword"
                v-model="editForm.oldPassword"
                type="password"
                placeholder="输入原密码以修改信息"
              />
            </div>

            <div class="form-group">
              <label for="newPassword">新密码（可选）</label>
              <input
                id="newPassword"
                v-model="editForm.newPassword"
                type="password"
                placeholder="不修改密码请留空"
              />
            </div>

            <div class="form-actions">
              <button type="button" class="cancel-btn" @click="resetForm">取消</button>
              <button type="submit" class="save-btn">保存修改</button>
            </div>
          </form>

          <button class="logout-btn" @click="handleLogout">退出登录</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const defaultAvatar = 'https://picsum.photos/200/200?random=1';

// 状态管理
const currentUsername = ref(localStorage.getItem('currentUser') || '');
const users = ref(JSON.parse(localStorage.getItem('starrySkyUsers') || '{}'));
const userInfo = ref({});
const isLoggedIn = computed(() => !!currentUsername.value);

// 编辑表单
const editForm = ref({
  nickname: '',
  email: '',
  oldPassword: '',
  newPassword: ''
});

// 初始化用户信息
onMounted(() => {
  if (isLoggedIn.value && users.value[currentUsername.value]) {
    userInfo.value = { ...users.value[currentUsername.value] };
    // 初始化表单
    editForm.value.nickname = userInfo.value.nickname || '';
    editForm.value.email = userInfo.value.email || '';
  }
});

// 处理头像上传
const handleAvatarUpload = (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (event) => {
      userInfo.value.avatar = event.target.result;
      // 保存到本地存储
      users.value[currentUsername.value] = { ...userInfo.value };
      localStorage.setItem('starrySkyUsers', JSON.stringify(users.value));
    };
    reader.readAsDataURL(file);
  }
};

// 重置表单
const resetForm = () => {
  editForm.value = {
    nickname: userInfo.value.nickname || '',
    email: userInfo.value.email || '',
    oldPassword: '',
    newPassword: ''
  };
};

// 处理信息更新
const handleUpdate = () => {
  // 验证原密码
  if (editForm.value.oldPassword !== userInfo.value.password) {
    alert('原密码不正确');
    return;
  }

  // 更新用户信息
  userInfo.value.nickname = editForm.value.nickname;
  userInfo.value.email = editForm.value.email;
  
  // 如果填写了新密码则更新
  if (editForm.value.newPassword) {
    userInfo.value.password = editForm.value.newPassword;
  }

  // 保存到本地存储
  users.value[currentUsername.value] = { ...userInfo.value };
  localStorage.setItem('starrySkyUsers', JSON.stringify(users.value));
  
  alert('信息更新成功');
  resetForm();
};

// 退出登录
const handleLogout = () => {
  localStorage.removeItem('currentUser');
  currentUsername.value = '';
  router.push('/login');
};

// 前往登录页
const goToLogin = () => {
  router.push('/login');
};
</script>

<style scoped>
.profile-page {
  grid-column: 1/4;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 2rem;
  box-sizing: border-box;
}

.profile-container {
  width: 100%;
  max-width: 800px;
}

.profile-header {
  text-align: center;
  margin-bottom: 2rem;
}

.profile-header h2 {
  font-size: 2rem;
  margin-bottom: 0.5rem;
  color: #fff;
  text-shadow: 0 0 10px rgba(100, 150, 255, 0.7);
}

.subtitle {
  color: #808594;
  font-size: 1.1rem;
}

.not-login {
  text-align: center;
  padding: 3rem 0;
  background-color: rgba(0, 0, 30, 0.5);
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}

.not-login p {
  font-size: 1.2rem;
  margin-bottom: 1.5rem;
  color: #ccc;
}

.profile-content {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: center;
  align-items: flex-start;
}

.profile-info-card {
  background-color: rgba(0, 0, 30, 0.5);
  border-radius: 10px;
  padding: 2rem;
  width: 300px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  text-align: center;
}

.avatar-container {
  position: relative;
  width: 150px;
  height: 150px;
  margin: 0 auto 1.5rem;
}

.avatar {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #26d0ce;
}

.avatar-upload {
  position: absolute;
  bottom: 0;
  right: 0;
  background-color: #26d0ce;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(38, 208, 206, 0.5);
}

.avatar-upload input {
  display: none;
}

.upload-icon {
  font-size: 1.2rem;
}

.nickname {
  font-size: 1.5rem;
  margin: 0 0 0.5rem;
  color: #fff;
}

.email {
  color: #808594;
  margin: 0 0 1rem;
}

.profile-edit-form {
  background-color: rgba(0, 0, 30, 0.5);
  border-radius: 10px;
  padding: 2rem;
  width: 400px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  color: #ccc;
}

.form-group input {
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #3a3a55;
  border-radius: 5px;
  background-color: rgba(255, 255, 255, 0.1);
  color: #fff;
  box-sizing: border-box;
}

.form-group input::placeholder {
  color: #808594;
}

.form-actions {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
}

button {
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
}

.login-btn, .save-btn {
  background: linear-gradient(135deg, #011aad 0%, #26d0ce 100%);
  color: white;
  box-shadow: 0 4px 15px rgba(38, 208, 206, 0.3);
}

.login-btn:hover, .save-btn:hover {
  box-shadow: 0 8px 20px rgba(38, 208, 206, 0.5);
  transform: translateY(-2px);
}

.cancel-btn {
  background-color: rgba(255, 255, 255, 0.1);
  color: #ccc;
}

.cancel-btn:hover {
  background-color: rgba(255, 255, 255, 0.2);
}

.logout-btn {
  width: 100%;
  margin-top: 1.5rem;
  background-color: rgba(220, 53, 69, 0.2);
  color: #dc3545;
}

.logout-btn:hover {
  background-color: rgba(220, 53, 69, 0.3);
}

@media (max-width: 768px) {
  .profile-content {
    flex-direction: column;
    align-items: center;
  }
  
  .profile-info-card, .profile-edit-form {
    width: 100%;
    max-width: 400px;
  }
}
</style>