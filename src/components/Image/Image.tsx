import React from 'react';
import FastImage, {
  ImageStyle,
  ResizeMode,
  Source,
  Priority,
} from 'react-native-fast-image';

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
  const source: Source | undefined | null = React.useMemo(
    () =>
      src
        ? {
            uri: `${src}`,
            priority: priority ?? 'normal',
            cache: cache ?? 'immutable',
          }
        : undefined,
    [cache, priority, src],
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
