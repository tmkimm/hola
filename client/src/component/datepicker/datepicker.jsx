import React from 'react';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import { TextField } from '@mui/material';
import { useState } from 'react';
import styles from './datepicker.module.css';

export const Datepicker = () => {
  const [startDate, setStartDate] = useState(null);

  return (
    <div className={styles.dateWrapper}>
      <div className={styles.datepickerWrapper}>
        <div className={styles.labelText}>시작 예정일</div>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DesktopDatePicker
            inputFormat={'yyyy-MM-dd'}
            mask={'____-__-__'}
            value={startDate}
            onChange={(date) => setStartDate(date)}
            renderInput={(params) => <TextField {...params} sx={{ width: '100%' }} />}
          />
        </LocalizationProvider>
      </div>
    </div>
  );
};
