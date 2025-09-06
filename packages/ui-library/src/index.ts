// UI Library main export point

// Export components
export * from './components';

// Export hooks when they are created
// export * from './hooks';

// Export utils when they are created
// export * from './utils';

// Export types when they are created
// export * from './types';

// Library version
// Viteが自動的にpackage.jsonのversionを注入
declare const __UI_LIBRARY_VERSION__: string;
export const UI_LIBRARY_VERSION = __UI_LIBRARY_VERSION__;
