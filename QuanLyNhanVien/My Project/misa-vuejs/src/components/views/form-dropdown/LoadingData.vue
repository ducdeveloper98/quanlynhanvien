<template>
  <!-- Form Loading CSS sau khi refresh data -->
  <div class="hello">
       <div class="loading-content" :class="{ loading: !isShows}">
         <div class="loading-modal"></div>
         <div class="loading-icon"></div>
    </div>
  </div>
  <!-- End loading css -->
</template>

<script>
export default {
 props: {
    isShows: { type: Boolean, default: false }
  
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.loading{
    display: none;
}

</style>
