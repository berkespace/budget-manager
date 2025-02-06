import { CurrencyComboBox } from "@/components/currencycombobox";
import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/dist/server/api-utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";

async function page() {
  const user = await currentUser();
  if (!user) {
    redirect("/sign-in");
  }
  return (
    <div className="container flex max-w-2xl flex-col items-center justify-between gap-4">
      <div>
        <h1 className="text-center text-3xl">
          Hoşgeldin{" "}
          <span className="ml-2 font-bold">{user?.firstName}! 👋</span>
        </h1>
        <h2 className="mt-4 text-center text-base text-muted-foreground">
          Haydi birkaç basit ayarlama ile başlayalım.🎉
        </h2>
        <h3 className="mt-2 text-center text-sm text-muted-foreground">
          Bu ayarlamaları istediğin zaman tekrar değiştirebilirsin.
        </h3>
      </div>

      <Card className="w-full">
        <CardHeader>
          <CardTitle>Para birimi</CardTitle>
          <CardDescription>
            Lütfen yapacağınız işlemlerde kullanılacak para birimini seçiniz.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CurrencyComboBox></CurrencyComboBox>
        </CardContent>
      </Card>
      <Separator />
      <Button className="w-full" asChild>
        <Link href={"/"}>Herşey tamam! 😎 Beni Anasayfaya götür.🚀</Link>
      </Button>
      <div className="mt-8">
        <Logo />
      </div>
      <div className="flex flex-row items-center justify-center gap-8">
  {/* 1. Resim ve Yazı */}
  <div className="flex flex-col items-center">
    <Image src="/zircon.png" alt="450sr" width={230} height={200} />
    <h1 className="text-3xl font-bold mt-4">Code 💤</h1>
  </div>

  {/* 2. Resim ve Yazı */}
  <div className="flex flex-col items-center">
    <Image src="/sahin.png" alt="450sr" width={270} height={250} />
    <h1 className="text-3xl font-bold mt-4">Şahin 🐱‍👤</h1>
  </div>

  {/* 3. Resim ve Yazı */}
  <div className="flex flex-col items-center">
    <Image src="/450-nk.png" alt="450sr" width={250} height={220} />
    <h1 className="text-3xl font-bold mt-4">Muni 🤠</h1>
  </div>

  {/* 4. Resim ve Yazı */}
  <div className="flex flex-col items-center">
    <Image src="/mt.png" alt="450sr" width={250} height={250} />
    <h1 className="text-2xl font-bold mt-4">MAHO G 💀</h1>
  </div>
</div>
    </div>
    
  );
}

export default page;
