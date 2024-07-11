import Image from "next/image";

export type ProductCardProps = {
    image: string;
    name: string;
    price: string;
}

const ProductCard = ({image, name, price}: ProductCardProps) => {
    return(
        <div className="flex flex-col gap-2 p-2 w-[180px] items-center justify-around shadow-2xl rounded-xl bg-white">
            <Image src={image} alt="product-image" width={64} height={64} />
            <p className="text-sm text-black line-clamp-2">{name}</p>
            <p className="font-bold text-black">${price}</p>
        </div>
    )
}

export default ProductCard