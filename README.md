# Sistem Manajemen Armada

Aplikasi ini adalah sistem manajemen armada yang sederhana yang dibangun menggunakan Vite, JavaScript, dan Tailwind CSS. Tujuannya untuk menampilkan data data kendaraan yang sedang aktif beserta melihat rute rute yang sedang dijalankan oleh kendaraan tersebut


---

## Cara Menjalankan Aplikasi

**Pastikan kamu sudah install Node.js di perangkatmu**

1. Clone Repository ini:

```bash

git clone https://github.com/DawnProspect/public-transport-management

```

2. Di dalam terminal, change directory ke transport-management (folder aplikasi):

```bash

cd transport-management

```

3. Install seluruh dependency

```bash

npm install

```

4. Jalankan aplikasi

```bash

npm run dev

```

5. Jika semua aplikasi sudah berjalan dengan benar dan dependency terinstall dengan baik, maka link localhost akan muncul di terminal. Buka link tersebut di dalam browser. Contoh sebagai berikut:

```bash

http://localhost:5173

```

---

## Fitur yang dikerjakan

1. Mengambil data kendaraan dari api-v3-mbti (sudah)
2. Menampilkan data kendaraan dalam bentuk Card dan memiliki Pagination (sudah)
3. Menyediakan filter kendaraan berdasarkan Rute dan Trip (Komponen dikerjakan namun tidak bekerja sempurna)
4. Menampilkan detail kendaraan

## Data Vehicle Card

1. Attribut Label Kendaraan
2. Status saat ini
3. Latitude dan Longtitude
4. Waktu update terakhir


## Detail kendaraan popup

1. attribute
2. Status saat ini
3. Latitude dan longtitude
4. Waktu update terakhir
5. Data rute
6. Data Trip

---


## Arsitektur/Struktur Proyek

Aplikasi ini menggunakan struktur file standar Vite dengan JavaScript sebagai berikut:

1. src/components/
- Pagination.jsx  (Komponen utama untuk navigasi halaman pagination)
- RouteTripFilter.jsx (Komponen utama filter berdasarakan trip dan rute)
- VehicleCard.jsx (Komponen utama menunjukan data kendaraan dalam bentuk card)

2. config/
- axiosinstance.js (Bertanggung jawab untuk menghubungkan backend dengan bantuan Axios)

3. pages/
- AllVehicles.jsx (Halaman utama yang akan menunjukan semua komponen maupun list data kendaraan dari backend)


## Tech Stack Yang Digunakan

- Vite - Dev server bundler modern
- JavaScript
- React JS
- Tailwind CSS
- HTML dan CSS

## Package yang digunakan

- Axios
- tailwindcss
- react
- react-router-dom
- sweetalert2
- leaflet (terinstall tetapi tidak digunakan)


## Persyaratan yang belum dikerjakan

1. Setiap halaman/popup harus ada indicator loading ketika fetching data
2. (Bonus) Menggunakan TypeScript
3. (Bonus) Menampilkan posisi kendaraan dalam peta menggunakan Leaflet
4. Beberapa fitur filter Rute dan Trip tidak bekerja