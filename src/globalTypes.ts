export type ToastifyType = 'info' | 'success' | 'warning' | 'error';
export type ToastifyPosition =
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'top-center'
  | 'bottom-right'
  | 'bottom-center';

export type ToastifyProps = {
  type: ToastifyType;
  message: string;
  position: ToastifyPosition;
};
