export function evalTemplate(template, data) {
  return Object.entries(data || {}).reduce((acc, [key, val]) => {
    return acc.split(`{{ ${key} }}`).join(val);
  }, template);
}
