<template>
  <div>
    <div id="dialog-detail" class="m-dialog">
      <div class="infor-header"></div>
      <div class="infor-person">
        <div class="header-content-1">
          <div class="header-person">THÔNG TIN NHÂN VIÊN</div>
          <div class="header-close" @click="btnCloseOnClick()"></div>
        </div>

        <div class="content-2">
          <div class="left-person">
            <img
              src="../../../assets/img/default-avatar.jpg"
              alt=""
              class="img-person"
            />
            <div style="text-align: center">
              <p>(Vui lòng chụp ảnh có định</p>
              <p>dạng</p>
              <p>.jpeg..jpg..png..gif.)</p>
            </div>
          </div>
          <div class="content-person">
            A.THÔNG TIN CHUNG :
            <div class="text-under"></div>
            <div class="m-input-type">
              <div class="txt-code">
                <div class="label-1">
                  <label for="">Mã nhân viên</label
                  ><span style="color: red">(*)</span>
                </div>
                <div class="tooltip">
                  <span class="tooltiptext" v-show="enableNullCode"
                    >Vui lòng điền thông tin mã nhân viên</span
                  >
                </div>
                <input
                  type="text"
                  class="input-type"
                  placeholder="Nhập mã nhân viên"
                  FieldName="EmployeeCode"
                  v-model="employeeX.EmployeeCode"
                  :class="{ validate: validateEmp.check }"
                  @blur="isShowCodeBlur"
                  ref="employeeCodeRequest"
                  tabindex="0"
                />
              </div>
              <div class="txt-code">
                <div class="label-1">
                  <label for="">Họ và tên</label
                  ><span style="color: red">(*)</span>
                </div>
                <div class="tooltip">
                  <span class="tooltiptext" v-show="enableNullName"
                    >Vui lòng điền thông tin họ và tên</span
                  >
                  <span class="tooltiptext" v-if="showValidateName"
                    >Vui lòng điền đúng định dạng họ tên</span
                  >
                </div>

                <input
                  type="text"
                  class="input-type "
                  :class="{ validate: validateFullName.check }"
                  @blur="isShowNameBlur"
                  ref="fullNameRequest"
                  @keyup="capitalizeFirstLetter"
                  placeholder="Nhập họ và tên"
                  v-model="employeeX.FullName"
                />
              </div>
            </div>
            <div class="m-input-type">
              <div class="txt-code">
                <div class="label-1"><label for="">Ngày sinh</label></div>
                <input
                  type="date"
                  class="input-type input-date"
                  v-model="employeeX.DateOfBirth"
                  min="1935-12-31"
                  max="9999-12-31"
                />
              </div>
              <!-- :datas="GenderData" -->
              <div class="txt-code">
                <div class="label-1"><label for="">Giới tính</label></div>
                <dropdown-option
                  :datas="GenderData"
                  v-model="employeeX.Gender"
                ></dropdown-option>
                <!-- <Dropdown
                  :options="[
                    { id: 0, label: 'Nữ' },
                    { id: 1, label : 'Nam' },
                    { id: 2, label : 'Khác' },
                  ]"
                  
                  v-on:filter="GenderData"
                  :disabled="false"
                  name="zipcode"
                  :maxItem="10"
                  placeholder="Nhập/Chọn giới tính"
                >
                </Dropdown> -->
              </div>
            </div>
            <div class="m-input-type">
              <div class="txt-code">
                <div class="label-1">
                  <label for="">Số CMTND/Căn cước</label
                  ><span style="color: red">(*)</span>
                </div>
                <div class="tooltip">
                  <span class="tooltiptext" v-show="enableNullIdentity"
                    >Vui lòng điền thông tin số CMT/CCCD</span
                  >
                </div>

                <input
                  type="text"
                  class="input-type"
                  @blur="isShowIdentityBlur"
                  :class="{ validate: validateIdentity.check }"
                  placeholder="Nhập số CMTND/Căn cước"
                  v-model="employeeX.IdentityNumber"
                  ref="employeeIdentityRequest"
                />
              </div>
              <div class="txt-code">
                <div class="label-1"><label for="">Ngày cấp</label></div>
                <input
                  type="date"
                  class="input-type input-date"
                  v-model="employeeX.IdentityDate"
                  min="1935-12-31"
                  max="9999-12-31"
                />
              </div>
            </div>
            <div class="m-input-type">
              <div class="txt-code">
                <div class="label-1"><label for="">Nơi cấp</label></div>
                <input
                  type="text"
                  class="input-type"
                  placeholder="Nhập nơi cấp"
                  v-model="employeeX.Address"
                />
              </div>
              <div class="txt-code"></div>
            </div>
            <div class="m-input-type">
              <div class="txt-code">
                <div class="label-1">
                  <label for="">Email</label><span style="color: red">(*)</span>
                </div>
                <div class="tooltip">
                  <span class="tooltiptext" v-show="enableNullEmail"
                    >Vui lòng điền thông tin email</span
                  >
                  <span class="tooltiptext" v-if="showValidateEmail"
                    >Vui lòng điền đúng định dạng email</span
                  >
                </div>

                <input
                  type="email"
                  class="input-type"
                  placeholder="example@gmail.com"
                  ref="employeeEmailRequest"
                  :class="{ validate: validateMail.check }"
                  @blur="isShowEmailBlur"
                  v-model="employeeX.Email"
                />
              </div>
              <div class="txt-code">
                <div class="label-1">
                  <label for="">Số điện thoại</label
                  ><span style="color: red">(*)</span>
                </div>
                <div class="tooltip">
                  <span class="tooltiptext" v-show="enableNullPhone"
                    >Vui lòng điền thông tin số điện thoại</span
                  >
                  <span class="tooltiptext" v-show="enablePhoneFormat"
                    >Vui lòng nhập đúng số điện thoại</span
                  >
                </div>

                <input
                  type="text"
                  class="input-type"
                  placeholder="Nhập số điện thoại"
                  v-model="employeeX.PhoneNumber"
                  :class="{ validate: validatePhone.check }"
                  maxlength="15"
                  @blur="isShowPhoneBlur"
                  ref="employeePhoneRequest"
                />
              </div>
            </div>
            <div class="content-personal">
              B.THÔNG TIN CÔNG VIỆC :
              <div class="text-under"></div>
              <!-- :datas="JobData" -->
              <div class="m-input-type">
                <div class="txt-code">
                  <div class="label-1"><label for="">Vị trí</label></div>
                  <dropdown-option
                    :datas="JobsData"
                    v-model="employeeX.PositionName"
                  ></dropdown-option>
                </div>
                <!-- :datas="departmentData" -->
                <div class="txt-code">
                  <div class="label-1"><label for="">Phòng ban</label></div>
                  <dropdown-option
                    :datas="DerpsData"
                    v-model="employeeX.DepartmentName"
                  ></dropdown-option>
                </div>
              </div>
              <div class="m-input-type">
                <div class="txt-code">
                  <div class="label-1">
                    <label for="">Mã số thuế cá nhân</label>
                  </div>
                  <input
                    type="text"
                    class="input-type"
                    placeholder="Nhập mã số thuế"
                  />
                </div>
                <div class="txt-code">
                  <div class="label-1">
                    <label for="">Mức lương cơ bản</label>
                  </div>
                  <div class="tooltip">
                    <span class="tooltiptext" v-show="isNullSalary"
                      >Vui lòng nhập số lương</span
                    >
                    <span class="tooltiptext" v-if="enableSalaryFormat"
                      >Nhập sai không đúng số lương</span
                    >
                  </div>

                  <input
                    type="text"
                    class="input-type input-salary "
                    v-model="employeeX.Salary"
                    @keyup="formatMoney"
                    @blur="isShowSalaryBlur"
                    :class="{ validate: validateMoney.check }"
                    ref="employeeSalaryRequest"
                  />

                  <!-- <my-currency-input v-model="employeeX.Salary"></my-currency-input> -->
                </div>
              </div>
              <div class="m-input-type">
                <div class="txt-code">
                  <div class="label-1">
                    <label for="">Ngày gia nhập công ty</label>
                  </div>
                  <input
                    type="date"
                    class="input-type input-date"
                    v-model="employeeX.JoinDate"
                    min="1935-12-31"
                    max="9999-12-31"
                  />
                </div>
                <div class="txt-code">
                  <!-- v-model="employeeX.WorkStatus" -->
                  <div class="label-1">
                    <label for="">Tình trạng công việc</label>
                  </div>
                  <dropdown-option
                    :datas="WorkStatusData"
                    v-model="employeeX.WorkStatus"
                  ></dropdown-option>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="footer-bar-1">
          <div class="footer-1"></div>
          <div class="footer-1"></div>
          <div class="footer-1"></div>
          <div class="footer-1"></div>
          <div
            class="btnCancel"
            style="margin-left: 90px"
            @click="btnCloseOnClick()"
          >
            Hủy
          </div>
          <div class="btnSave">
            <button class="btn-default-1" @click="btnSaveOnClick()">
              <i class="far fa-save icon-save"></i>

              <div class="text-icon">Lưu</div>
            </button>
          </div>
        </div>
      </div>
    </div>
    <dialog-form
      v-if="isShowDialogDetail"
      @HideOnDialog="HideOnDialog"
      :isHint="isShowDialogDetail"
      @btnClose="btnClose"
    ></dialog-form>
  </div>
