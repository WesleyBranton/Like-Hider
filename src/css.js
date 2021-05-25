/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

// Cache all CSS code
const code = {
    hideNotification: '',
    hideLikeCounter: '',
    hideLikeButton: '',
    betterSponsor: ''
};

// Hide like notifications
code.hideNotification =
`._33c[data-gt*="feedback_reaction_generic"],
._50d1 li[data-gt*="notif_type"][data-gt*="feedback_reaction"],
.j34wkznp.qp9yad78.pmk7jnqg.kr520xx4 .l9j0dhe7 a[href*="feedback_reaction_generic"] {
    display: none !important;
}`;

// Hide post/comment like counter
code.hideLikeCounter = 
`._66lg *,
._6cuq,
.bp9cbjyn.m9osqain.j83agx80.jq4qci2q.bkfpd7mw.a3bd9o3v.kvgmc6g5.wkznzc2l.oygrvhab.dhix69tm.jktsbyx5.rz4wbd8a.osnr6wyh.a8nywdso.s1tcr66n > .bp9cbjyn.j83agx80.buofh1pr.ni8dbmo4.stjgntxs > * {
    display: none !important;
}`;

// Hide post/comment like button
code.hideLikeButton = 
`li._6coj:first-of-type,
li._6coj:nth-of-type(2) ._6cok,
._18vi:first-of-type,
.rq0escxv.l9j0dhe7.du4w35lb.j83agx80.pfnyh3mw.i1fnvgqd.gs1a9yip.owycx6da.btwxx1t3.ph5uu5jm.b3onmgus.e5nlhep0.ecm0bbzt.nkwizq5d.roh60bw9.mysgfdmx.hddg9phg > div:first-child {
    display: none !important;
}`;

// Improve "Sponsored" content label
code.betterSponsor =
`.oajrlxb2.g5ia77u1.qu0x051f.esr5mh6w.e9989ue4.r7d6kgcz.rq0escxv.nhd2j8a9.nc684nl6.p7hjln8o.kvgmc6g5.cxmmr5t8.oygrvhab.hcukyx3x.jb3vyjys.rz4wbd8a.qt6c0cv9.a8nywdso.i1ao9s8h.esuyzwwr.f1sip0of.lzcic4wl.gmql0nx0.gpro0wi8.b1v8xokw[href="#"]:not([aria-label*="0"]):not([aria-label*="1"]):not([aria-label*="2"]):not([aria-label*="3"]):not([aria-label*="4"]):not([aria-label*="5"]):not([aria-label*="6"]):not([aria-label*="7"]):not([aria-label*="8"]):not([aria-label*="9"]),
.oajrlxb2.g5ia77u1.qu0x051f.esr5mh6w.e9989ue4.r7d6kgcz.rq0escxv.nhd2j8a9.nc684nl6.p7hjln8o.kvgmc6g5.cxmmr5t8.oygrvhab.hcukyx3x.jb3vyjys.rz4wbd8a.qt6c0cv9.a8nywdso.i1ao9s8h.esuyzwwr.f1sip0of.lzcic4wl.gmql0nx0.gpro0wi8.b1v8xokw[href*="/ads/"] {
    color: white !important;
    font-weight: bold !important;
    border-radius: 100px !important;
    text-transform: uppercase !important;
    background: #1877f2 !important;
    line-height: 25px !important;
    box-sizing: border-box !important;
    width: 90% !important;
    display: inline-block !important;
    text-align: center !important;
}`;