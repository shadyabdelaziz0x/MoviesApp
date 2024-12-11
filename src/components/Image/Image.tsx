import React from 'react';
import FastImage, {ImageStyle, ResizeMode} from 'react-native-fast-image';
import {createImageProgress} from 'react-native-image-progress';

interface ImageProps {
  style?: ImageStyle;
  src?: string;
  resizeMode?: ResizeMode;
}

const ProgressImage = createImageProgress(FastImage);

const Image = ({style, src, resizeMode}: ImageProps) => {
  const source = React.useMemo(
    () => ({
      uri: src,
    }),
    [src],
  );
  return (
    <ProgressImage style={style} source={source} resizeMode={resizeMode} />
  );
};

export default Image;
