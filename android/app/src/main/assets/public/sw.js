/**
 * Copyright 2018 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// If the loader is already loaded, just stop.
if (!self.define) {
  let registry = {};

  // Used for `eval` and `importScripts` where we can't get script URL by other means.
  // In both cases, it's safe to use a global var because those functions are synchronous.
  let nextDefineUri;

  const singleRequire = (uri, parentUri) => {
    uri = new URL(uri + ".js", parentUri).href;
    return registry[uri] || (
      
        new Promise(resolve => {
          if ("document" in self) {
            const script = document.createElement("script");
            script.src = uri;
            script.onload = resolve;
            document.head.appendChild(script);
          } else {
            nextDefineUri = uri;
            importScripts(uri);
            resolve();
          }
        })
      
      .then(() => {
        let promise = registry[uri];
        if (!promise) {
          throw new Error(`Module ${uri} didn’t register its module`);
        }
        return promise;
      })
    );
  };

  self.define = (depsNames, factory) => {
    const uri = nextDefineUri || ("document" in self ? document.currentScript.src : "") || location.href;
    if (registry[uri]) {
      // Module is already loading or loaded.
      return;
    }
    let exports = {};
    const require = depUri => singleRequire(depUri, uri);
    const specialDeps = {
      module: { uri },
      exports,
      require
    };
    registry[uri] = Promise.all(depsNames.map(
      depName => specialDeps[depName] || require(depName)
    )).then(deps => {
      factory(...deps);
      return exports;
    });
  };
}
define(['./workbox-afac4cd2'], (function (workbox) { 'use strict';

  self.skipWaiting();
  workbox.clientsClaim();
  /**
   * The precacheAndRoute() method efficiently caches and responds to
   * requests for URLs in the manifest.
   * See https://goo.gl/S9QRab
   */
  workbox.precacheAndRoute([{
    "url": "registerSW.js",
    "revision": "1872c500de691dce40960bb85481de07"
  }, {
    "url": "pwa-maskable-512x512.png",
    "revision": "f9f7aaf42c21a57449bbc7c998aa6b3b"
  }, {
    "url": "pwa-icon.svg",
    "revision": "1e9836ce327d0447de4ef756d11b2a43"
  }, {
    "url": "pwa-512x512.png",
    "revision": "013b5f360b179cb5df9af4d2f8cf6d10"
  }, {
    "url": "pwa-192x192.png",
    "revision": "e9fabc69c7304af636df0ba8d4f55e54"
  }, {
    "url": "logo.svg",
    "revision": "b37dbe24fbe26389068306dda0b676c3"
  }, {
    "url": "logo.png",
    "revision": "b37dbe24fbe26389068306dda0b676c3"
  }, {
    "url": "index.html",
    "revision": "684e5808d2a4705c744cfc0f413833f3"
  }, {
    "url": "apple-touch-icon.png",
    "revision": "45c45b27d79d3e154be0d3135848c98f"
  }, {
    "url": "app-cover.svg",
    "revision": "dbb989746ad7d3b4388dcee23089e620"
  }, {
    "url": "assets/vendor-icons-D9bZAF5l.js",
    "revision": null
  }, {
    "url": "assets/vendor-U_IZvCPJ.js",
    "revision": null
  }, {
    "url": "assets/rolldown-runtime-XKyaHtl9.js",
    "revision": null
  }, {
    "url": "assets/index-Cr59B4tg.css",
    "revision": null
  }, {
    "url": "assets/index-BWjLUimk.js",
    "revision": null
  }, {
    "url": "assets/curriculum-secondary-BCfG0iJv.js",
    "revision": null
  }, {
    "url": "assets/curriculum-primary-gdJHGksa.js",
    "revision": null
  }, {
    "url": "assets/curriculum-preparatory-Dx4ByxH3.js",
    "revision": null
  }, {
    "url": "assets/curriculum-dictionary-uPo2sRud.js",
    "revision": null
  }, {
    "url": "assets/curriculum-baccalaureate-BPjhshTb.js",
    "revision": null
  }, {
    "url": "assets/redesign/phone-mockup.png",
    "revision": null
  }, {
    "url": "assets/redesign/hero-student.png",
    "revision": null
  }, {
    "url": "assets/redesign/grade-secondary.png",
    "revision": null
  }, {
    "url": "assets/redesign/grade-primary.png",
    "revision": null
  }, {
    "url": "assets/redesign/grade-preparatory.png",
    "revision": null
  }, {
    "url": "assets/redesign/feat-vocab.png",
    "revision": null
  }, {
    "url": "assets/redesign/feat-progress.png",
    "revision": null
  }, {
    "url": "assets/redesign/feat-games.png",
    "revision": null
  }, {
    "url": "assets/redesign/feat-exams.png",
    "revision": null
  }, {
    "url": "assets/redesign/feat-curricula.png",
    "revision": null
  }, {
    "url": "assets/redesign/brand-icon.png",
    "revision": null
  }, {
    "url": "assets/redesign/banner-qr.png",
    "revision": null
  }, {
    "url": "assets/aistudio/file_00000000d5b081fab969e8b758fc2327_7f192deb.png",
    "revision": null
  }, {
    "url": "assets/aistudio/1793176157694_c2b0a460.png",
    "revision": null
  }, {
    "url": "app-cover.svg",
    "revision": "dbb989746ad7d3b4388dcee23089e620"
  }, {
    "url": "apple-touch-icon.png",
    "revision": "45c45b27d79d3e154be0d3135848c98f"
  }, {
    "url": "logo.png",
    "revision": "b37dbe24fbe26389068306dda0b676c3"
  }, {
    "url": "pwa-192x192.png",
    "revision": "e9fabc69c7304af636df0ba8d4f55e54"
  }, {
    "url": "pwa-512x512.png",
    "revision": "013b5f360b179cb5df9af4d2f8cf6d10"
  }, {
    "url": "pwa-icon.svg",
    "revision": "1e9836ce327d0447de4ef756d11b2a43"
  }, {
    "url": "pwa-maskable-512x512.png",
    "revision": "f9f7aaf42c21a57449bbc7c998aa6b3b"
  }, {
    "url": "manifest.webmanifest",
    "revision": "a4d6dd26b4f9817e6e2694775fc970e5"
  }], {});
  workbox.cleanupOutdatedCaches();
  workbox.registerRoute(new workbox.NavigationRoute(workbox.createHandlerBoundToURL("index.html")));
  workbox.registerRoute(/^https:\/\/fonts\.googleapis\.com\/.*/i, new workbox.CacheFirst({
    "cacheName": "google-fonts-cache",
    plugins: [new workbox.ExpirationPlugin({
      maxEntries: 10,
      maxAgeSeconds: 31536000
    }), new workbox.CacheableResponsePlugin({
      statuses: [0, 200]
    })]
  }), 'GET');
  workbox.registerRoute(/^https:\/\/fonts\.gstatic\.com\/.*/i, new workbox.CacheFirst({
    "cacheName": "gstatic-fonts-cache",
    plugins: [new workbox.ExpirationPlugin({
      maxEntries: 10,
      maxAgeSeconds: 31536000
    }), new workbox.CacheableResponsePlugin({
      statuses: [0, 200]
    })]
  }), 'GET');

}));
