export const PRODUCT_TYPES = {
  PRAYER_CARD: 'PRAYER_CARD',
  BOOKMARK: 'BOOKMARK',
  MEMORIAL_HEART: 'MEMORIAL_HEART'
};

export const templatesConfig = {
  [PRODUCT_TYPES.PRAYER_CARD]: {
    label: 'Prayer Card',
    widthPx: 750,
    heightPx: 1200,
    bleedWidthPx: 788,
    bleedHeightPx: 1238,
    templates: [
      //template 1
      {
        id: '1',
        label: 'Template 1 - Full Info',
        front: {
          elements: {
            photo: {
              x: 88,
              y: 133,
              width: 575,
              height: 635,
              borderRadius: '50%',
              hasPhoto: true,
            },
            name: {
              x: 75,
              y: 940,
              width: 600,
              height: 0,
              hasText: true,
            },
            dates: {
              x: 55,
              y: 1025,
              width: 645,
              height: 0,
              hasText: true,
            },
          },
        },
        back: {
          elements: {
            proverb: {
              x: 105,
              y: 150,
              width: 540,
              height: 900,
              hasText: true,
            },
          },
        },
      },
      //template 2
      {
        id: '2',
        label: 'Template 2 - Full Info',
        front: {
          elements: {
            name: {
              x: 75,
              y: 925,
              width: 600,
              height: 0,
              hasText: true,
            },
            dates: {
              x: 75,
              y: 1005,
              width: 645,
              height: 0,
              hasText: true,
            },
          },
        },
        back: {
          elements: {
            proverb: {
              x: 105,
              y: 150,
              width: 540,
              height: 900,
              hasText: true,
            },
          },
        },
      },
      //template 3
      {
        id: '3',
        label: 'Template 3 - Full Info',
        front: {
          elements: {
            photo: {
              x: 88,
              y: 133,
              width: 575,
              height: 635,
              borderRadius: '50%',
              hasPhoto: true,
            },
            name: {
              x: 75,
              y: 900,
              width: 600,
              height: 0,
              hasText: true,
            },
            dates: {
              x: 55,
              y: 1025,
              width: 645,
              height: 0,
              hasText: true,
            },
          },
        },
        back: {
          elements: {
            proverb: {
              x: 105,
              y: 150,
              width: 540,
              height: 900,
              hasText: true,
            },
          },
        },
      },
      //template 4
      {
        id: '4',
        label: 'Template 4 - Full Info',
        front: {
          elements: {
            photo: {
              x: 88,
              y: 222,
              width: 575,
              height: 635,
              borderRadius: '50%',
              hasPhoto: true,
            },
            name: {
              x: 75,
              y: 1010,
              width: 600,
              height: 0,
              hasText: true,
            },
            dates: {
              x: 55,
              y: 1090,
              width: 645,
              height: 0,
              hasText: true,
            },
          },
        },
        back: {
          elements: {
            proverb: {
              x: 105,
              y: 150,
              width: 540,
              height: 900,
              hasText: true,
            },
          },
        },
      },
      //template 5
      {
        id: '5',
        label: 'Template 5 - Full Info',
        front: {
          elements: {
          },
        },
        back: {
          elements: {
          },
        },
      },
    ],
  },
  [PRODUCT_TYPES.BOOKMARK]: {
    label: 'Bookmark',
    widthPx: 675,
    heightPx: 2100,
    bleedWidthPx: 713,
    bleedHeightPx: 2138,
    templates: [
      //template 1
      {
        id: '1',
        label: 'Template 1 - Name, Dates, Photo',
        front: {
          elements: {
            photo: {
              x: 100,
              y: 193,
              width: 480,
              height: 580,
              borderRadius: '50%',
              hasPhoto: true,
            },
            name: {
              x: 50,
              y: 845,
              width: 570,
              height: 0,
              hasText: true,
            },
            dates: {
              x: 15,
              y: 930,
              width: 645,
              height: 0,
              hasText: true,
            },
          },
        },
        back: {
          elements: {
            proverb: {
              x: 100,
              y: 100,
              width: 480,
              height: 1875,
              hasText: true,
            },
          },
        },
      },
      //template 2
      {
        id: '2',
        label: 'Template 2 - Name, Dates',
        front: {
          elements: {
            name: {
              x: 50,
              y: 735,
              width: 570,
              height: 0,
              hasText: true,
            },
            dates: {
              x: 15,
              y: 820,
              width: 645,
              height: 0,
              hasText: true,
            },
          },
        },
        back: {
          elements: {
            proverb: {
              x: 100,
              y: 100,
              width: 480,
              height: 1875,
              hasText: true,
            },
          },
        },
      },
      //template 3
      {
        id: '3',
        label: 'Template 3 - Name, Dates, Photo',
        front: {
          elements: {
            photo: {
              x: 100,
              y: 100,
              width: 480,
              height: 580,
              borderRadius: '50%',
              hasPhoto: true,
            },
            name: {
              x: 50,
              y: 760,
              width: 570,
              height: 0,
              hasText: true,
            },
            dates: {
              x: 15,
              y: 846,
              width: 645,
              height: 0,
              hasText: true,
            },
          },
        },
        back: {
          elements: {
            proverb: {
              x: 100,
              y: 100,
              width: 480,
              height: 1875,
              hasText: true,
            },
          },
        },
      },
      //template 4
      {
        id: '4',
        label: 'Template 4 - Text Only',
        front: {
          elements: {
          },
        },
        back: {
          elements: {
          },
        },
      },
      //template 5
      {
        id: '5',
        label: 'Template 5 - Name, Dates',
        front: {
          elements: {
            name: {
              x: 40,
              y: 860,
              width: 595,
              height: 0,
              hasText: true,
            },
            dates: {
              x: 15,
              y: 945,
              width: 645,
              height: 0,
              hasText: true,
            },
          },
        },
        back: {
          elements: {
            proverb: {
              x: 100,
              y: 100,
              width: 480,
              height: 1875,
              hasText: true,
            },
          },
        },
      },
      //template 6
      {
        id: '6',
        label: 'Template 6 - Name, Dates, Photo',
        front: {
          elements: {
            photo: {
              x: 95,
              y: 31,
              width: 480,
              height: 580,
              borderRadius: '50%',
              hasPhoto: true,
            },
            name: {
              x: 50,
              y: 730,
              width: 570,
              height: 0,
              hasText: true,
            },
            dates: {
              x: 15,
              y: 815,
              width: 645,
              height: 0,
              hasText: true,
            },
          },
        },
        back: {
          elements: {
            proverb: {
              x: 100,
              y: 100,
              width: 480,
              height: 1875,
              hasText: true,
            },
          },
        },
      },
    ],
  },
  [PRODUCT_TYPES.MEMORIAL_HEART]: {
    label: 'Memorial Heart',
    widthPx: 900,
    heightPx: 825,
    bleedWidthPx: 938,
    bleedHeightPx: 863,
    templates: [
      //template 1
      {
        id: '1',
        label: 'Template 1 - Name, Dates, Photo',
        front: {
          elements: {
            photo: {
              x: 173,
              y: 170,
              width: 555,
              height: 555,
              borderRadius: '50%',
              hasPhoto: true,
            },
          },
        },
        back: {
          elements: {
            name: {
              x: 130,
              y: 275,
              width: 640,
              height: 0,
              hasText: true,
            },
            dates: {
              x: 140,
              y: 388,
              width: 620,
              height: 0,
              hasText: true,
            },
          },
        },
      },
      //template 2
      {
        id: '2',
        label: 'Template 2 - Name, Dates, Photo',
        front: {
          elements: {
            photo: {
              x: 170,
              y: 125,
              width: 555,
              height: 555,
              borderRadius: '50%',
              hasPhoto: true,
            },
          },
        },
        back: {
          elements: {
            name: {
              x: 130,
              y: 325,
              width: 640,
              height: 0,
              hasText: true,
            },
            dates: {
              x: 140,
              y: 428,
              width: 620,
              height: 0,
              hasText: true,
            },
          },
        },
      },
      //template 3
      {
        id: '3',
        label: 'Template 3 - Name, Dates',
        front: {
          elements: {
          },
        },
        back: {
          elements: {
            name: {
              x: 130,
              y: 325,
              width: 640,
              height: 0,
              hasText: true,
            },
            dates: {
              x: 140,
              y: 428,
              width: 620,
              height: 0,
              hasText: true,
            },
          },
        },
      },
      //template 4
      {
        id: '4',
        label: 'Template 4',
        front: {
          elements: {
          },
        },
        back: {
          elements: {
          },
        },
      },
    ],
  },
};