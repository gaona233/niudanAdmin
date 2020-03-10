/// <reference types="react-scripts" />
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
  