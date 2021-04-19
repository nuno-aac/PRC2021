<template>
  <div class="home">
    <div class="text-h2 mb-10"> <strong> Publicação </strong> </div>
    <Box class="publication">
        <ul class="pa-10">
            <li v-for="(value,key) in pub" :key="key">
                <strong>{{value.p.value.substring(value.p.value.indexOf('#') + 1)}}:</strong>
                {{value.o.value.substring(value.o.value.indexOf('#') + 1)}}
            </li>
        </ul>
    </Box>
  </div>
</template>


<script>
import axios from 'axios'
import Box from '../components/Box.vue'

export default {
  name: 'Publications',
  data () {
    return {
      loading: false,
      pub: null,
      error: null
    }
  },
  components: {
      Box
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
      const id = this.$route.params.id
      console.log('HERE')
      axios.get('http://localhost:3000/pubs/' + id)
        .then(dados => { 
            console.log(dados.data) 
            this.pub = dados.data;
        })
        .catch(err => console.log(err))
      
    }
  }
}

</script>


<style scoped>
    .publication {
        width: 80vw;
        margin: 10px;
    }
    .home {
        width: 100vw;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    ul {
        text-align: center;
        list-style-position: inside;
    }
</style>