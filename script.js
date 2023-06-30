// Capturar elementos do formulário e da lista de livros
const bookForm = document.getElementById('book-form');
const titleInput = document.getElementById('title');
const authorInput = document.getElementById('author');
const publicationDateInput = document.getElementById('publication-date');
const bookList = document.getElementById('book-list-body');
const nullMessage = document.getElementById('null');

const library = []; // Array para armazenar os livros

// Função para cadastrar um livro
function cadastrarLivro(event) {
  event.preventDefault();

  // Obter os valores dos campos de entrada
  const title = titleInput.value;
  const author = authorInput.value;
  const publicationDate = publicationDateInput.value;

  // Criar um objeto de livro
  const book = { title, author, publicationDate };

  // Adicionar o livro ao array de livros
  library.push(book);

  // Limpar os campos de entrada
  titleInput.value = '';
  authorInput.value = '';
  publicationDateInput.value = '';

  // Atualizar a lista de livros
  atualizarListaLivros();

  // Salvar os livros no Local Storage
  saveLocalStorage();
}

// Função para atualizar a lista de livros na tabela
function atualizarListaLivros() {
  // Limpar a lista de livros
  bookList.innerHTML = '';

  // Verificar se há livros para exibir
  if (library.length === 0) {
    nullMessage.style.display = 'block';
    return;
  }

  nullMessage.style.display = 'none';

  // Ordenar a lista de livros pelo critério selecionado
  const sortBy = document.getElementById('sort-by').value;
  library.sort((a, b) => a[sortBy].localeCompare(b[sortBy]));

  // Criar as linhas da tabela com os livros
  library.forEach((book) => {
    const row = document.createElement('tr');
    const titleCell = document.createElement('td');
    const authorCell = document.createElement('td');
    const publicationDateCell = document.createElement('td');
    const actionsCell = document.createElement('td');

    titleCell.textContent = book.title;
    authorCell.textContent = book.author;
    publicationDateCell.textContent = book.publicationDate;

    const editButton = document.createElement('button');
    editButton.textContent = 'Editar';
    editButton.classList.add('edit-button');
    editButton.addEventListener('click', () => editarLivro(book));

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Excluir';
    deleteButton.classList.add('delete-button');
    deleteButton.addEventListener('click', () => excluirLivro(book));

    actionsCell.appendChild(editButton);
    actionsCell.appendChild(deleteButton);

    row.appendChild(titleCell);
    row.appendChild(authorCell);
    row.appendChild(publicationDateCell);
    row.appendChild(actionsCell);

    bookList.appendChild(row);
  });
}

  // Função para exibir os elementos da lista de livros
  function showBookListElements() {
    bookListContainer.style.display = "block"; // Exibe o container da lista de livros
    document.querySelector("h2.listagem").style.display = "block"; // Exibe o título da lista
    document.querySelector("p").style.display = "block"; // Exibe a mensagem de instrução
  }

  // Função para renderizar a lista de livros
  function renderBookList() {
    const sortBy = sortBySelect.value; // Obtém a opção de classificação selecionada
    let sortedBooks = [...library]; // Cria uma cópia do array de livros

    // Ordena os livros com base na opção de classificação selecionada
    if (sortBy === "title") {
      sortedBooks.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === "publication-date") {
      sortedBooks.sort(
        (a, b) => new Date(a.publicationDate) - new Date(b.publicationDate)
      );
    }

    const bookListBody = document.getElementById("book-list-body");
    bookListBody.innerHTML = "";

    // Itera sobre os livros ordenados e cria as células da tabela
    sortedBooks.forEach(function (book, index) {
      const row = document.createElement("tr");
      const titleCell = document.createElement("td");
      const authorCell = document.createElement("td");
      const publicationDateCell = document.createElement("td");
      const actionCell = document.createElement("td");
      const editButton = document.createElement("button");
      const deleteButton = document.createElement("button");

      // Preenche as células com os dados do livro
      titleCell.textContent = book.title;
      authorCell.textContent = book.author;
      publicationDateCell.textContent = book.publicationDate;
      editButton.textContent = "Editar";
      deleteButton.textContent = "Remover";

      // Adiciona classes aos botões para estilização
      editButton.classList.add("edit-button");
      deleteButton.classList.add("delete-button");

      // Evento de clique para editar o livro
      editButton.addEventListener("click", function () {
        editBook(index);
      });

      // Evento de clique para remover o livro
      deleteButton.addEventListener("click", function () {
        deleteBook(index);
      });

      // Adiciona os botões à célula de ação
      actionCell.appendChild(editButton);
      actionCell.appendChild(deleteButton);

      // Adiciona as células à linha da tabela
      row.appendChild(titleCell);
      row.appendChild(authorCell);
      row.appendChild(publicationDateCell);
      row.appendChild(actionCell);

      // Adiciona a linha à tabela
      bookListBody.appendChild(row);
    });
  }

  // Função para editar um livro
  function editBook(index) {
    const book = library[index];
    const titleInput = document.getElementById("title");
    const authorInput = document.getElementById("author");
    const publicationDateInput = document.getElementById("publication-date");

    // Preenche os campos do formulário com os dados do livro selecionado para edição
    titleInput.value = book.title;
    authorInput.value = book.author;
    publicationDateInput.value = book.publicationDate;

    // Remove o livro do array e renderiza a lista de livros novamente
    library.splice(index, 1);
    renderBookList();
  }

  // Função para remover um livro
  function deleteBook(index) {
    // Remove o livro do array e renderiza a lista de livros novamente
    library.splice(index, 1);
    renderBookList();
  }
;

