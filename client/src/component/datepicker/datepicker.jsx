import React from 'react';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import { TextField } from '@mui/material';
import styles from './datepicker.module.css';

export const Datepicker = ({ dateValue, setDateValue }) => {
  return (
    <div className={styles.dateWrapper}>
      <div className={styles.datepickerWrapper}>
        <div className={styles.labelText}>모집 마감일</div>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DesktopDatePicker
            inputFormat={'yyyy-MM-dd'}
            mask={'____-__-__'}
            value={dateValue}
            onChange={setDateValue}
            renderInput={(params) => <TextField {...params} sx={{ width: '100%' }} />}
          />
        </LocalizationProvider>
      </div>
    </div>
  );
};
