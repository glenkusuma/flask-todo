
# flask-todo

## Pendahuluan

API (Application Programming Interface) memungkinkan komunikasi antar aplikasi dengan aturan tertentu. REST API mengikuti prinsip REST untuk menciptakan sistem yang skalabel dan mudah dikelola. Dalam tutorial ini, kita akan menggunakan:

- **Flask**: Framework web Python yang ringan.
- **Flask-RESTful**: Ekstensi untuk membangun REST API.
- **SQLAlchemy**: ORM untuk mengelola database.
- **Flask-Marshmallow**: Alat untuk validasi dan serialisasi data.

API ini akan mendukung operasi CRUD (Create, Read, Update, Delete) untuk daftar tugas.

## Persiapan Lingkungan

### Persyaratan
- Python 3.8 atau lebih tinggi
- Pip (pengelola paket Python)
- Virtualenv (opsional, tetapi direkomendasikan)

### Membuat Lingkungan Virtual (Opsional)
Isolasi dependensi proyek dengan lingkungan virtual:

```bash
# Membuat lingkungan virtual
python -m venv venv

# Mengaktifkan lingkungan virtual
# Windows
venv\Scripts\activate
# macOS/Linux
source venv/bin/activate
```

### Menginstal Dependensi

Instal dependensi:

```bash
pip install -r requirements.txt
```

---

## Struktur Proyek 

```
todo-api/
├── app.py            # Inisialisasi aplikasi dan integrasi komponen
├── models.py         # Definisi model database
├── schemas.py        # Skema untuk validasi dan serialisasi
├── resources.py      # Logika endpoint API
├── config.py         # Konfigurasi aplikasi
├── requirements.txt  # Daftar dependensi
└── venv/             # Lingkungan virtual (tidak disertakan di repositori)
```

### Penjelasan Struktur
- **`app.py`**: Menginisialisasi Flask dan menghubungkan modul.
- **`models.py`**: Model database untuk tugas.
- **`schemas.py`**: Skema validasi dan serialisasi data.
- **`resources.py`**: Logika endpoint untuk operasi CRUD.
- **`config.py`**: Pengaturan aplikasi seperti koneksi database.

- Menghubungkan semua modul dan menjalankan aplikasi di `http://127.0.0.1:5000`.

## Menjalankan Aplikasi

Jalankan aplikasi dengan:

```bash
python app.py
```

## Menguji API

Gunakan cURL atau Postman untuk menguji, 
<p> jika di cmd :

- **Membuat Tugas:**
```bash
curl -X POST http://127.0.0.1:5000/tasks -H "Content-Type: application/json" -d "{\"name\": \"Belajar Flask\", \"completed\": false}"
```
jika di PowerShell :

```powershell
Invoke-WebRequest -Uri http://127.0.0.1:5000/tasks -Method POST -Headers @{ "Content-Type" = "application/json" } -Body '{"name": "Belajar Flask", "completed": false}'
```

kemudian kunjungi http://127.0.0.1:5000/tasks 
- **Mendapatkan Semua Tugas:**
```bash
curl -X GET http://127.0.0.1:5000/tasks
```

- **Mendapatkan Tugas Berdasarkan ID:**
```bash
curl -X GET http://127.0.0.1:5000/tasks/1
```

- **Memperbarui Tugas:**
```bash
curl -X PUT http://127.0.0.1:5000/tasks/1 -H "Content-Type: application/json" -d "{\"completed\": true}"
```

- **Menghapus Tugas:**
```bash
curl -X DELETE http://127.0.0.1:5000/tasks/1
```

## Dokumentasi API dengan Postman

Untuk mempermudah pengujian API, kami telah menyediakan koleksi Postman yang dapat diimpor. Koleksi ini mencakup semua endpoint yang tersedia dalam API ini.

### Langkah-langkah Menggunakan Koleksi Postman

1. Unduh file koleksi Postman dari direktori `docs/`:
   - [todo_api.postman_collection.json](docs/todo_api.postman_collection.json)

2. Buka aplikasi Postman.

3. Pilih menu **File > Import**.

4. Pilih file `todo_api.postman_collection.json` yang telah diunduh.

5. Setelah impor selesai, Anda dapat langsung menggunakan koleksi untuk menguji API.

### Endpoint yang Tersedia

Koleksi Postman mencakup endpoint berikut:
- **Membuat Tugas**: `POST /tasks`
- **Mendapatkan Semua Tugas**: `GET /tasks`
- **Mendapatkan Tugas Berdasarkan ID**: `GET /tasks/{id}`
- **Memperbarui Tugas**: `PUT /tasks/{id}`
- **Menghapus Tugas**: `DELETE /tasks/{id}`

