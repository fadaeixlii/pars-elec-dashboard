/// <reference types="./utility.d.ts" />

import "react";

declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: "translation";
  }
}

interface ReCaptchaInstance {
  ready: (cb: () => unknown) => void;
  execute: (options: ReCaptchaExecuteOptions) => Promise<string>;
  render: (id: string, options: ReCaptchaRenderOptions) => unknown;
}

interface ReCaptchaExecuteOptions {
  action: string;
}

interface ReCaptchaRenderOptions {
  sitekey: string;
  size: "invisible";
}

export declare global {
  type AnyFunction = (...args: unknown[]) => unknown;
  interface Number {
    fixToDecimal(decimalPlaces: number): string;
  }
  interface ICountries {
    code: string;
    name: string;
    symbol: string;
  }
  interface IResponse<T> {
    status: string;
    message: string;
    timestamp: number;
    code: number;
    body: T;
  }

  type TMethodTypes = "get" | "post" | "put" | "delete";
  interface Window {
    grecaptcha: ReCaptchaInstance;
    captchaOnLoad: () => void;
  }
}

declare module "react" {
  type SetState<S> = Dispatch<SetStateAction<S>>;
}

Number.prototype.fixToDecimal = function (decimalPlaces: number): string {
  // const factor = Math.pow(10, decimalPlaces)
  // return String(Math.floor(this * factor) / factor)
  return this.toFixed(decimalPlaces);
};

// declare module TMethodTypes {
