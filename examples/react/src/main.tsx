import React from 'react';
import { createRoot } from 'react-dom/client';
import { defineCustomElements } from '@hanifb/web-component-design-system-starter/loader';
import '@hanifb/web-component-design-system-starter/styles';
defineCustomElements();
createRoot(document.getElementById('root')!).render(
  <main>
    <ds-input label="Email" name="email" type="email" />
    <ds-button>
      <ds-icon name="check" slot="start" />
      Save
    </ds-button>
  </main>,
);
