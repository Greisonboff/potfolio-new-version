// Defina as informações do repositório e do arquivo
const owner = 'Greisonboff'; // Substitua pelo nome do proprietário do repositório
const repo = 'teste-json'; // Substitua pelo nome do repositório
const pathToFile = 'teste.json'; // Substitua pelo caminho para o arquivo JSON
const token = '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'; // Substitua pelo seu token de acesso pessoal

// Construa a URL da API do GitHub
const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${pathToFile}`;

// Faça uma solicitação GET para obter o conteúdo atual do arquivo
const xhr = new XMLHttpRequest();
xhr.open('GET', apiUrl, true);
xhr.setRequestHeader('Authorization', `token ${token}`);

xhr.onreadystatechange = function () {
  if (xhr.readyState === 4) {
    if (xhr.status === 200) {
      const response = JSON.parse(xhr.responseText);
      const currentContent = JSON.parse(decodeURIComponent(escape(atob(response.content))));
 console.log(currentContent)
 
      // Modifique o conteúdo do arquivo conforme necessário
      currentContent[currentContent.length+1] = 'novo-valor 2';
      console.log(currentContent)
      // Construa os dados para a atualização
      const newData = {
        message: 'Atualização do arquivo JSON',
        content: btoa(unescape(encodeURIComponent(JSON.stringify(currentContent)))),
        sha: response.sha // Inclua o SHA atual do arquivo
      };

      // Faça uma solicitação PUT para atualizar o arquivo
      const updateXhr = new XMLHttpRequest();
      updateXhr.open('PUT', apiUrl, true);
      updateXhr.setRequestHeader('Authorization', `token ${token}`);
      updateXhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');

      updateXhr.onreadystatechange = function () {
        if (updateXhr.readyState === 4) {
          if (updateXhr.status === 200) {
            console.log('Arquivo JSON atualizado com sucesso:', JSON.parse(updateXhr.responseText));
          } else {
            console.error('Erro ao atualizar o arquivo JSON:', updateXhr.status, updateXhr.statusText);
          }
        }
      };

      updateXhr.send(JSON.stringify(newData));
    } else {
      console.error('Erro ao buscar o arquivo JSON:', xhr.status, xhr.statusText);
    }
  }
};

xhr.send();
