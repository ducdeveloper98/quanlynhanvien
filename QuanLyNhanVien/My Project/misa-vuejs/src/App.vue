<!-- Hiển thị html -->
<template>
 <!-- Router -->
  <div id="app">
   
    <!-- Header -->
     <the-header/>
    <!-- End Header -->
    <!-- Left navbar -->
     <the-navbar/>
    
    <!-- End left navbar -->
    <!-- Content -->
      <the-content/>
      <router-view></router-view>
     
    <!-- End content -->
   
  </div> 
 
</template>
<!-- Xử lý dữ liệu -->
<script>
import TheHeader from './components/layout/TheHeader.vue';
import TheNavbar from './components/layout/TheNavbar.vue';
import TheContent from './components/layout/TheContent.vue';
// import customerList from './components/views/customer/customerList.vue';
export default {
  name: 'App',
  // data : hiển thị dữ liệu
  data() {
    return {
      
    }
  },
   components: {
        TheHeader,
        TheNavbar,
        TheContent,
        // customerList
   }
  }

</script>
<!-- Hỗ trợ css và scss làm đẹp trang web,... 
Scope : dành riêng cho component-->
<style>

</style>
