<template>
  <div class="hello">
    <!-- Form Navbar -->
    <div class="navbar">
      <div class="navbar-content">
        <router-link to="/hello"
        >
            <div class="nav-item">
          <div class="nav-item-icon nav-item-icon-1"></div>
          <div class="nav-item-text">Tổng quan</div>
        </div>
        </router-link>
         <router-link to="/hello2"
         >
            <div class="nav-item">
          <div class="nav-item-icon nav-item-icon-2"></div>
          <div class="nav-item-text">Báo cáo</div>
        </div>
         </router-link>
          <router-link to="/hello3"
          >
           <div class="nav-item">
          <div class="nav-item-icon nav-item-icon-3"></div>
          <div class="nav-item-text">Mua hàng</div>
        </div>
          </router-link>
       

        <router-link to="/customer">
          <div class="nav-item" >
            <div class="nav-item-icon nav-item-icon-4"></div>
            <div class="nav-item-text">Danh sách khách hàng</div>
          </div>
        </router-link>
        <router-link to="/employee">
          <div class="nav-item" >
            <div class="nav-item-icon nav-item-icon-6"></div>
            <div class="nav-item-text">Danh sách nhân viên</div>
          </div>
        </router-link>
        <router-link  to="/hello4">
           <div class="nav-item" >
          <div class="nav-item-icon nav-item-icon-5"></div>
          <div class="nav-item-text">Thiết lập hệ thống</div>
        </div>
        </router-link>
      
      </div>
    </div>
    <!-- End Navbar -->
  </div>
</template>

<script>
export default {
  props: {},
  data() {
    return {
      rowSelected : null,
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "../../style/common/modal.css";
@import "../../style/common/navbar.css";
@import "../../style/common/toolbar.css";
.router-link-exact-active .nav-item{
  background: #2fbe8e !important;
  color:white !important;
;
}

</style>
