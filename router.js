// Configuração das rotas
const routes = {
    '/': '/views/home.html',
    '/home': '/views/home.html',
    '/about': '/views/about.html',
    '/contact': '/views/contact.html',
    '/404': '/views/404.html'
};

// Cache para páginas já carregadas
const pageCache = {};

// Função principal para carregar views
async function loadView(url) {
    const app = document.getElementById('app');
    
    try {
        // Verifica se a URL existe nas rotas definidas
        const pagePath = routes[url] || routes['/404'];
        
        // Verifica o cache primeiro
        if (pageCache[pagePath]) {
            app.innerHTML = pageCache[pagePath];
            return;
        }
        
        // Mostra estado de carregamento
        app.innerHTML = '<div class="loader">Carregando...</div>';
        
        // Faz a requisição
        const response = await fetch(pagePath);
        
        // Verifica se a resposta é válida
        if (!response.ok) {
            //loadView('/404');
            throw new Error(`Erro ${response.status}: ${response.statusText}`);
        }
        
        // Obtém o conteúdo HTML
        const html = await response.text();
        
        // Armazena no cache
        pageCache[pagePath] = html;
        
        // Atualiza a view
        app.innerHTML = html;
        
    } catch (error) {
        console.error('Erro ao carregar a página:', error);
        app.innerHTML = `
            <div class="error">
                <h1>Erro ao carregar a página</h1>
                <p>${error.message}</p>
                <a href="/" data-route>Voltar para a página inicial</a>
            </div>
        `;
    }
}

// Função para navegação
function navigate() {
    // Obtém o caminho atual (remove a # se estiver usando hash routing)
    let path = window.location.pathname;
    
    // Se estiver usando hash routing (com #), descomente as linhas abaixo:
    // const hash = window.location.hash.substring(1) || '/';
    // path = hash;
    
    // Carrega a view correspondente
    loadView(path);
}

// Configura os listeners de navegação
function setupRouter() {
    // Navegação inicial
    navigate();
    
    // Evento para mudanças de rota (para History API)
    window.addEventListener('popstate', navigate);
    
    // Intercepta clicks em links com data-route
    document.addEventListener('click', (e) => {
        const link = e.target.closest('a[data-route]');
        if (link) {
            e.preventDefault();
            const path = link.getAttribute('href');
            
            // Para History API:
            window.history.pushState({}, '', path);
            navigate();
            
            // Se estiver usando hash routing, comente acima e use:
            // window.location.hash = path;
        }
    });
}

// Inicia o router quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', setupRouter);