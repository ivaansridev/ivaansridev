<!-- src/routes/+page.svelte -->
<script lang="ts">
	import * as spe from 'simplyengineered';
	import projectData from '$lib/data.json';
	import myface from '$lib/assets/myface.jpg';
	/* `?url` is required, not stylistic: these SVGs contain raw parentheses and
	   spaces (e.g. `translate(-140, -7559)`), which are illegal inside an
	   unquoted CSS `url()`. Letting Vite inline them as data URIs produces an
	   invalid `mask-image`, the declaration is dropped, and the span degrades to
	   a solid currentColor block. `?url` guarantees a clean, hashed file URL. */
	import githubIcon from '$lib/assets/github.svg?url';
	import mailIcon from '$lib/assets/mail.svg?url';
	import telegramIcon from '$lib/assets/telegram.svg?url';
	import discordIcon from '$lib/assets/discord.svg?url';
	import blueskyIcon from '$lib/assets/bluesky.svg?url';

	const socials = [
		{
			label: 'Bluesky',
			href: 'https://bsky.app/profile/ivaansridev.bsky.social',
			icon: blueskyIcon
		},
		{ label: 'GitHub', href: 'https://github.com/ivaansridev', icon: githubIcon },
		{ label: 'Email', href: 'mailto:ivaansridev.mail+dev@gmail.com', icon: mailIcon },
		{ label: 'Telegram', href: 'https://t.me/ivaansridev', icon: telegramIcon },
		{ label: 'Discord', href: 'https://discord.gg/ydENcAu33s', icon: discordIcon }
	] as const;

	/** Shape of each entry in `$lib/data.json`.
	 *  Only `name` is required; every other field may be omitted. */
	type Project = {
		imagepath?: string;
		name: string;
		description?: string;
		link?: string;
		source?: string;
	};

	const projects = projectData as Project[];

	const sections = [
		{ id: 'home', label: 'Home' },
		{ id: 'projects', label: 'Projects' },
		{ id: 'contact', label: 'Contact' }
	] as const;

	type SectionId = (typeof sections)[number]['id'];

	let active: SectionId = $state('home');

	function isActive(id: SectionId) {
		return active === id;
	}

	/** Highlights the pilltab item for whichever section owns the viewport band
	 *  just below the navbar. Uses a band across the top ~35% of the viewport
	 *  rather than raw scroll position so a section becomes active as it enters
	 *  that band, instead of only once its top edge crosses it. */
	function syncActiveSection() {
		const bandBottom = window.innerHeight * 0.35;

		let current: SectionId = sections[0].id;

		for (const { id } of sections) {
			const el = document.getElementById(id);
			if (!el) continue;
			if (el.getBoundingClientRect().top <= bandBottom) current = id;
		}

		// Bottom of the page: the last section may be too short to ever reach the
		// band, so pin it once the page is scrolled to the bottom.
		const scrolledToEnd =
			window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
		if (scrolledToEnd) current = sections[sections.length - 1].id;

		active = current;
	}
</script>

<svelte:head>
	<title>Ivaan Srivastava | Frontend Developer</title>
	<meta
		name="description"
		content="Ivaan Srivastava - Software Developer building interactive and seamless digital experiences."
	/>
</svelte:head>

