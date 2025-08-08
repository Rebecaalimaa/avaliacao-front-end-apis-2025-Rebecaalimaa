// /scripts/posts.js

document.addEventListener('DOMContentLoaded', () => {
  const token = localStorage.getItem('authToken');
  if (!token) {
    window.location.href = 'login.html';
  }

  const logoutBtn = document.getElementById('logoutBtn');
  const postsContainer = document.getElementById('postsContainer');
  const searchInput = document.getElementById('searchInput');

  const modal = document.getElementById('postModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalBody = document.getElementById('modalBody');
  const closeBtn = document.querySelector('.close-btn');

  let posts = [];

  logoutBtn.addEventListener('click', () => {
    localStorage.clear();
    window.location.href = 'login.html';
  });

  closeBtn.addEventListener('click', () => {
    modal.classList.add('hidden');
  });

  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.add('hidden');
    }
  });

  async function carregarPosts() {
    try {
      const res = await fetch('https://jsonplaceholder.typicode.com/posts');
      posts = await res.json();
      mostrarPosts(posts);
    } catch (error) {
      postsContainer.innerHTML = '<p>Erro ao carregar os posts.</p>';
    }
  }

  function mostrarPosts(lista) {
    postsContainer.innerHTML = '';
    lista.forEach(post => {
      const card = document.createElement('div');
      card.classList.add('post-card');
      card.innerHTML = `
        <h3>${post.title}</h3>
        <button class="verDetalhes" data-id="${post.id}">Ver detalhes</button>
      `;
      postsContainer.appendChild(card);
    });

    // Eventos de clique nos botões
    document.querySelectorAll('.verDetalhes').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.target.dataset.id;
        const post = posts.find(p => p.id == id);
        if (post) {
          modalTitle.textContent = post.title;
          modalBody.textContent = post.body;
          modal.classList.remove('hidden');
        }
      });
    });
  }

  searchInput.addEventListener('input', () => {
    const termo = searchInput.value.toLowerCase();
    const filtrados = posts.filter(post =>
      post.title.toLowerCase().includes(termo)
    );
    mostrarPosts(filtrados);
  });

  carregarPosts();
});
