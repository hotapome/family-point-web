import taskButton from './taskButton.vue';

export default {
  title: 'Components/taskButton',
  component: taskButton,
  argTypes: {
    taskTitle: { control: 'text' },
    taskPoint: { control: 'number' },
    isSelect: { control: 'boolean' },
  },
};

const Template = (args: any) => ({
  components: { taskButton },
  setup() {
    return { args };
  },
  template: '<taskButton v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {
  taskTitle: 'Sample Task',
  taskPoint: 10,
  isSelect: false,
};