<spe.Navbar blur>
	<spe.A href="#home" variant="link">Ivaan Srivastava</spe.A>

	{#snippet right()}
		<spe.Pilltab>
			{#each sections as { id, label } (id)}
				<spe.PilltabItem href="#{id}" variant={isActive(id) ? 'active' : undefined}>
					{label}
				</spe.PilltabItem>
			{/each}
		</spe.Pilltab>
	{/snippet}
</spe.Navbar>

<svelte:window onscroll={syncActiveSection} onresize={syncActiveSection} />

<main>
	<section id="home" class="hero">
		<div class="hero-copy">
			<p class="eyebrow">Hi, I'm Ivaan Srivastava</p>
			<h1 class="hero-title">Frontend<br />Developer</h1>
			<p class="hero-description">
				Transforming ideas into interactive and seamless digital experiences with cutting-edge web
				development. I build products, interfaces, and prototypes that feel focused, polished, and
				alive.
			</p>

			<div class="cta-row">
				<spe.A href="#projects" variant="btn-solid">View Projects</spe.A>
				<spe.A href="#contact" variant="btn-outlined">Contact Me</spe.A>
			</div>

			<div class="social-links">
				{#each socials as { label, href, icon } (label)}
					<spe.A {href} variant="link" target="_blank" aria-label={label}>
						<span class="social-icon" style:--icon-url={`url(${icon})`} aria-hidden="true"></span>
						{label}
					</spe.A>
				{/each}
			</div>
		</div>

		<div class="hero-visual">
			<div class="portrait-frame">
				<img src={myface} alt="Ivaan Srivastava" />
			</div>
		</div>
	</section>

	<section id="projects" class="section">
		<p class="section-label">My work</p>
		<h2 class="section-title">Projects</h2>

		<div class="projects-grid">
			{#each projects as project (project.name)}
				<spe.Card class="project-card">
					{#if project.imagepath}
						<img class="project-image" src={project.imagepath} alt={project.name} loading="lazy" />
					{/if}

					<h3>{project.name}</h3>

					{#if project.description}
						<p>{project.description}</p>
					{/if}

					{#if project.link || project.source}
						<div class="project-links">
							{#if project.link}
								<spe.A
									href={project.link}
									variant="btn-solid"
									target="_blank"
									rel="noopener noreferrer"
								>
									View
								</spe.A>
							{/if}
							{#if project.source}
								<spe.A
									href={project.source}
									variant="btn-tonal"
									target="_blank"
									rel="noopener noreferrer"
								>
									Source
								</spe.A>
							{/if}
						</div>
					{/if}
				</spe.Card>
			{:else}
				<p>Projects coming soon.</p>
			{/each}
		</div>

		<div class="more-row">
			<spe.A
				href="https://github.com/ivaansridev?tab=repositories"
				variant="btn-outlined"
				target="_blank"
				aria-label="More projects on GitHub"
			>
				More projects on GitHub
			</spe.A>
		</div>
	</section>

	<section id="contact" class="section">
		<p class="section-label">Let's talk</p>
		<h2 class="section-title">Contact</h2>

		<div class="contact-wrapper">
			<div class="contact-text">
				<p>Have a question or a project in mind? Feel free to reach out.</p>
				<div class="location-row">
					<span>Location:</span>
					<span>Digital</span>
				</div>
			</div>

			<div class="contact-form-wip">
				<p>Work In Progress</p>
			</div>
		</div>
	</section>
</main>

<footer class="site-footer">
	<div class="footer-grid">
		<div class="footer-social">
			{#each socials as { label, href, icon } (label)}
				<spe.A {href} variant="link" target="_blank" aria-label={label}>
					<span class="social-icon" style:--icon-url={`url(${icon})`} aria-hidden="true"></span>
					{label}
				</spe.A>
			{/each}
		</div>

		<div class="footer-tech">
			<div class="tech-item"><span>Built with</span><span>Svelte</span></div>
			<div class="tech-item">
				<span>Styled with</span><spe.A href="https://simplyengineered.vercel.app" variant="link"
					>simplyengineered</spe.A
				>
			</div>
			<div class="tech-item"><span>Deployed on</span><span>Vercel</span></div>
		</div>
	</div>

	<div class="footer-copyright">
		<p>
			Copyright © 2026 <spe.A href="https://github.com/ivaansridev" variant="link"
				>Ivaan Srivastava</spe.A
			>. All rights reserved.
		</p>
	</div>
</footer>

<style>
	main {
		padding-top: 60px; /* clears fixed navbar */
		min-height: 100vh;
	}

	.hero {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 40px;
		max-width: 1200px;
		margin: 0 auto;
		padding: 80px 24px;
		flex-wrap: wrap;
	}

	.hero-copy {
		flex: 1;
		min-width: 300px;
	}

	.eyebrow {
		color: var(--spe-accent);
		font-weight: 600;
		margin-bottom: 8px;
	}

	.hero-title {
		font-size: 56px;
		line-height: 1.1;
		margin: 0 0 16px;
	}

	.hero-description {
		max-width: 480px;
		margin-bottom: 24px;
		color: color-mix(in srgb, var(--spe-font-color) 80%, transparent);
	}

	.cta-row {
		display: flex;
		gap: 12px;
		margin-bottom: 24px;
		flex-wrap: wrap;
	}

	.social-links {
		display: flex;
		gap: 16px;
		flex-wrap: wrap;
	}

	/* spe.A renders a plain <a> (spe-hl), so lay the icon + label out here. */
	.social-links :global(a),
	.footer-social :global(a) {
		display: inline-flex;
		align-items: center;
		gap: 6px;
	}

	/* The source SVGs are 800x800 with hardcoded #FFFFFF/#000000 fills, so they
	   can't just be recolored. Rendered as a mask instead: the SVG supplies the
	   alpha shape and `currentColor` supplies the paint, which lets the icon
	   follow the link color and turn accent on hover. */
	.social-icon {
		width: 16px;
		height: 16px;
		flex-shrink: 0;
		background-color: currentColor;
		mask-image: var(--icon-url);
		mask-size: contain;
		mask-repeat: no-repeat;
		mask-position: center;
		transition:
			background-color 150ms ease,
			transform 150ms ease;
	}

	.social-links :global(a:hover .social-icon),
	.footer-social :global(a:hover .social-icon) {
		background-color: var(--spe-accent);
		transform: scale(1.12);
	}

	.hero-visual {
		flex-shrink: 0;
	}

	.portrait-frame {
		width: 260px;
		height: 260px;
		border-radius: var(--spe-radius-high);
		overflow: hidden;
	}

	.portrait-frame img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	/* Keeps anchor targets from landing under the fixed navbar. */
	:global(section[id]) {
		scroll-margin-top: 80px;
	}

	.section {
		max-width: 1200px;
		margin: 0 auto;
		padding: 60px 24px;
	}

	.section-label {
		color: var(--spe-accent);
		font-weight: 600;
		margin-bottom: 4px;
	}

	.section-title {
		font-size: 32px;
		margin: 0 0 32px;
	}

	/* Explicit column counts rather than auto-fit/auto-fill: auto-fit with a
	   minmax floor collapses to one column on phones only by accident of the
	   container width, and it can't express "never 2 columns on a wide screen"
	   — at1200px it would happily fit 4. Breakpoints: 1 phone, 2 tablet, 3 desktop. */
	.projects-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 8px;
		margin-bottom: 32px;
	}

	@media (min-width: 640px) {
		.projects-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media (min-width: 1024px) {
		.projects-grid {
			grid-template-columns: repeat(3, 1fr);
		}
	}

	/* `class` passed to a component is dropped by Svelte's scoped-CSS pruner,
     so these opt-in rules need :global().

     The repeated class is load-bearing. spe.Card ships `.spe-card { display:
     block }`, which compiles to `.spe-card.svelte-XXXX` at (0,2,0) — the same
     specificity as a plain `.spe-card.project-card`, so the winner is decided
     purely by stylesheet order. In dev the component injects its <style> after
     the page's, so `block` won, `margin-top: auto` had no flex context to push
     against, and buttons floated up leaving ~210px of dead space. Repeating the
     class lifts this to (0,3,0) so it wins regardless of injection order.

     Spacing is per-element rather than a uniform `gap`, because the title block
     wants tighter leading than the description-to-buttons gap, and `gap` can't
     express a different value for each pair. */
	:global(.spe-card.project-card.project-card) {
		display: flex;
		flex-direction: column;
	}

	:global(.project-card h3) {
		margin: 0 0 6px;
		font-size: 20px;
		line-height: 1.25;
	}

	:global(.project-card p) {
		/* 16px to the buttons is unchanged; it just moved here from the card's
		   uniform `gap` now that spacing is per-element. */
		margin: 0 0 16px;
		line-height: 1.55;
		color: color-mix(in srgb, var(--spe-font-color) 75%, transparent);
	}

	:global(.project-image) {
		width: 100%;
		aspect-ratio: 16 / 9;
		object-fit: cover;
		border-radius: var(--spe-radius-low);
		margin-bottom: 12px;
	}

	/* `margin-top: auto` absorbs the leftover height in the flex column, pushing
	   the actions flush to the card's bottom padding edge. Cards are grid items,
	   which stretch to the tallest in their row by default, so every button row
	   in a row lands on the same line regardless of image/description length. */
	:global(.project-links) {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
		margin-top: auto;
	}

	.more-row {
		display: flex;
		justify-content: center;
	}

	.contact-wrapper {
		display: flex;
		gap: 40px;
		flex-wrap: wrap;
	}

	.contact-text {
		flex: 1;
		min-width: 240px;
	}

	.location-row {
		display: flex;
		gap: 8px;
		margin-top: 16px;
		color: color-mix(in srgb, var(--spe-font-color) 70%, transparent);
	}

	.contact-form-wip {
		flex: 1;
		min-width: 240px;
		padding: 40px;
		background: var(--spe-bg-tint);
		border-radius: var(--spe-radius-med);
		text-align: center;
		color: color-mix(in srgb, var(--spe-font-color) 60%, transparent);
	}

	.site-footer {
		border-top: 1px solid color-mix(in srgb, var(--spe-font-color) 10%, transparent);
		padding: 40px 24px;
	}

	.footer-grid {
		max-width: 1200px;
		margin: 0 auto;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		gap: 20px;
	}

	.footer-social {
		display: flex;
		gap: 16px;
	}

	.footer-tech {
		display: flex;
		gap: 24px;
	}

	.tech-item {
		display: flex;
		flex-direction: column;
		font-size: 13px;
		color: color-mix(in srgb, var(--spe-font-color) 60%, transparent);
	}

	.footer-copyright {
		max-width: 1200px;
		margin: 24px auto 0;
		text-align: center;
		font-size: 13px;
		color: color-mix(in srgb, var(--spe-font-color) 50%, transparent);
	}
</style>
