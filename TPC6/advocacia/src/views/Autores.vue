<template>
  <div class="home">
    <div class="text-h2 ma-6"> <strong> Autores </strong> </div>
    <div class="list-wrapper">
        <Autor v-for="autor in autores" :autor = "autor" :key= "autor.author.value.substring(autor.author.value.indexOf('#') + 1)" />
    </div>
  </div>
</template>


<script>
import axios from 'axios'
import Autor from '../components/Autor.vue'

export default {
  name: 'Autores',
  data () {
    return {
      loading: false,
      autores: null,
      error: null
    }
  },
  components: {
      Autor
  },
  created () {
    // fetch the data when the view is created and the data is
    // already being observed
    this.fetchData()
  },
  watch: {
    // call again the method if the route changes
    '$route': 'fetchData'
  },
  methods: {
    fetchData () {
      this.error = this.post = null
      this.loading = true
      //const author = this.$route.query.author
      console.log('HERE')
      axios.get('http://localhost:3000/authors')
        .then(dados => { 
            console.log(dados.data) 
            this.autores = dados.data;
        })
        .catch(err => console.log(err))
      
    }
  }
}

</script>


<style scoped>
    .list-item {
        width: 80vw;
        margin: 10px;
    }
    .list-wrapper {
        width: 100vw;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
</style>