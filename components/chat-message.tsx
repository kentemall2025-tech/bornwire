// components/chat-message.tsx
import { cn } from "@/lib/utils";

interface ChatMessageItemProps {
  message: {
    id: string;
    user: {
      email: string;
    };
    content: string;
    createdAt: string;
  };
  isOwnMessage: boolean;
  showHeader: boolean;
}

export const ChatMessageItem = ({
  message,
  isOwnMessage,
  showHeader,
}: ChatMessageItemProps) => {
  return (
    <div
      className={cn("flex w-full", {
        "justify-end": isOwnMessage,
        "justify-start": !isOwnMessage,
      })}
    >
      <div
        className={cn("max-w-[75%] w-fit flex flex-col gap-1", {
          "items-end": isOwnMessage,
        })}
      >
        {showHeader && (
          <div
            className={cn("flex items-center gap-2 text-xs px-1 opacity-80", {
              "flex-row-reverse justify-end": isOwnMessage,
            })}
          >
            <span className="font-semibold text-xs text-foreground/80">
              {message.user.email}
            </span>

            <span className="text-foreground/50 text-[10px]">
              {new Date(message.createdAt).toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              })}
            </span>
          </div>
        )}

        <div
          className={cn(
            "py-2 px-4 rounded-2xl text-sm shadow-sm transition-all",
            isOwnMessage
              ? "bg-blue-500 text-white shadow-blue-300/30"
              : "bg-gray-200 text-gray-900 shadow-gray-300/30"
          )}
        >
          {message.content}
        </div>
      </div>
    </div>
  );
};
