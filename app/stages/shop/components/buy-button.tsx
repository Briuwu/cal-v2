"use client";
import {
  handleBuyCharacter,
  handleEquippedCharacter,
} from "@/actions/characters";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

type Props = {
  isPurchaseable?: boolean;
  selected: boolean;
  characterId: number;
  coins: number | string;
  owned: boolean;
};

export const BuyButton = ({
  isPurchaseable,
  selected,
  characterId,
  coins,
  owned,
}: Props) => {
  const handlePurchase = async () => {
    try {
      await handleBuyCharacter(characterId, Number(coins));
      toast.success("Character purchased");
    } catch (error) {
      toast.error("Not enough coins");
    }
  };

  const handleEquip = async () => {
    await handleEquippedCharacter(characterId);
    toast.success("Character equipped");
  };

  return (
    <Button
      className="w-full hover:bg-opacity-80"
      disabled={!isPurchaseable || selected}
      onClick={owned ? handleEquip : handlePurchase}
    >
      {selected
        ? "Equipped"
        : owned
          ? "Equip"
          : isPurchaseable
            ? "Purchase"
            : "Locked"}
    </Button>
  );
};
