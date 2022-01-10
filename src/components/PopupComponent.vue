<template>
  <div id="dark-screen" @click="show_hide">
    <div class="success" v-if="allErrors===0 && isDirty">
      Клиент успешно создан!
    </div>
    <div class="failure" v-if="allErrors===0 && !isDirty">
      Заполните форму
    </div>
    <div class="failure" v-if="allErrors!==0">
      Проверьте правильность заполнения формы
    </div>
  </div>
</template>

<script>
export default {
  name: 'PopupComponent',
  props: {
    allErrors: Number,
    isDirty: Boolean
  },
  methods: {
    show_hide () {
      if (document.getElementById('dark-screen').style.display === 'none') {
        document.getElementById('dark-screen').style.display = 'block'
      } else if (document.getElementById('dark-screen').style.display === 'block') {
        document.getElementById('dark-screen').style.display = 'none'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/breakpoints";
@mixin popup {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 13pt;
  text-transform: uppercase;
  font-weight: bold;
  position: absolute;
  top: 30%;
  left: 40%;
  background-color: white;
  width: 250px;
  height: 100px;
  box-shadow: 0 0 10px 3px;
  border-radius: 10px;
  z-index: 2;
  @include for-phone-only {width: 200px; height: 80px; font-size: 9pt; left:20%;}
}
.failure {
  @include popup;
  color: red;
}
.success {
  @include popup;
  color: green;
}
</style>
