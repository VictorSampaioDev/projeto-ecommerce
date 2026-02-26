import { useState } from "react";

const Footer = () => {

    const [showMessage, setShowMessage] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setShowMessage(true);

        setTimeout(() => {
            setShowMessage(false);
        }, 3000);
    };

    return (
        <footer className="fixed bottom-0 w-full">

            {/* Toast */}
            {showMessage && (
                <div className="fixed top-6 right-6 bg-white text-gray-800 px-8 py-4 rounded-2xl shadow-xl border border-gray-200 flex items-center gap-3">
                    <div className="w-1 h-8 bg-purple-600 rounded-full"></div>
                    <p className="text-sm font-medium">
                        Seu email foi cadastrado na newsletter com sucesso.
                    </p>
                </div>
            )}

            <div className="bg-purple-700 text-white">
                <div className="max-w-6xl mx-auto flex justify-between items-center py-6 px-6">

                    {/* Menu Esquerda */}
                    <div className="space-y-2">
                        <h2 className="font-mono text-lg">Menu</h2>
                        <ul className="space-y-1 text-sm">
                            <li className="hover:text-gray-200 cursor-pointer">Home</li>
                            <li className="hover:text-gray-200 cursor-pointer">Produtos</li>
                            <li className="hover:text-gray-200 cursor-pointer">Contato</li>
                        </ul>
                    </div>

                    {/* Newsletter Direita */}
                    <div className="space-y-2">
                        <h2 className="font-mono text-lg">Newsletter</h2>
                        <div className="flex gap-2">
                            <form onSubmit={handleSubmit} className="flex gap-2">
                                <input
                                    type="email"
                                    placeholder="Seu email"
                                    className="px-3 py-2 rounded bg-white text-black text-sm outline-none focus:ring-2 focus:ring-purple-400"
                                    required
                                />
                                <button
                                    type="submit"
                                    className="bg-white text-purple-700 px-4 py-2 rounded text-sm font-mono hover:bg-gray-200">
                                    Enviar
                                </button>
                            </form>
                        </div>
                    </div>

                </div>
            </div>

            <div className="bg-gray-200 text-center py-3">
                <p className="text-gray-700 text-sm font-mono">
                    © 2026 - Copyright Ecommerce 3dTech. Todos os direitos reservados.
                </p>
            </div>

        </footer>
    );
}

export default Footer;