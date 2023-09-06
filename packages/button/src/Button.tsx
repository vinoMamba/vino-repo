import { defineComponent } from "vue";

export const Button = defineComponent({
  name: 'VButton',
  setup() {
    return () => (<button>button</button>)
  }
})
