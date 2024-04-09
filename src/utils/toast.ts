import { ToastT, toast } from "sonner";
import { DEFAULT_TOAST_CONFIG } from "../consts/toast";

export function renderToast (message: string, config: ToastT ): void {
  toast(message, { ...DEFAULT_TOAST_CONFIG, ...config })
}

export function renderErrorToast (message: string, config = {}): void {
  toast.error(message, { ...DEFAULT_TOAST_CONFIG, ...config })
}

export function renderSuccessToast (message: string, config = {}): void {
  toast.success(message, { ...DEFAULT_TOAST_CONFIG, ...config })
}