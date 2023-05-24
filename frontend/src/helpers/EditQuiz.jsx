// validates an youtube url to be in the correct format
export default function checkURL (url) {
  const regexPattern = /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
  return (regexPattern.test(url));
}
