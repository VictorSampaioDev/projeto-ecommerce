import { useState } from "react";
import {AXIOS} from "../services"


export default function Register() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(false)
        setError("");
        setSuccess("");

        if (form.password !== form.confirmPassword) {
            setError("As senhas não coincidem.");
            return;
        }

        try {
            setLoading(true);
            await AXIOS.post("/register", {
                name: form.name,
                email: form.email,
                phone: form.phone || null,
                password: form.password,
            });

            setSuccess("Conta criada com sucesso!");

            setForm({
                name: "",
                email: "",
                phone: "",
                password: "",
                confirmPassword: "",
            });
        } catch (err) {
            setError(
                err.response?.data?.message ||
                "Erro em criar uma conta. Tente novamente."
            );
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            <header className="bg-zinc-900 shadow-sm">
                <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
                    <h1 className="text-xl font-mono text-gray-300">3Dtech</h1>
                    <a
                        href="/login"
                        className="text-sm text-gray-300 hover:text-purple-600 transition"
                    >
                        Entrar
                    </a>
                </div>
            </header>

            <main className="flex-1 flex items-center justify-center px-4">
                <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-6 sm:p-8">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
                        Criar conta
                    </h2>

                    {error && (
                        <div className="mb-4 rounded-lg bg-red-100 text-red-700 px-4 py-2 text-sm">
                            {error}
                        </div>
                    )}

                    {success && (
                        <div className="mb-4 rounded-lg bg-green-100 text-green-700 px-4 py-2 text-sm">
                            {success}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input
                            type="text"
                            name="name"
                            placeholder="Nome completo"
                            required
                            value={form.name}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                        />

                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            required
                            value={form.email}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                        />

                        <input
                            type="tel"
                            name="phone"
                            placeholder="Telefone (opcional)"
                            value={form.phone}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                        />

                        <input
                            type="password"
                            name="password"
                            placeholder="Senha"
                            required
                            value={form.password}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                        />

                        <input
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirmar senha"
                            required
                            value={form.confirmPassword}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                        />

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full rounded-lg bg-purple-600 py-2.5 text-white font-medium hover:bg-purple-700 transition disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                            {loading ? "Criando conta..." : "Criar conta"}
                        </button>
                    </form>

                    <p className="mt-6 text-center text-sm text-gray-600">
                        Já possui uma conta?{" "}
                        <a
                            href="/login"
                            className="text-indigo-600 hover:underline font-medium"
                        >
                            Entrar
                        </a>
                    </p>
                </div>
            </main>
        </div>
    );

}
