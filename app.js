const $ = (selector, root=document) => root.querySelector(selector);
const $$ = (selector, root=document) => [...root.querySelectorAll(selector)];
const esc = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const icons = {
 search:'<circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/>',
 chat:'<path d="M21 11.5a9 9 0 0 1-13 8L3 21l1.4-4.7A9 9 0 1 1 21 11.5Z"/><path d="M8 7.5c.5 4 2.5 6 6.5 7l1-2-2.2-1-1 1c-1.1-.5-1.8-1.2-2.3-2.3l1-1-1-2.2Z"/>',
 bag:'<path d="M5 7h14l1 14H4L5 7Z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/>',
 menu:'<path d="M4 6h16M4 12h16M4 18h16"/>',
 layers:'<path d="m12 3 10 5-10 5L2 8l10-5ZM2 12l10 5 10-5M2 16l10 5 10-5"/>',
 pen:'<path d="m4 16-1 5 5-1L21 7l-4-4L4 16ZM14 6l4 4M4 16l4 4"/>',
 truck:'<path d="M2 5h13v12H2V5ZM15 10h4l3 4v3h-7"/><circle cx="6" cy="18" r="2"/><circle cx="18" cy="18" r="2"/>',
 instagram:'<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".7"/>',
 close:'<path d="m6 6 12 12M18 6 6 18"/>'
};
function icon(name){return `<svg viewBox="0 0 24 24" aria-hidden="true">${icons[name]||icons.layers}</svg>`;}
function renderIcons(root=document){$$('[data-icon]',root).forEach(el=>el.innerHTML=icon(el.dataset.icon));}
const categories=[
 {id:'papelaria',name:'Papelaria e impressos',short:'Cartões e impressos',tile:0},
 {id:'adesivos',name:'Rótulos e adesivos',short:'Adesivos e rótulos',tile:4},
 {id:'visual',name:'Comunicação visual',short:'Comunicação visual',tile:9},
 {id:'estruturas',name:'Estruturas e mobiliário',short:'Estruturas e móveis',tile:9},
 {id:'brindes',name:'Brindes e embalagens',short:'Brindes e embalagens',tile:6},
 {id:'uniformes',name:'Uniformes personalizados',short:'Uniformes',tile:10},
 {id:'trofeus',name:'Troféus e premiações',short:'Troféus',tile:11},
 {id:'arte',name:'Arte gráfica',short:'Criação de arte',tile:2}
];
const products=[
 {id:'cartao-de-visita',name:'Cartão de visita',cat:'papelaria',tile:0,tag:'Sua primeira impressão',desc:'Sua marca sempre à mão, com acabamento que faz a diferença.',options:['Laminação fosca','Verniz localizado','Quero orientação'],format:['Padrão','Personalizado'],qty:500,details:'Cartões para apresentar sua empresa. Consulte papéis, impressão frente e verso e combinações de acabamentos.'},
 {id:'panfletos-folders',name:'Panfletos e folders',cat:'papelaria',tile:1,tag:'Divulgue sua marca',desc:'Informação, ofertas e ideias que chegam mais longe.',options:['Panfleto sem dobra','Folder com dobra','Quero orientação'],format:['Pequeno','Médio','Grande','Personalizado'],qty:500,details:'Materiais para divulgação de produtos, serviços e campanhas. Informe as medidas desejadas nas observações.'},
 {id:'pastas',name:'Pastas personalizadas',cat:'papelaria',tile:2,desc:'Apresente documentos com a identidade da sua empresa.',options:['Com bolsa','Sem bolsa','Quero orientação'],format:['Para documentos A4','Personalizado'],qty:100,details:'Organize propostas e documentos com a sua marca. As opções de montagem e acabamento são avaliadas com a equipe.'},
 {id:'envelopes',name:'Envelopes timbrados',cat:'papelaria',tile:3,desc:'Cuidado com sua marca em cada correspondência.',options:['Impressão na frente','Impressão frente e verso','Quero orientação'],format:['Carta','Para documentos A4','Personalizado'],qty:100,details:'Envelopes com a identidade da empresa. Confirme as dimensões e os materiais disponíveis no atendimento.'},
 {id:'adesivos-vinil',name:'Adesivos em vinil',cat:'adesivos',tile:4,tag:'Do seu jeito',desc:'Sua identidade em diferentes superfícies e formatos.',options:['Meio-corte eletrônico','Recorte simples','Quero orientação'],format:['Redondo','Retangular','Personalizado'],qty:100,details:'Adesivos em vinil para comunicação e identificação. Conte em qual superfície pretende aplicar para receber a orientação adequada.'},
 {id:'rotulos',name:'Rótulos para embalagens',cat:'adesivos',tile:4,desc:'A apresentação que valoriza o seu produto.',options:['Vinil','Preciso de indicação de material'],format:['Redondo','Retangular','Personalizado'],qty:100,details:'Informe o tipo de embalagem, o tamanho e as condições de uso para avaliar o material indicado.'},
 {id:'sacolas-kraft',name:'Sacolas de papel kraft',cat:'brindes',tile:5,tag:'Embalagens com marca',desc:'Uma embalagem que acompanha a experiência da sua marca.',options:['Impressão da marca','Preciso de criação'],format:['Pequena','Média','Grande','Personalizado'],qty:100,details:'Sacolas para lojas, eventos e presentes. Tamanhos, impressão e opções de alça são confirmados no orçamento.'},
 {id:'canecas',name:'Canecas personalizadas',cat:'brindes',tile:6,desc:'Um presente que leva sua marca para o dia a dia.',options:['Logo da empresa','Arte personalizada','Quero orientação'],format:['Consultar modelos'],qty:10,details:'Canecas para ações corporativas, lembranças e presentes. Envie a ideia e confirme os modelos disponíveis.'},
 {id:'copos-long-drink',name:'Copos long drink',cat:'brindes',tile:7,desc:'Personalidade para suas festas, eventos e ações.',options:['Logo da empresa','Arte para evento','Quero orientação'],format:['Consultar capacidades'],qty:50,details:'Copos personalizados com a sua identidade. Informe a cor e a capacidade desejadas para consultar as opções.'},
 {id:'canetas',name:'Canetas personalizadas',cat:'brindes',tile:8,desc:'Sua marca presente em pequenos momentos.',options:['Logo da empresa','Nome ou mensagem','Quero orientação'],format:['Consultar modelos'],qty:100,details:'Brindes para empresas e eventos. Modelos, cores e área de personalização são combinados com a equipe.'},
 {id:'banners',name:'Banners personalizados',cat:'visual',tile:9,tag:'Sua marca em destaque',desc:'Destaque para eventos, promoções e pontos de venda.',options:['Com acabamento para pendurar','Com suporte — consultar','Quero orientação'],format:['Vertical','Horizontal','Personalizado'],qty:1,details:'Informe as medidas, o local de uso e se precisa de suporte. O acabamento é definido conforme o seu projeto.'},
 {id:'lonas',name:'Lonas impressas',cat:'visual',tile:9,desc:'Espaço para grandes ideias e grandes mensagens.',options:['Com ilhós','Sem ilhós','Quero orientação'],format:['Sob medida'],qty:1,details:'Lonas para divulgação e comunicação visual. Informe largura, altura e aplicação pretendida nas observações.'},
 {id:'fachadas-acm',name:'Fachadas em ACM',cat:'visual',photo:'sinalizacao.png',desc:'Presença e identidade para a frente do seu negócio.',options:['Preciso de um novo projeto','Quero renovar minha fachada'],format:['Projeto sob medida'],qty:1,details:'Projeto de fachada com a identidade da empresa. Envie medidas aproximadas, fotos do local e a cidade de instalação durante o atendimento.'},
 {id:'totens',name:'Totens personalizados',cat:'visual',tile:9,desc:'Sua marca bem posicionada em cada ambiente.',options:['Uso interno','Uso externo','Quero orientação'],format:['Sob medida'],qty:1,details:'Totens para identificação e divulgação. Material, estrutura e medidas são definidos conforme a aplicação.'},
 {id:'placas',name:'Placas de sinalização',cat:'visual',photo:'sinalizacao.png',desc:'Oriente, identifique e comunique com clareza.',options:['Identificação','Sinalização','Informativa'],format:['Sob medida'],qty:1,details:'Placas para ambientes e comunicação visual. A equipe orienta sobre material, acabamento e informações necessárias para o projeto.'},
 {id:'uniformes',name:'Uniformes personalizados',cat:'uniformes',tile:10,tag:'Vista sua identidade',desc:'Unidade e personalidade para empresas e equipes.',options:['Camiseta','Camisa','Calça','Colete','Jaqueta','Bermuda'],format:['Tamanhos variados — informar'],qty:10,details:'Informe o modelo desejado, a quantidade por tamanho e os locais de aplicação da arte. Cores, tecidos e personalização dependem do projeto.'},
 {id:'trofeus',name:'Troféus personalizados',cat:'trofeus',tile:11,tag:'Celebre as conquistas',desc:'Premiações feitas para contar a história do seu evento.',options:['Esportivo','Corporativo','Evento personalizado'],format:['Sob medida'],qty:3,details:'Troféus para competições e homenagens. Envie o nome do evento, a modalidade, o texto e as referências para criação.'},
 {id:'criacao-de-arte',name:'Criação de arte gráfica',cat:'arte',tile:2,desc:'Dê forma à sua ideia com a ajuda da Criart.',options:['Criar uma arte','Ajustar arquivo existente','Avaliar arquivo para impressão'],format:['Conforme o produto'],qty:1,details:'Suporte para arquivos em PDF, Corel e Illustrator ou criação de uma nova arte. O arquivo é enviado durante o atendimento pelo WhatsApp.'},
 {id:'estruturas-metalon',name:'Estruturas em metalon',cat:'estruturas',photo:'estruturas-criart.png',desc:'Estruturas resistentes para fachadas, eventos, displays e projetos especiais.',options:['Estrutura interna','Estrutura externa','Quero orientação'],format:['Sob medida'],qty:1,details:'Fabricamos estruturas em metalon com ferragens, pintura e acabamento definidos para o seu projeto.'},
 {id:'ferragens',name:'Ferragens e componentes',cat:'estruturas',photo:'estruturas-criart.png',desc:'Ferragens, suportes e componentes para montagem e instalação.',options:['Suportes','Perfis e ferragens','Quero orientação'],format:['Sob medida'],qty:1,details:'Avaliamos medidas, aplicação e carga para indicar ferragens e componentes adequados.'},
 {id:'estruturas-personalizadas',name:'Estruturas personalizadas',cat:'estruturas',photo:'estruturas-criart.png',desc:'Projetos sob medida para comunicação visual, lojas e eventos.',options:['Projeto novo','Adequação de estrutura','Quero orientação'],format:['Sob medida'],qty:1,details:'Desenvolvemos estruturas personalizadas para cada ambiente, necessidade e identidade visual.'},
 {id:'moveis-planejados',name:'Móveis planejados',cat:'estruturas',photo:'estruturas-criart.png',desc:'Móveis planejados para organizar e valorizar seu espaço.',options:['Balcão','Painel','Armário','Quero orientação'],format:['Sob medida'],qty:1,details:'Criamos móveis planejados para lojas, escritórios e ambientes comerciais, com medidas e acabamentos personalizados.'}
];
products.push(
 {id:'kits-corporativos',name:'Kits corporativos',cat:'brindes',image:'assets/catalog/p47.jpg',desc:'Conjuntos personalizados para presentear clientes e equipes.',options:['Kit de boas-vindas','Kit para evento','Quero montar meu kit'],format:['Composição personalizada'],qty:10,details:'Informe os itens desejados, a quantidade de kits e a ocasião. A equipe confirma os modelos, a embalagem e as opções de personalização.'},
 {id:'verniz-localizado',name:'Verniz localizado',cat:'papelaria',image:'assets/catalog/p64.jpg',desc:'Brilho em áreas selecionadas para destacar os detalhes da sua arte.',options:['Destaque no logotipo','Destaque em detalhes','Quero orientação'],format:['Conforme o impresso'],qty:100,details:'Acabamento aplicado em áreas específicas da arte. Informe o impresso desejado; a equipe avalia o papel, a máscara de verniz e a compatibilidade do projeto.'},
 {id:'hot-stamping',name:'Hot stamping',cat:'papelaria',image:'assets/catalog/p63.jpg',desc:'Acabamento metalizado para valorizar marcas, embalagens e impressos.',options:['Dourado — consultar','Prateado — consultar','Quero orientação'],format:['Conforme o impresso'],qty:100,details:'Informe o material, a área de aplicação e a quantidade. Cores, preparação da arte e viabilidade do acabamento são confirmadas no orçamento.'},
 {id:'material-em-pvc',name:'Material em PVC',cat:'visual',image:'assets/catalog/p62.jpg',desc:'Peças em PVC personalizadas para identificação e comunicação visual.',options:['Placa de identificação','Peça promocional','Quero orientação'],format:['Sob medida'],qty:1,details:'Conte onde a peça será utilizada e informe as medidas desejadas. A equipe confirma espessura, impressão, recorte e fixação conforme o projeto.'},
 {id:'luminarias-personalizadas',name:'Luminárias personalizadas',cat:'brindes',image:'assets/catalog/p61.jpg',desc:'Luminárias com a identidade do seu ambiente, marca ou presente.',options:['Logo da empresa','Arte personalizada','Quero orientação'],format:['Consultar modelos'],qty:1,details:'Envie sua ideia e a aplicação desejada. Modelos, dimensões, iluminação e possibilidades de personalização são avaliados no atendimento.'},
 {id:'bandeirolas',name:'Bandeirolas',cat:'visual',image:'assets/catalog/p60.jpg',desc:'Decoração personalizada para eventos, festas e ações promocionais.',options:['Arte para evento','Logo da empresa','Quero orientação'],format:['Triangular','Personalizado'],qty:1,details:'Informe o comprimento total, o tamanho das peças e a quantidade de conjuntos. Material, impressão e montagem são confirmados com a equipe.'},
 {id:'tapetes-personalizados',name:'Tapetes personalizados',cat:'brindes',image:'assets/catalog/p55.jpg',desc:'Receba seus clientes com um tapete que apresenta sua marca.',options:['Logo da empresa','Arte personalizada','Quero orientação'],format:['Sob medida'],qty:1,details:'Informe as medidas e o local de uso. A equipe orienta sobre materiais, cores e opções de personalização disponíveis para seu projeto.'},
 {id:'plotagem-de-projetos',name:'Plotagem de projetos',cat:'visual',image:'assets/catalog/p54.jpg',desc:'Impressão de plantas e desenhos técnicos para acompanhar seu projeto.',options:['Preto e branco','Colorida','Quero orientação'],format:['A0','A1','A2','Personalizado'],qty:1,details:'Informe quantidade de folhas, formato e escala desejada. Envie o arquivo no atendimento para avaliação da impressão e do acabamento.'},
 {id:'toalhas-personalizadas',name:'Toalhas personalizadas',cat:'brindes',image:'assets/catalog/p56.jpg',desc:'Toalhas personalizadas para presentes, eventos e ações da sua marca.',options:['Logo da empresa','Nome ou arte','Quero orientação'],format:['Consultar tamanhos'],qty:10,details:'Informe o uso, a quantidade e as medidas desejadas. Tecidos, cores e técnicas de personalização são confirmados no orçamento.'},
 {id:'vale-presente',name:'Vale presente',cat:'papelaria',image:'assets/catalog/p48.jpg',desc:'Vales impressos com a identidade da sua loja para presentear.',options:['Arte da loja','Arte para campanha','Quero orientação'],format:['Padrão — consultar','Personalizado'],qty:100,details:'Impressão de cartões de vale presente para sua empresa. Envie as informações, condições de uso e valores que deseja incluir na arte.'},
 {id:'cardapios',name:'Cardápios',cat:'papelaria',image:'assets/catalog/p50.jpg',desc:'Apresente pratos, bebidas e preços com a identidade do seu negócio.',options:['Folha avulsa','Com dobra','Quero orientação'],format:['A4','A5','Personalizado'],qty:10,details:'Envie os itens, preços, fotos e a identidade visual do estabelecimento. Formato, papel e opções de acabamento são definidos com a equipe.'}
);
const catName = id => categories.find(c=>c.id===id)?.name || '';
const productImages={
 'Cartão de visita':'p01.jpg','Panfletos e folders':'p03.jpg','Pastas personalizadas':'p05.jpg','Envelopes timbrados':'p06.jpg',
 'Adesivos em vinil':'p17.jpg','Panfletos e folders':'p03.jpg','Pastas personalizadas':'p05.jpg','Envelopes timbrados':'p06.jpg','Rótulos para embalagens':'p12.jpg','Sacolas de papel kraft':'p33.jpg','Canecas personalizadas':'assets/catalog/optimized/caneca.webp','Copos long drink':'p35.jpg','Canetas personalizadas':'p39.jpg','Banners personalizados':'p20.jpg','Lonas impressas':'p21.jpg','Fachadas em ACM':'p25.jpg','Totens personalizados':'p24.jpg','Placas de sinalização':'p22.jpg','Uniformes personalizados':'assets/uniformes-catalogo.png','Troféus personalizados':'p40.jpg','Criação de arte gráfica':'p11.jpg','Estruturas em metalon':'assets/estrutura-metalon.png','Ferragens e componentes':'assets/ferragens.png','Estruturas personalizadas':'assets/estrutura-personalizada.png','Móveis planejados':'assets/moveis-planejados.png'
};
function thumb(p,extra='') {const generated=p.image||productImages[p.name]||productImages[p.short];if(generated){const imageSrc=generated.includes('/')?generated:`assets/catalog/${generated}`;return `<span class="thumb generated-thumb ${extra}"><img src="${imageSrc}" alt="Imagem demonstrativa de ${esc(p.name||p.short)}" loading="lazy"></span>`;}if(p.photo)return `<span class="thumb photo-thumb ${extra}"><img src="assets/${p.photo}" alt="Referência de comunicação visual Criart" loading="lazy"></span>`;const n=p.tile; return `<span class="thumb ${extra}" role="img" aria-label="Ilustração de ${esc(p.name||p.short)}" style="--x:${(n%4)*100/3}%;--y:${Math.floor(n/4)*50}%"></span>`;}
function productWhatsAppHref(p, extra=''){const message=`Olá, Criart! Tenho interesse em ${p.name}. Gostaria de receber um orçamento com opções de acabamento, prazo e entrega.${extra?`\n\nDetalhes: ${extra}`:''}`;return `https://wa.me/5568999746753?text=${encodeURIComponent(message)}`;}
function cards(items){return items.map(p=>`<article class="product-card"><a href="#produto/${p.id}" class="thumb-link" tabindex="-1" aria-hidden="true">${p.tag?`<span class="tag">${esc(p.tag)}</span>`:''}${thumb(p)}</a><div class="product-info"><span class="category">${esc(catName(p.cat))}</span><h3><a href="#produto/${p.id}">${esc(p.name)}</a></h3><p>${esc(p.desc)}</p><span class="quote-label">Personalizado para você</span><strong>Sob consulta</strong><a href="${productWhatsAppHref(p)}" class="button orange" target="_blank" rel="noopener">Pedir orçamento no WhatsApp</a><a href="#produto/${p.id}" class="product-details-link">Ver detalhes e personalizar</a></div></article>`).join('');}
const quickMenu=[
  ['Todos os produtos','catalogo'],['Cartões de visita','categoria/papelaria'],['Comunicação visual','categoria/visual'],['Adesivos','categoria/adesivos'],['Brindes personalizados','categoria/brindes'],['Uniformes','categoria/uniformes'],['Troféus e premiações','categoria/trofeus'],['Arte gráfica','categoria/arte']
];
const catalogNames=[
  'Cartão de visita','Cartão de visita duplo','Panfleto','Folder','Pastas','Envelopes','Papel timbrado','Talões numerados','Receituário','Cartaz','Convite','Catálogos e revistas','Adesivos em vinil','Adesivo para vitrine','Rótulos','Lacres de segurança','Banners','Faixas e lonas','Placas','Totem','Roll up','Wind banner','Displays','Fachadas em ACM','Sacolas kraft','Caixas e embalagens','Copos personalizados','Canecas personalizadas','Canetas personalizadas','Garrafas personalizadas','Camisetas personalizadas','Uniformes','Troféus','Medalhas','Brindes corporativos','Calendários','Cadernos','Blocos de anotações','Tags','Ímãs','Mouse pad','Chaveiros','Crachás','Cardápios','Comandas','Carimbos','Certificados','Pastas com bolsa','Vale presente','Papel de parede','Plotagem de projetos','Tapetes personalizados','Toalhas personalizadas','Urnas para sorteio','Viseiras','Bandeiras','Bandeirolas','Luminárias personalizadas','Material em PVC','Hot stamping','Verniz localizado','Kits corporativos','Estruturas em metalon','Ferragens e componentes','Estruturas personalizadas','Móveis planejados'
];
const catalogVisuals={
 'Cartão de visita':'p01.jpg','Cartão de visita duplo':'p02.jpg','Panfleto':'p03.jpg','Folder':'p04.jpg','Pastas':'p05.jpg','Envelopes':'p06.jpg','Papel timbrado':'assets/catalog/optimized/papel-timbrado.webp','Talões numerados':'p07.jpg','Receituário':'p08.jpg','Cartaz':'p09.jpg','Convite':'p10.jpg','Catálogos e revistas':'p11.jpg','Adesivos em vinil':'p17.jpg','Adesivo para vitrine':'p18.jpg','Rótulos':'p12.jpg','Lacres de segurança':'assets/lacres-seguranca.png','Banners':'p20.jpg','Faixas e lonas':'p21.jpg','Placas':'p22.jpg','Totem':'p24.jpg','Roll up':'p19.jpg','Wind banner':'p26.jpg','Displays':'p23.jpg','Fachadas em ACM':'p25.jpg','Sacolas kraft':'p33.jpg','Caixas e embalagens':'p34.jpg','Copos personalizados':'p35.jpg','Canecas personalizadas':'assets/catalog/optimized/caneca.webp','Canetas personalizadas':'p39.jpg','Garrafas personalizadas':'p36.jpg','Camisetas personalizadas':'p37.jpg','Uniformes':'assets/uniformes-catalogo.png','Troféus':'p40.jpg','Medalhas':'p41.jpg','Brindes corporativos':'assets/brindes-corporativos.png','Calendários':'assets/catalog/optimized/calendario.webp','Cadernos':'p42.jpg','Blocos de anotações':'p43.jpg','Tags':'assets/catalog/optimized/tags.webp','Ímãs':'assets/imas-personalizados.png','Mouse pad':'p49.jpg','Chaveiros':'p44.jpg','Crachás':'assets/crachas.png','Cardápios':'p50.jpg','Comandas':'p51.jpg','Carimbos':'p15.jpg','Certificados':'assets/certificados.png','Pastas com bolsa':'p52.jpg','Vale presente':'p48.jpg','Papel de parede':'p53.jpg','Plotagem de projetos':'p54.jpg','Tapetes personalizados':'p55.jpg','Toalhas personalizadas':'p56.jpg','Urnas para sorteio':'p57.jpg','Viseiras':'p58.jpg','Bandeiras':'assets/catalog/optimized/bandeira.webp','Bandeirolas':'p60.jpg','Luminárias personalizadas':'p61.jpg','Material em PVC':'p62.jpg','Hot stamping':'p63.jpg','Verniz localizado':'p64.jpg','Kits corporativos':'p47.jpg','Estruturas em metalon':'assets/estrutura-metalon.png','Ferragens e componentes':'assets/ferragens.png','Estruturas personalizadas':'assets/estrutura-personalizada.png','Móveis planejados':'assets/moveis-planejados.png'
};
const menuNormalize=s=>String(s).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();

