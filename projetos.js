createBoxClickProjects = (e, index) => {
    elementLiClickProjects = document.createElement('li');
    if (index == 0) {
        elementLiClickProjects.setAttribute('class', 'projectsList projectsListActive');
    } else {
        elementLiClickProjects.setAttribute('class', 'projectsList');
    }
    elementLiClickProjects.setAttribute('id', e.replaceAll(' ', '').toLowerCase());
    elementLiClickProjects.setAttribute('onclick', "showElementProject(this)");
    //elementLiClickProjects.setAttribute('onmouseover', 'showElementProject(this)');
    elementLiClickProjects.innerHTML = e;
    document.querySelector('body #box-click-projects').append(elementLiClickProjects);
}

createProjects = (e, index) => {
    var link = '';
    var linkGit = '';
    var imagens = '';
    var linkImg = '';
    if (e.link && e.link != "sem link") {
        link = `<a title="Acesse o projeto" href="${e.link}"
        target="_blank">Visualizar projeto</a>`;
    }

    if (e.link_git && e.link_git != "sem link") {
        linkGit = `<a class="acessGit" title="Acesse o projeto"
        href="${e.link_git}" target="_blank">Visualizar projeto no
        github</a>`;
    }

    if (e.link && e.link != "sem link") {
        linkImg = e.link;
    } else if (e.link_git && e.link_git != "sem link") {
        linkImg = e.link_git;
    }

    estruturaImagensObj.forEach(element => {
        if (element.image.includes(e.caminho_imagem)) {
            imagens = imagens + `<a  href="${linkImg}" target="_blank"><img title="Acesse o projeto"
            src="https://raw.githubusercontent.com/Greisonboff/data-center/main/imagens/${element.image}"><a>`
        }
    });

    elementDivProjects = document.createElement('div');
    if (index == 0) {
        elementDivProjects.setAttribute('class', 'projectsListBox');
    } else {
        elementDivProjects.setAttribute('class', 'projectsListBox hideProjects');
    }
    elementDivProjects.setAttribute('id', e.nome_projeto.replaceAll(' ', '').toLowerCase());
    elementDivProjects.innerHTML = `
        <span>${e.nome_projeto}</span>
        <p>${e.descricao}</p>
        ${linkGit}
        ${link}
        ${imagens}
    `;
    document.querySelector('body .projectsBox').append(elementDivProjects);
    createBoxClickProjects(e.nome_projeto, index);
}

estruturaProjeto = (e) => {
    var index = 0;
    e.forEach(element => {
        createProjects(element, index);
        index++;
    });
}

estruturaImagensObj = ''
// construa a URL da API do GitHub
var apiUrlProjeto = `https://api.github.com/repos/Greisonboff/data-center/contents/projetos.json`;

sendXhrProjeto = (apiUrlProjeto) => {
    // Faça uma solicitação GET usando XMLHttpRequest
    var xhrProjeto = new XMLHttpRequest();
    xhrProjeto.open('GET', apiUrlProjeto, true);

    // Configure a função de retorno para processar a resposta
    xhrProjeto.onreadystatechange = function () {
        if (xhrProjeto.readyState === 4) {
            if (xhrProjeto.status === 200) {
                var response = JSON.parse(xhrProjeto.responseText);
                if (apiUrlProjeto == '/projetos.json') {
                    estruturaProjeto(response);
                } else {
                    var content = decodeURIComponent(escape(atob(response.content))); // Decodifique o conteúdo base64
                    estruturaProjeto(JSON.parse(content));
                }
            } else {
                apiUrlProjeto = '/projetos.json';
                sendXhrProjeto(apiUrlProjeto);
                console.error('Erro ao buscar o arquivo JSON:', xhrProjeto.status, xhrProjeto.statusText);
            }
        }
    };
    xhrProjeto.send();
}


// construa a URL da API do GitHub
var apiUrlProjetoImg = `https://api.github.com/repos/Greisonboff/data-center/contents/objImagens.json`;

sendXhrProjetoImg = (apiUrlProjetoImg) => {
    // Faça uma solicitação GET usando XMLHttpRequest
    var xhrProjetoImg = new XMLHttpRequest();
    xhrProjetoImg.open('GET', apiUrlProjetoImg, true);

    // Configure a função de retorno para processar a resposta
    xhrProjetoImg.onreadystatechange = function () {
        if (xhrProjetoImg.readyState === 4) {
            if (xhrProjetoImg.status === 200) {
                var response = JSON.parse(xhrProjetoImg.responseText);
                if (apiUrlProjetoImg == '/objImagens.json') {
                    estruturaImagensObj = response;
                } else {
                    var content = decodeURIComponent(escape(atob(response.content))); // Decodifique o conteúdo base64
                    estruturaImagensObj = JSON.parse(content);
                }
                // Envie a solicitação
                sendXhrProjeto(apiUrlProjeto);
            } else {
                apiUrlProjetoImg = '/objImagens.json'
                // Envie a solicitação
                sendXhrProjetoImg(apiUrlProjetoImg);
                console.error('Erro ao buscar o arquivo JSON:', xhrProjetoImg.status, xhrProjetoImg.statusText);
            }
        }
    };

    // Envie a solicitação
    xhrProjetoImg.send();
}
sendXhrProjetoImg(apiUrlProjetoImg);