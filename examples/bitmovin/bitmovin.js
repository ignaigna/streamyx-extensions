'use strict';

// Only CommonJS syntax modules is compatible with Streamyx at this time

/** @type {import("@streamyx/api").Extension} */

const extension = {
  name: 'bitmovin',
  fetchContentMetadata: async (url) => {
    const response = await http.fetch(url);
    const body = await response.text();
    if (!body.includes('.mpd')) {
      logger.error(`No MPD found in ${url}`);
      return [];
    }
    const mpd = body.split(`'`).find((line) => line.includes('.mpd'));
    const title = mpd.split('/').pop().replace('.mpd', '');
    return [
      {
        title,
        source: {
          url: mpd,
          drm: { server: 'https://cwip-shaka-proxy.appspot.com/no_auth' },
        },
      },
    ];
  },
};

module.exports = extension;
