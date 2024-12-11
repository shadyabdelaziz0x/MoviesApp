import React, {Fragment} from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const MovieDetailsSkeleton = () => {
  return (
    <SkeletonPlaceholder borderRadius={4}>
      <Fragment>
        {/* Poster Section */}
        <SkeletonPlaceholder.Item width={'100%'} height={300} />
        {/* Description Section */}
        <SkeletonPlaceholder.Item marginTop={20}>
          <SkeletonPlaceholder.Item width={'70%'} height={10} />
          <SkeletonPlaceholder.Item marginTop={10} width={'95%'} height={10} />
          <SkeletonPlaceholder.Item marginTop={10} width={'95%'} height={10} />
          <SkeletonPlaceholder.Item marginTop={10} width={'95%'} height={10} />
        </SkeletonPlaceholder.Item>
        {/* Actors Section */}
        <SkeletonPlaceholder.Item marginTop={30}>
          <SkeletonPlaceholder.Item width={'40%'} height={10} />
          <SkeletonPlaceholder.Item flexDirection="row" marginTop={20}>
            <SkeletonPlaceholder.Item width={100} height={100} />
            <SkeletonPlaceholder.Item
              marginLeft={20}
              width={100}
              height={100}
            />
            <SkeletonPlaceholder.Item
              marginLeft={20}
              width={100}
              height={100}
            />
          </SkeletonPlaceholder.Item>
        </SkeletonPlaceholder.Item>
        {/* Keywords Section */}
        <SkeletonPlaceholder.Item marginTop={30}>
          <SkeletonPlaceholder.Item width={'40%'} height={10} />
          <SkeletonPlaceholder.Item flexDirection="row" marginTop={20}>
            <SkeletonPlaceholder.Item
              width={100}
              height={40}
              borderRadius={20}
            />
            <SkeletonPlaceholder.Item
              marginLeft={20}
              width={100}
              height={40}
              borderRadius={20}
            />
            <SkeletonPlaceholder.Item
              marginLeft={20}
              width={100}
              height={40}
              borderRadius={20}
            />
          </SkeletonPlaceholder.Item>
        </SkeletonPlaceholder.Item>

        {/* Reviews Section */}
        <SkeletonPlaceholder.Item marginTop={30}>
          <SkeletonPlaceholder.Item width={'40%'} height={10} />
          <SkeletonPlaceholder.Item flexDirection="row" marginTop={20}>
            <SkeletonPlaceholder.Item
              width={100}
              height={100}
              borderRadius={20}
            />
            <SkeletonPlaceholder.Item
              marginLeft={20}
              width={100}
              height={100}
              borderRadius={20}
            />
            <SkeletonPlaceholder.Item
              marginLeft={20}
              width={100}
              height={100}
              borderRadius={20}
            />
          </SkeletonPlaceholder.Item>
        </SkeletonPlaceholder.Item>
      </Fragment>
    </SkeletonPlaceholder>
  );
};

export default MovieDetailsSkeleton;
