export const FormatDateDisplay = itemDate => {
  const daysOfWeek = [
    'Minggu',
    'Senin',
    'Selasa',
    'Rabu',
    'Kamis',
    'Jumat',
    'Sabtu',
  ];

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const date = new Date(itemDate);
  const dayOfWeek = daysOfWeek[date.getDay()];

  const todayStr = today.toISOString().split('T')[0];
  const tomorrowStr = tomorrow.toISOString().split('T')[0];

  if (itemDate === todayStr) {
    return 'Hari ini';
  } else if (itemDate === tomorrowStr) {
    return 'Besok';
  } else {
    return dayOfWeek; // Mengembalikan nama hari
  }
};
