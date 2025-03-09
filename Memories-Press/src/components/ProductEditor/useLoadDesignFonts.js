import { useEffect } from 'react';
import WebFont from 'webfontloader';

export function useLoadDesignFonts(selectedDesign) {
  useEffect(() => {
    if (selectedDesign) {
      const families = [];
      if (selectedDesign.font && selectedDesign.font.family) {
        families.push(selectedDesign.font.family);
      }
      if (selectedDesign.fontAlt && selectedDesign.fontAlt.family) {
        families.push(selectedDesign.fontAlt.family);
      }
      if (selectedDesign.prayerFont && selectedDesign.prayerFont.family) {
        families.push(selectedDesign.prayerFont.family);
      }
      if (selectedDesign.prayerFontAlt && selectedDesign.prayerFontAlt.family) {
        families.push(selectedDesign.prayerFontAlt.family);
      }
      if (families.length > 0) {
        WebFont.load({
          custom: {
            families,
            urls: ['./fonts/fonts.css']
          }
        });
      }
    }
  }, [selectedDesign]);
}