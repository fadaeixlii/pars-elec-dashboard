import ToastHelper from "./addToast";

const notify = (value: string) =>
  ToastHelper.info(`Copied Successfully
    ${value}`);
export const copyHelper = (value: string) => {
  navigator.clipboard.writeText(value);
  notify(value);
};
