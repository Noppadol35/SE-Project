import { create } from "zustand";
import { User } from "@/types/entity";
import { persist, createJSONStorage } from "zustand/middleware";

type Store = {
    user: Pick<User, "id" | "name" | "role">;
    setUser: (user: Pick<User, "id" | "name" | "role">) => void;
    removeUser: () => void;
};

export const useUserStore = create<Store>()(
    persist(
        (set, get) => ({
            user: {
                id: "",
                name: "",
                role: "",
            },
            setUser: (user) => {
                set({ user }); 
            },
            removeUser: () => { 
                set({ 
                    user: { id: "", name: "", role: "" },
                }); 
            },
        }),
        {
            name: "user-storage",
            storage: createJSONStorage(() => localStorage),
        }
    )
);
