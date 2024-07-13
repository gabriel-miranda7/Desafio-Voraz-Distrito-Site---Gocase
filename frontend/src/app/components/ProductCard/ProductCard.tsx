import Image from "next/image";

export type ProductCardProps = {
    image: string;
    name: string;
    price: number;
    onClick: () => void;
}

const ProductCard = ({image, name, price, onClick}: ProductCardProps) => {
    return(
        <div onClick={onClick} className="flex flex-col gap-2 p-2 w-[180px] items-center justify-around shadow-2xl rounded-xl bg-white cursor-pointer hover:scale-110 transition 300ms ease-out">
            <Image src={image} alt="product-image" width={64} height={64} />
            <p className="text-sm text-black line-clamp-2">{name}</p>
            <p className="font-bold text-black">${price}</p>
        </div>
    )
}

export default ProductCard