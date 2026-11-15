--
-- PostgreSQL database dump
--

\restrict wBYf3GOyEjtdx1OwoU9eVHSyIDPh85NzT9KIgdd5aFr3OqUaIDhHjNaz1lsJPLy

-- Dumped from database version 16.15
-- Dumped by pg_dump version 16.15

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Account; Type: TABLE; Schema: public; Owner: toppers_admin
--

CREATE TABLE public."Account" (
    id text NOT NULL,
    "userId" text NOT NULL,
    "accessToken" text,
    "accessTokenExpiresAt" timestamp(3) without time zone,
    "accountId" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "idToken" text,
    password text,
    "providerId" text NOT NULL,
    "refreshToken" text,
    "refreshTokenExpiresAt" timestamp(3) without time zone,
    scope text,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Account" OWNER TO toppers_admin;

--
-- Name: Course; Type: TABLE; Schema: public; Owner: toppers_admin
--

CREATE TABLE public."Course" (
    id text NOT NULL,
    title text NOT NULL,
    slug text NOT NULL,
    description text NOT NULL,
    "classLevel" text NOT NULL,
    subject text NOT NULL,
    "imageUrl" text,
    "purchaseUrl" text NOT NULL,
    "isFeatured" boolean DEFAULT false NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "webPurchaseUrl" text
);


ALTER TABLE public."Course" OWNER TO toppers_admin;

--
-- Name: Enquiry; Type: TABLE; Schema: public; Owner: toppers_admin
--

CREATE TABLE public."Enquiry" (
    id text NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    phone text NOT NULL,
    course text,
    message text NOT NULL,
    status text DEFAULT 'New'::text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."Enquiry" OWNER TO toppers_admin;

--
-- Name: PageView; Type: TABLE; Schema: public; Owner: toppers_admin
--

CREATE TABLE public."PageView" (
    id text NOT NULL,
    path text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."PageView" OWNER TO toppers_admin;

--
-- Name: Question; Type: TABLE; Schema: public; Owner: toppers_admin
--

CREATE TABLE public."Question" (
    id text NOT NULL,
    "testId" text NOT NULL,
    "questionText" text NOT NULL,
    "optionA" text NOT NULL,
    "optionB" text NOT NULL,
    "optionC" text NOT NULL,
    "optionD" text NOT NULL,
    "correctOption" text NOT NULL
);


ALTER TABLE public."Question" OWNER TO toppers_admin;

--
-- Name: Resource; Type: TABLE; Schema: public; Owner: toppers_admin
--

CREATE TABLE public."Resource" (
    id text NOT NULL,
    title text NOT NULL,
    description text NOT NULL,
    "classLevel" text NOT NULL,
    subject text NOT NULL,
    "fileUrl" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."Resource" OWNER TO toppers_admin;

--
-- Name: Session; Type: TABLE; Schema: public; Owner: toppers_admin
--

CREATE TABLE public."Session" (
    id text NOT NULL,
    "userId" text NOT NULL,
    "expiresAt" timestamp(3) without time zone NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "ipAddress" text,
    token text NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "userAgent" text
);


ALTER TABLE public."Session" OWNER TO toppers_admin;

--
-- Name: SiteSettings; Type: TABLE; Schema: public; Owner: toppers_admin
--

CREATE TABLE public."SiteSettings" (
    id text DEFAULT 'global'::text NOT NULL,
    "academyName" text DEFAULT 'Toppers Academy of Commerce'::text NOT NULL,
    "contactPhone" text DEFAULT '+91 98765 43210'::text NOT NULL,
    "contactEmail" text DEFAULT 'contact@toppersacademy.com'::text NOT NULL,
    address text DEFAULT '123 Commerce Street, New Delhi, India'::text NOT NULL,
    "whatsappNumber" text DEFAULT '919876543210'::text NOT NULL,
    "youtubeUrl" text DEFAULT 'https://www.youtube.com/@vikrant-ahuja'::text NOT NULL,
    "linkedinUrl" text DEFAULT ''::text NOT NULL,
    "announcementLink" text DEFAULT '/free-resources'::text NOT NULL,
    "announcementText" text DEFAULT 'Class 12 Accountancy Datesheet Released! Download the official PDF now.'::text NOT NULL
);


ALTER TABLE public."SiteSettings" OWNER TO toppers_admin;

--
-- Name: Test; Type: TABLE; Schema: public; Owner: toppers_admin
--

CREATE TABLE public."Test" (
    id text NOT NULL,
    title text NOT NULL,
    subject text NOT NULL,
    "classLevel" text NOT NULL,
    "timeLimit" integer NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."Test" OWNER TO toppers_admin;

--
-- Name: TestAttempt; Type: TABLE; Schema: public; Owner: toppers_admin
--

CREATE TABLE public."TestAttempt" (
    id text NOT NULL,
    "testId" text NOT NULL,
    "studentName" text NOT NULL,
    "studentPhone" text NOT NULL,
    score integer NOT NULL,
    "totalQuestions" integer NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."TestAttempt" OWNER TO toppers_admin;

--
-- Name: TestSeries; Type: TABLE; Schema: public; Owner: toppers_admin
--

CREATE TABLE public."TestSeries" (
    id text NOT NULL,
    title text NOT NULL,
    description text NOT NULL,
    "classLevel" text NOT NULL,
    subject text NOT NULL,
    "numTests" text NOT NULL,
    "purchaseUrl" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."TestSeries" OWNER TO toppers_admin;

--
-- Name: Testimonial; Type: TABLE; Schema: public; Owner: toppers_admin
--

CREATE TABLE public."Testimonial" (
    id text NOT NULL,
    name text NOT NULL,
    course text NOT NULL,
    review text NOT NULL,
    rating integer DEFAULT 5 NOT NULL,
    "isVerified" boolean DEFAULT false NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Testimonial" OWNER TO toppers_admin;

--
-- Name: TwoFactor; Type: TABLE; Schema: public; Owner: toppers_admin
--

CREATE TABLE public."TwoFactor" (
    id text NOT NULL,
    "userId" text NOT NULL,
    secret text NOT NULL,
    "backupCodes" text,
    "failedVerificationCount" integer DEFAULT 0 NOT NULL,
    "lockedUntil" timestamp(3) without time zone,
    verified boolean DEFAULT false NOT NULL
);


ALTER TABLE public."TwoFactor" OWNER TO toppers_admin;

--
-- Name: User; Type: TABLE; Schema: public; Owner: toppers_admin
--

CREATE TABLE public."User" (
    id text NOT NULL,
    name text,
    email text NOT NULL,
    "emailVerified" boolean DEFAULT false NOT NULL,
    image text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "twoFactorEnabled" boolean DEFAULT false NOT NULL,
    role text DEFAULT 'EDITOR'::text NOT NULL
);


ALTER TABLE public."User" OWNER TO toppers_admin;

--
-- Name: Verification; Type: TABLE; Schema: public; Owner: toppers_admin
--

CREATE TABLE public."Verification" (
    id text NOT NULL,
    identifier text NOT NULL,
    value text NOT NULL,
    "expiresAt" timestamp(3) without time zone NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Verification" OWNER TO toppers_admin;

--
-- Data for Name: Account; Type: TABLE DATA; Schema: public; Owner: toppers_admin
--

COPY public."Account" (id, "userId", "accessToken", "accessTokenExpiresAt", "accountId", "createdAt", "idToken", password, "providerId", "refreshToken", "refreshTokenExpiresAt", scope, "updatedAt") FROM stdin;
BaDmuUZlGAMI8u8QOudwYQRFLsgEUTaz	HkPhhx68a6mADVRYG5a0aQxGqmyVwaAG	\N	\N	HkPhhx68a6mADVRYG5a0aQxGqmyVwaAG	2026-11-12 16:23:10.945	\N	ab2d31ba5e610b49b216f439a69e43fa:3b27cb28a25813e4734d1df5bd2183880e3c2d7a4c9c2719fab087047df695961b088a00a5683dd0c29059a2645613cdaac95e0457079cc49321e75a3b5f3403	credential	\N	\N	\N	2026-11-12 16:23:10.945
6UaTkHq6lt8n1XLde3zfsIwl2xYwZbpD	JwQESDmVOP9aRZg81LpAIAc1lGMNaXzJ	\N	\N	JwQESDmVOP9aRZg81LpAIAc1lGMNaXzJ	2026-11-15 05:25:12.552	\N	214cd540bdde965b9dcd87455a1b61a6:dfcf82ff86c870dfdb97145a16874ae830898adb63d25fc00851fc01f76f4d3d35b1bd485a6ab47ab30018eec00b87f8ede14a281ffb921829c8453543e5a50f	credential	\N	\N	\N	2026-11-15 07:15:22.249
dJkftJm6qSmJ7lc2SnBsXuAGLqy8IEYl	Oqjx5A3BeDinJ2Wz13RvV4G560Tp4rt1	\N	\N	Oqjx5A3BeDinJ2Wz13RvV4G560Tp4rt1	2026-11-15 07:50:54.486	\N	cfdb4b975d05e34ce8f5a8e4da645cb7:5df45592e20c6b0b0d8983e36c5b41992157265af2eef0073e7a9d083ca5f3b46ec90a494856a09f08b64455e3a0086af0e1f39b8570f9a184149d3192747c33	credential	\N	\N	\N	2026-11-15 07:50:54.486
\.


--
-- Data for Name: Course; Type: TABLE DATA; Schema: public; Owner: toppers_admin
--

COPY public."Course" (id, title, slug, description, "classLevel", subject, "imageUrl", "purchaseUrl", "isFeatured", "createdAt", "updatedAt", "webPurchaseUrl") FROM stdin;
cmwduxc06000072xmna99m5i2	Accountancy	accountancy	Most important for the students to learn	12	Accountancy	/uploads/1794548116431-PremiumAccountsCourseBanner.png	https://classplusapp.com/w/toppers-academy-of-commerce-kwhrzf/courses/766014?utm_source%3Dother%26utm_medium%3Dtutor-course-referral%26utm_campaign%3Dcourse-overview-webapp	t	2026-11-12 18:04:08.838	2026-11-13 05:35:16.435	\N
cmweixp2l000041xm31l69zqr	Macroeconomics full course by Vikrant Ahuja	macroeconomics-full-course-by-vikrant-ahuja	\r\nThis course covers complete Macro Economics for Class XII with a clear focus on concept understanding and board exam application. Complex topics like National Income, Money & Banking, and Government Budget are explained in a simple and logical manner with examples and revision support. Learn to understand the economy, not just memorise it—guided by Vikrant Ahuja.\r\n	12	Macroeconomics	/uploads/1794548330582-MacroEconomicsAcademyCourseBanner.png	https://classplusapp.com/w/toppers-academy-of-commerce-kwhrzf/courses/766012?utm_source%3Dother%26utm_medium%3Dtutor-course-referral%26utm_campaign%3Dcourse-overview-webapp	t	2026-11-13 05:16:16.557	2026-11-13 05:38:50.596	\N
cmweizfko000141xmjvx67dhs	Microeconomics full course by Vikrant Ahuja	microeconomics-full-course-by-vikrant-ahuja	📊 Micro Economics – Concept to Clarity\r\n\r\nThis course covers complete Micro Economics fundamentals for Class XI with simple explanations and real-life examples. Each topic is taught in a concept-focused, exam-oriented manner to help students understand, apply, and score better. Recorded lectures, crisp notes, and revision support included.\r\nLearn Micro Economics with confidence – guided by Vikrant Ahuja.	11	Microeconomics	/uploads/1794548639551-MicroeconomicsFullCourseBanner.png	https://classplusapp.com/w/toppers-academy-of-commerce-kwhrzf/courses/766016?utm_source%3Dother%26utm_medium%3Dtutor-course-referral%26utm_campaign%3Dcourse-overview-webapp	t	2026-11-13 05:17:37.56	2026-11-13 05:43:59.555	\N
\.


--
-- Data for Name: Enquiry; Type: TABLE DATA; Schema: public; Owner: toppers_admin
--

COPY public."Enquiry" (id, name, email, phone, course, message, status, "createdAt") FROM stdin;
cmwhea3r60009tcxm7i2ieg76	sahil	efrwfrewgr@gmail.com	345678998765	\N	dcdewdfewfew	New	2026-11-15 05:29:15.906
\.


--
-- Data for Name: PageView; Type: TABLE DATA; Schema: public; Owner: toppers_admin
--

COPY public."PageView" (id, path, "createdAt") FROM stdin;
cmwf03csi0000vjxmdleky6eq	/	2026-11-13 13:16:34.05
cmwf03csi0001vjxmjq8ksr3t	/	2026-11-13 13:16:34.05
cmwf03e9v0002vjxmtxax2nql	/	2026-11-13 13:16:35.971
cmwf03e9z0003vjxmix3iy1ho	/	2026-11-13 13:16:35.975
cmwf05d990005vjxmfkeutd9n	/	2026-11-13 13:18:07.965
cmwf05d990004vjxmorm60jux	/	2026-11-13 13:18:07.965
cmwf07ky90006vjxmr0l1c2a8	/	2026-11-13 13:19:51.249
cmwf07ky90007vjxmq5ocsnj5	/	2026-11-13 13:19:51.249
cmwf092ql0009vjxmpxj41lq4	/free-resources	2026-11-13 13:21:00.957
cmwf09asa000avjxmayn1cqge	/free-resources	2026-11-13 13:21:11.386
cmwf09asa000bvjxmnmyxftyr	/free-resources	2026-11-13 13:21:11.386
cmwf09bpt000cvjxm04d08b9l	/contact	2026-11-13 13:21:12.593
cmwf09bq1000dvjxm30kou00x	/contact	2026-11-13 13:21:12.601
cmwf09no2000fvjxm9fv7ohq5	/	2026-11-13 13:21:28.082
cmwf0i4cv000gvjxmoe341kgc	/contact	2026-11-13 13:28:02.959
cmwf0irlx000hvjxmglim0no3	/	2026-11-13 13:28:33.093
cmwf0tyl80002noxmc31btrsj	/test-series	2026-11-13 13:37:15.356
cmwf0u01q0003noxmijthulbh	/test-series/cmwf0tngz0000noxm8u71mtl3	2026-11-13 13:37:17.246
cmwf1igdc0003ujxm2udfzrbx	/test-series/cmwf1i8x30001ujxmi1r860qy	2026-11-13 13:56:18.144
cmwf1rpz50006ujxmgjrrtrwt	/free-resources	2026-11-13 14:03:30.497
cmwf91dau00002oxmjl2j367l	/	2026-11-13 17:26:57.942
cmwf91hih00012oxmj74mr2g7	/courses	2026-11-13 17:27:03.401
cmwhb26vk00022oxmwyzrdcl3	/test-series	2026-11-15 03:59:07.856
cmwhba8x400032oxmamhlugmk	/	2026-11-15 04:05:23.752
cmwhbafku00042oxmq7jtv682	/about	2026-11-15 04:05:32.382
cmwhc531m00052oxmkpvchn7m	/courses	2026-11-15 04:29:22.475
cmwhc56us00062oxmfxc5uwp8	/courses/macroeconomics-full-course-by-vikrant-ahuja	2026-11-15 04:29:27.412
cmwhda3x500072oxm5ozlinxg	/test-series/cmwf1i8x30001ujxmi1r860qy	2026-11-15 05:01:16.506
cmwhdpjlv0000g1xm7q7b1rzk	/ops-master-2026	2026-11-15 05:13:16.675
cmwhdtjo90001g1xmj48gpucb	/master-ops-2026	2026-11-15 05:16:23.385
cmwhduk7n0002g1xmuceme22o	/ops-master-2026/login	2026-11-15 05:17:10.739
cmwhdx5xo0000tcxmg9ix76wj	/ops-master-2026/courses	2026-11-15 05:19:12.205
cmwhdx81m0001tcxmubmg0u49	/ops-master-2026/tests	2026-11-15 05:19:14.938
cmwhdxaz50002tcxm7b0z8kit	/ops-master-2026/results	2026-11-15 05:19:18.737
cmwhdxdr40003tcxmk7sqxc89	/ops-master-2026/testimonials	2026-11-15 05:19:22.336
cmwhdxged0004tcxm71nely5m	/ops-master-2026/resources	2026-11-15 05:19:25.765
cmwhdxlbm0005tcxms39zjjg7	/ops-master-2026/enquiries	2026-11-15 05:19:32.146
cmwhdxpiy0006tcxmo2esw40h	/ops-master-2026/settings	2026-11-15 05:19:37.594
cmwhe0x0b0007tcxmhp65xv4a	/ops-master-2026/users	2026-11-15 05:22:07.26
cmwhe9vc50008tcxm6gsh20yv	/contact	2026-11-15 05:29:04.997
cmwhhv4kw000atcxmvau84srx	/	2026-11-15 07:09:35.6
cmwhjollz0000uuxm6lgxv86v	/	2026-11-15 08:00:30.311
cmwhjox2h0001uuxmwgiejwz1	/about	2026-11-15 08:00:45.161
cmwhjp0hx0002uuxmu7vmziuz	/courses	2026-11-15 08:00:49.605
cmwhjp3by0003uuxmeimv3wqh	/test-series	2026-11-15 08:00:53.278
cmwhjp5e50004uuxm60sif5u7	/free-resources	2026-11-15 08:00:55.95
cmwhjp8680005uuxmcv4kp5du	/youtube	2026-11-15 08:00:59.552
cmwhjpbyz0006uuxmcpl4t14m	/testimonials	2026-11-15 08:01:04.475
cmwhjpegn0007uuxmsxltxrrw	/achievements	2026-11-15 08:01:07.703
cmwhjporw0008uuxmh5ngr8lm	/faq	2026-11-15 08:01:21.068
cmwhjpv9w0009uuxmnqzb4lod	/contact	2026-11-15 08:01:29.492
cmwhjzmzd000auuxmgogzpwfr	/ops-master-2026/testimonials/edit/cmwdrp4bq0000ifxmlmmy68pb	2026-11-15 08:09:05.305
\.


--
-- Data for Name: Question; Type: TABLE DATA; Schema: public; Owner: toppers_admin
--

COPY public."Question" (id, "testId", "questionText", "optionA", "optionB", "optionC", "optionD", "correctOption") FROM stdin;
cmwf1i8xc0002ujxmzlu8mlmc	cmwf1i8x30001ujxmi1r860qy	1wdd	wdwd	dw	dw	dw	B
\.


--
-- Data for Name: Resource; Type: TABLE DATA; Schema: public; Owner: toppers_admin
--

COPY public."Resource" (id, title, description, "classLevel", subject, "fileUrl", "createdAt") FROM stdin;
cmwhjbnzc0000xxxm33aae6jm	fxfhchgcgh	fvfvf	12	vfdvfv	/uploads/1794729026846-Wear.pdf	2026-11-15 07:50:26.857
\.


--
-- Data for Name: Session; Type: TABLE DATA; Schema: public; Owner: toppers_admin
--

COPY public."Session" (id, "userId", "expiresAt", "createdAt", "ipAddress", token, "updatedAt", "userAgent") FROM stdin;
20qGB7qY0XI7S1UonTTGNnyDswEnJe47	HkPhhx68a6mADVRYG5a0aQxGqmyVwaAG	2026-11-19 16:23:10.952	2026-11-12 16:23:10.952	0000:0000:0000:0000:0000:0000:0000:0000	vnYqzemKNZq3FFMecXKO6LzijiyUFlv7	2026-11-12 16:23:10.952	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/156.0.0.0 Safari/537.36
uUY7t4FHI0gxYPkfG8gEGduZOxu0wfir	HkPhhx68a6mADVRYG5a0aQxGqmyVwaAG	2026-11-19 17:07:12.239	2026-11-12 17:07:12.239	0000:0000:0000:0000:0000:0000:0000:0000	xxgswQwcOTSy7MBCgR6YJr4FmbSnJTAS	2026-11-12 17:07:12.239	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/156.0.0.0 Safari/537.36
rcnFOJSCfNN67VJXfZE2CS3a0V2GfvSW	HkPhhx68a6mADVRYG5a0aQxGqmyVwaAG	2026-11-19 17:07:14.302	2026-11-12 17:07:14.302	0000:0000:0000:0000:0000:0000:0000:0000	JiXjZjb0XW4sfLZaI4q85hEa71fIQTW7	2026-11-12 17:07:14.302	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/156.0.0.0 Safari/537.36
zsDKxd0ScIDSsmK0c6N17t4zC5BPqyp8	HkPhhx68a6mADVRYG5a0aQxGqmyVwaAG	2026-11-19 17:18:18.337	2026-11-12 17:18:18.338	0000:0000:0000:0000:0000:0000:0000:0000	QLUqklRP6su4o79iUH3GvjCFT1GCGqgT	2026-11-12 17:18:18.338	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/156.0.0.0 Safari/537.36
HzlMX6aH54IxsfjRq6UHhmTQ0rVJvBPv	HkPhhx68a6mADVRYG5a0aQxGqmyVwaAG	2026-11-19 17:18:30.473	2026-11-12 17:18:30.473	0000:0000:0000:0000:0000:0000:0000:0000	SZ885s9QxPqoLlqtzx5JLIjfDaV7T0LZ	2026-11-12 17:18:30.473	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/156.0.0.0 Safari/537.36
V9M1Un8WRi9j3clyhOYNi8UbQPastbnv	HkPhhx68a6mADVRYG5a0aQxGqmyVwaAG	2026-11-19 17:19:19.877	2026-11-12 17:19:19.877	0000:0000:0000:0000:0000:0000:0000:0000	8nb5zHPNnirkqPp1n74vCJpC6E9sL3Gg	2026-11-12 17:19:19.877	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/156.0.0.0 Safari/537.36
QJdaghRdHYGdTOzYdVta1DmIyt8IoF7W	HkPhhx68a6mADVRYG5a0aQxGqmyVwaAG	2026-11-19 17:20:59.449	2026-11-12 17:20:59.45	0000:0000:0000:0000:0000:0000:0000:0000	UlcgEbbzgxb1Vs3U9Xua4RFfUF6nwgAC	2026-11-12 17:20:59.45	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/156.0.0.0 Safari/537.36
bsWtaCLMe41btMGZTdscRRV6a1rMldOM	HkPhhx68a6mADVRYG5a0aQxGqmyVwaAG	2026-11-19 17:21:22.395	2026-11-12 17:21:22.396	0000:0000:0000:0000:0000:0000:0000:0000	hGpGDTks9czaicMsqII8VA0JdFS2p5bN	2026-11-12 17:21:22.396	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/156.0.0.0 Safari/537.36
E0QUzrwDG1nbuY87SWw2c2OMxyA5sRCL	HkPhhx68a6mADVRYG5a0aQxGqmyVwaAG	2026-11-19 17:27:48.498	2026-11-12 17:27:48.499	0000:0000:0000:0000:0000:0000:0000:0000	1gOjKcRwYpzPGxga2h2yXdiT17Cgihbt	2026-11-12 17:27:48.499	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/156.0.0.0 Safari/537.36
wE3Ux1LxOpiD0dZAOFbMxH7Cc3sgZ2pY	HkPhhx68a6mADVRYG5a0aQxGqmyVwaAG	2026-11-19 17:33:43.612	2026-11-12 17:33:43.612	0000:0000:0000:0000:0000:0000:0000:0000	2FvGterxLuZuryzgsrJJSUpoUJx6vrlq	2026-11-12 17:33:43.612	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/156.0.0.0 Safari/537.36
J4JGi0zklgISjHIEIxS97g6JrV3Potzp	HkPhhx68a6mADVRYG5a0aQxGqmyVwaAG	2026-11-19 17:35:11.205	2026-11-12 17:35:11.205	0000:0000:0000:0000:0000:0000:0000:0000	p9lP3dycFSRXsExJdjbLlet9yoGP9dR5	2026-11-12 17:35:11.205	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/156.0.0.0 Safari/537.36
EnXRHmPEL9yASp8S4nfwRmimkpCEfnMf	HkPhhx68a6mADVRYG5a0aQxGqmyVwaAG	2026-11-19 17:40:54.469	2026-11-12 17:40:54.47	0000:0000:0000:0000:0000:0000:0000:0000	87O8a0FirZIhimUIyubj34CB7JNIT6bR	2026-11-12 17:40:54.47	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/156.0.0.0 Safari/537.36
c75ZxgZ5JgsfWrSSbp3Fy0CLh4ShGRSZ	HkPhhx68a6mADVRYG5a0aQxGqmyVwaAG	2026-11-19 18:09:56.62	2026-11-12 18:09:56.621	0000:0000:0000:0000:0000:0000:0000:0000	UarRDqP5d2onB71jQpfcVP0CvsVsyHJY	2026-11-12 18:09:56.621	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/156.0.0.0 Safari/537.36
SUHdFtzD7uhknRvtd0950zj1CzDDi1Fj	HkPhhx68a6mADVRYG5a0aQxGqmyVwaAG	2026-11-19 18:10:25.314	2026-11-12 18:10:25.314	0000:0000:0000:0000:0000:0000:0000:0000	F4LhYVaLdLSV0PS4WewDiYNQFm8bbeBL	2026-11-12 18:10:25.314	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/156.0.0.0 Safari/537.36
yGjz9gkT1jvM9uKkfpObZOr8ZD6GR9JA	HkPhhx68a6mADVRYG5a0aQxGqmyVwaAG	2026-11-19 18:11:47.472	2026-11-12 18:11:47.472	0000:0000:0000:0000:0000:0000:0000:0000	y9UiTfGK7RdtH75pcJ83OO3RFiSUHHzv	2026-11-12 18:11:47.472	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/156.0.0.0 Safari/537.36
qd1EvvVIangkDiP93SVCsrlLWv6zMNsU	HkPhhx68a6mADVRYG5a0aQxGqmyVwaAG	2026-11-19 18:11:59.7	2026-11-12 18:11:59.7	0000:0000:0000:0000:0000:0000:0000:0000	WdjuRUBNPIpsx0Uuv27C9LDnksXQYlS5	2026-11-12 18:11:59.7	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/156.0.0.0 Safari/537.36
3ttGjCpemgclxIwcOOIbCvEIz0n60xXt	HkPhhx68a6mADVRYG5a0aQxGqmyVwaAG	2026-11-20 05:10:07.059	2026-11-13 05:10:07.059	0000:0000:0000:0000:0000:0000:0000:0000	EgKyhSj1LchOqbGc0iXjERiwh5PbAsZr	2026-11-13 05:10:07.059	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/156.0.0.0 Safari/537.36
qmUvGfxUkYMM0PvCfeNEXtpXQlOYPvP6	HkPhhx68a6mADVRYG5a0aQxGqmyVwaAG	2026-11-20 06:24:52.332	2026-11-13 06:24:52.333	0000:0000:0000:0000:0000:0000:0000:0000	A0aHi8sgBPxiGw5TrDl8RDR65cvx2ecC	2026-11-13 06:24:52.333	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/156.0.0.0 Safari/537.36
ZlRbt8xEkrsjI5jZ4bkluUham1YHiBXa	JwQESDmVOP9aRZg81LpAIAc1lGMNaXzJ	2026-11-22 05:25:12.557	2026-11-15 05:25:12.557		36aFFtOZwFg3xq5DH8gpRSfPKuwUxb4K	2026-11-15 05:25:12.557	
8WkSMIXUdtOxtSfKjJVxSMiXJC6Z3g5O	Oqjx5A3BeDinJ2Wz13RvV4G560Tp4rt1	2026-11-22 07:50:54.49	2026-11-15 07:50:54.49		DGUVlxlpJ6jWW0Hat3fSO1LFa8mabaie	2026-11-15 07:50:54.49	
owVUs0xa06uKWT3Ixzg6lhRJ8858cmlZ	HkPhhx68a6mADVRYG5a0aQxGqmyVwaAG	2026-11-22 08:11:12.545	2026-11-15 08:11:12.545	0000:0000:0000:0000:0000:0000:0000:0000	0vyivwIRCLXa8H2FhsbwIcy82i46eSoW	2026-11-15 08:11:12.545	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/156.0.0.0 Safari/537.36
\.


--
-- Data for Name: SiteSettings; Type: TABLE DATA; Schema: public; Owner: toppers_admin
--

COPY public."SiteSettings" (id, "academyName", "contactPhone", "contactEmail", address, "whatsappNumber", "youtubeUrl", "linkedinUrl", "announcementLink", "announcementText") FROM stdin;
global	Commerce	+91 9285019461	vikrantahuja46@gmail.com	Dehradun, Uttarakhand, India	+91 9285019461	https://www.youtube.com/@vikrant-ahuja		https://www.cbse.gov.in/cbsenew/documents/Datesheet_ClassX%20_XII_2027_Main_06112026.pdf	Class 10th and 12th Datesheet released
\.


--
-- Data for Name: Test; Type: TABLE DATA; Schema: public; Owner: toppers_admin
--

COPY public."Test" (id, title, subject, "classLevel", "timeLimit", "createdAt") FROM stdin;
cmwf1i8x30001ujxmi1r860qy	dhweuodhw	Accountancy	12	1	2026-11-13 13:56:08.488
\.


--
-- Data for Name: TestAttempt; Type: TABLE DATA; Schema: public; Owner: toppers_admin
--

COPY public."TestAttempt" (id, "testId", "studentName", "studentPhone", score, "totalQuestions", "createdAt") FROM stdin;
cmwf1irrs0004ujxmdf9tn7km	cmwf1i8x30001ujxmi1r860qy	sarthak	5678923223	1	1	2026-11-13 13:56:32.92
cmwf1omft0005ujxmcs0sebed	cmwf1i8x30001ujxmi1r860qy	bkbkjb	8889899898	0	1	2026-11-13 14:01:05.945
cmwhdcemg00082oxmuow7pyd8	cmwf1i8x30001ujxmi1r860qy	sarthak	9473483478	1	1	2026-11-15 05:03:03.688
\.


--
-- Data for Name: TestSeries; Type: TABLE DATA; Schema: public; Owner: toppers_admin
--

COPY public."TestSeries" (id, title, description, "classLevel", subject, "numTests", "purchaseUrl", "createdAt") FROM stdin;
\.


--
-- Data for Name: Testimonial; Type: TABLE DATA; Schema: public; Owner: toppers_admin
--

COPY public."Testimonial" (id, name, course, review, rating, "isVerified", "createdAt", "updatedAt") FROM stdin;
cmwdrp4bq0000ifxmlmmy68pb	Sarthak Jha	12	Best teacher I have ever studied from in Dehradun	5	t	2026-11-12 16:33:46.79	2026-11-15 08:09:18.241
\.


--
-- Data for Name: TwoFactor; Type: TABLE DATA; Schema: public; Owner: toppers_admin
--

COPY public."TwoFactor" (id, "userId", secret, "backupCodes", "failedVerificationCount", "lockedUntil", verified) FROM stdin;
\.


--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: toppers_admin
--

COPY public."User" (id, name, email, "emailVerified", image, "createdAt", "updatedAt", "twoFactorEnabled", role) FROM stdin;
JwQESDmVOP9aRZg81LpAIAc1lGMNaXzJ	Vikrant Ahuja	vikrantahuja46@gmail.com	f	\N	2026-11-15 05:25:12.535	2026-11-15 05:25:12.535	f	EDITOR
HkPhhx68a6mADVRYG5a0aQxGqmyVwaAG	Sarthak Jha	sarthakjha461@gmail.com	f	\N	2026-11-12 16:23:10.93	2026-11-12 16:23:10.93	f	OWNER
Oqjx5A3BeDinJ2Wz13RvV4G560Tp4rt1	Sahil Gupta	jzsahil.gupta04@gmail.com	f	\N	2026-11-15 07:50:54.478	2026-11-15 07:50:54.478	f	EDITOR
\.


--
-- Data for Name: Verification; Type: TABLE DATA; Schema: public; Owner: toppers_admin
--

COPY public."Verification" (id, identifier, value, "expiresAt", "createdAt", "updatedAt") FROM stdin;
\.


--
-- Name: Account Account_pkey; Type: CONSTRAINT; Schema: public; Owner: toppers_admin
--

ALTER TABLE ONLY public."Account"
    ADD CONSTRAINT "Account_pkey" PRIMARY KEY (id);


--
-- Name: Course Course_pkey; Type: CONSTRAINT; Schema: public; Owner: toppers_admin
--

ALTER TABLE ONLY public."Course"
    ADD CONSTRAINT "Course_pkey" PRIMARY KEY (id);


--
-- Name: Enquiry Enquiry_pkey; Type: CONSTRAINT; Schema: public; Owner: toppers_admin
--

ALTER TABLE ONLY public."Enquiry"
    ADD CONSTRAINT "Enquiry_pkey" PRIMARY KEY (id);


--
-- Name: PageView PageView_pkey; Type: CONSTRAINT; Schema: public; Owner: toppers_admin
--

ALTER TABLE ONLY public."PageView"
    ADD CONSTRAINT "PageView_pkey" PRIMARY KEY (id);


--
-- Name: Question Question_pkey; Type: CONSTRAINT; Schema: public; Owner: toppers_admin
--

ALTER TABLE ONLY public."Question"
    ADD CONSTRAINT "Question_pkey" PRIMARY KEY (id);


--
-- Name: Resource Resource_pkey; Type: CONSTRAINT; Schema: public; Owner: toppers_admin
--

ALTER TABLE ONLY public."Resource"
    ADD CONSTRAINT "Resource_pkey" PRIMARY KEY (id);


--
-- Name: Session Session_pkey; Type: CONSTRAINT; Schema: public; Owner: toppers_admin
--

ALTER TABLE ONLY public."Session"
    ADD CONSTRAINT "Session_pkey" PRIMARY KEY (id);


--
-- Name: SiteSettings SiteSettings_pkey; Type: CONSTRAINT; Schema: public; Owner: toppers_admin
--

ALTER TABLE ONLY public."SiteSettings"
    ADD CONSTRAINT "SiteSettings_pkey" PRIMARY KEY (id);


--
-- Name: TestAttempt TestAttempt_pkey; Type: CONSTRAINT; Schema: public; Owner: toppers_admin
--

ALTER TABLE ONLY public."TestAttempt"
    ADD CONSTRAINT "TestAttempt_pkey" PRIMARY KEY (id);


--
-- Name: TestSeries TestSeries_pkey; Type: CONSTRAINT; Schema: public; Owner: toppers_admin
--

ALTER TABLE ONLY public."TestSeries"
    ADD CONSTRAINT "TestSeries_pkey" PRIMARY KEY (id);


--
-- Name: Test Test_pkey; Type: CONSTRAINT; Schema: public; Owner: toppers_admin
--

ALTER TABLE ONLY public."Test"
    ADD CONSTRAINT "Test_pkey" PRIMARY KEY (id);


--
-- Name: Testimonial Testimonial_pkey; Type: CONSTRAINT; Schema: public; Owner: toppers_admin
--

ALTER TABLE ONLY public."Testimonial"
    ADD CONSTRAINT "Testimonial_pkey" PRIMARY KEY (id);


--
-- Name: TwoFactor TwoFactor_pkey; Type: CONSTRAINT; Schema: public; Owner: toppers_admin
--

ALTER TABLE ONLY public."TwoFactor"
    ADD CONSTRAINT "TwoFactor_pkey" PRIMARY KEY (id);


--
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: toppers_admin
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- Name: Verification Verification_pkey; Type: CONSTRAINT; Schema: public; Owner: toppers_admin
--

ALTER TABLE ONLY public."Verification"
    ADD CONSTRAINT "Verification_pkey" PRIMARY KEY (id);


--
-- Name: Course_slug_key; Type: INDEX; Schema: public; Owner: toppers_admin
--

CREATE UNIQUE INDEX "Course_slug_key" ON public."Course" USING btree (slug);


--
-- Name: Session_token_key; Type: INDEX; Schema: public; Owner: toppers_admin
--

CREATE UNIQUE INDEX "Session_token_key" ON public."Session" USING btree (token);


--
-- Name: User_email_key; Type: INDEX; Schema: public; Owner: toppers_admin
--

CREATE UNIQUE INDEX "User_email_key" ON public."User" USING btree (email);


--
-- Name: Account Account_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: toppers_admin
--

ALTER TABLE ONLY public."Account"
    ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Question Question_testId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: toppers_admin
--

ALTER TABLE ONLY public."Question"
    ADD CONSTRAINT "Question_testId_fkey" FOREIGN KEY ("testId") REFERENCES public."Test"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Session Session_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: toppers_admin
--

ALTER TABLE ONLY public."Session"
    ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: TestAttempt TestAttempt_testId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: toppers_admin
--

ALTER TABLE ONLY public."TestAttempt"
    ADD CONSTRAINT "TestAttempt_testId_fkey" FOREIGN KEY ("testId") REFERENCES public."Test"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: TwoFactor TwoFactor_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: toppers_admin
--

ALTER TABLE ONLY public."TwoFactor"
    ADD CONSTRAINT "TwoFactor_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

\unrestrict wBYf3GOyEjtdx1OwoU9eVHSyIDPh85NzT9KIgdd5aFr3OqUaIDhHjNaz1lsJPLy

