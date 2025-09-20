"use client";
import { WalletConnectModalSign } from "@walletconnect/modal-sign-react";
import { getAppMetadata } from "@walletconnect/utils";

export default function WalletModal() {
    return (
        <WalletConnectModalSign
            projectId={process.env.NEXT_PUBLIC_PROJECT_ID!}
            metadata={getAppMetadata()}
        />
    );
}
