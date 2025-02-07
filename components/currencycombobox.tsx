"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Currencies, Currency } from "@/lib/currencies";
import { useMutation, useQuery } from "@tanstack/react-query";
import SkeletonWrapper from "./SkeletonWrapper";
import { UserSettings } from "@prisma/client";
import { UpdateUserCurrency } from "@/app/wizard/_actions/userSettings";
import { toast } from "sonner";

export function CurrencyComboBox() {
  const [open, setOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<Currency | null>(null);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const { data: userSettings, isFetching } = useQuery<UserSettings>({
    queryKey: ["userSettings"],
    queryFn: () => fetch("api/user-settings").then((res) => res.json()),
  });

  useEffect(() => {
    if (!userSettings) return;
    const userCurrency = Currencies.find(
      (currency) => currency.value === userSettings.currency
    );
    if (userCurrency) setSelectedOption(userCurrency);
  }, [userSettings]);

  const mutation = useMutation({
    mutationFn: UpdateUserCurrency,
    onSuccess: (data: UserSettings) => {
      toast.success("Para biriminiz başarıyla güncellenmiştir 🎉", {
        id: "update-currency",
      });
      setSelectedOption(
        Currencies.find((c) => c.value === data.currency) || null
      );
    },
    onError: () => {
      toast.error("Birşeyler yanlış gitti.😥", { id: "update-currency" });
    },
  });

  const selectOption = useCallback(
    (currency: Currency | null) => {
      if (!currency) {
        toast.error("Lütfen bir para birimi seçin.");
        return;
      }
      toast.loading("Para biriminiz güncelleniyor.🤑", {
        id: "update-currency",
      });
      mutation.mutate(currency.value);
    },
    [mutation]
  );

  const buttonLabel = selectedOption
    ? selectedOption.label
    : "+ Para Birimi Seç";

  const content = (
    <OptionList setOpen={setOpen} setSelectedOption={selectOption} />
  );

  return (
    <SkeletonWrapper isLoading={isFetching}>
      {isDesktop ? (
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-full justify-start"
              disabled={mutation.isPending}
            >
              {buttonLabel}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0" align="start">
            {content}
          </PopoverContent>
        </Popover>
      ) : (
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerTrigger asChild>
            <Button
              variant="outline"
              className="w-full justify-start"
              disabled={mutation.isPending}
            >
              {buttonLabel}
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <div className="mt-4 border-t">{content}</div>
          </DrawerContent>
        </Drawer>
      )}
    </SkeletonWrapper>
  );
}

function OptionList({
  setOpen,
  setSelectedOption,
}: {
  setOpen: (open: boolean) => void;
  setSelectedOption: (currency: Currency | null) => void;
}) {
  return (
    <Command>
      <CommandInput placeholder="Para birimlerini filtrele..." />
      <CommandList>
        <CommandEmpty>Sonuç bulunamadı 😥.</CommandEmpty>
        <CommandGroup>
          {Currencies.map((currency) => (
            <CommandItem
              key={currency.value}
              value={currency.value}
              onSelect={(value) => {
                const selected =
                  Currencies.find((c) => c.value === value) || null;
                setSelectedOption(selected);
                setOpen(false);
              }}
            >
              {currency.label}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
