import Vue from 'vue';
import popup from './Index.vue'

let instances = {};
const initInstance = (options) => {
  return instances[options.component] = new Vue({
    el: document.createElement('div'),
    render(h) { var _this = this;return h(popup, {props:{show: _this.isShow}}, [
      h(require('../' + options.component + '.vue'), {props:{
      slots: [
        {
          flex: 1,
          values: this.options.values,
          className: 'slot1',
          textAlign: 'center',
        }
      ],
      showToolbar: true,
      valueKey: this.options.valueKey,
    }, on: {
      change(component, values) {
        _this.value = values;
      }
    }}, [h('a',{on: {
      click() {
        _this.close()
      }
    }},'完成')])
    ])},
    data() {
      return {
        isShow: false,
        value: '',
        options: options,
      }
    },
    methods: {
      show() {
        document.body.addEventListener('touchmove', preventDefault);
        this.$nextTick(() => {
          this.isShow = true;
        });
      },
      close() {
        document.body.removeEventListener('touchmove', preventDefault);
        this.$nextTick(() => {
          this.isShow = false;
        });
        this.options.onConfirm && this.options.onConfirm(this.value);
      },
    },
  })
};
 
const merge = function(target) {
  for (let i = 1, j = arguments.length; i < j; i++) {
    let source = arguments[i];
    for (let prop in source) {
      if (source.hasOwnProperty(prop)) {
        let value = source[prop];
        if (value !== undefined) {
          target[prop] = value;
        }
      }
    }
  }
  return target;
};

const Popup = {
  fromComponent(options) {
    let instance = instances[options.component]
    if (instance === undefined) {
      instance = initInstance(options);
      document.body.appendChild(instance.$el);
    } else {
      instance.options = options;
    }
    return instance;
  },
};

const preventDefault = (event) => {
  event.preventDefault();
};

export default Popup;