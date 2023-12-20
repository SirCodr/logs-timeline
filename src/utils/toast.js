import { toast } from "sonner";
import { DEFAULT_TOAST_CONFIG } from "../consts/toast";

export function renderToast (message, config = {}) {
  return toast(message, { ...DEFAULT_TOAST_CONFIG, ...config })
}

export function renderErrorToast (message, config = {}) {
  return toast.error(message, { ...DEFAULT_TOAST_CONFIG, ...config })
}