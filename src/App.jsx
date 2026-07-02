import { useState, useEffect } from "react";
import { Button, Card, Tag, Icon, Divider, TextField, ImageSlot } from "./components/ui";

/* ------------------------------------------------------------------ */
/* Small primitives                                                   */
/* ------------------------------------------------------------------ */

function Container({ children, className = "" }) {
  return (
    <div className={"mx-auto w-full max-w-[1180px] px-6 md:px-10 " + className}>
      {children}
    </div>
  );
}

function Eyebrow({ children }) {
  return (
    <div
      className="wt-label2 inline-flex items-center gap-2 uppercase"
      style={{ color: "var(--wt-primary)", letterSpacing: "0.12em" }}
    >
      <span style={{ width: 18, height: 1, background: "var(--wt-primary)" }} />
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Header                                                             */
/* ------------------------------------------------------------------ */

function Wordmark({ height = 30 }) {
  return (
    <svg
      viewBox="90 35 490 125"
      height={height}
      style={{ width: "auto", display: "block" }}
      className="select-none"
      role="img"
      aria-label="FLOFIL"
    >
      <g fill="var(--wt-text)">
        {/* F */}
        <rect x="100" y="50" width="16" height="100" />
        <rect x="116" y="50" width="48" height="16" />
        <rect x="116" y="92" width="36" height="16" />
        {/* L */}
        <rect x="188" y="50" width="16" height="100" />
        <rect x="204" y="134" width="44" height="16" />
        {/* O */}
        <path d="M 315 50 A 50 50 0 0 1 315 150 A 50 50 0 0 1 315 50 Z M 315 66 A 34 34 0 0 0 315 134 A 34 34 0 0 0 315 66 Z" fillRule="evenodd" />
        {/* F */}
        <rect x="382" y="50" width="16" height="100" />
        <rect x="398" y="50" width="48" height="16" />
        <rect x="398" y="92" width="36" height="16" />
        {/* i stem */}
        <rect x="470" y="78" width="16" height="72" />
        {/* L */}
        <rect x="510" y="50" width="16" height="100" />
        <rect x="526" y="134" width="44" height="16" />
      </g>
      {/* i dot */}
      <circle cx="478" cy="59" r="9" fill="#00D2C4" />
    </svg>
  );
}

function Header({ onAuth }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    ["회사소개", "#about"],
    ["제품", "#products"],
    ["기술 스펙", "#specs"],
    ["자료실", "#resources"],
    ["문의", "#contact"],
  ];

  return (
    <header
      className="sticky top-0 z-40"
      style={{
        background: "rgba(255,255,255,0.82)",
        backdropFilter: "saturate(180%) blur(12px)",
        WebkitBackdropFilter: "saturate(180%) blur(12px)",
        borderBottom: scrolled ? "1px solid var(--wt-border)" : "1px solid transparent",
        transition: "border-color 120ms cubic-bezier(0.4,0,0.2,1)",
      }}
    >
      <Container className="flex h-[68px] items-center justify-between">
        <div className="flex items-center gap-10">
          <Wordmark />
          <nav className="hidden lg:flex items-center gap-7">
            {links.map(([label, href]) => (
              <a
                key={label}
                href={href}
                className="wt-body2"
                style={{ color: "var(--wt-text-alt)", textDecoration: "none" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--wt-text)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--wt-text-alt)")}
              >
                {label}
              </a>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="text" color="assistive" size="medium" onClick={() => onAuth("login")}>
            로그인
          </Button>
          <Button color="primary" size="medium" onClick={() => onAuth("signup")}>
            회원가입
          </Button>
        </div>
      </Container>
    </header>
  );
}

/* ------------------------------------------------------------------ */
/* Hero                                                               */
/* ------------------------------------------------------------------ */

function Hero({ onAuth }) {
  return (
    <section className="relative overflow-hidden">
      {/* faint grid backdrop */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(var(--wt-border) 1px, transparent 1px), linear-gradient(90deg, var(--wt-border) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(120% 90% at 80% 0%, #000 0%, transparent 70%)",
          WebkitMaskImage: "radial-gradient(120% 90% at 80% 0%, #000 0%, transparent 70%)",
          opacity: 0.5,
        }}
      />
      <Container className="relative grid grid-cols-1 items-center gap-14 pt-20 pb-24 lg:grid-cols-[1.05fr_0.95fr] lg:pt-28 lg:pb-32">
        <div>
          <Eyebrow>Biomedical Specialty Films</Eyebrow>
          <h1
            className="wt-display1 mt-6"
            style={{ fontSize: "clamp(40px, 5.4vw, 60px)", lineHeight: 1.12, textWrap: "balance" }}
          >
            진단의 정밀함을
            <br />
            <span style={{ color: "var(--wt-primary)" }}>필름</span>으로 완성합니다
          </h1>
          <p className="wt-body1-reading mt-6 max-w-[30rem]" style={{ color: "var(--wt-text-alt)" }}>
            체외진단 바이오센서부터 의료용 카테터·웨어러블 소재까지. FLOFIL은 고성능
            폴리머 기반 특수 필름을 설계·제조하여 헬스케어 산업의 신뢰성을 뒷받침합니다.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Button color="primary" size="large" iconRight="arrow-right" onClick={() => onAuth("signup")}>
              샘플 요청하기
            </Button>
            <Button variant="outlined" color="assistive" size="large" iconLeft="document-text">
              기술 문서 보기
            </Button>
          </div>
          <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3">
            {[
              ["28+", "년 폴리머 코팅 노하우"],
              ["±0.5㎛", "두께 정밀도"],
              ["ISO 13485", "품질 시스템"],
            ].map(([n, l]) => (
              <div key={l} className="flex items-baseline gap-2">
                <span className="wt-heading2" style={{ color: "var(--wt-text)" }}>{n}</span>
                <span className="wt-caption1" style={{ color: "var(--wt-text-assistive)" }}>{l}</span>
              </div>
            ))}
          </div>
        </div>

        {/* visual */}
        <div className="relative">
          <div
            className="relative w-full overflow-hidden aspect-[16/9]"
            style={{
              borderRadius: 20,
              border: "1px solid var(--wt-border)",
              boxShadow: "0 8px 28px rgba(23,23,25,0.08)",
            }}
          >
            <ImageSlot
              src="/hero-visual.webp"
              alt="바이오메디컬 특수 필름"
              placeholder="바이오메디컬 필름 이미지"
            />
          </div>
          <div
            className="absolute -bottom-5 -left-5 hidden sm:flex items-center gap-3 px-4 py-3"
            style={{
              background: "var(--wt-bg-elevated)",
              border: "1px solid var(--wt-border)",
              borderRadius: 14,
              boxShadow: "0 8px 24px rgba(23,23,25,0.10)",
            }}
          >
            <div
              className="flex items-center justify-center"
              style={{ width: 36, height: 36, borderRadius: 9, background: "var(--wt-primary-bg)" }}
            >
              <Icon name="circle-check" size={20} color="var(--wt-primary)" />
            </div>
            <div>
              <div className="wt-label1">생체 적합성 검증</div>
              <div className="wt-caption1" style={{ color: "var(--wt-text-assistive)" }}>
                USP Class VI · 세포독성 시험
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Trust strip                                                        */
/* ------------------------------------------------------------------ */

function TrustStrip() {
  const items = ["체외진단(IVD)", "바이오센서", "의료용 카테터", "연속혈당측정(CGM)", "웨어러블 패치"];
  return (
    <section style={{ borderTop: "1px solid var(--wt-border)", borderBottom: "1px solid var(--wt-border)" }}>
      <Container className="flex flex-col items-center gap-5 py-7 md:flex-row md:justify-between">
        <span className="wt-caption1 uppercase" style={{ color: "var(--wt-text-assistive)", letterSpacing: "0.14em" }}>
          국내 헬스케어 제조 파트너
        </span>
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          {items.map((t) => (
            <span key={t} className="wt-body2" style={{ color: "var(--wt-text-neutral)" }}>
              {t}
            </span>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Products                                                           */
/* ------------------------------------------------------------------ */

const PRODUCTS = [
  {
    id: "prod-1",
    tag: "Diagnostic",
    tagTone: "primary",
    title: "진단 센서용 필름",
    desc: "혈당·체외진단 스트립을 위한 친수성 코팅 PET 필름. 균일한 표면 에너지로 정밀한 검체 흐름을 보장합니다.",
    specs: ["친수성 / 소수성 코팅", "두께 50–250㎛", "낮은 자가형광"],
  },
  {
    id: "prod-2",
    tag: "Labelling",
    tagTone: "violet",
    tagTextColor: "rgb(255, 255, 255)",
    title: "라벨·태그용 인쇄 필름",
    desc: "특수 표면 코팅으로 레이저·열전사·잉크젯 인쇄에 대응하는 폴리에스터 필름. 의료기기 라벨과 검사 태그의 가독성을 장기간 유지합니다.",
    specs: ["레이저·열전사·잉크젯 인쇄", "내용제·내수·내마모", "고내열 · 고평탄도"],
  },
  {
    id: "prod-3",
    tag: "Wearable",
    tagTone: "cyan",
    tagTextColor: "rgb(246, 246, 246)",
    title: "웨어러블 기기용 소재",
    desc: "CGM·헬스 패치를 위한 피부 친화 점착 필름. 통기성과 장시간 부착 신뢰성을 동시에 구현합니다.",
    specs: ["피부 점착 (저자극)", "통기성 막", "방수 IPX7"],
  },
];

function ProductCard({ p }) {
  const [hover, setHover] = useState(false);
  return (
    <Card variant="outlined" interactive>
      <div
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className="flex h-full flex-col"
      >
        <div className="w-full overflow-hidden aspect-[16/9]" style={{ borderRadius: 12, border: "1px solid var(--wt-border)" }}>
          <ImageSlot
            src={`/${p.id}.webp`}
            alt={p.title}
            placeholder="제품 이미지"
            style={{
              transform: hover ? "scale(1.03)" : "scale(1)",
              transition: "transform 400ms cubic-bezier(0.4,0,0.2,1)",
            }}
          />
        </div>
        <div className="mt-5 flex items-center gap-2">
          <Tag tone={p.tagTone}>
            {p.tagTextColor ? <span style={{ color: p.tagTextColor }}>{p.tag}</span> : p.tag}
          </Tag>
        </div>
        <h3 className="wt-heading2 mt-3">{p.title}</h3>
        <p className="wt-body2 mt-2" style={{ color: "var(--wt-text-alt)" }}>
          {p.desc}
        </p>
        <ul className="mt-4 flex flex-col gap-2">
          {p.specs.map((s) => (
            <li key={s} className="wt-body2 flex items-center gap-2" style={{ color: "var(--wt-text-neutral)" }}>
              <Icon name="check" size={16} color="var(--wt-primary)" />
              {s}
            </li>
          ))}
        </ul>
        <div className="mt-5 flex-1" />
        <a
          href="#contact"
          className="wt-label1 inline-flex items-center gap-1"
          style={{ color: "var(--wt-primary)", textDecoration: "none" }}
        >
          자세히 보기
          <Icon name="arrow-right" size={16} />
        </a>
      </div>
    </Card>
  );
}

function Products() {
  return (
    <section id="products" className="py-24 lg:py-28">
      <Container>
        <div className="max-w-[40rem]">
          <Eyebrow>Products</Eyebrow>
          <h2 className="wt-title1 mt-5" style={{ textWrap: "balance" }}>
            애플리케이션에 맞춘 필름 솔루션
          </h2>
          <p className="wt-body1 mt-4" style={{ color: "var(--wt-text-alt)" }}>
            진단부터 웨어러블까지, 각 산업의 요구 스펙에 정확히 대응하는 세 가지 핵심 제품군.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {PRODUCTS.map((p) => (
            <ProductCard key={p.id} p={p} />
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Product demo video                                                 */
/* ------------------------------------------------------------------ */

function DemoVideo() {
  return (
    <section id="demo" className="py-24 lg:py-28">
      <Container>
        <div className="max-w-[40rem]">
          <Eyebrow>See it in action</Eyebrow>
          <h2 className="wt-title1 mt-5" style={{ textWrap: "balance", wordBreak: "keep-all" }}>
            공정과 성능을 영상으로 확인하세요
          </h2>
          <p className="wt-body1 mt-4" style={{ color: "var(--wt-text-alt)" }}>
            정밀 코팅부터 실제 적용까지 — FLOFIL 필름이 만들어지고 작동하는 과정을 담았습니다.
          </p>
        </div>
        <div
          className="relative mt-12 w-full overflow-hidden aspect-video"
          style={{
            borderRadius: 16,
            border: "1px solid var(--wt-border)",
            boxShadow: "0 8px 28px rgba(23,23,25,0.08)",
            background: "var(--wt-text)",
          }}
        >
          <video
            src="/product-demo.mp4"
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          ></video>
        </div>
      </Container>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Spec / data-centric section                                        */
/* ------------------------------------------------------------------ */

const SPEC_ROWS = [
  ["기재 (Base)", "PET"],
  ["두께 범위", "23 – 250 ㎛"],
  ["코팅 처리", "친수성 · 소수성 · 점착"],
  ["내화학성", "IPA, 혈액, 완충액 안정"],
  ["멸균 호환", "EO · 감마 · 오토클레이브"],
  ["광학 특성", "저헤이즈 · 저자가형광"],
];

function Specs() {
  return (
    <section id="specs" style={{ background: "var(--wt-bg-alt)", borderTop: "1px solid var(--wt-border)" }}>
      <Container className="grid grid-cols-1 items-center gap-14 py-24 lg:grid-cols-2 lg:py-28">
        <div>
          <Eyebrow>Technical Precision</Eyebrow>
          <h2 className="wt-title1 mt-5" style={{ textWrap: "balance" }}>
            스펙으로 증명하는 신뢰성
          </h2>
          <p className="wt-body1-reading mt-4" style={{ color: "var(--wt-text-alt)" }}>
            모든 필름은 표준 물성표(TDS)와 안전 데이터(MSDS)로 검증 가능합니다. 양산 전
            샘플 단계에서 귀사의 공정 조건에 맞춘 맞춤 코팅을 제안합니다.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button color="primary" iconLeft="download">물성표 다운로드</Button>
            <Button variant="outlined" color="assistive" iconLeft="mail">맞춤 견적 문의</Button>
          </div>
        </div>

        <Card variant="elevated">
          <div className="flex items-center justify-between">
            <div className="wt-headline1">표준 사양</div>
            <Tag tone="primary">FLOFIL-D250</Tag>
          </div>
          <div className="mt-4">
            {SPEC_ROWS.map(([k, v], i) => (
              <div key={k}>
                <div className="flex items-center justify-between py-[14px]">
                  <span className="wt-body2" style={{ color: "var(--wt-text-assistive)" }}>{k}</span>
                  <span className="wt-label1" style={{ color: "var(--wt-text)" }}>{v}</span>
                </div>
                {i < SPEC_ROWS.length - 1 && <Divider />}
              </div>
            ))}
          </div>
        </Card>
      </Container>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Resources (member-only)                                            */
/* ------------------------------------------------------------------ */

function Resources({ onAuth }) {
  const docs = [
    ["기술 데이터 시트 (TDS)", "제품별 물성·치수·성능 규격", "document-text"],
    ["물질안전보건자료 (MSDS)", "취급·보관·안전 정보", "document"],
    ["규제 인증 패키지", "ISO 13485 · USP Class VI", "lock"],
  ];
  return (
    <section id="resources" className="py-24 lg:py-28">
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-[40rem]">
            <Eyebrow>Resources</Eyebrow>
            <h2 className="wt-title1 mt-5">기술 자료실</h2>
            <p className="wt-body1 mt-4" style={{ color: "var(--wt-text-alt)" }}>
              상세 기술 문서와 샘플 요청은 인증된 기업 회원에게 제공됩니다.
            </p>
          </div>
          <Button color="primary" size="large" iconRight="arrow-right" onClick={() => onAuth("signup")}>
            기업 회원가입
          </Button>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {docs.map(([title, desc, icon]) => (
            <Card key={title} variant="outlined">
              <div className="flex items-start justify-between">
                <div
                  className="flex items-center justify-center"
                  style={{ width: 44, height: 44, borderRadius: 11, background: "var(--wt-primary-bg)" }}
                >
                  <Icon name={icon} size={22} color="var(--wt-primary)" />
                </div>
                <span
                  className="wt-caption1 inline-flex items-center gap-1 px-2 py-1"
                  style={{ background: "var(--wt-fill)", borderRadius: 999, color: "var(--wt-text-assistive)" }}
                >
                  <Icon name="lock" size={12} />
                  회원 전용
                </span>
              </div>
              <h3 className="wt-headline1 mt-5">{title}</h3>
              <p className="wt-body2 mt-2" style={{ color: "var(--wt-text-alt)" }}>{desc}</p>
              <button
                onClick={() => onAuth("login")}
                className="wt-label1 mt-5 inline-flex items-center gap-1"
                style={{ color: "var(--wt-text-assistive)", background: "none", border: "none", cursor: "pointer", padding: 0 }}
              >
                <Icon name="download" size={16} />
                다운로드 (로그인 필요)
              </button>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* CTA band                                                           */
/* ------------------------------------------------------------------ */

function CTA({ onAuth }) {
  return (
    <section id="contact" className="pb-24 lg:pb-28">
      <Container>
        <div
          className="relative overflow-hidden px-8 py-16 text-center md:px-16 md:py-20"
          style={{ background: "var(--wt-primary)", borderRadius: 24 }}
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.10) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.10) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
              maskImage: "radial-gradient(100% 100% at 50% 0%, #000, transparent 75%)",
              WebkitMaskImage: "radial-gradient(100% 100% at 50% 0%, #000, transparent 75%)",
            }}
          />
          <div className="relative">
            <h2 className="wt-title1" style={{ color: "#fff", textWrap: "balance", wordBreak: "keep-all" }}>
              프로젝트에 맞는 필름을 찾고 계신가요?
            </h2>
            <p className="wt-body1 mx-auto mt-4 max-w-[34rem]" style={{ color: "rgba(255,255,255,0.86)" }}>
              요구 스펙을 알려주시면 48시간 이내에 적합한 샘플과 기술 검토 결과를 회신드립니다.
            </p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <Button color="assistive" variant="solid" size="large" iconRight="send" onClick={() => onAuth("signup")}>
                샘플 요청하기
              </Button>
              <Button variant="text" size="large" style={{ color: "#fff" }} iconLeft="phone">
                010-3338-2976
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Footer                                                             */
/* ------------------------------------------------------------------ */

function Footer() {
  const cols = [
    ["제품", ["진단 센서용 필름", "라벨·태그용 필름", "웨어러블 소재"]],
    ["회사", ["회사소개", "품질·인증", "채용"]],
    ["지원", ["기술 자료실", "샘플 요청", "문의하기"]],
  ];
  return (
    <footer style={{ borderTop: "1px solid var(--wt-border)" }}>
      <Container className="grid grid-cols-2 gap-10 py-16 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div className="col-span-2 md:col-span-1">
          <Wordmark />
          <p className="wt-body2 mt-4 max-w-[16rem]" style={{ color: "var(--wt-text-assistive)" }}>
            바이오메디컬 특수 필름 제조 · 헬스케어 산업을 위한 정밀 폴리머 솔루션.
          </p>
          <a
            href="https://www.octud.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="wt-caption1 mt-5 inline-flex items-center gap-1.5"
            style={{ color: "var(--wt-text-assistive)", textDecoration: "none" }}
          >
            <span>An</span>
            <span style={{ fontWeight: 700, color: "var(--wt-text-alt)", letterSpacing: "0.02em" }}>OCTUD</span>
            <span>brand</span>
            <Icon name="arrow-up-right" size={13} />
          </a>
        </div>
        {cols.map(([h, items]) => (
          <div key={h}>
            <div className="wt-label1" style={{ color: "var(--wt-text)" }}>{h}</div>
            <ul className="mt-4 flex flex-col gap-3">
              {items.map((it) => (
                <li key={it}>
                  <a href="#" className="wt-body2" style={{ color: "var(--wt-text-assistive)", textDecoration: "none" }}>
                    {it}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </Container>
      <Divider />
      <Container className="py-8">
        <div className="flex items-center gap-5">
          <a href="#" className="wt-caption1" style={{ color: "var(--wt-text-alt)", textDecoration: "none", fontWeight: 600 }}>이용약관</a>
          <a href="#" className="wt-caption1" style={{ color: "var(--wt-text-alt)", textDecoration: "none", fontWeight: 600 }}>개인정보처리방침</a>
        </div>
        <dl
          className="mt-5 grid gap-x-6 gap-y-2 wt-caption1"
          style={{
            color: "var(--wt-text-assistive)",
            gridTemplateColumns: "auto 1fr",
            maxWidth: "44rem",
            lineHeight: 1.6,
          }}
        >
          <dt style={{ color: "var(--wt-text-alt)" }}>상호명</dt>
          <dd className="m-0">주식회사 옥튜드 (OCTUD)</dd>

          <dt style={{ color: "var(--wt-text-alt)" }}>대표자</dt>
          <dd className="m-0">정유천</dd>

          <dt style={{ color: "var(--wt-text-alt)" }}>사업장주소</dt>
          <dd className="m-0">(07997) 서울특별시 양천구 목동동로 293, 20층 2009호 (목동, 현대41타워)</dd>

          <dt style={{ color: "var(--wt-text-alt)" }}>사업자등록번호</dt>
          <dd className="m-0">880-81-01739</dd>

          <dt style={{ color: "var(--wt-text-alt)" }}>통신판매신고번호</dt>
          <dd className="m-0">2023-서울영등포-2160</dd>

          <dt style={{ color: "var(--wt-text-alt)" }}>연락처</dt>
          <dd className="m-0">010-3338-2976 · grit@octud.com</dd>

          <dt style={{ color: "var(--wt-text-alt)" }}>호스팅 제공자</dt>
          <dd className="m-0">Vercel Inc.</dd>
        </dl>
        <p className="wt-caption1 mt-6 m-0" style={{ color: "var(--wt-text-assistive)" }}>
          Copyright © 2026 옥튜드 주식회사 All rights reserved.
        </p>
      </Container>
    </footer>
  );
}

/* ------------------------------------------------------------------ */
/* Auth modal                                                         */
/* ------------------------------------------------------------------ */

function AuthModal({ mode, onClose, onSwitch }) {
  const isSignup = mode === "signup";
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(23,23,25,0.52)" }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-[420px]"
        style={{
          background: "var(--wt-bg-elevated)",
          borderRadius: 20,
          padding: 28,
          boxShadow: "0 24px 60px rgba(23,23,25,0.24)",
        }}
      >
        <div className="flex items-center justify-between">
          <Wordmark />
          <button
            onClick={onClose}
            aria-label="닫기"
            style={{ background: "none", border: "none", cursor: "pointer", padding: 4, color: "var(--wt-text-assistive)" }}
          >
            <Icon name="close" size={20} />
          </button>
        </div>

        <h2 className="wt-title3 mt-6">{isSignup ? "기업 회원가입" : "로그인"}</h2>
        <p className="wt-body2 mt-1" style={{ color: "var(--wt-text-alt)" }}>
          {isSignup ? "B2B 기술 문서·샘플 요청 권한을 받으세요." : "회원 전용 자료실에 접근하세요."}
        </p>

        <div className="mt-6 flex flex-col gap-4">
          {isSignup && (
            <TextField label="회사명" placeholder="(주)플로필" leadingIcon="company" value={company} onChange={(e) => setCompany(e.target.value)} />
          )}
          <TextField label="이메일" placeholder="name@company.co.kr" leadingIcon="mail" value={email} onChange={(e) => setEmail(e.target.value)} />
          <TextField label="비밀번호" type="password" placeholder="••••••••" leadingIcon="lock" value={pw} onChange={(e) => setPw(e.target.value)} />
        </div>

        <div className="mt-6">
          <Button color="primary" size="large" fullWidth onClick={onClose}>
            {isSignup ? "가입하기" : "로그인"}
          </Button>
        </div>

        <div className="my-5 flex items-center gap-3">
          <div style={{ flex: 1, height: 1, background: "var(--wt-border)" }} />
          <span className="wt-caption1" style={{ color: "var(--wt-text-assistive)" }}>또는</span>
          <div style={{ flex: 1, height: 1, background: "var(--wt-border)" }} />
        </div>

        <div className="flex flex-col gap-2">
          <Button variant="outlined" color="assistive" size="large" fullWidth iconLeft="logo-google">
            Google로 계속하기
          </Button>
          <Button variant="outlined" color="assistive" size="large" fullWidth iconLeft="logo-kakao">
            카카오로 계속하기
          </Button>
        </div>

        <div className="mt-6 text-center">
          <span className="wt-body2" style={{ color: "var(--wt-text-alt)" }}>
            {isSignup ? "이미 계정이 있으신가요? " : "아직 회원이 아니신가요? "}
          </span>
          <button
            onClick={() => onSwitch(isSignup ? "login" : "signup")}
            className="wt-label1"
            style={{ color: "var(--wt-primary)", background: "none", border: "none", cursor: "pointer", padding: 0 }}
          >
            {isSignup ? "로그인" : "회원가입"}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* App                                                                */
/* ------------------------------------------------------------------ */

export default function App() {
  const [auth, setAuth] = useState(null); // 'login' | 'signup' | null
  return (
    <div>
      <Header onAuth={setAuth} />
      <main>
        <Hero onAuth={setAuth} />
        <TrustStrip />
        <Products />
        <DemoVideo />
        <Specs />
        <Resources onAuth={setAuth} />
        <CTA onAuth={setAuth} />
      </main>
      <Footer />
      {auth && <AuthModal mode={auth} onClose={() => setAuth(null)} onSwitch={setAuth} />}
    </div>
  );
}
