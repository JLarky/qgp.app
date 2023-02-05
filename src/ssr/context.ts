import type { StaticHandlerContext } from '@remix-run/router';

// storing WeakMap and passing id as prop could fix sharing context between multiple requests
let ctx: StaticHandlerContext;

export const setContext = (context: StaticHandlerContext) => {
	ctx = context;
};

export const getContext = () => ctx;
