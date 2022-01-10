<template>
  <div class="input-box">
    <div class = "line-without-gap">
      <span class = "spans">{{title}}</span>
      <span class = "spans red">{{nameErrors}}</span>
    </div>
    <select v-if="!multiple" :v-model="modelValue" @change="changeOption" class="slct" >
      <option v-for="(item, index) in items" :key="index" :value="item.value">{{item}}</option>
    </select>
    <select v-if="multiple" :v-model="modelValue" @change="changeOption" multiple class="slct" >
      <option v-for="(item, index) in items" :key="index" :value="item.value" class="fontConfig">{{item}}</option>
    </select>
  </div>
</template>

<script>
export default {
  name: 'SelectorComponent',
  emits: ['getSelected'],
  props: {
    nameErrors: String,
    title: String,
    items: {
      type: Array
    },
    multiple: {
      type: Boolean,
      default: false
    },
    modelValue: {
      type: String
    }
  },
  data () {
    return {
      selected: ''
    }
  },
  methods: {
    changeOption (event) {
      this.$emit('update:modelValue', event.target.value)
    }
  }
}
</script>

<style scoped>

</style>
