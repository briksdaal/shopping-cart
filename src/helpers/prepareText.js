export default function prepareText(text) {
  return text.replaceAll('.', '. ').replaceAll(/\s+/g, ' ');
}
