import { helper } from '@ember/component/helper';

export function dataTable(parms) {
  const keys = Object.keys(parms[0]);
  let rows = '';
  keys.forEach(function(k) {
    rows += `<tr><td>${k}</td><td>${parms[0][k]}</td></tr>`;
  });
  return rows;
}

export default helper(dataTable);
