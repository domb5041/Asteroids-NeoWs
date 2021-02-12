import React from 'react';
import { extent as d3ArrayExtent } from 'd3-array';
import {
    scaleLinear as d3ScaleLinear,
    scaleTime as d3ScaleTime,
} from 'd3-scale';
import { line as d3Line } from 'd3-shape';
import { axisBottom as d3AxisBottom, axisLeft as d3AxisLeft } from 'd3-axis';
import { select as d3Select } from 'd3-selection';

const data = [
    { day: '2017-04-18', productPerceivedQuality: '2.8' },
    { day: '2017-04-19', productPerceivedQuality: '2.9' },
    { day: '2017-04-20', productPerceivedQuality: '2.7' },
    { day: '2017-04-21', productPerceivedQuality: '4.3' },
    { day: '2017-04-22', productPerceivedQuality: '4.6' },
    { day: '2017-04-23', productPerceivedQuality: '5' },
    { day: '2017-04-24', productPerceivedQuality: '5.2' },
    { day: '2017-04-25', productPerceivedQuality: '5.1' },
    { day: '2017-04-26', productPerceivedQuality: '4.8' },
    { day: '2017-04-27', productPerceivedQuality: '4.9' },
    { day: '2017-04-28', productPerceivedQuality: '5.1' },
    { day: '2017-04-29', productPerceivedQuality: '5.3' },
    { day: '2017-04-30', productPerceivedQuality: '5.6' },
    { day: '2017-05-01', productPerceivedQuality: '6.2' },
];

export default ({ height, selectX, selectY, width }) => {
    const graphMargin = 40;

    // Since this is "time series" visualization, our x axis should have a time scale.
    // Our x domain will be the extent ([min, max]) of x values (Dates) in our data set.
    // Our x range will be from x=0 to x=width.
    const xScale = d3ScaleTime()
        .domain(d3ArrayExtent(data, selectX))
        .range([0, width - graphMargin * 2]);

    // Our y axis should just have a linear scale.
    // Our y domain will be the extent of y values (numbers) in our data set.
    const yScale = d3ScaleLinear()
        .domain(d3ArrayExtent(data, selectY))
        .range([height - graphMargin * 2, 0]);

    // Add an axis for our x scale which has half as many ticks as there are rows in the data set.
    const xAxis = d3AxisBottom()
        .scale(xScale)
        .ticks(data.length / 2);
    // Add an axis for our y scale that has 3 ticks (FIXME: we should probably make number of ticks per axis a prop).
    const yAxis = d3AxisLeft().scale(yScale).ticks(3);

    // These two functions select the scaled x and y values (respectively) of our data.
    const selectScaledX = datum => xScale(selectX(datum));
    const selectScaledY = datum => yScale(selectY(datum));

    // Create a d3Line factory for our scales.
    const sparkLine = d3Line().x(selectScaledX).y(selectScaledY);

    // Create a line path of for our data.
    const linePath = sparkLine(data);

    return (
        <svg
            className='container'
            // height={height}
            // width={width}

            height={height}
            width={width}
        >
            <g
                style={{
                    transform: `translate(${graphMargin}px, ${graphMargin}px)`,
                }}
                height={height - graphMargin}
                width={width - graphMargin}
            >
                <g className='xAxis' ref={node => d3Select(node).call(xAxis)} />
                <g className='yAxis' ref={node => d3Select(node).call(yAxis)} />

                {/* ADD: our spark line as a path (inside a group, for convenient styling) */}
                <g className='line'>
                    <path d={linePath} />
                </g>
            </g>
        </svg>
    );
};
