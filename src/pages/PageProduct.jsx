import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { AXIOS } from "../services";

const PageProduct = () => {
    const { slug } = useParams();
    const [produto, setProduto] = useState(null);
    const [imagemAtiva, setImagemAtiva] = useState(0);
    const [quantidade, setQuantidade] = useState(1);

    useEffect(() => {
        async function buscarProduto() {
            try {
                const response = await AXIOS.get("/product");
                // Aqui assumimos que response.data já é o array de produtos
                const produtos = Array.isArray(response.data) ? response.data : [];

                const produtoEncontrado = produtos.find(
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

    const imagens = produto.imagens && produto.imagens.length > 0
        ? produto.imagens
        : ["https://via.placeholder.com/400x400"];

    const alterarQuantidade = (delta) => {
        setQuantidade(prev => Math.max(1, prev + delta));
    };

    return (
        <main className="flex flex-col md:flex-row justify-center items-start mt-10 px-4 md:px-20 gap-10">
            {/* Imagens */}
            <div className="flex flex-col gap-4">
                <img
                    src={imagens[imagemAtiva]}
                    alt={produto.name}
                    className="w-96 h-96 object-cover border rounded-lg"
                />
                <div className="flex gap-2">
                    {imagens.map((img, index) => (
                        <img
                            key={index}
                            src={img}
                            alt={`miniatura ${index}`}
                            className={`w-20 h-20 object-cover border rounded-lg cursor-pointer ${index === imagemAtiva ? "border-blue-500" : "border-gray-300"}`}
                            onClick={() => setImagemAtiva(index)}
                        />
                    ))}
                </div>
            </div>

            {/* Informações */}
            <div className="flex flex-col gap-4 max-w-md">
                <h1 className="text-3xl font-bold">{produto.name}</h1>
                <p className="text-xl text-green-600 font-semibold">R$ {produto.preco.toFixed(2)}</p>
                {produto.avaliacao && (
                    <p className="text-yellow-500">
                        Avaliação: {"★".repeat(Math.round(produto.avaliacao))} ({produto.avaliacao.toFixed(1)})
                    </p>
                )}
                {produto.estoque !== undefined && (
                    <p className={`font-medium ${produto.estoque > 0 ? "text-green-600" : "text-red-600"}`}>
                        {produto.estoque > 0 ? `Em estoque: ${produto.estoque}` : "Indisponível"}
                    </p>
                )}
                {produto.categoria && <p className="text-gray-500">Categoria: {produto.categoria}</p>}

                <p className="text-gray-700">{produto.descricao}</p>

                {/* Quantidade */}
                <div className="flex items-center gap-2 mt-4">
                    <button
                        className="px-3 py-1 border rounded hover:bg-gray-200"
                        onClick={() => alterarQuantidade(-1)}
                    >
                        -
                    </button>
                    <span className="px-2">{quantidade}</span>
                    <button
                        className="px-3 py-1 border rounded hover:bg-gray-200"
                        onClick={() => alterarQuantidade(1)}
                    >
                        +
                    </button>
                </div>

                {/* Botões */}
                <div className="flex gap-4 mt-6">
                    <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition">
                        Adicionar ao Carrinho
                    </button>
                    <button className="bg-gray-200 px-6 py-2 rounded hover:bg-gray-300 transition">
                        Comprar Agora
                    </button>
                </div>

                {/* Detalhes adicionais */}
                {produto.detalhes && (
                    <div className="mt-6">
                        <h2 className="font-bold text-lg mb-2">Detalhes do Produto:</h2>
                        <ul className="list-disc list-inside text-gray-700">
                            {produto.detalhes.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </main>
    );
};

export default PageProduct;