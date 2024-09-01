import ToastHelper from "./addToast";

const notify = (value: string) =>
  ToastHelper.info(`Copied Successfully
    ${value}`);
export const copyHelper = (value: string | number) => {
  navigator.clipboard.writeText(String(value));
  notify(String(value));
};
