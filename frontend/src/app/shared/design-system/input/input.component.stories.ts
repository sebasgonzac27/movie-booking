import { Meta, StoryObj } from '@storybook/angular';
import { InputComponent } from './input.component';

const meta: Meta<InputComponent<string>> = {
  title: 'Design System/Input',
  component: InputComponent,
  tags: ['autodocs'],
  args: {
    label: 'Input',
  },
};

export default meta;

type Story = StoryObj<InputComponent<string>>;

export const Default: Story = {};

export const Dates: Story = {
  args: {
    type: 'date',
  },
};

export const Search: Story = {
  args: {
    type: 'search',
  },
};
