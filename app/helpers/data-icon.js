import { helper } from '@ember/component/helper';

export function dataIcon(params) {
  if (params[0] === 'point') {
    return `<i style="color: ${params[1]};" class="fa fa-map-marker"></i>`;
  } else if (params[0] === 'line-string' || params[0] === 'multi-line-string') {
    return `<i style="color: ${params[1]};" class="layer-list-item-icon line-string"></i>`
  } else {
    return `<i style="color: ${params[1]};" class="layer-list-item-icon polygon"></i>`
  }
}

export default helper(dataIcon);
