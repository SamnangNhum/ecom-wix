import { useMutation } from "@tanstack/react-query";
import { useToast } from "./use-toast";
import { BackInStockNotificationRequestValues, createBackInStockNotificationRequest } from "@/wix-api/backInStockNotification";
import { wixBrowserClient } from "@/lib/wix-client.browser";

export function useCreateBackInStockNotification(){
    const { toast } = useToast();
    return useMutation({
        mutationFn:(values:BackInStockNotificationRequestValues) => createBackInStockNotificationRequest(wixBrowserClient,values),
        onError(error){
            console.log(error)
            if(
                (error as any).details.applicationError.code === "BACK_IN_STOCK_NOTIFICATION_REQUEST_ALREADY_EXISTS"
            ) {
                toast({
                    variant: "destructive",
                    description: "You are already subscribed to this product.",
                });
            }else{
                toast({
                    variant: "destructive",
                    description: "Something went wrong. Please try again.",
                });
            }
        }
    })
}