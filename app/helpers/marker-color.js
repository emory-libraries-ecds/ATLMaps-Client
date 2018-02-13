import { helper } from '@ember/component/helper';
/* global L */

const isFastBoot = typeof FastBoot !== 'undefined';

export const markerColor = isFastBoot ? function() {} : function markerColor(_, point) {
  return L.divIcon(
    {
      html: `<div class='shadow'></div><i style='color: ${point.hexColor};' class='fa fa-map-marker'></i>`,

    }
  );
};

export default helper(markerColor);
