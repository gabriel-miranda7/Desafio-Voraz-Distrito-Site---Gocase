import Image from "next/image";

export type ProductCardProps = {
    image: string;
    name: string;
    price: string;
}

const ProductCard = ({image, name, price}: ProductCardProps) => {
    return(
        <div className="flex flex-col gap-2 p-2 items-center shadow-2xl rounded-xl bg-white">
            <Image src={image} alt="product-image" width={128} height={64} />
            <p className="text-sm text-black">{name}</p>
            <p className="font-bold text-black">{price}</p>
        </div>
    )
}

export default ProductCard