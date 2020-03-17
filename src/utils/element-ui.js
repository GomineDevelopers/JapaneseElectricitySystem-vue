import Vue from "vue";
// import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import {
  Button,
  Input,
  Select,
  Option,
  Row,
  Col,
  CheckboxGroup,
  Checkbox,
  Container,
  Carousel,
  CarouselItem,
  Header,
  Footer,
  Aside,
  Main,
  Menu,
  submenu,
  MenuItem,
  MenuItemGroup,
  MessageBox,
  Message,
  Tabs,
  TabPane,
  Pagination,
  InputNumber,
  Steps,
  Step,
  table,
  TableColumn,
  Rate,
  Radio,
  RadioGroup,
  Dialog,
  Upload,
  Tooltip
} from "element-ui";
Vue.use(Button);
Vue.use(Input);
Vue.use(Select);
Vue.use(Option);
Vue.use(Row);
Vue.use(Col);
Vue.use(CheckboxGroup);
Vue.use(Checkbox);
Vue.use(Container);
Vue.use(Carousel);
Vue.use(CarouselItem);
Vue.use(Header);
Vue.use(Footer);
Vue.use(Aside);
Vue.use(Main);
Vue.use(Menu);
Vue.use(submenu);
Vue.use(MenuItem);
Vue.use(MenuItemGroup);
Vue.use(Tabs);
Vue.use(TabPane);
Vue.prototype.$messageBox = MessageBox;
Vue.prototype.$message = Message;
Vue.use(Pagination);
Vue.use(InputNumber);
Vue.use(Steps);
Vue.use(Step);
Vue.use(table);
Vue.use(TableColumn);
Vue.use(Rate);
Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(Dialog);
Vue.use(Upload);
Vue.use(Tooltip);

Vue.prototype.$confirm = MessageBox.confirm;

function UninputJudgment(inputValue, MessageAlert) {
  console.log(typeof MessageAlert);
  if (typeof MessageAlert == "string") {
    if (inputValue == "" || inputValue == " " || inputValue == null || inputValue == undefined) {
      this.$message(MessageAlert);
      return true;
    } else {
      return false
    }
  }
  else if (typeof MessageAlert == "object") { // 数组
    let length = MessageAlert.length;
    for (let i = 0; i < length; i++) {
      if (inputValue[i] == "" || inputValue[i] == " " || inputValue[i] == null || inputValue[i] == undefined) {
        this.$message(MessageAlert[i]);
        return true;
      }
    }
    return false;
  }
}
Vue.prototype.$UninputJudgment = UninputJudgment;
// if (
//   this.$UninputJudgment(
//     [
//       this.phone,
//       this.password,
//       this.password2,
//       this.v_code_pic,
//       this.v_code
//     ],
//     [
//       "请输入手机号！",
//       "请输入密码！",
//       "请确认密码！",
//       "请输入图片验证码！",
//       "请输入短信验证码！"
//     ]
//   )
// ) {
//   return;
// }

// if (this.$UninputJudgment(this.phone, "请输入手机号！")) {
//   return;
// }
