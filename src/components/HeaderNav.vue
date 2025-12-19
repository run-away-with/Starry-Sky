<template>
  <!-- 顶部固定导航栏 -->
  <header class="header-container">
    <!-- 左侧 Logo/首页入口 -->
    <div class="header-left" @click="navigateTo('/home')">
      <h1 class="logo">Starry Sky</h1>
    </div>

    <!-- 中间导航菜单 -->
    <nav class="header-nav">
      <router-link to="/home" class="nav-item" active-class="active">
        首页
      </router-link>
      <router-link to="/More" class="nav-item" active-class="active">
        星球探索
      </router-link>
      <router-link to="/about" class="nav-item" active-class="active">
        关于我们
      </router-link>
      <router-link to="/login" class="nav-item" active-class="active">
        登录入口
      </router-link>
    </nav>

    <!-- 右侧用户信息/登录入口 -->
    <div class="header-right">
      <!-- 已登录：显示用户信息 + 退出按钮 -->
      <div v-if="currentUser" class="user-info">
        <img
          :src="userAvatar"
          alt="用户头像"
          class="user-avatar"
          @click.stop="toggleUserMenu"
        />
        <span class="user-name">{{ currentUser }}</span>
        <button class="logout-btn" @click.stop="handleLogout">退出</button>

        <!-- 可选：用户下拉菜单（如需扩展） -->
        <div v-if="showUserMenu" class="user-menu">
          <router-link to="/profile" @click="toggleUserMenu">
            个人中心
          </router-link>
          <router-link to="/settings" @click="toggleUserMenu">设置</router-link>
        </div>
      </div>

      <!-- 未登录：显示登录入口 -->
      <router-link v-else to="/login" class="login-btn">登录/注册</router-link>
    </div>
  </header>
</template>

<script setup>
  import { ref, computed, onMounted, onUnmounted } from 'vue';
  import { useRouter, RouterLink } from 'vue-router';

  const router = useRouter();
  // 响应式数据
  const currentUser = ref(''); // 当前登录用户名
  const showUserMenu = ref(false); // 用户下拉菜单显隐
  const clickOutsideHandler = ref(null); // 点击外部关闭菜单的事件句柄

  // 计算属性：用户头像（默认+个性化）
  const userAvatar = computed(() => {
    if (!currentUser.value) return 'src/assets/starry-sky-background.jpg'; // 默认头像
    // 可根据用户名生成个性化头像（示例：固定几个头像循环）
    const avatars = [
      '/src/assets/starry-sky-background.png',
      '/src/assets/black-sky.png',
      '/src/assets/starry-sky-background.png'
    ];
    const index = currentUser.value.charCodeAt(0) % avatars.length;
    return avatars[index];
  });

  // 初始化：读取本地存储的登录状态
  onMounted(() => {
    currentUser.value = localStorage.getItem('currentUser') || '';
    // 监听点击外部关闭用户菜单
    clickOutsideHandler.value = e => {
      const userInfo = document.querySelector('.user-info');
      if (userInfo && !userInfo.contains(e.target)) {
        showUserMenu.value = false;
      }
    };
    document.addEventListener('click', clickOutsideHandler.value);
  });

  // 销毁：移除事件监听
  onUnmounted(() => {
    document.removeEventListener('click', clickOutsideHandler.value);
  });

  // 跳转页面（通用方法）
  const navigateTo = path => {
    router.push(path);
  };

  // 切换用户下拉菜单
  const toggleUserMenu = () => {
    showUserMenu.value = !showUserMenu.value;
  };

  // 退出登录
  const handleLogout = () => {
    localStorage.removeItem('currentUser'); // 清除登录状态
    currentUser.value = '';
    showUserMenu.value = false;
    router.push('/login'); // 跳转到登录页
  };
</script>

<style scoped>
  /* 导航栏容器：固定顶部 + 全屏宽度 */
  .header-container {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 60px;
    background-color: rgba(0, 0, 0, 0.9);
    backdrop-filter: blur(10px);
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 2rem;
    box-sizing: border-box;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
    z-index: 999; /* 确保在最顶层 */
  }

  /* 左侧 Logo 区域 */
  .header-left {
    cursor: pointer;
  }

  .logo {
    margin: 0;
    font-size: 1.5rem;
    color: #64b5f6;
    text-shadow: 0 0 10px rgba(100, 181, 246, 0.8);
    transition: color 0.3s ease;
  }

  .header-left:hover .logo {
    color: #90caf9;
  }

  /* 中间导航菜单 */
  .header-nav {
    display: flex;
    gap: 2rem;
  }

  .nav-item {
    color: #e0e0ff;
    text-decoration: none;
    font-size: 1rem;
    padding: 0.5rem 0;
    border-bottom: 2px solid transparent;
    transition: all 0.3s ease;
  }

  .nav-item:hover {
    color: #64b5f6;
    border-bottom: 2px solid #64b5f6;
  }

  .nav-item.active {
    color: #64b5f6;
    border-bottom: 2px solid #64b5f6;
    font-weight: 600;
  }

  /* 右侧用户信息区域 */
  .header-right {
    display: flex;
    align-items: center;
  }

  /* 未登录：登录按钮 */
  .login-btn {
    color: #64b5f6;
    text-decoration: none;
    padding: 0.5rem 1rem;
    border: 1px solid #64b5f6;
    border-radius: 4px;
    transition: all 0.3s ease;
  }

  .login-btn:hover {
    background-color: rgba(100, 181, 246, 0.1);
    color: #90caf9;
  }

  /* 已登录：用户信息 */
  .user-info {
    display: flex;
    align-items: center;
    gap: 0.8rem;
    position: relative; /* 用于下拉菜单定位 */
  }

  .user-avatar {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid #64b5f6;
    cursor: pointer;
    transition: transform 0.3s ease;
  }

  .user-avatar:hover {
    transform: scale(1.1);
  }

  .user-name {
    font-size: 0.9rem;
    color: #e0e0ff;
  }

  .logout-btn {
    padding: 0.4rem 0.8rem;
    background-color: rgba(244, 67, 54, 0.2);
    border: 1px solid #f44336;
    border-radius: 4px;
    color: #f44336;
    cursor: pointer;
    font-size: 0.8rem;
    transition: all 0.3s ease;
  }

  .logout-btn:hover {
    background-color: rgba(244, 67, 54, 0.4);
    color: #fff;
  }

  /* 用户下拉菜单 */
  .user-menu {
    position: absolute;
    top: 120%;
    right: 0;
    background-color: rgba(0, 0, 0, 0.95);
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
    width: 120px;
    padding: 0.5rem 0;
    z-index: 100;
  }

  .user-menu a {
    display: block;
    padding: 0.5rem 1rem;
    color: #e0e0ff;
    text-decoration: none;
    font-size: 0.9rem;
    transition: background-color 0.3s ease;
  }

  .user-menu a:hover {
    background-color: rgba(100, 181, 246, 0.2);
    color: #64b5f6;
  }

  /* 响应式适配：小屏幕下导航菜单折叠（可选） */
  @media (max-width: 768px) {
    .header-nav {
      gap: 1rem;
    }

    .user-name {
      display: none; /* 小屏幕隐藏用户名，只留头像 */
    }

    .logo {
      font-size: 1.2rem;
    }
  }
</style>
