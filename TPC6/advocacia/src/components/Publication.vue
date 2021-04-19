<template>
<router-link :to="'/pubs/' + pub.pub.value.substring(pub.pub.value.indexOf('#') + 1)" class="text-decoration-none">
    <Box class='list-item'>
        <div class='pub-content'>
            <div class='text-h5 pub-id'>
                {{pub.pub.value.substring(pub.pub.value.indexOf('#') + 1)}}
            </div>
            <div class='mt-6 pub-info'>
                <span class='text-h6'> {{pub.title.value}} </span> <br/>
                <span class='text-subtitle text--secondary'>
                    {{pub.type.value.substring(pub.type.value.indexOf('#') + 1)}}
                    | 
                    {{pub.year.value}}
                </span>
            </div>
        </div>
    </Box>
</router-link>
</template>

<script>
import Box from './Box.vue'

export default {
  name: 'Publication',
  components: {
      Box
  },
  props: ['pub'],
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
