import React from 'react';
import {SvgXml} from 'react-native-svg';
import Svg, {Polyline, Rect, Circle} from 'react-native-svg';

export function CameraIcon({
  width,
  height,
  color,
  style,
}: {
  width: number;
  height: number;
  color: string;
  style?: any;
}): JSX.Element {
  const svgMarkup = `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
      <path d="M15 12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h1.172a3 3 0 0 0 2.12-.879l.83-.828A1 1 0 0 1 6.827 3h2.344a1 1 0 0 1 .707.293l.828.828A3 3 0 0 0 12.828 5H14a1 1 0 0 1 1 1zM2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4z"/>
      <path d="M8 11a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5m0 1a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7M3 6.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0"/>
    </svg>
  `;

  return (
    <SvgXml
      color={color}
      style={style}
      xml={svgMarkup}
      width={width}
      height={height}
    />
  );
}

export function GalleryIcon(props: anny) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      fill={'red'}
      viewBox="0 0 24 24"
      {...props}>
      <Polyline
        fill="none"
        stroke={props.color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        points="22.41 19.41 17 14 14.5 16.5"
      />
      <Polyline
        fill="none"
        stroke={props.color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        points="18 20 9.5 11.5 1.59 19.41"
      />
      <Rect
        width={22}
        height={16}
        x={1}
        y={4}
        fill="none"
        stroke={props.color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        rx={2}
        ry={2}
      />
      <Circle
        cx={17}
        cy={9}
        r={1}
        fill="none"
        stroke={props.color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      />
    </Svg>
  );
}
