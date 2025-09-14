import '@testing-library/jest-dom';
import { TextEncoder, TextDecoder } from 'util';

// TextEncoder/TextDecoderのpolyfill（react-router-domで必要）
if (typeof global.TextEncoder === 'undefined') {
  global.TextEncoder = TextEncoder as typeof global.TextEncoder;
  global.TextDecoder = TextDecoder as typeof global.TextDecoder;
}