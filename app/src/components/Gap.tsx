import React from 'react';
import {View, ViewStyle} from 'react-native';
// import Spacing from '../theme/spacing';

type GapProps = {
  height?: number;
  width?: number;
  // height?: keyof typeof Spacing | number;
  // width?: keyof typeof Spacing | number;
};

const GapComponent: React.FC<GapProps> = ({height = 0, width = 0}) => {
  const resolvedHeight = height;
  const resolvedWidth = width;
  // const resolvedHeight = typeof height === 'string' ? Spacing[height] : height;
  // const resolvedWidth = typeof width === 'string' ? Spacing[width] : width;

  const style: ViewStyle = {
    ...(resolvedHeight ? {height: resolvedHeight} : {}),
    ...(resolvedWidth ? {width: resolvedWidth} : {}),
  };

  return <View style={style} />;
};

const Gap = React.memo(GapComponent, (prev, next) => {
  return prev.height === next.height && prev.width === next.width;
});

export default Gap;
