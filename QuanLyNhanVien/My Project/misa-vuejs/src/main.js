import { createApp } from 'vue';
// import { defineComponent } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue';

import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
/**
 * Import 2 link để chuyển trang
 * Create by DucNT (17.06.2021)
 * 
 */
import customerList from './components/views/customer/CustomerList.vue';
import TheContent from './components/layout/TheContent.vue';
import HelloWorld from './components/HelloWorld.vue';

/**
 * Khai báo đường link dãn đến components
 * Create by DucNT (17.06.2021)
 */

const routes = [
    { path: '/customer', name: 'customer', component: customerList },
    { path: '/employee', name: 'employee', component: TheContent },
    { path: '/hello', component: HelloWorld },
    { path: '/hello2', component: HelloWorld },
    { path: '/hello3', component: HelloWorld },
    { path: '/hello4', component: HelloWorld },
]

const app = createApp(App)

/**
 * Khởi tạo router
 * Create by DucNT (17.06.2021)
 */
const router = createRouter({
        history: createWebHistory(),
        routes: routes
    })
    /**
     * Sử dụng router để điều hướng componennts
     * Create by DucNT (17.06.2021)
     */
    // app.use(moshaToast);
app.use(router)
app.use(VueSweetalert2);
app.mount('#app')