<template>
  <div class="d-flex flex-column">
    <div class="mx-auto col-10">
      <h1 class='mb-2 mb-md-3'
      data-delay='.1'
      data-preset='opacity,y'>404.<br/>Page not found.</h1>

      <div class='should-animate1'
      data-delay='.2'
      data-preset='opacity,y'>
        <nuxt-link 
        to='/' 
        class='text-uppercase link'>
          <span class="text">Let's go home</span>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Error',

  head()  {
    return {
        title: '404 Not Found',
    }
  },
}
</script>

<style lang="scss" scoped>
</style>
