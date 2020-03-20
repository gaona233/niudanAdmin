/// <reference types="node" />
/// <reference types="react" />
/// <reference types="react-dom" />

declare namespace NodeJS {
  interface ProcessEnv {
    readonly NODE_ENV: 'development' | 'production' | 'test';
    readonly PUBLIC_URL: string;
  }
}

declare module '*.bmp' {
  const src: string;
  export default src;
}

declare module '*.gif' {
  const src: string;
  export default src;
}

declare module '*.jpg' {
  const src: string;
  export default src;
}

declare module '*.jpeg' {
  const src: string;
  export default src;
}

declare module '*.png' {
  const src: string;
  export default src;
}

declare module '*.webp' {
    const src: string;
    export default src;
}

declare module '*.svg' {
  import * as React from 'react';

  export const ReactComponent: React.FunctionComponent<React.SVGProps<
    SVGSVGElement
  > & { title?: string }>;

  const src: string;
  export default src;
}

declare module '*.module.css' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module '*.module.scss' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module '*.module.sass' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

/* Global definitions for development */

// for style loader
declare module "*.css" {
    const styles: any;
    export = styles;
  }
  declare module "*.lcss" {
      const styles: any;
      export = styles;
  }
  
  declare module "*.png";
  declare module "*.gif";
  declare module "*.jpg";
  declare module "*.svg";
  declare module "react-copy-to-clipboard";
  declare module "*xlsx-populate.min.js";
  
  // Omit type https://github.com/Microsoft/TypeScript/issues/12215
  type Diff<T extends string | number | symbol, U extends string | number | symbol> = ({ [P in T]: P } & { [P in U]: never } & { [x: string]: never })[T];
  type Omit<T, K extends keyof T> = { [P in Diff<keyof T, K>]: T[P] };
  
  type PartialPick<T, K extends keyof T> = Partial<T> & Pick<T, K>;
