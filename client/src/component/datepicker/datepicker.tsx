import React from 'react';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import { TextField } from '@mui/material';
import { useState } from 'react';
import styles from './datepicker.module.css';

function Datepicker() {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  return (
    <div className={styles.dateWrapper}>
      <h3 className={styles.schedule}>진행 기간 : </h3>
      <div className={styles.datepickerWrapper}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DesktopDatePicker
            label='시작일'
            inputFormat={'yyyy-MM-dd'}
            mask={'____-__-__'}
            value={startDate}
            maxDate={endDate}
            onChange={(date) => setStartDate(date!)}
            renderInput={(params) => <TextField {...params} />}
          />
          <DesktopDatePicker
            label='종료일'
            inputFormat={'yyyy-MM-dd'}
            mask={'____-__-__'}
            value={endDate}
            minDate={startDate}
            onChange={(date) => setEndDate(date!)}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </div>
    </div>
  );
}

export default Datepicker;
