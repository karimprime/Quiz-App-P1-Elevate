
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "redirectTo": "/auth-layout",
    "route": "/"
  },
  {
    "renderMode": 2,
    "redirectTo": "/auth-layout/login",
    "route": "/auth-layout"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-MFOOK6WQ.js"
    ],
    "route": "/auth-layout/login"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-O3S3WERL.js"
    ],
    "route": "/auth-layout/register"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-6ENJIPKU.js"
    ],
    "route": "/auth-layout/forget-password"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-XWFMHRWP.js"
    ],
    "route": "/auth-layout/verify-code"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-LD7OWFSM.js"
    ],
    "route": "/auth-layout/set-password"
  },
  {
    "renderMode": 2,
    "redirectTo": "/auth-layout",
    "route": "/**"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 6354, hash: '9309bf228f28904c068e6ac8313752caad2bac48dbb905bb8119fdaf054981b6', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1160, hash: '0c6db758b716b518637dcd616c91a7f83e939165e71b1566e8d208e37c66a733', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'auth-layout/register/index.html': {size: 47945, hash: '7ea166673488930c3849d8a319d3b10a32d54098eb1b8c33ac5dc0f18ed69d60', text: () => import('./assets-chunks/auth-layout_register_index_html.mjs').then(m => m.default)},
    'auth-layout/login/index.html': {size: 46389, hash: '7233adbc3da7843a489aa8d8a5756bb6fbc15c9a2799304162da4de83e9b6a48', text: () => import('./assets-chunks/auth-layout_login_index_html.mjs').then(m => m.default)},
    'auth-layout/forget-password/index.html': {size: 37493, hash: '6d03db9b8c5c24218b29bf51d88c3aade03c66ae51711716d723277b7cdda00f', text: () => import('./assets-chunks/auth-layout_forget-password_index_html.mjs').then(m => m.default)},
    'auth-layout/set-password/index.html': {size: 45203, hash: 'd85ad8a54092e8d9a8521d05493c5acf29b3622eb5f823d88cb1027b61f913db', text: () => import('./assets-chunks/auth-layout_set-password_index_html.mjs').then(m => m.default)},
    'auth-layout/verify-code/index.html': {size: 37412, hash: 'a595163f6ee84a95bfd07b8b509c874e8b551d0dee6ae73e302c6c7c7072b987', text: () => import('./assets-chunks/auth-layout_verify-code_index_html.mjs').then(m => m.default)},
    'styles-ZH4U3IPC.css': {size: 242819, hash: 'owr0qAbU2lw', text: () => import('./assets-chunks/styles-ZH4U3IPC_css.mjs').then(m => m.default)}
  },
};
