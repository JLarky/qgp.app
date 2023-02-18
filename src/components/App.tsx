import { createSignal } from 'solid-js';

function Counter() {
	const [count, setCount] = createSignal(0);
	return (
		<>
			<div class="card">
				<button onClick={() => setCount((count) => count + 1)}>count is {count()}</button>
				<p>
					Edit <code>src/App.tsx</code> and save to test HMR
				</p>
			</div>
			<p class="read-the-docs">Click on the Vite and Solid logos to learn more</p>
		</>
	);
}

export default Counter;
