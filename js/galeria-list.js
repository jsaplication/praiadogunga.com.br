function mostrarPosts(json) {
    // Verifica se existe feed e entry
    let entries = [];
    if (json.feed && json.feed.entry) {
        entries = Array.isArray(json.feed.entry) ? json.feed.entry : [json.feed.entry];
    } else {
        console.warn("Nenhum post encontrado no feed.");
        return; // Sai da função se não houver posts
    }

    entries.forEach(post => {
        let titulo = post?.title?.$t || "Sem título";
        let linkObj = post?.link?.find(l => l.rel === "alternate");
        let link = linkObj ? linkObj.href : "#";
        let conteudo = post?.content?.$t || post?.summary?.$t || "";
        let postId = post?.id?.$t?.split(".post-")[1] || "0";
        let autor = post?.author?.[0]?.name?.$t || "Desconhecido";
        let created_at = post?.published?.$t || "";
        let data = created_at ? new Date(created_at).toLocaleDateString() : "";
        let tags = post?.category ? post.category.map(cat => cat.term).join(", ") : "";
        let imgMatch = conteudo.match(/<img[^>]+src="([^">]+)"/);
        let primeiraImagem = imgMatch ? imgMatch[1] : "";
        let nomeAmigavel = post?.link?.[4]?.href?.split('/')[5]?.split('.html')[0] || "";
        let tempo = calcularTempoLeitura(conteudo);
        let descrip = limparHTML(conteudo);

        // Monta card
        var cards = `<a href="galeria.html?id=${postId}/${nomeAmigavel}" title="${titulo}"><div class="gallery-item overflow-hidden rounded-lg shadow-lg">
                    <img src="${primeiraImagem}" 
                         alt="${titulo}" class="w-full h-64 object-cover">
                    <div class="bg-white p-4">
                        <h4 class="font-bold text-sea-green">${titulo}</h4>
                        <p class="text-gray-600 text-sm">${descrip}</p>
                    </div>
                </div></a>`;
        
        document.querySelector("#galeria").innerHTML += cards;
    });
}

const script = document.createElement("script");
script.src = `https://praiadogungaal.blogspot.com/feeds/posts/default/?alt=json-in-script&callback=mostrarPosts&max-results=6`;
document.body.appendChild(script);



function mostrarPostsAtividades(json) {
    // Verifica se existe feed e entry
    let entries = [];
    if (json.feed && json.feed.entry) {
        entries = Array.isArray(json.feed.entry) ? json.feed.entry : [json.feed.entry];
    } else {
        console.warn("Nenhum post encontrado no feed.");
        return; // Sai da função se não houver posts
    }

    entries.forEach(post => {
        let titulo = post?.title?.$t || "Sem título";
        let linkObj = post?.link?.find(l => l.rel === "alternate");
        let link = linkObj ? linkObj.href : "#";
        let conteudo = post?.content?.$t || post?.summary?.$t || "";
        let postId = post?.id?.$t?.split(".post-")[1] || "0";
        let autor = post?.author?.[0]?.name?.$t || "Desconhecido";
        let created_at = post?.published?.$t || "";
        let data = created_at ? new Date(created_at).toLocaleDateString() : "";
        let tags = post?.category ? post.category.map(cat => cat.term).join(", ") : "";
        let imgMatch = conteudo.match(/<img[^>]+src="([^">]+)"/);
        let primeiraImagem = imgMatch ? imgMatch[1] : "";
        let nomeAmigavel = post?.link?.[4]?.href?.split('/')[5]?.split('.html')[0] || "";
        let tempo = calcularTempoLeitura(conteudo);
        let descrip = limparHTML(conteudo);

        // Monta card
        var cards = `<div class="bg-gray-50 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition duration-300">
                    <div class="h-48 overflow-hidden">
                        <img src="${primeiraImagem}" 
                             alt="${titulo}" class="w-full h-full object-cover">
                    </div>
                    <div class="p-6">
                        <div class="flex items-center mb-3">
                            <div class="bg-sky-blue p-2 rounded-full mr-3">
                                <i class="fas fa-umbrella-beach text-white"></i>
                            </div>
                            <h3 class="text-xl font-bold text-sea-green">${tags}</h3>
                        </div>
                        <p class="text-gray-700 mb-4">${descrip}</p>
                        <div class="flex justify-between items-center">
                            <!-- <span class="text-sea-green font-bold">A partir de R$ 120</span> -->
                            <a href="galeria.html?id=${postId}/${nomeAmigavel}" title="${titulo}" class="text-sky-blue hover:text-sea-green font-medium">Saiba mais</a>
                        </div>
                    </div>
                </div>`;
        
        document.querySelector("#atividades").innerHTML += cards;
    });
}

const script_atividades = document.createElement("script");
script_atividades.src = `https://praiadogungaal.blogspot.com/feeds/posts/default/-/Atividades?alt=json-in-script&callback=mostrarPostsAtividades&max-results=3`;
document.body.appendChild(script_atividades);