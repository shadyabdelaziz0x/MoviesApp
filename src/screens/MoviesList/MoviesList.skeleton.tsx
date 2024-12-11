import React, {Fragment} from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const MoviesListSkeleton = () => {
  return (
    <SkeletonPlaceholder borderRadius={4}>
      <Fragment>
        <SkeletonPlaceholder.Item
          alignSelf="center"
          marginTop={16}
          width={'96%'}
          height={300}
        />
        <SkeletonPlaceholder.Item
          alignSelf="center"
          marginTop={16}
          width={'96%'}
          height={300}
        />
        <SkeletonPlaceholder.Item
          alignSelf="center"
          marginTop={16}
          width={'96%'}
          height={300}
        />
      </Fragment>
    </SkeletonPlaceholder>
  );
};

export default MoviesListSkeleton;
