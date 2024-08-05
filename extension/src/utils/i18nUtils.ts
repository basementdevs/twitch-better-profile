export const t = (key: string): string => {
  return chrome.i18n.getMessage(key) || key
}
