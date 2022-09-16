import { LoadingButton } from '@mui/lab';

import { styled } from '../styles';
import {
  getButtonHeightMobile,
  getButtonPaddingMobile,
} from '../ButtonBase/styles';

import { ButtonProps } from './types';

export const LoadingButtonWrapper = styled(LoadingButton, {
  shouldForwardProp: (prop) =>
    prop !== 'customColor' && prop !== 'customVariant',
})<ButtonProps>`
  ${({ theme }) => theme.breakpoints.down('sm')} {
    height: ${getButtonHeightMobile};
    padding: ${getButtonPaddingMobile};

    white-space: nowrap;
  }
`;