import {
  Palette as MuiPalette,
  Theme as MuiTheme,
  PaletteColor,
  ThemeOptions,
  createTheme as createMuiTheme,
  responsiveFontSizes,
} from '@mui/material/styles';
import { merge } from 'lodash-es';

import { typography } from './typography';
import { Color, getPalette } from './palette';
import { FontsUrls, getComponents } from './components';
import { Brand, SPACING } from './constants';
import { Elevation, elevation } from './elevation';

type Palette = MuiPalette & {
  red: Color;
  green: Color;
  yellow: Color;
  primary: PaletteColor & Color;
};

export type Theme = Omit<MuiTheme, 'shadows'> & {
  elevation: Elevation;
  palette: Palette;
};

type CreateThemeParams = {
  brand: Brand;
  options?: ThemeOptions;
  fontsUrls: FontsUrls;
};

export const createTheme = ({
  brand,
  options,
  fontsUrls,
}: CreateThemeParams) => {
  const themeOptions: ThemeOptions = {
    typography,
    spacing: SPACING,
    palette: getPalette(brand),
    components: getComponents(fontsUrls),
  };

  const muiTheme = responsiveFontSizes(
    createMuiTheme(merge({}, themeOptions, options))
  );

  return merge(muiTheme as any, { elevation }) as Theme;
};
