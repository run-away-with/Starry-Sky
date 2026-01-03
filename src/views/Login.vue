<template>
  <div class="login-container">
    <HeaderNav />
    <div class="stars-bg"></div>
    <!-- 星空背景装饰 -->
    <div class="login-card">
      <div class="card-header">
        <h1>{{ isLoginMode ? '账户登录' : '创建账户' }}</h1>
        <div class="divider"></div>
      </div>

      <!-- 提示消息 -->
      <div v-if="message" :class="['message', messageType]" role="alert">
        {{ message }}
      </div>

      <form class="login-form" @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="username" class="form-label">
            <i class="icon-user"></i>
            用户名
          </label>
          <input
            id="username"
            v-model="username"
            required
            class="form-input"
            placeholder="请输入用户名"
          />
        </div>

        <div class="form-group">
          <label for="password" class="form-label">
            <i class="icon-lock"></i>
            密码
          </label>
          <input
            id="password"
            v-model="password"
            type="password"
            required
            class="form-input"
            placeholder="请输入密码"
          />
        </div>

        <!-- 注册模式下显示确认密码 -->
        <div v-if="!isLoginMode" class="form-group">
          <label for="confirmPassword" class="form-label">
            <i class="icon-lock"></i>
            确认密码
          </label>
          <input
            id="confirmPassword"
            v-model="confirmPassword"
            type="password"
            required
            class="form-input"
            placeholder="请再次输入密码"
          />
        </div>

        <!-- 登录模式下显示忘记密码链接 -->
        <div v-if="isLoginMode" class="form-actions">
          <button
            type="button"
            class="link-btn"
            @click="showForgotPassword = true"
          >
            忘记密码?
          </button>
        </div>

        <!-- 用户协议勾选框 -->
        <div class="form-group agreement-group">
          <label class="agreement-label">
            <input
              v-model="agreeTerms"
              type="checkbox"
              class="custom-checkbox"
              :aria-required="!isLoginMode"
            />
            我已阅读并同意
            <button
              type="button"
              class="link-btn inline-btn"
              @click.prevent="showAgreement = true"
            >
              用户协议
            </button>
            和
            <button
              type="button"
              class="link-btn inline-btn"
              @click.prevent="showPrivacy = true"
            >
              隐私政策
            </button>
          </label>
        </div>

        <button type="submit" class="main-btn">
          {{ isLoginMode ? '登录' : '注册' }}
        </button>
      </form>

      <!-- 切换模式的按钮 -->
      <button type="button" class="toggle-btn" @click="toggleMode">
        {{ isLoginMode ? '没有账号？立即注册' : '已有账号？登录' }}
      </button>
    </div>

    <!-- 用户协议弹窗 -->
    <dialog v-if="showAgreement" class="modal" :open="showAgreement">
      <div class="modal-content">
        <div class="modal-header">
          <h3>用户协议</h3>
          <button class="close-btn" @click="showAgreement = false">
            &times;
          </button>
        </div>
        <div class="modal-body">
          <div class="scrollable-content">
            <h4>一、服务条款</h4>
            <p>1.1 本服务由我们提供，您在使用本服务前请仔细阅读本协议。</p>
            <p>1.2 您使用本服务即表示您已同意本协议的全部条款。</p>

            <h4>二、用户账号</h4>
            <p>2.1 您需提供真实、准确的信息注册账号。</p>
            <p>2.2 您应对账号安全负责，如遇异常应立即通知我们。</p>

            <h4>三、使用规范</h4>
            <p>3.1 不得利用本服务从事任何违法违规活动。</p>
            <p>3.2 不得侵犯他人合法权益或知识产权。</p>

            <h4>四、隐私保护</h4>
            <p>4.1 我们将依法保护您的个人信息，详情见《隐私政策》。</p>

            <h4>五、其他条款</h4>
            <p>5.1 我们保留对本协议的修改权，修改后将通过网站公告。</p>
            <p>5.2 本协议的解释权归我们所有。</p>
          </div>
        </div>
        <div class="modal-footer">
          <button class="main-btn" @click="showAgreement = false">
            我已阅读并同意
          </button>
        </div>
      </div>
    </dialog>

    <!-- 隐私政策弹窗 -->
    <dialog v-if="showPrivacy" class="modal" :open="showPrivacy">
      <div class="modal-content">
        <div class="modal-header">
          <h3>隐私政策</h3>
          <button class="close-btn" @click="showPrivacy = false">
            &times;
          </button>
        </div>
        <div class="modal-body">
          <div class="scrollable-content">
            <h4>一、信息收集</h4>
            <p>1.1 我们收集您注册时提供的用户名等基本信息。</p>

            <h4>二、信息使用</h4>
            <p>2.1 收集的信息用于为您提供服务和改善用户体验。</p>

            <h4>三、信息保护</h4>
            <p>3.1 我们采取安全措施保护您的信息不被泄露。</p>

            <h4>四、信息共享</h4>
            <p>4.1 未经您许可，我们不会向第三方共享您的个人信息。</p>
          </div>
        </div>
        <div class="modal-footer">
          <button class="main-btn" @click="showPrivacy = false">
            我已阅读并同意
          </button>
        </div>
      </div>
    </dialog>

    <!-- 忘记密码弹窗 -->
    <dialog v-if="showForgotPassword" class="modal" :open="showForgotPassword">
      <div class="modal-content">
        <div class="modal-header">
          <h3>重置密码</h3>
          <button class="close-btn" @click="showForgotPassword = false">
            &times;
          </button>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label for="resetUsername" class="form-label">用户名</label>
            <input
              id="resetUsername"
              v-model="resetUsername"
              required
              class="form-input"
              placeholder="请输入您的用户名"
            />
          </div>
          <div class="form-group">
            <label for="newPassword" class="form-label">新密码</label>
            <input
              id="newPassword"
              v-model="newPassword"
              type="password"
              required
              class="form-input"
              placeholder="请设置新密码"
            />
          </div>
          <div class="form-group">
            <label for="confirmNewPassword" class="form-label">
              确认新密码
            </label>
            <input
              id="confirmNewPassword"
              v-model="confirmNewPassword"
              type="password"
              required
              class="form-input"
              placeholder="请再次输入新密码"
            />
          </div>
        </div>
        <div class="modal-footer">
          <button class="secondary-btn" @click="showForgotPassword = false">
            取消
          </button>
          <button class="main-btn" @click="handleResetPassword">
            确认重置
          </button>
        </div>
      </div>
    </dialog>
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

  // 用户协议相关变量
  const agreeTerms = ref(false);
  const showAgreement = ref(false);
  const showPrivacy = ref(false);

  // 忘记密码相关变量
  const showForgotPassword = ref(false);
  const resetUsername = ref('');
  const newPassword = ref('');
  const confirmNewPassword = ref('');

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
    agreeTerms.value = false;
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

    if (!agreeTerms.value) {
      messageType.value = 'error';
      message.value = '请阅读并同意用户协议和隐私政策';
      return;
    }

    if (isLoginMode.value) {
      // 登录逻辑
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

      messageType.value = 'success';
      message.value = '登录成功，正在跳转...';
      localStorage.setItem('currentUser', username.value);

      setTimeout(() => {
        router.push('/home');
      }, 1500);
    } else {
      // 注册逻辑
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

      saveUser({
        username: username.value,
        password: password.value,
        registeredAt: new Date().toISOString()
      });

      messageType.value = 'success';
      message.value = '注册成功，请登录';

      setTimeout(() => {
        toggleMode();
        password.value = '';
        confirmPassword.value = '';
        clearMessage();
      }, 1500);
    }
  };

  // 密码重置逻辑
  const handleResetPassword = () => {
    clearMessage();

    if (!resetUsername.value.trim() || !newPassword.value.trim()) {
      messageType.value = 'error';
      message.value = '用户名和新密码不能为空';
      return;
    }

    if (newPassword.value !== confirmNewPassword.value) {
      messageType.value = 'error';
      message.value = '两次输入的新密码不一致';
      return;
    }

    const users = getUsers();
    if (!users[resetUsername.value]) {
      messageType.value = 'error';
      message.value = '用户名不存在';
      return;
    }

    // 更新密码
    users[resetUsername.value].password = newPassword.value;
    localStorage.setItem('starrySkyUsers', JSON.stringify(users));

    messageType.value = 'success';
    message.value = '密码重置成功，请登录';

    // 关闭弹窗并重置表单
    setTimeout(() => {
      showForgotPassword.value = false;
      resetUsername.value = '';
      newPassword.value = '';
      confirmNewPassword.value = '';
    }, 1500);
  };
