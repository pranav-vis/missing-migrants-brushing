import {
    csv,
    max,
    min,
    sum,
    select,
    brushX,
    event,
    histogram as bin,
    extent,
    format,
    timeFormat,
    scaleBand,
    scaleLinear,
    scaleTime,
    timeMonths,
  } from 'd3';
  import { useRef, useEffect, useMemo } from 'react';
  import { AxisBottom } from './AxisBottom.js';
  import { AxisLeft } from './AxisLeft.js';
  import { Marks } from './Marks.js';
  
  const tooltipFormat = timeFormat('%b-%y');
  const tickFormat = timeFormat('%b-%y');
  const width = 960;
  const height = 80;
  
  const margin = {
    top: 0,
    bottom: 20,
    left: 80,
    right: 20,
  };
  
  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;
  
  const xAxisLabel = 'Time';
  const yAxisLabel = 'Total Dead and Missing';
  const yValue = (d) => d['Total Dead and Missing'];
  
  export const DateHistogram = ({
    data,
    width,
    height,
    xValue,
    setBrushExtent,
  }) => {
    const innerHeight1 = innerHeight;
    const innerWidth1 = innerWidth;
  
    const brushRef = useRef();
  
    const xScale = useMemo(
      () =>
        scaleTime()
          .domain(extent(data, xValue))
          .range([0, innerWidth])
          .nice(),
      [data, xValue, innerWidth]
    );
  
    const timeStart = min(xScale.domain());
    const timeStop = max(xScale.domain());
  
    const binnedData = useMemo(() => {
      return bin()
        .value(xValue)
        .domain(xScale.domain())
        .thresholds(timeMonths(timeStart, timeStop))(data)
        .map((array) => ({
          y: sum(array, yValue),
          x0: array.x0,
          x1: array.x1,
        }));
    }, [xValue, xScale, timeStart, timeStop, data, yValue]);
  
    const yScale = useMemo( () => scaleLinear()
      .domain([0, max(binnedData, (d) => d.y)])
      .range([innerHeight, 0])
      .nice(), [binnedData, innerHeight]);
  
    useEffect(() => {
      const brush = brushX().extent([
        [0, 0],
        [innerWidth1, innerHeight1],
      ]);
  
      brush(select(brushRef.current));
      brush.on('brush end', (event) => {
        if (event.selection)
          setBrushExtent(event.selection.map(xScale.invert));
      });
  
      //console.log(brushRef.current);
    }, [innerWidth, innerHeight]);
  
    return (
      <>
        <g
          className="mark"
          transform={`translate(${margin.left}, ${margin.top})`}
        >
          <text
            className="axisLabel"
            x={innerWidth / 2}
            y={innerHeight + 30}
            textAnchor="middle"
          >
            {xAxisLabel}
          </text>
          <AxisBottom
            xScale={xScale}
            innerHeight={innerHeight}
            tickFormat={tickFormat}
            tickOffset={5}
          />
          <text
            className="axisLabel"
            y={innerHeight / 2}
            textAnchor="middle"
            transform={`translate(${-80}, ${innerHeight / 2})
            rotate(-90)`}
          >
            {yAxisLabel}
          </text>
          <AxisLeft yScale={yScale} innerWidth={innerWidth} />
          <Marks
            binnedData={binnedData}
            xScale={xScale}
            yScale={yScale}
            tooltipFormat={tooltipFormat}
            innerHeight={innerHeight}
          />
          <g ref={brushRef}></g>
        </g>
      </>
    );
  };
  