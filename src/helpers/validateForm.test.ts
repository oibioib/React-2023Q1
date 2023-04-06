import { IMAGE_TYPES } from '@constants';
import { describe, it } from 'vitest';

import validateForm from './validateForm';

const testTypes = {
  jpeg: 'image/jpeg',
  png: 'image/png',
  gif: 'image/gif',
};

describe('Helpers - validateForm', () => {
  it('Test type jpeg', () => {
    const result = validateForm.image(testTypes.jpeg, IMAGE_TYPES);
    expect(result).toBe(true);
  });

  it('Test type png', () => {
    const result = validateForm.image(testTypes.png, IMAGE_TYPES);
    expect(result).toBe(true);
  });

  it('Test type gif', () => {
    const result = validateForm.image(testTypes.gif, IMAGE_TYPES);
    expect(result).toBe(false);
  });
});
