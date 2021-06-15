import React from 'react';
import { Avatar, AvatarProps } from '@material-ui/core';
import { loadImage } from 'utils';

export const SuspenseAvatar = ({
  alt,
  src,
  ...props
}: AvatarProps & { src: string }) => {
  loadImage(src).read();
  return <Avatar alt={alt} src={src} {...props} />;
};
