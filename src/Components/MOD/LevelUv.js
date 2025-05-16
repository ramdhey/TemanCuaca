export const LevelUv = uvLevel => {
  if (uvLevel <= 2) return 'Rendah';
  if (uvLevel <= 5) return 'Sedang';
  if (uvLevel <= 7) return 'Tinggi';
  if (uvLevel <= 10) return 'Sangat Tinggi';
  return 'Ekstrem';
};
