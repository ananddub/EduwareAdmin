import React from 'react';
import {Image} from 'react-native';
import Svg, {Polyline, Rect, Circle, Path, SvgXml} from 'react-native-svg';

const CameraIcon = ({
  width,
  height,
  color,
  style,
}: {
  width: number;
  height: number;
  color: string;
  style?: any;
}) => {
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
};

export function ArchiveIcon({
  width,
  height,
  color,
}: {
  width: number;
  height: number;
  color: string;
}) {
  return (
    <Svg width={width} height={height} viewBox="0 0 48 48">
      <Path
        fill={color}
        d="M37.75,8 C38.9926407,8 40,9.00735931 40,10.25 L40,15.75 C40,16.9079464 39.1252778,17.8615904 38.0005597,17.9862059 L38,35.75 C38,38.0281746 36.207493,39.8876867 33.9559163,39.9950991 L33.75,40 L14.25,40 C11.9718254,40 10.1123133,38.207493 10.0049009,35.9559163 L10,35.75 L10.0004396,17.9863164 C8.87524032,17.8621552 8,16.9082892 8,15.75 L8,10.25 C8,9.00735931 9.00735931,8 10.25,8 L37.75,8 Z M35.5,18 L12.5,18 L12.5,35.75 C12.5,36.6681734 13.2071103,37.4211923 14.1064728,37.4941988 L14.25,37.5 L33.75,37.5 C34.6681734,37.5 35.4211923,36.7928897 35.4941988,35.8935272 L35.5,35.75 L35.5,18 Z M20.25,22.5 L26.75,22.5 C27.4403559,22.5 28,23.0596441 28,23.75 C28,24.3972087 27.5081253,24.9295339 26.8778052,24.9935464 L26.75,25 L20.25,25 C19.5596441,25 19,24.4403559 19,23.75 C19,23.1027913 19.4918747,22.5704661 20.1221948,22.5064536 L20.25,22.5 L26.75,22.5 L20.25,22.5 Z M37.5,10.5 L10.5,10.5 L10.5,15.5 L37.5,15.5 L37.5,10.5 Z"
      />
    </Svg>
  );
}

export function GalleryIcon(props: any) {
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

export default {CameraIcon, GalleryIcon};
