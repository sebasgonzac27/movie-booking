import { Meta, StoryObj } from '@storybook/angular';
import { ImagePickerComponent } from './image-picker.component';

const meta: Meta<ImagePickerComponent> = {
  title: 'Components/Image Picker',
  component: ImagePickerComponent,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<ImagePickerComponent>;

export const Default: Story = {
  args: {
    label: 'Image Picker',
  },
};