// Every menu entry resolves to the same product data used by search, detail and budget.
const catalogAliases = {
 'Panfleto':'panfletos-folders','Pastas':'pastas','Envelopes':'envelopes','Rótulos':'rotulos',
 'Banners':'banners','Faixas e lonas':'lonas','Placas':'placas','Totem':'totens',
 'Sacolas kraft':'sacolas-kraft','Copos personalizados':'copos-long-drink','Uniformes':'uniformes','Troféus':'trofeus'
};
// name, category, description, model preferences, project guidance
const catalogSpecs = [
 ['Cartão de visita duplo','papelaria','Mais espaço para apresentar seus contatos e serviços em um cartão com dobra.',['Uma dobra','Quero orientação'],'Informe as medidas abertas e fechadas, a quantidade e o acabamento desejado.'],
 ['Folder','papelaria','Apresente seus serviços em um impresso com dobras e leitura organizada.',['Uma dobra','Duas dobras','Quero orientação'],'Informe tamanho, quantidade de dobras e conteúdo. A equipe orienta sobre papel e acabamento.'],
 ['Papel timbrado','papelaria','Folhas com a identidade da sua empresa para documentos e correspondências.',['Impressão na frente','Quero orientação'],'Envie o logotipo, os dados que deseja incluir e o formato da folha.'],
 ['Talões numerados','papelaria','Organize pedidos e registros com talões personalizados e numeração.',['Uma via','Múltiplas vias — consultar','Quero orientação'],'Informe as vias, a sequência inicial, o número de folhas e os campos necessários.'],
 ['Receituário','papelaria','Blocos personalizados para receitas e orientações de atendimento.',['Bloco','Folhas avulsas','Quero orientação'],'Envie os dados profissionais, campos e medidas desejadas para avaliação da arte.'],
 ['Cartaz','papelaria','Divulgue campanhas, eventos e ofertas com cartazes personalizados.',['Colorido','Quero orientação'],'Informe dimensões, quantidade e local de exposição para orientar o papel e acabamento.'],
 ['Convite','papelaria','Convites personalizados para celebrar eventos e ocasiões especiais.',['Social','Corporativo','Quero orientação'],'Envie data, local, texto e referências do evento. Papéis e acabamentos são confirmados no orçamento.'],
 ['Catálogos e revistas','papelaria','Organize produtos, serviços e conteúdos em uma publicação impressa.',['Catálogo','Revista','Quero orientação'],'Informe formato, número de páginas, tiragem e tipo de encadernação desejado.'],
 ['Adesivo para vitrine','adesivos','Personalize o vidro da sua loja com campanhas e identidade visual.',['Recorte','Impressão','Quero orientação'],'Informe medidas do vidro e aplicação interna ou externa. Confirme material e instalação no atendimento.'],
 ['Lacres de segurança','adesivos','Identifique a abertura de embalagens com lacres personalizados.',['Para embalagem','Para delivery','Quero orientação'],'Informe superfície, medidas e condições de uso para avaliar a opção de lacre adequada.'],
 ['Roll up','visual','Divulgação portátil em um expositor retrátil para eventos e atendimento.',['Impressão com estrutura — consultar','Reposição da impressão','Quero orientação'],'Informe as medidas e se já possui suporte. Compatibilidade e montagem são confirmadas pela equipe.'],
 ['Wind banner','visual','Bandeiras promocionais para destacar sua marca em eventos e fachadas.',['Com suporte — consultar','Somente tecido','Quero orientação'],'Informe altura, local de uso e necessidade de base para consultar modelos disponíveis.'],
 ['Displays','visual','Destaque produtos e mensagens no balcão ou no ponto de venda.',['De balcão','De chão','Quero orientação'],'Informe medidas, ambiente e o conteúdo que será exposto para definir material e montagem.'],
 ['Caixas e embalagens','brindes','Apresente seus produtos em embalagens com a identidade da sua marca.',['Caixa para produto','Caixa para presente','Quero orientação'],'Informe o produto, suas dimensões, peso e quantidade de embalagens desejada.'],
 ['Garrafas personalizadas','brindes','Leve sua marca para a rotina com garrafas personalizadas.',['Logo da empresa','Nome ou arte','Quero orientação'],'Informe capacidade desejada e quantidade. Modelos, materiais e cores são confirmados pela equipe.'],
 ['Camisetas personalizadas','uniformes','Camisetas com sua arte para equipes, eventos e campanhas.',['Logo da empresa','Arte para evento','Quero orientação'],'Informe quantidades por tamanho, cores e posições da estampa. Tecidos e técnicas são avaliados no orçamento.'],
 ['Medalhas','trofeus','Reconheça conquistas com medalhas personalizadas para seu evento.',['Esportiva','Homenagem','Quero orientação'],'Envie modalidade, nome do evento, quantidade e preferência de fita para consultar modelos.'],
 ['Brindes corporativos','brindes','Personalizados para aproximar sua marca de clientes e colaboradores.',['Para clientes','Para equipe','Para eventos'],'Conte a ocasião, a quantidade e os tipos de brinde desejados para receber opções.'],
 ['Calendários','papelaria','Calendários personalizados para manter sua marca presente o ano inteiro.',['De mesa','De parede','Quero orientação'],'Informe o ano, a quantidade e o modelo desejado. Revise datas e informações na aprovação da arte.'],
 ['Cadernos','papelaria','Cadernos personalizados para anotações, eventos e presentes.',['Capa personalizada','Quero orientação'],'Informe formato, quantidade de folhas e uso pretendido para consultar encadernação e acabamento.'],
 ['Blocos de anotações','papelaria','Blocos com sua identidade para registrar ideias e informações.',['Folhas pautadas','Folhas sem pauta','Quero orientação'],'Informe tamanho, quantidade de blocos e número de folhas por bloco.'],
 ['Tags','papelaria','Etiquetas penduradas para identificar e valorizar seus produtos.',['Com furo','Sem furo','Quero orientação'],'Envie medidas, formato e conteúdo. Cordão e acabamentos são consultados separadamente.'],
 ['Ímãs','brindes','Sua marca e seus contatos em ímãs personalizados.',['Retangular','Formato personalizado','Quero orientação'],'Informe tamanho, quantidade e arte desejada para consultar os materiais disponíveis.'],
 ['Mouse pad','brindes','Personalize a mesa de trabalho com a identidade da sua marca.',['Logo da empresa','Arte personalizada','Quero orientação'],'Informe medidas e quantidade. Material e área de impressão são confirmados no orçamento.'],
 ['Chaveiros','brindes','Pequenos presentes personalizados para divulgar sua empresa.',['Logo da empresa','Nome ou arte','Quero orientação'],'Informe formato, quantidade e referência do modelo. Materiais são confirmados pela equipe.'],
 ['Crachás','brindes','Identificação personalizada para equipes, visitantes e eventos.',['Equipe','Evento','Visitantes'],'Informe quantidade, dados variáveis e necessidade de cordão ou suporte.'],
 ['Comandas','papelaria','Organize o atendimento com comandas impressas para seu negócio.',['Bloco','Folhas avulsas','Quero orientação'],'Informe os campos, formato, quantidade e necessidade de numeração.'],
 ['Carimbos','papelaria','Carimbos personalizados para facilitar a identificação de documentos.',['Texto','Logotipo','Texto e logotipo'],'Envie o conteúdo e as dimensões desejadas. Consulte modelos e área de gravação.'],
 ['Certificados','papelaria','Valorize cursos, eventos e homenagens com certificados impressos.',['Curso','Evento','Homenagem'],'Envie textos, nomes e quantidade. Papel, formato e personalização dos dados são avaliados pela equipe.'],
 ['Pastas com bolsa','papelaria','Organize documentos e propostas em pastas com bolsa interna.',['Uma bolsa','Duas bolsas — consultar','Quero orientação'],'Informe formato dos documentos, quantidade e arte desejada para definir montagem e acabamento.'],
 ['Papel de parede','visual','Transforme ambientes com estampas e imagens personalizadas.',['Arte da marca','Estampa personalizada','Quero orientação'],'Envie medidas e foto da parede. Material, emendas e instalação são confirmados no atendimento.'],
 ['Urnas para sorteio','brindes','Urnas personalizadas para campanhas, pesquisas e sorteios.',['Personalização com logo','Arte de campanha','Quero orientação'],'Informe tamanho, quantidade e uso previsto para consultar material e montagem.'],
 ['Viseiras','uniformes','Personalize viseiras para ações promocionais, equipes e eventos.',['Logo da empresa','Arte para evento','Quero orientação'],'Informe quantidade e cores desejadas. Modelos e técnicas de personalização são confirmados no orçamento.'],
 ['Bandeiras','visual','Bandeiras personalizadas para sua marca, instituição ou evento.',['Para mastro','Para exposição','Quero orientação'],'Informe dimensões, ambiente de uso e acabamento desejado para consultar materiais.']
];

