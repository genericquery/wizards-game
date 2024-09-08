import { MagicType } from '../api/models';

export const getMagicType = (magicType: MagicType) => {
  let force = '';
  switch (magicType) {
    case MagicType.$0:
      force = 'flame';
      break;
    case MagicType.$1:
      force = 'air';
      break;
    case MagicType.$2:
      force = 'earth';
      break;
    case MagicType.$3:
      force = 'water';
      break;
  }

  return force;
};
