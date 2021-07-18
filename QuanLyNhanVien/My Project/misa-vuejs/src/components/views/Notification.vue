<template>
  <div
    class="toast hide"
    :class="{
      'show-toast': isShow,
      'hide-toast': isHide,
      alert: toastMode == 'alert',
      success: toastMode == 'success',
    }"
  >
    <div class="toast-content">
      <div class="icon icon-item"></div>
      <div class="message">{{ message }}</div>
    </div>
    <div class="toast-close X" @click="closeToast"></div>
  </div>
</template>

<script>
export default {
  name: "Notification",
  props: {
    message: {
      type: String,
      default: null,
    },
    NotificationMode: {
      type: String,
      default: null,
    },
    isShow: {
      type: Boolean,
      default: false,
    },
    isHide: {
      type: Boolean,
      default: false,
    },
    toastMode: {
      type: String,
      default: "",
    },
  },
  methods: {
    closeToast() {
      this.$emit("closeToast");
    },
  },
};
</script>

<style scoped>
.toast {
  position: absolute;
  top: 10px;
  width: 250px;
  min-height: 48px;
  display: flex;
  align-items: center;
  box-shadow: 0px 3px 6px;
  background-color: #ffffff;
  border-radius: 4px;
}

.icon-item {
  width: 24px;
  height: 24px;
  margin-left: 16px;
  border-radius: 50%;
  margin-right: 0;
}
.alert .icon {
  background: url("../../assets/img/alert-triangle.svg");
  background-size: contain;
  background-size: 50;
}

.success .icon {
  background: url("../../assets/img/success.svg");
  background-size: contain;
  background-repeat: no-repeat;
  background-color: greenyellow;
}

.alert .toast-close {
  position: absolute;
  right: 16px;
  width: 13px;
  height: 13px;
  background: url("../../assets/img/x.svg");
  background-size: contain;
  cursor: pointer;
}

.success .toast-close {
  position: absolute;
  right: 16px;
  width: 13px;
  height: 13px;
  background: url("../../assets/img/x.svg");
  background-size: contain;
  cursor: pointer;
}

.toast-content {
  display: flex;
  align-items: center;
}

.toast-content .message {
  position: absolute;
  left: 50px;
  right: 40px;
}
.hide {
  display: none;
}
.show-toast {
  animation: showToast 0.5s ease-out 1;
  right: 16px;
  display: flex;
}

.hide-toast {
  animation: hideToast 1s ease-out 1;
    right: -255px;   
    display: flex;
}

@keyframes showToast {
  from {
    right: -255px;
  }
  to {
    right: 16px;
  }
}
@keyframes hideToast {
  from {
    right: 16px;
  }
  to {
     right: -200px; 
  }
}
</style>