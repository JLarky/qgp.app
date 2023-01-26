/// <reference types="vite/client" />
window.global = window.global || window;
window.process = window.process || {};
process.env = process.env || {};
process.env = Object.assign(process.env, import.meta.env);
