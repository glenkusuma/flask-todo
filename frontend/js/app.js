// Konstanta dan variabel
const API_URL = 'http://127.0.0.1:5000';
const taskList = document.getElementById('task-list');
const emptyState = document.getElementById('empty-state');
const taskForm = document.getElementById('task-form');
const taskNameInput = document.getElementById('task-name');
const taskCountSpan = document.getElementById('task-count');
const filterSelect = document.getElementById('filter-tasks');
const editModal = document.getElementById('edit-modal');
const editForm = document.getElementById('edit-form');
const editTaskIdInput = document.getElementById('edit-task-id');
const editTaskNameInput = document.getElementById('edit-task-name');
const editTaskCompletedInput = document.getElementById('edit-task-completed');
const cancelEditButton = document.getElementById('cancel-edit');

// Selektor untuk modal hapus
const deleteModal = document.getElementById('delete-modal');
const confirmDeleteButton = document.getElementById('confirm-delete');
const cancelDeleteButton = document.getElementById('cancel-delete');

let taskToDelete = null; // Menyimpan ID tugas yang akan dihapus

let tasks = [];
let currentFilter = 'all';

// Fungsi utilitas untuk menampilkan error
function showError(message) {
    console.error(message);
    // Implementasi notifikasi error bisa ditambahkan di sini
}

