<template>
  <div class="container">
    <div class = "background">
      <div class = "background__box-1">
        <div class="background__box-1__box-2">
          <personal-form v-model="personalErrors" @errorsChanged="takePersonalErrors"/>
          <address-form v-model="addressErrors" @errorsChanged="takeAddressErrors" />
        </div>
        <passport-form v-model="passportErrors" @errorsChanged="takePassportErrors"/>
        <button-component class="button" @click="itsAllright"/>
      </div>
    </div>
  </div>
  <popup-component :all-errors="allErrors" :is-dirty="isDirty"/>
</template>

<script>
import PersonalForm from './components/PersonalForm'
import AddressForm from './components/AdressForm'
import PassportForm from './components/PassportForm'
import ButtonComponent from './components/ButtonComponent'
import useVuelidate from '@vuelidate/core'
import PopupComponent from './components/PopupComponent'
export default {
  setup () {
    return { v$: useVuelidate() }
  },
  components: { PopupComponent, ButtonComponent, AddressForm, PersonalForm, PassportForm },
  data () {
    return {
      numberOfErrors: 0,
      addressErrors: 0,
      passportErrors: 0,
      personalErrors: 0
    }
  },
  methods: {
    itsAllright () {
      document.getElementById('dark-screen').style.display = 'block'
    },
    takePersonalErrors (event) {
      this.personalErrors = event
      console.log(event)
    },
    takePassportErrors (event) {
      this.passportErrors = event
    },
    takeAddressErrors (event) {
      this.addressErrors = event
    }
  },
  computed: {
    isDirty () {
      return this.v$.$anyDirty
    },
    allErrors () {
      return this.addressErrors + this.passportErrors + this.personalErrors
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
}

#dark-screen{
  display: none;
  position: fixed;
  top:0;
  left:0;
  z-index: 100;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.45);
}
</style>
