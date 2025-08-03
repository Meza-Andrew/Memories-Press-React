import React, { useEffect, useState } from 'react';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Tooltip,
  Typography,
} from '@mui/material';
import { PRODUCT_TYPES } from './templatesConfig';

export default function ProverbSelect({ value, onChange, productType, disabled }) {
  const [proverbs, setProverbs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const username = import.meta.env.VITE_WP_USERNAME;
    const password = import.meta.env.VITE_WP_PASSWORD;
    const encoded = btoa(`${username}:${password}`);
    const memPressURL = 'https://memoriespress.poweredbymeza.com/wp-json/mp/v1/proverbs';

    fetch(memPressURL, {
      headers: {
        'Authorization': `Basic ${encoded}`,
        'Content-Type': 'application/json',
      },
    })
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch proverbs');
        return res.json();
      })
      .then(data => {
        const formatted = data
          .filter(p => p.name && p.prayer)
          .map(p => ({
            key: p.name.replace(/\s+/g, '-').toLowerCase(),
            title: p.name,
            prayerCard: { text: p.prayer, textAlignment: p.textAlignment ? p.textAlignment : '' },
            bookmark: { text: p.prayer, textAlignment: p.textAlignment ? p.textAlignment : '' },
            memorialHeart: { text: p.prayer, textAlignment: p.textAlignment ? p.textAlignment : '' },
          }));
        setProverbs(formatted);
      })
      .catch(err => {
        console.error('Error fetching proverbs:', err);
      })
      .finally(() => setLoading(false));
  }, []);

  const getVersion = (p) => {
    if (productType === PRODUCT_TYPES.MEMORIAL_HEART) return p.memorialHeart;
    if (productType === PRODUCT_TYPES.BOOKMARK) return p.bookmark;
    return p.prayerCard;
  };

  const selectValue =
    typeof value === 'object' && value !== null
      ? JSON.stringify(value)
      : value || '';

  const selectControl = (
    <FormControl fullWidth margin="normal" disabled={disabled || loading}>
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
            <MenuItem
              key={p.key}
              value={JSON.stringify({ name: p.title, ...version })}
            >
              {p.title}
            </MenuItem>
          );
        })}
        <MenuItem value="CUSTOM">Custom Proverb</MenuItem>

      </Select>
    </FormControl>
  );

  if (productType === PRODUCT_TYPES.MEMORIAL_HEART) {
    return (
      <>
        <Tooltip title="This product does not support this feature." disableFocusListener>
          <span>{selectControl}</span>
        </Tooltip>
        <Typography
          sx={{
            display: { xs: 'block', md: 'none' },
            fontStyle: 'italic',
            color: '#666665',
          }}
        >
          This product does not support this feature.
        </Typography>
      </>
    );
  }
  return selectControl;
}