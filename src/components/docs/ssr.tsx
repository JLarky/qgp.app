import { createContext, JSX } from 'solid-js';

export const SSRContext = createContext({ ssrValue: '' as JSX.Element });
