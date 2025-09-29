/* eslint-disable */
import React from "react";
import { useAccount, useChainId } from "wagmi";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Shield, CheckCircle, AlertCircle } from "lucide-react";
import { SelfQRcodeWrapper, SelfAppBuilder, type SelfApp } from "@selfxyz/qrcode";
import { APP_ICON_URL, APP_NAME, type Address } from "../types";
import { getUniversalLink } from "@selfxyz/core";
import { filterTransactionData, formatAddr } from "./utilities/common";

export default function SelfQRCodeVerifier({ onVerificationComplete, onClose } : {onVerificationComplete: () => void; onClose: () => void}) {
    const [selfApp, setSelfApp] = React.useState<SelfApp | null>(null);
    const [universalLink, setUniversalLink] = React.useState<string>("");
    const [linkCopied, setLinkCopied] = React.useState<boolean>(false);
    const [showToast, setShowToast] = React.useState<boolean>(false);
    const [toastMessage, setToastMessage] = React.useState<string>("");

    const displayToast = (message: string) => {
        setToastMessage(message);
        setShowToast(true);
        setTimeout(() => {
            setShowToast(false);
        }, 3000);
    };

    const handleSuccessfulVerification = () => {
        displayToast("Verification successful!");
        setTimeout(() => {
            onVerificationComplete();
        }, 500);
    };

    const chainId = useChainId();
    const account = formatAddr(useAccount().address);

    const { verifier, scope } = React.useMemo(
        () => {
            const { contractAddresses } = filterTransactionData({chainId, filter: false});
            const verifier = contractAddresses.Verifier as Address
            const scope = process.env.NEXT_PUBLIC_SCOPE as string;

            return {
                verifier,
                scope
            }
        },  
        [chainId]
    );

    // Use useEffect to ensure code only executes on the client side
    React.useEffect(() => {
        try {
            const app = new SelfAppBuilder({
                    version: 2,
                    appName: APP_NAME,
                    scope,
                    endpoint: verifier,
                    logoBase64: APP_ICON_URL,
                    userId: account,
                    endpointType: chainId === 11142220? "staging_celo" : "celo",
                    userIdType: "hex",
                    userDefinedData: "Welcome to Randobet",
                    devMode: chainId === 11142220? true : false,
                    disclosures: {
                        minimumAge: 18,
                        nationality: true,
                        ofac: true,
                        excludedCountries: ["IRN", "PRK", "RUS", "SYR"]
                    }
                }
            ).build();
            setSelfApp(app);
            setUniversalLink(getUniversalLink(app));
        } catch (error) {
            console.error("Failed to initialize Self app:", error);
        }
    }, [account, verifier]);

    const copyToClipboard = () => {
        if (universalLink) {
            navigator.clipboard.writeText(universalLink);
            setLinkCopied(true);
            displayToast("Universal link copied to clipboard!");
            setTimeout(() => setLinkCopied(false), 2000);
        }
    };

    const openSelfApp = () => {
        if (universalLink) {
            window.open(universalLink, '_blank');
        }
    };

    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-2xl">
                <div className="text-center pb-6">
                    <div className="flex items-center justify-center gap-4 mb-6">
                        <Shield className="w-10 h-10 text-yellow-400" />
                        <h1 className="text-3xl md:text-4xl font-bold text-yellow-400">
                            SELF PROTOCOL VERIFICATION
                        </h1>
                    </div>
                    <p className="text-sm md:text-base text-violet-200 uppercase tracking-widest">
                        Scan QR code with Self Protocol App to verify your identity
                    </p>
                </div>

                <div className="space-y-8">
                    {/* QR Code Section */}
                    <div className="w-full place-items-center">
                        <div className="flex justify-center items-center">
                            <div className="flex flex-col justify-center items-center text-center">
                                <div className="flex flex-col justify-center items-center mb-4 sm:mb-6">
                                    {
                                        selfApp ? (
                                            <SelfQRcodeWrapper
                                                size={250}
                                                darkMode={true}
                                                selfApp={selfApp}
                                                onSuccess={handleSuccessfulVerification}
                                                onError={
                                                    () => {
                                                        displayToast("Error: Failed to verify identity");
                                                    }
                                                }
                                            />
                                        ) : (
                                            <div className="w-[200px] h-[200px] bg-stone-700 animate-pulse flex items-center justify-center border-2 border-stone-600">
                                                <p className="text-stone-300 text-sm font-bold uppercase tracking-wider">Loading QR Code...</p>
                                            </div>
                                        )
                                    }
                                    <p className="text-stone-300 text-sm font-bold uppercase tracking-wider mt-4">Self Protocol QR Code</p>
                                </div>
                                <p className="text-stone-400 text-xs mt-2">Scan with Self App to verify</p>
                            </div>
                        </div>
                    </div>

                    {/* Information with Tooltip */}
                    <div className="bg-stone-800/50 border border-stone-600 p-4 rounded-lg">
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <div className="flex items-start gap-4 cursor-help">
                                        <AlertCircle className="w-6 h-6 text-violet-400 mt-1 flex-shrink-0" />
                                        <div className="space-y-3">
                                            <h4 className="text-lg font-bold text-violet-400">Self Protocol Integration</h4>
                                            <p className="text-sm text-stone-200 leading-relaxed">
                                                This feature requires Self Protocol integration. For now, please use the wallet signature verification method.
                                            </p>
                                        </div>
                                    </div>
                                </TooltipTrigger>
                                <TooltipContent side="top" className="max-w-xs bg-stone-800 border border-stone-600 p-4">
                                    <div className="space-y-3">
                                        <p className="font-bold text-yellow-400 uppercase tracking-wider">Self Protocol Status</p>
                                        <p className="text-sm text-stone-200">
                                            Self Protocol integration is currently in development. This advanced verification method will be available in future updates. 
                                            For now, wallet signature verification provides the same security benefits.
                                        </p>
                                    </div>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4">
                        <Button
                            type="button"
                            onClick={copyToClipboard}
                            disabled={!universalLink}
                            className="btn-primary flex-1 flex items-center gap-3"
                        >
                            <CheckCircle className="w-4 h-4" />
                            {linkCopied ? "COPIED!" : "COPY UNIVERSAL LINK"}
                        </Button>

                        <Button
                            onClick={openSelfApp}
                            disabled={!universalLink}
                            className="btn-secondary flex-1 flex items-center gap-3"
                        > 
                            OPEN SELF APP
                        </Button>
                    </div>

                    {/* Display user account */}
                    <div className="bg-stone-800/50 border border-stone-600 p-6 rounded-lg">
                        <div className="flex flex-col items-center gap-4">
                            <span className="text-sm text-stone-300 uppercase tracking-widest font-bold">Connected Account</span>
                            <div className="text-center break-all">
                                {account ? (
                                    <div className="flex items-center justify-center gap-3">
                                        <CheckCircle className="w-5 h-5 text-yellow-400" />
                                        <span className="font-bold text-yellow-400 text-sm">{account.slice(0, 6)}...{account.slice(-6)}</span>
                                    </div>
                                ) : (
                                    <span className="text-stone-400 font-bold">Not connected</span>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Back Button */}
                    <div className="flex justify-center">
                        <Button
                            onClick={onClose}
                            className="bg-stone-800 hover:bg-stone-700 text-yellow-400 border-2 border-yellow-400 px-8 py-4 font-bold text-lg uppercase tracking-wider"
                        >
                            BACK TO OPTIONS
                        </Button>
                    </div>
                </div>
            </div>

            {/* Notification */}
            {showToast && (
                <div className="fixed bottom-4 right-4 bg-yellow-400 text-stone-900 border-2 border-stone-600 py-4 px-6 text-sm font-bold uppercase tracking-wider z-50">
                    {toastMessage}
                </div>
            )}
        </div>
    );
}