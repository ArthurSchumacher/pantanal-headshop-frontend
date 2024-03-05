"use client";

import { SingleProduct } from "@/types/product";
import { SyntheticEvent, useEffect, useState } from "react";
import { Button, Link } from "@nextui-org/react";
import ProductImage from "./ProductImage";
import * as actions from "@/actions";
import { AddItemToCartDto } from "@/types/cart";
import SetQuantity from "./SetQuantity";
import toast from "react-hot-toast";
import { useCart } from "@/hooks/useCart";
import { MdCheckCircle } from "react-icons/md";
import { paths } from "@/paths";
import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";

interface ProductDetailsProps {
  product: SingleProduct;
}

const Horizontal = () => {
  return <span className="w-[30%] h-[1.5px] bg-neutral-300 my-2" />;
};

function ProductDetails({ product }: ProductDetailsProps) {
  const session = useSession();
  const router = useRouter();
  const { handleAddProductToCart, cartProducts } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [cartProduct, setCartProduct] = useState<AddItemToCartDto>({
    productId: +product.id,
    amount: quantity,
  });
  const [isProductInCart, setIsProductInCart] = useState(false);

  useEffect(() => {
    setIsProductInCart(false);

    if (cartProducts) {
      const existingIndex = cartProducts.findIndex(
        (item) => item.productId === cartProduct.productId
      );

      if (existingIndex > -1) {
        setIsProductInCart(true);
      }
    }
  }, [cartProducts, cartProduct]);

  const handleQtyIncrease = () => {
    if (quantity >= product.stock) return;
    setQuantity(quantity + 1);
  };

  const handleQtyDecrease = () => {
    if (quantity <= 1) return;
    setQuantity(quantity - 1);
  };

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    const addItemToCartDto: AddItemToCartDto = {
      productId: +product.id,
      amount: quantity,
    };

    if (session.status === "unauthenticated") {
      return router.push(paths.signIn());
    }

    setCartProduct(addItemToCartDto);
    handleAddProductToCart(addItemToCartDto);
    await actions.addToCart(addItemToCartDto).catch((error) => {
      return toast.error("Falha ao adicionar item ao carrinho.");
    });
    toast.success("Item adicionado ao carrinho com sucesso.");
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-14">
      <ProductImage product={product} />
      <div className="flex flex-col gap-1 text-neutral-700 text-sm">
        <h2 className="text-3xl font-medium text-neutral-900">
          {product.name}
        </h2>
        <Horizontal />
        <p className="text-secondary antialiased text-4xl font-bold">
          R${" "}
          {(product.price - (product.price * product.discount) / 100).toFixed(
            2
          )}{" "}
          <span className="text-neutral-950 antialiased text-base font-normal">
            no pix.
          </span>
        </p>
        <p className="text-neutral-950 antialiased text-base">
          ou <strong>R$ {Number(product.price).toFixed(2)}</strong> no cartão de
          crédito.
        </p>
        <Horizontal />
        <p className="text-justify">{product.description}</p>
        <Horizontal />
        <div className="text-base">
          <span className="font-bold">Categoria: </span>
          {product.category.name}
        </div>
        <div
          className={`${
            product.stock > 0 ? "text-green-400" : "text-red-400"
          } text-base`}
        >
          {product.stock > 0 ? "Em estoque." : "Sem estoque."}
        </div>
        <Horizontal />
        {isProductInCart ? (
          <>
            <p className="mb-2 text-neutral-700 antialiased gap-2 inline-flex items-center">
              <MdCheckCircle className="text-green-400" size={20} />
              <span>Produto adicionado ao carrinho.</span>
            </p>
            <div className="max-w-[30%]">
              <Button
                as={Link}
                href={paths.cart()}
                size="lg"
                radius="sm"
                color="success"
                variant="solid"
                className="text-neutral-50"
              >
                Abrir carrinho
              </Button>
            </div>
          </>
        ) : (
          <>
            <SetQuantity
              cartCounter
              quantity={quantity}
              minValue={1}
              maxValue={product.stock}
              setQuantity={setQuantity}
              handleQuantityDecrease={handleQtyDecrease}
              handleQuantityIncrease={handleQtyIncrease}
            />
            <Horizontal />
            <div className="max-w-[30%]">
              <Button
                onClick={handleSubmit}
                size="lg"
                radius="sm"
                color="secondary"
                variant="solid"
              >
                Adicionar ao carrinho
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default ProductDetails;
