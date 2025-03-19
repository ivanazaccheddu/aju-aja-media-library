import { SiteContext } from '../../../utils/contexts/';
import { formatInnerLink } from '../../../utils/helpers/';

const validVideoFormats = ['hls', 'h265', 'vp9', 'h264', 'vp8', 'mp4', 'theora']; // NOTE: Keep array order.

/**
 * Detects if a video is a VR video based on metadata or filename
 * @param {Object} data - Video metadata
 * @returns {boolean} - Whether the video is VR/360
 */
export function isVRVideo(data) {
  // Check for VR/360 indicators in filename or metadata
  if (!data) return false;

  // Check filename for VR indicators
  if (data.title && (
      data.title.toLowerCase().includes('360') ||
      data.title.toLowerCase().includes('vr') ||
      data.title.toLowerCase().includes('virtual reality') ||
      data.title.toLowerCase().includes('spherical')
  )) {
    return true;
  }

  // Check tags if available
  if (data.tags && Array.isArray(data.tags)) {
    const vrTags = data.tags.filter(tag =>
        tag.toLowerCase().includes('360') ||
        tag.toLowerCase().includes('vr') ||
        tag.toLowerCase().includes('virtual reality') ||
        tag.toLowerCase().includes('spherical')
    );
    if (vrTags.length > 0) return true;
  }

  // Check for VR specific metadata fields if they exist
  if (data.is_vr || data.is_360 || data.projection === 'equirectangular') {
    return true;
  }

  return false;
}

function browserSupports_videoCodec(what, debugLog) {
  let ret = null,
      vid = document.createElement('video');

  if (!!vid.canPlayType) {
    try {
      switch (what) {
        case 'hls':
          // ret = 'probably' === vid.canPlayType('application/x-mpegURL; codecs="avc1.42E01E"');
          ret = true; // NOTE: Return always 'true' and allow player to decide...
          break;
        case 'h265':
          ret =
              'probably' === vid.canPlayType('video/mp4; codecs="hvc1.1.L0.0"') ||
              'probably' === vid.canPlayType('video/mp4; codecs="hev1.1.L0.0"');
          break;
        case 'h264':
          ret =
              'probably' === vid.canPlayType('video/mp4; codecs="avc1.42E01E"') ||
              'probably' === vid.canPlayType('video/mp4; codecs="avc1.42E01E, mp4a.40.2"');
          break;
        case 'vp9':
          ret = 'probably' === vid.canPlayType('video/webm; codecs="vp9"');
          break;
        case 'vp8':
          ret = 'probably' === vid.canPlayType('video/webm; codecs="vp8, vorbis"');
          break;
        case 'theora':
          ret = 'probably' === vid.canPlayType('video/ogg; codecs="theora"');
          break;
        case 'mp4':
          // ret = 'probably' === vid.canPlayType('video/mp4; codecs="mp4v.20.8"');
          ret = true; // NOTE: Return always 'true', as the default video format.
          break;
      }

      // Log BUGGY states.

      debugLog = debugLog instanceof Boolean || 0 === debugLog || 1 == debugLog ? debugLog : false;

      if (debugLog) {
        if ('no' === vid.canPlayType('video/nonsense')) {
          console.warn(
              'BUGGY: Codec detection bug in Firefox 3.5.0 - 3.5.1 and Safari 4.0.0 - 4.0.4 that answer "no" to unknown codecs instead of an empty string'
          );
        }

        if ('probably' === vid.canPlayType('video/webm')) {
          console.warn(
              'BUGGY: Codec detection bug that Firefox 27 and earlier always says "probably" when asked about WebM, even when the codecs string is not present'
          );
        }

        if ('maybe' === vid.canPlayType('video/mp4; codecs="avc1.42E01E"')) {
          switch (vid.canPlayType('video/mp4')) {
            case 'probably':
              console.warn(
                  'BUGGY: Codec detection bug in iOS 4.1 and earlier that switches "maybe" and "probably" around'
              );
              break;
            case 'maybe':
              console.warn('BUGGY: Codec detection bug in Android where no better answer than "maybe" is given');
              break;
          }
        }

        if (
            'probably' === vid.canPlayType('video/mp4; codecs="avc1.42E01E, mp4a.40.2"') &&
            'probably' !== vid.canPlayType('video/mp4; codecs="avc1.42E01E"')
        ) {
          console.warn(
              'BUGGY: Codec detection bug in Internet Explorer 9 that requires both audio and video codec on test'
          );
        }
      }
    } catch (e) {
      console.warn(e);
    }
  }

  return ret;
}

