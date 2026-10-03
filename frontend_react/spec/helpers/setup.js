import { cleanup } from '@testing-library/react';

if (typeof afterEach === 'function') {
  afterEach(() => {
    cleanup();
    if (globalThis.document && globalThis.document.body) {
      globalThis.document.body.innerHTML = '<div id="root"></div>';
    }
  });
}
