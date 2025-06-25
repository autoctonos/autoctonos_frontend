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
import { useCart } from "../../app/contexts/CartContext";

export default function ShopSiderBar() {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const { cartItems, incrementItem, decrementItem, removeItem } = useCart();

  return (
    <>
      <Button className="bg-custom-dark-green text-custom-cream hover:bg-custom-green transition"
        onPress={onOpen}
        startContent={<CartIcon className="text-custom-red" />}
      >
        Carrito ({cartItems.length})
      </Button>

      <Drawer isOpen={isOpen} onOpenChange={onOpenChange}>
        <DrawerContent>
          {(onClose) => (
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
                      <div className="w-20 h-20 rounded overflow-hidden border">

                      </div>

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
                  <Button color="danger" variant="light" onPress={onClose}>
                    Cerrar
                  </Button>
                  <Button color="primary" onPress={() => alert("Ir al pago")}>
                    Ir a pagar
                  </Button>
                </DrawerFooter>
              )}
            </>
          )}
        </DrawerContent>
      </Drawer>
    </>
  );
}
