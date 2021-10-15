export const AxisLeft = ({ yScale, innerWidth, innerHeight, tickOffset = 8 }) =>
  yScale.ticks().map((tickValue) => (
    <g
      className="tick"
      key={tickValue}
      transform={`translate(${-tickOffset}, ${
        yScale(tickValue)
      })`}
    >
      <line x2={innerWidth} />
      <text
        x= {-tickOffset}
        dy="0.32em"
        style={{ textAnchor: 'end' }}
        transform={`
            rotate(0)`}
      >
        {tickValue}
      </text>
    </g>
  ));
