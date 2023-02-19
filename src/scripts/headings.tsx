import { customElement, noShadowDOM } from 'solid-element';
import { createSignal, For, Show } from 'solid-js';

type Heading = {
	depth: number;
	text: string;
	slug: string;
};

const [signal, setSignal] = createSignal([] as Heading[]);

customElement('toc-data', (_props, { element }) => {
	const toc = element.querySelector('template');
	setTimeout(() => {
		const text = toc?.content.textContent;
		if (text) {
			setSignal(JSON.parse(text));
		}
	}, 1); // 🤷
	return '';
});

customElement('right-side-bar', (_props, { element }) => {
	noShadowDOM();
	element.innerHTML = '';
	return (
		<Show when={signal().length > 0}>
			<h2 class="text-2xl font-bold text-center">On This Page</h2>
			<ul class="flex flex-col items-center">
				<For each={signal()}>
					{(item) => (
						<li>
							<a href={'#' + item.slug}>{item.text}</a>
						</li>
					)}
				</For>
			</ul>
		</Show>
	);
});