// Pengambilan data dari API
async function fetchTasks() {
    try {
        const response = await fetch(`${API_URL}/tasks`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        tasks = await response.json();
        updateTaskCount();
        renderTasks();
    } catch (error) {
        showError(`Gagal mengambil tugas: ${error.message}`);
    }
}

// Tambah tugas baru
async function addTask(name) {
    try {
        const response = await fetch(`${API_URL}/tasks`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, completed: false }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const newTask = await response.json();
        tasks.push(newTask);
        updateTaskCount();
        renderTasks();

        // Animasi sederhana untuk tugas baru
        setTimeout(() => {
            const newTaskElement = document.querySelector(`[data-task-id="${newTask.id}"]`);
            if (newTaskElement) {
                newTaskElement.classList.add('animate__animated', 'animate__pulse');
            }
        }, 100);

    } catch (error) {
        showError(`Gagal menambahkan tugas: ${error.message}`);
    }
}

// Ubah status tugas
async function toggleTaskStatus(id, completed) {
    try {
        const response = await fetch(`${API_URL}/tasks/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ completed }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const updatedTask = await response.json();
        tasks = tasks.map(task => task.id === id ? updatedTask : task);
        renderTasks();

    } catch (error) {
        showError(`Gagal mengubah status tugas: ${error.message}`);
    }
}

// Update tugas
async function updateTask(id, name, completed) {
    try {
        const response = await fetch(`${API_URL}/tasks/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, completed }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const updatedTask = await response.json();
        tasks = tasks.map(task => task.id === id ? updatedTask : task);
        renderTasks();

        // Animasi untuk tugas yang diperbarui
        setTimeout(() => {
            const updatedTaskElement = document.querySelector(`[data-task-id="${id}"]`);
            if (updatedTaskElement) {
                updatedTaskElement.classList.add('animate__animated', 'animate__pulse');
            }
        }, 100);

    } catch (error) {
        showError(`Gagal memperbarui tugas: ${error.message}`);
    }
}

// Hapus tugas
async function deleteTask(id) {
    try {
        // Animasi untuk tugas yang akan dihapus
        const taskElement = document.querySelector(`[data-task-id="${id}"]`);
        if (taskElement) {
            taskElement.classList.add('animate__animated', 'animate__fadeOutRight');
            // Tunggu animasi selesai sebelum menghapus dari DOM
            await new Promise(resolve => setTimeout(resolve, 500));
        }

        const response = await fetch(`${API_URL}/tasks/${id}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        tasks = tasks.filter(task => task.id !== id);
        updateTaskCount();
        renderTasks();

    } catch (error) {
        showError(`Gagal menghapus tugas: ${error.message}`);
    }
}

// Buka modal edit
function openEditModal(task) {
    editTaskIdInput.value = task.id;
    editTaskNameInput.value = task.name;
    editTaskCompletedInput.checked = task.completed;
    editModal.classList.remove('hidden');
}

// Tutup modal edit
function closeEditModal() {
    const modalContent = editModal.querySelector('.animate__animated');

    // Add the "animate out" class
    modalContent.classList.remove('animate__fadeInDown');
    modalContent.classList.add('animate__fadeOutUp');

    // Wait for the animation to complete before hiding the modal
    modalContent.addEventListener('animationend', () => {
        editModal.classList.add('hidden');
        modalContent.classList.remove('animate__fadeOutUp');
        modalContent.classList.add('animate__fadeInDown'); // Reset for next open
    }, { once: true });
}

// Menutup modal hapus dengan animasi
function closeDeleteModal() {
    const modalContent = deleteModal.querySelector('.animate__animated');

    // Tambahkan kelas animasi "animate out"
    modalContent.classList.remove('animate__fadeInDown');
    modalContent.classList.add('animate__fadeOutUp');

    // Tunggu hingga animasi selesai sebelum menyembunyikan modal
    modalContent.addEventListener('animationend', () => {
        deleteModal.classList.add('hidden');
        modalContent.classList.remove('animate__fadeOutUp');
        modalContent.classList.add('animate__fadeInDown'); // Reset untuk pembukaan berikutnya
        taskToDelete = null; // Reset ID tugas
    }, { once: true });
}

// Membuka modal hapus
function openDeleteModal(taskId) {
    taskToDelete = taskId; // Simpan ID tugas
    const modalContent = deleteModal.querySelector('.animate__animated');
    modalContent.classList.remove('animate__fadeOutUp'); // Pastikan animasi "out" dihapus
    modalContent.classList.add('animate__fadeInDown'); // Tambahkan animasi "in"
    deleteModal.classList.remove('hidden');
}

// Update jumlah tugas
function updateTaskCount() {
    const filteredTasks = filterTasks(tasks, currentFilter);
    taskCountSpan.textContent = `${filteredTasks.length} tugas`;
}

// Filter tugas berdasarkan status
function filterTasks(tasksArray, filter) {
    switch (filter) {
        case 'active':
            return tasksArray.filter(task => !task.completed);
        case 'completed':
            return tasksArray.filter(task => task.completed);
        default:
            return tasksArray;
    }
}

// Render daftar tugas
function renderTasks() {
    const filteredTasks = filterTasks(tasks, currentFilter);

    // Tampilkan atau sembunyikan pesan kosong
    if (filteredTasks.length === 0) {
        emptyState.classList.remove('hidden');
    } else {
        emptyState.classList.add('hidden');
    }

    // Bersihkan daftar tugas kecuali empty state
    Array.from(taskList.children).forEach(child => {
        if (child.id !== 'empty-state') {
            taskList.removeChild(child);
        }
    });

    // Render setiap tugas
    filteredTasks.forEach(task => {
        const taskCard = document.createElement('div');
        taskCard.className = `task-card ${task.completed ? 'task-card-complete' : 'task-card-incomplete'}`;
        taskCard.setAttribute('data-task-id', task.id);

        taskCard.innerHTML = /*HTML*/`
            <div class="flex items-center justify-between">
                <div class="flex items-center space-x-3">
                    <input type="checkbox" class="task-checkbox h-5 w-5" ${task.completed ? 'checked' : ''}>
                    <p class="text-gray-800 ${task.completed ? 'line-through text-gray-500' : ''}">
                        ${task.name}
                    </p>
                </div>
                <div class="flex space-x-2">
                    <button class="edit-btn p-2 text-blue-500 hover:text-blue-700">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                        </svg>
                    </button>
                    <button class="delete-btn p-2 text-red-500 hover:text-red-700">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
                        </svg>
                    </button>
                </div>
            </div>
        `;

        // Event listener untuk checkbox
        const checkbox = taskCard.querySelector('.task-checkbox');
        checkbox.addEventListener('change', () => {
            toggleTaskStatus(task.id, checkbox.checked);
        });

        // Event listener untuk tombol edit
        const editButton = taskCard.querySelector('.edit-btn');
        editButton.addEventListener('click', () => {
            openEditModal(task);
        });

        // Event listener untuk tombol hapus
        const deleteButton = taskCard.querySelector('.delete-btn');
        deleteButton.addEventListener('click', () => {
            openDeleteModal(task.id);
        });

        taskList.appendChild(taskCard);
    });
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Ambil tugas saat halaman dimuat
    fetchTasks();

    // Form tambah tugas
    taskForm.addEventListener('submit', e => {
        e.preventDefault();
        const taskName = taskNameInput.value.trim();
        if (taskName) {
            addTask(taskName);
            taskNameInput.value = '';
        }
    });

    // Filter
    filterSelect.addEventListener('change', () => {
        currentFilter = filterSelect.value;
        updateTaskCount();
        renderTasks();
    });

    // Form edit tugas
    editForm.addEventListener('submit', e => {
        e.preventDefault();
        const id = parseInt(editTaskIdInput.value);
        const name = editTaskNameInput.value.trim();
        const completed = editTaskCompletedInput.checked;

        if (name) {
            updateTask(id, name, completed);
            closeEditModal();
        }
    });

    // Tombol batal edit
    cancelEditButton.addEventListener('click', closeEditModal);

    // Tutup modal jika klik di luar
    editModal.addEventListener('click', e => {
        if (e.target === editModal) {
            closeEditModal();
        }
    });

    // Tutup modal dengan tombol Escape
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && !editModal.classList.contains('hidden')) {
            closeEditModal();
        }
    });

    // Konfirmasi hapus
    confirmDeleteButton.addEventListener('click', () => {
        if (taskToDelete !== null) {
            deleteTask(taskToDelete); // Panggil fungsi deleteTask
            closeDeleteModal();
        }
    });

    // Membatalkan hapus
    cancelDeleteButton.addEventListener('click', closeDeleteModal);

    // Menutup modal jika klik di luar modal
    deleteModal.addEventListener('click', e => {
        if (e.target === deleteModal) {
            closeDeleteModal();
        }
    });

    // Menutup modal dengan tombol Escape
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && !deleteModal.classList.contains('hidden')) {
            closeDeleteModal();
        }
    });
});
