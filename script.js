// =========================================================================
// PASSO ZERO: O GRANDE AVISO INICIAL
// =========================================================================
// "Ei, navegador! Olhe bem para mim. Não saia correndo para executar este código 
// assim que a página abrir. Espere o HTML inteiro (os títulos, as imagens, os botões) 
// estar 100% montado e pronto na tela. Assim que a página estiver pronta, execute 
// o que está aqui dentro."
document.addEventListener("DOMContentLoaded", function() {


    // =====================================================================
    // PASSO 1: PREPARANDO AS CAIXINHAS (SELECIONANDO OS ELEMENTOS)
    // =====================================================================
    // "Antes de fazer qualquer coisa, precisamos encontrar os elementos lá no HTML 
    // e guardá-los dentro de 'caixinhas' (variáveis com 'const') para podermos 
    // mexer neles depois."

    // Caixinha que guarda a janela flutuante (modal) de login
    const modalLogin = document.getElementById("modal-login");
    
    // Caixinha que guarda a janela flutuante (modal) de cadastrar um novo pet
    const modalCadastroPet = document.getElementById("modal-cadastro-pet");
    
    // Caixinha que guarda o link escrito "Entrar" lá no topo da página
    const btnAbrirLogin = document.querySelector(".links-navegacao li a");
    
    // Caixinha que guarda o botão de fechar (o 'X') da janela de login
    const btnFecharLogin = document.querySelector(".fechar-modal");
    
    // Caixinha que guarda o formulário de digitar o e-mail e a senha
    const formLogin = document.getElementById("form-login");

    // Caixinha que guarda o link escrito "Cadastrar" lá no topo da página
    const btnAbrirCadastro = document.querySelector("li.registrar a");
    
    // Caixinha que guarda o botão de fechar (o 'X') da janela de cadastro de pet
    const btnFecharCadastro = document.querySelector(".fechar-modal-pet");
    
    // Caixinha que guarda o formulário de preencher os dados do pet
    const formCadastroPet = document.getElementById("form-cadastro-pet");

    // Caixinha que guarda o botão grandão da página inicial ("Encontrar pet")
    const botaoRedirecionar = document.querySelector('.anuncio-petz .botao-principal');
    
    // Caixinha que guarda a barra de pesquisa onde o usuário digita para procurar pets
    const inputBusca = document.getElementById('busca-pet');
    
    // Caixinha que guarda TODOS os botões de patinha (favorito) dos cartões de pets
    const botoesPatinha = document.querySelectorAll('.btn-patinha');
    
    // Caixinha que guarda TODOS os cartões de pets que aparecem na tela
    const cartoesPets = document.querySelectorAll('.cartao-pet');
    
    // Caixinha que guarda o botão de sair da conta (o ícone de porta)
    const btnSair = document.getElementById("btn-sair");

    // Caixinha que guarda o menu que deve aparecer quando a pessoa NÃO está logada
    const menuDeslogado = document.getElementById("menu-deslogado");
    
    // Caixinha que guarda o menu que deve aparecer quando a pessoa JÁ está logada
    const menuLogado = document.getElementById("menu-logado");


    // =====================================================================
    // PASSO 11: ALTERAR A FOTO DE PERFIL DO USUÁRIO
    // =====================================================================
   // =====================================================================
    // PASSO 11: ALTERAR E SINCRONIZAR A FOTO DE PERFIL EM TODAS AS PÁGINAS
    // =====================================================================
    
    const imagemPerfil = document.getElementById("foto-perfil-usuario");
    const inputNovaFoto = document.getElementById("input-nova-foto");
    
    // Seleciona todas as imagens de perfil que aparecem nos cabeçalhos do site
    const fotosCabecalho = document.querySelectorAll(".foto-perfil");

    // "Assim que a página abre, vamos verificar se o aluno já salvou uma foto nova antes"
    const fotoSalva = localStorage.getItem("fotoPerfilUsuario");
    if (fotoSalva) {
        // Se houver uma foto salva, aplicamos ela na página de perfil
        if (imagemPerfil) {
            imagemPerfil.src = fotoSalva;
        }
        // E aplicamos também em todas as fotos de perfil que aparecem no cabeçalho
        fotosCabecalho.forEach(function(foto) {
            foto.src = fotoSalva;
        });
    }

    // "Se os elementos de troca de foto existirem na página de perfil..."
    if (imagemPerfil && inputNovaFoto) {
        
        // "Quando clicarem na foto grande do perfil..."
        imagemPerfil.addEventListener("click", function() {
            inputNovaFoto.click(); // Abre a janela para escolher a imagem
        });

        // "Quando o usuário escolher o arquivo de imagem..."
        inputNovaFoto.addEventListener("change", function(event) {
            const arquivo = event.target.files[0];

            if (arquivo) {
                const leitor = new FileReader();

                leitor.onload = function(e) {
                    const base64Imagem = e.target.result;

                    // 1. Muda na página de perfil na hora
                    imagemPerfil.src = base64Imagem;

                    // 2. Muda em todos os cabeçalhos da página atual
                    fotosCabecalho.forEach(function(foto) {
                        foto.src = base64Imagem;
                    });

                    // 3. Salva na memória do navegador (localStorage) para as outras páginas lembrarem!
                    localStorage.setItem("fotoPerfilUsuario", base64Imagem);

                    alert("Foto de perfil alterada e sincronizada com sucesso! 🐾");
                };

                leitor.readAsDataURL(arquivo);
            }
        });
    }
    // =====================================================================
    // PASSO 2: A MEMÓRIA DO NAVEGADOR (QUEM ESTÁ LOGADO?)
    // =====================================================================
    // "Vamos perguntar diretamente para a memória do navegador (chamada sessionStorage): 
    // 'Ei, a chave chamada logado está guardada aqui e é verdadeira?'"
    let usuarioLogado = sessionStorage.getItem("logado") === "true";

    // "Se a resposta for verdadeira (ou seja, a pessoa já fez login antes), 
    // nós vamos alterar o visual do topo da página imediatamente!"
    if (usuarioLogado && menuDeslogado && menuLogado) {
        // Esconde o menu de Entrar/Cadastrar
        menuDeslogado.style.display = "none";
        // Mostra o menu com a foto do perfil do usuário e o botão de sair
        menuLogado.style.display = "flex";
    }


    // =====================================================================
    // PASSO 3: ABRINDO E FECHANDO AS JANELAS FLUTUANTES (MODAIS)
    // =====================================================================

    // Ação para o botão de abrir o login:
    if (btnAbrirLogin) {
        btnAbrirLogin.addEventListener("click", function(event) {
            // 'event.preventDefault()' diz: "Segure o navegador! Não deixe esse link 
            // pular para outra página ou atualizar a tela sozinho."
            event.preventDefault(); 
            
            // Mudamos a propriedade CSS 'display' do modal de login de 'none' (invisível) 
            // para 'flex' (visível na tela).
            modalLogin.style.display = "flex"; 
        });
    }

    // Ação para o botão de fechar o login ('X'):
    if (btnFecharLogin) {
        btnFecharLogin.addEventListener("click", function() {
            // Mudamos o display de volta para 'none', fazendo a janela sumir.
            modalLogin.style.display = "none"; 
        });
    }

    // Ação para o botão de abrir o cadastro de pet:
    if (btnAbrirCadastro) {
        btnAbrirCadastro.addEventListener("click", function(event) {
            event.preventDefault(); // Impede o link de atualizar a página
            modalCadastroPet.style.display = "flex"; // Abre a janela de cadastrar pet
        });
    }

    // Ação para o botão de fechar o cadastro de pet ('X'):
    if (btnFecharCadastro) {
        btnFecharCadastro.addEventListener("click", function() {
            modalCadastroPet.style.display = "none"; // Fecha a janela de cadastro
        });
    }

    // Ação de clique global na janela inteira (para fechar o modal se clicar fora):
    window.addEventListener("click", function(event) {
        // "Se a pessoa clicou exatamente em cima do fundo escuro do modal de login..."
        if (event.target === modalLogin) {
            modalLogin.style.display = "none"; // ...fecha o login.
        }
        // "Se a pessoa clicou em cima do fundo escuro do modal de cadastro de pet..."
        if (event.target === modalCadastroPet) {
            modalCadastroPet.style.display = "none"; // ...fecha o cadastro.
        }
    });


    // =====================================================================
    // PASSO 4: O PROCESSO DE LOGIN E LOGOUT (ENTRAR E SAIR)
    // =====================================================================
    // O que acontece quando o usuário clica em enviar o formulário de login:
    if (formLogin) {
        formLogin.addEventListener("submit", function(event) {
            event.preventDefault(); // Impede o formulário de recarregar a página por padrão

            // Pegamos o texto exato que o usuário digitou dentro da caixinha de e-mail
            const email = document.getElementById("email").value;
            
            // Pegamos o texto exato que o usuário digitou dentro da caixinha de senha
            const senha = document.getElementById("senha").value

            // Fazemos a validação: o e-mail é o do The Rock e a senha é 123?
            if (email === "therock@email.com" && senha === "123") {
                // Se estiver correto, salvamos na memória do navegador que agora ele está logado
                sessionStorage.setItem("logado", "true")
                
                alert("Sucesso! Bem-vindo(a) de volta, The Rock.")
            
                // Redirecionamos automaticamente o navegador para a página de encontrar pets
                window.location.href = "encontrar-pets.html";
            } else {
                // Se errou os dados, avisamos o usuário com um alerta na tela
                alert("E-mail ou senha incorretos! Use: therock@email.com e senha 123");
            }
        });
    }

    // O que acontece quando o usuário clica no botão de Sair da conta (Logout):
    if (btnSair) {
        btnSair.addEventListener("click", function() {
            // Apagamos a chave "logado" da memória do navegador
            sessionStorage.removeItem("logado");
            
            alert("Você saiu da sua conta com segurança. Até logo! 🐾");
            
            // Mandamos o usuário de volta para a página inicial (index.html)
            window.location.href = "index.html";
        })
    }


    // =====================================================================
    // PASSO 5: CADASTRANDO UM NOVO PET NA PLATAFORMA
    // =====================================================================
    if (formCadastroPet) {
        formCadastroPet.addEventListener("submit", function(event) {
            event.preventDefault(); // Impede o envio padrão do formulário

            // Capturamos o nome do pet que foi digitado no input
            const nomePet = document.getElementById("nome-pet").value;
            
            // Capturamos a espécie que foi escolhida na lista suspensa (select)
            const especiePet = document.getElementById("especie-pet").value;

            // Mostramos um alerta de parabéns com as informações do pet inserido
            alert("Sucesso! " + nomePet + " (" + especiePet + ") foi cadastrado para adoção. 🐾");
            
            // Limpamos os campos do formulário para deixá-los vazios novamente
            formCadastroPet.reset();
            
            // Fechamos a janela modal de cadastro
            modalCadastroPet.style.display = "none";
        });
    }


    // =====================================================================
    // PASSO 6: REDIRECIONAR DA HOME PARA OS PETS
    // =====================================================================
    if (botaoRedirecionar) {
        botaoRedirecionar.addEventListener("click", function() {
            // Ao clicar no botão da home, levamos o usuário para a página de encontrar pets
            window.location.href = "encontrar-pets.html";
        });
    }


    // =====================================================================
    // PASSO 7: A BARRA DE PESQUISA INTELIGENTE (FILTRANDO EM TEMPO REAL)
    // =====================================================================
    if (inputBusca) {
        // O evento "input" dispara toda vez que o usuário digita ou apaga uma letra na barra
        inputBusca.addEventListener("input", function(event) {
            // Pegamos o texto digitado e convertemos todas as letras para minúsculas 
            // (assim a busca não se importa com letras maiúsculas ou minúsculas)
            const texto = event.target.value.toLowerCase();

            // Usamos o 'forEach' para olhar um por um dentro da lista de cartões de pets
            cartoesPets.forEach(function(cartao) {
                // Pegamos o texto do título (h3 - nome do pet) e passamos para minúsculo
                const titulo = cartao.querySelector('h3').innerText.toLowerCase();
                
                // Pegamos o texto da descrição (p - raça e idade) e passamos para minúsculo
                const descricao = cartao.querySelector('p').innerText.toLowerCase();
                
                // Verificamos se o texto digitado está incluído no título OU na descrição
                if (titulo.includes(texto) || descricao.includes(texto)) {
                    // Se estiver, mudamos o display para 'block', fazendo o cartão aparecer na tela
                    cartao.style.display = 'block';
                } else {
                    // Se não tiver nenhuma relação, mudamos o display para 'none', escondendo o cartão
                    cartao.style.display = 'none';
                }
            });
        });
    }


    // =====================================================================
    // PASSO 8: O BOTÃO DE FAVORITAR (A PATINHA DOS CARDS)
    // =====================================================================
    // Passamos por cada botão de patinha existente na página um por um:
    botoesPatinha.forEach(function(botao) {
        botao.addEventListener("click", function() {
            // O comando 'classList.toggle' funciona como um interruptor de luz: 
            // se a classe 'btn-patinha-inativo' não estiver lá, ele coloca; se já estiver, ele retira.
            botao.classList.toggle('btn-patinha-inativo');
        });
    });


    // =====================================================================
    // PASSO 9: CLICAR NO CARTÃO DO PET (VER DETALHES OU EXIGIR LOGIN)
    // =====================================================================
    // Passamos por cada cartão de pet da tela um por um:
   // No Passo 9 do seu script.js:
    cartoesPets.forEach(function(cartao) {
        cartao.addEventListener("click", function(event) {
            if (event.target.closest('.btn-patinha')) {
                return; // Ignora se clicar na patinha
            }

            if (usuarioLogado) {
                // Pega o nome e a foto do cartão específico que foi clicado
                const nomePet = cartao.querySelector('h3').innerText;
                const fotoPet = cartao.querySelector('img').getAttribute('src');
                
                // Redireciona mandando o nome e a foto pelo link (URL)
                window.location.href = "detalhes-pet.html?nome=" + encodeURIComponent(nomePet) + "&foto=" + encodeURIComponent(fotoPet);
            } else {
                alert("Você precisa fazer login para ver os detalhes do pet!");
                modalLogin.style.display = "flex";
            }
        });
    });

});