const catalogPath = value => value.includes('/') ? value : `assets/catalog/${value}`;
Object.keys(catalogVisuals).forEach(name=>{const file=catalogVisuals[name].split('/').pop().replace(/\.[^.]+$/,'.webp');catalogVisuals[name]=`assets/catalog/optimized/${file}`;});
// High-definition originals for products previously using small contact-sheet crops.
Object.assign(catalogVisuals, {
 "Cartão de visita": "assets/catalog/hd/cartao-de-visita.webp",
 "Cartão de visita duplo": "assets/catalog/hd/cartao-de-visita-duplo.webp",
 "Panfleto": "assets/catalog/hd/panfletos-folders.webp",
 "Folder": "assets/catalog/hd/folder.webp",
 "Pastas": "assets/catalog/hd/pastas.webp",
 "Envelopes": "assets/catalog/hd/envelopes.webp",
 "Talões numerados": "assets/catalog/hd/taloes-numerados.webp",
 "Receituário": "assets/catalog/hd/receituario.webp",
 "Cartaz": "assets/catalog/hd/cartaz.webp",
 "Convite": "assets/catalog/hd/convite.webp",
 "Catálogos e revistas": "assets/catalog/hd/catalogos-e-revistas.webp",
 "Adesivos em vinil": "assets/catalog/hd/adesivos-vinil.webp",
 "Adesivo para vitrine": "assets/catalog/hd/adesivo-para-vitrine.webp",
 "Rótulos": "assets/catalog/hd/rotulos.webp",
 "Banners": "assets/catalog/hd/banners.webp",
 "Faixas e lonas": "assets/catalog/hd/lonas.webp",
 "Placas": "assets/catalog/hd/placas.webp",
 "Totem": "assets/catalog/hd/totens.webp",
 "Roll up": "assets/catalog/hd/roll-up.webp",
 "Wind banner": "assets/catalog/hd/wind-banner.webp",
 "Displays": "assets/catalog/hd/displays.webp",
 "Fachadas em ACM": "assets/catalog/hd/fachadas-acm.webp",
 "Sacolas kraft": "assets/catalog/hd/sacolas-kraft.webp",
 "Caixas e embalagens": "assets/catalog/hd/caixas-e-embalagens.webp",
 "Copos personalizados": "assets/catalog/hd/copos-long-drink.webp",
 "Canetas personalizadas": "assets/catalog/hd/canetas.webp",
 "Garrafas personalizadas": "assets/catalog/hd/garrafas-personalizadas.webp",
 "Camisetas personalizadas": "assets/catalog/hd/camisetas-personalizadas.webp",
 "Troféus": "assets/catalog/hd/trofeus.webp",
 "Medalhas": "assets/catalog/hd/medalhas.webp",
 "Cadernos": "assets/catalog/hd/cadernos.webp",
 "Blocos de anotações": "assets/catalog/hd/blocos-de-anotacoes.webp",
 "Mouse pad": "assets/catalog/hd/mouse-pad.webp",
 "Chaveiros": "assets/catalog/hd/chaveiros.webp",
 "Cardápios": "assets/catalog/hd/cardapios.webp",
 "Comandas": "assets/catalog/hd/comandas.webp",
 "Carimbos": "assets/catalog/hd/carimbos.webp",
 "Pastas com bolsa": "assets/catalog/hd/pastas-com-bolsa.webp",
 "Vale presente": "assets/catalog/hd/vale-presente.webp",
 "Papel de parede": "assets/catalog/hd/papel-de-parede.webp",
 "Plotagem de projetos": "assets/catalog/hd/plotagem-de-projetos.webp",
 "Tapetes personalizados": "assets/catalog/hd/tapetes-personalizados.webp",
 "Toalhas personalizadas": "assets/catalog/hd/toalhas-personalizadas.webp",
 "Urnas para sorteio": "assets/catalog/hd/urnas-para-sorteio.webp",
 "Viseiras": "assets/catalog/hd/viseiras.webp",
 "Bandeirolas": "assets/catalog/hd/bandeirolas.webp",
 "Luminárias personalizadas": "assets/catalog/hd/luminarias-personalizadas.webp",
 "Material em PVC": "assets/catalog/hd/material-em-pvc.webp",
 "Hot stamping": "assets/catalog/hd/hot-stamping.webp",
 "Verniz localizado": "assets/catalog/hd/verniz-localizado.webp",
 "Kits corporativos": "assets/catalog/hd/kits-corporativos.webp"
});
const catalogProducts = catalogNames.map(name => {
 const existing = products.find(p => p.name === name || p.id === catalogAliases[name]);
 const spec = catalogSpecs.find(row => row[0] === name);
 if (!existing && !spec) throw new Error(`Produto sem cadastro: ${name}`);
 const p = existing || {id:menuNormalize(name).replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,''),name,cat:spec[1],desc:spec[2],options:spec[3],format:['Sob consulta','Personalizado'],qty:1,details:spec[4]};
 const priorName = p.name;
 return {...p,name,image:catalogPath(catalogVisuals[name]),searchTerms:priorName};
});
const artService = products.find(p => p.id === 'criacao-de-arte');
artService.image='assets/catalog/optimized/arte-grafica.webp';
products.splice(0, products.length, ...catalogProducts, artService);
// Keep the established Panfletos/folders URL while giving each product its own page.
const panfleto = products.find(p => p.id === 'panfletos-folders');
Object.assign(panfleto,{desc:'Divulgue ofertas, eventos e serviços em panfletos personalizados.',options:['Impressão na frente','Impressão frente e verso','Quero orientação'],details:'Informe tamanho, quantidade e conteúdo. Papel e acabamento são confirmados com a equipe.'});
const categoryImages = {papelaria:'Cartão de visita',adesivos:'Adesivos em vinil',visual:'Fachadas em ACM',estruturas:'Estruturas em metalon',brindes:'Kits corporativos',uniformes:'Uniformes',trofeus:'Medalhas'};
categories.forEach(c => {c.image=c.id==='arte'?artService.image:catalogProducts.find(p=>p.name===categoryImages[c.id])?.image;});
$('#category-tiles').innerHTML=categories.map(c=>`<a href="#categoria/${c.id}" class="category-tile">${thumb(c)}<span>${c.short}</span></a>`).join('');
$('#product-grid').innerHTML=cards(products);
$('#result-count').textContent=products.length+' produtos';
$('#filter-chips').innerHTML=`<button class="active" data-category="all">Todos</button>`+categories.map(c=>`<button data-category="${c.id}">${c.short}</button>`).join('');
const productHref=name=>`#produto/${catalogProducts.find(p=>p.name===name).id}`;
$('#mega-menu').innerHTML=`<div class="mega-quick"><div class="mega-title"><span data-icon="menu"></span><strong>Atalhos</strong></div>${quickMenu.map(([label,route],i)=>`<a class="${i===0?'selected':''}" href="#${route}">${esc(label)}</a>`).join('')}<a class="mega-help" href="#ajuda">Como fazer meu pedido?</a></div><div class="mega-all"><div class="mega-heading"><div><span class="eyebrow">CATÁLOGO CRIART</span><h2>Todos os produtos</h2></div><span>${catalogNames.length} opções para personalizar</span></div><div class="mega-products">${catalogNames.map(name=>{const image=catalogVisuals[name];const imageSrc=image.includes('/')?image:`assets/catalog/${image}`;return `<a class="catalog-product-link" style="--catalog-image:url('${imageSrc}')" href="${productHref(name)}"><span>${esc(name)}</span></a>`}).join('')}</div></div>`;
$('#year').textContent=new Date().getFullYear();renderIcons();
let activeCategory='all', searchQuery='', cart=[];
const storageKey='criart-orcamento-v1';
try {const saved=JSON.parse(sessionStorage.getItem(storageKey)||'[]');if(Array.isArray(saved))cart=saved.filter(i=>products.some(p=>p.id===i.id)&&Number.isInteger(i.quantity)&&i.quantity>0&&i.quantity<=1000000&&typeof i.key==='string').slice(0,30).map(i=>({...i,finish:String(i.finish||'').slice(0,120),format:String(i.format||'').slice(0,120),art:String(i.art||'').slice(0,120),notes:String(i.notes||'').slice(0,350)}));}catch{}
const normalize=s=>String(s).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
function showToast(message){$('#toast').textContent=message;$('#toast').hidden=false;clearTimeout(showToast.timer);showToast.timer=setTimeout(()=>$('#toast').hidden=true,3500);}
function saveCart(){try{sessionStorage.setItem(storageKey,JSON.stringify(cart));}catch{}$('#cart-count').textContent=cart.length;$('#cart-open').setAttribute('aria-label',`Abrir meu orçamento: ${cart.length} ${cart.length===1?'item':'itens'}`);renderCart();}
function filterProducts(){let items=products.filter(p=>(activeCategory==='all'||p.cat===activeCategory)&&(!searchQuery||normalize(p.name+' '+(p.searchTerms||'')+' '+p.desc+' '+catName(p.cat)).includes(normalize(searchQuery))));const sort=$('#sort').value;if(sort==='az'||sort==='za')items.sort((a,b)=>a.name.localeCompare(b.name,'pt-BR')*(sort==='az'?1:-1));$('#product-grid').innerHTML=items.length?cards(items):`<div class="empty-results"><h3>Nenhum produto encontrado</h3><p>Tente buscar por “cartão”, “adesivo” ou “caneca”. Se sua ideia for diferente, converse com a Criart.</p><a class="button orange" href="#catalogo">Ver todos os produtos</a></div>`;$('#result-count').textContent=`${items.length} ${items.length===1?'produto':'produtos'}`;$('#catalog-title').textContent=searchQuery?`Resultados para “${searchQuery}”`:activeCategory==='all'?'Todos os produtos':catName(activeCategory);$('#catalog-eyebrow').textContent=searchQuery?'ENCONTRE SEU PRODUTO':'SOLUÇÕES PARA O SEU NEGÓCIO';$$('[data-category]').forEach(b=>{b.classList.toggle('active',b.dataset.category===activeCategory);b.setAttribute('aria-pressed',String(b.dataset.category===activeCategory));});}
function closeMenu(){$('#mega-menu').hidden=true;$('#all-categories').setAttribute('aria-expanded','false');}
function fitMenu(){const menu=$('#mega-menu');if(!menu.hidden)menu.style.maxHeight=`${Math.max(120,window.innerHeight-menu.getBoundingClientRect().top-12)}px`;}
$('#all-categories').addEventListener('click',()=>{const open=$('#mega-menu').hidden;$('#mega-menu').hidden=!open;$('#all-categories').setAttribute('aria-expanded',String(open));if(open)fitMenu();});
window.addEventListener('resize',fitMenu);window.addEventListener('scroll',fitMenu,{passive:true});
document.addEventListener('click',e=>{if(!e.target.closest('.nav-wrap'))closeMenu();});document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu();});
$('#search-form').addEventListener('submit',e=>{e.preventDefault();const value=$('#search').value.trim().slice(0,100);location.hash=value?'busca/'+encodeURIComponent(value):'catalogo';if(!value)renderRoute();});
$('#sort').addEventListener('change',filterProducts);
$('#filter-chips').addEventListener('click',e=>{const b=e.target.closest('[data-category]');if(!b)return;location.hash=b.dataset.category==='all'?'catalogo':'categoria/'+b.dataset.category;});
function optionList(options){return options.map(o=>`<option>${esc(o)}</option>`).join('');}
function renderProduct(p){document.title=p.name+' | Criart';$('#product-view').innerHTML=`<nav class="breadcrumb" aria-label="Caminho de navegação"><a href="#inicio">Início</a><span>/</span><a href="#categoria/${p.cat}">${catName(p.cat)}</a><span>/</span><span>${p.name}</span></nav><div class="product-detail"><div class="product-detail-image">${thumb(p)}<p>Imagem ilustrativa. Seu produto será personalizado com a sua arte.</p></div><div><span class="detail-badge">${catName(p.cat)}</span><h1>${p.name}</h1><p class="description">${p.desc}</p><form id="config-form" class="config-form"><div class="field-grid"><div><label for="product-finish">${p.id==='criacao-de-arte'?'O que você precisa?':'Modelo ou acabamento'}</label><select id="product-finish" required>${optionList(p.options)}</select></div><div><label for="product-format">Formato desejado</label><select id="product-format" required>${optionList(p.format)}</select></div><div><label for="product-quantity">Quantidade desejada</label><input id="product-quantity" type="number" min="1" max="1000000" step="1" value="${p.qty}" inputmode="numeric" required></div><div><label for="product-art">Sua arte</label><select id="product-art"><option>Já tenho a arte</option><option>Preciso criar a arte</option><option>Preciso de ajuda para decidir</option></select></div></div><label for="product-notes">Detalhes do projeto <small>(opcional)</small></label><textarea id="product-notes" rows="3" maxlength="350" placeholder="Informe medidas, cores, tamanhos ou a data desejada"></textarea><div class="detail-price"><span>Orçamento personalizado</span><strong>Sob consulta</strong></div><button class="button orange" type="submit">${icon('bag')} Adicionar ao orçamento</button><p class="detail-note">As opções indicam suas preferências. A equipe confirma materiais, disponibilidade, valores e prazo.</p></form><a class="button direct-whatsapp" target="_blank" rel="noopener" href="${productWhatsAppHref(p)}">${icon('chat')} Tenho interesse neste produto</a><details class="detail-info" open><summary>Sobre este produto</summary><p>${p.details}</p></details><details class="detail-info"><summary>Como envio minha arte?</summary><p>Envie o arquivo na conversa com a Criart pelo WhatsApp. A equipe avalia os arquivos em PDF, Corel ou Illustrator e orienta sobre a produção.</p></details><a href="#categoria/${p.cat}" class="back-catalog">Continuar explorando ${catName(p.cat).toLowerCase()}</a></div></div>`;
const syncDirectInterest=()=>{const info=[`Quantidade: ${$('#product-quantity').value}`,`Preferência: ${$('#product-finish').value}`,`Formato: ${$('#product-format').value}`,`Arte: ${$('#product-art').value}`];const notes=$('#product-notes').value.trim();if(notes)info.push(`Observações: ${notes}`);$('.direct-whatsapp').href=productWhatsAppHref(p,info.join('\n'));};
$('#config-form').addEventListener('input',syncDirectInterest);$('#config-form').addEventListener('change',syncDirectInterest);syncDirectInterest();
$('#config-form').addEventListener('submit',e=>{e.preventDefault();if(!e.target.reportValidity())return;const quantity=Number($('#product-quantity').value);if(!Number.isSafeInteger(quantity)||quantity<1||quantity>1000000)return;const item={key:typeof crypto.randomUUID==='function'?crypto.randomUUID():Date.now()+'-'+Math.random().toString(16).slice(2),id:p.id,quantity,finish:$('#product-finish').value,format:$('#product-format').value,art:$('#product-art').value,notes:$('#product-notes').value.trim()};if(cart.length>=30){showToast('Você já tem 30 itens. Envie este orçamento antes de montar outro.');return;}cart.push(item);saveCart();openCart();});}
function renderRoute(){closeMenu();let hash;try{hash=decodeURIComponent(location.hash.slice(1));}catch{hash='catalogo';}const isProduct=hash.startsWith('produto/');const categoryRoute=hash.startsWith('categoria/');const searchRoute=hash.startsWith('busca/');$('#home-view').hidden=isProduct||categoryRoute||searchRoute;$('#home-bottom').hidden=isProduct;$('#catalogo').hidden=isProduct;$('#product-view').hidden=!isProduct;
if(isProduct){const p=products.find(x=>x.id===hash.slice(8));if(p){renderProduct(p);window.scrollTo({top:0,behavior:'instant'});}else{$('#product-view').innerHTML='<div class="empty-results"><h1>Produto não encontrado</h1><p>Explore as opções disponíveis no catálogo da Criart.</p><a class="button orange" href="#catalogo">Voltar ao catálogo</a></div>';}return;}
document.title='Criart | Sua gráfica, do seu jeito';activeCategory=categoryRoute?hash.slice(10):'all';if(!categories.some(c=>c.id===activeCategory))activeCategory='all';searchQuery=searchRoute?hash.slice(6).slice(0,100):'';$('#search').value=searchQuery;filterProducts();if(categoryRoute||searchRoute||hash==='catalogo')$('#catalogo').scrollIntoView({behavior:'instant',block:'start'});else if(['ajuda','arquivos','inicio'].includes(hash)){const target=hash==='inicio'?$('#main') :document.getElementById(hash);target.scrollIntoView({behavior:'instant',block:'start'});}}
window.addEventListener('hashchange',renderRoute);
function cartMessage(){const lines=['Olá, Criart! Montei meu orçamento pelo site:',''];cart.forEach((item,n)=>{const p=products.find(p=>p.id===item.id);lines.push(`${n+1}. ${p.name}`,`Quantidade: ${item.quantity}`,`Preferência: ${item.finish}`,`Formato: ${item.format}`,`Arte: ${item.art}`);if(item.notes)lines.push('Detalhes: '+item.notes);lines.push('');});const extra=$('#cart-notes').value.trim();if(extra)lines.push('Observações gerais: '+extra,'');lines.push('Pode me informar os valores, a disponibilidade e o prazo?');return lines.join('\n');}
function updateMessage(){$('#send-budget').href='https://wa.me/5568999746753?text='+encodeURIComponent(cartMessage());}
function renderCart(){$('#cart-notes-wrap').hidden=cart.length===0;$('#cart-items').innerHTML=cart.length?cart.map(item=>{const p=products.find(p=>p.id===item.id);return `<article class="cart-item" data-key="${esc(item.key)}">${thumb(p)}<div><h3>${p.name}</h3><p>${esc(item.finish)} · ${esc(item.format)}</p><p>${esc(item.art)}</p>${item.notes?`<p>${esc(item.notes)}</p>`:''}<div class="quantity-edit"><label for="qty-${esc(item.key)}">Quantidade</label><input id="qty-${esc(item.key)}" type="number" min="1" max="1000000" step="1" value="${item.quantity}" data-quantity="${esc(item.key)}" aria-label="Quantidade de ${p.name}"></div></div><button class="remove" data-remove="${esc(item.key)}" aria-label="Remover ${p.name}">${icon('close')}</button></article>`;}).join(''):`<div class="empty-cart">${icon('bag')}<h3>Sua próxima ideia começa aqui.</h3><p>Escolha um produto e adicione os detalhes ao seu orçamento.</p><button class="button orange" id="explore-from-cart">Explorar produtos</button></div>`;$('#explore-from-cart')?.addEventListener('click',()=>{$('#cart-dialog').close();location.hash='catalogo';});updateMessage();}
function openCart(){renderCart();if(!$('#cart-dialog').open)$('#cart-dialog').showModal();}
$('#cart-open').addEventListener('click',openCart);$('#cart-close').addEventListener('click',()=>$('#cart-dialog').close());$('#cart-dialog').addEventListener('click',e=>{if(e.target!==e.currentTarget)return;const r=e.currentTarget.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)e.currentTarget.close();});
$('#cart-items').addEventListener('click',e=>{const b=e.target.closest('[data-remove]');if(!b)return;cart=cart.filter(i=>i.key!==b.dataset.remove);saveCart();});
$('#cart-items').addEventListener('change',e=>{const input=e.target.closest('[data-quantity]');if(!input)return;const item=cart.find(i=>i.key===input.dataset.quantity);if(!item)return;const value=Number(input.value);if(!Number.isSafeInteger(value)||value<1||value>1000000){input.value=item.quantity;showToast('Informe uma quantidade inteira entre 1 e 1.000.000.');return;}item.quantity=value;saveCart();});
// Update the budget immediately while typing, before a visitor clicks WhatsApp.
$('#cart-items').addEventListener('input',e=>{const input=e.target.closest('[data-quantity]');if(!input)return;const item=cart.find(i=>i.key===input.dataset.quantity);const value=Number(input.value);if(!item||!Number.isSafeInteger(value)||value<1||value>1000000)return;item.quantity=value;try{sessionStorage.setItem(storageKey,JSON.stringify(cart));}catch{}updateMessage();});
$('#cart-notes').addEventListener('input',updateMessage);
const slides=[{bg:'#f2f2f2',eyebrow:'SUA GRÁFICA. DO SEU JEITO.',title:'Grandes ideias.<br><span style="color:#e95005">Impressões que ficam.</span>',description:'Do primeiro cartão à fachada do seu negócio.<br>A sua marca merece ser vista.',link:'#catalogo',label:'Explore nossos produtos',image:'hero-cards-v3.jpg',name:'Cartões de visita Criart'}, {bg:'#f2f2f2',eyebrow:'BRINDES QUE FAZEM PARTE DO DIA.',title:'Sua marca.<br><span style="color:#e95005">Sempre por perto.</span>',description:'Canecas, copos, canetas e embalagens.<br>Um jeito especial de ser lembrado.',link:'#categoria/brindes',label:'Conheça os personalizados',image:'hero-mug-v3.jpg',name:'Caneca personalizada Criart'},{bg:'#f2f2f2',eyebrow:'MAIS ESPAÇO PARA A SUA IDEIA.',title:'Presença que<br><span style="color:#e95005">não passa despercebida.</span>',description:'Banners, lonas, placas e fachadas.<br>Soluções para sua marca ganhar o mundo.',link:'#categoria/visual',label:'Ver comunicação visual',image:'hero-banner-v3.jpg',name:'Banner ilustrativo Criart'}];
let slideTimeout;
function showSlide(n){
  let track = $('.hero-track');
  if (!track) {
    const main = $('.hero-main');
    if (main) {
      const windowEl = document.createElement('div');
      windowEl.style.overflow = 'hidden';
      windowEl.style.borderRadius = '7px';
      windowEl.style.position = 'relative';
      windowEl.className = 'hero-window';
      
      track = document.createElement('div');
      track.className = 'hero-track';
      track.style.display = 'flex';
      track.style.width = (slides.length * 100) + '%';
      track.style.transition = 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)';
      
      slides.forEach(s => {
        const slideEl = document.createElement('div');
        slideEl.style.width = (100 / slides.length) + '%';
        slideEl.style.flex = `0 0 ${100 / slides.length}%`;
        slideEl.style.minWidth = '0';
        slideEl.className = 'hero-main'; 
        slideEl.style.background = s.bg || '#f2f2f2';
        slideEl.style.color = '#222';
        slideEl.style.borderRadius = '0';
        
        slideEl.innerHTML = `
          <div class="hero-copy">
            <p class="eyebrow" style="color:#e95005">${s.eyebrow}</p>
            <h1>${s.title}</h1>
            <p class="description">${s.description}</p>
            <a href="${s.link}" class="button" style="background:#242424;color:white;border-color:#242424;">${s.label}</a>
          </div>
          <div class="hero-picture">
            ${thumb(s)}
          </div>
        `;
        track.appendChild(slideEl);
      });
      
      const controls = $('.slide-controls');
      main.parentNode.insertBefore(windowEl, main);
      windowEl.appendChild(track);
      windowEl.appendChild(controls);
      main.remove();
      
      $$('.slide-controls button').forEach(b => {
        const clone = b.cloneNode(true);
        b.parentNode.replaceChild(clone, b);
        clone.addEventListener('click', () => { clearTimeout(slideTimeout); showSlide(Number(clone.dataset.slide)); });
      });
    }
  }

  if (track) {
    track.style.transform = `translateX(-${n * (100 / slides.length)}%)`;
    $$('.slide-controls button').forEach(b => b.setAttribute('aria-pressed', String(Number(b.dataset.slide)===n)));
  }

  clearTimeout(slideTimeout); 
  slideTimeout = setTimeout(() => showSlide((n + 1) % slides.length), 4500);
}
$$('[data-slide]').forEach(b=>b.addEventListener('click',()=>showSlide(Number(b.dataset.slide))));
showSlide(0);saveCart();renderRoute();

const scrollTopBtn = $('#scroll-to-top'); if (scrollTopBtn) { window.addEventListener('scroll', () => { if (window.scrollY > 400) { scrollTopBtn.classList.add('visible'); } else { scrollTopBtn.classList.remove('visible'); } }, {passive: true}); scrollTopBtn.addEventListener('click', () => { window.scrollTo({ top: 0, behavior: 'smooth' }); }); }
