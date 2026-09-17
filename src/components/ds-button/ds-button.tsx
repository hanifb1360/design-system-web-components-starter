import { Component, Element, h, Prop } from '@stencil/core';

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';
export type ButtonType = 'button' | 'submit' | 'reset';

/**
 * @slot - Label.
 * @slot start - Leading icon.
 * @slot end - Trailing icon.
 */
@Component({ tag: 'ds-button', styleUrl: 'ds-button.css', shadow: true })
export class DsButton {
  @Element() host!: HTMLDsButtonElement;

  /** Visual style. */
  @Prop() variant: ButtonVariant = 'primary';
  /** Control size. */
  @Prop() size: ButtonSize = 'md';
  /** Prevent interaction. */
  @Prop({ reflect: true }) disabled = false;
  /** Indicate progress and prevent duplicate activation. */
  @Prop({ reflect: true }) loading = false;
  /** Native button type. */
  @Prop() type: ButtonType = 'button';

  private handleClick = () => {
    if (this.disabled || this.loading || this.type === 'button') return;
    const form = this.host.closest('form');
    if (!form) return;
    if (this.type === 'submit') form.requestSubmit();
    else form.reset();
  };

  render() {
    const unavailable = this.disabled || this.loading;
    return (
      <button
        aria-busy={this.loading ? 'true' : undefined}
        class={`button button--${this.variant} button--${this.size}`}
        disabled={unavailable}
        onClick={this.handleClick}
        part="button"
        type="button"
      >
        <span class="icon" part="start-icon">
          <slot name="start" />
        </span>
        <span class="label">
          <slot />
        </span>
        {this.loading ? <ds-icon aria-hidden="true" name="spinner" size="sm" /> : null}
        <span class="icon" part="end-icon">
          <slot name="end" />
        </span>
      </button>
    );
  }
}
