import { Typography, type TypographyProps } from '../../Typography';
import { styled } from '../../styles';

export const Row = styled.tr`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Figure = styled.figure`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const NoDataImg = styled.img`
  display: block;

  width: ${({ width }) => `${width}px` || '100%'};
  margin: auto auto ${({ theme }) => theme.spacing(3)};

  object-fit: contain;
`;

export const Figcaption = styled(Typography)<TypographyProps>`
  color: ${({ theme }) => theme.palette.grey[600]};
`;
