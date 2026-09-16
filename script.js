document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 📱 1. LÓGICA DO MENU MOBILE (HAMBURGUER)
    // ==========================================
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');
    const links = document.querySelectorAll('.nav-links a:not(.btn-nav)');
    const sections = document.querySelectorAll('section');

    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = menuToggle.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
    });


    // ==========================================
    // 🗺️ 2. SCROLL ATIVO (Muda a cor do menu ao rolar)
    // ==========================================
    window.addEventListener('scroll', () => {
        let currentSectionId = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            // Ativa o link correspondente quando passar de 1/3 da seção na tela
            if (window.scrollY >= (sectionTop - sectionHeight / 3)) {
                currentSectionId = section.getAttribute('id');
            }
        });

        links.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    });

    // Fecha o menu mobile automaticamente ao clicar em qualquer item
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const icon = menuToggle.querySelector('i');
            icon.classList.add('fa-bars');
            icon.classList.remove('fa-times');
        });
    });


    // ==========================================
    // 🎭 3. MÁSCARA AUTOMÁTICA DO TELEFONE
    // ==========================================
    const inputWhatsapp = document.getElementById('whatsapp');

    inputWhatsapp.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, ""); // Remove tudo que não for número
        
        // Aplica a formatação dinamicamente enquanto o usuário digita
        if (value.length > 0) {
            value = `(${value.substring(0, 2)}) ${value.substring(2)}`;
        }
        if (value.length > 9) {
            value = `${value.substring(0, 10)}-${value.substring(10, 14)}`;
        }
        
        e.target.value = value.substring(0, 15); // Limita o tamanho ao padrão celular
    });


    // ==========================================
    // 🚀 4. INTEGRAÇÃO E DISPARO PARA O WHATSAPP
    // ==========================================
    const formOrcamento = document.getElementById('form-orcamento');

    formOrcamento.addEventListener('submit', function(event) {
        event.preventDefault(); // Evita recarregar a tela

        // Captura os dados digitados
        const nome = document.getElementById('nome').value;
        const email = document.getElementById('email').value;
        const whatsappUsuario = document.getElementById('whatsapp').value;
        const servico = document.getElementById('servico-tipo').value;
        const mensagem = document.getElementById('mensagem').value;

        // ⚠️ SUBSTITUA ABAIXO PELO SEU NÚMERO DO WHATSAPP (com DDD, apenas números)
        const meuNumeroWhatsApp = "5511985638818"; 

        // Monta e formata o texto para envio
        const textoMensagem = `Olá, NetCore Solutions! Gostaria de solicitar um orçamento.
        
📌 *Dados do Cliente:*
• *Nome:* ${nome}
• *E-mail:* ${email}
• *WhatsApp:* ${whatsappUsuario}
        
💼 *Serviço Pretendido:* ${servico}
        
📝 *Detalhes:* ${mensagem}`;

        // Codifica e dispara a URL oficial da API do WhatsApp
        const textoCodificado = encodeURIComponent(textoMensagem);
        const linkWhatsApp = `https://whatsapp.com{11985638818}&text=${textoCodificado}`;

        window.open(linkWhatsApp, '_blank');
    });
});
