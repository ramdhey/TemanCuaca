export const Convert24Jam = time12h => {
  // Periksa jika time12h tidak terdefinisi atau bukan string
  if (typeof time12h !== 'string' || !time12h) {
    console.error('Convert24Jam called with invalid argument:', time12h);
    return ''; // Kembalikan string kosong atau nilai default lainnya
  }

  // Mencoba memisahkan bagian waktu dan AM/PM
  const parts = time12h.split(' ');
  if (parts.length < 2) {
    console.error('Invalid time format:', time12h);
    return ''; // Format waktu tidak valid
  }

  const [time, modifier] = parts;
  let [hours, minutes] = time.split(':');

  // Periksa jika jam atau menit tidak valid
  if (isNaN(parseInt(hours, 10)) || isNaN(parseInt(minutes, 10))) {
    console.error('Invalid time value:', time12h);
    return ''; // Nilai waktu tidak valid
  }

  if (hours === '12') {
    hours = '00';
  }

  if (modifier === 'PM') {
    hours = parseInt(hours, 10) + 12;
    // Jika hasilnya 24, ubah kembali ke '00' untuk format 24 jam
    if (hours === 24) {
      hours = '00';
    }
  }

  return `${hours}:${minutes}`;
};
