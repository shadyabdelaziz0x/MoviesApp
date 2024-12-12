import React from 'react';
import FastImage, {
  ImageStyle,
  ResizeMode,
  Priority,
} from 'react-native-fast-image';
import {createImageProgress} from 'react-native-image-progress';

const ProgressImage = createImageProgress(FastImage);

interface ImageProps {
  style?: ImageStyle;
  src?: string | number;
  resizeMode?: ResizeMode;
  defaultSource?: number;
  priority?: Priority;
  cache?: 'immutable' | 'web' | 'cacheOnly';
}

const Image = ({
  style,
  src,
  resizeMode,
  defaultSource,
  priority,
  cache,
}: ImageProps) => {
  const source = React.useMemo(
    () =>
      typeof src === 'string'
        ? {
            uri: `${src}`,
            priority: priority ?? 'normal',
            cache: cache ?? 'immutable',
          }
        : src,
    [cache, priority, src],
  );
  return (
    <ProgressImage
      style={style}
      source={source}
      resizeMode={resizeMode}
      defaultSource={defaultSource}
    />
  );
};

export default React.memo(Image);
