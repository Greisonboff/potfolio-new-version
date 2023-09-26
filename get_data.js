
// Defina as informações do repositório e do arquivo
const owner = 'Greisonboff'; // Substitua pelo nome do proprietário do repositório
const repo = 'teste-json'; // Substitua pelo nome do repositório
const pathToFile = 'teste.json'; // Substitua pelo caminho para o arquivo JSON

const token = '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'; // Substitua pelo seu token de acesso
const url = 'https://api.github.com/repos/Greisonboff/data-center/contents/certificate.json'; // Substitua pela URL apropriada

fetch(url, {
  headers: {
    'Authorization': `Bearer ${token}`
  }
})
.then(response => {
  if (response.status === 200) {
    return response.json();
  } else {
    throw new Error('Erro ao buscar o arquivo');
  }
})
.then(data => {
  // O conteúdo do arquivo estará em data.content, que será codificado em base64
  const content = atob(data.content);
  console.log(content);
})
.catch(error => {
  console.error(error);
});
