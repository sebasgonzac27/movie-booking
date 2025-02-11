import { Meta, StoryObj } from '@storybook/angular';
import { DropdownComponent } from './dropdown.component';

const meta: Meta<DropdownComponent> = {
  title: 'Components/Dropdown',
  component: DropdownComponent,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<DropdownComponent>;

export const Default: Story = {
  args: {
    label: 'Dropdown',
    options: [
      { label: 'Option 1', value: 'option1' },
      { label: 'Option 2', value: 'option2' },
    ],
    placeholder: 'Select an option',
  },
};

export const Multiple: Story = {
  args: {
    label: 'Dropdown Multiple',
    multiple: true,
    options: [
      { label: 'Option 1', value: 'option1' },
      { label: 'Option 2', value: 'option2' },
    ],
    placeholder: 'Select an option',
  },
};
