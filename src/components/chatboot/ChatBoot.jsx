import { BubbleChat } from 'flowise-embed-react'

const ChatBoot = () => {
    return (
        <BubbleChat
            chatflowid="18a52c21-1d68-469e-b2ef-625fdf4009c2"
            apiHost="https://sabao.onrender.com"
            theme={{
                button: {
                    backgroundColor: "#3B81F6",
                    right: 20,
                    bottom: 20,
                    size: "medium",
                    iconColor: "white",
                    customIconSrc: "https://raw.githubusercontent.com/walkxcode/dashboard-icons/main/svg/google-messages.svg",
                },
                chatWindow: {
                    welcomeMessage: "Olá, tire suas dúvidas aqui!",
                    backgroundColor: "#ffffff",
                    height: 500,
                    width: 400,
                    fontSize: 16,
                    poweredByTextColor: "#303235",
                    botMessage: {
                        backgroundColor: "#f7f8ff",
                        textColor: "#303235",
                        showAvatar: true,
                        avatarSrc: "https://raw.githubusercontent.com/zahidkhawaja/langchain-chat-nextjs/main/public/parroticon.png",
                    },
                    userMessage: {
                        backgroundColor: "#3B81F6",
                        textColor: "#ffffff",
                        showAvatar: true,
                        avatarSrc: "https://raw.githubusercontent.com/zahidkhawaja/langchain-chat-nextjs/main/public/usericon.png",
                    },
                    textInput: {
                        placeholder: "Digite sua pergunta",
                        backgroundColor: "#ffffff",
                        textColor: "#303235",
                        sendButtonColor: "#3B81F6",
                    }
                }
            }}
        />
    );
};

export default ChatBoot
