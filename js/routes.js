const routes = {
    '/': 'home',
    '/sobre': 'sobre',
    '/contato': 'contato'
};

function loadView(viewName) {
    const app = document.getElementById('app');
    
    // Aqui você pode carregar o conteúdo de diferentes formas:
    // 1. Inline (conteúdo direto no JS)
    // 2. Via fetch de arquivos HTML externos
    // 3. Usando templates no próprio arquivo HTML
    
    // Exemplo simples com conteúdo inline:
    switch(viewName) {
        case 'home':
            app.innerHTML = '<h1>Página Inicial</h1><p>Bem-vindo ao site!</p>';
            break;
        case 'sobre':
            app.innerHTML = '<h1>Sobre Nós</h1><p>Informações sobre a empresa.</p>';
            break;
        case 'contato':
            app.innerHTML = '<h1>Contato</h1><p>Entre em contato conosco.</p>';
            break;
        default:
            app.innerHTML = '<h1>Página não encontrada</h1>';
    }
}

function navigate() {
    const hash = window.location.hash.substring(1) || '/';
    const viewName = routes[hash] || '404';
    loadView(viewName);
}

// Configura os listeners
window.addEventListener('hashchange', navigate);
document.addEventListener('DOMContentLoaded', () => {
    // Configura os links para usar o sistema de rotas
    document.querySelectorAll('[data-route]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.hash = link.getAttribute('href');
        });
    });
    
    // Carrega a view inicial
    navigate();
});
