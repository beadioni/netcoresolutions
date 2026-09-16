document.addEventListener('DOMContentLoaded', () => {

    // 1. MENU MOBILE
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

    window.addEventListener('scroll', () => {
        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
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

    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const icon = menuToggle.querySelector('i');
            icon.classList.add('fa-bars');
            icon.classList.remove('fa-times');
        });
    });

    // 2. MÁSCARA DO TELEFONE
    const inputWhatsapp = document.getElementById('whatsapp');
    inputWhatsapp.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, "");
        if (value.length > 0) {
            value = `(${value.substring(0, 2)}) ${value.substring(2)}`;
        }
        if (value.length > 9) {
            value = `${value.substring(0, 10)}-${value.substring(10, 14)}`;
        }
        e.target.value = value.substring(0, 15);
    });

    // 3. WHATSAPP - CORRIGIDO
    const formOrcamento = document.getElementById('form-orcamento');
    formOrcamento.addEventListener('submit', function(event) {
        event.preventDefault();

        const nome = document.getElementById('nome').value;
        const email = document.getElementById('email').value;
        const whatsappUsuario = document.getElementById('whatsapp').value;
        const servico = document.getElementById('servico-tipo').value;
        const mensagem = document.getElementById('mensagem').value;

        const meuNumeroWhatsApp = "5511985638818"; 

        const textoMensagem = `Olá, NetCore Solutions! Gostaria de solicitar um orçamento.
        
📌 *Dados do Cliente:*
- *Nome:* ${nome}
- *E-mail:* ${email}
- *WhatsApp:* ${whatsappUsuario}
        
💼 *Serviço Pretendido:* ${servico}
        
📝 *Detalhes:* ${mensagem}`;

        const textoCodificado = encodeURIComponent(textoMensagem);
        const linkWhatsApp = `https://wa.me/${meuNumeroWhatsApp}?text=${textoCodificado}`;

        window.open(linkWhatsApp, '_blank');
    });
});