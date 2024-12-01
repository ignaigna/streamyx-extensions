// CommonJS syntax is not supported / deprecated by Vitest, so using ESM

import { join } from 'node:path';
import { expect, test } from 'vitest';
import { install } from '@streamyx/core';

const filePath = join(__dirname, './service.js');

test('installation', async () => {
  const service = await install(filePath);
  expect(service).toBeDefined();
  expect(service).toHaveProperty('name', 'bitmovin');
  expect(service).toHaveProperty('fetchContentMetadata');
});

test('fetching content metadata', async () => {
  const service = await install(filePath);
  const response = await service.fetchContentMetadata('https://bitmovin.com/demos/drm/');
  expect(response).toBeDefined();
  expect(response).toHaveLength(1);
  expect(response[0]).toHaveProperty('source');
  expect(response[0].source).toHaveProperty('url');
  const source = 'https://cdn.bitmovin.com/content/assets/art-of-motion_drm/mpds/11331.mpd';
  expect(response[0].source?.url).toBe(source);
});