export function orderedSupportedVideoFormats(includeAll) {
  let order = [];
  let supports = {};
  let vid = document.createElement('video');

  if (!!vid.canPlayType) {
    /*if( '' === vid.canPlayType('application/x-mpegURL; codecs="avc1.42E01E"') ){ */
    supports.hls = !0; // NOTE: Return always 'true' and allow player to decide...
    order.push('hls');
    /*}*/

    if (
        vid.canPlayType('video/mp4; codecs="hvc1.1.L0.0"') ||
        'probably' === vid.canPlayType('video/mp4; codecs="hev1.1.L0.0"')
    ) {
      supports.h265 = !0;
      order.push('h265');
    }

    if ('probably' === vid.canPlayType('video/mp4; codecs="avc1.42E01E"')) {
      supports.h264 = !0;
      order.push('h264');
    }

    if ('probably' === vid.canPlayType('video/webm; codecs="vp9"')) {
      supports.vp9 = !0;
      order.push('vp9');
    }

    if (includeAll) {
      if ('probably' === vid.canPlayType('video/webm; codecs="vp8, vorbis"')) {
        supports.vp8 = !0;
        order.push('vp8');
      }

      if ('probably' === vid.canPlayType('video/ogg; codecs="theora"')) {
        supports.theora = !0;
        order.push('theora');
      }
    }

    if ('probably' === vid.canPlayType('video/mp4; codecs="mp4v.20.8"')) {
      supports.mp4 = !0;
      order.push('mp4');
    }
  }

  return {
    order: order,
    support: supports,
  };
}

export function videoAvailableCodecsAndResolutions(data, hlsData, supportedFormats) {
  const ret = {};
  let i, k, fileExt;

  supportedFormats = void 0 === supportedFormats ? orderedSupportedVideoFormats() : supportedFormats;

  const supportedFormatsExtensions = {
    hls: ['m3u8'],
    h265: ['mp4', 'webm'],
    h264: ['mp4', 'webm'],
    vp9: ['mp4', 'webm'],
    vp8: ['mp4', 'webm'],
    theora: ['ogg'],
    mp4: ['mp4'],
  };

  for (i in hlsData) {
    if (hlsData.hasOwnProperty(i)) {
      k = null;

      if ('master_file' === i) {
        k = 'Auto';
      } else {
        k = i.split('_playlist');
        k = 2 === k.length ? k[0] : null;
      }

      if (null !== k) {
        ret[k] = void 0 === ret[k] ? { format: [], url: [] } : ret[k];
        ret[k].format.push('hls');
        ret[k].url.push(formatInnerLink(hlsData[i], SiteContext._currentValue.url));
      }
    }
  }

  for (k in data) {
    if (data.hasOwnProperty(k) && Object.keys(data[k]).length) {
      // TODO: With HLS doesn't matter the height of screen?
      if (1080 >= parseInt(k, 10) || (1080 < window.screen.width && 1080 < window.screen.height)) {
        i = 0;
        while (i < validVideoFormats.length) {
          if (void 0 !== data[k][validVideoFormats[i]]) {
            if (
                browserSupports_videoCodec(validVideoFormats[i], !1) &&
                data[k][validVideoFormats[i]] &&
                data[k][validVideoFormats[i]].url
            ) {
              if (100 !== data[k][validVideoFormats[i]].progress) {
                console.warn('VIDEO DEBUG:', 'PROGRESS value is', data[k][validVideoFormats[i]].progress);
              }

              if ('success' !== data[k][validVideoFormats[i]].status) {
                console.warn('VIDEO DEBUG:', 'STATUS value is', data[k][validVideoFormats[i]].status);
              }

              fileExt = data[k][validVideoFormats[i]].url.split('.');

              if (
                  fileExt.length &&
                  0 <= supportedFormatsExtensions[validVideoFormats[i]].indexOf(fileExt[fileExt.length - 1])
              ) {
                ret[k] = void 0 === ret[k] ? { format: [], url: [] } : ret[k];
                ret[k].format.push(validVideoFormats[i]);
                ret[k].url.push(formatInnerLink(data[k][validVideoFormats[i]].url, SiteContext._currentValue.url));
              }
            }
          }

          i += 1;
        }
      }
    }
  }

  return ret;
}

