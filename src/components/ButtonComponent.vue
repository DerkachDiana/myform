<template>
  <button @click="createClient">Создать клиента</button>
</template>

<script>
export default {
  name: 'Button'
}
</script>

<style scoped>
button {
  box-shadow: 0 0  13px #888888;
  border-radius: 20px;
  padding: 20px 30px;
  background-color: #4676D7;
  border-color: #7d9cda;
  color: white;
}
</style>
