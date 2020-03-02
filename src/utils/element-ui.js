import Vue from "vue";
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
    Header,
    Aside,
    Main,
    Menu,
    submenu,
    MenuItem,
    MenuItemGroup,
    MessageBox,
    Message,
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
Vue.use(Header);
Vue.use(Aside);
Vue.use(Main);
Vue.use(Menu);
Vue.use(submenu);
Vue.use(MenuItem);
Vue.use(MenuItemGroup);
Vue.prototype.$messageBox = MessageBox;
Vue.prototype.$message = Message;

