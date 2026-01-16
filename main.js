const heroi = {nome: "Fabysss", classe: "Aspirante a dev", nivel: 1, xp: 0};

const spanNome = document.querySelector('#hero-nome');
const spanClasse = document.querySelector('#hero-classe');
const spanNivel = document.querySelector('#hero-nivel');
const spanXp = document.querySelector('#hero-xp');
const botaoXp = document.querySelector('#btn-xp');
const form = document.querySelector('#form-contato');
const feedback = document.querySelector('#form-feedback');


function inicializarPainel() {
    spanNome.innerText = heroi.nome;
    spanClasse.innerText = heroi.classe;
    spanNivel.innerText = heroi.nivel;
    spanXp.innerText = heroi.xp;

    validarFormulario(); 
    buscarGithub(); 
}


function validarFormulario() {
    const form = document.querySelector('#form-contato');
    const feedback = document.querySelector('#form-feedback');

    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault(); 

            const nome = document.querySelector('#nome').value;
            const email = document.querySelector('#email').value;

            if (nome.trim() === "" || email.trim() === "") {
                feedback.innerText = "❌ Ops! Preencha todos os campos.";
                feedback.style.color = "red";
            } else {
                feedback.innerText = "✅ Mensagem enviada, Heroína!";
                feedback.style.color = "#2EB600"; 
                form.reset(); 
            }
        });
    }
}

function aumentarXP() {
    heroi.xp += 20;
    
    
    if (heroi.xp >= 100) {
        heroi.nivel += 1; 
        heroi.xp = 0;
        alert(` EVOLUÇÃO! ${heroi.nome} subiu para o Nível ${heroi.nivel}!`);
    }

    spanNivel.innerText = heroi.nivel;
    spanXp.innerText = heroi.xp;
}

botaoXp.addEventListener('click', aumentarXP);


async function buscarGithub(){
    const usuario = "fabysoouza";
    const url = `https://api.github.com/users/${usuario}`;

    try {
        const resposta = await fetch(url);
        if (!resposta.ok) throw new Error("Erro ao buscar dados");
        
        const dados = await resposta.json();

        const listaStatus = document.querySelector('#painel-heroi ul');

        const itemRepos = document.createElement('li');
        itemRepos.innerHTML = `Repositórios: <span style="color: #3FCC10; font-weight: bold;">${dados.public_repos} &#x2728</span>`;

        listaStatus.appendChild(itemRepos);
    } catch(erro) {
        console.error("Falha na conexão com o GitHub:", erro);
    }
}


inicializarPainel();
