<template>
  <div class="input-box">
    <span class="spans">{{title}}</span>
    <div v-for="(item, index) in items" :key="index" class="line">
      <input type="radio" class="radio" :id="item" :value="item" v-model="radio" @change="onChange" >
      <label :for="item.id" class="fontConfiguration">{{item}}</label>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CheckboxComponent',
  data () {
    return {
      modelValue: '',
      radio: 'radio'
    }
  },
  props: {
    title: String,
    items: {
      type: Array
    }
  },
  methods: {
    onChange (event) {
      this.$emit('update:modelValue', event.target.value)
    }
  }
}
</script>

<style scoped>

</style>
