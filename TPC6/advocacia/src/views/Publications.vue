<template>
  <div class="home">
    <div class="text-h2 mb-10"> <strong> Publicações </strong> </div>
    <div class="list-wrapper">
        <Publication v-for="pub in pubs" :pub = "pub" :key= "pub.pub.value.substring(pub.pub.value.indexOf('#') + 1)" />
    </div>
  </div>
</template>


<script>
import axios from 'axios'
import Publication from '../components/Publication.vue'

export default {
  name: 'Publications',
  data () {
    return {
      loading: false,
      pubs: null,
      error: null
    }
  },
  components: {
      Publication
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
      const author = this.$route.query.author
      let qs = ""
      if(author){
        qs = "?author="+author
        console.log('HEREeeeeee')
      }
      console.log('HERE')
      axios.get('http://localhost:3000/pubs'+qs)
        .then(dados => { 
            console.log(dados.data) 
            this.pubs = dados.data;
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