import React from 'react';
import './NavProduct3D.css';

/* ─── Roller Gate: 3D shutter slats ─── */
export const Gate3D = () => (
  <div className="np3d-scene">
    <div className="np3d-gate-rotator">
      {/* Gate frame */}
      <div className="np3d-gate-frame">
        <div className="np3d-gate-frame-left" />
        <div className="np3d-gate-frame-right" />
        <div className="np3d-gate-frame-top" />
      </div>
      {/* Rolling slats */}
      {[0, 1, 2, 3, 4, 5, 6].map((i) => (
        <div
          key={i}
          className="np3d-gate-slat"
          style={{
            top: `${18 + i * 11}px`,
            animationDelay: `${i * 0.08}s`,
          }}
        />
      ))}
    </div>
  </div>
);

/* ─── Solar Panels: angled 3D array ─── */
export const Solar3D = () => (
  <div className="np3d-scene">
    <div className="np3d-solar-rotator">
      {[0, 1, 2].map((row) => (
        <div
          key={row}
          className="np3d-solar-panel"
          style={{ '--row': row }}
        >
          <div className="np3d-solar-face-top" />
          <div className="np3d-solar-face-front" />
          <div className="np3d-solar-face-right" />
          {/* Grid lines on top face */}
          <div className="np3d-solar-grid" />
        </div>
      ))}
      {/* Ground/mount bar */}
      <div className="np3d-solar-mount" />
    </div>
  </div>
);

/* ─── Battery: 3D power cell ─── */
export const Battery3D = () => (
  <div className="np3d-scene">
    <div className="np3d-battery-rotator">
      <div className="np3d-battery-body">
        <div className="np3d-bat-face np3d-bat-front" />
        <div className="np3d-bat-face np3d-bat-back" />
        <div className="np3d-bat-face np3d-bat-left" />
        <div className="np3d-bat-face np3d-bat-right" />
        <div className="np3d-bat-face np3d-bat-top" />
        <div className="np3d-bat-face np3d-bat-bottom" />
        {/* LED indicator */}
        <div className="np3d-bat-led" />
        {/* Charge level bars */}
        <div className="np3d-bat-bars">
          <span className="np3d-bar np3d-bar-1" />
          <span className="np3d-bar np3d-bar-2" />
          <span className="np3d-bar np3d-bar-3" />
          <span className="np3d-bar np3d-bar-4" />
        </div>
        {/* Terminal on top */}
        <div className="np3d-bat-terminal" />
      </div>
    </div>
  </div>
);

/* ─── Steel I-Beam: structural cross section ─── */
export const Steel3D = () => (
  <div className="np3d-scene">
    <div className="np3d-steel-rotator">
      {/* I-beam made of 3 plates: top flange, web, bottom flange */}
      <div className="np3d-ibeam">
        {/* Top flange */}
        <div className="np3d-flange np3d-flange-top">
          <div className="np3d-plate-face np3d-plate-top" />
          <div className="np3d-plate-face np3d-plate-front" />
          <div className="np3d-plate-face np3d-plate-right" />
          <div className="np3d-plate-face np3d-plate-bottom" />
        </div>
        {/* Web (vertical plate) */}
        <div className="np3d-web">
          <div className="np3d-plate-face np3d-web-front" />
          <div className="np3d-plate-face np3d-web-right" />
          <div className="np3d-plate-face np3d-web-top" />
          <div className="np3d-plate-face np3d-web-bottom" />
        </div>
        {/* Bottom flange */}
        <div className="np3d-flange np3d-flange-bottom">
          <div className="np3d-plate-face np3d-plate-top" />
          <div className="np3d-plate-face np3d-plate-front" />
          <div className="np3d-plate-face np3d-plate-right" />
          <div className="np3d-plate-face np3d-plate-bottom" />
        </div>
      </div>
    </div>
  </div>
);

/* ─── Roofing: standing seam panels ─── */
export const Roof3D = () => (
  <div className="np3d-scene">
    <div className="np3d-roof-rotator">
      {[0, 1, 2, 3].map((i) => (
        <div key={i} className="np3d-roof-panel" style={{ '--idx': i }}>
          <div className="np3d-roof-face np3d-roof-top" />
          <div className="np3d-roof-face np3d-roof-front" />
          <div className="np3d-roof-face np3d-roof-right" />
          {/* Seam ridge */}
          <div className="np3d-roof-seam" />
        </div>
      ))}
    </div>
  </div>
);

/* ─── Wood Decking: layered planks ─── */
export const Wood3D = () => (
  <div className="np3d-scene">
    <div className="np3d-wood-rotator">
      {[0, 1, 2, 3, 4].map((i) => (
        <div key={i} className="np3d-wood-plank" style={{ '--idx': i }}>
          <div className="np3d-plank-face np3d-plank-top" />
          <div className="np3d-plank-face np3d-plank-front" />
          <div className="np3d-plank-face np3d-plank-right" />
        </div>
      ))}
      {/* Support beams underneath */}
      <div className="np3d-wood-support np3d-wood-support-1" />
      <div className="np3d-wood-support np3d-wood-support-2" />
    </div>
  </div>
);
