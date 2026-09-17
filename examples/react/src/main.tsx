import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { defineCustomElements } from '@hanifb/web-component-design-system-starter/loader';
import '@hanifb/web-component-design-system-starter/styles';
defineCustomElements();

function App() {
  const [email, setEmail] = useState('');
  return (
    <main>
      <ds-input
        label="Email"
        name="email"
        type="email"
        ondsInput={event => setEmail(event.detail)}
      />
      <ds-button>
        <ds-icon name="check" slot="start" />
        Save
      </ds-button>
      <output>{email}</output>
    </main>
  );
}

createRoot(document.getElementById('root')!).render(<App />);
