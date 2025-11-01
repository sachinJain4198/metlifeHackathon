# Structure (short)

- src/app: Redux store (store.js)
- src/features/<name>/<name>Slice.js: Redux slices
- src/components: reusable UI (e.g., Layout)
- src/pages: route screens
- src/services: api.js (axios, commented endpoints), mock.js (mock data)
- src/theme: theme.js (MUI theme)
- src/App.jsx: routes (React Router v6)
- src/main.jsx: providers (Redux, Router, MUI) + Bootstrap CSS
- src/index.css: minimal globals

## Add

- Page: pages/MyPage.jsx, add Route in App.jsx
- Component: components/MyComponent.jsx, import where needed
- API call: add commented fn in services/api.js; data in services/mock.js
- Slice: features/name/nameSlice.js; register in app/store.js

## Conventions

- Components: PascalCase
- Slices/actions/selectors: camelCase
- Styling: MUI components + system props; Bootstrap utilities (d-flex, gap-2, flex-*, justify-*, align-*)
- Responsive: MUI Grid breakpoints (xs/sm/md)
