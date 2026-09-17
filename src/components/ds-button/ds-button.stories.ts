import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';

const meta: Meta = {
  title: 'Components/Button',
  component: 'ds-button',
  args: { label: 'Continue', variant: 'primary', size: 'md', disabled: false, loading: false },
  argTypes: {
    variant: { control: 'select', options: ['primary', 'secondary', 'tertiary', 'danger'] },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
  },
  render: args =>
    html`<ds-button
      variant=${args.variant}
      size=${args.size}
      ?disabled=${args.disabled}
      ?loading=${args.loading}
      >${args.label}</ds-button
    >`,
};
export default meta;
type Story = StoryObj;
export const Default: Story = {};
export const Secondary: Story = { args: { variant: 'secondary' } };
export const Tertiary: Story = { args: { variant: 'tertiary' } };
export const Danger: Story = { args: { variant: 'danger', label: 'Delete' } };
export const Small: Story = { args: { size: 'sm' } };
export const Large: Story = { args: { size: 'lg' } };
export const Disabled: Story = { args: { disabled: true } };
export const Loading: Story = { args: { loading: true, label: 'Saving' } };
export const StartIcon: Story = {
  render: () => html`<ds-button><ds-icon slot="start" name="check"></ds-icon>Save</ds-button>`,
};
export const EndIcon: Story = {
  render: () =>
    html`<ds-button variant="secondary"
      >Search<ds-icon slot="end" name="search"></ds-icon
    ></ds-button>`,
};
export const LongLabel: Story = { args: { label: 'Continue to the next step in this process' } };
export const DarkTheme: Story = { globals: { theme: 'dark' } };
