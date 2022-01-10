<template>
  <div class="input-box">
    <div class = "line-without-gap">
      <span class="spans">{{title}}</span>
      <span class = "spans red">{{ textError }}</span>
    </div>
    <input type="text" :value="value" @input="updateModelValue" @blur="blur">
  </div>
</template>

<script>
import '../assets/styles.scss'
export default {
  name: 'textComponent',
  props: {
    title: String,
    textError: String,
    variableName: String,
    blur: String,
    value: String
  },
  data () {
    return {
      model: ''
    }
  },
  methods: {
    updateModelValue (event) {
      this.$emit('update:value', event.target.value)
    }
  }
}
</script>

<style scoped>

</style>
