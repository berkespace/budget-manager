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
    </div>
  );
}

export default page;
