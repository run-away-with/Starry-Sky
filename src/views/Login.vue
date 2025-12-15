<template>
  <div class="login-container">
    <div class="login-card">
      <h1>{{ isLoginMode ? '登录页面' : '注册页面' }}</h1>

      <!-- 提示消息 -->
      <div v-if="message" :class="['message', messageType]">
        {{ message }}
      </div>

      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="username">用户名:</label>
          <input id="username" v-model="username" required />
        </div>
        <div class="form-group">
          <label for="password">密码:</label>
          <input id="password" v-model="password" type="password" required />
        </div>

        <!-- 注册模式下显示确认密码 -->
        <div v-if="!isLoginMode" class="form-group">
          <label for="confirmPassword">确认密码:</label>
          <input
            id="confirmPassword"
            v-model="confirmPassword"
            type="password"
            required
          />
        </div>

        <!-- 用户协议勾选框 -->
        <div class="form-group agreement-group">
          <label class="agreement-label">
            <input v-model="agreeTerms" type="checkbox" />
            我已阅读并同意
            <a href="#" @click.prevent="showAgreement = true">用户协议</a>
          </label>
        </div>

        <button type="submit" class="main-btn">
          {{ isLoginMode ? '登录' : '注册' }}
        </button>
      </form>

      <!-- 切换模式的按钮 -->
      <button type="button" class="toggle-btn" @click="toggleMode">
        {{ isLoginMode ? '没有账号？注册' : '已有账号？登录' }}
      </button>
    </div>

    <!-- 用户协议弹窗 -->
    <div v-if="showAgreement" class="agreement-modal">
      <div class="agreement-content">
        <h3>用户协议</h3>
        <div class="agreement-text">
          <p>欢迎使用本系统，请您仔细阅读以下协议：</p>
          <p>1. 您承诺提供真实、准确的个人信息</p>
          <p>2. 您将对自己的账号安全负责</p>
          <p>3. 不得利用本系统进行任何违法活动</p>
          <p>4. 我们将保护您的个人信息安全</p>
          <p>5. 本协议最终解释权归系统所有</p>
        </div>
        <button class="close-btn" @click="showAgreement = false">
          我已阅读
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';

  const router = useRouter();
  const isLoginMode = ref(true);
  const username = ref('');
  const password = ref('');
  const confirmPassword = ref('');
  const message = ref('');
  const messageType = ref('');
  // 新增用户协议相关变量
  const agreeTerms = ref(false);
  const showAgreement = ref(false);

  // 从本地存储获取用户数据
  const getUsers = () => {
    const users = localStorage.getItem('starrySkyUsers');
    return users ? JSON.parse(users) : {};
  };

  // 保存用户数据到本地存储
  const saveUser = userData => {
    const users = getUsers();
    users[userData.username] = userData;
    localStorage.setItem('starrySkyUsers', JSON.stringify(users));
  };

  // 切换登录/注册模式
  const toggleMode = () => {
    isLoginMode.value = !isLoginMode.value;
    confirmPassword.value = '';
    agreeTerms.value = false; // 切换模式时重置勾选状态
    clearMessage();
  };

  // 清除提示消息
  const clearMessage = () => {
    message.value = '';
    messageType.value = '';
  };

  // 处理提交
  const handleSubmit = () => {
    clearMessage();

    // 新增用户协议验证
    if (!agreeTerms.value) {
      messageType.value = 'error';
      message.value = '请阅读并同意用户协议';
      return;
    }

    if (isLoginMode.value) {
      // 登录逻辑（保持不变）
      const users = getUsers();
      const user = users[username.value];

      if (!user) {
        messageType.value = 'error';
        message.value = '用户名不存在';
        return;
      }

      if (user.password !== password.value) {
        messageType.value = 'error';
        message.value = '密码不正确';
        return;
      }

      // 登录成功
      messageType.value = 'success';
      message.value = '登录成功，正在跳转...';

      // 保存当前登录状态
      localStorage.setItem('currentUser', username.value);

      // 2秒后跳转到首页
      setTimeout(() => {
        router.push('/home');
      }, 2000);
    } else {
      // 注册逻辑（保持不变）
      if (password.value !== confirmPassword.value) {
        messageType.value = 'error';
        message.value = '两次输入的密码不一致';
        return;
      }

      if (username.value.trim() === '' || password.value.trim() === '') {
        messageType.value = 'error';
        message.value = '用户名和密码不能为空';
        return;
      }

      const users = getUsers();
      if (users[username.value]) {
        messageType.value = 'error';
        message.value = '用户名已存在';
        return;
      }

      // 注册成功，保存用户信息
      saveUser({
        username: username.value,
        password: password.value,
        registeredAt: new Date().toISOString()
      });

      messageType.value = 'success';
      message.value = '注册成功，请登录';

      // 2秒后切换到登录模式
      setTimeout(() => {
        toggleMode();
        // 清空密码输入框
        password.value = '';
        confirmPassword.value = '';
        clearMessage();
      }, 2000);
    }
  };
