import '@testing-library/jest-dom';

// TextEncoder/TextDecoderのpolyfill（react-router-domで必要）
if (typeof global.TextEncoder === 'undefined') {
  const { TextEncoder, TextDecoder } = require('util');
  global.TextEncoder = TextEncoder;
  global.TextDecoder = TextDecoder;
}