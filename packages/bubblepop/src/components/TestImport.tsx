import React from 'react';
import { TestButton, UI_LIBRARY_VERSION } from '@bubblepop/ui-library';

export const TestImport: React.FC = () => {
  return (
    <div>
      <h2>Testing UI Library Import</h2>
      <p data-testid="ui-library-version">
        UI Library Version: {UI_LIBRARY_VERSION}
      </p>
      <TestButton
        label="Test Button from UI Library"
        onClick={() => alert('Button clicked!')}
      />
    </div>
  );
};
