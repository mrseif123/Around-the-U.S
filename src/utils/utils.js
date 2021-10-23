export default function renderLoading(isLoading, button) {
  button.textContent = isLoading ? "Saving..." : "Save"
}