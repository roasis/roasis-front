"use client";
import { useDisconnect } from "@walletconnect/modal-sign-react";
import { getSdkError } from "@walletconnect/utils";
import { SessionTypes } from "@walletconnect/types";
import Button from "@/src/components/ui/Button";

export default function WalletDisconnectButton({ session }: { session: SessionTypes.Struct }) {
    const { disconnect, loading: isDisconnecting } = useDisconnect({
        topic: session?.topic,
        reason: getSdkError("USER_DISCONNECTED"),
    });

    const onDisconnect = async () => {
        try {
            await disconnect();
            console.info("disconnected");
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <button onClick={onDisconnect} disabled={isDisconnecting} className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full">
            Disconnect
        </button>
    );
}
