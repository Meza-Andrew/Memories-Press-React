export const PRODUCT_TYPES = {
  PRAYER_CARD: 'prayer_card',
  BOOKMARK: 'bookmark',
};

export const templatesConfig = {
  [PRODUCT_TYPES.PRAYER_CARD]: {
    label: 'Prayer Card',
    widthPx: 750,
    heightPx: 1200,
    bleedWidthPx: 780,   // Adjust later @Elias
    bleedHeightPx: 1230, // Adjust later @Elias
    templates: [
      {
        id: 'pc_template_1',
        label: 'Template 1 - Full Info',
        front: {
          backgroundImage: '/images/prayercard_template1_front.png',
          elements: {
            photo: {
              x: 225,
              y: 80,
              width: 300,
              height: 300,
              borderRadius: '50%',
              hasPhoto: true,
            },
            name: {
              x: 200,
              y: 400,
              width: 350,
              height: 40,
              font: { family: 'Arial', size: '24px', weight: 'bold', color: '#000' },
              hasText: true,
            },
            middleName: {
              x: 200,
              y: 450,
              width: 350,
              height: 40,
              font: { family: 'Arial', size: '20px', weight: 'normal', color: '#222' },
              hasText: true,
            },
            lastName: {
              x: 200,
              y: 500,
              width: 350,
              height: 40,
              font: { family: 'Arial', size: '24px', weight: 'bold', color: '#000' },
              hasText: true,
            },
            dob: {
              x: 200,
              y: 560,
              width: 350,
              height: 30,
              font: { family: 'Georgia', size: '16px', weight: 'normal', color: '#444' },
              hasText: true,
            },
            dod: {
              x: 200,
              y: 600,
              width: 350,
              height: 30,
              font: { family: 'Georgia', size: '16px', weight: 'normal', color: '#444' },
              hasText: true,
            },
            proverb: {
              x: 180,
              y: 680,
              width: 400,
              height: 60,
              font: { family: 'Times New Roman', size: '16px', weight: 'normal', color: '#555', italic: true },
              hasText: true,
            },
          },
        },
        back: {
          backgroundImage: '/images/prayercard_template1_back.png',
          elements: {
            note: {
              x: 100,
              y: 100,
              width: 550,
              height: 400,
              font: { family: 'Arial', size: '16px', color: '#000' },
              hasText: true,
            },
          },
        },
      },
      {
        id: 'pc_template_2',
        label: 'Template 2 - Name and Photo only',
        front: {
          backgroundImage: '/images/prayercard_template2_front.png',
          elements: {
            photo: {
              x: 225,
              y: 100,
              width: 300,
              height: 300,
              borderRadius: '0%',
              hasPhoto: true,
            },
            name: {
              x: 200,
              y: 450,
              width: 350,
              height: 40,
              font: { family: 'Arial', size: '24px', color: '#000' },
              hasText: true,
            },
          },
        },
        back: {
          backgroundImage: '/images/prayercard_template2_back.png',
          elements: {
            note: {
              x: 100,
              y: 120,
              width: 550,
              height: 400,
              font: { family: 'Arial', size: '16px', color: '#000' },
              hasText: true,
            },
          },
        },
      },
    ],
  },

  [PRODUCT_TYPES.BOOKMARK]: {
    label: 'Bookmark',
    widthPx: 675,
    heightPx: 2100,
    bleedWidthPx: 705,
    bleedHeightPx: 2130,
    templates: [
      {
        id: 'bm_template_1',
        label: 'Template 1 - Name, Dates, Photo',
        front: {
          backgroundImage: '/images/bookmark_template1_front.png',
          elements: {
            photo: {
              x: 86,
              y: 200,
              width: 504,
              height: 504,
              borderRadius: '50%',
              hasPhoto: true,
            },
            name: {
              x: 80,
              y: 790,
              width: 260,
              height: 60,
              font: { family: 'Arial', size: '44px', weight: 'bold', color: '#222', italic: true },
              hasText: true,
            },
            lastName: {
              x: 280,
              y: 790,
              width: 260,
              height: 60,
              font: { family: 'Arial', size: '44px', weight: 'bold', color: '#222', italic: true },
              hasText: true,
            },
            dob: {
              x: 125,
              y: 710,
              width: 400,
              height: 30,
              font: { family: 'Georgia', size: '18px', weight: 'normal', color: '#555', },
              hasText: true,
            },
            dod: {
              x: 125,
              y: 750,
              width: 400,
              height: 30,
              font: { family: 'Georgia', size: '18px', weight: 'normal', color: '#555' },
              hasText: true,
            },
          },
        },
        back: {
          backgroundImage: '/images/bookmark_template1_back.png',
          elements: {
            proverb: {
              x: 100,
              y: 300,
              width: 480,
              height: 80,
              font: { family: 'Times New Roman', size: '28px', color: '#333', italic: true },
              hasText: true,
            },
          },
        },
      },
      {
        id: 'bm_template_2',
        label: 'Template 2 - Text Only',
        front: {
          backgroundImage: '/images/bookmark_template2_front.png',
          elements: {
            name: {
              x: 100,
              y: 300,
              width: 480,
              height: 40,
              font: { family: 'Helvetica', size: '20px', color: '#111' },
              hasText: true,
            },
            proverb: {
              x: 100,
              y: 400,
              width: 480,
              height: 100,
              font: { family: 'Helvetica', size: '18px', color: '#444', italic: false },
              hasText: true,
            },
          },
        },
        back: {
          backgroundImage: '/images/bookmark_template2_back.png',
          elements: {
            note: {
              x: 90,
              y: 250,
              width: 500,
              height: 200,
              font: { family: 'Arial', size: '16px', color: '#000' },
              hasText: true,
            },
          },
        },
      },
    ],
  },
};