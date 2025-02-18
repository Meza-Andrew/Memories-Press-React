export const PRODUCT_TYPES = {
  PRAYER_CARD: 'prayer_card',
  BOOKMARK: 'bookmark',
  MEMORIAL_HEART: 'memorial_heart'
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
        id: 'pc_template_1',
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
              x: 70,
              y: 900,
              width: 600,
              height: 40,
              hasText: true,
            },
            lastName: {
              x: 385,
              y: 900,
              width: 300,
              height: 40,
              font: { family: 'Arial', size: '22px', weight: 'normal', color: '#000' },
              hasText: true,
            },
            dob: {
              x: 70,
              y: 1015,
              width: 310,
              height: 30,
              font: { family: 'Georgia', size: '7px', weight: 'normal', color: '#444' },
              hasText: true,
            },
            dod: {
              x: 385,
              y: 1015,
              width: 310,
              height: 30,
              font: { family: 'Georgia', size: '7px', weight: 'normal', color: '#444' },
              hasText: true,
            },
          },
        },
        back: {
          elements: {
            proverb: {
              x: 105,
              y: 110,
              width: 540,
              height: 60,
              font: { family: 'Times New Roman', size: '11px', weight: 'normal', color: '#000', italic: true },
              fontAlt: { family: 'Times New Roman', size: '11px', weight: 'bold', color: '#000', italic: true },
              hasText: true,
            },
          },
        },
      },//template 1 reduced width back
      {
        id: 'pc_template_1_reducedWidthBack',
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
              x: 70,
              y: 900,
              width: 600,
              height: 40,
              hasText: true,
            },
            lastName: {
              x: 385,
              y: 900,
              width: 300,
              height: 40,
              font: { family: 'Arial', size: '22px', weight: 'normal', color: '#000' },
              hasText: true,
            },
            dob: {
              x: 70,
              y: 1015,
              width: 310,
              height: 30,
              font: { family: 'Georgia', size: '7px', weight: 'normal', color: '#444' },
              hasText: true,
            },
            dod: {
              x: 385,
              y: 1015,
              width: 310,
              height: 30,
              font: { family: 'Georgia', size: '7px', weight: 'normal', color: '#444' },
              hasText: true,
            },
          },
        },
        back: {
          elements: {
            proverb: {
              x: 105,
              y: 110,
              width: 540,
              height: 60,
              font: { family: 'Times New Roman', size: '11px', weight: 'normal', color: '#000', italic: true },
              fontAlt: { family: 'Times New Roman', size: '11px', weight: 'bold', color: '#000', italic: true },
              hasText: true,
            },
          },
        },
      },
      //template 1 font large
      {
        id: 'pc_template_1_fontLarge',
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
              x: 30,
              y: 860,
              width: 700,
              height: 40,
              hasText: true,
            },
            lastName: {
              x: 385,
              y: 900,
              width: 300,
              height: 40,
              font: { family: 'Arial', size: '22px', weight: 'normal', color: '#000' },
              hasText: true,
            },
            dob: {
              x: 70,
              y: 1015,
              width: 310,
              height: 30,
              font: { family: 'Georgia', size: '7px', weight: 'normal', color: '#444' },
              hasText: true,
            },
            dod: {
              x: 385,
              y: 1015,
              width: 310,
              height: 30,
              font: { family: 'Georgia', size: '7px', weight: 'normal', color: '#444' },
              hasText: true,
            },
          },
        },
        back: {
          elements: {
            proverb: {
              x: 105,
              y: 110,
              width: 540,
              height: 60,
              font: { family: 'Times New Roman', size: '11px', weight: 'normal', color: '#000', italic: true },
              fontAlt: { family: 'Times New Roman', size: '11px', weight: 'bold', color: '#000', italic: true },
              hasText: true,
            },
          },
        },
      },
      //template 1 w/ gold font
      {
        id: 'pc_template_1_fontGold',
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
              y: 900,
              width: 600,
              height: 40,
              hasText: true,
            },
            lastName: {
              x: 385,
              y: 900,
              width: 300,
              height: 40,
              font: { family: 'Arial', size: '22px', weight: 'normal', color: '#000' },
              hasText: true,
            },
            dob: {
              x: 70,
              y: 1015,
              width: 310,
              height: 30,
              font: { family: 'Georgia', size: '7px', weight: 'normal', color: '#000' },
              hasText: true,
            },
            dod: {
              x: 385,
              y: 1015,
              width: 310,
              height: 30,
              font: { family: 'Georgia', size: '7px', weight: 'normal', color: '#000' },
              hasText: true,
            },
          },
        },
        back: {
          elements: {
            proverb: {
              x: 105,
              y: 110,
              width: 540,
              height: 60,
              font: { family: 'Times New Roman', size: '11px', weight: 'normal', color: '#000', italic: true },
              fontAlt: { family: 'Times New Roman', size: '11px', weight: 'bold', color: '#000', italic: true },
              hasText: true,
            },
          },
        },
      },
      //template 1 w/ white font
      {
        id: 'pc_template_1_fontWhite',
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
              x: 70,
              y: 900,
              width: 600,
              height: 40,
              hasText: true,
            },
            lastName: {
              x: 385,
              y: 900,
              width: 300,
              height: 40,
              font: { family: 'Arial', size: '22px', weight: 'normal', color: '#000' },
              hasText: true,
            },
            dob: {
              x: 70,
              y: 1015,
              width: 310,
              height: 30,
              font: { family: 'Georgia', size: '7px', weight: 'normal', color: '#fff' },
              hasText: true,
            },
            dod: {
              x: 385,
              y: 1015,
              width: 310,
              height: 30,
              font: { family: 'Georgia', size: '7px', weight: 'normal', color: '#fff' },
              hasText: true,
            },
          },
        },
        back: {
          elements: {
            proverb: {
              x: 105,
              y: 110,
              width: 540,
              height: 60,
              font: { family: 'Times New Roman', size: '11px', weight: 'normal', color: '#000', italic: true },
              fontAlt: { family: 'Times New Roman', size: '11px', weight: 'bold', color: '#000', italic: true },
              hasText: true,
            },
          },
        },
      },
      //template 1 w/ white font front & back
      {
        id: 'pc_template_1_fontWhite_front&back',
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
              x: 70,
              y: 900,
              width: 600,
              height: 40,
              hasText: true,
            },
            lastName: {
              x: 385,
              y: 900,
              width: 300,
              height: 40,
              font: { family: 'Arial', size: '22px', weight: 'normal', color: '#000' },
              hasText: true,
            },
            dob: {
              x: 70,
              y: 1015,
              width: 310,
              height: 30,
              font: { family: 'Georgia', size: '7px', weight: 'normal', color: '#fff' },
              hasText: true,
            },
            dod: {
              x: 385,
              y: 1015,
              width: 310,
              height: 30,
              font: { family: 'Georgia', size: '7px', weight: 'normal', color: '#fff' },
              hasText: true,
            },
          },
        },
        back: {
          elements: {
            proverb: {
              x: 105,
              y: 110,
              width: 540,
              height: 60,
              font: { family: 'Times New Roman', size: '11px', weight: 'normal', color: '#fff', italic: true },
              fontAlt: { family: 'Times New Roman', size: '11px', weight: 'bold', color: '#fff', italic: true },
              hasText: true,
            },
          },
        },
      },
      //template 1 w/ blue font
      {
        id: 'pc_template_1_fontBlue',
        label: 'Template 1 - Full Info',
        front: {
          elements: {
            photo: {
              x: 80,
              y: 130,
              width: 585,
              height: 645,
              borderRadius: '50%',
              hasPhoto: true,
            },
            name: {
              x: 70,
              y: 900,
              width: 600,
              height: 40,
              hasText: true,
            },
            lastName: {
              x: 385,
              y: 900,
              width: 300,
              height: 40,
              font: { family: 'Arial', size: '22px', weight: 'normal', color: '#000' },
              hasText: true,
            },
            dob: {
              x: 70,
              y: 1015,
              width: 310,
              height: 30,
              font: { family: 'Georgia', size: '7px', weight: 'normal', color: '#000' },
              hasText: true,
            },
            dod: {
              x: 385,
              y: 1015,
              width: 310,
              height: 30,
              font: { family: 'Georgia', size: '7px', weight: 'normal', color: '#000' },
              hasText: true,
            },
          },
        },
        back: {
          elements: {
            proverb: {
              x: 105,
              y: 110,
              width: 540,
              height: 60,
              font: { family: 'Times New Roman', size: '11px', weight: 'normal', color: '#000', italic: true },
              fontAlt: { family: 'Times New Roman', size: '11px', weight: 'bold', color: '#000', italic: true },
              hasText: true,
            },
          },
        },
      },
      //template 2
      {
        id: 'pc_template_2',
        label: 'Template 2 - Full Info',
        front: {
          elements: {
            // photo: {
            //   x: 94,
            //   y: 231,
            //   width: 560,
            //   height: 620,
            //   borderRadius: '50%',
            //   hasPhoto: true,
            // },
            name: {
              x: 75,
              y: 870,
              width: 600,
              height: 40,
              hasText: true,
            },
            lastName: {
              x: 385,
              y: 900,
              width: 300,
              height: 40,
              font: { family: 'Arial', size: '22px', weight: 'normal', color: '#000' },
              hasText: true,
            },
            dob: {
              x: 70,
              y: 985,
              width: 310,
              height: 30,
              font: { family: 'Georgia', size: '7px', weight: 'normal', color: '#444' },
              hasText: true,
            },
            dod: {
              x: 382,
              y: 985,
              width: 310,
              height: 30,
              font: { family: 'Georgia', size: '7px', weight: 'normal', color: '#444' },
              hasText: true,
            },
          },
        },
        back: {
          elements: {
            proverb: {
              x: 105,
              y: 110,
              width: 540,
              height: 60,
              font: { family: 'Times New Roman', size: '11px', weight: 'normal', color: '#000', italic: true },
              fontAlt: { family: 'Times New Roman', size: '11px', weight: 'bold', color: '#000', italic: true },
              hasText: true,
            },
          },
        },
      },
      //template 3
      {
        id: 'pc_template_3',
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
              x: 70,
              y: 900,
              width: 600,
              height: 40,
              hasText: true,
            },
            lastName: {
              x: 385,
              y: 900,
              width: 300,
              height: 40,
              font: { family: 'Arial', size: '22px', weight: 'normal', color: '#000' },
              hasText: true,
            },
            dob: {
              x: 70,
              y: 1025,
              width: 310,
              height: 30,
              font: { family: 'Georgia', size: '7px', weight: 'normal', color: '#444' },
              hasText: true,
            },
            dod: {
              x: 385,
              y: 1025,
              width: 310,
              height: 30,
              font: { family: 'Georgia', size: '7px', weight: 'normal', color: '#444' },
              hasText: true,
            },
          },
        },
        back: {
          elements: {
            proverb: {
              x: 105,
              y: 110,
              width: 540,
              height: 60,
              font: { family: 'Times New Roman', size: '11px', weight: 'normal', color: '#000', italic: true },
              fontAlt: { family: 'Times New Roman', size: '11px', weight: 'bold', color: '#000', italic: true },
              hasText: true,
            },
          },
        },
      },
      //template 4
      {
        id: 'pc_template_4',
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
              x: 70,
              y: 965,
              width: 600,
              height: 40,
              hasText: true,
            },
            lastName: {
              x: 385,
              y: 900,
              width: 300,
              height: 40,
              font: { family: 'Arial', size: '22px', weight: 'normal', color: '#000' },
              hasText: true,
            },
            dob: {
              x: 70,
              y: 1075,
              width: 310,
              height: 30,
              font: { family: 'Georgia', size: '7px', weight: 'normal', color: '#444' },
              hasText: true,
            },
            dod: {
              x: 385,
              y: 1075,
              width: 310,
              height: 30,
              font: { family: 'Georgia', size: '7px', weight: 'normal', color: '#444' },
              hasText: true,
            },
          },
        },
        back: {
          elements: {
            proverb: {
              x: 105,
              y: 110,
              width: 540,
              height: 60,
              font: { family: 'Times New Roman', size: '11px', weight: 'normal', color: '#000', italic: true },
              fontAlt: { family: 'Times New Roman', size: '11px', weight: 'bold', color: '#000', italic: true },
              hasText: true,
            },
          },
        },
      },
      //template 4 w/ white font
      {
        id: 'pc_template_4_fontWhite_backFontBlack',
        label: 'Template 1 - Full Info',
        front: {
          elements: {
            photo: {
              x: 95,
              y: 230,
              width: 560,
              height: 620,
              borderRadius: '50%',
              hasPhoto: true,
            },
            name: {
              x: 70,
              y: 970,
              width: 600,
              height: 40,
              hasText: true,
            },
            lastName: {
              x: 390,
              y: 890,
              width: 170,
              height: 40,
              font: { family: 'Arial', size: '64px', weight: 'normal', color: '#fff' },
              hasText: true,
            },
            dob: {
              x: 70,
              y: 1087,
              width: 310,
              height: 30,
              font: { family: 'Georgia', size: '7px', weight: 'normal', color: '#fff' },
              hasText: true,
            },
            dod: {
              x: 385,
              y: 1087,
              width: 310,
              height: 30,
              font: { family: 'Georgia', size: '7px', weight: 'normal', color: '#fff' },
              hasText: true,
            },
          },
        },
        back: {
          elements: {
            proverb: {
              x: 105,
              y: 110,
              width: 540,
              height: 60,
              font: { family: 'Times New Roman', size: '11px', weight: 'normal', color: '#000', italic: true },
              fontAlt: { family: 'Times New Roman', size: '11px', weight: 'bold', color: '#000', italic: true },
              hasText: true,
            },
          },
        },
      },
      //template 5
      {
        id: 'pc_template_5',
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
        id: 'bm_template_1',
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
              y: 815,
              width: 570,
              height: 60,
              font: { family: 'Arial', size: '22px', weight: 'bold', color: '#222', italic: true },
              hasText: true,
            },
            lastName: {
              x: 280,
              y: 790,
              width: 260,
              height: 60,
              font: { family: 'Arial', size: '22px', weight: 'bold', color: '#222', italic: true },
              hasText: true,
            },
            dob: {
              x: -60,
              y: 930,
              width: 400,
              height: 30,
              font: { family: 'Georgia', size: '7px', weight: 'normal', color: '#000', },
              hasText: true,
            },
            dod: {
              x: 350,
              y: 930,
              width: 400,
              height: 30,
              font: { family: 'Georgia', size: '7px', weight: 'normal', color: '#000' },
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
              height: 80,
              font: { family: 'Times New Roman', size: '11px', weight: 'normal', color: '#000', italic: true },
              fontAlt: { family: 'Times New Roman', size: '11px', weight: 'bold', color: '#000', italic: true },
              hasText: true,
            },
          },
        },
      },
      //template 1 no pic
      {
        id: 'bm_template_1_noPic',
        label: 'Template 1 - Name, Dates, Photo',
        front: {
          elements: {
            // photo: {
            //   x: 100,
            //   y: 193,
            //   width: 480,
            //   height: 580,
            //   borderRadius: '50%',
            //   hasPhoto: true,
            // },
            name: {
              x: 40,
              y: 815,
              width: 595,
              height: 60,
              font: { family: 'Arial', size: '22px', weight: 'bold', color: '#222', italic: true },
              hasText: true,
            },
            lastName: {
              x: 280,
              y: 790,
              width: 260,
              height: 60,
              font: { family: 'Arial', size: '22px', weight: 'bold', color: '#222', italic: true },
              hasText: true,
            },
            dob: {
              x: -60,
              y: 930,
              width: 400,
              height: 30,
              font: { family: 'Georgia', size: '7px', weight: 'normal', color: '#000', },
              hasText: true,
            },
            dod: {
              x: 350,
              y: 930,
              width: 400,
              height: 30,
              font: { family: 'Georgia', size: '7px', weight: 'normal', color: '#000' },
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
              height: 80,
              font: { family: 'Times New Roman', size: '11px', weight: 'normal', color: '#000', italic: true },
              fontAlt: { family: 'Times New Roman', size: '11px', weight: 'bold', color: '#000', italic: true },
              hasText: true,
            },
          },
        },
      },
      //template 1 font white
      {
        id: 'bm_template_1_fontWhite',
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
              y: 815,
              width: 570,
              height: 60,
              font: { family: 'Arial', size: '22px', weight: 'bold', color: '#222', italic: true },
              hasText: true,
            },
            lastName: {
              x: 280,
              y: 790,
              width: 260,
              height: 60,
              font: { family: 'Arial', size: '22px', weight: 'bold', color: '#222', italic: true },
              hasText: true,
            },
            dob: {
              x: -60,
              y: 930,
              width: 400,
              height: 30,
              font: { family: 'Georgia', size: '7px', weight: 'normal', color: '#fff', },
              hasText: true,
            },
            dod: {
              x: 350,
              y: 930,
              width: 400,
              height: 30,
              font: { family: 'Georgia', size: '7px', weight: 'normal', color: '#fff' },
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
              height: 80,
              font: { family: 'Times New Roman', size: '11px', weight: 'normal', color: '#000', italic: true },
              fontAlt: { family: 'Times New Roman', size: '11px', weight: 'bold', color: '#000', italic: true },
              hasText: true,
            },
          },
        },
      },
      //template 1 font white front and back
      {
        id: 'bm_template_1_fontWhiteFrontBack',
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
              y: 815,
              width: 570,
              height: 60,
              font: { family: 'Arial', size: '22px', weight: 'bold', color: '#222', italic: true },
              hasText: true,
            },
            lastName: {
              x: 280,
              y: 790,
              width: 260,
              height: 60,
              font: { family: 'Arial', size: '22px', weight: 'bold', color: '#222', italic: true },
              hasText: true,
            },
            dob: {
              x: -60,
              y: 930,
              width: 400,
              height: 30,
              font: { family: 'Georgia', size: '7px', weight: 'normal', color: '#fff', },
              hasText: true,
            },
            dod: {
              x: 350,
              y: 930,
              width: 400,
              height: 30,
              font: { family: 'Georgia', size: '7px', weight: 'normal', color: '#fff' },
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
              height: 80,
              font: { family: 'Times New Roman', size: '11px', weight: 'normal', color: '#fff', italic: true },
              fontAlt: { family: 'Times New Roman', size: '11px', weight: 'bold', color: '#fff', italic: true },
              hasText: true,
            },
          },
        },
      },
      //template 1 font gold
      {
        id: 'bm_template_1_fontGold',
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
              y: 815,
              width: 570,
              height: 60,
              font: { family: 'Arial', size: '22px', weight: 'bold', color: '#222', italic: true },
              hasText: true,
            },
            lastName: {
              x: 280,
              y: 790,
              width: 260,
              height: 60,
              font: { family: 'Arial', size: '22px', weight: 'bold', color: '#222', italic: true },
              hasText: true,
            },
            dob: {
              x: -60,
              y: 930,
              width: 400,
              height: 30,
              font: { family: 'Georgia', size: '7px', weight: 'normal', color: 'gold', },
              hasText: true,
            },
            dod: {
              x: 350,
              y: 930,
              width: 400,
              height: 30,
              font: { family: 'Georgia', size: '7px', weight: 'normal', color: 'gold' },
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
              height: 80,
              font: { family: 'Times New Roman', size: '11px', weight: 'normal', color: '#000', italic: true },
              fontAlt: { family: 'Times New Roman', size: '11px', weight: 'bold', color: '#000', italic: true },
              hasText: true,
            },
          },
        },
      },
      //template 2
      {
        id: 'bm_template_2',
        label: 'Template 1 - Name, Dates, Photo',
        front: {
          elements: {
            // photo: {
            //   x: 100,
            //   y: 100,
            //   width: 480,
            //   height: 580,
            //   borderRadius: '50%',
            //   hasPhoto: true,
            // },
            name: {
              x: 50,
              y: 690,
              width: 570,
              height: 60,
              hasText: true,
            },
            lastName: {
              x: 280,
              y: 790,
              width: 260,
              height: 60,
              font: { family: 'Arial', size: '22px', weight: 'bold', color: '#222', italic: true },
              hasText: true,
            },
            dob: {
              x: -60,
              y: 805,
              width: 400,
              height: 30,
              font: { family: 'Georgia', size: '7px', weight: 'normal', color: '#000', },
              hasText: true,
            },
            dod: {
              x: 350,
              y: 805,
              width: 400,
              height: 30,
              font: { family: 'Georgia', size: '7px', weight: 'normal', color: '#000' },
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
              height: 80,
              font: { family: 'Times New Roman', size: '11px', weight: 'normal', color: '#000', italic: true },
              fontAlt: { family: 'Times New Roman', size: '11px', weight: 'bold', color: '#000', italic: true },
              hasText: true,
            },
          },
        },
      },
      //template 2 no pic white font
      {
        id: 'bm_template_2_fontWhite',
        label: 'Template 1 - Name, Dates, Photo',
        front: {
          elements: {
            // photo: {
            //   x: 100,
            //   y: 100,
            //   width: 480,
            //   height: 580,
            //   borderRadius: '50%',
            //   hasPhoto: true,
            // },
            name: {
              x: 50,
              y: 690,
              width: 570,
              height: 60,
              hasText: true,
            },
            lastName: {
              x: 280,
              y: 790,
              width: 260,
              height: 60,
              font: { family: 'Arial', size: '22px', weight: 'bold', color: '#222', italic: true },
              hasText: true,
            },
            dob: {
              x: -60,
              y: 805,
              width: 400,
              height: 30,
              font: { family: 'Georgia', size: '7px', weight: 'normal', color: '#fff', },
              hasText: true,
            },
            dod: {
              x: 350,
              y: 805,
              width: 400,
              height: 30,
              font: { family: 'Georgia', size: '7px', weight: 'normal', color: '#fff' },
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
              height: 80,
              font: { family: 'Times New Roman', size: '11px', weight: 'normal', color: '#000', italic: true },
              fontAlt: { family: 'Times New Roman', size: '11px', weight: 'bold', color: '#000', italic: true },
              hasText: true,
            },
          },
        },
      },
      //template 3
      {
        id: 'bm_template_3',
        label: 'Template 1 - Name, Dates, Photo',
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
              y: 730,
              width: 570,
              height: 90,
              hasText: true,
            },
            lastName: {
              x: 280,
              y: 790,
              width: 260,
              height: 60,
              font: { family: 'Arial', size: '22px', weight: 'bold', color: '#222', italic: true },
              hasText: true,
            },
            dob: {
              x: -60,
              y: 846,
              width: 400,
              height: 30,
              font: { family: 'Georgia', size: '7px', weight: 'normal', color: '#000', },
              hasText: true,
            },
            dod: {
              x: 350,
              y: 846,
              width: 400,
              height: 30,
              font: { family: 'Georgia', size: '7px', weight: 'normal', color: '#000' },
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
              height: 80,
              font: { family: 'Times New Roman', size: '11px', weight: 'normal', color: '#000', italic: true },
              fontAlt: { family: 'Times New Roman', size: '11px', weight: 'bold', color: '#000', italic: true },
              hasText: true,
            },
          },
        },
      },
      //template 3 white font
      {
        id: 'bm_template_3_fontWhite',
        label: 'Template 1 - Name, Dates, Photo',
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
              y: 730,
              width: 570,
              height: 90,
              hasText: true,
            },
            lastName: {
              x: 280,
              y: 790,
              width: 260,
              height: 60,
              font: { family: 'Arial', size: '22px', weight: 'bold', color: '#222', italic: true },
              hasText: true,
            },
            dob: {
              x: -60,
              y: 846,
              width: 400,
              height: 30,
              font: { family: 'Georgia', size: '7px', weight: 'normal', color: '#fff', },
              hasText: true,
            },
            dod: {
              x: 350,
              y: 846,
              width: 400,
              height: 30,
              font: { family: 'Georgia', size: '7px', weight: 'normal', color: '#fff' },
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
              height: 80,
              font: { family: 'Times New Roman', size: '11px', weight: 'normal', color: '#000', italic: true },
              fontAlt: { family: 'Times New Roman', size: '11px', weight: 'bold', color: '#000', italic: true },
              hasText: true,
            },
          },
        },
      },
      //template 3 large font
      {
        id: 'bm_template_3_fontLarge',
        label: 'Template 1 - Name, Dates, Photo',
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
              x: 45,
              y: 705,
              width: 580,
              height: 90,
              hasText: true,
            },
            lastName: {
              x: 280,
              y: 790,
              width: 260,
              height: 60,
              font: { family: 'Arial', size: '22px', weight: 'bold', color: '#222', italic: true },
              hasText: true,
            },
            dob: {
              x: -60,
              y: 846,
              width: 400,
              height: 30,
              font: { family: 'Georgia', size: '7px', weight: 'normal', color: '#000', },
              hasText: true,
            },
            dod: {
              x: 350,
              y: 846,
              width: 400,
              height: 30,
              font: { family: 'Georgia', size: '7px', weight: 'normal', color: '#000' },
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
              height: 80,
              font: { family: 'Times New Roman', size: '11px', weight: 'normal', color: '#000', italic: true },
              fontAlt: { family: 'Times New Roman', size: '11px', weight: 'bold', color: '#000', italic: true },
              hasText: true,
            },
          },
        },
      },
      //template 3 no pic
      {
        id: 'bm_template_3_noPic',
        label: 'Template 1 - Name, Dates, Photo',
        front: {
          elements: {
            // photo: {
            //   x: 100,
            //   y: 100,
            //   width: 480,
            //   height: 580,
            //   borderRadius: '50%',
            //   hasPhoto: true,
            // },
            name: {
              x: 50,
              y: 730,
              width: 570,
              height: 60,
              hasText: true,
            },
            lastName: {
              x: 280,
              y: 790,
              width: 260,
              height: 60,
              font: { family: 'Arial', size: '22px', weight: 'bold', color: '#222', italic: true },
              hasText: true,
            },
            dob: {
              x: -60,
              y: 846,
              width: 400,
              height: 30,
              font: { family: 'Georgia', size: '7px', weight: 'normal', color: '#000', },
              hasText: true,
            },
            dod: {
              x: 350,
              y: 846,
              width: 400,
              height: 30,
              font: { family: 'Georgia', size: '7px', weight: 'normal', color: '#000' },
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
              height: 80,
              font: { family: 'Times New Roman', size: '11px', weight: 'normal', color: '#000', italic: true },
              fontAlt: { family: 'Times New Roman', size: '11px', weight: 'bold', color: '#000', italic: true },
              hasText: true,
            },
          },
        },
      },
      //template 4
      {
        id: 'bm_template_4',
        label: 'Template 2 - Text Only',
        front: {
          elements: {
            // name: {
            //   x: 100,
            //   y: 300,
            //   width: 480,
            //   height: 40,
            //   font: { family: 'Helvetica', size: '20px', color: '#111' },
            //   hasText: true,
            // },
            // proverb: {
            //   x: 100,
            //   y: 400,
            //   width: 480,
            //   height: 100,
            //   font: { family: 'Helvetica', size: '18px', color: '#444', italic: false },
            //   hasText: true,
            // },
          },
        },
        back: {
          elements: {
            // note: {
            //   x: 90,
            //   y: 250,
            //   width: 500,
            //   height: 200,
            //   font: { family: 'Arial', size: '16px', color: '#000' },
            //   hasText: true,
            // },
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
        id: 'mh_template_1',
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
              x: 54,
              y: 388,
              width: 400,
              height: 30,
              font: { family: 'Georgia', size: '7px', weight: 'normal', color: '#000', },
              hasText: true,
            },
            dod: {
              x: 461,
              y: 388,
              width: 400,
              height: 30,
              font: { family: 'Georgia', size: '7px', weight: 'normal', color: '#000' },
              hasText: true,
            },
          },
        },
      },
      //template 1 font white
      {
        id: 'mh_template_1_fontWhite',
        label: 'Template 1 - Name, Dates, Photo',
        front: {
          elements: {
            photo: {
              x: 170,
              y: 185,
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
              x: 54,
              y: 388,
              width: 400,
              height: 30,
              font: { family: 'Georgia', size: '7px', weight: 'normal', color: '#fff', },
              hasText: true,
            },
            dod: {
              x: 461,
              y: 388,
              width: 400,
              height: 30,
              font: { family: 'Georgia', size: '7px', weight: 'normal', color: '#fff' },
              hasText: true,
            },
          },
        },
      },
      //template 1 font blue
      {
        id: 'mh_template_1_fontBlue',
        label: 'Template 1 - Name, Dates, Photo',
        front: {
          elements: {
            photo: {
              x: 170,
              y: 185,
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
              x: 54,
              y: 388,
              width: 400,
              height: 30,
              font: { family: 'Georgia', size: '7px', weight: 'normal', color: '#080164', },
              hasText: true,
            },
            dod: {
              x: 461,
              y: 388,
              width: 400,
              height: 30,
              font: { family: 'Georgia', size: '7px', weight: 'normal', color: '#080164' },
              hasText: true,
            },
          },
        },
      },
      //template 1 font gold
      {
        id: 'mh_template_1_fontGold',
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
              x: 54,
              y: 388,
              width: 400,
              height: 30,
              font: { family: 'Georgia', size: '7px', weight: 'normal', color: 'gold', },
              hasText: true,
            },
            dod: {
              x: 461,
              y: 388,
              width: 400,
              height: 30,
              font: { family: 'Georgia', size: '7px', weight: 'normal', color: 'gold' },
              hasText: true,
            },
          },
        },
      },
      //template 2
      {
        id: 'mh_template_2',
        label: 'Template 1 - Name, Dates, Photo',
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
              y: 278,
              width: 640,
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
              x: 54,
              y: 398,
              width: 400,
              height: 30,
              font: { family: 'Georgia', size: '7px', weight: 'normal', color: '#000', },
              hasText: true,
            },
            dod: {
              x: 461,
              y: 398,
              width: 400,
              height: 30,
              font: { family: 'Georgia', size: '7px', weight: 'normal', color: '#000' },
              hasText: true,
            },
          },
        },
      },
      //template 2 font white
      {
        id: 'mh_template_2_fontWhite',
        label: 'Template 1 - Name, Dates, Photo',
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
              y: 278,
              width: 640,
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
              x: 54,
              y: 398,
              width: 400,
              height: 30,
              font: { family: 'Georgia', size: '7px', weight: 'normal', color: '#fff', },
              hasText: true,
            },
            dod: {
              x: 461,
              y: 398,
              width: 400,
              height: 30,
              font: { family: 'Georgia', size: '7px', weight: 'normal', color: '#fff' },
              hasText: true,
            },
          },
        },
      },
      //template 2 no photo
      {
        id: 'mh_template_2_noPic',
        label: 'Template 1 - Name, Dates, Photo',
        front: {
          elements: {
            // photo: {
            //   x: 175,
            //   y: 170,
            //   width: 550,
            //   height: 550,
            //   borderRadius: '50%',
            //   hasPhoto: true,
            // },
          },
        },
        back: {
          elements: {
            name: {
              x: 130,
              y: 278,
              width: 640,
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
              x: 54,
              y: 398,
              width: 400,
              height: 30,
              font: { family: 'Georgia', size: '7px', weight: 'normal', color: '#000', },
              hasText: true,
            },
            dod: {
              x: 461,
              y: 398,
              width: 400,
              height: 30,
              font: { family: 'Georgia', size: '7px', weight: 'normal', color: '#000' },
              hasText: true,
            },
          },
        },
      },
      //template 3
      {
        id: 'mh_template_3',
        label: 'Template 1 - Name, Dates, Photo',
        front: {
          elements: {
            // photo: {
            //   x: 175,
            //   y: 127,
            //   width: 550,
            //   height: 550,
            //   borderRadius: '50%',
            //   hasPhoto: true,
            // },
          },
        },
        back: {
          elements: {
            // name: {
            //   x: 80,
            //   y: 790,
            //   width: 260,
            //   height: 60,
            //   font: { family: 'Arial', size: '44px', weight: 'bold', color: '#222', italic: true },
            //   hasText: true,
            // },
            // lastName: {
            //   x: 280,
            //   y: 790,
            //   width: 260,
            //   height: 60,
            //   font: { family: 'Arial', size: '44px', weight: 'bold', color: '#222', italic: true },
            //   hasText: true,
            // },
            // dob: {
            //   x: 125,
            //   y: 710,
            //   width: 400,
            //   height: 30,
            //   font: { family: 'Georgia', size: '18px', weight: 'normal', color: '#555', },
            //   hasText: true,
            // },
            // dod: {
            //   x: 125,
            //   y: 750,
            //   width: 400,
            //   height: 30,
            //   font: { family: 'Georgia', size: '18px', weight: 'normal', color: '#555' },
            //   hasText: true,
            // },
          },
        },
      },
    ],
  },
};