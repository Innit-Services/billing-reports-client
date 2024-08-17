# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

remember to install node modules first

npm script : [Refere package.json]

 ```
 "scripts": {
    "dev": "vite",  -- run local dev server
    "build": "vite build",   -- build the bundle for deployment
    "lint": "eslint .",
    "preview": "vite preview"
  }
 ```

<pre>
src
├── assets
│   ├── images
│   │   └── logo.png
│   ├── fonts
│   │   └── roboto.ttf
│   ├── styles
│       └── global.css
├── configs
│   ├── env.development.js
│   ├── env.production.js
│   └── ... (other configuration files)
├── modules
│   ├── auth
│   ├── client
│   ├── employee
│   └── ... etc.
├── shared
│   ├── constants.js
└── utils
    ├── validateEmail.js

</pre>


© 2024 Billing Reports. All rights reserved.