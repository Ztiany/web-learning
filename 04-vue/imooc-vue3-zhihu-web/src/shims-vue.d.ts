/* eslint-disable */
// refers to [ambient-modules](https://www.typescriptlang.org/docs/handbook/modules.html#ambient-modules) and typescript-eslint/issues/1824
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
