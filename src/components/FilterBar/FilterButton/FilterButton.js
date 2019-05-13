import React from 'react';

import s from './FilterButton.module.css';

export default ({ checked, handleFilterSelection, option }) => (
  <>
    <input className={s.checkbox} type="checkbox" name={option} value={option} checked={checked} onChange={handleFilterSelection} />
    <label className={`${s.label} ${checked ? s.labelSelected : undefined}`} htmlFor={option} onClick={handleFilterSelection}>{option}</label>
  </>
);