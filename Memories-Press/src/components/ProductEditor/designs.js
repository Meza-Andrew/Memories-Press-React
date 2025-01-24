// designs.js

import { PRODUCT_TYPES } from './templatesConfig.js';

export const designs = [
  // --- 4 Prayer Card Designs ---
  {
    id: 'prayercard_design1',
    productType: PRODUCT_TYPES.PRAYER_CARD,
    templateId: 'pc_template_1',
    frontImage: './templates/prayer_cards/Pink_Floral_front.png',
    backImage: './templates/prayer_cards/Pink_Floral_back.png',
    label: 'Prayer Card Design 1',
  },
  {
    id: 'prayercard_design2',
    productType: PRODUCT_TYPES.PRAYER_CARD,
    templateId: 'pc_template_1',
    frontImage: './templates/prayer_cards/Baby_Toys_with_Pic_front.png',
    backImage: './templates/prayer_cards/Baby_Toys_with_Pic_back.png',
    label: 'Prayer Card Design 2',
  },
  {
    id: 'prayercard_design3',
    productType: PRODUCT_TYPES.PRAYER_CARD,
    templateId: 'pc_template_2',
    frontImage: './templates/prayer_cards/Navy_Velvet_and_Tan_Marble_front.png',
    backImage: './templates/prayer_cards/Navy_Velvet_and_Tan_Marble_back.png',
    label: 'Prayer Card Design 3',
  },
  {
    id: 'prayercard_design4',
    productType: PRODUCT_TYPES.PRAYER_CARD,
    templateId: 'pc_template_2',
    frontImage: './templates/prayer_cards/Pink_Rose_with_Tan_Marble_front.png',
    backImage: './templates/prayer_cards/Pink_Rose_with_Tan_Marble_back.png',
    label: 'Prayer Card Design 4',
  },

  // --- 4 Bookmark Designs ---
  {
    id: 'bookmark_design1',
    productType: PRODUCT_TYPES.BOOKMARK,
    templateId: 'bm_template_1',
    frontImage: './templates/bookmarks/design1_front.png',
    backImage: './templates/bookmarks/design1_back.png',
    label: 'Bookmark Design 1',
  },
  {
    id: 'bookmark_design2',
    productType: PRODUCT_TYPES.BOOKMARK,
    templateId: 'bm_template_1',
    frontImage: '/images/bookmark_design2_front.png',
    backImage: '/images/bookmark_design2_back.png',
    label: 'Bookmark Design 2',
  },
  {
    id: 'bookmark_design3',
    productType: PRODUCT_TYPES.BOOKMARK,
    templateId: 'bm_template_2',
    frontImage: '/images/bookmark_design3_front.png',
    backImage: '/images/bookmark_design3_back.png',
    label: 'Bookmark Design 3',
  },
  {
    id: 'bookmark_design4',
    productType: PRODUCT_TYPES.BOOKMARK,
    templateId: 'bm_template_2',
    frontImage: '/images/bookmark_design4_front.png',
    backImage: '/images/bookmark_design4_back.png',
    label: 'Bookmark Design 4',
  },
];