<template>
  <div class="form">
    <span class="spans" id="title">Адрес</span>
    <text-component v-model:value="index" :blur="v$.index.$touch" title="Индекс" :text-error="indexErrors[0]"></text-component>
    <text-component v-model:value="country" :blur="v$.country.$touch" title="Страна" ></text-component>
    <text-component v-model:value="area" :blur="v$.area.$touch" title="Область" :text-error="areaErrors[0]" ></text-component>
    <text-component v-model:value="city" :blur="v$.city.$touch" title="Город*" :text-error="cityErrors[0]" ></text-component>
    <text-component v-model:value="street" :blur="v$.street.$touch" title="Улица" :text-error="streetErrors[0]" ></text-component>
    <text-component v-model:value="houseNumber" :blur="v$.houseNumber.$touch" title="Номер дома" :text-error="houseNumberErrors[0]" ></text-component>
  </div>
</template>

<script>
import '../assets/styles.scss'
import TextComponent from './TextComponent'
import { indexValidator, russianAlpha, streetValidator } from '../assets/validators'
import { numeric, required } from '@vuelidate/validators'
import useVuelidate from '@vuelidate/core'

export default {
  setup () {
    return { v$: useVuelidate() }
  },
  name: 'Adress',
  components: { TextComponent },
  computed: {
    errors () {
      if (this.v$.$errors) return this.v$.$errors.length
      else return 0
    },
    indexErrors () {
      const errors = []
      if (this.index.length !== 0 && this.v$.index.indexValidator.$invalid) errors.push('Вы ввели неправильный индекс')
      return errors
    },
    cityErrors () {
      const errors = []
      if (this.city.length === 0) errors.push('Заполните поле')
      return errors
    },
    areaErrors () {
      const errors = []
      if (this.area.length !== 0 && this.v$.area.russianAlpha.$invalid) errors.push('Название области может модержать только буквы')
      return errors
    },
    streetErrors () {
      const errors = []
      if (this.street.length !== 0 && this.v$.street.streetValidator.$invalid) errors.push('Название улицы может модержать только русские буквы')
      return errors
    },
    houseNumberErrors () {
      const errors = []
      if (this.houseNumber.length !== 0 && this.v$.houseNumber.numeric.$invalid) errors.push('Название области может модержать только цифры')
      return errors
    }
  },
  data () {
    return {
      index: '',
      country: '',
      area: '',
      city: '',
      street: '',
      houseNumber: ''

    }
  },
  validations: {
    index: { indexValidator },
    city: { russianAlpha, required },
    area: { russianAlpha },
    country: { russianAlpha },
    street: { streetValidator },
    houseNumber: { numeric }
  },
  methods: {
  },
  watch: {
    errors: {
      handler () {
        this.$emit('errorsChanged', this.errors)
      },
      immediate: false
    }
  }
}
</script>

<style scoped>

</style>
