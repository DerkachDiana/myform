<template>
  <div class = "form" id="passportForm">
    <span class="spans" id="title">Паспортные данные</span>
    <SelectorComponent v-model="selectedDocumentType"  title="Паспорт" :nameErrors="passportErrors[0]" :items="arrayOfDocumentTypes" />
    <text-component v-model:value="series" :blur="v$.series.$touch" title="Серия паспорта" :textError="seriesErrors[0]"/>
    <text-component v-model:value="passportNumber" :blur="v$.passportNumber.$touch" title="Номер паспорта" :text-error="passportNumberErrors[0]"/>
    <text-component v-model:value="passed" :blur="v$.passed.$touch" title="Кем выдан"/>
    <text-component v-model:value="passedDate" :blur="v$.passedDate.$touch" title="Дата выдачи*" :text-error="passedDateErrors[0]"/>
  </div>
</template>

<script>
import SelectorComponent from './SelectorComponent'
import useVuelidate from '@vuelidate/core'
import { required, numeric } from '@vuelidate/validators'
import TextComponent from './TextComponent'
import { seriesValidation, dateValidator, passportNumberValidation } from '../assets/validators'

export default {
  setup () {
    return { v$: useVuelidate() }
  },
  name: 'Passport',
  components: { TextComponent, SelectorComponent },
  data () {
    return {
      arrayOfDocumentTypes: ['Паспорт', 'Свидетельство о рождении', 'Водительское удостоверение'],
      selectedDocumentType: 'Паспорт',
      series: '',
      passportNumber: '',
      passed: '',
      passedDate: ''
    }
  },
  computed: {
    errors () {
      if (this.v$.$errors) return this.v$.$errors.length
      else return 0
    },
    passportErrors () {
      const errors = []
      if (this.selectedDocumentType.length === 0) errors.push('Выберете тип документа')
      return errors
    },
    seriesErrors () {
      const errors = []
      if (this.series.length !== 0 && this.v$.series.seriesValidation.$invalid) errors.push('Серия паспорта должна состоять из 4-х цифр')
      return errors
    },
    passportNumberErrors () {
      const errors = []
      if (this.passportNumber.length !== 0 && this.v$.passportNumber.passportNumberValidation.$invalid) errors.push('Номер паспорта должен состоять из 6-ти цифр')
      return errors
    },
    passedDateErrors () {
      const errors = []
      if (this.v$.passedDate.dateValidator.$invalid) errors.push('Заполните поле')
      return errors
    }
  },
  validations: {
    documentType: { required },
    series: { seriesValidation },
    passportNumber: { required, numeric, passportNumberValidation },
    passed: {},
    passedDate: { dateValidator }
  },
  watch: {
    errors: {
      handler () {
        return this.$emit('errorsChanged', this.errors)
      }
    }
  }
}
</script>

<style scoped>

</style>
