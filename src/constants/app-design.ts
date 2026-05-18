export const AppColors = {
  brand: '#0f5238',
  background: '#fbf8ff',
  historyBackground: '#f0f4f2',
  surface: '#ffffff',
  border: '#dfe4dc',
  text: '#161a32',
  textMuted: '#707973',
  brandSoft: '#b1f0ce',
  brandSoftBorder: '#d9f7e7',
  activeTabBackground: '#e8f7ef',
} as const;

export const AppSpacing = {
  screenHorizontal: 20,
  screenTop: 8,
  screenBottom: 132,
  tabBarHeight: 88,
  fabBottom: 106,
} as const;

function hexToRgb(color: string) {
  const normalized = color.replace('#', '');
  const hex = normalized.length === 3 ? normalized.split('').map((value) => `${value}${value}`).join('') : normalized;
  const value = Number.parseInt(hex, 16);

  return {
    red: (value >> 16) & 255,
    green: (value >> 8) & 255,
    blue: value & 255,
  };
}

export function createBoxShadow({
  color,
  opacity,
  radius,
  offsetX = 0,
  offsetY,
  elevation,
}: {
  color: string;
  opacity: number;
  radius: number;
  offsetX?: number;
  offsetY: number;
  elevation?: number;
}) {
  const { red, green, blue } = hexToRgb(color);

  return {
    boxShadow: `${offsetX}px ${offsetY}px ${radius}px rgba(${red}, ${green}, ${blue}, ${opacity})`,
    ...(typeof elevation === 'number' ? { elevation } : null),
  };
}
