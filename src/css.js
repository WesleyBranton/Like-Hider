/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

// Cache all CSS code
const code = {
    hideNotification: '',
    hideLikeCounter: '',
    hideLikeButton: ''
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