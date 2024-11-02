import Link from "next/link";
import logo from "@/assets/logo.jpg";
import Image from "next/image";
import { getCart } from "@/wix-api/cart";
import { getWixServerClient } from "@/lib/wix-client.server";
import ShoppingCartButton from "./ShoppingCartButton";
import UserButton from "@/components/UserButton";
import { getLoggedInMember } from "@/wix-api/members";
import { getCollections } from "@/wix-api/collections";
import MainNavigation from "./MainNavigation";
import SearchField from "@/components/SearchField";
import MobileMenu from "./MobileMenu";
import { Suspense } from "react";

export default async function Navbar() {
    const wixClient = getWixServerClient();

    const [cart, loggedInMember, collections] = await Promise.all([
        getCart(wixClient),
        getLoggedInMember(wixClient),
        getCollections(wixClient)
    ])

    return <header className="bg-background shadow-sm">
        <div className="max-w-7xl mx-auto p-5 flex items-center justify-between gap-5">
            <Suspense>
                <MobileMenu collections={collections} loggedInMember={loggedInMember} />
            </Suspense>
            <div className="flex flex-wrap items-center gap-5">
                <Link href="/" className="flex items-center gap-4">
                    <Image src={logo} alt="FLYBYBOX Logo" width={80} height={80} />
                    <span className="text-xl font-bold">FlyByBox</span>
                </Link>
                <MainNavigation collections={collections} className="hidden lg:flex" />
            </div>
            <SearchField className="hidden max-w-96 lg:inline " />
            <div className="flex items-center justify-center gap-5">
                <UserButton
                    loggedInMember={loggedInMember}
                    classname="hidden lg:inline-flex"
                />
                <ShoppingCartButton initialData={cart} />
            </div>
        </div>
    </header>
}