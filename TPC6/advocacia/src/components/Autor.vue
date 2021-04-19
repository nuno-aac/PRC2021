<template>
    <Box class='list-item'>
        <div class='pub-content'>
            <div class='text-h5 pub-id'>
                {{autor.author.value.substring(autor.author.value.indexOf('#') + 1)}}
            </div>
            <div class='mt-6 pub-info'>
                <span class='text-h6'> {{autor.name.value}} </span> <br/>
                <span class='text-subtitle text--secondary'>
                    <router-link :to="'/pubs?author=' + autor.author.value.substring(autor.author.value.indexOf('#') + 1)">Publicações</router-link>
                </span>
            </div>
        </div>
    </Box>
</template>

<script>
import Box from './Box.vue'

export default {
  name: 'Autor',
  components: {
      Box
  },
  props: ['autor'],
}
</script>

<style>
    .list-item {
        width: 80vw;
        margin: 10px;
    }
    .pub-content {
        display: grid;
        grid: 8vw / 20% 80%
    }
    .pub-id {
        display: grid;
        place-items: center;
    }
    .pub-info {
        width: 100%;
        text-align: left;
    }
</style>