</template>

<script>
/**
 * Khai báo components con cho components cha
 * Created by DucNT(17.06.2021)
 */
import axios from "axios";
import DropdownOption from "../form-dropdown/DropdownOption.vue";
import DialogForm from "../dialog/DialogForm.vue";
// import Dropdown from "vue-simple-search-dropdown";
//  import MyCurrencyInput from "../../MyCurrencyInput.vue";
export default {
  components: {
    DropdownOption,
    DialogForm,
    // Dropdown,
    // MyCurrencyInput,
    //  moment
    //  datepicker,
  },
  created() {
    /**
        Tự động lấy mã mới
        DucNT (21.06.2021)
       */
    axios
      .get("http://cukcuk.manhnv.net/v1/Employees/NewEmployeeCode")
      .then((res) => {
        //  this.loadData();
        console.log(res.data);
        this.focusInputfirst();
        this.employeeX.EmployeeCode = res.data;
      })
      .catch((res) => {
        console.log(res);
      });
  },
  props: {
    isShow: { type: Boolean, default: false },
    employee: { type: Object, default: null },
    formMode: { type: String, default: "Add" },
    isHide: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    /**
     * Hàm focus vào ô input đầu tiên
     *DucNT 16.06.2021
     */
    focusInputfirst() {
      this.$refs.employeeCodeRequest.focus();
    },
    /**
     * Auto Format money
     * DucNT 21.06.2021
     */
    formatMoney() {
      // trong js sẽ hiểu khi khai báo if (money) sẽ là check đủ các trường hợp như >0,=null,...

      let valueMoney = this.employeeX.Salary;
      valueMoney = valueMoney
        .replaceAll(".", "")
        .replaceAll(",", "")
        .trim();
      this.employeeX.Salary = valueMoney
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    /**
     * Viết hoa chữ cái đầu
     * DucNT 16.06.2021
     */
    capitalizeFirstLetter() {
      // let isCheck = this.$refs.fullNameRequest.value;
      let words = this.$refs.fullNameRequest.value.split(" ");
      //  isCheck.Handled=!((isCheck.KeyChar >=65 && isCheck.KeyChar <=122 || isCheck.KeyChar==8));
      let CapitalizedWords = [];
      words.forEach((element) => {
        CapitalizedWords.push(
          element[0].toUpperCase() + element.slice(1, element.length)
        );
      });
      this.$refs.fullNameRequest.value = CapitalizedWords.join(" ");
    },

    /**
     * Đóng form detail
     * Created by DucNT (19.06.2021)
     */
    btnClose() {
      this.$emit("HideDialog");
      this.HideOnDialog();
    },
    /**
     * Hàm format Date dạng dd/mm/YYYY
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

        return year + "-" + month + "-" + day;
      }
    },
    /**
     * Format định dạng tiền tệ khi hiển thị
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
     *  Gọi đến phương thức ẩn của cha
     * created by DucNT (11.06.2021)
     */
    btnCloseOnClick() {
      // cho thằng con gọi sự kiện đến cha emit
      this.isShowDialogDetail = true;
    },
    // Show off form tắt thông báo
    HideOnDialog() {
      this.isShowDialogDetail = false;
    },

    HideDiaLog() {
      this.$emit("HideDialog");
    },
    /**
     * Sự kiện khi gọi đến nút Save
     * Created by DucNT(17.06.2021)
     */
    btnSaveOnClick() {
      // format salary
      this.employeeX.Salary = this.$refs.employeeSalaryRequest.value.replaceAll(
        ".",
        ""
      );
      if (this.validateData()) {
        /**
         * Khi gán formMode là Thêm
         */
        if (this.formMode == "Add") {
          debugger; // eslint-disable-line no-debugger
          axios
            .post("http://cukcuk.manhnv.net/v1/Employees", this.employeeX)
            .then((res) => {
              debugger; // eslint-disable-line no-debugger
              this.focusInputfirst();
              
              this.$swal({
                title: "Thêm thành công",
                text: "Đã thêm nhân viên có mã " + this.employeeX.EmployeeCode,
                icon: "success",
              });
              // this.toast.message =
              //   "Thêm" +
              //   "nhân viên có mã " +
              //   " " +
              //   this.employeeX.EmployeeCode +
              //   " " +
              //   "thành công";

              // this.toast.mode = "alert";
              // this.$emit("Toast", this.toast);
              setTimeout(() => {
                this.$emit("DialogOff");
              }, 2000);
               this.loadData();
              console.log(res);
            })
            .catch((res) => {
              this.$swal({
                title: "Thêm thất bại",
                text:
                  "Hãy kiểm tra lại dữ liệu bản ghi có mã" +
                  " " +
                  this.employeeX.EmployeeCode,
                icon: "error",
              });
              console.log(res);
            });
        } else {
          debugger; // eslint-disable-line no-debugger
          // Sửa
          axios
            .put(
              "http://cukcuk.manhnv.net/v1/Employees/" +
                this.employeeX.EmployeeId,
              this.employeeX
            )
            .then((res) => {
              debugger; // eslint-disable-line no-debugger

              this.$swal({
                title: "Sửa thành công",
                text: "Đã sửa nhân viên có mã " + this.employeeX.EmployeeCode,
                icon: "success",
              });
              setTimeout(() => {
                this.$emit("DialogOff");
              }, 2000);

              //  setTimeout(() => {
              // this.toast.message =
              //   "Sửa" +
              //   "nhân viên có mã " +
              //   " " +
              //   this.employeeX.EmployeeCode +
              //   " " +
              //   "thành công";

              // this.$emit("Toast", this.toast);
              //  }, 2000);

              // this.loadData();
              console.log(res);
            })
            .catch((res) => {
              debugger; // eslint-disable-line no-debugger
              console.log(res);
            });
        }
      } else {
        // show lõi
      }
    },
    /**
     * validate data
     * PQ Huy 13.06.2021
     */
    validateData() {
      let checked = true;
      /**
       * validate not null
       */
      if (!this.validateNotNull()) {
        return false;
      }
      /**
       * validate employee code
       */
      if (!this.validateEmployeeCode()) {
        return false;
      }
      /**
       * validate email
       */
      if (!this.validateEmail()) {
        return false;
      }
      /**
       * validate number
       */
      if (!this.validateNumber()) {
        return false;
      }
      /**
       * Validate salary
       */
      if (!this.validateSalary()) {
        return false;
      }

      return checked;
    },
    /**
     * validate Check trùng mã
     * DucNT 15.06.2021
     */
    validateEmployeeCode() {
      let checked = true;
      return checked;
    },
    /**
     * Check không được rỗng những trường required
     * DucNT (21.06.2021)
     */
    validateNotNull() {
      let checked = true;

      if (!this.employeeX.EmployeeCode) {
        debugger; // eslint-disable-line no-debugger
        // this.$refs.employeeCodeReques = this.$refs.employeeCodeReques
        this.enableNullCode = true;
        this.validateEmp.check = true;
        checked = false;
      } else {
        this.enableNullCode = false;
        this.validateEmp.check = false;
      }

      if (!this.employeeX.FullName) {
        // this.$refs.employeeNameRequest.className = this.$refs.employeeNameRequest.className + " error-warning";
        this.enableNullName = true;

        this.validateFullName.check = true;
        checked = false;
      } else {
        this.enableNullName = false;
        this.validateFullName.check = false;
      }

      if (!this.employeeX.IdentityNumber) {
        // this.$refs.employeeIdentityRequest.className = this.$refs.employeeIdentityRequest.className + " error-warning";
        this.enableNullIdentity = true;
        this.validateIdentity.check = true;
        checked = false;
      } else {
        this.enableNullIdentity = false;
        this.validateIdentity.check = false;
      }

      if (!this.employeeX.Email) {
        // this.$refs.employeeEmailRequest.className = this.$refs.employeeEmailRequest.className + " error-warning";
        this.enableNullEmail = true;
        this.validateMail.check = true;
        checked = false;
      } else {
        this.enableNullEmail = false;
        this.validateMail.check = false;
      }

      if (!this.employeeX.PhoneNumber) {
        // this.$refs.employeePhoneRequest.className = this.$refs.employeePhoneRequest.className + " error-warning";
        this.enableNullPhone = true;
        this.validatePhone.check = true;
        checked = false;
      } else {
        this.enableNullPhone = false;
        this.validatePhone.check = false;
      }
      if (!this.employeeX.Salary) {
        // this.$refs.employeePhoneRequest.className = this.$refs.employeePhoneRequest.className + " error-warning";
        this.isNullSalary = true;
        this.validateMoney.check = true;
        checked = false;
      } else {
        this.isNullSalary = false;
        this.validateMoney.check = false;
      }

      if (!checked) {
        // alert("Điền đẩy đủ thông tin");
      }
      return checked;
    },
    /**
     * validate format email
     * DucNT (22.06.2021)
     */
    validateEmail() {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!re.test(this.employeeX.Email)) {
        this.showValidateEmail = true;
        this.$refs.employeeEmailRequest.value = Array.from(
          new Set(this.$refs.employeeEmailRequest.value.split(","))
        ).toString();
        //  this.validateEmail.check = true;
        return false;
      } else {
        this.showValidateEmail = false;
        // this.$refs.employeeEmailRequest.className = this.$refs.employeeEmailRequest.className.replace("error-warning", "")
        // this.validateEmail.check = false;
        return true;
      }
    },
    /**
     * Khi ra khỏi input lương
     * DucNT 22.06.2021
     */
    isShowSalaryBlur() {
      if (this.$refs.employeeSalaryRequest.value != "") {
        this.isNullSalary = false;
        if (this.validateSalary()) {
          this.validateMoney.check = false;
        } else {
          this.validateMoney.check = true;
        }
      } else {
        this.isNullSalary = true;
        this.validateMoney.check = true;
      }
    },
    /**
     *Khi ra khỏi email
     * DucNT 21.06.2021
     */
    isShowEmailBlur() {
      if (this.$refs.employeeEmailRequest.value != "") {
        this.enableNullEmail = false;

        if (this.validateEmail()) {
          this.validateMail.check = false;
        } else {
          this.validateMail.check = true;
        }
      } else {
        this.enableNullEmail = true;
        this.validateMail.check = true;
      }
    },
    /**
     * Khi ra khỏi input sđt
     * DucNT 21.06.2021
     */
    isShowPhoneBlur() {
      if (this.$refs.employeePhoneRequest.value != "") {
        this.enableNullPhone = false;
        if (this.validateNumber()) {
          this.validatePhone.check = false;
        } else {
          this.validatePhone.check = true;
        }
      } else {
        this.enableNullPhone = true;

        this.validatePhone.check = true;
      }
    },
    /**
     * validate number
     *  DucNT 21.06.2021
     */
    validateNumber() {
      if (!/^[0-9]*$/.test(this.employeeX.PhoneNumber)) {
        // this.$refs.employeePhoneRequest.className = this.$refs.employeePhoneRequest.className + " error-warning";
        this.$refs.employeePhoneRequest.value = Array.from(
          new Set(this.$refs.employeePhoneRequest.value.split(","))
        ).toString();
        this.enablePhoneFormat = true;
        // this.enableNullPhone = true;
        return false;
      } else {
        // this.$refs.employeePhoneRequest.className = this.$refs.employeePhoneRequest.className.replace("error-warning", "")
        this.enablePhoneFormat = false;
        // this.enableNullPhone = false;
      }
      return true;
    },
    /**
     * Validate full name chỉ nhập chữ
     * Created by Duc NT (21.06.2021)
     */
    validateName() {
      if (/^[0-9]*$/.test(this.employeeX.FullName)) {
        this.$refs.fullNameRequest.value = Array.from(
          new Set(this.$refs.fullNameRequest.value.split(","))
        ).toString();
        this.showValidateName = true;
        return false;
      } else {
        this.showValidateName = false;
      }
      return true;
    },
    /**
     * Validate số tiền
     * DucNT (22.06.2021)
     */
    validateSalary() {
      if (!/^[0-9,.]*$/.test(this.employeeX.Salary)) {
        // this.$refs.employeePhoneRequest.className = this.$refs.employeePhoneRequest.className + " error-warning";
        this.$refs.employeeSalaryRequest.value = Array.from(
          new Set(this.$refs.employeeSalaryRequest.value.split(","))
        ).toString();
        this.enableSalaryFormat = true;

        // this.enableNullPhone = true;
        return false;
      } else {
        // this.$refs.employeePhoneRequest.className = this.$refs.employeePhoneRequest.className.replace("error-warning", "")
        this.enableSalaryFormat = false;

        // this.enableNullPhone = false;
      }
      return true;
    },
    /**
     * Khi ra khỏi input mã nv
     * DucNT 21.06.2021
     */
    isShowCodeBlur() {
      if (this.$refs.employeeCodeRequest.value != "") {
        this.enableNullCode = false;
        this.validateEmp.check = false;
      } else {
        this.enableNullCode = true;
        this.validateEmp.check = true;
      }
    },
    /**
     * Khi ra khỏi input họ và tên
     * DucNT 21.06.2021
     */
    isShowNameBlur() {
      if (this.$refs.fullNameRequest.value != "") {
        this.enableNullName = false;
        if (this.validateName()) {
          this.validateFullName.check = false;
        } else {
          this.validateFullName.check = true;
        }
      } else {
        this.enableNullName = true;
        this.validateFullName.check = true;
      }
    },
    /**
     * Khi ra khỏi input số CMTND
     * Ducnt (20.06.2021)
     */
    isShowIdentityBlur() {
      if (this.$refs.employeeIdentityRequest.value != "") {
        this.enableNullIdentity = false;
        this.validateIdentity.check = false;
      } else {
        this.enableNullIdentity = true;
        this.validateIdentity.check = true;
      }
    },
  },
  /**
   * Khai báo watch tạo 1 biến gắn cho props employee để binding dữ liệu lên qua v-model
   * Created by DucNT(17.06.2021)
   */
  watch: {
    employee(val) {
      console.log(val);
      this.employeeX = JSON.parse(JSON.stringify(val));
      this.employeeX.DateOfBirth = this.formatDate(this.employeeX.DateOfBirth);
      this.employeeX.IdentityDate = this.formatDate(
        this.employeeX.IdentityDate
      );
      this.employeeX.JoinDate = this.formatDate(this.employeeX.JoinDate);
      this.employeeX.Salary = this.formatSalary(this.employeeX.Salary);
      // this.employeeX = [...val];
    },
  },
  // Focus vào ô đầu tiên khi mở form detail
  mounted() {
    this.focusInputfirst();
  },
  /**
   * Khai báo các biến cần trả về binding lên table
   * Created By DucNT(17.06.2021)
   */
  data() {
    return {
      validateEmp: {
        check: false,
      },
      validateFullName: {
        check: false,
      },
      validateIdentity: {
        check: false,
      },
      validateMail: {
        check: false,
      },
      validatePhone: {
        check: false,
      },
      validateMoney: {
        check: false,
      },
      isShowDialogDetail: false,
      enableCode: false,
      enableNullCode: false,
      enableNullName: false,
      enableNullEmail: false,
      enableNullIdentity: false,
      enableNullPhone: false,
      showValidateEmail: false,
      showValidateName: false,
      enablePhoneFormat: false,
      enableSalaryFormat: false,
      isNullSalary: false,
      toast: {
        message: "",
        mode: "success",
      },
      employeeX: {
        EmployeeCode: "",
        FullName: "",
        Address: "",
        Gender: 1,
        DateOfBirth: "",
        PhoneNumber: "",
        Email: "",
        IdentityDate: "",
        JoinDate: "",
        PositionName: 1,
        DepartmentName: 1,
        Salary: "",
        WorkStatus: 1,
      },
      /**
       * Khai báo Data đổ vào Dropdown
       * Ducnt 20.06.2021
       */
      GenderData: [
        {
          id: 1,
          label: "Nam",
        },
        {
          id: 0,
          label: "Nữ",
        },
        {
          id: 2,
          label: "Khác",
        },
      ],

      JobsData: [
        {
          id: 1,
          label: "Giám đốc",
        },

        {
          id: 2,
          label: "Nhân viên kinh doanh",
        },
        {
          id: 3,
          label: "Bảo vệ",
        },
      ],
      DerpsData: [
        {
          id: 1,
          label: "Phòng kinh doanh",
        },

        {
          id: 2,
          label: "Phòng hành chính",
        },
        {
          id: 3,
          label: "Phòng kỹ thuật",
        },
      ],
      WorkStatusData: [
        {
          id: 1,
          label: "Đang làm việc",
        },

        {
          id: 2,
          label: "Chính thức",
        },
        {
          id: 3,
          label: "Thử việc",
        },
      ],
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.dialog {
  display: none;
}

/* .error-warning{
  color:blue;
  border: 1px solid blue;
} */
/* .success-input{
  border:1px solid black;
} */
.validate {
  border: 1px solid red;
}
@import "../../../style/common/tooltip.css";
</style>
