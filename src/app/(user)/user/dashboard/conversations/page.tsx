import { MessageCircle } from "lucide-react";

export default function ConversationsPage() {
    return (
        <div className="hidden lg:flex h-full w-full flex-col items-center justify-center bg-gray-50/50">
            <div className="p-4 rounded-full bg-gray-100 mb-4">
                <MessageCircle size={48} className="text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900">
                Select a chat to start messaging
            </h3>
            <p className="text-gray-500 text-sm mt-1">
                Choose from your existing conversations or start a new one from the catalog.
            </p>
        </div>
    );
}