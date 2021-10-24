export default function renderLoading(isLoading, button, text_action, text) {
  button.textContent = isLoading ? text_action : text
}