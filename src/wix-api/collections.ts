import { WixClient } from "@/lib/wix-client.base";
import { collections } from "@wix/stores";
import { cache } from "react";

export const getCollectionBySlug = cache(async (wixClient: WixClient,slug:string) =>  {
    const { collection } = await wixClient.collections.getCollectionBySlug(slug);

    return collection || null;
});

export const getCollections = cache(
    async (wixClient: WixClient) : Promise<collections.Collection[]> => {
        const collections = await wixClient.collections
            .queryCollections()
            .ne("_id","00000000-000000-000000-000000000001") //exclude All Product
            .ne("_id","84e1f89c-39f6-b262-4ec3-8b7f7e19bc0a") //exclude Featured Product
            .find();

        return collections.items;
    }
)