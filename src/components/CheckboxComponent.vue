<template>
  <div class = "line-without-gap">
    <span class="spans">{{title}}</span>
    <input type = "checkbox" value = "checked" :v-model="checked" @change="isChecked">
  </div>
</template>
<script>
export default {
  name: 'CheckboxComponent',
  props: {
    title: String,
    modelValue: Boolean
  },
  data () {
    return {
      checked: false
    }
  },
  methods: {
    isChecked (event) {
      console.log(event)
      this.$emit('update:modelValue', event.target.checked)
    }
  }
}
</script>
<style scoped lang="scss">

</style>
