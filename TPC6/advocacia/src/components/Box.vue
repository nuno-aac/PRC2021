<template>
    <v-card class="wrapper">
        <div class="content"> 
            <slot></slot>
        </div>
    </v-card>
</template>

<script>


export default {
  name: 'Box',
}
</script>

<style scoped>
    .wrapper {
        padding: 3px;
        border-radius: 6%;
        background: rgb(173,214,31);
        background: linear-gradient(90deg, rgba(173,214,31,1) 0%, rgba(35,145,0,1) 53%, rgba(0,186,184,1) 100%);
    }
    .content {
        border-radius: 3%;
        background: white
    }
</style>
