import { GreetingCardData } from '../types';

export const INITIAL_GREETING_DATA: GreetingCardData = {
  recipientName: 'Sahabatku Tersayang',
  senderName: 'Teman Seperjuanganmu',
  schoolName: 'Masa Putih Abu-Abu (2023 - 2026)',
  letterHeadline: 'Terima Kasih Sudah Menjadi Bagian Terindah di Masa SMA-ku',
  letterContent: `Untukmu yang selalu ada di setiap langkah perjalananku...

Masih teringat jelas hari pertama kita bertemu di tahun 2023. Saat itu kita masih sama-sama canggung mengenakan seragam putih abu-abu baru, bingung mencari ruang kelas, dan ragu menyapa satu sama lain. Siapa sangka, dari tegur sapa sederhana itu, lahirlah persahabatan paling berharga dalam hidupku.

Terima kasih yang tak terhingga karena telah mempercayaiku sebagai teman, tempat berkeluh kesah, dan teman berbagi mimpi. Melewati tiga tahun masa SMA—dari tahun 2023 hingga 2026 ini—bukanlah perjalanan yang selalu mulus. Kita telah melewati begitu banyak suka dan duka bersama: tertawa lepas saat jam kosong, panik bersama saat tugas mendadak, makan mie ayam dan es teh di kantin sepulang sekolah, hingga saling menguatkan di kala ujian dan masa-masa terberat.

Kehadiranmu membuat masa-masa SMA yang melelahkan terasa begitu ringan dan penuh warna. Kamu adalah sosok yang selalu mendengarkan tanpa menghakimi, yang selalu siap mengulurkan tangan ketika aku hampir menyerah.

Kini saat kita berdiri di gerbang kelulusan tahun 2026, langkah kita mungkin akan membawa kita ke jalan dan cita-cita yang berbeda. Namun satu hal yang pasti: semua kenangan, tawa, dan air mata yang kita bagi bersama akan abadi tersimpan di hatiku.

Terima kasih sudah menjadi sahabat terbaikku. Sukses selalu untuk semua mimpimu di masa depan!`,
  specialNote: '“Persahabatan bukan tentang siapa yang kau kenal paling lama, tetapi tentang siapa yang datang ke hidupmu dan tak pernah pergi saat badai melanda.”',
  promiseText: 'Janji kita: Walaupun nanti sudah sibuk dengan dunia masing-masing di perkuliahan atau kerja, kita harus tetap saling kabar dan luangkan waktu untuk reuni kecil!',
  lastUpdated: new Date().toISOString(),
  memories: [
    // 2023 - Kelas X (Awal Mula & Seragam Putih Abu-Abu)
    {
      id: 'mem-2023-1',
      year: 2023,
      gradeLabel: 'Kelas X • Awal Mula Putih Abu-Abu',
      title: 'Selfie Seragam Putih Abu-Abu Pertama Kali',
      dateStr: 'Tahun 2023',
      location: 'Halaman Sekolah & Area Kelas X',
      description: 'Momen awal kenalan dan kebersamaan pertama kali pakai seragam putih abu-abu lengkap dengan dasi dan badge sekolah. Masih canggung tapi langsung klop dan seru-seruan foto bareng.',
      imageUrl: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1000&q=80',
      quote: 'Awal dari sebuah cerita persahabatan putih abu-abu yang tak tergantikan.',
      rotation: -2,
      tag: 'Seragam Putih Abu-Abu',
      isFavorite: true,
    },
    {
      id: 'mem-2023-2',
      year: 2023,
      gradeLabel: 'Kelas X • Momen Seru Pertama',
      title: 'Canda Tawa & Cerita di Kantin Belakang',
      dateStr: 'November 2023',
      location: 'Kantin & Koridor Sekolah',
      description: 'Kabur ke kantin pas jam istirahat buat beli es teh manis dan jajanan favorit. Dari saling pinjam pulpen sampai akhirnya jadi sahabat tak terpisahkan.',
      imageUrl: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=1000&q=80',
      quote: 'Obrolan receh di sela jam pelajaran yang selalu bikin rindu.',
      rotation: 2,
      tag: 'Kantin Vibes',
      isFavorite: false,
    },

    // 2024 - Kelas XI (Nongkrong Santai di Gazebo & Taman)
    {
      id: 'mem-2024-1',
      year: 2024,
      gradeLabel: 'Kelas XI • Healing & Kebersamaan',
      title: 'Nongkrong Santai di Gazebo Terbuka',
      dateStr: 'Tahun 2024',
      location: 'Gazebo & Taman Luar Kelas',
      description: 'Kumpul santai bareng teman-teman di bawah saung gazebo sehabis pelajaran. Pose santai, candaan tanpa henti, dan ketawa lepas yang bikin hari-hari SMA terasa ringan.',
      imageUrl: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=1000&q=80',
      quote: 'Tempat ternyaman buat cerita apa saja tanpa perlu jaim.',
      rotation: -1,
      tag: 'Nongkrong Gazebo',
      isFavorite: true,
    },
    {
      id: 'mem-2024-2',
      year: 2024,
      gradeLabel: 'Kelas XI • Puncak Kehebohan',
      title: 'Class Meeting & Suporter Terheboh',
      dateStr: 'Juni 2024',
      location: 'Lapangan Olahraga & Area Acara',
      description: 'Suara serak teriak yel-yel buat dukung teman kelas kita. Menang kalah nggak masalah, yang penting serunya kebersamaan.',
      imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=80',
      quote: 'Sorak tawa dan teriakan yang menggema di lapangan sekolah.',
      rotation: 3,
      tag: 'Class Meeting',
      isFavorite: false,
    },

    // 2025 - Kelas XII (Malam Acara & Keakraban)
    {
      id: 'mem-2025-1',
      year: 2025,
      gradeLabel: 'Kelas XII • Malam Acara & Keakraban',
      title: 'Malam Penuh Cerita & Kebersamaan',
      dateStr: 'Tahun 2025',
      location: 'Pentas Seni / Malam Keakraban SMA',
      description: 'Momen berharga kumpul bareng di malam hari dengan outfit kompak. Di tengah padatnya tugas dan persiapan ujian akhir, kita tetap menyempatkan waktu untuk merayakan persahabatan ini.',
      imageUrl: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1000&q=80',
      quote: 'Malam boleh gelap, tapi tawa dan persahabatan kita selalu menyinari.',
      rotation: -2,
      tag: 'Malam Keakraban',
      isFavorite: true,
    },
    {
      id: 'mem-2025-2',
      year: 2025,
      gradeLabel: 'Kelas XII • Pejuang Ujian & Masa Depan',
      title: 'Belajar Bareng & Saling Menguatkan',
      dateStr: 'November 2025',
      location: 'Perpustakaan & Tempat Kumpul',
      description: 'Saat sama-sama lelah dan cemas menghadapi masa depan, kita selalu ada untuk bilang: "Tenang, kita pasti bisa lewatin ini bareng-bareng!"',
      imageUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1000&q=80',
      quote: 'Di balik setiap perjuangan, ada sahabat yang setia mendampingi.',
      rotation: 1,
      tag: 'Saling Menguatkan',
      isFavorite: false,
    },
  ],
  wishes: [
    {
      id: 'w-1',
      sender: 'Sahabatmu',
      message: 'Semoga kamu diterima di universitas impianmu! Jangan lupa kalau udah jadi orang sukses traktir makan ya!',
      date: '2026',
      emoji: '🎓',
      bgColor: 'bg-amber-100/90 text-amber-900 border-amber-300',
    },
    {
      id: 'w-2',
      sender: 'Teman Sebangku',
      message: 'Makasih udah rela contekan catatan pas aku sakit. Kamu sahabat paling tulus sedunia!',
      date: '2026',
      emoji: '💛',
      bgColor: 'bg-rose-100/90 text-rose-900 border-rose-300',
    },
    {
      id: 'w-3',
      sender: 'Patner Kantin',
      message: 'Jangan pernah berubah ya. Tetap jadi orang ceria yang selalu bikin suasana jadi hangat.',
      date: '2026',
      emoji: '✨',
      bgColor: 'bg-blue-100/90 text-blue-900 border-blue-300',
    }
  ]
};

export const CURATED_PHOTO_PRESETS = [
  {
    title: 'Suasana Kelas & Belajar',
    url: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1000&q=80',
    tag: 'Kelas'
  },
  {
    title: 'Tertawa Bersama Teman',
    url: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1000&q=80',
    tag: 'Bestie'
  },
  {
    title: 'Kelulusan & Topi Toga',
    url: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1000&q=80',
    tag: 'Graduation'
  },
  {
    title: 'Nongkrong & Ngobrol Senja',
    url: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=1000&q=80',
    tag: 'Hangout'
  },
  {
    title: 'Study Tour & Pantai',
    url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=80',
    tag: 'Liburan'
  },
  {
    title: 'Perayaan & Euforia Sekolah',
    url: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=1000&q=80',
    tag: 'Acara'
  },
  {
    title: 'Buku Tahunan & Kenangan',
    url: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1000&q=80',
    tag: 'Memori'
  },
  {
    title: 'Jalan Santai Bersama',
    url: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1000&q=80',
    tag: 'Persahabatan'
  }
];