</script>

<style scoped>
  .login-container {
    grid-column: 1/4;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
    box-sizing: border-box;
    position: relative;
  }

  /* 星空背景装饰 */
  .stars-bg {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background:
      radial-gradient(2px 2px at 20px 30px, #fff, transparent),
      radial-gradient(2px 2px at 40px 70px, #fff, transparent),
      radial-gradient(2px 2px at 50px 160px, #fff, transparent),
      radial-gradient(2px 2px at 90px 40px, #fff, transparent),
      radial-gradient(2px 2px at 130px 80px, #fff, transparent),
      radial-gradient(2px 2px at 160px 120px, #fff, transparent),
      radial-gradient(2px 2px at 190px 60px, #fff, transparent);
    background-repeat: repeat;
    background-size: 200px 200px;
    opacity: 0.3;
    z-index: 1;
  }

  .login-card {
    width: 100%;
    max-width: 420px;
    padding: 35px;
    background-color: rgba(15, 23, 42, 0.9);
    backdrop-filter: blur(12px);
    border-radius: 16px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
    border: 1px solid rgba(255, 255, 255, 0.1);
    z-index: 10;
    position: relative;
    overflow: hidden;
  }

  /* 卡片顶部装饰 */
  .login-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #3b82f6, #8b5cf6);
  }

  .card-header {
    margin-bottom: 30px;
    text-align: center;
  }

  .card-header h1 {
    color: #e2e8f0;
    margin: 0 0 15px;
    font-family: 'Orbitron', sans-serif;
    font-weight: 600;
    font-size: 1.8rem;
  }

  .divider {
    width: 60px;
    height: 3px;
    background: linear-gradient(90deg, #3b82f6, #8b5cf6);
    border-radius: 3px;
    margin: 0 auto;
  }

  /* 表单样式 */
  .login-form {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .form-group {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .form-label {
    color: #94a3b8;
    font-size: 0.9rem;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .icon-user::before {
    content: '👤';
  }

  .icon-lock::before {
    content: '🔒';
  }

  .form-input {
    padding: 14px 16px;
    background-color: rgba(30, 41, 59, 0.5);
    border: 1px solid rgba(148, 163, 184, 0.2);
    border-radius: 8px;
    color: #e2e8f0;
    font-size: 1rem;
    transition: all 0.3s ease;
  }

  .form-input::placeholder {
    color: #64748b;
  }

  .form-input:focus {
    outline: none;
    border-color: #60a5fa;
    box-shadow: 0 0 0 3px rgba(96, 165, 250, 0.1);
    background-color: rgba(30, 41, 59, 0.7);
  }

  .form-actions {
    display: flex;
    justify-content: flex-end;
    margin: -10px 0 10px;
  }

  /* 按钮样式 */
  .main-btn {
    width: 100%;
    padding: 14px;
    background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
    border: none;
    border-radius: 8px;
    color: #ffffff;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    margin-bottom: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
  }

  .main-btn:hover {
    background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
  }

  .toggle-btn {
    width: 100%;
    padding: 12px;
    background: transparent;
    border: 1px solid rgba(59, 130, 246, 0.3);
    border-radius: 8px;
    color: #93c5fd;
    font-size: 0.95rem;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .toggle-btn:hover {
    background-color: rgba(59, 130, 246, 0.1);
    border-color: #60a5fa;
    color: #bfdbfe;
  }

  .link-btn {
    background: none;
    border: none;
    color: #93c5fd;
    cursor: pointer;
    padding: 2px 4px;
    font-size: 0.9rem;
    transition: color 0.2s ease;
    text-decoration: none;
    display: inline;
  }

  .link-btn:hover {
    color: #bfdbfe;
    text-decoration: underline;
  }

  .inline-btn {
    padding: 0;
    margin: 0 4px;
  }

  .secondary-btn {
    padding: 10px 20px;
    background-color: transparent;
    border: 1px solid rgba(148, 163, 184, 0.3);
    border-radius: 6px;
    color: #94a3b8;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .secondary-btn:hover {
    background-color: rgba(148, 163, 184, 0.1);
    color: #e2e8f0;
  }

  /* 提示消息 */
  .message {
    padding: 12px 16px;
    margin-bottom: 20px;
    border-radius: 8px;
    text-align: center;
    font-weight: 500;
    transition: all 0.3s ease;
    font-size: 0.9rem;
  }

  .message.error {
    background-color: rgba(239, 68, 68, 0.1);
    color: #fecaca;
    border: 1px solid rgba(239, 68, 68, 0.2);
  }

  .message.success {
    background-color: rgba(16, 185, 129, 0.1);
    color: #a7f3d0;
    border: 1px solid rgba(16, 185, 129, 0.2);
  }

  /* 用户协议样式 */
  .agreement-group {
    margin: 10px 0 15px;
  }

  .agreement-label {
    display: flex;
    align-items: flex-start;
    font-size: 0.85rem;
    color: #94a3b8;
    cursor: pointer;
    line-height: 1.5;
  }

  .custom-checkbox {
    margin-top: 3px;
    margin-right: 8px;
    width: 16px;
    height: 16px;
    accent-color: #3b82f6;
  }

  /* 弹窗样式 */
  .modal {
    border: none;
    border-radius: 12px;
    padding: 0;
    background: transparent;
    color: #e2e8f0;
    max-width: 90%;
    width: 550px;
    box-shadow: 0 10px 50px rgba(0, 0, 0, 0.5);
    z-index: 100;
  }

  .modal::backdrop {
    background-color: rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(4px);
  }

  .modal-content {
    background-color: rgba(15, 23, 42, 0.95);
    border-radius: 12px;
    overflow: hidden;
  }

  .modal-header {
    padding: 20px 24px;
    border-bottom: 1px solid rgba(148, 163, 184, 0.1);
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .modal-header h3 {
    margin: 0;
    color: #e2e8f0;
    font-family: 'Orbitron', sans-serif;
  }

  .close-btn {
    background: none;
    border: none;
    color: #94a3b8;
    font-size: 1.5rem;
    cursor: pointer;
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    transition: all 0.2s ease;
  }

  .close-btn:hover {
    background-color: rgba(148, 163, 184, 0.1);
    color: #e2e8f0;
  }

  .modal-body {
    padding: 24px;
  }

  .scrollable-content {
    max-height: 350px;
    overflow-y: auto;
    padding-right: 8px;
    line-height: 1.8;
    color: #94a3b8;
  }

  .scrollable-content h4 {
    color: #e2e8f0;
    margin: 1.5rem 0 0.8rem;
  }

  .scrollable-content h4:first-child {
    margin-top: 0;
  }

  .scrollable-content p {
    margin: 0.5rem 0;
  }

  .modal-footer {
    padding: 16px 24px;
    border-top: 1px solid rgba(148, 163, 184, 0.1);
    display: flex;
    justify-content: flex-end;
    gap: 12px;
  }

  /* 响应式适配 */
  @media (max-width: 480px) {
    .login-card {
      padding: 25px 20px;
    }

    .modal-body {
      padding: 18px;
    }

    .scrollable-content {
      max-height: 250px;
    }
  }
</style>
