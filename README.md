# flask-todo

## Pendahuluan

API (Application Programming Interface) memungkinkan komunikasi antar aplikasi dengan aturan tertentu. REST API mengikuti prinsip REST untuk menciptakan sistem yang skalabel dan mudah dikelola.

Proyek ini adalah aplikasi ToDo sederhana yang terdiri dari dua bagian utama: **Backend** dan **Frontend**.

### Backend
Backend dibangun menggunakan Python dengan framework Flask. Backend ini menyediakan REST API untuk mendukung operasi CRUD (Create, Read, Update, Delete) pada daftar tugas. Berikut adalah paket-paket yang digunakan untuk backend, seperti yang tercantum dalam file `requirements.txt`:
- **Flask**: Framework web Python yang ringan.
- **Flask-RESTful**: Ekstensi untuk membangun REST API.
- **Flask-SQLAlchemy**: ORM untuk mengelola database.
- **Flask-Marshmallow**: Alat untuk validasi dan serialisasi data.
- **marshmallow**: Library untuk serialisasi dan validasi data.
- **marshmallow-sqlalchemy**: Ekstensi untuk integrasi Marshmallow dengan SQLAlchemy.
- **Flask-CORS**: Untuk mengaktifkan Cross-Origin Resource Sharing (CORS).

### Frontend
Frontend dibangun menggunakan HTML, JavaScript, dan Tailwind CSS untuk memberikan antarmuka pengguna yang modern dan responsif. Berikut adalah teknologi yang digunakan untuk frontend:
- **HTML**: Struktur dasar halaman web.
- **JavaScript**: Untuk interaksi dinamis dengan API backend.
- **Tailwind CSS**: Framework CSS untuk mendesain antarmuka pengguna yang modern dan responsif.
- **Animate.css**: Library untuk menambahkan animasi sederhana pada elemen UI.

Dengan kombinasi backend dan frontend ini, aplikasi dapat menangani operasi CRUD pada daftar tugas dengan antarmuka pengguna yang menarik dan fungsional.

## Persiapan Lingkungan

### Persyaratan
- Python 3.8 atau lebih tinggi
- Pip (pengelola paket Python)
- Virtualenv (opsional, tetapi direkomendasikan)
- pipenv (opsional)

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

## Instalasi di Arch Linux Menggunakan Pipenv

### Menginstal Pipenv
Untuk menginstal `pipenv` di Arch Linux, gunakan perintah berikut:

```bash
sudo pacman -S python-pipenv
```

### Menginstal Dependensi
Setelah `pipenv` terinstal, navigasikan ke direktori proyek dan jalankan:

```bash
pipenv install -r requirements.txt
```

Perintah ini akan membuat virtual environment baru di lokasi seperti berikut:

```
/home/{user}/.local/share/virtualenvs/flask-todo-{hash}/
```

**Contoh Output:**

```plaintext
➜  flask-todo git:(main) ✗ pipenv install -r requirements.txt
requirements.txt found in /home/user/repo/flask-todo instead of Pipfile! Converting...
✔ Success!
Warning: Your Pipfile now contains pinned versions, if your requirements.txt did. 
We recommend updating your Pipfile to specify the "*" version, instead.
Pipfile.lock not found, creating...
Locking [packages] dependencies...
Building requirements...
Resolving dependencies...
✔ Success!
Locking [dev-packages] dependencies...
Updated Pipfile.lock (34c61ad0ccd75553a4e1bec887defc3567f5b3eecadcd95c74a0664427c774f5)!
To activate this project's virtualenv, run pipenv shell.
Alternatively, run a command inside the virtualenv with pipenv run.
Requirements file provided! Importing into Pipfile...
Installing dependencies from Pipfile.lock (c774f5)...
```

### Mengaktifkan Virtual Environment
Untuk mengaktifkan virtual environment, jalankan:

```bash
pipenv shell
```

**Contoh Output:**

```plaintext
➜  flask-todo git:(main) ✗ pipenv shell                      
Launching subshell in virtual environment...
source /home/user/.local/share/virtualenvs/flask-todo-oWA035NF/bin/activate
```

### Mengatur VS Code untuk Menggunakan Virtual Environment
1. **Cari Path Interpreter Python:**
   Setelah virtual environment diaktifkan, catat path interpreter Python. Contohnya:

   ```
   /home/user/.local/share/virtualenvs/flask-todo-oWA035NF/bin/python
   ```

2. **Atur Interpreter di VS Code:**
   - Buka Command Palette di VS Code (`Ctrl+Shift+P`).
   - Cari `Python: Select Interpreter`.
   - Pilih path interpreter untuk virtual environment (contoh: `/home/user/.local/share/virtualenvs/flask-todo-oWA035NF/bin/python`).

3. **Verifikasi Konfigurasi:**
   Buka terminal di VS Code dan pastikan virtual environment aktif. Ketika fokus file di python, pastikan interpreter yang di pakai di status bar (bawah kanan) menunjukan envioment yang sesuai (contoh: `(flask-todo-oWA035NF)`).

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

# Menjalankan Aplikasi

## Menjalankan Backend

1. **Navigasi ke Direktori Backend**:
   Pindah ke direktori `backend` tempat file `app.py` berada:

   ```bash
   cd backend
   ```

2. **Aktifkan Virtual Environment**:
   Aktifkan virtual environment yang telah dibuat sebelumnya. Contoh:

   - **macOS/Linux**:
     ```bash
     source ../venv/bin/activate
     ```

   - **Windows (Command Prompt)**:
     ```cmd
     ..\venv\Scripts\activate
     ```

   - **Windows (PowerShell)**:
     ```powershell
     ..\venv\Scripts\Activate
     ```

3. **Jalankan Backend**:
   Jalankan aplikasi Flask:

   ```bash
   python app.py
   ```

   Backend akan berjalan di `http://127.0.0.1:5000`.

---

## Menjalankan Frontend

1. **Navigasi ke Direktori Frontend**:
   Pindah ke direktori `frontend` tempat file `index.html` berada:

   ```bash
   cd ../frontend
   ```

2. **Jalankan HTTP Server**:
   Jalankan server HTTP menggunakan Python:

   ```bash
   python -m http.server 8000
   ```

   Frontend akan tersedia di `http://127.0.0.1:8000`.

Dengan langkah-langkah ini, kamu dapat menjalankan backend dan frontend secara bersamaan. Akses aplikasi melalui browser dengan membuka `http://127.0.0.1:8000` untuk frontend, yang akan berkomunikasi dengan backend di `http://127.0.0.1:5000`.

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

5. Setelah impor selesai, kamu dapat langsung menggunakan koleksi untuk menguji API.

### Endpoint yang Tersedia

Koleksi Postman mencakup endpoint berikut:
- **Membuat Tugas**: `POST /tasks`
- **Mendapatkan Semua Tugas**: `GET /tasks`
- **Mendapatkan Tugas Berdasarkan ID**: `GET /tasks/{id}`
- **Memperbarui Tugas**: `PUT /tasks/{id}`
- **Menghapus Tugas**: `DELETE /tasks/{id}`



