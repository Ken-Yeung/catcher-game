import { ReactNode } from "react";

export interface IViewCollection<T> {
    [viewName in T]: ReactNode;
}