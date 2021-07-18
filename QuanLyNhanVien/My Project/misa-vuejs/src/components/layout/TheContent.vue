<template>
  <!-- Start Content -->
  <!-- Created by DucNT(17.06.2021) -->
  <div class="hello">
    <div class="content">
      <div class="content-header">
        <div class="title">Danh sách nhân viên</div>
        <div class="page-feature">
          <button class="misa-btn btn-default" @click="btnAddOnClick()">
            <div class="misa-btn-icon icon-add"></div>
            <div class="btn-text">Thêm mới nhân viên</div>
          </button>

          <div class="btnXoa">
            <button
              class="btn-default-2"
              @click="deleteEmployee()"
              :employeeId="EmployeeId"
            >
              <i class="fas fa-user-times icon-delete"></i>
              <div class="text-icon">Xóa</div>
            </button>
          </div>
        </div>
      </div>

      <div class="filter-all">
        <div class="content-filter-bar">
          <div class="filter-left">
            <input
              class="icon-search"
              type="text"
              style="width: 210px"
              placeholder="Tìm kiếm theo tên nhân viên"
              v-model="searchInputModel"
            />
          </div>
          <div class="filter-right" @click="btnRefreshOnClick()">
            <button
              class="misa-btn-refresh misa-second-btn"
              id="btnRefresh"
            ></button>
          </div>
        </div>
        <div class="content-filter-bar-2" style="margin-top: 1.5px">
          <dropdown-header :data="dropdownData[0]" style="margin-right: 10px" />
        </div>
        <div class="content-filter-bar-3" style="margin-top: 1.5px">
          <dropdown-header :data="dropdownData[1]" />
        </div>
      </div>
      <div class="table-content">
        <table width="100%" style="border-collapse: collapse">
          <thead>
            <tr>
              <th fieldName="EmployeeCode">
                Mã Nhân viên
              </th>
              <th fieldName="FullName">Họ Tên</th>
              <th fieldName="Gender">Giới Tính</th>
              <th
                style="text-align:center"
                fieldName="DateOfBirth"
                formatType="Date"
              >
                Ngày Sinh
              </th>
              <th fieldName="PhoneNumber">
                Số Điện Thoại
              </th>
              <th fieldName="Email">Email</th>
              <th fieldName="PositionName">Chức vụ</th>
              <th fieldName="DepartmentName">
                Phòng ban
              </th>
              <th
                style="text-align:right;"
                fieldName="Salary"
                formatType="Salary"
              >
                Mức lương cơ bản
              </th>
              <th fieldName="WorkStatus">
                Tình trạng công việc
              </th>
            </tr>
          </thead>
          <tbody>
            <!-- Khai báo lấy dữ liệu từ db -->
            <!-- Created by DucNT(17.06.2021) -->
            <tr
              class="tb-head"
              v-for="(empl, index) in employees"
              :key="empl.EmployeeId"
              @dblclick="trDBClick(empl.EmployeeId)"
              :class="{ active: index == rowSelected }"
              @click="(rowSelected = index), trClick(empl.EmployeeId)"
            >
              <td>{{ empl.EmployeeCode }}</td>
              <td>{{ empl.FullName }}</td>
              <td>{{ formatGender(empl.Gender) }}</td>
              <td style="text-align:center">
                {{ formatDate(empl.DateOfBirth) }}
              </td>
              <td>{{ empl.PhoneNumber }}</td>
              <td>{{ empl.Email }}</td>
              <td>{{ formatPosition(empl.PositionName) }}</td>
              <td>{{ formatDepartment(empl.DepartmentName) }}</td>
              <td style="text-align:right;">{{ formatSalary(empl.Salary) }}</td>
              <td>{{ formatWorkState(empl.WorkStatus) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- End content -->
      <!-- Footer -->
      <div class="footer">
        <div class="footer-bar">Hiển thị 1-10/1000 nhân viên</div>
        <div class="footer-bar-2">
          <div class="img-paging-1">
            <img src="../../assets/img/btn-firstpage.svg" alt="" />
          </div>
          <div class="img-paging-1">
            <img src="../../assets/img/btn-prev-page.svg" alt="" />
          </div>
          <div class="select-paging">
            <div class="select-paging-1">
              <span class="paging-prv">1</span>
            </div>
            <div class="select-paging-2">
              <span class="paging-prv">2</span>
            </div>
            <div class="select-paging-3">
              <span class="paging-prv">3</span>
            </div>
            <div class="select-paging-4">
              <span class="paging-prv">4</span>
            </div>
          </div>
          <div class="img-paging-2">
            <img src="../../assets/img/btn-next-page.svg" alt="" />
          </div>
          <div class="img-paging-2">
            <img src="../../assets/img/btn-lastpage.svg" alt="" />
          </div>
        </div>
        <div class="footer-bar-3">10 nhân viên/trang</div>
      </div>
      <!-- End Footer -->
    </div>
    <!-- Khai báo component con cho TheContent -->
    <!-- Created by  DucNT(17.06.2021) -->
    <employee-detail
      v-if="isShowDialog"
      :isShow="isShowDialog"
      :employee="selectedEmployee"
      :formMode="dialogFormMode"
      @HideDialog="HideDialog"
      @DialogOff="DialogOff"
       @Toast="Toast"
    />
    <!-- Component loading css sau khi thêm,sửa,xóa thành công -->
    <loading-data :isShows="isShowData"></loading-data>
    <dialog-confirm
      v-if="isShowLog"
      :isShowss="isShowLog"
      @HideDialog="HideDialog"
      @btnDeleteOnClick="btnDeleteOnClick()"
    >
    </dialog-confirm>
     <!-- <Notification
      :isShow="isShowToast"
      :isHide="isHideToast"
      :message="toast.message"
      :toastMode="toast.mode"
      @closeToast="hideToast"
    /> -->
  </div>
</template>

<script>
/**
 * Import các components con cho components cha
 * Created by DucNT(17.06.2021)
 */
import DropdownHeader from "../views/form-dropdown/DropdownHeader.vue";
import EmployeeDetail from "../views/employee/EmployeeDetail.vue";
import LoadingData from "../views/form-dropdown/LoadingData.vue";
import DialogConfirm from "../views/dialog/Dialog.vue";
// import Notification from '../views/Notification.vue';
// import DialogForm from "../views/dialog/DialogForm.vue";

//  cài thư viện axios hỗ trợ tương tác với dữ liệu bên server side
// Created by DucNT (17.06.2021)
import axios from "axios";
export default {
  name: "employee",
  /**
   *
   * Khai báo các components
   * DucNT 18.06.2021
   */
  components: {
    EmployeeDetail,
    DropdownHeader,
    LoadingData,
    DialogConfirm,
    // Notification
    // DialogForm
  },
  watch: {
    searchInputModel: function(val) {
      this.btnSearch(val);
    },
  },
  // load dữ liệu cho trang
  created() {
    axios
      .get("http://cukcuk.manhnv.net/v1/Employees")
      .then((res) => {
        console.log(res);
        this.employees = res.data;
      })
      .catch((res) => {
        console.log(res);
      });
  },
  props: [],
  methods: {
    /**
     * Khai báo method loadData cập nhật lại dữ liệu sau khi đã thêm ,sửa ,xóa
     * Created by DucNT(17.06.2021)
     */
    loadData() {
      axios
        .get("http://cukcuk.manhnv.net/v1/Employees")
        .then((res) => {
          console.log(res);
          location.reload();
          this.employees = res.data;
        })
        .catch((res) => {
          console.log(res);
        });
    },
    /**
     * Sự kiện tìm kiếm theo Tên nhân viên
     * DucNT (18.06.2021)
     */
    btnSearch(val) {
      let pageSize = "10",
        pageNumber = "1",
        fullName = val,
        me = this;

      debugger; // eslint-disable-line
      if (fullName == "") {
        debugger; // eslint-disable-line
        me.loadData();
      } else {
        debugger; // eslint-disable-line
        axios
          .get(
            "http://cukcuk.manhnv.net/v1/Employees/Filter?pageSize=" +
              pageSize +
              "&pageNumber=" +
              pageNumber +
              "&fullName=" +
              fullName
          )
          .then((res) => {
            me.employees = res.data.Data;
            let employeeList = me.employees;
            console.log(res.data.Data);
            console.log(employeeList);
          });
      }
    },
    /**
     * Show form detail thêm,sửa sau khi nhấn click
     * Created by DucNT(17.06.2021)
     */
    btnAddOnClick() {
      this.selectedEmployee = {};
      this.dialogFormMode = "Add";
      this.isShowDialog = true;
    },

    /**
     * Ẩn form detail thêm,sửa sau khi nhấn click và load lại dữ liệu
     * Created by DucNT(17.06.2021)
     */
    DialogOff() {
      this.isShowDialog = false;
      setTimeout(() => {
        this.loadData();
      }, 1000);
    },
    /**
     * Format lại giới tính
     * Created by DucNT(18.06.2021)
     */
    formatGender(gender) {
      var g = parseInt(gender);
      var genderName =
        g == 0 ? "Nữ" : g == 1 ? "Nam" : g == 2 ? "Khác" : "Không xác định";
      return genderName;
    },
    /**
     * Format lại Position name
     * Created by DucNT(18.06.2021)
     */
    formatPosition(pos) {
      var g = parseInt(pos);
      var position =
        g == 1
          ? "Giám đốc"
          : g == 2
          ? "Nhân viên kinh doanh"
          : g == 3
          ? "Bảo vệ"
          : "Không xác định";
      return position;
    },
    /**
     * Format lại Dep name
     * Created by DucNT(18.06.2021)
     */
    formatDepartment(der) {
      var g = parseInt(der);
      var derp =
        g == 1
          ? "Phòng kinh doanh"
          : g == 2
          ? "Phòng hành chính"
          : g == 3
          ? "Phòng kỹ thuật"
          : "Không xác định";
      return derp;
    },
    /**
     * Format trạng thái công việc
     * CreatEd by DucNT(18.06.2021)
     */
    formatWorkState(wsid) {
      var g = parseInt(wsid);
      var workStateName =
        g == 1
          ? "Đang Làm việc"
          : g == 2
          ? "Chính thức"
          : g == 3
          ? "Thử việc"
          : g == 4
          ? "Nghỉ việc"
          : "Không xác định";
      return workStateName;
    },
    /**
     * Format Date
     * Created by DucNT (16.6.2021)
     */
    formatDate(d) {
      var date = new Date(d);
      // Check dữ liệu ngày khi trả về rỗng
      if (Number.isNaN(date.getTime())) {
        return "";
      } else {
        var day = date.getDate();
        var month = date.getMonth() + 1;
        var year = date.getFullYear();

        // date = checkTime(date);
        // month = checkTime(month);

        day = day < 10 ? "0" + day : day;
        month = month < 10 ? "0" + month : month;

        return day + "/" + month + "/" + year;
      }
    },
    /**
     * Format định dạng tiền tệ
     * @param {number} money Số tiền
     * Created By Ducnt 31.05.2021
     */
    formatSalary(money) {
      // trong js sẽ hiểu khi khai báo if (money) sẽ là check đủ các trường hợp như >0,=null,...
      if (money) {
        var num = money.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
        return num;
      }
    },
    /**
     * Ẩn form detail mà không load lại dữ liệu
     * Created by DucNT(17.06.2021)
     */
    HideDialog() {
      this.isShowDialog = false;
      this.isShowLog = false;
    },

    /**
     * Sự kiện nhấn dbclick hiện thông tin chi tiết 1 nhân viên để sửa
     * Created BY DucNT(17.06.2021)
     */
    trDBClick(EmployeeId) {
      // lấy ra Id của bản ghi đc dbl click

      axios
        .get("http://cukcuk.manhnv.net/v1/Employees/" + EmployeeId)
        .then((res) => {
          this.selectedEmployee = res.data;          
          console.log(res);
          //  console.log(employee);
        })
        .catch(() => {
          this.$swal({
            title: "Thông báo",
            text: "Có lỗi xảy ra vui lòng liên hệ MISA",
            icon: "error",
          });
          this.HideDialog();
          // console.log(res);
          // cập nhật lại form khi lỗi 500
          this.dialogFormMode = "Add";
        });

      // Hiển thị dialog chi tiết
      this.isShowDialog = true;

      // Gọi API lấy thông tin của khách hàng , lấy đc về binding dữ liệu lên form chi tiết
      // cập nhật formMode
      this.dialogFormMode = "Edit";
    },
    /**
     * Sự kiến chọn dòng để xóa
     * Created by DucNT(18.06.2021)
     */
    trClick(EmployeeId) {
      axios
        .get("http://cukcuk.manhnv.net/v1/Employees/" + EmployeeId)

        .then((res) => {
          this.selectedEmployee = res.data;
          console.log(res);
          //  console.log(employee);
        })
        .catch((res) => {
          console.log(res);
        });
      // cập nhật formMode
      this.dialogFormMode = "Delete";
    },

    /**
     * Sự kiện refresh lại trang để cập nhật dữ liệu
     * Created by DucNT(17.06.2021)
     */
    btnRefreshOnClick() {
      this.isShowData = true;
      setTimeout(() => {
        this.isShowData = false;
      }, 1000);
      this.loadData();
    },
    /**
     * Sự kiện gọi đến nút Xoá dữ liệu
     * Created by DucNT(17.06.2021)
     */
    deleteEmployee: function() {
      this.isShowLog = true;
      this.dialogFormMode = "Delete";
    },

   btnDeleteOnClick() {
      if (this.dialogFormMode == "Delete") {
        debugger; // eslint-disable-line no-debugger
       axios
          .delete(
            "http://cukcuk.manhnv.net/v1/Employees/" +
              this.selectedEmployee.EmployeeId
          )
          .then((res) => {
            this.isShowLog = false;
            this.$swal({
              title: "Xóa thành công !",
              text:
                "Đã xóa nhân viên có mã " + this.selectedEmployee.EmployeeCode,
              icon: "success",
            });
            setTimeout(() => {
              this.DialogOff();
            }, 2000);

            //  this.loadData();
            this.selectedEmployee = {};
            this.dialogFormMode = "";
            console.log(res);
          })
          .catch(() => {
            this.$swal({
              title: "Xóa thất bại !",
              text:
                "Xin hãy kiểm tra lại (Bạn phải chọn bản ghi để xóa)" ,
              icon: "error",
            });
            debugger; // eslint-disable-line no-debugger
            //  this.$toast.show("error", "Có lỗi xảy ra! Vui lòng liên hệ MISA");
            this.isShowLog = false;
          });
      }
      this.dialogFormMode = "";
    },
    //  /**
    //  * Toast Notification
    //  * Created By DucNT 21/06/2021
    //  */
    // Toast(toast) {
    //   this.showToast();
    //    setTimeout(() => {
    //     this.isShowToast = false;
    //   }, 3000);
    //   this.toast.message = toast.message;
    //   this.toast.mode = toast.mode;
    // },
    // showToast() {
    //   this.isShowToast = true;
    //   this.isHideToast = false;
    // },
    // hideToast() {
    //   this.isShowToast = false;
    //   this.isHideToast = true;
    // },
  },
  /**
   * Khai báo các biến , mảng,obj truyền dữ liệu từ components cha ->con hoặc ngược lại
   * Created by DucNT(17.06.2021)
   */
  data() {
    return {
      rowSelected: null,
      //  isShowToast: false,//Kiểm tra hiển thị thông báo Toast
      //    isHideToast: false, //Kiểm tra ẩn thông báo Toast
      //       toast:{
      //   message: "", //message truyền vào trong toast
      //   mode: "" //Kiểu toast hiển thị, cảnh báo/ thông báo thành công, thất bại ....
      // },
      dialogFormMode: "Add",
      isShowDialog: false,
      employeeId: null,
      isShowLog: false,
      isShowData: false,
      selectedEmployee: {},
      employees: [],
      searchInputModel: null,
      dropdownData: [
        {
          title: "Tất cả phòng ban",
          items: [
            "Phòng nhân sự",
            "Phòng kế toán",
            "Phòng kinh doanh",
            "Phòng sản xuất",
          ],
        },
        {
          title: "Tất cả vị trí",
          items: ["Giám đốc", "Fresher Web", "DepOops", "BA"],
        },
      ],
    };
  },
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* Sử dụng các css  */
@import "../../style/common/header.css";
@import "../../style/common/input.css";
@import "../../style/common/main.css";
.active {
  background-color: #609f8f;
}
</style>
