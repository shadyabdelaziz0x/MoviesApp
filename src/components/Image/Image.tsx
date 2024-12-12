import React from 'react';
import FastImage, {
  ImageStyle,
  ResizeMode,
  Source,
} from 'react-native-fast-image';

interface ImageProps {
  style?: ImageStyle;
  src?: string | number;
  resizeMode?: ResizeMode;
  defaultSource?: number;
}

const Image = ({style, src, resizeMode, defaultSource}: ImageProps) => {
  const source: Source | undefined | null = React.useMemo(
    () =>
      src
        ? {
            uri: `${src}`,
          }
        : undefined,
    [src],
  );
  return (
    <FastImage
      style={style}
      source={source}
      resizeMode={resizeMode}
      defaultSource={defaultSource}
    />
  );
};

export default React.memo(Image);
