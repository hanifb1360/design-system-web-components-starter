import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
const meta: Meta = {
  title: 'Components/Icon',
  component: 'ds-icon',
  render: args =>
    html`<ds-icon
      name=${args.name ?? 'info'}
      size=${args.size ?? 'md'}
      label=${args.label ?? ''}
    ></ds-icon>`,
};
export default meta;
type Story = StoryObj;
export const Decorative: Story = { args: { name: 'check' } };
export const Meaningful: Story = { args: { name: 'info', label: 'Information' } };
export const Sizes: Story = {
  render: () =>
    html`<ds-icon name="search" size="sm"></ds-icon> <ds-icon name="search"></ds-icon>
      <ds-icon name="search" size="lg"></ds-icon>`,
};
export const InheritedColor: Story = {
  render: () =>
    html`<span style="color: rebeccapurple"
      ><ds-icon name="check" label="Complete"></ds-icon
    ></span>`,
};
