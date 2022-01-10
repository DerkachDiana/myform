<template>
  <div class = "form">
    <span class="spans" id="title">Персональная информация</span>
    <text-component v-model:value.trim="secondName" title="Фамилия*" :text-error="secondNameErrors[0]" :blur="v$.secondName.$touch"/>
    <text-component v-model:value="name" title="Имя*" :text-error="nameErrors[0]" :blur="v$.name.$touch"/>
    <text-component v-model:value="patronymic" title="Отчество" :text-error="patronymicErrors[0]" :blur="v$.patronymic.$touch"/>
    <text-component v-model:value="birthday" title="Дата рождения* (ДД.ММ.ГГГГ)" :text-error="dateErrors[0]" :blur="v$.birthday.$touch"/>
    <text-component v-model:value="phone" title="Номер телефона*" :text-error="phoneErrors[0]" :blur="v$.phone.$touch"/>
    <RadioComponent v-model="checkedGender" title="Пол" :items="arrayOfGenders"/>
    <SelectorComponent title="Группа клиентов*" v-model="clientGroup" multiple="true" :name-errors="clientGroupErrors[0]" :items="arrayOfClientGroups"/>
    <SelectorComponent title="Лечащий врач" :items="arrayOfDoctors" v-model="selectedDoctor"/>
    <CheckboxComponent title="Не отправлять СМС" v-model="isDontMessageChecked" />
  </div>

</template>

<script>
import useVuelidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import { dateValidator, phoneValidator, russianAlpha } from '../assets/validators'
import TextComponent from './TextComponent'
import RadioComponent from './RadioComponent'
import SelectorComponent from './SelectorComponent'
import CheckboxComponent from './CheckboxComponent'
export default {
  name: 'Basic',
  components: { CheckboxComponent, SelectorComponent, TextComponent, RadioComponent },
  setup () {
    return { v$: useVuelidate() }
  },
  data () {
    return {
      secondName: '',
      name: '',
      patronymic: '',
      birthday: '',
      phone: '',
      clientGroup: '',
      arrayOfDoctors: ['Иванов', 'Захаров', 'Чернышева'],
      checkedGender: '',
      arrayOfGenders: ['Мужчина', 'Женщина'],
      arrayOfClientGroups: ['VIP', 'Проблемные', 'ОМС'],
      selectedDoctor: '',
      isDontMessageChecked: false,
      numberOfErrors: 0
    }
  },
  methods: {
    createClient () {
      if (this.v$.$anyDirty && this.v$.$errors.length === 0) this.flag = true
      else this.flag = true
    }
  },
  validations: {
    secondName: { required, russianAlpha },
    name: { required, russianAlpha },
    patronymic: { russianAlpha },
    birthday: { required, dateValidator },
    phone: { required, phoneValidator },
    clientGroup: { required }
  },
  computed: {
    errors () {
      if (this.v$.$errors) return this.v$.$errors.length
      else return 0
    },
    secondNameErrors () {
      const errors = []
      if (this.v$.secondName.required.$invalid) errors.push('Заполните поле')
      else if (this.v$.secondName.russianAlpha.$invalid && !this.v$.secondName.required.$invalid) errors.push('Фамилия должна содержать только русские буквы')
      return errors
    },
    nameErrors () {
      const errors = []
      if (this.v$.name.required.$invalid) errors.push('Заполните поле')
      else if (this.v$.name.russianAlpha.$invalid && !this.v$.name.required.$invalid) errors.push('Имя должно содержать только русские буквы')
      return errors
    },
    patronymicErrors () {
      const errors = []
      if (this.v$.patronymic.russianAlpha.$invalid && this.patronymic.length !== 0) errors.push('Отчество должно содержать только русские буквы')
      return errors
    },
    dateErrors () {
      const errors = []
      if (this.birthday === '') errors.push('Заполните поле')
      if (this.v$.birthday.dateValidator.$invalid && !this.v$.birthday.required.$invalid) errors.push('Введите дату в формате (ДД.ММ.ГГГГ)')
      return errors
    },
    phoneErrors () {
      const errors = []
      if (this.v$.phone.phoneValidator.$invalid && !this.v$.phone.required.$invalid) errors.push('Введите номер начиная с 7')
      if (this.v$.phone.required.$invalid) errors.push('Заполните поле')
      return errors
    },
    clientGroupErrors () {
      const errors = []
      if (this.v$.clientGroup.$model.length === 0) errors.push('Выберете группу')
      return errors
    }
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
