const Footer = () => {
    return (
        <footer className="fixed bottom-0 w-full">

            <div className="bg-purple-700 text-white">
                <div className="max-w-6xl mx-auto flex justify-between items-center py-6 px-6">

                    {/* Menu Esquerda */}
                    <div className="space-y-2">
                        <h2 className="font-bold text-lg">Menu</h2>
                        <ul className="space-y-1 text-sm">
                            <li className="hover:text-gray-200 cursor-pointer">Home</li>
                            <li className="hover:text-gray-200 cursor-pointer">Produtos</li>
                            <li className="hover:text-gray-200 cursor-pointer">Contato</li>
                        </ul>
                    </div>

                </div>
            </div>

            <div className="bg-gray-200 text-center py-3">
                <p className="text-gray-700 text-sm font-medium">
                    © 2026 - Copyright Ecommerce 3dTech. Todos os direitos reservados.🚀👾👨‍💻
                </p>
            </div>

        </footer>
    );
}

export default Footer;