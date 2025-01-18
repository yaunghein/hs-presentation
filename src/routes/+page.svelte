<script>
	import { onMount } from 'svelte';
	import Swiper from 'swiper';
	import { Parallax, Mousewheel, Controller, Keyboard, Navigation } from 'swiper/modules';
	import SplitType from 'split-type';
	import { animate } from 'motion';

	import 'swiper/css';

	const DATA_SWIPER_PARALLA_X = '100%';
	const DATA_SWIPER_PARALLA_Y = '0%';
	const COLORS = [
		'#FEFAF7',
		'#F3F8FF',
		'#124734',
		'#ED1B24',
		'#00041F',
		'#141729',
		'#000000',
		'#FEFAF7',
		'#3C237F',
		'#FEFAD7',
		'#E3FCFA',
		'#FEFAF7'
	];
	const IMAGES = [
		'/images/1.webp',
		'/images/2.webp',
		'/images/3.webp',
		'/images/4.webp',
		'/images/5.webp',
		'/images/6.webp',
		'/images/7.webp',
		'/images/8.webp',
		'/images/9.webp',
		'/images/10.webp',
		'/images/11.webp',
		'https://img.wattpad.com/99e1d7d0599330fa62da684bf19c2b2d1066b93e/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f776174747061642d6d656469612d736572766963652f53746f7279496d6167652f757835715133747a6b53513362773d3d2d3733393230313236322e313561336339626563333738616236663130303736393732343736362e676966?s=fit&w=720&h=720'
	];

	onMount(() => {
		new SplitType('[split-text]', {
			types: 'lines',
			tagName: 'div'
		});
		Array.from(document.querySelectorAll('div.line'))?.forEach((text) => {
			text.style.height = 'auto';
			text.style.background = 'transparent';
			text.setAttribute('data-swiper-parallax-y', '-100%');

			const wrapper = document.createElement('div');
			wrapper.classList.add('overflow-hidden');
			text.parentNode.insertBefore(wrapper, text);
			wrapper.appendChild(text);
		});

		let currentThemeColor = COLORS[0];
		const contentSwiper = new Swiper('.content-swiper', {
			modules: [Parallax, Mousewheel, Controller, Keyboard],
			parallax: true,
			speed: 1200,
			mousewheel: true,
			keyboard: {
				enabled: true
			},
			on: {
				init: function () {
					var swiper = this;
					swiper.slides.forEach(function (slide) {
						var slideBg = slide.querySelector('.slide-img');
						if (slideBg) {
							slideBg.setAttribute('data-swiper-parallax', 0.75 * swiper.width);
						}
						slide.style.pointerEvents = 'none';
					});
				},
				// slideChangeTransitionStart: function () {
				// 	this.keyboard.disable();
				// },
				// slideChangeTransitionEnd: function () {
				// 	this.keyboard.enable();
				// },
				resize: function () {
					this.update();
				},
				slideChange: function () {
					this.slides[this.activeIndex].style.pointerEvents = 'auto';

					const color = COLORS[this.activeIndex];
					animate(
						'.content-swiper',
						{ backgroundColor: color },
						{
							duration: 0.5,
							easing: 'ease-in-out'
						}
					);

					animate(currentThemeColor, COLORS[this.activeIndex], {
						duration: 0.5,
						easing: 'ease-in-out',
						onUpdate: (latest) => {
							const themeColorMetaTag = document.querySelector('meta[name="theme-color"]');
							if (themeColorMetaTag) {
								themeColorMetaTag.setAttribute('content', latest);
							}
						}
					});
				}
			}
		});

		const imageSwiper = new Swiper('.image-swiper', {
			modules: [Parallax, Mousewheel, Controller, Keyboard, Navigation],
			parallax: true,
			speed: 1200,
			mousewheel: true,
			direction: 'vertical',
			rtl: true,
			keyboard: {
				enabled: true
			},
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev'
			},
			on: {
				init: function () {
					var swiper = this;
					swiper.slides.forEach(function (slide) {
						var slideBg = slide.querySelector('.slide-img');
						if (slideBg) {
							slideBg.setAttribute('data-swiper-parallax', 0.75 * swiper.width);
						}
					});
				},
				resize: function () {
					this.update();
				}
			}
		});

		imageSwiper.controller.control = contentSwiper;
		contentSwiper.controller.control = imageSwiper;

		imageSwiper.slideTo(0);
	});
