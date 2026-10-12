"use client";

import type { CSSProperties, ReactNode } from "react";

export type RetroStickerKind = "jaguar" | "tiger" | "car" | "radio" | "guitar" | "cherries" | "flower" | "bottle" | "revolver" | "butterfly" | "bow" | "vinyl" | "cassette" | "star";

const boxes: Record<RetroStickerKind, string> = {
  jaguar: "0 0 200 180", tiger: "0 0 200 180", car: "0 0 240 130", radio: "0 0 230 160",
  guitar: "0 0 100 230", cherries: "0 0 160 150", flower: "0 0 160 180", bottle: "0 0 100 200",
  revolver: "0 0 240 120", butterfly: "0 0 180 150", bow: "0 0 180 120", vinyl: "0 0 160 160",
  cassette: "0 0 200 130", star: "0 0 120 120",
};

const art: Record<RetroStickerKind, ReactNode> = {
  jaguar: <g stroke="#2A1719" strokeWidth="4" strokeLinejoin="round" strokeLinecap="round">
    <path d="M47 41L29 12Q53 1 73 29Q100 17 128 31L154 10Q180 19 159 52Q183 81 164 124Q147 164 101 170Q55 166 35 128Q16 84 47 41Z" fill="#D5B785"/>
    <path d="M43 43L61 63L42 79M155 43L137 64L157 80M67 28L80 49M132 30L120 49" fill="none" stroke="#71313A" strokeWidth="8"/>
    <path d="M49 86Q69 68 86 85L81 101Q65 112 51 100ZM152 86Q133 68 116 85L121 101Q138 112 150 100Z" fill="#F2E6D1"/>
    <ellipse cx="68" cy="91" rx="4.5" ry="7" fill="#291719" stroke="none"/><ellipse cx="133" cy="91" rx="4.5" ry="7" fill="#291719" stroke="none"/>
    <path d="M83 112Q100 102 117 112L111 125Q100 133 89 125Z" fill="#722631"/><path d="M89 125Q101 136 111 125M100 133V142M100 142L85 147M100 142L115 147" fill="none" strokeWidth="2.4"/>
    <g fill="#6B3037" stroke="none"><circle cx="52" cy="70" r="4"/><circle cx="64" cy="53" r="3.5"/><circle cx="78" cy="65" r="3.5"/><circle cx="143" cy="70" r="4"/><circle cx="132" cy="53" r="3.5"/><circle cx="120" cy="65" r="3.5"/><circle cx="43" cy="112" r="3.5"/><circle cx="158" cy="112" r="3.5"/><circle cx="62" cy="133" r="4"/><circle cx="140" cy="133" r="4"/></g>
    <path d="M73 115L27 111M76 123L33 135M127 115L173 111M124 123L167 135" fill="none" stroke="#F2E6D1" strokeWidth="2"/>
  </g>,
  tiger: <g stroke="#2A1719" strokeWidth="4" strokeLinejoin="round">
    <path d="M45 44L30 14L69 28Q99 16 128 29L166 12L154 49Q178 83 161 126Q145 164 101 169Q57 166 38 128Q20 84 45 44Z" fill="#B9663D"/>
    <path d="M46 42L66 60L52 78M154 42L136 61L151 80M70 29L82 48M130 29L119 49M34 77L57 87M166 77L145 87M37 107L63 107M163 107L138 107M62 138L82 125M139 138L119 125" fill="none" stroke="#F1DFBE" strokeWidth="7"/>
    <path d="M50 87Q69 69 87 86L82 102Q66 113 52 101ZM151 87Q132 69 114 86L119 102Q136 113 149 101Z" fill="#F1DFBE"/>
    <ellipse cx="68" cy="92" rx="4" ry="7" fill="#211518" stroke="none"/><ellipse cx="133" cy="92" rx="4" ry="7" fill="#211518" stroke="none"/>
    <path d="M83 113Q100 102 117 113L111 126Q100 132 89 126Z" fill="#281619"/><path d="M90 128Q100 137 111 128L108 141Q100 151 92 141Z" fill="#F1DFBE"/>
  </g>,
  car: <g stroke="#281719" strokeWidth="4" strokeLinejoin="round">
    <path d="M18 84L30 60Q35 52 58 49L88 21Q96 15 111 15H151Q163 16 176 31L197 54L220 63Q232 68 233 84L226 101L202 104H38L18 99Z" fill="#8C2E3A"/>
    <path d="M66 47L95 23Q100 21 111 21H123V49Z" fill="#D9C39E"/><path d="M132 21H151Q160 22 169 34L182 49H132Z" fill="#D9C39E"/>
    <path d="M126 21V49M32 60L196 55" fill="none" stroke="#E7CDA1" strokeWidth="2.5"/><path d="M15 84H42M211 83H231" fill="none" stroke="#F4E3BD" strokeWidth="6"/>
    <circle cx="66" cy="101" r="19" fill="#241619"/><circle cx="66" cy="101" r="10" fill="#D2B785" strokeWidth="3"/><circle cx="184" cy="101" r="19" fill="#241619"/><circle cx="184" cy="101" r="10" fill="#D2B785" strokeWidth="3"/>
  </g>,
  radio: <g stroke="#29181A" strokeWidth="4" strokeLinejoin="round">
    <path d="M44 41L55 13H180L193 42" fill="none" stroke="#D6B785" strokeWidth="5"/><rect x="14" y="39" width="202" height="107" rx="10" fill="#B99160"/>
    <rect x="27" y="52" width="108" height="21" fill="#32191C" stroke="#E1CBA3" strokeWidth="2"/><text x="81" y="66" textAnchor="middle" fontSize="10" fontFamily="monospace" fill="#F1E4CE" stroke="none">WF / FM 07</text>
    <circle cx="68" cy="106" r="29" fill="#35191D"/><circle cx="68" cy="106" r="22" fill="none" stroke="#C9A977" strokeWidth="2"/><circle cx="68" cy="106" r="15" fill="none" stroke="#89664F" strokeWidth="2"/><circle cx="68" cy="106" r="7" fill="#9B3842"/>
    <circle cx="159" cy="106" r="29" fill="#35191D"/><circle cx="159" cy="106" r="22" fill="none" stroke="#C9A977" strokeWidth="2"/><circle cx="159" cy="106" r="15" fill="none" stroke="#89664F" strokeWidth="2"/><circle cx="159" cy="106" r="7" fill="#9B3842"/>
  </g>,
  guitar: <g stroke="#28171A" strokeWidth="3.5" strokeLinejoin="round">
    <path d="M43 8H59L60 93L70 106Q90 123 76 146Q81 168 61 185Q54 191 54 207L57 220H37L39 206Q37 192 25 183Q5 168 13 146Q2 123 21 106L40 93Z" fill="#8C2A36"/>
    <path d="M44 9H58V106H44Z" fill="#C9A875"/><path d="M43 25H60M43 40H60M43 55H60M43 70H60M43 85H60" stroke="#58302A" strokeWidth="2"/>
    <path d="M24 126Q44 110 64 126L69 145Q45 157 19 145Z" fill="#E7D6B6"/><circle cx="44" cy="135" r="9" fill="#28171A"/><circle cx="44" cy="135" r="4" fill="#C7A36D"/>
    <rect x="23" y="153" width="13" height="25" rx="2" fill="#241719" stroke="#D2B17B" strokeWidth="2"/><rect x="51" y="153" width="13" height="25" rx="2" fill="#241719" stroke="#D2B17B" strokeWidth="2"/><path d="M46 10V198M49 10V198M52 10V198" stroke="#F0DFC0" strokeWidth="1"/>
  </g>,
  cherries: <g stroke="#2B181B" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M79 96Q77 43 45 20M79 96Q89 38 132 17" fill="none" stroke="#566344" strokeWidth="6"/><path d="M88 38Q113 2 148 16Q131 49 88 38Z" fill="#63764D"/><path d="M65 55Q30 28 10 48Q34 77 65 55Z" fill="#879066"/>
    <path d="M79 88Q41 72 20 101Q2 130 31 150Q56 168 79 146Q99 123 79 88Z" fill="#9B2637"/><path d="M84 86Q117 67 142 95Q163 121 144 145Q122 165 99 146Q78 125 84 86Z" fill="#B12F40"/>
    <ellipse cx="35" cy="111" rx="10" ry="5" transform="rotate(-35 35 111)" fill="#E6B4A0" stroke="none"/><ellipse cx="113" cy="107" rx="10" ry="5" transform="rotate(-35 113 107)" fill="#E6B4A0" stroke="none"/>
  </g>,
  flower: <g stroke="#4A282A" strokeWidth="2.7" strokeLinejoin="round">
    <path d="M77 92Q82 134 89 176" fill="none" stroke="#5C6A47" strokeWidth="6"/><path d="M83 141Q119 118 148 132Q127 161 83 141M82 157Q41 132 15 153Q46 177 82 157" fill="#68774C"/>
    <g fill="#D2A09C"><ellipse cx="80" cy="49" rx="19" ry="36"/><ellipse cx="80" cy="49" rx="19" ry="36" transform="rotate(60 80 88)"/><ellipse cx="80" cy="49" rx="19" ry="36" transform="rotate(120 80 88)"/><ellipse cx="80" cy="49" rx="19" ry="36" transform="rotate(180 80 88)"/><ellipse cx="80" cy="49" rx="19" ry="36" transform="rotate(240 80 88)"/><ellipse cx="80" cy="49" rx="19" ry="36" transform="rotate(300 80 88)"/></g>
    <circle cx="80" cy="88" r="15" fill="#D2B27A"/><circle cx="80" cy="88" r="7" fill="#6F2A35"/><path d="M65 84Q50 72 47 58M96 85Q111 68 114 55M63 96Q42 96 31 106M96 98Q119 100 128 112" fill="none" stroke="#EED3B6" strokeWidth="2"/>
  </g>,
  bottle: <g stroke="#2C171A" strokeWidth="3.5" strokeLinejoin="round">
    <path d="M39 9H62V34L72 48Q80 60 81 79L87 174Q87 190 72 192H29Q14 190 14 174L20 79Q21 60 29 48L39 34Z" fill="#71313A"/>
    <path d="M34 10H67V31H34Z" fill="#D3B17E"/><path d="M39 11V31M47 11V31M55 11V31M63 11V31" stroke="#6A4034" strokeWidth="1.5"/>
    <path d="M23 83Q49 91 78 83L82 145Q50 153 20 145Z" fill="#E9D7B5"/><path d="M28 90Q50 95 74 90L76 137Q50 143 26 137Z" fill="none" stroke="#7B2935" strokeWidth="1.5"/>
    <circle cx="50" cy="106" r="10" fill="#742630"/><path d="M50 100V112M44 106H56" stroke="#E8D2AC" strokeWidth="1.5"/><text x="50" y="125" textAnchor="middle" fontSize="8" fill="#58252A" stroke="none" fontFamily="Georgia,serif">AFTER HOURS</text><path d="M28 63V170" stroke="#E9CB9C" strokeWidth="2" opacity=".7"/>
  </g>,
  revolver: <g stroke="#28171A" strokeWidth="4" strokeLinejoin="round">
    <path d="M10 44H132Q147 44 156 59L170 81L150 99H106L97 117L77 130Q65 138 55 124L41 95H12Z" fill="#7B3C43"/><path d="M133 44H198L215 57L198 79H170L155 66Z" fill="#B8A082"/><path d="M196 49H224L237 62L223 77H201" fill="#8E776D"/>
    <path d="M26 51H125L138 70L128 86H25Z" fill="#E0C9A4"/><path d="M32 57H118L126 70H32Z" fill="#302024"/><circle cx="111" cy="62" r="13" fill="#472027" stroke="#D7B887" strokeWidth="3"/><circle cx="111" cy="62" r="4" fill="#D7B887"/>
    <path d="M49 89L72 90L83 112L63 129L48 114Z" fill="#C3A078"/><path d="M142 49V79M155 50V80M168 51V80M181 51V79" stroke="#3B2326" strokeWidth="2"/>
  </g>,
  butterfly: <g stroke="#2B171A" strokeWidth="3" strokeLinejoin="round">
    <path d="M85 77Q28 2 8 34Q-4 67 77 86Q19 101 28 133Q39 157 85 99Z" fill="#C8A18D"/><path d="M95 77Q152 2 172 34Q184 67 103 86Q161 101 152 133Q141 157 95 99Z" fill="#8B3A43"/>
    <path d="M84 71Q59 36 28 45Q20 64 74 83M96 71Q121 36 152 45Q160 64 106 83Z" fill="#36191E" stroke="#D5B98D" strokeWidth="2"/><path d="M87 82V47M94 82V47" stroke="#D5B98D" strokeWidth="2"/><path d="M88 48Q70 17 52 21M94 48Q112 17 130 21" fill="none" stroke="#2B171A" strokeWidth="2.5"/><circle cx="48" cy="85" r="5" fill="#E5C18B" stroke="none"/><circle cx="132" cy="85" r="5" fill="#E5C18B" stroke="none"/>
  </g>,
  bow: <g stroke="#2A1719" strokeWidth="3.5" strokeLinejoin="round">
    <path d="M83 55Q38 5 10 29Q1 54 77 72Q18 87 28 112Q46 129 83 82Z" fill="#A64E58"/><path d="M97 55Q142 5 170 29Q179 54 103 72Q162 87 152 112Q134 129 97 82Z" fill="#80303A"/><path d="M83 74L54 119L83 109L94 80M97 74L126 119L97 109L86 80" fill="#C88E87"/><path d="M76 61Q89 49 103 61L102 82Q89 92 76 82Z" fill="#D8B487"/>
  </g>,
  vinyl: <g>
    <circle cx="80" cy="80" r="75" fill="#171214" stroke="#D0B287" strokeWidth="3"/><circle cx="80" cy="80" r="65" fill="none" stroke="#74585A" strokeWidth="1"/><circle cx="80" cy="80" r="54" fill="none" stroke="#74585A" strokeWidth="1"/><circle cx="80" cy="80" r="42" fill="none" stroke="#74585A" strokeWidth="1"/><circle cx="80" cy="80" r="31" fill="#8F303C" stroke="#D0B287" strokeWidth="2"/><circle cx="80" cy="80" r="20" fill="#D2B98C"/><circle cx="80" cy="80" r="4.5" fill="#291719"/><path d="M80 62V72M80 88V98M62 80H72M88 80H98M67 67L74 74M86 86L93 93M93 67L86 74M74 86L67 93" stroke="#762633" strokeWidth="2"/>
  </g>,
  cassette: <g stroke="#291719" strokeWidth="3.5" strokeLinejoin="round">
    <rect x="7" y="7" width="186" height="116" rx="9" fill="#D5BE99"/><rect x="17" y="17" width="166" height="56" rx="3" fill="#762A35"/><rect x="24" y="23" width="152" height="44" fill="#F0E1C8" strokeWidth="1.5"/>
    <text x="100" y="42" textAnchor="middle" fill="#762A35" stroke="none" fontSize="13" fontFamily="Georgia,serif" fontStyle="italic">SIDE A</text><text x="100" y="56" textAnchor="middle" fill="#762A35" stroke="none" fontSize="7" fontFamily="monospace">MIX FOR LATE NIGHTS</text>
    <circle cx="55" cy="93" r="20" fill="#28171A" stroke="#E4D0AD" strokeWidth="2"/><circle cx="55" cy="93" r="7" fill="#BCA078"/><circle cx="145" cy="93" r="20" fill="#28171A" stroke="#E4D0AD" strokeWidth="2"/><circle cx="145" cy="93" r="7" fill="#BCA078"/><path d="M75 88H125L132 97H68Z" fill="#8D6D50" strokeWidth="2"/>
  </g>,
  star: <g stroke="#291719" strokeWidth="3" strokeLinejoin="round"><path d="M60 4L74 43L116 25L89 60L116 94L74 80L60 116L45 80L4 94L31 60L4 25L45 43Z" fill="#D0AC77"/><path d="M60 22L69 50L97 39L79 61L97 82L69 72L60 98L50 72L22 82L41 61L22 39L50 50Z" fill="#9A3E49" stroke="#F0E0C4" strokeWidth="1.5"/></g>,
};

export function RetroSticker({kind,className="",style}:{kind:RetroStickerKind;className?:string;style?:CSSProperties}) {
  return <span className={`wf-sticker ${className}`} style={style} aria-hidden="true"><svg viewBox={boxes[kind]} width="100%" height="100%" focusable="false"><title>{kind + " retro sticker illustration"}</title>{art[kind]}</svg></span>;
}
