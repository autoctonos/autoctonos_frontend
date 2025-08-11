import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Button,
  useDisclosure,
} from "@heroui/react";
import { CartIcon } from "@/components/icons";
import { useCart } from '@/contexts/cart-context';
import Link from "next/link";

export default function ShopSiderBar() {
  const { cartItems, incrementItem, decrementItem, removeItem, isCartOpen, closeCart, openCart } = useCart();

   return (
    <>
      <Button className="bg-custom-dark-green text-custom-cream hover:bg-custom-green transition"
        onPress={openCart}
        startContent={<CartIcon className="text-custom-red" />}
      >
        Carrito ({cartItems.length})
      </Button>

      <Drawer isOpen={isCartOpen} onOpenChange={(open) => !open && closeCart()}>
        <DrawerContent>
          {() => (
            <>
              <DrawerBody className="space-y-4">
                {cartItems.length === 0 ? (
                  <p className="text-gray-500 text-center mt-8">
                    Tu carrito está vacío.
                  </p>
                ) : (
                  cartItems.map((item, index) => (
                    <div
                      key={index}
                      className="flex gap-4 items-center border-b pb-4"
                    >
                      <div className="w-20 h-20 rounded overflow-hidden border"/>

                      <div className="flex-1">
                        <h3 className="font-semibold text-base">
                          {item.productName}
                        </h3>
                        <p className="text-sm text-gray-500">
                          Precio: ${item.price}
                        </p>
                        <p className="text-sm text-gray-500">
                          Subtotal: ${(item.quantity * item.price).toFixed(2)}
                        </p>

                        <div className="flex items-center mt-2 gap-2">
                          <Button
                            size="sm"
                            variant="flat"
                            onPress={() => decrementItem(item.productId)}
                          >
                            -
                          </Button>
                          <span className="text-base font-medium">
                            {item.quantity}
                          </span>
                          <Button
                            size="sm"
                            variant="flat"
                            onPress={() => incrementItem(item.productId)}
                          >
                            +
                          </Button>
                          <Button
                            isIconOnly
                            size="sm"
                            variant="light"
                            color="danger"
                            onPress={() => removeItem(item.productId)}
                          >
                            X
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </DrawerBody>

              {cartItems.length > 0 && (
                <DrawerFooter className="flex justify-between items-center border-t pt-4">
                  <Button color="danger" variant="light" onPress={closeCart}>
                    Cerrar
                  </Button>
                  <Link href="/checkout/shipping" passHref legacyBehavior>
                    <Button color="primary">
                      Ir a pagar
                    </Button>
                  </Link>
                </DrawerFooter>
              )}
            </>
          )}
        </DrawerContent>
      </Drawer>
    </>
  );
}
