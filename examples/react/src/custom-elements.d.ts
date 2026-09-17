import type { Components } from '@hanifb/web-component-design-system-starter';
import type React from 'react';

type CustomElement<T> = React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> &
  Partial<T>;

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'ds-button': CustomElement<Components.DsButton>;
      'ds-icon': CustomElement<Components.DsIcon>;
      'ds-input': CustomElement<Components.DsInput>;
    }
  }
}
