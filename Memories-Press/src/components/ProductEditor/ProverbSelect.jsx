import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { PRODUCT_TYPES } from './templatesConfig';

const proverbs = [
    {
      key: 'godHathNotPromised',
      title: 'God Hath Not Promised',
      prayerCard: { 
        text: `God hath not promised
  Skies always blue,
  Flower-strewn pathways
  All our lives through;
  God hath not promised
  Sun without rain,
  Joy without sorrow,
  Peace without pain.
  But God hath promised
  Strength for the day,
  Rest for the labor
  Light for the way.
  Grace for the trials,
  Help from above,
  Unfailing sympathy
  Undying love…`,
        fontSize: "13"
      },
      bookmark: { 
        text: `God hath not promised
  Skies always blue,
  Flower-strewn pathways
  All our lives through;
  God hath not promised
  Sun without rain,
  Joy without sorrow,
  Peace without pain.
  But God hath promised
  Strength for the day,
  Rest for the labor
  Light for the way.
  Grace for the trials,
  Help from above,
  Unfailing sympathy
  Undying love…`,
        fontSize: "14"
      },
      memorialHeart: { 
        text: `God hath not promised
  Skies always blue,
  Flower-strewn pathways
  All our lives through;
  God hath not promised
  Sun without rain,
  Joy without sorrow,
  Peace without pain.
  But God hath promised
  Strength for the day,
  Rest for the labor
  Light for the way.
  Grace for the trials,
  Help from above,
  Unfailing sympathy
  Undying love…`,
        fontSize: "20"
      },
    },
    {
      key: 'reflections',
      title: 'Reflections',
      prayerCard: { 
        text: `Early in the morning
  awakening the sun
  Again as dusk is moving in
  with night skies soon to come
  Familiar place is sought to touch
  the soul with solitude
  Reflecting on Life’s seasons
  with Heartfelt gratitude
  In midst of waters peaceful
  memories fill the mind
  Of laughter, love, and family
  forever ties the bind
  Through sorrow sometimes visits
  blessings come to rest
  Each time that we remember
  the times that we loved best`,
        fontSize: "10"
      },
      bookmark: { 
        text: `Early in the morning
  awakening the sun
  Again as dusk is moving in
  with night skies soon to come
  Familiar place is sought to touch
  the soul with solitude
  Reflecting on Life’s seasons
  with Heartfelt gratitude
  In midst of waters peaceful
  memories fill the mind
  Of laughter, love, and family
  forever ties the bind
  Through sorrow sometimes visits
  blessings come to rest
  Each time that we remember
  the times that we loved best`,
        fontSize: "13"
      },
      memorialHeart: { 
        text: `Early in the morning
  awakening the sun
  Again as dusk is moving in
  with night skies soon to come
  Familiar place is sought to touch
  the soul with solitude
  Reflecting on Life’s seasons
  with Heartfelt gratitude
  In midst of waters peaceful
  memories fill the mind
  Of laughter, love, and family
  forever ties the bind
  Through sorrow sometimes visits
  blessings come to rest
  Each time that we remember
  the times that we loved best`,
        fontSize: "20"
      },
    },
    {
      key: 'irishBlessing',
      title: 'Irish Blessing',
      prayerCard: { 
        text: `May the road rise to meet you.
  May the wind be always at your back.
  May the sun shine warm upon your face,
  and the rains fall soft upon your fields.
  Until we meet again,
  may God hold you in the palm of His hand.`,
        fontSize: "15"
      },
      bookmark: { 
        text: `May the road rise to meet you.
  May the wind be always at your back.
  May the sun shine warm upon your face,
  and the rains fall soft upon your fields.
  Until we meet again,
  may God hold you in the palm of His hand.`,
        fontSize: "19"
      },
      memorialHeart: { 
        text: `May the road rise to meet you.
  May the wind be always at your back.
  May the sun shine warm upon your face,
  and the rains fall soft upon your fields.
  Until we meet again,
  may God hold you in the palm of His hand.`,
        fontSize: "20"
      },
    },
    {
      key: 'twentyThirdPsalm',
      title: 'Twenty-Third Psalm',
      prayerCard: { 
        text: `The Lord is my shepherd;
  I shall not want.
  He maketh me to lie down
  in green pastures:
  He leadeth me beside the still waters;
  He restoreth my soul:
  He leadeth me in the paths
  of righteousness for His name’s sake.
  Yea, though I walk through the valley
  of the shadow of death,
  I will fear no evil;
  for thou art with me.
  Thou preparest a table before me
  in the presence of mine enemies:
  thou anointest my head with oil;
  my cup runneth over.
  Surely goodness and mercy
  shall follow me all the days of my life,
  and I will dwell in the house of the Lord forever.`,
        fontSize: "9"
      },
      bookmark: { 
        text: `The Lord is my shepherd;
  I shall not want.
  He maketh me to lie down
  in green pastures:
  He leadeth me beside the still waters;
  He restoreth my soul:
  He leadeth me in the paths
  of righteousness for His name’s sake.
  Yea, though I walk through the valley
  of the shadow of death,
  I will fear no evil;
  for thou art with me.
  Thou preparest a table before me
  in the presence of mine enemies:
  thou anointest my head with oil;
  my cup runneth over.
  Surely goodness and mercy
  shall follow me all the days of my life,
  and I will dwell in the house of the Lord forever.`,
        fontSize: "12"
      },
      memorialHeart: { 
        text: `The Lord is my shepherd;
  I shall not want.
  He maketh me to lie down
  in green pastures:
  He leadeth me beside the still waters;
  He restoreth my soul:
  He leadeth me in the paths
  of righteousness for His name’s sake.
  Yea, though I walk through the valley
  of the shadow of death,
  I will fear no evil;
  for thou art with me.
  Thou preparest a table before me
  in the presence of mine enemies:
  thou anointest my head with oil;
  my cup runneth over.
  Surely goodness and mercy
  shall follow me all the days of my life,
  and I will dwell in the house of the Lord forever.`,
        fontSize: "20"
      },
    },
    {
      key: 'lordsPrayer',
      title: 'The Lord’s Prayer',
      prayerCard: { 
        text: `Our Father who art in Heaven,
  Hallowed be Thy name;
  Thy kingdom will come,
  Thy will be done
  On earth as it is in Heaven.
  Give us this day our daily bread;
  And forgive us our trespasses
  As we forgive those who trespass against us;
  And lead us not into temptation,
  But deliver us from evil.`,
        fontSize: "12"
      },
      bookmark: { 
        text: `Our Father who art in Heaven,
  Hallowed be Thy name;
  Thy kingdom will come,
  Thy will be done
  On earth as it is in Heaven.
  Give us this day our daily bread;
  And forgive us our trespasses
  As we forgive those who trespass against us;
  And lead us not into temptation,
  But deliver us from evil.`,
        fontSize: "17"
      },
      memorialHeart: { 
        text: `Our Father who art in Heaven,
  Hallowed be Thy name;
  Thy kingdom will come,
  Thy will be done
  On earth as it is in Heaven.
  Give us this day our daily bread;
  And forgive us our trespasses
  As we forgive those who trespass against us;
  And lead us not into temptation,
  But deliver us from evil.`,
        fontSize: "20"
      },
    },
    {
      key: 'afterglow',
      title: 'Afterglow',
      prayerCard: { 
        text: `I’d like the memory of me,
  to be a happy one;
  I’d like to leave an afterglow,
  of smiles when life is done;
  I’d like to leave an echo whispering,
  softly down the ways
  of happy times and laughing times,
  and bright and sunny days;
  I’d like the tears of those who grieve
  to dry before the sun
  of happy memories that I leave,
  when life is done.`,
        fontSize: "11"
      },
      bookmark: { 
        text: `I’d like the memory of me,
  to be a happy one;
  I’d like to leave an afterglow,
  of smiles when life is done;
  I’d like to leave an echo whispering,
  softly down the ways
  of happy times and laughing times,
  and bright and sunny days;
  I’d like the tears of those who grieve
  to dry before the sun
  of happy memories that I leave,
  when life is done.`,
        fontSize: "15"
      },
      memorialHeart: { 
        text: `I’d like the memory of me,
  to be a happy one;
  I’d like to leave an afterglow,
  of smiles when life is done;
  I’d like to leave an echo whispering,
  softly down the ways
  of happy times and laughing times,
  and bright and sunny days;
  I’d like the tears of those who grieve
  to dry before the sun
  of happy memories that I leave,
  when life is done.`,
        fontSize: "20"
      },
    },
    {
      key: 'aNoteToYou',
      title: 'A Note to You',
      prayerCard: { 
        text: `Life is like a vapor
  On the side where you remain.
  Forever is where time goes on,
  Filled with joyful, timeless days.
  I am quite alive, you see,
  And waiting here for you;
  So, please live your life with joy and love,
  Until you are timeless too.
  We will laugh again together
  When life will have no end.
  No, this is not goodbye at all;
  It is, I will see you then.`,
        fontSize: "11"
      },
      bookmark: { 
        text: `Life is like a vapor
  On the side where you remain.
  Forever is where time goes on,
  Filled with joyful, timeless days.
  I am quite alive, you see,
  And waiting here for you;
  So, please live your life with joy and love,
  Until you are timeless too.
  We will laugh again together
  When life will have no end.
  No, this is not goodbye at all;
  It is, I will see you then.`,
        fontSize: "16"
      },
      memorialHeart: { 
        text: `Life is like a vapor
  On the side where you remain.
  Forever is where time goes on,
  Filled with joyful, timeless days.
  I am quite alive, you see,
  And waiting here for you;
  So, please live your life with joy and love,
  Until you are timeless too.
  We will laugh again together
  When life will have no end.
  No, this is not goodbye at all;
  It is, I will see you then.`,
        fontSize: "20"
      },
    },
    {
      key: 'foreverTouch',
      title: 'Forever Touch',
      prayerCard: { 
        text: `Each life leaves a unique legacy
  embossed upon our hearts.
  A touch that lingers on and on,
  when time has come to part.
  Memories like fingerprints
  leave a special place,
  knitted to the people
  that time cannot erase.
  They live forever in our hearts
  as time continues on—
  in memories of days gone by
  we still shared a special bond.
  That bond cannot be broken,
  even death can’t separate;
  a touch that lives forever,
  time cannot erase.`,
        fontSize: "11"
      },
      bookmark: { 
        text: `Each life leaves a unique legacy
  embossed upon our hearts.
  A touch that lingers on and on,
  when time has come to part.
  Memories like fingerprints
  leave a special place,
  knitted to the people
  that time cannot erase.
  They live forever in our hearts
  as time continues on—
  in memories of days gone by
  we still shared a special bond.
  That bond cannot be broken,
  even death can’t separate;
  a touch that lives forever,
  time cannot erase.`,
        fontSize: "13"
      },
      memorialHeart: { 
        text: `Each life leaves a unique legacy
  embossed upon our hearts.
  A touch that lingers on and on,
  when time has come to part.
  Memories like fingerprints
  leave a special place,
  knitted to the people
  that time cannot erase.
  They live forever in our hearts
  as time continues on—
  in memories of days gone by
  we still shared a special bond.
  That bond cannot be broken,
  even death can’t separate;
  a touch that lives forever,
  time cannot erase.`,
        fontSize: "20"
      },
    },
    {
      key: 'footprintsInTheSand',
      title: 'Footprints in the Sand',
      prayerCard: { 
        text: `One night I dreamed I was
  walking along the beach with the Lord.
  Scenes from my life flashed across the sky.
  In each, I noticed footprints in the sand.
  Sometimes there were two sets of footprints; other times there was only one.
  
  During the low periods of my life I could see only one set of footprints,
  so I said, "You promised me, Lord, that you would walk with me always.
  Why, when I have needed you most, have you not been there for me?"
  
  The Lord replied, "The times when you have seen only one set of footprints,
  my child, is when I carried you."`,
        fontSize: "9"
      },
      bookmark: { 
        text: `One night I dreamed I was
  walking along the beach with the Lord.
  Scenes from my life flashed across the sky.
  In each, I noticed footprints in the sand.
  Sometimes there were two sets of footprints; other times there was only one.
  
  During the low periods of my life I could see only one set of footprints,
  so I said, "You promised me, Lord, that you would walk with me always.
  Why, when I have needed you most, have you not been there for me?"
  
  The Lord replied, "The times when you have seen only one set of footprints,
  my child, is when I carried you."`,
        fontSize: "13"
      },
      memorialHeart: { 
        text: `One night I dreamed I was
  walking along the beach with the Lord.
  Scenes from my life flashed across the sky.
  In each, I noticed footprints in the sand.
  Sometimes there were two sets of footprints; other times there was only one.
  
  During the low periods of my life I could see only one set of footprints,
  so I said, "You promised me, Lord, that you would walk with me always.
  Why, when I have needed you most, have you not been there for me?"
  
  The Lord replied, "The times when you have seen only one set of footprints,
  my child, is when I carried you."`,
        fontSize: "20"
      },
    },
  ];

function ProverbSelect({ value, onChange, productType, disabled }) {

  const getVersion = (p) => {
    if (productType === PRODUCT_TYPES.MEMORIAL_HEART) return p.memorialHeart;
    if (productType === PRODUCT_TYPES.BOOKMARK) return p.bookmark;
    return p.prayerCard;
  };

  const selectValue =
    typeof value === 'object' && value !== null ? JSON.stringify(value) : value || '';

  return (
    <FormControl fullWidth margin="normal" disabled={disabled}>
      <InputLabel id="proverb-select-label">Select Proverb</InputLabel>
      <Select
        labelId="proverb-select-label"
        label="Select Proverb"
        value={selectValue}
        onChange={(e) => {
          try {
            const parsed = JSON.parse(e.target.value);
            onChange({ target: { value: parsed } });
          } catch {
            onChange({ target: { value: e.target.value } });
          }
        }}
      >
        {proverbs.map((p) => {
          const version = getVersion(p);
          return (
            <MenuItem key={p.key} value={JSON.stringify(version)}>
              {p.title}
            </MenuItem>
          );
        })}
        <MenuItem value="CUSTOM">Custom Proverb</MenuItem>
      </Select>
    </FormControl>
  );
}

export default ProverbSelect;