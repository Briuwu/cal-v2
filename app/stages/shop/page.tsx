import { getAllCharacters, getOwnedCharacters } from "@/actions/characters";
import { getProfile } from "@/actions/profile";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { BuyButton } from "./components/buy-button";
import { handleAuth } from "@/lib/auth";
import { redirect } from "next/navigation";

async function ShopPage() {
  const userId = handleAuth();

  if (!userId) {
    redirect("/");
  }

  let characters = await getAllCharacters();
  let profile = await getProfile();
  let ownedCharacters = await getOwnedCharacters();

  if (!characters || !profile || !ownedCharacters) {
    return <div>Loading...</div>;
  }

  let details = [
    {
      price: 0,
      description: "A beginner male homeless character.",
      isPurchaseable: true,
    },
    {
      price: 0,
      description: "A beginner female homeless character.",
      isPurchaseable: true,
    },
    {
      price: 500,
      description: "A fighter that can fight for you.",
      isPurchaseable: true,
    },
    {
      price: "unlocks after clearing stage 2",
      description: "A samurai that can fight for you.",
    },
    {
      price: "unlocks after clearing stage 5",
      description: "A shinobi that can fight for you.",
    },
  ];

  let charactersWithDetails = characters.map((character, index) => {
    return {
      ...character,
      details: details[index],
      selected: profile.selectedCharacter.id === character.id,
      owned: ownedCharacters.some(
        (ownedCharacter) => ownedCharacter.characterId === character.id,
      ),
    };
  });

  return (
    <main>
      <div className="mb-5">
        <h1 className="text-xl font-bold uppercase md:text-2xl lg:text-3xl">
          Shop
        </h1>
        <p className="opacity-70">
          Buy and unlock all different kind of characters you can use in the
          game.
        </p>
      </div>
      <div className="grid gap-x-10 gap-y-32 md:grid-cols-2">
        {charactersWithDetails.map((character) => (
          <div key={character.id} className="space-y-1">
            <div className="grid h-full place-content-center rounded border">
              <Image
                src={character.characterSrc}
                alt={character.characterName}
                width={180}
                height={304}
                className="object-contain p-4"
              />
            </div>
            <div className="space-y-1">
              <p className="font-bold uppercase">
                Cost:{" "}
                <span className="text-yellow-400">
                  {character.details.price}
                </span>
              </p>
              <p className="text-sm opacity-80">
                {character.details.description}
              </p>
              <BuyButton
                isPurchaseable={character.details.isPurchaseable}
                selected={character.selected}
                characterId={character.id}
                coins={character.details.price}
                owned={character.owned}
              />
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
export default ShopPage;