</script>

<div
	class="relative flex h-[100dvh] flex-col items-center justify-center overflow-hidden bg-[#FEFAF7] sm:flex-row"
>
	<div class="content-swiper relative h-1/2 w-full overflow-hidden sm:h-full sm:w-1/2">
		<div class="swiper-wrapper">
			<!-- ################ Slide 1 Start ################ -->
			<div class="swiper-slide">
				<div
					class="flex h-full flex-col justify-between p-10 text-[#111]"
					data-swiper-parallax-x={DATA_SWIPER_PARALLA_X}
					data-swiper-parallax-y={DATA_SWIPER_PARALLA_Y}
				>
					<div>
						<div class="text-[2rem] font-light" split-text>👋 Hey, I’m</div>
						<div class="text-[3.16rem] font-black uppercase" split-text>YAN AUNG HEIN</div>
						<div class="text-xl font-light" split-text>
							Crafting beautiful, valuable web experiences,<br /> one pixel at a time.
						</div>
					</div>

					<div class="grid grid-cols-2 gap-8">
						<div class="grid items-start gap-14">
							<div class="grid gap-6">
								<div class="text-xl font-medium uppercase" split-text>Who I Am</div>
								<div class="grid gap-3">
									<div class="text-xl font-light" split-text>Web Developer</div>
									<div class="text-xl font-light" split-text>UI/UX Enthusiast</div>
									<div class="text-xl font-light" split-text>Table-tennis Player</div>
								</div>
							</div>
						</div>

						<div class="grid gap-14">
							<div class="grid gap-6">
								<div class="text-xl font-medium uppercase" split-text>What I Do</div>
								<div class="grid gap-3">
									<div class="text-xl font-light" split-text>Co-founder of Duo Design Lab</div>
									<div class="text-xl font-light" split-text>
										Web developer at APM Help, The Sand Studio, and, of course, Duo Design Lab
									</div>
									<div class="text-xl font-light" split-text>Creator-in-progress of MM Car Hub</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<!-- ################ Slide 1 End ################ -->

			<!-- ################ Slide 2 Start ################ -->
			<div class="swiper-slide">
				<div
					class="flex h-full flex-col justify-between p-10 text-[#111]"
					data-swiper-parallax-x={DATA_SWIPER_PARALLA_X}
					data-swiper-parallax-y={DATA_SWIPER_PARALLA_Y}
				>
					<div class="grid gap-2">
						<div class="text-[3.16rem] font-black uppercase leading-none" split-text>
							My recent life
						</div>
						<div class="text-[3.16rem] font-black uppercase leading-none" split-text>
							in a Nutshell
						</div>
					</div>

					<div class="grid grid-cols-2 gap-16">
						<div class="grid items-start gap-14">
							<div class="grid gap-6">
								<div class="text-xl font-medium uppercase" split-text>A Brave New Chapter</div>
								<div class="grid gap-3">
									<div class="text-xl font-light" split-text>
										Moved to Bangkok due to Myanmar's political situation.
									</div>
									<div class="text-xl font-light" split-text>
										Faced first-time experiences with airports, visas, and immigration, adapting to
										life away from family.
									</div>
								</div>
							</div>
						</div>

						<div class="grid gap-14">
							<div class="grid gap-6">
								<div class="text-xl font-medium uppercase" split-text>Recognized Achievements</div>
								<div class="grid gap-3">
									<div class="text-xl font-light" split-text>
										Earned 2x Honorable Mentions on Awwwards
									</div>
									<div class="text-xl font-light" split-text>Earned SOTD on CSS Design Awards</div>
								</div>
							</div>
							<div class="grid gap-6">
								<div class="text-xl font-medium uppercase" split-text>Pushing Boundaries</div>
								<div class="grid gap-3">
									<div class="text-xl font-light" split-text>
										Kickstarted MM Car Hub, blending learning and innovation.
									</div>
									<div class="text-xl font-light" split-text>
										Experimented with Three.js to explore 3D web experiences.
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<!-- ################ Slide 2 End ################ -->

			<!-- ################ Slide 3 Start ################ -->
			<div class="swiper-slide">
				<div
					class="flex h-full flex-col justify-between p-10 text-white"
					data-swiper-parallax-x={DATA_SWIPER_PARALLA_X}
					data-swiper-parallax-y={DATA_SWIPER_PARALLA_Y}
				>
					<div class="grid gap-2">
						<div class="text-[3.16rem] font-black uppercase leading-none" split-text>
							duo design Lab
						</div>
						<a
							href="https://www.duodesignlab.com"
							target="_blank"
							class="text-xl font-light lowercase"
							split-text
						>
							www.duodesignlab.com
						</a>
					</div>

					<div class="grid grid-cols-2 items-start gap-16">
						<div class="grid items-start gap-14">
							<div class="grid gap-6">
								<div class="text-xl font-medium uppercase" split-text>The Beginning</div>
								<div class="grid gap-3">
									<div class="text-xl font-light" split-text>
										Founded with a friend who shares my passion for creativity and meaningful work.
									</div>
								</div>
							</div>
							<div class="grid gap-6">
								<div class="text-xl font-medium uppercase" split-text>Our Mission</div>
								<div class="grid gap-3">
									<div class="text-xl font-light" split-text>
										Crafting digital experiences that are innovative, user-friendly, and aligned
										with business goals.
									</div>
								</div>
							</div>
						</div>

						<div class="grid gap-14">
							<div class="grid gap-6">
								<div class="text-xl font-medium uppercase" split-text>What We Do</div>
								<div class="grid gap-3">
									<div class="text-xl font-light" split-text>
										We don’t just design websites; we craft digital experiences
									</div>
									<div class="text-xl font-light" split-text>
										We also share design and development insights on Facebook, building a community
										of over 5,000 organic followers and likes.
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<!-- ################ Slide 3 End ################ -->

			<!-- ################ Slide 4 Start ################ -->
			<div class="swiper-slide">
				<div
					class="flex h-full flex-col justify-between p-10 text-white"
					data-swiper-parallax-x={DATA_SWIPER_PARALLA_X}
					data-swiper-parallax-y={DATA_SWIPER_PARALLA_Y}
				>
					<div class="grid gap-2">
						<div class="text-[3.16rem] font-black uppercase leading-none" split-text>APPAthon</div>
						<div class="text-[3.16rem] font-black uppercase leading-none" split-text>
							By ooredoo
						</div>
						<div class="text-xl font-light" split-text>UI UX Design Innovation Challenge</div>
					</div>

					<div class="grid grid-cols-2 items-start gap-16">
						<div class="grid items-start gap-14">
							<div class="grid gap-6">
								<div class="text-xl font-medium uppercase" split-text>Result</div>
								<div class="grid gap-3">
									<div class="text-xl font-light" split-text>
										Among 150 participants, our design won <a
											href="https://www.facebook.com/photo?fbid=3268976253225592"
											target="_blank"
											class="font-bold">2nd Runner-Up</a
										>, earning recognition for creating a modern, seamless experience that empowers
										users to manage their telecom services effortlessly.
									</div>
								</div>
							</div>
						</div>
						<!-- <div class="grid gap-14">
						</div> -->
					</div>
				</div>
			</div>
			<!-- ################ Slide 4 End ################ -->

			<!-- ################ Slide 5 Start ################ -->
			<div class="swiper-slide">
				<div
					class="flex h-full flex-col justify-between p-10 text-white"
					data-swiper-parallax-x={DATA_SWIPER_PARALLA_X}
					data-swiper-parallax-y={DATA_SWIPER_PARALLA_Y}
				>
					<div class="grid gap-2">
						<div class="text-[3.16rem] font-black uppercase leading-none" split-text>APM HELP</div>
						<a
							href="https://www.apmhelp.com"
							target="_blank"
							class="text-xl font-light lowercase"
							split-text
						>
							www.apmhelp.com
						</a>
					</div>

					<div class="grid grid-cols-2 items-start gap-16">
						<div class="grid items-start gap-14">
							<div class="grid gap-6">
								<div class="text-xl font-medium uppercase" split-text>About APM Help</div>
								<div class="grid gap-3">
									<div class="text-xl font-light" split-text>
										A company delivering property management accounting solutions that drive
										efficiency.
									</div>
								</div>
							</div>
							<div class="grid gap-6">
								<div class="text-xl font-medium uppercase" split-text>Key Impact</div>
								<div class="grid gap-3">
									<div class="text-xl font-light" split-text>
										Built internal tools and dashboards to support over 200 service-side teammates,
										solving real problems, and simplifing complex tasks.
									</div>
								</div>
							</div>
						</div>

						<div class="grid gap-14">
							<div class="grid gap-6">
								<div class="text-xl font-medium uppercase" split-text>My Journey</div>
								<div class="grid gap-3">
									<div class="text-xl font-light" split-text>
										Began as a freelancer developing company websites using Webflow.
									</div>
									<div class="text-xl font-light" split-text>
										Hired as a Junior Frontend Developer specializing in Webflow and React.
									</div>
									<div class="text-xl font-light" split-text>
										Promoted to Fullstack Developer, where I expanded my skillset to include Svelte,
										Deno, Electron, Supabase, and EdgeDB—learning and growing with my team.
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<!-- ################ Slide 5 End ################ -->

			<!-- ################ Slide 6 Start ################ -->
			<div class="swiper-slide">
				<div
					class="flex h-full flex-col justify-between p-10 text-white"
					data-swiper-parallax-x={DATA_SWIPER_PARALLA_X}
					data-swiper-parallax-y={DATA_SWIPER_PARALLA_Y}
				>
					<div class="grid gap-2">
						<div class="text-[3.16rem] font-black uppercase leading-none" split-text>
							Hillspeed Group
						</div>
						<a
							href="https://www.hillspeed.com"
							target="_blank"
							class="text-xl font-light lowercase"
							split-text
						>
							www.hillspeed.com
						</a>
					</div>

					<div class="grid grid-cols-2 items-start gap-16">
						<div class="grid items-start gap-14">
							<div class="grid gap-6">
								<div class="text-xl font-medium uppercase" split-text>About Hillspeed Group</div>
								<div class="grid gap-3">
									<div class="text-xl font-light" split-text>
										Founded by Coach Leighroy, offering mentoring services to train startups like
										professional athletes.
									</div>
								</div>
							</div>
							<div class="grid gap-6">
								<div class="text-xl font-medium uppercase" split-text>My Role</div>
								<div class="grid gap-3">
									<div class="text-xl font-light" split-text>
										Partnered with Otterdev, a design and development house from Singapore.
									</div>
									<div class="text-xl font-light" split-text>
										Built a stunning website in Webflow with a custom CMS and engaging animations,
										designed to inspire and captivate visitors.
									</div>
								</div>
							</div>
						</div>

						<div class="grid gap-14">
							<div class="grid gap-6">
								<div class="text-xl font-medium uppercase" split-text>Achievements</div>
								<div class="grid gap-3">
									<div class="text-xl font-light" split-text>
										<a
											class="font-bold"
											href="https://www.awwwards.com/sites/hillspeed-group"
											target="_blank">Honorable Mention</a
										> on Awwwards.
									</div>
									<div class="text-xl font-light" split-text>
										<a
											href="https://www.cssdesignawards.com/sites/hillspeed-group/44173/"
											target="_blank"
											class="font-bold">Site of the Day (SOTD)</a
										> on CSS Design Awards
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<!-- ################ Slide 6 End ################ -->

			<!-- ################ Slide 7 Start ################ -->
			<div class="swiper-slide">
				<div
					class="flex h-full flex-col justify-between p-10 text-white"
					data-swiper-parallax-x={DATA_SWIPER_PARALLA_X}
					data-swiper-parallax-y={DATA_SWIPER_PARALLA_Y}
				>
					<div class="grid gap-2">
						<div class="text-[3.16rem] font-black uppercase leading-none" split-text>
							THE sand studio
						</div>
						<a
							href="https://www.thesandstudio.com"
							target="_blank"
							class="text-xl font-light lowercase"
							split-text
						>
							www.thesandstudio.com
						</a>
					</div>

					<div class="grid grid-cols-2 items-start gap-16">
						<div class="grid items-start gap-14">
							<div class="grid gap-6">
								<div class="text-xl font-medium uppercase" split-text>My ROLE</div>
								<div class="grid gap-3">
									<div class="text-xl font-light" split-text>
										Began working on The Sand Studio’s website as web developer alongside two
										talented designers: Ako Min Htet Dipar, the studio’s owner, and a friend who
										handled the 3D Spline scene.
									</div>
								</div>
							</div>
						</div>

						<div class="grid gap-14">
							<div class="grid gap-6">
								<div class="text-xl font-medium uppercase" split-text>Achievements</div>
								<div class="grid gap-3">
									<div class="text-xl font-light" split-text>
										Earned an <a
											href="https://www.awwwards.com/sites/the-sand-studio"
											class="font-bold"
											target="_blank">Honorable Mention</a
										> on Awwwards – a milestone that celebrates the team’s hard work and creativity.
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<!-- ################ Slide 7 End ################ -->

			<!-- ################ Slide 8 Start ################ -->
			<div class="swiper-slide">
				<div
					class="flex h-full flex-col justify-between p-10 text-[#11111]"
					data-swiper-parallax-x={DATA_SWIPER_PARALLA_X}
					data-swiper-parallax-y={DATA_SWIPER_PARALLA_Y}
				>
					<div class="grid gap-2">
						<div class="text-[3.16rem] font-black uppercase leading-none" split-text>
							Highlights
						</div>
						<div class="text-[3.16rem] font-black uppercase leading-none" split-text>
							From the Hustle
						</div>
					</div>

					<div class="grid grid-cols-1 items-start gap-16">
						<div class="grid items-start gap-14">
							<div class="grid gap-6">
								<div class="grid gap-3">
									<div class="max-w-[29rem] text-xl" split-text>
										I’ve had the privilege of working on numerous projects across a wide range of
										industries, including digital marketing studios, design studios, NGOs,
										universities, social influencers, architecture firms, and more. Each project was
										a unique opportunity to learn, create, and even had fun along the way.
									</div>
								</div>
							</div>
						</div>
						<!-- <div class="grid gap-14">
						</div> -->
					</div>
				</div>
			</div>
			<!-- ################ Slide 8 End ################ -->

			<!-- ################ Slide 9 Start ################ -->
			<div class="swiper-slide">
				<div
					class="flex h-full flex-col justify-between p-10 text-white"
					data-swiper-parallax-x={DATA_SWIPER_PARALLA_X}
					data-swiper-parallax-y={DATA_SWIPER_PARALLA_Y}
				>
					<div class="grid gap-2">
						<div class="text-[3.16rem] font-black uppercase leading-none" split-text>
							Why computer science
						</div>
						<div class="text-[3.16rem] font-black uppercase leading-none" split-text>
							at harbour.space
						</div>
					</div>

					<div class="grid grid-cols-2 items-start gap-16">
						<div class="grid items-start gap-14">
							<div class="grid gap-6">
								<!-- <div class="text-xl font-medium uppercase" split-text>My ROLE</div> -->
								<div class="grid gap-3">
									<div class="text-xl font-light" split-text>
										As a self-taught developer, I’ve built a career without a CS degree, and
										excelling in frontend development. But I know that to achieve my dream of a
										versatile professional who can confidently contribute to every stage of digital
										product development handling everything from backend to ML/AI—I need a strong
										foundation in computer science.
									</div>
								</div>
							</div>
						</div>

						<div class="grid gap-14">
							<div class="grid gap-6">
								<!-- <div class="text-xl font-medium uppercase" split-text>Achievements</div> -->
								<div class="grid gap-3">
									<div class="text-xl font-light" split-text>
										Harbour.Space offers not just that but so much more. I can pursue a double
										degree, diving into exciting fields like 3D, AR/VR, and frontend innovation.
									</div>
									<div class="text-xl font-light" split-text>
										Beyond academics, it’s an opportunity to connect with leaders, mentors, and
										peers from around the world—people tackling real-world challenges at the highest
										level. Harbour.Space isn’t just a university; it’s the platform I need to reach
										my full potential.
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<!-- ################ Slide 9 End ################ -->

			<!-- ################ Slide 10 Start ################ -->
			<div class="swiper-slide">
				<div
					class="flex h-full flex-col justify-between p-10 text-[#111111]"
					data-swiper-parallax-x={DATA_SWIPER_PARALLA_X}
					data-swiper-parallax-y={DATA_SWIPER_PARALLA_Y}
				>
					<div class="grid gap-2">
						<div class="text-[3.16rem] font-black uppercase leading-none" split-text>
							Modules That Excite Me
						</div>
						<div class="text-[3.16rem] font-black uppercase leading-none" split-text>
							and Elevate My Vision 🚀
						</div>
					</div>

					<div class="grid grid-cols-2 items-start gap-16">
						<div class="grid items-start gap-14">
							<div class="grid gap-6">
								<div class="text-xl font-medium uppercase" split-text>Future Technologies</div>
								<div class="grid gap-3">
									<div class="text-xl font-light" split-text>3D</div>
									<div class="text-xl font-light" split-text>WebXR</div>
								</div>
							</div>
							<div class="grid gap-6">
								<div class="text-xl font-medium uppercase" split-text>Advanced Intelligence</div>
								<div class="grid gap-3">
									<div class="text-xl font-light" split-text>Machine Learning</div>
									<div class="text-xl font-light" split-text>Computer Vision</div>
								</div>
							</div>
						</div>

						<div class="grid gap-14">
							<div class="grid gap-6">
								<div class="text-xl font-medium uppercase" split-text>System Architecture</div>
								<div class="grid gap-3">
									<div class="text-xl font-light" split-text>
										Parallel and Distributed Computing
									</div>
									<div class="text-xl font-light" split-text>DevOps</div>
									<div class="text-xl font-light" split-text>Database Systems Principles</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<!-- ################ Slide 10 End ################ -->

			<!-- ################ Slide 11 Start ################ -->
			<div class="swiper-slide">
				<div
					class="flex h-full flex-col justify-between p-10 text-[#111111]"
					data-swiper-parallax-x={DATA_SWIPER_PARALLA_X}
					data-swiper-parallax-y={DATA_SWIPER_PARALLA_Y}
				>
					<div class="grid gap-2">
						<div class="text-[3.16rem] font-black uppercase leading-none" split-text>my vision</div>
						<div class="text-[3.16rem] font-black uppercase leading-none" split-text>
							fot the future
						</div>
					</div>

					<div class="grid grid-cols-2 items-start gap-16">
						<div class="grid items-start gap-14">
							<div class="grid gap-6">
								<div class="text-xl font-medium uppercase" split-text>Master of Many Skills</div>
								<div class="grid gap-3">
									<div class="text-xl font-light" split-text>
										I see myself evolving into a versatile professional—mastering frontend, backend,
										DevOps, mobile, ML/AI, 3D, and AR/VR.
									</div>
								</div>
							</div>
							<div class="grid gap-6">
								<div class="text-xl font-medium uppercase" split-text>Aspirations</div>
								<div class="grid gap-3">
									<div class="text-xl font-light" split-text>
										Own a successful digital product that solves real-world problems.
									</div>
									<div class="text-xl font-light" split-text>
										Establish a world-class web design studio known for creating impactful and
										cutting-edge digital experiences.
									</div>
								</div>
							</div>
						</div>

						<div class="grid gap-14">
							<div class="grid gap-6">
								<!-- <div class="text-xl font-medium uppercase" split-text>System Architecture</div> -->
								<div class="grid gap-3">
									<div class="text-xl font-light" split-text>
										With Harbour.Space, this vision becomes tangible. With the skills, network, and
										global experience I’ll gain, I’ll be equipped to bring these ideas to life and
										make a meaningful impact.
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<!-- ################ Slide 11 End ################ -->

			<!-- ################ Slide 12 Start ################ -->
			<div class="swiper-slide">
				<div
					class="flex h-full flex-col justify-between p-10 text-[#111111]"
					data-swiper-parallax-x={DATA_SWIPER_PARALLA_X}
					data-swiper-parallax-y={DATA_SWIPER_PARALLA_Y}
				>
					<div class="grid gap-2">
						<div class="text-[3.16rem] font-black uppercase leading-none" split-text>
							That’s a Wrap
						</div>
						<div class="text-[3.16rem] font-black uppercase leading-none" split-text>
							But the Journey Is
						</div>
						<div class="text-[3.16rem] font-black uppercase leading-none" split-text>
							Just Beginning!
						</div>
						<div class="mt-4 max-w-[24.5rem] text-xl leading-relaxed" split-text>
							I hope this presentation gave you a glimpse of what drives me and why Harbour.Space is
							where I see my future.
						</div>
					</div>

					<div class="flex items-center gap-16">
						<a
							data-swiper-parallax-opacity="0"
							aria-label="LinkedIn"
							href="https://www.linkedin.com/in/yanaunghein/"
							target="_blank"
							class="flex size-12"
						>
							<svg
								width="100%"
								height="100%"
								viewBox="0 0 50 50"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M14.3333 22.333V35.6663"
									stroke="#111111"
									stroke-width="2"
									stroke-linecap="round"
									stroke-linejoin="round"
								/>
								<path
									d="M14.3333 14.333V14.3597"
									stroke="#111111"
									stroke-width="2"
									stroke-linecap="round"
									stroke-linejoin="round"
								/>
								<path
									d="M25 35.6663V22.333"
									stroke="#111111"
									stroke-width="2"
									stroke-linecap="round"
									stroke-linejoin="round"
								/>
								<path
									d="M35.6667 35.6663V27.6663C35.6667 26.2519 35.1048 24.8953 34.1046 23.8951C33.1044 22.8949 31.7478 22.333 30.3333 22.333C28.9188 22.333 27.5623 22.8949 26.5621 23.8951C25.5619 24.8953 25 26.2519 25 27.6663"
									stroke="#111111"
									stroke-width="2"
									stroke-linecap="round"
									stroke-linejoin="round"
								/>
								<path
									d="M1 11.6667C1 8.83769 2.12381 6.12458 4.12419 4.12419C6.12458 2.12381 8.83769 1 11.6667 1H38.3333C41.1623 1 43.8754 2.12381 45.8758 4.12419C47.8762 6.12458 49 8.83769 49 11.6667V38.3333C49 41.1623 47.8762 43.8754 45.8758 45.8758C43.8754 47.8762 41.1623 49 38.3333 49H11.6667C8.83769 49 6.12458 47.8762 4.12419 45.8758C2.12381 43.8754 1 41.1623 1 38.3333V11.6667Z"
									stroke="#111111"
									stroke-width="2"
									stroke-linecap="round"
									stroke-linejoin="round"
								/>
							</svg>
						</a>
						<a
							data-swiper-parallax-opacity="0"
							aria-label="Github"
							href="https://github.com/yaunghein"
							target="_blank"
							class="flex size-12"
						>
							<svg
								width="100%"
								height="100%"
								viewBox="0 0 48 50"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M17 43.4595C5.53333 47.1928 5.53333 36.7928 1 35.4595M33 48.7928V39.4595C33 36.7928 33.2667 35.7262 31.6667 34.1262C39.1333 33.3262 46.3333 30.3928 46.3333 18.1262C46.3301 14.9394 45.0868 11.879 42.8667 9.59284C43.9079 6.82475 43.812 3.75718 42.6 1.0595C42.6 1.0595 39.6667 0.259505 33.2667 4.52617C27.846 3.11441 22.154 3.11441 16.7333 4.52617C10.3333 0.259505 7.4 1.0595 7.4 1.0595C6.18795 3.75718 6.09209 6.82475 7.13333 9.59284C4.91321 11.879 3.66991 14.9394 3.66667 18.1262C3.66667 30.3928 10.8667 33.3262 18.3333 34.1262C16.7333 35.7262 16.7333 37.3262 17 39.4595V48.7928"
									stroke="black"
									stroke-width="2"
									stroke-linecap="round"
									stroke-linejoin="round"
								/>
							</svg>
						</a>
					</div>
				</div>
			</div>
			<!-- ################ Slide 12 End ################ -->
		</div>
	</div>

	<div class="image-swiper relative h-1/2 w-full overflow-hidden sm:h-full sm:w-1/2">
		<div class="swiper-wrapper">
			{#each IMAGES as image}
				<div class="swiper-slide overflow-hidden">
					<img
						src={image}
						alt=""
						class="slide-img absolute inset-0 h-full w-full object-cover"
						data-swiper-parallax="450"
					/>
				</div>
			{/each}
		</div>
	</div>

	<!-- <div class="fixed bottom-10 right-10 z-10 flex items-center gap-8 opacity-50 sm:hidden">
		<button aria-label="Previous Slide" class="swiper-button-next size-16 rotate-180">
			<svg
				width="100%"
				height="100%"
				viewBox="0 0 48 48"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<g clip-path="url(#clip0_129_7123)">
					<path
						d="M32 10C32 11.484 33.466 13.7 34.95 15.56C36.858 17.96 39.138 20.054 41.752 21.652C43.712 22.85 46.088 24 48 24M48 24C46.088 24 43.71 25.15 41.752 26.348C39.138 27.948 36.858 30.042 34.95 32.438C33.466 34.3 32 36.52 32 38M48 24H0"
						stroke="currentColor"
						stroke-width="2.25"
					/>
				</g>
				<defs>
					<clipPath id="clip0_129_7123">
						<rect
							width="100%"
							height="100%"
							fill="currentColor"
							transform="matrix(0 1 -1 0 48 0)"
						/>
					</clipPath>
				</defs>
			</svg>
		</button>
		<button aria-label="Next Slide" class="swiper-button-next size-16">
			<svg
				width="100%"
				height="100%"
				viewBox="0 0 48 48"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<g clip-path="url(#clip0_129_7123)">
					<path
						d="M32 10C32 11.484 33.466 13.7 34.95 15.56C36.858 17.96 39.138 20.054 41.752 21.652C43.712 22.85 46.088 24 48 24M48 24C46.088 24 43.71 25.15 41.752 26.348C39.138 27.948 36.858 30.042 34.95 32.438C33.466 34.3 32 36.52 32 38M48 24H0"
						stroke="currentColor"
						stroke-width="2.25"
					/>
				</g>
				<defs>
					<clipPath id="clip0_129_7123">
						<rect
							width="100%"
							height="100%"
							fill="currentColor"
							transform="matrix(0 1 -1 0 48 0)"
						/>
					</clipPath>
				</defs>
			</svg>
		</button>
	</div> -->
</div>
