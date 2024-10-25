<template>
  <div class="text-center">
    <v-card-title primary-title class="mb-5 custom-title"> LIVROS DR MENELAU</v-card-title>
    <h3 class="mb-3">Buscar por nome do livro</h3>
    <v-text-field
      name="Pesquisa"
      label="Pesquisar por nome do livro"
      id="id"
      v-model="buscaLivro"
      @keydown.enter="buscarLivro"
    ></v-text-field>
    <h3>Visualizar livros na caixa</h3>
    <div class="mt-5">
      <v-btn @click="dialog = true" color="primary" class="mr-5"> Caixa Nº 1 </v-btn>
      <v-btn @click="dialog2 = true" color="primary" class="mr-5"> Caixa Nº 2 </v-btn>
      <v-btn @click="dialog3 = true" color="primary"> Caixa Nº 3 </v-btn>
    </div>

    <v-dialog v-model="dialog" width="auto">
      <v-card
        max-width="1000"
        class="overflow-y-auto"
        prepend-icon="mdi-update"
        title="LIVROS QUE EXISTEM NA CAIXA Nº 1"
      >
        <div class="dialog-content">
          <v-list class="text-center" v-for="livro in caixa1" :key="livro.nome">
            {{ livro.nome }}
            <p>Autor: {{ livro.autor }}</p>
          </v-list>
        </div>
        <template v-slot:actions>
          <v-btn block text="Ok" @click="dialog = false">Ok</v-btn>
        </template>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialog2" width="auto">
      <v-card
        max-width="1200"
        class="overflow-y-auto"
        prepend-icon="mdi-update"
        title="LIVROS QUE EXISTEM NA CAIXA Nº 2"
      >
        <div class="dialog-content">
          <v-list class="text-center" v-for="livro in caixa2" :key="livro.nome">
            {{ livro.nome }}
            <p>Autor: {{ livro.autor }}</p>
          </v-list>
        </div>
        <template v-slot:actions>
          <v-btn block text="Ok" @click="dialog2 = false">Ok</v-btn>
        </template>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialog3" width="auto">
      <v-card
        max-width="1200"
        class="overflow-y-auto"
        prepend-icon="mdi-update"
        title="LIVROS QUE EXISTEM NA CAIXA Nº 3"
      >
        <div class="dialog-content">
          <v-list class="text-center" v-for="livro in caixa3" :key="livro.nome">
            {{ livro.nome }}
            <p>Autor: {{ livro.autor }}</p>
          </v-list>
        </div>
        <template v-slot:actions>
          <v-btn block text="Ok" @click="dialog3 = false">Ok</v-btn>
        </template>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogResult" width="auto">
      <v-card max-width="1200" class="overflow-y-auto" prepend-icon="mdi-update" title="RESULTADOS">
        <div v-if="resultadoBusca.length">
          <p class="text-center">Livros encontrados:</p>
          <v-list>
            <v-list-item v-for="livro in resultadoBusca" :key="livro.nome">
              <p>
                Livro: <strong>{{ livro.nome }}</strong> <br />
                Autor: {{ livro.autor }} <br />
                Está na: <strong> {{ livro.caixas.length ? livro.caixas.join(', ') : 'Nenhuma caixa' }}</strong>
              </p>
            </v-list-item>
          </v-list>
        </div>
        <div v-else>
          <p>Nenhum livro encontrado com o nome "{{ buscaLivro }}".</p>
        </div>
        <template v-slot:actions>
          <v-btn block text="Ok" @click="dialogResult = false">Ok</v-btn>
        </template>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { caixa1, caixa2, caixa3 } from './database/livros.js'; // Inclua a caixa 3

// Função para remover acentos
function removerAcentos(str) {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

export default {
  data() {
    return {
      dialog: false,
      dialog2: false,
      dialog3: false, // Dialog para Caixa 3
      dialogResult: false,
      caixa1,
      caixa2,
      caixa3, // Adicionando a caixa 3
      buscaLivro: '',
      resultadoBusca: [],
    };
  },
  methods: {
    buscarLivro() {
      const todosLivros = [...this.caixa1, ...this.caixa2, ...this.caixa3]; // Inclui todos os livros
      const termoBusca = removerAcentos(this.buscaLivro.toLowerCase()); // Remove acentos e converte para minúsculas

      // Inicializa resultadoBusca com livros encontrados e caixas vazias
      this.resultadoBusca = [];

      // Filtra livros que contenham o termo de busca
      todosLivros.forEach(livro => {
        const caixaIndex =
          (this.caixa1.includes(livro) && 1) ||
          (this.caixa2.includes(livro) && 2) ||
          (this.caixa3.includes(livro) && 3);

        if (removerAcentos(livro.nome.toLowerCase()).includes(termoBusca)) {
          // Se o livro já está no resultado, só adiciona a caixa
          const livroResultado = this.resultadoBusca.find(item => item.nome === livro.nome);
          if (livroResultado) {
            if (!livroResultado.caixas.includes(`Caixa ${caixaIndex}`)) {
              livroResultado.caixas.push(`Caixa ${caixaIndex}`); // Adiciona a caixa se ainda não estiver na lista
            }
          } else {
            // Caso contrário, cria um novo item no resultado
            this.resultadoBusca.push({
              ...livro,
              caixas: [`Caixa ${caixaIndex}`], // Adiciona a caixa
            });
          }
        }
      });

      // Abre o modal de resultados se houver busca
      this.dialogResult = this.buscaLivro.length > 0;
    },
  },
};
</script>

<style scoped>
.dialog-content {
  max-height: 400px; /* Ajuste a altura máxima conforme necessário */
  overflow-y: auto; /* Permite a rolagem vertical */
}
.titulo {
  text-align: center;
}
.custom-title {
  background-color: black; /* Fundo preto */
  color: white; /* Texto branco */
  padding: 16px; /* Ajuste o padding se necessário */
}
</style>
