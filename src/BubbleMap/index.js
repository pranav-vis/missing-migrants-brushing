import { max, scaleSqrt } from 'd3';
import React, { useMemo } from 'react';
import { Marks } from './marks.js';
import { useWorldAtlas } from '../useWorldAtlas.js';

const sizeValue = (d) => d['Total Dead and Missing'];
const citiesRadius = 15;

export const BubbleMap = ({
  data,
  filteredData,
  worldAtlas,
}) => {
  const sizeScale = useMemo(
    () =>
      scaleSqrt()
        .domain([0, max(data, sizeValue)])
        .range([0, citiesRadius]),
    [data, sizeValue, citiesRadius]
  );

  return (
    <Marks
      worldAtlas={worldAtlas}
      data={filteredData}
      sizeScale={sizeScale}
      sizeValue={sizeValue}
    />
  );
};
