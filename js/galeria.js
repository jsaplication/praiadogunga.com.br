function getgaleriaUnic(json) {
      let post = json.entry;
      let titulo = post.title.$t;
      let conteudo = post.content ? post.content.$t : post.summary.$t;
      let postId = post.id.$t.split(".post-")[1];
      let autor = post.author[0].name.$t;
      let data = new Date(post.published.$t).toLocaleDateString();
      let tags = post.category ? post.category.map(cat => cat.term).join(", ") : "";
      let imgMatch = conteudo.match(/<img[^>]+src="([^">]+)"/);
      let primeiraImagem = imgMatch ? imgMatch[1] : "";
      let tempo = calcularTempoLeitura(conteudo);
      let descrip = limparHTML(conteudo);

      document.getElementById("galeria-titulo").innerHTML = titulo;
      document.getElementById("galeria-description").innerHTML = conteudo;
      // document.getElementById("primeiraimage").innerHTML = `<img src="${primeiraImagem}" alt="${titulo}" class="w-full rounded-lg shadow-xl">`
      document.querySelector('title').textContent = 'Praia Do Gunga - '+titulo;
}

// Pega os parâmetros da URL
const params = new URLSearchParams(window.location.search);
const fullId = params.get('id');
const id = fullId ? fullId.split('/')[0] : null;

if(id === null){
  window.location.href = '404.html';
}

// criar script dinâmico
const script_galeria_unic = document.createElement("script");
script_galeria_unic.src = `https://praiadogungaal.blogspot.com/feeds/posts/default/${id}?alt=json-in-script&callback=getgaleriaUnic`;
document.body.appendChild(script_galeria_unic);



//carregar mais postages
function post_relacionados(json) {
    let posts = [...json.feed.entry];

    // Embaralha o array
    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    posts = shuffle(posts);

    // Pega apenas os 6 primeiros
    posts = posts.slice(0, 6);

    posts.forEach(post => {
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

const script2 = document.createElement("script");
script2.src = `https://praiadogungaal.blogspot.com/feeds/posts/default/?alt=json-in-script&callback=post_relacionados&max-results=50`;
document.body.appendChild(script2);
