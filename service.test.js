// CommonJS syntax is not supported / deprecated by Vitest, so using ESM

import { join } from 'node:path';
import { expect, test } from 'vitest';
import { install } from '@streamyx/core';

const filePath = join(__dirname, './service.js');

test('install', async () => {
  const service = await install(filePath);
  expect(service).toBeDefined();
  expect(service).toHaveProperty('name', 'ntv');
  expect(service).toHaveProperty('fetchContentMetadata');
});

test('fetch content metadata', async () => {
  const service = await install(filePath);
  const response = await service.fetchContentMetadata('https://www.ntv.ru/video/2366302');
  expect(response).toBeDefined();
  expect(response).toHaveLength(1);
  expect(response[0]).toHaveProperty('source');
  expect(response[0].source).toHaveProperty('url');
  const expectedSourceUrl =
    'https://ymedia-k.ntv.ru/news/2024/20240916/19_Chernov_hq87DTcVGUaKkKIVbE.mp4?ts=1733145091&md5=LG44V6VKZMFf-6cvvKukDQ';
  expect(response[0].source?.url).toBe(expectedSourceUrl);
});
