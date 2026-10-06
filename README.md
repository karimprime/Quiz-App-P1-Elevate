## 📂 Project Structure

```
├── .editorconfig
├── .gitignore
├── .vscode
    ├── extensions.json
    ├── launch.json
    └── tasks.json
├── README.md
├── angular.json
├── package-lock.json
├── package.json
├── projects
    └── auth-api-kp
    │   ├── README.md
    │   ├── ng-package.json
    │   ├── package-lock.json
    │   ├── package.json
    │   ├── src
    │       ├── lib
    │       │   ├── adaptor
    │       │   │   └── auth-api.adaptor.ts
    │       │   ├── auth-api-kp.service.spec.ts
    │       │   ├── auth-api-kp.service.ts
    │       │   ├── base
    │       │   │   └── AuthAPI.ts
    │       │   ├── enums
    │       │   │   └── AuthAPI.endPoint.ts
    │       │   └── interface
    │       │   │   └── adaptor.ts
    │       └── public-api.ts
    │   ├── tsconfig.lib.json
    │   ├── tsconfig.lib.prod.json
    │   └── tsconfig.spec.json
├── public
    ├── favicon.ico
    ├── icons
    │   ├── apple.png
    │   ├── facebook.png
    │   ├── google.png
    │   └── twitter.png
    └── images
    │   ├── 404-page-not-found.svg
    │   └── sideauth.png
├── src
    ├── app
    │   ├── app.component.html
    │   ├── app.component.scss
    │   ├── app.component.spec.ts
    │   ├── app.component.ts
    │   ├── app.config.server.ts
    │   ├── app.config.ts
    │   ├── app.routes.server.ts
    │   ├── app.routes.ts
    │   ├── core
    │   │   ├── layouts
    │   │   │   ├── auth-layout
    │   │   │   │   ├── auth-layout.component.html
    │   │   │   │   ├── auth-layout.component.scss
    │   │   │   │   ├── auth-layout.component.spec.ts
    │   │   │   │   ├── auth-layout.component.ts
    │   │   │   │   └── components
    │   │   │   │   │   └── auth-navbar
    │   │   │   │   │       ├── auth-navbar.component.html
    │   │   │   │   │       ├── auth-navbar.component.scss
    │   │   │   │   │       ├── auth-navbar.component.spec.ts
    │   │   │   │   │       └── auth-navbar.component.ts
    │   │   │   └── reset-password-layout
    │   │   │   │   ├── reset-password-layout.component.html
    │   │   │   │   ├── reset-password-layout.component.scss
    │   │   │   │   ├── reset-password-layout.component.spec.ts
    │   │   │   │   └── reset-password-layout.component.ts
    │   │   ├── pages
    │   │   │   ├── forget-password
    │   │   │   │   ├── forget-password.component.html
    │   │   │   │   ├── forget-password.component.scss
    │   │   │   │   ├── forget-password.component.spec.ts
    │   │   │   │   └── forget-password.component.ts
    │   │   │   ├── login
    │   │   │   │   ├── login.component.html
    │   │   │   │   ├── login.component.scss
    │   │   │   │   ├── login.component.spec.ts
    │   │   │   │   └── login.component.ts
    │   │   │   ├── register
    │   │   │   │   ├── register.component.html
    │   │   │   │   ├── register.component.scss
    │   │   │   │   ├── register.component.spec.ts
    │   │   │   │   └── register.component.ts
    │   │   │   ├── set-password
    │   │   │   │   ├── set-password.component.html
    │   │   │   │   ├── set-password.component.scss
    │   │   │   │   ├── set-password.component.spec.ts
    │   │   │   │   └── set-password.component.ts
    │   │   │   └── verify-code
    │   │   │   │   ├── verify-code.component.html
    │   │   │   │   ├── verify-code.component.scss
    │   │   │   │   ├── verify-code.component.spec.ts
    │   │   │   │   └── verify-code.component.ts
    │   │   └── services
    │   │   │   └── platform
    │   │   │       ├── platform.service.spec.ts
    │   │   │       └── platform.service.ts
    │   ├── features
    │   │   ├── layouts
    │   │   │   └── dashboard
    │   │   │   │   ├── dashboard.component.html
    │   │   │   │   ├── dashboard.component.scss
    │   │   │   │   ├── dashboard.component.spec.ts
    │   │   │   │   └── dashboard.component.ts
    │   │   └── pages
    │   │   │   ├── home
    │   │   │       ├── home.component.html
    │   │   │       ├── home.component.scss
    │   │   │       ├── home.component.spec.ts
    │   │   │       └── home.component.ts
    │   │   │   └── not-found
    │   │   │       ├── not-found.component.html
    │   │   │       ├── not-found.component.scss
    │   │   │       ├── not-found.component.spec.ts
    │   │   │       └── not-found.component.ts
    │   ├── shared
    │   │   ├── components
    │   │   │   └── ui
    │   │   │   │   └── submit-button
    │   │   │   │       ├── submit-button.component.html
    │   │   │   │       ├── submit-button.component.scss
    │   │   │   │       ├── submit-button.component.spec.ts
    │   │   │   │       └── submit-button.component.ts
    │   │   └── services
    │   │   │   └── notification
    │   │   │       ├── notification.service.spec.ts
    │   │   │       └── notification.service.ts
    │   └── store
    │   │   ├── auth.actions.ts
    │   │   ├── auth.effects.ts
    │   │   ├── auth.reducer.ts
    │   │   ├── auth.selectors.ts
    │   │   └── auth.state.ts
    ├── index.html
    ├── main.server.ts
    ├── main.ts
    ├── server.ts
    └── styles.scss
├── tailwind.config.js
├── tsconfig.app.json
├── tsconfig.json
└── tsconfig.spec.json
```

test-new-github-actions