</script>

<style scoped>
  /* 原有样式保持不变 */
  .login-container {
    grid-column: 1/4;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
    box-sizing: border-box;
  }

  .login-card {
    width: 100%;
    max-width: 400px;
    padding: 30px;
    background-color: rgba(25, 25, 50, 0.85);
    backdrop-filter: blur(10px);
    border-radius: 12px;
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
    border: 1px solid rgba(255, 255, 255, 0.1);
    z-index: 10;
  }

  h1 {
    color: #fff;
    text-align: center;
    margin-bottom: 30px;
    text-shadow: 0 2px 10px rgba(100, 150, 255, 0.5);
  }

  .message {
    padding: 12px;
    margin-bottom: 20px;
    border-radius: 6px;
    text-align: center;
    font-weight: 500;
    transition: all 0.3s ease;
  }

  .message.success {
    background-color: rgba(66, 185, 131, 0.2);
    border: 1px solid rgba(66, 185, 131, 0.5);
    color: #42b983;
  }

  .message.error {
    background-color: rgba(244, 67, 54, 0.2);
    border: 1px solid rgba(244, 67, 54, 0.5);
    color: #f44336;
  }

  .form-group {
    margin-bottom: 20px;
  }

  label {
    display: block;
    margin-bottom: 8px;
    font-weight: bold;
    color: #e0e0ff;
  }

  input {
    width: 100%;
    padding: 12px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 6px;
    background-color: rgba(255, 255, 255, 0.1);
    color: #fff;
    font-size: 16px;
    box-sizing: border-box;
  }

  input:focus {
    outline: none;
    border-color: #6495ed;
    box-shadow: 0 0 0 2px rgba(100, 149, 237, 0.3);
  }

  .main-btn {
    width: 100%;
    padding: 12px;
    background: linear-gradient(135deg, #42b983 0%, #369870 100%);
    border: none;
    border-radius: 6px;
    color: white;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    margin-bottom: 15px;
  }

  .main-btn:hover {
    background: linear-gradient(135deg, #369870 0%, #2a7d58 100%);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(66, 185, 131, 0.3);
  }

  .toggle-btn {
    width: 100%;
    padding: 12px;
    background: transparent;
    border: 1px solid rgba(33, 150, 243, 0.5);
    border-radius: 6px;
    color: #2196f3;
    font-size: 16px;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .toggle-btn:hover {
    background-color: rgba(33, 150, 243, 0.1);
    border-color: #2196f3;
    color: #64b5f6;
  }

  /* 新增用户协议相关样式 */
  .agreement-group {
    margin-bottom: 25px;
  }

  .agreement-label {
    display: flex;
    align-items: center;
    font-size: 14px;
    font-weight: normal;
    cursor: pointer;
  }

  .agreement-label input {
    width: auto;
    margin-right: 8px;
  }

  .agreement-label a {
    color: #64b5f6;
    text-decoration: underline;
    margin-left: 4px;
    cursor: pointer;
  }

  /* 协议弹窗样式 */
  .agreement-modal {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 100;
    padding: 20px;
  }

  .agreement-content {
    background-color: rgba(25, 25, 50, 0.95);
    border-radius: 8px;
    padding: 25px;
    width: 100%;
    max-width: 500px;
    max-height: 80vh;
    overflow-y: auto;
  }

  .agreement-content h3 {
    color: #fff;
    margin-top: 0;
    text-align: center;
  }

  .agreement-text {
    color: #e0e0ff;
    line-height: 1.6;
    margin-bottom: 20px;
  }

  .close-btn {
    width: 100%;
    padding: 10px;
    background-color: #2196f3;
    border: none;
    border-radius: 4px;
    color: white;
    cursor: pointer;
    font-size: 16px;
  }

  .close-btn:hover {
    background-color: #1976d2;
  }
</style>
