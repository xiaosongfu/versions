import {
    Button,
    Card,
    Dialog,
    Divider,
    Form,
    FormItem,
    Input,
    Tag,
    Timeline,
    TimelineItem
} from 'element-ui'
import Vue from 'vue'


Vue.component(Button.name, Button)
// 或者 Vue.use(Button)

Vue.component(Dialog.name, Dialog)
Vue.component(Form.name, Form)
Vue.component(FormItem.name, FormItem)
Vue.component(Input.name, Input)

Vue.component(Divider.name, Divider)

Vue.component(Timeline.name, Timeline)
Vue.component(TimelineItem.name, TimelineItem)
Vue.component(Card.name, Card)
Vue.component(Tag.name, Tag)