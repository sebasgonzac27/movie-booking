import { Meta, StoryObj } from '@storybook/angular';
import { ChipComponent } from './chip.component';

const meta: Meta<ChipComponent> = {
  title: 'Components/Chip',
  component: ChipComponent,
  tags: ['autodocs'],
  parameters: {
    actions: {
      handles: ['click'],
    },
  },
};

export default meta;

type Story = StoryObj<ChipComponent>;

export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `<app-chip>Hola</app-chip>`,
  }),
};
