import React, { useState } from 'react'
import { Tabs, Tab, Box, useMediaQuery, useTheme } from '@mui/material'
import UpdateContactInfo from './UpdateContactInfo'
import UpdateBusinessInfo from './UpdateBusinessInfo'
import UpdatePaymentInfo from './UpdatePaymentInfo'

function TabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
      style={{ display: value === index ? 'block' : 'none', width: '100%' }}
    >
      {value === index && (
        <Box p={3} sx={{ display: 'flex', justifyContent: 'center' }}>
          {children}
        </Box>
      )}
    </div>
  )
}

function UpdateInfo() {
  const [value, setValue] = useState(0)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: isMobile ? 'column' : 'row', height: '80vh' }}>
      <Tabs
        orientation={isMobile ? 'horizontal' : 'vertical'}
        variant="fullWidth"
        value={value}
        onChange={handleChange}
        aria-label="Tabs"
        sx={{ borderRight: isMobile ? 0 : 2, borderBottom: isMobile ? 2 : 0, borderColor: 'divider', width: isMobile ? '100%' : 'auto'}}
        centered={isMobile}
      >
        <Tab label="Business Info" />
        <Tab label="Contact Info" />
        <Tab label="Payment Info" />
      </Tabs>
      <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
        <TabPanel value={value} index={0}>
          <UpdateBusinessInfo />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <UpdateContactInfo />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <UpdatePaymentInfo />
        </TabPanel>
      </Box>
    </Box>
  )
}

export default UpdateInfo
