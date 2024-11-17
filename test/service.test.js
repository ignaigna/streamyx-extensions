// CommonJS syntax is not supported / deprecated by Vitest, so using ESM

import { expect, test } from 'vitest';
import { registerService } from '@streamyx/core';
import service from '../lib/service';

test('register service', () => {
  const instance = registerService(service);
  expect(instance).toBeDefined();
  expect(instance).toHaveProperty('name', 'ntv');
  expect(instance).toHaveProperty('fetchContentMetadata');
});

test('fetch content metadata', async () => {
  const instance = registerService(service);
  const response = await instance.fetchContentMetadata('https://www.ntv.ru/video/2366302');
  expect(response).toBeDefined();
  expect(response).toHaveLength(1);
  expect(response[0]).toHaveProperty('source');
  expect(response[0].source).toHaveProperty('url');
  const expectedSourceUrl =
    'https://cdn2-vod-mp4.ntv.ru/news/2024/20240916/19_Chernov_hq87DTcVGUaKkKIVbE.mp4?e=1726592122&md5=3j9IdLADMJWzUktx8aKPKw';
  expect(response[0].source?.url).toBe(expectedSourceUrl);
});
