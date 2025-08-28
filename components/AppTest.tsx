"use client";

import { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { useTheme } from "next-themes";

export default function AppTest() {
    const { theme } = useTheme();
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<{ role: "user" | "assistant"; content: string }[]>([]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const toggleChat = () => {
        setIsOpen(!isOpen);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;

        // Добавляем сообщение пользователя
        setMessages((prev) => [...prev, { role: "user", content: input }]);
        setInput("");
        setIsLoading(true);

        try {
            const response = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ prompt: input }),
            });

            const data = await response.json();
            if (response.ok) {
                setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
            } else {
                setMessages((prev) => [
                    ...prev,
                    { role: "assistant", content: "Error: Unable to retrieve response." },
                ]);
            }
        } catch (error) {
            setMessages((prev) => [
                ...prev,
                { role: "assistant", content: "Error: Please try again later." },
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed bottom-4 right-4 z-50">
            {/* Кнопка для открытия/закрытия чата */}
            <button
                onClick={toggleChat}
                className="bg-primary text-primary-foreground p-3 rounded-full shadow-lg hover:bg-primary/90 transition-colors"
                aria-label={isOpen ? "Close chat" : "Open chat"}
            >
                <MessageCircle className="w-6 h-6" />
            </button>

            {/* Модальное окно чата */}
            {isOpen && (
                <div className="absolute bottom-16 right-0 w-[90vw] max-w-[400px] h-[500px] bg-background rounded-lg shadow-xl border border-border flex flex-col">
                    <div className="flex justify-between items-center p-4 border-b border-border">
                        <h3 className="text-lg font-medium text-foreground">Lumy</h3>
                        <button onClick={toggleChat} className="text-muted-foreground hover:text-foreground">
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                    <div className="flex-1 p-4 overflow-y-auto">
                        {messages.map((msg, index) => (
                            <div
                                key={index}
                                className={`mb-3 ${msg.role === "user" ? "text-right" : "text-left"}`}
                            >
                                <span
                                    className={`inline-block p-2 rounded-lg ${
                                        msg.role === "user"
                                            ? "bg-primary/10 text-primary"
                                            : "bg-muted text-foreground"
                                    }`}
                                >
                                    {msg.role === "user" ? " " : " "}
                                    {msg.content}
                                </span>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="text-muted-foreground text-sm">Lumy thinking...</div>
                        )}
                    </div>
                    <form onSubmit={handleSubmit} className="p-4 border-t border-border">
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="How Lumy can help you?"
                                className="flex-1 p-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                                disabled={isLoading}
                            />
                            <button
                                type="submit"
                                className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
                                disabled={isLoading}
                            >
                                Send
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
}