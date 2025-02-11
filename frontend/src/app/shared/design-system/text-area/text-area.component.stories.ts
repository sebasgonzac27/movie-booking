import { Meta, StoryObj } from '@storybook/angular';
import { TextAreaComponent } from './text-area.component';

const meta: Meta<TextAreaComponent> = {
  title: 'Design System/Text Area',
  component: TextAreaComponent,
  tags: ['autodocs'],
  args: {
    label: 'Text Area',
  },
};

export default meta;

type Story = StoryObj<TextAreaComponent>;

export const Default: Story = {};
