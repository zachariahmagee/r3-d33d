import { useRef, useEffect, useState, useMemo} from "react"
import * as d3 from "d3"

export const SVG = () => {
    return (
        <svg style={{
            border: "2px solid gold"
        }} />
    )
}

export const Circles = () => {
    const [dataset, setDataset] = useState(
      generateDataset()
    )
  
    setInterval(() => {
      const newDataset = generateDataset()
      setDataset(newDataset)
    }, 2000)
  
    return (
      <svg viewBox="0 0 100 50">
        {dataset.map(([x, y], i) => (
          <circle
            cx={x}
            cy={y}
            r="3"
          />
        ))}
      </svg>
    )
  }


  const generateDataset = () => (
    Array(10).fill(0).map(() => ([
      Math.random() * 80 + 10,
      Math.random() * 35 + 10,
    ]))
  )

 export const Axis = () => {
    const ticks = useMemo(() => {
      const xScale = d3.scaleLinear()
        .domain([0, 100])
        .range([10, 290])
  
      return xScale.ticks()
        .map(value => ({
          value,
          xOffset: xScale(value)
        }))
    }, [])
  
    return (
      <svg>
        <path
          d="M 9.5 0.5 H 290.5"
          stroke="currentColor"
        />
        {ticks.map(({ value, xOffset }) => (
          <g
            key={value}
            transform={`translate(${xOffset}, 0)`}
          >
            <line
              y2="6"
              stroke="currentColor"
            />
            <text
              key={value}
              style={{
                fontSize: "10px",
                textAnchor: "middle",
                transform: "translateY(20px)"
              }}>
              { value }
            </text>
          </g>
        ))}
      </svg>
    )
  }