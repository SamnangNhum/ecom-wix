import { products } from "@wix/stores";
import { Label } from "@/components/ui/label";
import { checkInStock, cn } from "@/lib/utils";

interface ProductOptionsProps {
    product: products.Product;
    selectedOption: Record<string, string>;
    setSelectedOptions: (option: Record<string, string>) => void;
}

export default function ProductOptions({ product, selectedOption, setSelectedOptions }: ProductOptionsProps) {
    return <div className="space-y-2.5">
        {product.productOptions?.map(opt => (
            <fieldset key={opt.name} className="space-y-1.5">
                <legend>
                    <Label asChild>
                        <span>{opt.name}</span>
                    </Label>
                </legend>
                <div className="flex flex-wrap items-center gap-1.5">
                    {opt.choices?.map((choice) => (
                        <div key={choice.description}>
                            <input
                                className="peer hidden"
                                type="radio"
                                id={choice.description}
                                name={opt.name}
                                value={choice.description}
                                checked={selectedOption[opt.name || ""] === choice.description}
                                onChange={() => setSelectedOptions({
                                    ...selectedOption,
                                    [opt.name || ""]: choice.description || ""
                                })}
                            />
                            <Label
                                htmlFor={choice.description}
                                className={cn("flex items-center justify-center min-w-14 cursor-pointer gap-1.5 border p-2 peer-checked:border-primary",
                                    !checkInStock(product, {
                                        ...selectedOption,
                                        [opt.name || ""]: choice.description || ""
                                    }) && "opacity-50"
                                )}
                            >
                                {opt.optionType === products.OptionType.color && (
                                    <span className="size-4 rounded-full border" style={{ backgroundColor: choice.value }} />
                                )}
                                <span>{choice.description}</span>
                            </Label>
                        </div>
                    ))}
                </div>
            </fieldset>
        ))}
    </div>
}