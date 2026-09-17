import { Component, h, Prop } from '@stencil/core';

export type IconName = 'check' | 'close' | 'info' | 'search' | 'spinner';
export type IconSize = 'sm' | 'md' | 'lg';

const paths: Record<IconName, string> = {
  check: 'M20 6 9 17l-5-5',
  close: 'M18 6 6 18M6 6l12 12',
  info: 'M12 16v-4m0-4h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z',
  search: 'm21 21-4.35-4.35m2.35-5.65a8 8 0 1 1-16 0 8 8 0 0 1 16 0Z',
  spinner: 'M21 12a9 9 0 0 1-9 9',
};

@Component({ tag: 'ds-icon', styleUrl: 'ds-icon.css', shadow: true })
export class DsIcon {
  /** Icon from the starter's intentionally small, bundled set. */
  @Prop() name: IconName = 'info';

  /** Rendered icon size. */
  @Prop() size: IconSize = 'md';

  /** Accessible name for a meaningful standalone icon. Omit for decorative icons. */
  @Prop() label?: string;

  render() {
    return (
      <svg
        aria-hidden={this.label ? undefined : 'true'}
        aria-label={this.label}
        class={`icon icon--${this.size}`}
        fill="none"
        part="svg"
        role={this.label ? 'img' : undefined}
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        viewBox="0 0 24 24"
      >
        <path d={paths[this.name]} />
      </svg>
    );
  }
}
