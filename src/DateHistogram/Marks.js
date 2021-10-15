export const Marks = ({
    binnedData,
    xScale,
    yScale,
    tooltipFormat,
    innerHeight,
  }) => (
    <>
      <g>
        {binnedData.map((d) => (
          <rect
            fill="#684664"
            x={xScale(d.x0)}
            y={yScale(d.y)}
            width={xScale(d.x1) - xScale(d.x0)}
            height={innerHeight - yScale(d.y)}
          >
            <title>
              {tooltipFormat(d.x0)}
              {' ->#'}
              {d.y}
            </title>
          </rect>
        ))}
      </g>
    </>
  );