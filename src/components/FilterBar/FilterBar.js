import React from 'react';

import FilterButton from './FilterButton';

import s from './FilterBar.module.css';

export default ({ handleFilterSelection, currentFilter, opts }) => (
  <div className={s.filterBarContainer}>
    {opts.map(opt => <FilterButton key={opt} option={opt} handleFilterSelection={handleFilterSelection(opt)} checked={currentFilter === opt} />)}
  </div>
);
