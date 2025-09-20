"use client";
import { useConnect } from "@walletconnect/modal-sign-react";
import Button from "@/src/components/ui/Button";

export default function WalletConnectButton() {
    const { connect, loading: isConnecting } = useConnect({
        requiredNamespaces: {
            xrpl: {
                chains: ["xrpl:0", "xrpl:1"],
                methods: ["xrpl_signTransaction"],
                events: ["chainChanged", "accountsChanged"],
            },
            eip155: {
                chains: ["eip155:7668", "eip155:7672"],
                methods: ["eth_sendTransaction", "personal_sign"],
                events: ["chainChanged", "accountsChanged"],
            },
        },
    });

    async function onConnect() {
        try {
            const session = await connect();
            console.info("connect result", session);
        } catch (err) {
            console.error(err);
        }
    }
    return (
        <Button onClick={onConnect} disabled={isConnecting}>
            Wallet Connect
        </Button>
    );
}