export function extractDefaultVideoResolution(def, data) {
  let i,
      keys = Object.keys(data);

  if (void 0 !== data[def]) {
    return def;
  }

  if (parseInt(def, 10) >= parseInt(keys[keys.length - 1], 10)) {
    return keys[keys.length - 1];
  }

  if (parseInt(def, 10) <= parseInt(keys[0], 10)) {
    return keys[0];
  }

  i = keys.length - 1;
  while (i >= 0) {
    if (parseInt(def, 10) >= parseInt(keys[i], 10)) {
      return keys[i + 1];
    }
    i -= 1;
  }
}

/**
 * Configure VR options for videojs-vr plugin
 * @param {boolean} isVR - Whether the video is VR/360
 * @returns {Object|null} - VR configuration options or null if not VR
 */
export function getVRConfig(isVR) {
  if (!isVR) return null;

  return {
    projection: 'equirectangular', // Most common VR video projection
    crossorigin: 'anonymous',
    initVR: true,
    debug: false,
    forceCardboard: false,
    motionControls: true,
    enableTouch: true,
    enableVrDisplay: true,
    responsive: true
  };
}

/**
 * Initialize VR plugin for videojs player
 * @param {Object} player - videojs player instance
 * @param {Object} vrConfig - VR configuration options
 */
/**
 * Initialize VR plugin for videojs player
 * @param {Object} player - videojs player instance
 * @param {Object} vrConfig - VR configuration options
 */
export function initializeVRPlugin(player, vrConfig) {
  if (!player || !vrConfig) return;

  console.log('Attempting to initialize VR plugin');

  const initVR = () => {
    if (player.vr && typeof player.vr === 'function') {
      // Only initialize if not already done
      if (!player.hasClass('vjs-vr-enabled')) {
        console.log('Initializing VR plugin now');
        player.vr(vrConfig);

        // Add VR mode indicator
        const vrIndicator = document.createElement('div');
        vrIndicator.className = 'vjs-vr-indicator';
        vrIndicator.innerHTML = '<span>360° VR</span>';
        player.el().appendChild(vrIndicator);

        // Add VR class for styling
        player.addClass('vjs-vr-enabled');

        console.log('VR plugin initialized with config:', vrConfig);
      }
    } else {
      console.warn('VideoJS VR plugin not available');
    }
  };

  // Critical: Initialize on loadeddata which happens after source is set but before play
  if (player.readyState() >= 2) {  // HAVE_CURRENT_DATA or higher
    initVR();
  } else {
    // Listen for the 'loadeddata' event which fires when media data is available
    player.one('loadeddata', initVR);
  }

  // Backup: Also initialize on canplay which happens when playback can start
  player.one('canplay', initVR);

  // Additional backup with short timeout to catch any missed events
  setTimeout(initVR, 100);
}