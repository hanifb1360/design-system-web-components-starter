import type { Components } from '@hanifb/web-component-design-system-starter';
import type React from 'react';

type CustomElement<T> = React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> &
  Partial<T>;
type InputElement = CustomElement<Components.DsInput> & {
  ondsInput?: (event: CustomEvent<string>) => void;
};

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'ds-button': CustomElement<Components.DsButton>;
      'ds-icon': CustomElement<Components.DsIcon>;
      'ds-input': InputElement;
    }
  }
}
