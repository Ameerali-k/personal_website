"use client";
import { createContext, useContext } from "react";

export const ThemeContext = createContext<boolean>(true);
export function useTheme() { return useContext(ThemeContext); }
