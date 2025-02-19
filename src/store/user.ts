import { create } from "zustand";

interface UserSettingsState {
    username: string;
    setUsername: (username: string) => void;
    email: string;
    setEmail: (email: string) => void;
    profilePicture: string | null;
    setProfilePicture: (picture: string | null) => void;
    language: string;
    setLanguage: (language: string) => void;
}

export const useUserSettings = create<UserSettingsState>((set) => ({
    username: localStorage.getItem("username") || "",
    setUsername: (username) => {
        set({ username });
        localStorage.setItem("username", username);
    },
    email: localStorage.getItem("email") || "",
    setEmail: (email) => {
        set({ email });
        localStorage.setItem("email", email);
    },
    profilePicture: localStorage.getItem("profilePicture") || null,
    setProfilePicture: (picture) => {
        set({ profilePicture: picture });
        if (picture) {
            localStorage.setItem("profilePicture", picture);
        } else {
            localStorage.removeItem("profilePicture");
        }
    },
    language: localStorage.getItem("language") || "es",
    setLanguage: (language) => {
        set({ language });
        localStorage.setItem("language", language);
    },
}));
