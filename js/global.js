function calcularTempoLeitura(texto) {
  // Remove tags HTML, se houver
  const textoLimpo = texto.replace(/<[^>]+>/g, '');

  // Conta o número de palavras
  const palavras = textoLimpo.trim().split(/\s+/).length;

  // Velocidade média de leitura: 200 palavras por minuto
  const palavrasPorMinuto = 200;

  // Calcula o tempo em minutos
  const minutos = Math.ceil(palavras / palavrasPorMinuto);

  return minutos;
}

function limparHTML(html, limite = 160) {
  // cria um elemento temporário
  const div = document.createElement("div");
  div.innerHTML = html;

  // pega apenas o texto (sem tags)
  let texto = div.textContent || div.innerText || "";

  // corta se passar do limite
  if (texto.length > limite) {
    texto = texto.slice(0, limite).trimEnd();
    // corta na última palavra para não quebrar feio
    texto = texto.slice(0, texto.lastIndexOf(" ")) + "...";
  }

  return texto;
}

function formatarTempo(dataIso) {
  const dataPost = new Date(dataIso);
  const agora = new Date();

  const diffMs = agora - dataPost; // diferença em ms
  const diffMin = Math.floor(diffMs / 1000 / 60);
  const diffHoras = Math.floor(diffMin / 60);
  const diffDias = Math.floor(diffHoras / 24);

  if (diffMin < 1) {
    return "agora mesmo";
  } else if (diffMin < 60) {
    return `há ${diffMin} minuto${diffMin > 1 ? "s" : ""}`;
  } else if (diffHoras < 24) {
    return `há ${diffHoras} hora${diffHoras > 1 ? "s" : ""}`;
  } else if (diffDias === 1) {
    return "ontem";
  } else if (diffDias < 7) {
    return `há ${diffDias} dia${diffDias > 1 ? "s" : ""}`;
  } else {
    const meses = [
      "janeiro", "fevereiro", "março", "abril", "maio", "junho",
      "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"
    ];

    const dia = dataPost.getDate();
    const mes = meses[dataPost.getMonth()];
    const hora = String(dataPost.getHours()).padStart(2, "0");
    const minuto = String(dataPost.getMinutes()).padStart(2, "0");

    return `${dia} de ${mes} às ${hora}:${minuto}`;
  }
}