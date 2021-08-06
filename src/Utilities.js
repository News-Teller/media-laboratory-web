function copyToClipboard(text) {
  if (!navigator) return;
  navigator.clipboard.writeText(text);
}

export {copyToClipboard};
