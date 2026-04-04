import{ab as oe,p as P,ac as le,ad as f,ae as L,af as K,ag as H,S as ue,ah as ce,ai as he,aj as Y,ak as me,k as Z,r as a,al as fe,a as G,t as de,V as b,a9 as q,am as Q,P as ve,an as pe,ao as xe,ap as ge,d as _e,l as ee,j as t,m as V,B as Se}from"./index-BxTySbUz.js";import{S as te}from"./ScrollTrigger-CB6UHAJl.js";import{_ as ye,V as we}from"./RollerGatesPage-BPRUASqR.js";import{P as De}from"./PerspectiveCamera-Is9DYy8p.js";import{E as Me}from"./Environment-D9Diez4U.js";import{v as Be}from"./constants-CV8roJbg.js";class Te extends oe{constructor(e=new P){super({uniforms:{inputBuffer:new f(null),depthBuffer:new f(null),resolution:new f(new P),texelSize:new f(new P),halfTexelSize:new f(new P),kernel:new f(0),scale:new f(1),cameraNear:new f(0),cameraFar:new f(1),minDepthThreshold:new f(0),maxDepthThreshold:new f(1),depthScale:new f(0),depthToBlurRatioBias:new f(.25)},fragmentShader:`#include <common>
        #include <dithering_pars_fragment>      
        uniform sampler2D inputBuffer;
        uniform sampler2D depthBuffer;
        uniform float cameraNear;
        uniform float cameraFar;
        uniform float minDepthThreshold;
        uniform float maxDepthThreshold;
        uniform float depthScale;
        uniform float depthToBlurRatioBias;
        varying vec2 vUv;
        varying vec2 vUv0;
        varying vec2 vUv1;
        varying vec2 vUv2;
        varying vec2 vUv3;

        void main() {
          float depthFactor = 0.0;
          
          #ifdef USE_DEPTH
            vec4 depth = texture2D(depthBuffer, vUv);
            depthFactor = smoothstep(minDepthThreshold, maxDepthThreshold, 1.0-(depth.r * depth.a));
            depthFactor *= depthScale;
            depthFactor = max(0.0, min(1.0, depthFactor + 0.25));
          #endif
          
          vec4 sum = texture2D(inputBuffer, mix(vUv0, vUv, depthFactor));
          sum += texture2D(inputBuffer, mix(vUv1, vUv, depthFactor));
          sum += texture2D(inputBuffer, mix(vUv2, vUv, depthFactor));
          sum += texture2D(inputBuffer, mix(vUv3, vUv, depthFactor));
          gl_FragColor = sum * 0.25 ;

          #include <dithering_fragment>
          #include <tonemapping_fragment>
          #include <${Be>=154?"colorspace_fragment":"encodings_fragment"}>
        }`,vertexShader:`uniform vec2 texelSize;
        uniform vec2 halfTexelSize;
        uniform float kernel;
        uniform float scale;
        varying vec2 vUv;
        varying vec2 vUv0;
        varying vec2 vUv1;
        varying vec2 vUv2;
        varying vec2 vUv3;

        void main() {
          vec2 uv = position.xy * 0.5 + 0.5;
          vUv = uv;

          vec2 dUv = (texelSize * vec2(kernel) + halfTexelSize) * scale;
          vUv0 = vec2(uv.x - dUv.x, uv.y + dUv.y);
          vUv1 = vec2(uv.x + dUv.x, uv.y + dUv.y);
          vUv2 = vec2(uv.x + dUv.x, uv.y - dUv.y);
          vUv3 = vec2(uv.x - dUv.x, uv.y - dUv.y);

          gl_Position = vec4(position.xy, 1.0, 1.0);
        }`,blending:le,depthWrite:!1,depthTest:!1}),this.toneMapped=!1,this.setTexelSize(e.x,e.y),this.kernel=new Float32Array([0,1,2,2,3])}setTexelSize(e,r){this.uniforms.texelSize.value.set(e,r),this.uniforms.halfTexelSize.value.set(e,r).multiplyScalar(.5)}setResolution(e){this.uniforms.resolution.value.copy(e)}}class Ue{constructor({gl:e,resolution:r,width:n=500,height:d=500,minDepthThreshold:g=0,maxDepthThreshold:v=1,depthScale:p=0,depthToBlurRatioBias:S=.25}){this.renderToScreen=!1,this.renderTargetA=new L(r,r,{minFilter:H,magFilter:H,stencilBuffer:!1,depthBuffer:!1,type:K}),this.renderTargetB=this.renderTargetA.clone(),this.convolutionMaterial=new Te,this.convolutionMaterial.setTexelSize(1/n,1/d),this.convolutionMaterial.setResolution(new P(n,d)),this.scene=new ue,this.camera=new ce,this.convolutionMaterial.uniforms.minDepthThreshold.value=g,this.convolutionMaterial.uniforms.maxDepthThreshold.value=v,this.convolutionMaterial.uniforms.depthScale.value=p,this.convolutionMaterial.uniforms.depthToBlurRatioBias.value=S,this.convolutionMaterial.defines.USE_DEPTH=p>0;const c=new Float32Array([-1,-1,0,3,-1,0,-1,3,0]),x=new Float32Array([0,0,2,0,0,2]),h=new he;h.setAttribute("position",new Y(c,3)),h.setAttribute("uv",new Y(x,2)),this.screen=new me(h,this.convolutionMaterial),this.screen.frustumCulled=!1,this.scene.add(this.screen)}render(e,r,n){const d=this.scene,g=this.camera,v=this.renderTargetA,p=this.renderTargetB;let S=this.convolutionMaterial,c=S.uniforms;c.depthBuffer.value=r.depthTexture;const x=S.kernel;let h=r,y,w,E;for(w=0,E=x.length-1;w<E;++w)y=(w&1)===0?v:p,c.kernel.value=x[w],c.inputBuffer.value=h.texture,e.setRenderTarget(y),e.render(d,g),h=y;c.kernel.value=x[w],c.inputBuffer.value=h.texture,e.setRenderTarget(this.renderToScreen?null:n),e.render(d,g)}}let be=class extends Z{constructor(e={}){super(e),this._tDepth={value:null},this._distortionMap={value:null},this._tDiffuse={value:null},this._tDiffuseBlur={value:null},this._textureMatrix={value:null},this._hasBlur={value:!1},this._mirror={value:0},this._mixBlur={value:0},this._blurStrength={value:.5},this._minDepthThreshold={value:.9},this._maxDepthThreshold={value:1},this._depthScale={value:0},this._depthToBlurRatioBias={value:.25},this._distortion={value:1},this._mixContrast={value:1},this.setValues(e)}onBeforeCompile(e){var r;(r=e.defines)!=null&&r.USE_UV||(e.defines.USE_UV=""),e.uniforms.hasBlur=this._hasBlur,e.uniforms.tDiffuse=this._tDiffuse,e.uniforms.tDepth=this._tDepth,e.uniforms.distortionMap=this._distortionMap,e.uniforms.tDiffuseBlur=this._tDiffuseBlur,e.uniforms.textureMatrix=this._textureMatrix,e.uniforms.mirror=this._mirror,e.uniforms.mixBlur=this._mixBlur,e.uniforms.mixStrength=this._blurStrength,e.uniforms.minDepthThreshold=this._minDepthThreshold,e.uniforms.maxDepthThreshold=this._maxDepthThreshold,e.uniforms.depthScale=this._depthScale,e.uniforms.depthToBlurRatioBias=this._depthToBlurRatioBias,e.uniforms.distortion=this._distortion,e.uniforms.mixContrast=this._mixContrast,e.vertexShader=`
        uniform mat4 textureMatrix;
        varying vec4 my_vUv;
      ${e.vertexShader}`,e.vertexShader=e.vertexShader.replace("#include <project_vertex>",`#include <project_vertex>
        my_vUv = textureMatrix * vec4( position, 1.0 );
        gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );`),e.fragmentShader=`
        uniform sampler2D tDiffuse;
        uniform sampler2D tDiffuseBlur;
        uniform sampler2D tDepth;
        uniform sampler2D distortionMap;
        uniform float distortion;
        uniform float cameraNear;
			  uniform float cameraFar;
        uniform bool hasBlur;
        uniform float mixBlur;
        uniform float mirror;
        uniform float mixStrength;
        uniform float minDepthThreshold;
        uniform float maxDepthThreshold;
        uniform float mixContrast;
        uniform float depthScale;
        uniform float depthToBlurRatioBias;
        varying vec4 my_vUv;
        ${e.fragmentShader}`,e.fragmentShader=e.fragmentShader.replace("#include <emissivemap_fragment>",`#include <emissivemap_fragment>

      float distortionFactor = 0.0;
      #ifdef USE_DISTORTION
        distortionFactor = texture2D(distortionMap, vUv).r * distortion;
      #endif

      vec4 new_vUv = my_vUv;
      new_vUv.x += distortionFactor;
      new_vUv.y += distortionFactor;

      vec4 base = texture2DProj(tDiffuse, new_vUv);
      vec4 blur = texture2DProj(tDiffuseBlur, new_vUv);

      vec4 merge = base;

      #ifdef USE_NORMALMAP
        vec2 normal_uv = vec2(0.0);
        vec4 normalColor = texture2D(normalMap, vUv * normalScale);
        vec3 my_normal = normalize( vec3( normalColor.r * 2.0 - 1.0, normalColor.b,  normalColor.g * 2.0 - 1.0 ) );
        vec3 coord = new_vUv.xyz / new_vUv.w;
        normal_uv = coord.xy + coord.z * my_normal.xz * 0.05;
        vec4 base_normal = texture2D(tDiffuse, normal_uv);
        vec4 blur_normal = texture2D(tDiffuseBlur, normal_uv);
        merge = base_normal;
        blur = blur_normal;
      #endif

      float depthFactor = 0.0001;
      float blurFactor = 0.0;

      #ifdef USE_DEPTH
        vec4 depth = texture2DProj(tDepth, new_vUv);
        depthFactor = smoothstep(minDepthThreshold, maxDepthThreshold, 1.0-(depth.r * depth.a));
        depthFactor *= depthScale;
        depthFactor = max(0.0001, min(1.0, depthFactor));

        #ifdef USE_BLUR
          blur = blur * min(1.0, depthFactor + depthToBlurRatioBias);
          merge = merge * min(1.0, depthFactor + 0.5);
        #else
          merge = merge * depthFactor;
        #endif

      #endif

      float reflectorRoughnessFactor = roughness;
      #ifdef USE_ROUGHNESSMAP
        vec4 reflectorTexelRoughness = texture2D( roughnessMap, vUv );
        reflectorRoughnessFactor *= reflectorTexelRoughness.g;
      #endif

      #ifdef USE_BLUR
        blurFactor = min(1.0, mixBlur * reflectorRoughnessFactor);
        merge = mix(merge, blur, blurFactor);
      #endif

      vec4 newMerge = vec4(0.0, 0.0, 0.0, 1.0);
      newMerge.r = (merge.r - 0.5) * mixContrast + 0.5;
      newMerge.g = (merge.g - 0.5) * mixContrast + 0.5;
      newMerge.b = (merge.b - 0.5) * mixContrast + 0.5;

      diffuseColor.rgb = diffuseColor.rgb * ((1.0 - min(1.0, mirror)) + newMerge.rgb * mixStrength);
      `)}get tDiffuse(){return this._tDiffuse.value}set tDiffuse(e){this._tDiffuse.value=e}get tDepth(){return this._tDepth.value}set tDepth(e){this._tDepth.value=e}get distortionMap(){return this._distortionMap.value}set distortionMap(e){this._distortionMap.value=e}get tDiffuseBlur(){return this._tDiffuseBlur.value}set tDiffuseBlur(e){this._tDiffuseBlur.value=e}get textureMatrix(){return this._textureMatrix.value}set textureMatrix(e){this._textureMatrix.value=e}get hasBlur(){return this._hasBlur.value}set hasBlur(e){this._hasBlur.value=e}get mirror(){return this._mirror.value}set mirror(e){this._mirror.value=e}get mixBlur(){return this._mixBlur.value}set mixBlur(e){this._mixBlur.value=e}get mixStrength(){return this._blurStrength.value}set mixStrength(e){this._blurStrength.value=e}get minDepthThreshold(){return this._minDepthThreshold.value}set minDepthThreshold(e){this._minDepthThreshold.value=e}get maxDepthThreshold(){return this._maxDepthThreshold.value}set maxDepthThreshold(e){this._maxDepthThreshold.value=e}get depthScale(){return this._depthScale.value}set depthScale(e){this._depthScale.value=e}get depthToBlurRatioBias(){return this._depthToBlurRatioBias.value}set depthToBlurRatioBias(e){this._depthToBlurRatioBias.value=e}get distortion(){return this._distortion.value}set distortion(e){this._distortion.value=e}get mixContrast(){return this._mixContrast.value}set mixContrast(e){this._mixContrast.value=e}};const Re=a.forwardRef(({mixBlur:o=0,mixStrength:e=1,resolution:r=256,blur:n=[0,0],minDepthThreshold:d=.9,maxDepthThreshold:g=1,depthScale:v=0,depthToBlurRatioBias:p=.25,mirror:S=0,distortion:c=1,mixContrast:x=1,distortionMap:h,reflectorOffset:y=0,...w},E)=>{fe({MeshReflectorMaterialImpl:be});const l=G(({gl:i})=>i),R=G(({camera:i})=>i),re=G(({scene:i})=>i);n=Array.isArray(n)?n:[n,n];const k=n[0]+n[1]>0,$=n[0],O=n[1],B=a.useRef(null);a.useImperativeHandle(E,()=>B.current,[]);const[T]=a.useState(()=>new de),[D]=a.useState(()=>new b),[M]=a.useState(()=>new b),[W]=a.useState(()=>new b),[F]=a.useState(()=>new q),[A]=a.useState(()=>new b(0,0,-1)),[_]=a.useState(()=>new Q),[j]=a.useState(()=>new b),[N]=a.useState(()=>new b),[C]=a.useState(()=>new Q),[U]=a.useState(()=>new q),[m]=a.useState(()=>new ve),ae=a.useCallback(()=>{var i;const s=B.current.parent||((i=B.current)==null||(i=i.__r3f.parent)==null?void 0:i.object);if(!s||(M.setFromMatrixPosition(s.matrixWorld),W.setFromMatrixPosition(R.matrixWorld),F.extractRotation(s.matrixWorld),D.set(0,0,1),D.applyMatrix4(F),M.addScaledVector(D,y),j.subVectors(M,W),j.dot(D)>0))return;j.reflect(D).negate(),j.add(M),F.extractRotation(R.matrixWorld),A.set(0,0,-1),A.applyMatrix4(F),A.add(W),N.subVectors(M,A),N.reflect(D).negate(),N.add(M),m.position.copy(j),m.up.set(0,1,0),m.up.applyMatrix4(F),m.up.reflect(D),m.lookAt(N),m.far=R.far,m.updateMatrixWorld(),m.projectionMatrix.copy(R.projectionMatrix),U.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),U.multiply(m.projectionMatrix),U.multiply(m.matrixWorldInverse),U.multiply(s.matrixWorld),T.setFromNormalAndCoplanarPoint(D,M),T.applyMatrix4(m.matrixWorldInverse),_.set(T.normal.x,T.normal.y,T.normal.z,T.constant);const u=m.projectionMatrix;C.x=(Math.sign(_.x)+u.elements[8])/u.elements[0],C.y=(Math.sign(_.y)+u.elements[9])/u.elements[5],C.z=-1,C.w=(1+u.elements[10])/u.elements[14],_.multiplyScalar(2/_.dot(C)),u.elements[2]=_.x,u.elements[6]=_.y,u.elements[10]=_.z+1,u.elements[14]=_.w},[R,y]),[X,ie,ne,z]=a.useMemo(()=>{const i={minFilter:H,magFilter:H,type:K},s=new L(r,r,i);s.depthBuffer=!0,s.depthTexture=new pe(r,r),s.depthTexture.format=xe,s.depthTexture.type=ge;const u=new L(r,r,i),I=new Ue({gl:l,resolution:r,width:$,height:O,minDepthThreshold:d,maxDepthThreshold:g,depthScale:v,depthToBlurRatioBias:p}),se={mirror:S,textureMatrix:U,mixBlur:o,tDiffuse:s.texture,tDepth:s.depthTexture,tDiffuseBlur:u.texture,hasBlur:k,mixStrength:e,minDepthThreshold:d,maxDepthThreshold:g,depthScale:v,depthToBlurRatioBias:p,distortion:c,distortionMap:h,mixContrast:x,"defines-USE_BLUR":k?"":void 0,"defines-USE_DEPTH":v>0?"":void 0,"defines-USE_DISTORTION":h?"":void 0};return[s,u,I,se]},[l,$,O,U,r,S,k,o,e,d,g,v,p,c,h,x]);return _e(()=>{var i;const s=B.current.parent||((i=B.current)==null||(i=i.__r3f.parent)==null?void 0:i.object);if(!s)return;s.visible=!1;const u=l.xr.enabled,I=l.shadowMap.autoUpdate;ae(),l.xr.enabled=!1,l.shadowMap.autoUpdate=!1,l.setRenderTarget(X),l.state.buffers.depth.setMask(!0),l.autoClear||l.clear(),l.render(re,m),k&&ne.render(l,X,ie),l.xr.enabled=u,l.shadowMap.autoUpdate=I,s.visible=!0,l.setRenderTarget(null)}),a.createElement("meshReflectorMaterialImpl",ye({attach:"material",key:"key"+z["defines-USE_BLUR"]+z["defines-USE_DEPTH"]+z["defines-USE_DISTORTION"],ref:B},z,w))});ee.registerPlugin(te);function Fe({progress:o}){const v=a.useMemo(()=>new Se(3.2,.373,.07),[3.2,.373]),p=a.useMemo(()=>new Z({color:"#2a2a2a",roughness:.3,metalness:.85}),[]);return t.jsx("group",{children:Array.from({length:10}).map((S,c)=>{const x=-1.8135+c*.403,h=c/10,y=Math.max(0,Math.min(1,(1-o-h*.3)/.7));return t.jsx("mesh",{geometry:v,material:p,position:[0,x+y*6,0]},c)})})}function je(){return t.jsxs("mesh",{rotation:[-Math.PI/2,0,0],position:[0,-2.2,0],children:[t.jsx("planeGeometry",{args:[20,20]}),t.jsx(Re,{blur:[200,80],resolution:256,mixBlur:1,mixStrength:.4,roughness:1,color:"#050505",metalness:.5})]})}function Ce({progress:o}){return t.jsxs(t.Fragment,{children:[t.jsx(De,{makeDefault:!0,position:[0,0,6],fov:45}),t.jsx("ambientLight",{intensity:.3}),t.jsx("directionalLight",{position:[10,10,5],intensity:1}),t.jsx(Me,{preset:"warehouse"}),t.jsx(Fe,{progress:o}),t.jsx(je,{})]})}const Pe={hidden:{},visible:{transition:{staggerChildren:.03}}},Ee={hidden:{opacity:0,y:20},visible:{opacity:1,y:0,transition:{duration:.4,ease:[.16,1,.3,1]}}};function J({text:o}){return t.jsx(V.span,{variants:Pe,initial:"hidden",whileInView:"visible",viewport:{once:!0,amount:.5},style:{display:"inline-block"},children:o.split("").map((e,r)=>t.jsx(V.span,{variants:Ee,style:{display:"inline-block"},children:e===" "?" ":e},r))})}function Ie(){const o=a.useRef(null),[e,r]=a.useState(0);return a.useEffect(()=>{if(!o.current)return;const n=ee.context(()=>{te.create({trigger:o.current,start:"top bottom",end:"top top",scrub:1.5,onUpdate:d=>r(d.progress)})});return()=>n.revert()},[]),t.jsxs("section",{className:"rg-cta-3d",id:"rg-cta",ref:o,children:[t.jsx(we,{className:"rg-cta-canvas-bg",children:t.jsx(a.Suspense,{fallback:null,children:t.jsx(Ce,{progress:e})})}),t.jsxs("div",{className:"rg-cta-3d-content",children:[t.jsxs("h2",{className:"rg-cta-headline",children:[t.jsx(J,{text:"Built for Performance."}),t.jsx("br",{}),t.jsx("span",{className:"rg-hero-italic",children:t.jsx(J,{text:"Designed for Security."})})]}),t.jsx(V.p,{className:"rg-cta-sub",initial:{opacity:0},whileInView:{opacity:1},viewport:{once:!0},transition:{duration:1,delay:.5},children:"Let's discuss how Elcardo Roller Gates can protect your business."}),t.jsxs(V.div,{className:"rg-cta-buttons",initial:{opacity:0,y:30},whileInView:{opacity:1,y:0},viewport:{once:!0},transition:{duration:.8,delay:.8},children:[t.jsxs("a",{href:"#",className:"rg-btn-primary rg-btn-primary--white","data-cursor":"expand",children:["Get a Quote",t.jsx("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:t.jsx("path",{d:"M5 12h14M12 5l7 7-7 7"})})]}),t.jsx("a",{href:"#",className:"rg-btn-outline rg-btn-outline--glow","data-cursor":"expand",children:"Contact Us"})]})]})]})}export{Ie as default};
