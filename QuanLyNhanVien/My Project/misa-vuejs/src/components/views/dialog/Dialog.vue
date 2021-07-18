<template>
  <!-- Form Loading CSS sau khi refresh data -->
  <div class="hello">
       <div class="loading-content-1">
          
         <div class="loading-modal-1"></div>
         <div class="loading-icon-1">
              <div class="loading-con">
                  Xóa bản ghi
              </div>
               <div class="header-close" @click="btnCloseOnClick()"></div>
              <div class="loading-con-1">
                  <div class="load-icon-1">
                      <i class="fas fa-exclamation-triangle load-icon-2"></i>
                  </div>
                  <div class="load-text-1">
                      Bạn có chắc chắn muốn xóa dữ liệu bản ghi này hay không ?
                  </div>
              </div>
              <div class="footer-warm">
                  <div>
                      <button class="first-warm" @click="btnCloseOnClick()">
                            Hủy
                      </button>
                  </div>
                   <div>
                       <button class="second-warm" @click="btnDeleteOnClick()">
                            Xóa
                       </button>
                   </div>
              </div>

         </div>
    </div>
  </div>
  <!-- End loading css -->
</template>

<script>
// import axios from "axios";
export default {
   
 props: {
    isShowss: { type: Boolean, default: false },
  
   
 }
 ,
  methods : {
       btnCloseOnClick() {
      // cho thằng con gọi sự kiện đến cha emit
      this.$emit("HideDialog");
    },
    
      btnDeleteOnClick() {
        this.$emit("btnDeleteOnClick");
       
    },
    


  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
@import '../../../style/common/dialog.css';

.loading{
    display: none;
    
}


</style>
