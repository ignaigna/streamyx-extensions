import type { AuthState, CmsAuthResponse } from './types';
import { DEVICE, ROUTES } from './constants';

export const HEADERS = {
  authorization: DEVICE.authorization,
  'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
  'User-Agent': DEVICE.userAgent,
};

const buildRequestOptions = (params: Record<string, string>) => {
  return { method: 'POST', body: new URLSearchParams(params).toString(), headers: HEADERS };
};

const promptCredentials = async () => {
  const { username, password } = await question.ask({
    username: { label: 'Username' },
    password: { label: 'Password' },
  });
  return { username, password };
};

const fetchCmsAuth = async (accessToken: string) => {
  const requestOptions = { method: 'GET', headers: { authorization: `Bearer ${accessToken}` } };
  const response = await http.fetch(ROUTES.index, requestOptions);
  if (response.status !== 200) {
    logger.error(`Can't get CMS token. Status code: ${response.status}`);
    logger.debug(await response.text());
    return;
  }
  return (await response.json()) as CmsAuthResponse;
};

const checkToken = () => {
  const TIME_MARGIN = 60000;
  const hasToken = !!storage.accessToken && !!storage.refreshToken && !!storage.cmsAuth?.cms;
  const isTokenExpired = hasToken && Number(storage.expires) - TIME_MARGIN < new Date().getTime();
  return { hasToken, isTokenExpired };
};

const fetchToken = async (params: Record<string, string>) => {
  try {
    const deviceId = storage.deviceId || DEVICE.id;
    const deviceType = storage.deviceType || DEVICE.type;
    const options = buildRequestOptions({
      ...params,
      scope: 'offline_access',
      device_id: deviceId,
      device_type: deviceType,
    });
    const response = await http.fetch(ROUTES.token, options);
    const auth: any = await response.json();
    const error = auth.error || response.status !== 200;
    if (error) {
      logger.error(`Can't get token. Status code: ${response.status}. Message: ${auth.error}. Logging out...`);
      logger.debug(JSON.stringify(auth));
      await signOut();
      await signIn();
    } else {
      const cmsAuth = await fetchCmsAuth(auth.access_token);
      const newState: AuthState = {
        accessToken: auth.access_token,
        refreshToken: auth.refresh_token,
        expires: new Date().getTime() + auth.expires_in * 1000,
        tokenType: auth.token_type,
        scope: auth.scope,
        country: auth.country,
        accountId: auth.account_id,
        cookies: http.headers.cookie,
        cmsAuth,
        deviceId,
        deviceType,
      };
      http.setHeader('authorization', `Bearer ${newState.accessToken}`);
      await storage.save(newState);
      return newState;
    }
  } catch (e: any) {
    logger.debug(`Auth failed: ${e.message}`);
    process.exit(1);
  }
};

const fetchAccessToken = (username: string, password: string) => {
  return fetchToken({ grant_type: 'password', username, password });
};

const fetchRefreshToken = (refreshToken: string) => {
  return fetchToken({ grant_type: 'refresh_token', refresh_token: refreshToken });
};

export const signIn = async (username?: string, password?: string) => {
  await storage.load();
  http.setHeader('authorization', `Bearer ${storage.accessToken}`);
  const { hasToken, isTokenExpired } = checkToken();
  if (!hasToken) {
    logger.debug(`Requesting credentials`);
    const credentials = username && password ? { username, password } : await promptCredentials();
    logger.debug(`Requesting token`);
    await fetchAccessToken(credentials.username, credentials.password);
  } else if (isTokenExpired) {
    logger.debug(`Refreshing token`);
    if (storage.refreshToken) await fetchRefreshToken(storage.refreshToken);
  }
};

export const signOut = async () => {
  http.setHeader('authorization', '');
  await storage.clear();
};

export const createAuth = () => {
  return {};
};

export type Auth = ReturnType<typeof createAuth>;
