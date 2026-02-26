import { useEffect, useState } from "react";
import { AXIOS } from "../services";
import { useParams } from "react-router";
import { Meta, Title } from "react-head";

const PageProduct = () => {
    const { slug } = useParams();
    const [produto, setProduto] = useState(null);
    const [startIndex, setStartIndex] = useState(0); // primeira miniatura visível
    const [imagemAtiva, setImagemAtiva] = useState(0); // imagem principal
    const [quantidade, setQuantidade] = useState(1);
    const [cep, setCep] = useState("");
    const [frete, setFrete] = useState(null);

    useEffect(() => {
        async function buscarProduto() {
            try {
                const request = await AXIOS.get("/product");
                const produtoEncontrado = request.data.find(
                    (p) => p.slug.toLowerCase() === slug.toLowerCase()
                );
                setProduto(produtoEncontrado);
            } catch (error) {
                console.error("Erro ao buscar produto:", error.message);
            }
        }
        buscarProduto();
    }, [slug]);

    if (!produto) return <p className="text-center mt-10">Produto não encontrado...</p>;

    const imagens = produto?.imagens?.length
        ? produto.imagens
        : ["https://via.placeholder.com/400x400"];
    const precoFinal = produto ? produto.preco - (produto.preco * produto.desconto / 100) : 0;

    // Carrossel
    const next = () => {
        if (startIndex < imagens.length - 3) setStartIndex(startIndex + 1);
    };
    const prev = () => {
        if (startIndex > 0) setStartIndex(startIndex - 1);
    };

    // Calcular frete (exemplo)
    async function calcular(cep, peso) {
        try {
            const response = await AXIOS.get("https://api-correios.com/frete", {
                params: {
                    cepOrigem: "61.658-050",
                    cep,
                    peso,
                    serviço: "SEDEX",
                },
            });
            setFrete(response.data.valor);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>

            <Title>{`3Dtech ${produto.name}`}</Title>
            <Meta name="description" content={produto.descricao} />
            <Meta name="keywords" content={`loja gamer, ${produto.name}`} />
            <Meta property="og:title" content={`3Dtech • ${produto.name}`} />
            <Meta property="og:description" content={produto.descricao} />
            <Meta property="og:image" content={produto.imagens[0]} />
            <Meta property="og:type" content="product" />

            <main className="bg-[#43464b] p-20 flex justify-center gap-10 text-gray-100">
                {/* Coluna das imagens */}
                <div className="flex flex-col gap-6 items-center">
                    <img
                        src={imagens[imagemAtiva]}
                        alt={`Imagem principal`}
                        className="w-96 h-96 object-cover border-2 rounded-xl shadow-lg"
                    />

                    {/* Carrossel de miniaturas */}
                    <div className="flex items-center gap-2 mt-2">
                        <button
                            onClick={prev}
                            disabled={startIndex === 0}
                            className="px-3 py-1 bg-gray-700 text-white rounded-lg hover:bg-gray-800 disabled:opacity-50 transition"
                        >
                            &lt;
                        </button>

                        <div className="flex gap-3 overflow-hidden w-[336px]">
                            {imagens.slice(startIndex, startIndex + 3).map((img, idx) => {
                                const actualIndex = startIndex + idx;
                                return (
                                    <img
                                        key={actualIndex}
                                        src={img}
                                        alt={`Miniatura ${actualIndex}`}
                                        onClick={() => setImagemAtiva(actualIndex)}
                                        className={`w-32 h-32 object-cover border-2 rounded-lg cursor-pointer transition-all duration-300 hover:scale-105 ${actualIndex === imagemAtiva
                                            ? "border-blue-500 scale-110 shadow-lg"
                                            : "border-gray-300"
                                            }`}
                                    />
                                );
                            })}
                        </div>

                        <button
                            onClick={next}
                            disabled={startIndex >= imagens.length - 3}
                            className="px-3 py-1 bg-gray-700 text-white rounded-lg hover:bg-gray-800 disabled:opacity-50 transition"
                        >
                            &gt;
                        </button>
                    </div>
                </div>

                {/* Coluna de informações */}
                <div className="flex flex-col gap-6 w-96">
                    {/* Breadcrumb */}
                    <div className="flex gap-2 text-xs text-gray-400 hover:text-blue-400 transition">
                        <a href="/" className="hover:underline">Início</a> &gt;
                        <a href={`/categoria/${produto.categoria.toLowerCase()}`} className="hover:underline">{produto.categoria}</a> &gt;
                        <span>{produto.name}</span>
                    </div>

                    {/* Nome e preço */}
                    <div className="flex flex-col gap-3">
                        <h1 className="text-3xl font-extrabold">{produto.name}</h1>
                        <div className="flex flex-col gap-1">
                            <span className="text-xl text-gray-400">
                                R$<span className={`${produto.desconto > 0 ? 'line-through' : ''}`}>{produto.preco.toFixed(2)}</span>
                            </span>
                            {produto.desconto > 0 && (
                                <span className="text-2xl text-green-400 font-bold">
                                    R$ {precoFinal.toFixed(2)}
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Quantidade e comprar */}
                    <div className="flex items-center gap-4">
                        <div className="flex items-center justify-between gap-4 border rounded-lg p-3">
                            <button onClick={() => quantidade > 1 && setQuantidade(quantidade - 1)}>&lt;</button>
                            <span className="font-bold">{quantidade}</span>
                            <button onClick={() => quantidade < produto.estoque && setQuantidade(quantidade + 1)}>&gt;</button>
                        </div>
                        <a href="" className="flex-1 p-3 text-center bg-purple-600 hover:bg-purple-700 rounded-lg font-bold transition">
                            Comprar
                        </a>
                    </div>

                    {/* CEP / Frete */}
                    <div className="flex flex-col gap-2">
                        <p className="font-semibold text-gray-200">Meus Envios</p>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                placeholder="Seu CEP"
                                className="flex-1 p-2 rounded-lg border border-gray-600 bg-gray-700 text-white outline-none"
                                onChange={(e) => setCep(e.target.value)}
                            />
                            <button
                                className="px-4 bg-purple-600 hover:bg-purple-700 rounded-lg transition text-white font-semibold"
                                onClick={() => calcular(cep, produto.peso)}
                            >
                                Calcular
                            </button>
                        </div>
                        {frete && <p className="text-green-400 font-semibold mt-1">Frete estimado: R$ {frete}</p>}
                    </div>

                    {/* Descrição */}
                    <div className="flex flex-col gap-2">
                        <h2 className="text-lg font-bold">Descrição</h2>
                        <p className="max-h-48 overflow-y-auto break-words p-2 rounded-lg bg-gray-700">
                            {produto.descricao}
                        </p>
                    </div>
                </div>
            </main>
        </>

    );
};

export default PageProduct;