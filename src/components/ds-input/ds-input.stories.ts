import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
const meta: Meta = {
  title: 'Components/Input',
  component: 'ds-input',
  args: { label: 'Email address', placeholder: 'you@example.com' },
  render: args =>
    html`<ds-input
      label=${args.label}
      placeholder=${args.placeholder ?? ''}
      description=${args.description ?? ''}
      error-message=${args.errorMessage ?? ''}
      ?required=${args.required}
      ?invalid=${args.invalid}
      ?disabled=${args.disabled}
      ?readonly=${args.readonly}
    ></ds-input>`,
};
export default meta;
type Story = StoryObj;
export const Default: Story = {};
export const Required: Story = { args: { required: true } };
export const Description: Story = { args: { description: 'Used for account notifications.' } };
export const Invalid: Story = {
  args: { invalid: true, errorMessage: 'Enter a valid email address.' },
};
export const Disabled: Story = { args: { disabled: true } };
export const Readonly: Story = { args: { readonly: true, value: 'reader@example.com' } };
export const LongErrorMessage: Story = {
  args: {
    invalid: true,
    errorMessage:
      'This address cannot be used because it is already associated with another account.',
  },
};
export const DarkTheme: Story = { globals: { theme: 'dark' } };
