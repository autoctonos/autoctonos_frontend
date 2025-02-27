"use client"
import { Card, CardHeader, CardFooter, Image, Button, Skeleton } from "@heroui/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function CategoryList({categories} : {categories : any[]}) {

    if (!categories || categories.length === 0) {
        return <p>No hay productos disponibles.</p>;
      }    

    const router = useRouter();
    const [imagesLoaded, setImagesLoaded] = useState(false);
    const [loadedImagesCount, setLoadedImagesCount] = useState(0);
    const totalImages = 6; 

    const handleImageLoad = () => {
        setLoadedImagesCount(prev => {
            const newCount = prev + 1;
            if (newCount >= totalImages) {
                setImagesLoaded(true);
            }
            return newCount;
        });
    };

    useEffect(() => {
        setImagesLoaded(false);
        setLoadedImagesCount(0);
    }, []);

    return (
        <main className="flex items-center justify-center">
            <Skeleton className="rounded-lg" isLoaded={imagesLoaded}>
                <div className="max-w-[900px] gap-2 grid grid-cols-12 grid-rows-2 px-8">
                    <Card className="col-span-12 sm:col-span-4 h-[300px]" isPressable onPress={() => router.push(`/productos/${categories[0].id_categoria}`)}>
                        <CardHeader className="absolute z-10 top-1 flex-col !items-start">
                            <p className="text-tiny text-white/60 uppercase font-bold">Buscas</p>
                            <h4 className="text-white font-medium text-large">{categories[0].nombre}</h4>
                        </CardHeader>
                        <Image
                            removeWrapper
                            isZoomed
                            alt="Card background"
                            className="z-0 w-full h-full object-cover"
                            src="https://picsum.photos/600/500"
                            onLoad={handleImageLoad}
                        />
                    </Card>
                    <Card className="col-span-12 sm:col-span-4 h-[300px]" isPressable onPress={() => router.push(`/productos/${categories[1].id_categoria}`)}>
                        <CardHeader className="absolute z-10 top-1 flex-col !items-start">
                            <p className="text-tiny text-white/60 uppercase font-bold">O tal vez</p>
                            <h4 className="text-white font-medium text-large">{categories[1].nombre}</h4>
                        </CardHeader>
                        <Image
                            removeWrapper
                            isZoomed
                            alt="Card background"
                            className="z-0 w-full h-full object-cover"
                            src="https://picsum.photos/600/500"
                            onLoad={handleImageLoad}
                        />
                    </Card>
                    <Card className="col-span-12 sm:col-span-4 h-[300px]" isPressable onPress={() => router.push(`/productos/${categories[2].id_categoria}`)}>
                        <CardHeader className="absolute z-10 top-1 flex-col !items-start">
                            <p className="text-tiny text-white/60 uppercase font-bold">Te puede interesar</p>
                            <h4 className="text-white font-medium text-large">{categories[2].nombre}</h4>
                        </CardHeader>
                        <Image
                            removeWrapper
                            isZoomed
                            alt="Card background"
                            className="z-0 w-full h-full object-cover"
                            src="https://picsum.photos/600/500"
                            onLoad={handleImageLoad}
                        />
                    </Card>
                    <Card isFooterBlurred className="w-full h-[300px] col-span-12 sm:col-span-7">
                        <CardHeader className="absolute z-10 top-1 flex-col items-start">
                            <p className="text-tiny text-white/60 uppercase font-bold">Nuestros clientes suelen comprar</p>
                            <h4 className="text-white/90 font-medium text-xl">{categories[3].nombre}</h4>
                        </CardHeader>
                        <Image
                            removeWrapper
                            alt="Relaxing app background"
                            className="z-0 w-full h-full object-cover"
                            src="https://picsum.photos/600/500"
                            onLoad={handleImageLoad}
                        />
                        <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
                            <div className="flex flex-grow gap-2 items-center">
                                <Image
                                    removeWrapper
                                    alt="Breathing app icon"
                                    className="rounded-full w-10 h-11 bg-black"
                                    src="https://picsum.photos/600/500"
                                    onLoad={handleImageLoad}
                                />
                                <div className="flex flex-col">
                                    <p className="text-tiny text-white/60">{categories[3].nombre} están disponibles</p>
                                    <p className="text-tiny text-white/60">Échale un vistazo</p>
                                </div>
                            </div>
                            <Button radius="full" size="sm">
                                Ver
                            </Button>
                        </CardFooter>
                    </Card>
                    <Card isFooterBlurred className="w-full h-[300px] col-span-12 sm:col-span-5">
                        <CardHeader className="absolute z-10 top-1 flex-col items-start">
                            <p className="text-tiny text-white/60 uppercase font-bold">¿Ya has probado?</p>
                            <h4 className="text-black font-medium text-2xl">{categories[4].nombre}</h4>
                        </CardHeader>
                        <Image
                            removeWrapper
                            alt="Card example background"
                            className="z-0 w-full h-full scale-125 -translate-y-6 object-cover"
                            src="https://picsum.photos/600/500"
                            onLoad={handleImageLoad}
                        />
                        <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
                            <div>
                                <p className="text-black text-tiny">{categories[4].nombre}</p>
                                <p className="text-black text-tiny">Échale un vistazo</p>
                            </div>
                            <Button className="text-tiny" color="primary" radius="full" size="sm">
                                Ver
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            </Skeleton>
        </main>
    );
}