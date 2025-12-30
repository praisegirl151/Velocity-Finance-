
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

const init = () => {
  const rootElement = document.getElementById('root');
  if (rootElement) {
    try {
      const root = createRoot(rootElement);
      root.render(
        <React.StrictMode>
          <App />
        </React.StrictMode>
      );
    } catch (error) {
      console.error("Failed to render React app:", error);
      rootElement.innerHTML = `<div style="padding: 20px; color: #ff4d4d;">
        <h3>Application Error</h3>
        <p>${error instanceof Error ? error.message : 'Unknown error occurred during boot.'}</p>
      </div>`;
    }
  } else {
    console.error("Critical: Could not find the 'root' element.");
  }
};

// Ensure DOM is ready for mounting
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
