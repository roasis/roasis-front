"use client";
import { useSession } from "@walletconnect/modal-sign-react";
import WalletConnectButton from "../wallet/WalletConnectButton";
import WalletDisconnectButton from "../wallet/WalletDisconnectButton";

export default function Header() {
    const session = useSession();

    return (
        <header className="flex justify-between items-center p-4">
            <h1>Oasix</h1>
            {session ? <WalletDisconnectButton session={session} /> : <WalletConnectButton />}
        </header>
    );
}
