import { useState, useRef, useEffect } from "react";
import { X, Send, ChevronDown } from "lucide-react";

const normalizeText = (str: string) =>
  str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();

export default function ChatBot() {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showCategories, setShowCategories] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Banco de respostas por categoria - VERSÃO AMPLIADA
  const knowledgeBase: Record<string, Record<string, string>> = {
    "Times": {
      "cs2": "🔫 **Time de CS2**\n\n- **KSCERATO** (Entry)\n- **yuurih** (Awper)\n- **arT** (Capitão/IGL)\n- **FalleN** (Líder/AWP)\n- **chelo** (Suporte)\n\n📊 **Estatísticas 2024**:\n- Ranking atual: #3 mundial\n- Vitórias consecutivas: 8\n- Próximo jogo: 25/05 vs. Vitality (Major)\n\n🏆 **Principais Títulos**:\n- ESL Pro League S17 (2023)\n- IEM Rio (2022)\n\n",
      "lol": "⚡ **Time de LoL**\n\n- **fNb** (Top - Campeão principal: Gnar)\n- **Gryao** (Jungle - Especialista em Lee Sin)\n- **Damage** (Mid - Top 3 KDA na liga)\n- **Titan** (ADC - Média de 8.2 kills/jogo)\n- **RedBert** (Suporte - 85% de participação em kills)\n\n📈 **Temporada 2024**:\n- 12 vitórias / 5 derrotas\n- 3º lugar no CBLOL\n- Próxima partida: 28/05 vs. LOUD\n\n",
      "valorant": "💥 **Time de Valorant**\n\n- **Khalil** (Duelista - Principal: Jett/Raze)\n- **mwzera** (Flex - Nota média: 1.35)\n- **xand** (Iniciador - Especialista em Sova)\n- **qck** (Controlador - Mestre de Omen)\n- **dgzin** (Capitão/Sentinela)\n\n🏆 **Conquistas**:\n- VCT Americas 2024\n- 2x Campeão Brasileiro\n\n⏳ **Próximo Torneio**: Champions Tour em Julho"
    },
    "Jogadores": {
      "kscerato": "🎯 **KSCERATO**\n\n- Nome real: Kaike Cerato\n- Idade: 26 anos\n- Nacionalidade: Brasileiro\n- Função: Rifler\n\n📊 **Estatísticas 2024**:\n- Rating HLTV: 1.32\n- K/D: 1.25\n- Headshots: 62%\n\n🏆 **Títulos**:\n- 3x MVP em torneios internacionais\n- Top 5 mundial por 3 anos consecutivos\n\n💼 **Patrocinadores**: HyperX, Razer, Red Bull\n\n💡 **Curiosidade**: Começou a jogar CS na LAN house do bairro aos 12 anos",
  "fallen": "👑 **FalleN**\n\n- Nome real: Gabriel Toledo\n- Idade: 33 anos\n- Nacionalidade: Brasileiro\n- Função: IGL / AWP\n\n📚 **Trajetória**:\n- Fundador da Games Academy\n- Bicampeão de Major (2016)\n\n🏆 **Conquistas**:\n- 15 títulos internacionais\n- Recorde de AWP kills em Majors\n\n💻 **Setup**:\n- Mouse: Razer DeathAdder\n- Sensibilidade: 1.8\n- DPI: 400\n\n💡 **Curiosidade**: É uma das maiores lendas do CS mundial",
  "yuurih": "💥 **yuurih**\n\n- Nome real: Yuri Santos\n- Idade: 24 anos\n- Nacionalidade: Brasileiro\n- Função: Rifler\n\n📊 **Estatísticas 2024**:\n- Rating HLTV: 1.20\n- Headshots: 59%\n\n🏆 **Conquistas**:\n- Campeão da IEM New York\n- Destaque em todas campanhas da FURIA\n\n💡 **Curiosidade**: Conhecido como o motor silencioso da equipe",
  "molodoy": "🎯 **molodoy**\n\n- Nome real: Danil Golubenko\n- Idade: 21 anos\n- Nacionalidade: Russo\n- Função: Sniper\n\n🆕 **Estreia na FURIA**:\n- Entrou em abril de 2025\n- Ex-AMKAL Esports\n\n💡 **Curiosidade**: Grande promessa russa do CS2",
  "yekindar": "⚡ **YEKINDAR**\n\n- Nome real: Mareks Gaļinskis\n- Idade: 24 anos\n- Nacionalidade: Letão\n- Função: Rifler/Entry\n\n🛬 **Chegada à FURIA**:\n- Stand-in em 2025 após passagem por NAVI e Liquid\n\n💡 **Curiosidade**: Poliglota e estrategista nato",
  "chelo": "🔥 **chelo**\n\n- Nome real: Marcelo Cespedes\n- Idade: 26 anos\n- Nacionalidade: Brasileiro\n- Função: Rifler\n\n📆 **Saiu em**: Abril de 2025\n\n💡 **Curiosidade**: Um dos jogadores mais agressivos do Brasil",
  "skullz": "🛡️ **skullz**\n\n- Nome real: Felipe Medeiros\n- Idade: 22 anos\n- Nacionalidade: Brasileiro\n- Função: Rifler\n\n📆 **Saiu em**: Abril de 2025\n\n💡 **Curiosidade**: Brilhou na Team Liquid antes de vir para a FURIA",
  "kye": "🌱 **kye**\n\n- Nome real: Kayke Bertolucci\n- Idade: 20 anos\n- Nacionalidade: Brasileiro\n- Função: Rifler\n\n📆 **Período**: 2024\n\n💡 **Curiosidade**: Vindo da base, foi promovido ao time principal brevemente",
  "art": "🎨 **arT**\n\n- Nome real: Andrei Piovezan\n- Idade: 28 anos\n- Nacionalidade: Brasileiro\n- Função: Capitão/IGL\n\n📆 **Saiu para o Fluxo**: Dezembro de 2023\n\n💡 **Curiosidade**: Criador do estilo de jogo agressivo da FURIA",
  "guerri": "🧠 **guerri**\n\n- Nome real: Nicholas Nogueira\n- Idade: 34 anos\n- Nacionalidade: Brasileiro\n- Função: Head de Esports\n\n📆 **Nova função**: Desde julho de 2024\n\n💡 **Curiosidade**: Um dos pilares da FURIA desde a fundação",
  "sidde": "🧠 **sidde**\n\n- Nome real: Sidnei Macedo\n- Idade: 30 anos\n- Nacionalidade: Brasileiro\n- Função: Coach Principal\n\n📆 **Assumiu em**: Julho de 2024\n\n💡 **Curiosidade**: Muito respeitado pela leitura tática e preparo estratégico",
  "lucid": "🔍 **Lucid**\n\n- Nome real: Hunter Tucker\n- Nacionalidade: Americano\n- Função: Analista de Desempenho\n\n📆 **Ingressou**: 2024\n\n💡 **Curiosidade**: Especialista em estatísticas avançadas",
  "innersh1ne": "📈 **innersh1ne**\n\n- Nome real: Viacheslav Britvin\n- Nacionalidade: Russo\n- Função: Analista\n\n📆 **Ingressou**: 2024\n\n💡 **Curiosidade**: Ex-analista da FaZe Clan, focado em anti-tático",
  "mautheory": "🧪 **mauTheory**\n\n- Nome real: Maurício Caetano\n- Nacionalidade: Brasileiro\n- Função: Psicólogo da equipe\n\n📆 **Desde**: 2023\n\n💡 **Curiosidade**: Trabalha o foco mental e emocional dos jogadores",
  "fizi": "💪 **fizi**\n\n- Nome real: Felipe Lobo\n- Nacionalidade: Brasileiro\n- Função: Preparador físico\n\n📆 **Desde**: 2023\n\n💡 **Curiosidade**: Foca no bem-estar físico e rendimento dos atletas",
  "andrehenrique": "📢 **andrehenrique**\n\n- Nome real: André Henrique\n- Nacionalidade: Brasileiro\n- Função: Manager de CS2\n\n📆 **Desde**: 2023\n\n💡 **Curiosidade**: Coordena toda a logística e suporte à equipe",

    },
    "Produtos": {
       "camisetas": "👕 **Coleção 2024**\n\n- Camiseta Jersey (R$ 129)\n  - Tecido dry-fit\n  - Estampa resistente\n  - Disponíveis do P ao GG\n\n- Moletom FURIA (R$ 199)\n  - Capuz com cordão\n  - Bolso canguru\n  - 80% algodão\n\n- Boné Snapback (R$ 89)\n  - Ajuste regulável\n  - Logotipo bordado\n\n🚚 **Frete grátis** para compras acima de R$ 250\n\n⭐ **Novidade**: Edição especial dos jogadores\n\n🛒 [Visitar loja](https://www.furia.gg/)",
  "descontos": "💰 **Promoções Ativas**\n\n- **FURIA10**: 10% em toda loja\n- **ESPORTEFAN**: 15% acima de R$ 200\n- **FURIAFAM**: 20% para membros Gold\n\n🎁 **Kits Especiais**:\n- Kit Streamer (camiseta + moletom) por R$ 299\n- Kit Furia Total (boné + 2 camisetas) R$ 349\n\n⏳ Validade: 30/06/2024\n\n"
    },
    "Eventos": {  
  "calendario": "📅 **Calendário 2025**\n\n- 26/04: LTA South 2025 Split 2\n- 27/04: LTA South 2025 Split 2\n- 03/05: LTA South 2025 Split 2\n- 11/05: LTA South 2025 Split 2\n- 20/05: VCT 2025: Americas Stage 1\n- 21/05: VCT 2025: Americas Stage 1\n- 22/05: VCT 2025: Americas Stage 1\n\n🎟️ **Ingressos a partir de R$ 80**\n📍 Local: São Paulo - Espaço FURIA\n\n🔗 [Ver calendário completo no Esports Charts](https://escharts.com/pt/organizations/furia-esports)",
  "transmissao": "📺 **Onde Assistir**\n\n**Twitch Principal**: [FURIA.tv](https://www.twitch.tv/furiatv)\n\n⏰ **Lembretes**:\n- Notificamos 1h antes dos jogos"
    },
    "História": {
      "fundacao": "📜 **Fundação da FURIA**\n\n- Ano: 2017\n- Fundador: José 'Fury' Oliveira\n- Primeiro jogo: CS:GO\n\n🚀 **Crescimento**:\n- 2018: Primeira vitória internacional\n- 2020: Expansão para LoL e Valorant\n- 2022: Centro de treinamento em SP\n\n🏆 **Marcos**:\n- 1ª org brasileira no top 5 mundial\n- 15 títulos internacionais\n- 7 milhões de fãs nas redes",
      "conquistas": "🏆 **Principais Conquistas**\n\n- CS2:\n  - ESL Pro League S17 (2023)\n  - IEM Rio (2022)\n\n- Valorant:\n  - VCT Americas 2024\n  - 2x Campeão Brasileiro\n\n- LoL:\n  - 3x Vice-campeão CBLOL\n  - Melhor campanha internacional 2023",
      "jornada": "🌟 **Jornada da FURIA**\n\n2017: Fundação com time de CS\n2019: Primeira final internacional\n2021: Parceria com a Razer\n2023: Maior org da América Latina\n\n💡 **Curiosidade**: Começou em um escritório pequeno em SP com apenas 5 funcionários"
    }
  };

  // Categorias para seleção
  const categories = Object.keys(knowledgeBase);

  // Respostas genéricas ampliadas
  const genericAnswers: Record<string, string> = {
    "ola": "Olá! 👋 Sou o assistente oficial da FURIA. Por favor, selecione uma categoria para começarmos:",
    "oi": "Oi! 😊 Como posso te ajudar hoje? Escolha uma categoria ou me pergunte sobre times, produtos ou eventos!",
    "bom dia": "Bom dia! ☀️ Que seu dia seja incrível como nossos jogadores! Como posso ajudar?",
    "boa tarde": "Boa tarde! 🌟 Espero que esteja tendo um dia vitorioso. Qual sua dúvida?",
    "boa noite": "Boa noite! 🌙 Estou aqui para o que precisar, mesmo de madrugada!",
    "obrigado": "Obrigado **você**! 😊 Estou sempre aqui para ajudar. Mais alguma dúvida?",
    "valeu": "Por nada! Fico feliz em ajudar. 🎮🔥",
    "help": "💡 **Como posso ajudar?**\n\nSelecione uma categoria ou pergunte sobre:\n\n- Times (CS2, LoL, Valorant)\n- Jogadores (estatísticas, histórias)\n- Produtos (coleção, descontos)\n- Eventos (calendário, ingressos)\n- História da FURIA\n\nOu digite 'exemplos' para ver sugestões!",
    "exemplos": "🔍 **Sugestões de perguntas**:\n\n- Quem joga no time de CS2?\n- Qual a idade do FalleN?\n- Quais os produtos disponíveis?\n- Quando é o próximo evento?\n- Como foi fundada a FURIA?\n\nÉ só digitar sua pergunta!",
    "contato": "📩 **Contatos Oficiais**\n\n- E-mail: contato@furia.gg\n- Comercial: patrocinios@furia.gg\n- Suporte Loja: loja@furia.gg\n\n📞 **Telefone**: (11) 4002-8922\n\n🕒 **Horário**: Seg-Sex, 9h-18h",
    "social": "🌐 **Redes Sociais**\n\n- Instagram: [@furiagg](https://instagram.com/furiagg)\n- Twitter: [@furiagg](https://twitter.com/furiagg)\n- TikTok: [@furiaesports](https://tiktok.com/@furiaesports)\n- YouTube: [FURIA Esports](https://youtube.com/furiaesports)\n\n📲 Siga-nos para conteúdos exclusivos!"
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, selectedCategory]);

  const sendMessage = () => {
    if (!input.trim()) return;

    const normalized = normalizeText(input);
    let response = "";

    // Respostas genéricas
    if (genericAnswers[normalized]) {
      response = genericAnswers[normalized];
    } 
    // Respostas por categoria
    else if (selectedCategory) {
      const categoryData = knowledgeBase[selectedCategory];
      const topicKey = Object.keys(categoryData).find(key => 
        normalized.includes(key)
      );
      response = topicKey 
        ? categoryData[topicKey] 
        : `Sobre **${selectedCategory}**, posso te ajudar com:\n\n${Object.keys(categoryData).map(item => `- ${item}`).join("\n")}`;
    } 
    // Fallback
    else {
      response = "Por favor, **selecione uma categoria** para que eu possa ajudar melhor. Ou digite 'help' para ver opções!";
    }

    setMessages(prev => [...prev, 
      { role: "user", content: input },
      { role: "bot", content: response }
    ]);
    setInput("");
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 bg-[#FF5700] text-white rounded-full p-3 shadow-lg hover:bg-[#E04E00] transition"
      >
        <span className="flex items-center gap-1 px-2">
          <Send size={16} /> Assistente FURIA
        </span>
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 w-80 max-w-full bg-zinc-900 text-white border border-zinc-700 rounded-2xl shadow-2xl flex flex-col">
      {/* Cabeçalho */}
      <div className="flex justify-between items-center p-3 border-b border-zinc-700 bg-[#FF5700] rounded-t-2xl">
        <h2 className="text-base font-semibold">Assistente FURIA</h2>
        <button onClick={() => setIsOpen(false)} className="text-white hover:text-zinc-200">
          <X size={18} />
        </button>
      </div>

      {/* Mensagens */}
      <div className="h-64 overflow-y-auto px-3 py-2 space-y-2 text-sm">
        {messages.length === 0 && (
          <div className="text-center text-zinc-400 text-xs py-4">
            Bem-vindo ao suporte oficial da FURIA. Selecione uma categoria:
          </div>
        )}
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`px-4 py-2 rounded-xl max-w-[80%] ${msg.role === "user" ? "bg-[#FF5700] text-white" : "bg-zinc-700 text-green-300"}`}
            >
              {msg.content.split('\n').map((line, idx) => (
                <p key={idx}>{line}</p>
              ))}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Seletor de Categorias */}
      <div className="relative px-3 pt-2 bg-zinc-800 border-t border-zinc-700">
        <button
          onClick={() => setShowCategories(!showCategories)}
          className="flex items-center justify-between w-full bg-zinc-700 px-3 py-2 rounded-lg text-sm"
        >
          {selectedCategory || "Selecione uma categoria"}
          <ChevronDown size={16} className={`transition ${showCategories ? "rotate-180" : ""}`} />
        </button>
        {showCategories && (
          <div className="absolute bottom-full left-3 right-3 mb-1 bg-zinc-700 rounded-lg overflow-hidden shadow-lg z-10">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => {
                  setSelectedCategory(category);
                  setShowCategories(false);
                  setMessages(prev => [...prev, 
                    { role: "bot", content: `Você selecionou **${category}**. O que deseja saber?` }
                  ]);
                }}
                className="w-full text-left px-3 py-2 hover:bg-[#FF5700] transition text-sm"
              >
                {category}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Input */}
      <div className="flex p-3 bg-zinc-800 rounded-b-2xl">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          className="flex-grow bg-zinc-700 text-white rounded-l-lg px-3 py-2 outline-none text-sm"
          placeholder={selectedCategory ? `Pergunte sobre ${selectedCategory}...` : "Selecione uma categoria primeiro"}
          disabled={!selectedCategory}
        />
        <button
          onClick={sendMessage}
          disabled={!selectedCategory}
          className={`px-3 rounded-r-lg transition ${selectedCategory ? "bg-[#FF5700] hover:bg-[#E04E00]" : "bg-zinc-600 cursor-not-allowed"}`}
        >
          <Send size={16} />
        </button>
      </div>
    </div>
  );
}