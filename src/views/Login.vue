<template>
  <div class="login-container">
    <h1>登录页面</h1>
    <form @submit.prevent="handleLogin">
      <div>
        <label for="username">用户名:</label>
        <input id="username" v-model="username" required />
      </div>
      <div>
        <label for="password">密码:</label>
        <input id="password" v-model="password" type="password" required />
      </div>
      <button type="submit">登录</button>
    </form>
  </div>
</template>

<script setup>
  import { ref } from 'vue';

  const username = ref('');
  const password = ref('');

  const handleLogin = () => {
    // 这里可以添加登录逻辑，例如调用API进行身份验证
    alert(`用户名: ${username.value}, 密码: ${password.value}`);
  };
</script>

<style scoped>
  .login-container {
    max-width: 400px;
    margin: 50px auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
    background-color: #f9f9f9;
  }

  label {
    display: block;
    margin-bottom: 8px;
    font-weight: bold;
  }

  input {
    width: 100%;
    padding: 8px;
    margin-bottom: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  button {
    width: 100%;
    padding: 10px;
    background-color: #42b983;
    border: none;
    border-radius: 4px;
    color: white;
    font-size: 16px;
    cursor: pointer;
  }

  button:hover {
    background-color: #369870;
  }
</style>
