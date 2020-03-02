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
  Carousel,
  CarouselItem,
  Header,
  Aside,
  Main,
  Menu,
  submenu,
  MenuItem,
  MenuItemGroup,
  MessageBox,
  Message,
  Footer,
  Tabs,
  TabPane
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
