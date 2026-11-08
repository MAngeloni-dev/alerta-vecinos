(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))o(r);new MutationObserver(r=>{for(const d of r)if(d.type==="childList")for(const i of d.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&o(i)}).observe(document,{childList:!0,subtree:!0});function a(r){const d={};return r.integrity&&(d.integrity=r.integrity),r.referrerPolicy&&(d.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?d.credentials="include":r.crossOrigin==="anonymous"?d.credentials="omit":d.credentials="same-origin",d}function o(r){if(r.ep)return;r.ep=!0;const d=a(r);fetch(r.href,d)}})();const x="alerta_vecinos_state_v1",h=[{id:"rep-001",trackingId:"REP-000123",category:"Accidente",description:"Colisión menor entre dos automóviles en esquina semafórica. Tránsito parcialmente demorado.",location:"Av. Colón y Jujuy, Centro",distance:"1,2 km",timestamp:"18/08/2026 · 19:32",status:"Pendiente",isAnonymous:!1,author:"Matías Rodríguez",commentsCount:3},{id:"rep-002",trackingId:"REP-000120",category:"Robo",description:"Arrebato de mochila en parada de colectivo por dos personas en motocicleta.",location:"Bv. San Juan y Belgrano",distance:"500 m",timestamp:"18/08/2026 · 18:15",status:"Pendiente",isAnonymous:!0,author:"Vecino Anónimo",commentsCount:7},{id:"rep-003",trackingId:"REP-000115",category:"Actividad Sospechosa",description:"Dos individuos observando cerraduras de portones en horario nocturno.",location:"Mariano Moreno 340",distance:"800 m",timestamp:"17/08/2026 · 23:40",status:"Verificado",isAnonymous:!1,author:"Carla Méndez",commentsCount:2},{id:"rep-004",trackingId:"REP-000108",category:"Vandalismo",description:"Luminaria comunitaria dañada intencionalmente, dejando la cuadra a oscuras.",location:"Plaza Roca, Sector Norte",distance:"350 m",timestamp:"16/08/2026 · 21:10",status:"Verificado",isAnonymous:!1,author:"Juan Pérez",commentsCount:1}],y=[{id:"stop-01",name:"Plaza Roca",distance:"350 m",address:"Av. San Martín 450, frente al centro cívico",lines:["Línea 10","Línea 12","Línea 17"],features:["Iluminación LED reforzada","Cámara de domo 360°","Pulsador SOS directo","Comercio adherido 24hs"]},{id:"stop-02",name:"Terminal de Ómnibus",distance:"1,0 km",address:"Bv. Perón 380, Plataforma 4",lines:["Línea 20","Línea 25","Interurbanos"],features:["Puesto policial permanente","Pulsador de auxilio","Cámaras de seguridad","Zona cardioprotegida"]},{id:"stop-03",name:"Paseo Buen Pastor",distance:"700 m",address:"Av. Hipólito Yrigoyen 325",lines:["Línea 30","Línea 34","Línea 41"],features:["Cámaras de vigilancia conectadas al 911","Iluminación solar","Tótem de emergencia"]},{id:"stop-04",name:"Facultad de Ciencias Exactas",distance:"1,8 km",address:"Av. Vélez Sársfield 1611, Ciudad Universitaria",lines:["Línea 50","Línea 52","Línea 65"],features:["Guardia universitaria nocturna","Corredor seguro para estudiantes","Iluminación LED"]}],w=[{id:"fav-1",name:"Casa",address:"Av. Pueyrredón 450",icon:"home"},{id:"fav-2",name:"Trabajo",address:"Bv. San Juan 120",icon:"briefcase"},{id:"fav-3",name:"Facultad",address:"Ciudad Universitaria, Pabellón Perú",icon:"bookOpen"}],$=[{id:"notif-1",title:"Nueva alerta cercana",message:"Se reportó Robo a 500 m en Bv. San Juan.",time:"Hace 15 min",read:!1,type:"alerta"},{id:"notif-2",title:"Cambio de estado de reporte",message:'Tu reporte REP-000108 sobre luminaria pasó a "Verificado".',time:"Hace 2 horas",read:!1,type:"reporte"},{id:"notif-3",title:"Aviso de seguridad barrial",message:"Patrullaje reforzado activado en cuadrante Plaza Roca.",time:"Ayer",read:!0,type:"seguridad"}];class k{state;listeners=new Set;constructor(){this.state=this.loadFromStorage()}loadFromStorage(){try{const t=localStorage.getItem(x);if(t)return JSON.parse(t)}catch(t){console.warn("Error loading state from localStorage:",t)}return{user:{name:"Matías",lastName:"Rodríguez",email:"correo@ejemplo.com",phone:"+54 9 351 234-5678",role:"admin",avatar:"MR"},searchRadiusKm:2,reports:h,safeStops:y,favorites:w,activeTrip:null,notifications:$,newReportDraft:{},reportFilter:{category:"Todas",status:"Todos",radiusKm:2,searchQuery:""}}}saveToStorage(){try{localStorage.setItem(x,JSON.stringify(this.state))}catch(t){console.warn("Error saving to localStorage:",t)}this.notify()}subscribe(t){return this.listeners.add(t),()=>this.listeners.delete(t)}notify(){this.listeners.forEach(t=>t())}getState(){return this.state}setSearchRadius(t){this.state.searchRadiusKm=t,this.saveToStorage()}setReportDraft(t){this.state.newReportDraft={...this.state.newReportDraft,...t},this.saveToStorage()}clearReportDraft(){this.state.newReportDraft={},this.saveToStorage()}createReport(){const t=this.state.newReportDraft,o=`REP-${Math.floor(1e5+Math.random()*9e5)}`,r={id:`rep-${Date.now()}`,trackingId:o,category:t.category||"Otro",description:t.description||"Sin descripción detallada.",location:t.location||"Ubicación actual detectada",distance:"300 m",timestamp:new Date().toLocaleDateString("es-AR",{day:"2-digit",month:"2-digit",year:"numeric",hour:"2-digit",minute:"2-digit"}),status:"Pendiente",isAnonymous:t.isAnonymous??!1,author:t.isAnonymous?"Vecino Anónimo":`${this.state.user.name} ${this.state.user.lastName}`,commentsCount:0};return this.state.reports.unshift(r),this.state.newReportDraft={},this.state.notifications.unshift({id:`notif-${Date.now()}`,title:"Reporte enviado con éxito",message:`Tu reporte ${o} ha sido registrado para moderación.`,time:"Recién",read:!1,type:"reporte"}),this.saveToStorage(),r}updateReportStatus(t,a){const o=this.state.reports.find(r=>r.id===t||r.trackingId===t);o&&(o.status=a,this.saveToStorage())}setReportFilter(t){this.state.reportFilter={...this.state.reportFilter,...t},this.notify()}clearReportFilter(){this.state.reportFilter={category:"Todas",status:"Todos",radiusKm:this.state.searchRadiusKm,searchQuery:""},this.notify()}addFavorite(t,a,o="mapPin"){const r={id:`fav-${Date.now()}`,name:t.trim(),address:a.trim(),icon:o};this.state.favorites.push(r),this.saveToStorage()}updateFavorite(t,a,o){const r=this.state.favorites.find(d=>d.id===t);r&&(r.name=a.trim(),r.address=o.trim(),this.saveToStorage())}removeFavorite(t){this.state.favorites=this.state.favorites.filter(a=>a.id!==t),this.saveToStorage()}startTrip(t,a,o){const r={id:`trip-${Date.now()}`,origin:"Ubicación actual",destination:t,contactName:a,contactPhone:o,status:"En curso",startTime:new Date().toLocaleTimeString("es-AR",{hour:"2-digit",minute:"2-digit"}),estimatedMinutes:20};return this.state.activeTrip=r,this.saveToStorage(),r}confirmArrival(){this.state.activeTrip&&(this.state.activeTrip.status="Llegada confirmada",this.saveToStorage())}sendTripAlert(){this.state.activeTrip&&(this.state.activeTrip.status="Alerta enviada",this.saveToStorage())}finishTrip(){this.state.activeTrip=null,this.saveToStorage()}updateUserProfile(t){this.state.user={...this.state.user,...t},this.saveToStorage()}toggleAdminRole(){this.state.user.role=this.state.user.role==="admin"?"vecino":"admin",this.saveToStorage()}resetToSeed(){localStorage.removeItem(x),this.state=this.loadFromStorage(),this.notify()}}const n=new k,s={arrowLeft:(e="w-6 h-6")=>`
    <svg class="${e}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M19 12H5M12 19l-7-7 7-7"/>
    </svg>`,chevronRight:(e="w-5 h-5")=>`
    <svg class="${e}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="m9 18 6-6-6-6"/>
    </svg>`,shield:(e="w-6 h-6")=>`
    <svg class="${e}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    </svg>`,alertTriangle:(e="w-6 h-6")=>`
    <svg class="${e}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/>
      <line x1="12" y1="9" x2="12" y2="13"/>
      <line x1="12" y1="17" x2="12.01" y2="17"/>
    </svg>`,map:(e="w-6 h-6")=>`
    <svg class="${e}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"/>
      <line x1="9" y1="3" x2="9" y2="18"/>
      <line x1="15" y1="6" x2="15" y2="21"/>
    </svg>`,mapPin:(e="w-5 h-5")=>`
    <svg class="${e}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
      <circle cx="12" cy="10" r="3"/>
    </svg>`,bus:(e="w-6 h-6")=>`
    <svg class="${e}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M8 6v6"/>
      <path d="M15 6v6"/>
      <path d="M2 12h19.6"/>
      <path d="M18 18h3s.5-1.7.8-2.8c.1-.4.2-.8.2-1.2 0-.3-.1-.6-.2-.8l-1.8-5c-.3-.8-1-1.2-1.9-1.2H5.9c-.9 0-1.6.4-1.9 1.2L2.2 13.2c-.1.2-.2.5-.2.8 0 .4.1.8.2 1.2.3 1.1.8 2.8.8 2.8h3"/>
      <circle cx="7" cy="18" r="2"/>
      <path d="M9 18h5"/>
      <circle cx="16" cy="18" r="2"/>
    </svg>`,phone:(e="w-5 h-5")=>`
    <svg class="${e}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
    </svg>`,search:(e="w-5 h-5")=>`
    <svg class="${e}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <circle cx="11" cy="11" r="8"/>
      <line x1="21" y1="21" x2="16.65" y2="16.65"/>
    </svg>`,bell:(e="w-6 h-6")=>`
    <svg class="${e}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/>
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>
    </svg>`,user:(e="w-5 h-5")=>`
    <svg class="${e}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/>
      <circle cx="12" cy="7" r="4"/>
    </svg>`,check:(e="w-5 h-5")=>`
    <svg class="${e}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <polyline points="20 6 9 17 4 12"/>
    </svg>`,checkCircle:(e="w-8 h-8")=>`
    <svg class="${e}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
      <polyline points="22 4 12 14.01 9 11.01"/>
    </svg>`,lock:(e="w-5 h-5")=>`
    <svg class="${e}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/>
      <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
    </svg>`,plus:(e="w-5 h-5")=>`
    <svg class="${e}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <line x1="12" y1="5" x2="12" y2="19"/>
      <line x1="5" y1="12" x2="19" y2="12"/>
    </svg>`,edit:(e="w-4 h-4")=>`
    <svg class="${e}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/>
      <path d="m15 5 4 4"/>
    </svg>`,trash:(e="w-4 h-4")=>`
    <svg class="${e}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M3 6h18"/>
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/>
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
    </svg>`,siren:(e="w-6 h-6")=>`
    <svg class="${e}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M7 18v-6a5 5 0 1 1 10 0v6"/>
      <path d="M5 21a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-1a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2z"/>
      <path d="M21 10h1"/>
      <path d="M2 10h1"/>
      <path d="m19 4 1-1"/>
      <path d="m4 4-1-1"/>
    </svg>`,fileText:(e="w-5 h-5")=>`
    <svg class="${e}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/>
      <path d="M14 2v4a2 2 0 0 0 2 2h4"/>
      <path d="M10 9H8"/>
      <path d="M16 13H8"/>
      <path d="M16 17H8"/>
    </svg>`,heart:(e="w-5 h-5")=>`
    <svg class="${e}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
    </svg>`,clock:(e="w-4 h-4")=>`
    <svg class="${e}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10"/>
      <polyline points="12 6 12 12 16 14"/>
    </svg>`,navigation:(e="w-5 h-5")=>`
    <svg class="${e}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <polygon points="3 11 22 2 13 21 11 13 3 11"/>
    </svg>`,barChart:(e="w-5 h-5")=>`
    <svg class="${e}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <line x1="12" y1="20" x2="12" y2="10"/>
      <line x1="18" y1="20" x2="18" y2="4"/>
      <line x1="6" y1="20" x2="6" y2="16"/>
    </svg>`,filter:(e="w-5 h-5")=>`
    <svg class="${e}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
    </svg>`,camera:(e="w-5 h-5")=>`
    <svg class="${e}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/>
      <circle cx="12" cy="13" r="3"/>
    </svg>`,home:(e="w-5 h-5")=>`
    <svg class="${e}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
      <polyline points="9 22 9 12 15 12 15 22"/>
    </svg>`,briefcase:(e="w-5 h-5")=>`
    <svg class="${e}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <rect width="20" height="14" x="2" y="7" rx="2" ry="2"/>
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
    </svg>`,bookOpen:(e="w-5 h-5")=>`
    <svg class="${e}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
    </svg>`,info:(e="w-5 h-5")=>`
    <svg class="${e}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10"/>
      <line x1="12" y1="16" x2="12" y2="12"/>
      <line x1="12" y1="8" x2="12.01" y2="8"/>
    </svg>`,sliders:(e="w-5 h-5")=>`
    <svg class="${e}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <line x1="4" y1="21" x2="4" y2="14"/>
      <line x1="4" y1="10" x2="4" y2="3"/>
      <line x1="12" y1="21" x2="12" y2="12"/>
      <line x1="12" y1="8" x2="12" y2="3"/>
      <line x1="20" y1="21" x2="20" y2="16"/>
      <line x1="20" y1="12" x2="20" y2="3"/>
      <line x1="1" y1="14" x2="7" y2="14"/>
      <line x1="9" y1="8" x2="15" y2="8"/>
      <line x1="17" y1="16" x2="23" y2="16"/>
    </svg>`};function l(e,t,a){const o=t?`<a
        href="${t}"
        class="inline-flex items-center justify-center w-10 h-10 -ml-2 rounded-full text-content-title hover:bg-slate-200/60 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-safety-blue transition-colors"
        aria-label="Volver a la pantalla anterior"
      >
        ${s.arrowLeft("w-6 h-6")}
      </a>`:'<div class="w-2"></div>',r=a?.showAdminBadge?`<span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-900 text-slate-100">
        ${s.lock("w-3 h-3 text-indigo-300")}
        Admin
      </span>`:"";return`
    <header class="sticky top-0 z-40 bg-surface-canvas/95 backdrop-blur-md border-b border-surface-border px-4 py-3 flex items-center justify-between min-h-[58px]">
      <div class="flex items-center gap-2">
        ${o}
        <div>
          <div class="flex items-center gap-2">
            <h1 class="font-outfit font-semibold text-lg text-content-title tracking-tight leading-tight">
              ${e}
            </h1>
            ${r}
          </div>
          ${a?.subtitle?`<p class="text-xs text-content-muted leading-none mt-0.5">${a.subtitle}</p>`:""}
        </div>
      </div>
      <div class="flex items-center gap-2">
        ${a?.rightHtml||""}
      </div>
    </header>
  `}function c(e){switch(e){case"Verificado":case"Seguro":case"Activo":case"Activa":return`
        <span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-safety-green-subtle text-safety-green-dark border border-safety-green/20">
          ${s.check("w-3 h-3")}
          ${e}
        </span>
      `;case"Pendiente":case"Precaución":return`
        <span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-safety-amber-subtle text-safety-amber-dark border border-safety-amber/20">
          ${s.clock("w-3 h-3")}
          ${e}
        </span>
      `;case"Crítico":case"Rechazado":case"Bloqueado":return`
        <span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-safety-red-subtle text-safety-red-dark border border-safety-red/20">
          ${s.alertTriangle("w-3 h-3")}
          ${e}
        </span>
      `;case"Resuelto":case"Finalizado":return`
        <span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-safety-blue-subtle text-safety-blue-dark border border-safety-blue/20">
          ${s.checkCircle("w-3 h-3")}
          ${e}
        </span>
      `;default:return`
        <span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-700">
          ${e}
        </span>
      `}}function m(e,t,a,o,r="blue"){return`
    <a
      href="${o}"
      class="card-action h-36 flex flex-col justify-between p-4 group"
    >
      <div class="flex items-start justify-between">
        <div class="w-10 h-10 rounded-md flex items-center justify-center ${{blue:"bg-safety-blue-subtle text-safety-blue border-safety-blue/20",green:"bg-safety-green-subtle text-safety-green border-safety-green/20",amber:"bg-safety-amber-subtle text-safety-amber border-safety-amber/20",red:"bg-safety-red-subtle text-safety-red border-safety-red/20"}[r]} border transition-transform group-hover:scale-105">
          ${a}
        </div>
        <span class="text-content-muted group-hover:text-safety-blue transition-colors">
          ${s.chevronRight("w-4 h-4")}
        </span>
      </div>
      <div>
        <h3 class="font-outfit font-semibold text-base text-content-title group-hover:text-safety-blue transition-colors leading-tight">
          ${e}
        </h3>
        <p class="text-xs text-content-muted mt-0.5 line-clamp-1">
          ${t}
        </p>
      </div>
    </a>
  `}function R(e,t=`#p21-detalle-reporte?id=${e.id}`){return`
    <article class="p-4 bg-surface-card border border-surface-border rounded-lg shadow-level-1 hover:border-safety-blue/30 transition-all duration-150">
      <div class="flex items-start justify-between gap-2 mb-2">
        <div class="flex items-center gap-2">
          <div class="w-8 h-8 rounded-md bg-slate-100 flex items-center justify-center shrink-0">
            ${{Robo:s.alertTriangle("w-5 h-5 text-safety-amber"),Accidente:s.alertTriangle("w-5 h-5 text-safety-red"),"Actividad Sospechosa":s.shield("w-5 h-5 text-safety-blue"),Vandalismo:s.alertTriangle("w-5 h-5 text-safety-amber"),Incendio:s.siren("w-5 h-5 text-safety-red"),Otro:s.info("w-5 h-5 text-slate-600")}[e.category]||s.info("w-5 h-5")}
          </div>
          <div>
            <h4 class="font-outfit font-semibold text-sm text-content-title leading-tight">
              ${e.category}
            </h4>
            <p class="text-xs text-content-muted flex items-center gap-1">
              ${s.mapPin("w-3 h-3")} a ${e.distance} · ${e.timestamp.split("·")[0].trim()}
            </p>
          </div>
        </div>
        <div>
          ${c(e.status)}
        </div>
      </div>
      <p class="text-xs text-content-body line-clamp-2 mb-3">
        ${e.description}
      </p>
      <div class="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
        <span class="font-mono text-content-muted text-[11px] font-medium">
          ${e.trackingId}
        </span>
        <a
          href="${t}"
          class="font-semibold text-safety-blue hover:text-safety-blue-hover hover:underline inline-flex items-center gap-1"
        >
          Ver reporte ${s.chevronRight("w-3.5 h-3.5")}
        </a>
      </div>
    </article>
  `}function j(e){return`
    <nav class="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-mobile z-40 bg-surface-card/95 backdrop-blur-md border-t border-surface-border py-2 px-3 flex justify-around items-center shadow-level-2" aria-label="Navegación principal">
      ${[{hash:"#p01-inicio",label:"Inicio",icon:s.home("w-5 h-5")},{hash:"#p02-mapa-riesgo",label:"Mapa",icon:s.map("w-5 h-5")},{hash:"#p11-reportes",label:"Reportes",icon:s.fileText("w-5 h-5")},{hash:"#p22-seguridad-personal",label:"Trayecto",icon:s.navigation("w-5 h-5")},{hash:"#p30-mi-perfil",label:"Perfil",icon:s.user("w-5 h-5")}].map(a=>{const o=e.startsWith(a.hash.replace("#",""));return`
            <a
              href="${a.hash}"
              class="flex flex-col items-center justify-center py-1 px-3 rounded-md transition-colors ${o?"text-safety-blue font-semibold":"text-content-muted hover:text-content-title"}"
            >
              <div class="mb-0.5">${a.icon}</div>
              <span class="text-[11px] leading-tight">${a.label}</span>
            </a>
          `}).join("")}
    </nav>
  `}const b=[{id:"p01-inicio",name:"Inicio / Dashboard",module:"Inicio & Seguridad",page:1},{id:"p02-mapa-riesgo",name:"Mapa de riesgo",module:"Inicio & Seguridad",page:2},{id:"p03-alertas-cercanas",name:"Alertas cercanas",module:"Inicio & Seguridad",page:3},{id:"p04-radio-busqueda",name:"Configuración radio",module:"Inicio & Seguridad",page:4},{id:"p05-paradas-seguras",name:"Paradas seguras",module:"Inicio & Seguridad",page:5},{id:"p06-buscar-paradas",name:"Buscar paradas",module:"Inicio & Seguridad",page:6},{id:"p07-ubicacion-parada",name:"Ubicación de parada",module:"Inicio & Seguridad",page:7},{id:"p08-consejos-preventivos",name:"Consejos preventivos",module:"Inicio & Seguridad",page:8},{id:"p09-recomendaciones",name:"Recomendaciones",module:"Inicio & Seguridad",page:9},{id:"p10-numeros-emergencia",name:"Números de emergencia",module:"Inicio & Seguridad",page:10},{id:"p11-reportes",name:"Reportes Hub",module:"Reportes & Auth",page:11},{id:"p12-reportes-publicos",name:"Reportes públicos",module:"Reportes & Auth",page:12},{id:"p13-filtrar-reportes",name:"Filtrar reportes",module:"Reportes & Auth",page:13},{id:"p14-iniciar-sesion",name:"Iniciar sesión / Registro",module:"Reportes & Auth",page:14},{id:"p15-crear-reporte-intro",name:"Crear reporte (Paso 1)",module:"Reportes & Auth",page:15},{id:"p16-tipo-reporte",name:"Tipo de reporte (Paso 2)",module:"Reportes & Auth",page:16},{id:"p17-completar-reporte",name:"Completar reporte (Paso 3)",module:"Reportes & Auth",page:17},{id:"p18-resumen-reporte",name:"Resumen reporte (Paso 4)",module:"Reportes & Auth",page:18},{id:"p19-confirmar-reporte",name:"Confirmar reporte (Modal)",module:"Reportes & Auth",page:19},{id:"p20-reporte-exitoso",name:"Reporte exitoso",module:"Reportes & Auth",page:20},{id:"p21-detalle-reporte",name:"Detalle del reporte",module:"Reportes & Auth",page:21},{id:"p22-seguridad-personal",name:"Seguridad personal / Trayecto",module:"Seguridad Personal",page:22},{id:"p23-seleccionar-destino",name:"Seleccionar destino",module:"Seguridad Personal",page:23},{id:"p24-elegir-contacto",name:"Elegir contacto",module:"Seguridad Personal",page:24},{id:"p25-trayecto-activo",name:'Trayecto activo "Llegué Bien"',module:"Seguridad Personal",page:25},{id:"p26-favoritos",name:"Lista de favoritos",module:"Favoritos",page:26},{id:"p27-agregar-lugar",name:"Agregar lugar",module:"Favoritos",page:27},{id:"p28-editar-lugar",name:"Editar lugar",module:"Favoritos",page:28},{id:"p29-eliminar-lugar",name:"Eliminar lugar (Modal)",module:"Favoritos",page:29},{id:"p30-mi-perfil",name:"Mi perfil",module:"Perfil & Historial",page:30},{id:"p31-editar-perfil",name:"Editar perfil",module:"Perfil & Historial",page:31},{id:"p32-notificaciones",name:"Notificaciones",module:"Perfil & Historial",page:32},{id:"p33-historial-personal",name:"Historial personal",module:"Perfil & Historial",page:33},{id:"p34-mis-reportes",name:"Mis reportes",module:"Perfil & Historial",page:34},{id:"p35-reportes-comentados",name:"Reportes comentados",module:"Perfil & Historial",page:35},{id:"p36-mis-trayectos",name:"Mis trayectos",module:"Perfil & Historial",page:36},{id:"p37-administracion",name:"Administración Hub",module:"Administración",page:37},{id:"p38-moderacion-reportes",name:"Moderación de reportes",module:"Administración",page:38},{id:"p39-estadisticas",name:"Estadísticas",module:"Administración",page:39},{id:"p40-gestion-usuarios",name:"Gestión de usuarios",module:"Administración",page:40},{id:"p41-gestion-reportes",name:"Gestión global de reportes",module:"Administración",page:41}];function S(e){const t=b.find(a=>a.id===e)||b[0];return`
    <!-- Floating Quick Screen Selector (Evaluator Tool) -->
    <aside class="fixed bottom-3 right-3 z-50 print:hidden" aria-label="Navegador de evaluación">
      <button
        id="toggle-screen-modal-btn"
        onclick="document.getElementById('screen-nav-modal').classList.toggle('hidden')"
        class="bg-slate-900/90 hover:bg-slate-900 text-white text-xs font-semibold px-3 py-2 rounded-full shadow-lg border border-slate-700 flex items-center gap-1.5 backdrop-blur-md transition-all active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-safety-blue"
        title="Abrir índice completo de las 41 pantallas"
      >
        <span class="w-2 h-2 rounded-full bg-safety-green"></span>
        <span>Pantalla P${String(t.page).padStart(2,"0")}/41</span>
        <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m18 15-6-6-6 6"/></svg>
      </button>

      <!-- Modal de Índice Rápido -->
      <div
        id="screen-nav-modal"
        class="hidden fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4"
        onclick="if(event.target === this) this.classList.add('hidden')"
      >
        <div class="bg-surface-card w-full max-w-md max-h-[85vh] rounded-xl shadow-2xl flex flex-col border border-surface-border overflow-hidden">
          <header class="p-4 border-b border-surface-border flex items-center justify-between bg-surface-canvas">
            <div>
              <h2 class="font-outfit font-bold text-base text-content-title">
                Índice de las 41 Pantallas (Figma Wireframes)
              </h2>
              <p class="text-xs text-content-muted">Navegación directa para auditoría y evaluación</p>
            </div>
            <button
              onclick="document.getElementById('screen-nav-modal').classList.add('hidden')"
              class="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700 font-bold"
              aria-label="Cerrar índice"
            >
              ✕
            </button>
          </header>

          <div class="flex-1 overflow-y-auto p-4 space-y-4">
            ${["Inicio & Seguridad","Reportes & Auth","Seguridad Personal","Favoritos","Perfil & Historial","Administración"].map(a=>{const o=b.filter(r=>r.module===a);return`
                  <div class="space-y-1.5">
                    <h3 class="text-xs font-bold text-content-muted uppercase tracking-wider px-1">
                      ${a}
                    </h3>
                    <div class="grid grid-cols-1 gap-1">
                      ${o.map(r=>{const d=r.id===e;return`
                            <a
                              href="#${r.id}"
                              onclick="document.getElementById('screen-nav-modal').classList.add('hidden')"
                              class="flex items-center justify-between px-3 py-2 rounded-md text-xs transition-colors ${d?"bg-safety-blue text-white font-bold":"bg-slate-50 hover:bg-slate-100 text-content-title border border-slate-200/60"}"
                            >
                              <span>
                                <strong>P${String(r.page).padStart(2,"0")}:</strong> ${r.name}
                              </span>
                              <span class="text-[10px] ${d?"text-white/80":"text-content-muted"}">
                                Pág. ${r.page}
                              </span>
                            </a>
                          `}).join("")}
                    </div>
                  </div>
                `}).join("")}
          </div>
        </div>
      </div>
    </aside>
  `}function g(){const e=n.getState(),t=e.notifications.filter(a=>!a.read).length;return`
    <div class="flex flex-col min-h-screen">
      <!-- Header de bienvenida -->
      <header class="bg-surface-canvas px-4 pt-5 pb-3 border-b border-surface-border">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2.5">
            <div class="w-10 h-10 rounded-full bg-safety-blue text-white flex items-center justify-center font-outfit font-bold text-lg shadow-sm">
              AV
            </div>
            <div>
              <p class="text-xs font-medium text-content-muted">Bienvenido/a</p>
              <h1 class="font-outfit font-bold text-xl text-content-title leading-tight">
                Alerta Vecinos
              </h1>
            </div>
          </div>
          <div class="flex items-center gap-2">
            <a
              href="#p32-notificaciones"
              class="relative w-10 h-10 rounded-full bg-surface-card border border-surface-border flex items-center justify-center text-content-title hover:bg-slate-100 transition-colors"
              aria-label="Ver notificaciones (${t} nuevas)"
            >
              ${s.bell("w-5 h-5 text-content-title")}
              ${t>0?'<span class="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-safety-red rounded-full ring-2 ring-white"></span>':""}
            </a>
            <a
              href="#p30-mi-perfil"
              class="w-10 h-10 rounded-full bg-slate-200 border border-slate-300 flex items-center justify-center text-slate-700 font-outfit font-semibold text-sm hover:ring-2 hover:ring-safety-blue transition-all"
              aria-label="Ver mi perfil"
            >
              ${e.user.avatar||"MR"}
            </a>
          </div>
        </div>
      </header>

      <main class="flex-1 px-4 py-4 space-y-5">
        <!-- Quick Access 2x2 Grid -->
        <section aria-labelledby="quick-access-title">
          <h2 id="quick-access-title" class="sr-only">Accesos Rápidos de Seguridad</h2>
          <div class="grid grid-cols-2 gap-3">
            ${m("Mapa de Riesgo","Zonas seguras y críticas",s.map("w-5 h-5"),"#p02-mapa-riesgo","blue")}
            ${m("Alertas Cercanas","Incidentes en tu radio",s.alertTriangle("w-5 h-5"),"#p03-alertas-cercanas","amber")}
            ${m("Paradas Seguras","Puntos iluminados y SOS",s.bus("w-5 h-5"),"#p05-paradas-seguras","green")}
            ${m("Consejos Preventivos","Recomendaciones de cuidado",s.shield("w-5 h-5"),"#p08-consejos-preventivos","amber")}
          </div>
        </section>

        <!-- Lista de Módulos Operacionales -->
        <section aria-labelledby="modules-title" class="space-y-2">
          <h2 id="modules-title" class="font-outfit font-semibold text-sm text-content-muted tracking-wider uppercase px-1">
            Servicios Comunitarios
          </h2>
          <div class="bg-surface-card border border-surface-border rounded-lg shadow-level-1 divide-y divide-surface-border overflow-hidden">
            <a
              href="#p11-reportes"
              class="flex items-center justify-between p-3.5 hover:bg-slate-50 transition-colors group"
            >
              <div class="flex items-center gap-3">
                <div class="w-9 h-9 rounded-md bg-slate-100 text-slate-700 flex items-center justify-center group-hover:bg-safety-blue/10 group-hover:text-safety-blue transition-colors">
                  ${s.fileText("w-5 h-5")}
                </div>
                <span class="font-inter font-medium text-sm text-content-title">
                  Reportes
                </span>
              </div>
              <span class="text-content-muted group-hover:text-safety-blue transition-colors">
                ${s.chevronRight("w-4 h-4")}
              </span>
            </a>

            <a
              href="#p10-numeros-emergencia"
              class="flex items-center justify-between p-3.5 hover:bg-slate-50 transition-colors group"
            >
              <div class="flex items-center gap-3">
                <div class="w-9 h-9 rounded-md bg-safety-red/10 text-safety-red flex items-center justify-center">
                  ${s.phone("w-5 h-5")}
                </div>
                <span class="font-inter font-medium text-sm text-content-title">
                  Emergencias (911 · 107 · 100)
                </span>
              </div>
              <span class="text-content-muted group-hover:text-safety-blue transition-colors">
                ${s.chevronRight("w-4 h-4")}
              </span>
            </a>

            <a
              href="#p22-seguridad-personal"
              class="flex items-center justify-between p-3.5 hover:bg-slate-50 transition-colors group"
            >
              <div class="flex items-center gap-3">
                <div class="w-9 h-9 rounded-md bg-safety-green/10 text-safety-green flex items-center justify-center">
                  ${s.navigation("w-5 h-5")}
                </div>
                <div>
                  <span class="font-inter font-medium text-sm text-content-title block">
                    Seguridad Personal
                  </span>
                  <span class="text-xs text-content-muted">Acompañamiento "Llegué Bien"</span>
                </div>
              </div>
              <span class="text-content-muted group-hover:text-safety-blue transition-colors">
                ${s.chevronRight("w-4 h-4")}
              </span>
            </a>

            <a
              href="#p26-favoritos"
              class="flex items-center justify-between p-3.5 hover:bg-slate-50 transition-colors group"
            >
              <div class="flex items-center gap-3">
                <div class="w-9 h-9 rounded-md bg-slate-100 text-slate-700 flex items-center justify-center group-hover:bg-safety-blue/10 group-hover:text-safety-blue transition-colors">
                  ${s.heart("w-5 h-5")}
                </div>
                <span class="font-inter font-medium text-sm text-content-title">
                  Favoritos
                </span>
              </div>
              <span class="text-content-muted group-hover:text-safety-blue transition-colors">
                ${s.chevronRight("w-4 h-4")}
              </span>
            </a>

            <a
              href="#p30-mi-perfil"
              class="flex items-center justify-between p-3.5 hover:bg-slate-50 transition-colors group"
            >
              <div class="flex items-center gap-3">
                <div class="w-9 h-9 rounded-md bg-slate-100 text-slate-700 flex items-center justify-center group-hover:bg-safety-blue/10 group-hover:text-safety-blue transition-colors">
                  ${s.user("w-5 h-5")}
                </div>
                <span class="font-inter font-medium text-sm text-content-title">
                  Mi Perfil
                </span>
              </div>
              <span class="text-content-muted group-hover:text-safety-blue transition-colors">
                ${s.chevronRight("w-4 h-4")}
              </span>
            </a>

            <a
              href="#p37-administracion"
              class="flex items-center justify-between p-3.5 hover:bg-indigo-50/50 transition-colors group"
            >
              <div class="flex items-center gap-3">
                <div class="w-9 h-9 rounded-md bg-slate-900 text-slate-100 flex items-center justify-center">
                  ${s.lock("w-4 h-4 text-indigo-300")}
                </div>
                <div class="flex items-center gap-2">
                  <span class="font-inter font-medium text-sm text-content-title">
                    Administración
                  </span>
                  <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-900 text-slate-100 uppercase tracking-wider">
                    Privilegiado
                  </span>
                </div>
              </div>
              <span class="text-content-muted group-hover:text-indigo-600 transition-colors">
                ${s.chevronRight("w-4 h-4")}
              </span>
            </a>
          </div>
        </section>

        <!-- Botón SOS Flotante / Acceso Rápido Ergonómico en Thumb Zone -->
        <section class="pt-2 pb-6 flex flex-col items-center justify-center">
          <a
            href="#p10-numeros-emergencia"
            class="btn-sos w-full max-w-[280px] h-14 flex items-center justify-center gap-3 px-6"
            aria-label="Botón de emergencia SOS"
          >
            ${s.siren("w-6 h-6 animate-pulse")}
            <span class="font-outfit font-bold text-lg tracking-wide uppercase">
              Botón SOS · 911
            </span>
          </a>
          <p class="text-[11px] text-content-muted text-center mt-2">
            Llamada y despacho inmediato de auxilio policial
          </p>
        </section>
      </main>
    </div>
  `}function C(){return`
    <div class="flex flex-col min-h-screen">
      ${l("Mapa de riesgo","#p01-inicio")}

      <main class="flex-1 px-4 py-4 space-y-4">
        <!-- Canvas Interactivo del Mapa de Riesgo -->
        <div class="relative w-full h-80 bg-slate-200 rounded-lg overflow-hidden border border-surface-border shadow-level-1">
          <!-- Mapa Vectorial Estilizado -->
          <svg class="w-full h-full" viewBox="0 0 400 320" xmlns="http://www.w3.org/2000/svg">
            <!-- Calles y Manzanas de fondo -->
            <rect width="400" height="320" fill="#E2E8F0"/>
            <rect x="20" y="20" width="80" height="60" rx="4" fill="#CBD5E1"/>
            <rect x="120" y="20" width="120" height="60" rx="4" fill="#CBD5E1"/>
            <rect x="260" y="20" width="120" height="60" rx="4" fill="#CBD5E1"/>
            <rect x="20" y="100" width="80" height="80" rx="4" fill="#CBD5E1"/>
            <rect x="120" y="100" width="120" height="80" rx="4" fill="#CBD5E1"/>
            <rect x="260" y="100" width="120" height="80" rx="4" fill="#CBD5E1"/>
            <rect x="20" y="200" width="80" height="90" rx="4" fill="#CBD5E1"/>
            <rect x="120" y="200" width="120" height="90" rx="4" fill="#CBD5E1"/>
            <rect x="260" y="200" width="120" height="90" rx="4" fill="#CBD5E1"/>

            <!-- Arterias Principales -->
            <line x1="0" y1="90" x2="400" y2="90" stroke="#FFFFFF" stroke-width="12"/>
            <line x1="0" y1="190" x2="400" y2="190" stroke="#FFFFFF" stroke-width="12"/>
            <line x1="110" y1="0" x2="110" y2="320" stroke="#FFFFFF" stroke-width="12"/>
            <line x1="250" y1="0" x2="250" y2="320" stroke="#FFFFFF" stroke-width="12"/>

            <!-- Zonas Semafóricas con Opacidad de Calor -->
            <!-- Zona Verde: Sector Norte / Centro -->
            <circle cx="180" cy="60" r="45" fill="#10B981" fill-opacity="0.3" stroke="#10B981" stroke-width="2"/>
            <text x="180" y="65" text-anchor="middle" font-family="Outfit" font-size="11" font-weight="bold" fill="#065F46">Zona Segura</text>

            <!-- Zona Amarilla: Sector Este -->
            <circle cx="310" cy="140" r="50" fill="#F59E0B" fill-opacity="0.3" stroke="#F59E0B" stroke-width="2"/>
            <text x="310" y="145" text-anchor="middle" font-family="Outfit" font-size="11" font-weight="bold" fill="#92400E">Precaución</text>

            <!-- Zona Roja: Sector Suroeste -->
            <circle cx="70" cy="240" r="40" fill="#EF4444" fill-opacity="0.35" stroke="#EF4444" stroke-width="2"/>
            <text x="70" y="245" text-anchor="middle" font-family="Outfit" font-size="11" font-weight="bold" fill="#991B1B">Riesgo Alto</text>

            <!-- Marcador de Posición Actual del Usuario -->
            <circle cx="180" cy="140" r="8" fill="#2563EB" stroke="#FFFFFF" stroke-width="3"/>
            <circle cx="180" cy="140" r="16" fill="#2563EB" fill-opacity="0.2"/>
          </svg>

          <!-- Floating Map Control -->
          <div class="absolute bottom-3 right-3 bg-white/95 backdrop-blur-sm rounded-md shadow-md p-1.5 flex flex-col gap-1 border border-surface-border text-content-title">
            <button class="w-8 h-8 flex items-center justify-center font-bold text-base hover:bg-slate-100 rounded" title="Acercar mapa">+</button>
            <div class="h-px bg-slate-200"></div>
            <button class="w-8 h-8 flex items-center justify-center font-bold text-base hover:bg-slate-100 rounded" title="Alejar mapa">-</button>
          </div>
        </div>

        <!-- Leyenda de Seguridad Semafórica -->
        <section class="bg-surface-card border border-surface-border rounded-lg p-4 shadow-level-1 space-y-3">
          <h2 class="font-outfit font-semibold text-base text-content-title">
            Leyenda de Seguridad:
          </h2>
          <div class="space-y-2.5">
            <div class="flex items-center gap-3">
              <span class="w-4 h-4 rounded-full bg-safety-green ring-2 ring-safety-green/20 shrink-0"></span>
              <div>
                <p class="font-inter font-medium text-sm text-content-title leading-tight">Zona Verde</p>
                <p class="text-xs text-content-muted">Área patrullada frecuentemente, buena luminaria y baja incidencia.</p>
              </div>
            </div>

            <div class="flex items-center gap-3">
              <span class="w-4 h-4 rounded-full bg-safety-amber ring-2 ring-safety-amber/20 shrink-0"></span>
              <div>
                <p class="font-inter font-medium text-sm text-content-title leading-tight">Zona Amarilla</p>
                <p class="text-xs text-content-muted">Precaución moderada. Circulación con pertenencias resguardadas.</p>
              </div>
            </div>

            <div class="flex items-center gap-3">
              <span class="w-4 h-4 rounded-full bg-safety-red ring-2 ring-safety-red/20 shrink-0"></span>
              <div>
                <p class="font-inter font-medium text-sm text-content-title leading-tight">Zona Roja</p>
                <p class="text-xs text-content-muted">Riesgo elevado. Reportes recientes sin resolver o iluminación precaria.</p>
              </div>
            </div>
          </div>
        </section>

        <!-- CTA de reporte directo desde el mapa -->
        <div class="pt-2">
          <a href="#p15-crear-reporte-intro" class="btn-primary w-full gap-2">
            ${s.plus("w-5 h-5")}
            Reportar incidente en esta zona
          </a>
        </div>
      </main>
    </div>
  `}function A(){const e=n.getState();return`
    <div class="flex flex-col min-h-screen">
      ${l("Alertas Cercanas","#p01-inicio")}

      <main class="flex-1 px-4 py-4 space-y-4">
        <!-- Banner de Radio de Búsqueda -->
        <div class="bg-surface-card border border-surface-border rounded-lg p-4 shadow-level-1 flex items-center justify-between">
          <div>
            <p class="text-xs text-content-muted">Alertas en tu zona</p>
            <p class="font-outfit font-semibold text-lg text-content-title">
              Radio actual: ${e.searchRadiusKm} km
            </p>
          </div>
          <a
            href="#p04-radio-busqueda"
            class="px-3 py-2 text-xs font-semibold text-safety-blue bg-safety-blue-subtle border border-safety-blue/20 rounded-md hover:bg-safety-blue/20 transition-colors"
          >
            Configurar radio
          </a>
        </div>

        <!-- Listado de Alertas en tu zona -->
        <section class="space-y-3" aria-labelledby="alertas-title">
          <h2 id="alertas-title" class="font-outfit font-semibold text-sm text-content-muted uppercase tracking-wider px-1">
            Incidentes Recientes Detectados
          </h2>

          <div class="space-y-3">
            <!-- Alerta 1: Actividad sospechosa -->
            <article class="p-4 bg-surface-card border-l-4 border-l-safety-amber border border-surface-border rounded-lg shadow-level-1 space-y-2">
              <div class="flex items-center justify-between">
                <span class="inline-flex items-center gap-1.5 text-xs font-semibold text-safety-amber-dark bg-safety-amber-subtle px-2.5 py-0.5 rounded-full">
                  ${s.alertTriangle("w-3.5 h-3.5")}
                  Actividad sospechosa
                </span>
                <span class="text-xs font-medium text-content-muted">
                  a 800 m
                </span>
              </div>
              <p class="text-xs text-content-body leading-relaxed">
                Personas observando cerraduras de portones sobre calle Mariano Moreno. Vecinos alertados.
              </p>
              <div class="pt-2 border-t border-slate-100 flex justify-end">
                <a
                  href="#p21-detalle-reporte?id=rep-003"
                  class="btn-secondary min-h-[38px] px-3 py-1 text-xs font-semibold"
                >
                  Ver incidente
                </a>
              </div>
            </article>

            <!-- Alerta 2: Robo -->
            <article class="p-4 bg-surface-card border-l-4 border-l-safety-red border border-surface-border rounded-lg shadow-level-1 space-y-2">
              <div class="flex items-center justify-between">
                <span class="inline-flex items-center gap-1.5 text-xs font-semibold text-safety-red-dark bg-safety-red-subtle px-2.5 py-0.5 rounded-full">
                  ${s.alertTriangle("w-3.5 h-3.5")}
                  Robo
                </span>
                <span class="text-xs font-medium text-content-muted">
                  a 500 m
                </span>
              </div>
              <p class="text-xs text-content-body leading-relaxed">
                Arrebato en parada de colectivo en Bv. San Juan. Móvil policial en camino.
              </p>
              <div class="pt-2 border-t border-slate-100 flex justify-end">
                <a
                  href="#p21-detalle-reporte?id=rep-002"
                  class="btn-secondary min-h-[38px] px-3 py-1 text-xs font-semibold"
                >
                  Ver incidente
                </a>
              </div>
            </article>
          </div>
        </section>
      </main>
    </div>
  `}function P(){const e=n.getState().searchRadiusKm,t=[.5,1,2,5];return`
    <div class="flex flex-col min-h-screen">
      ${l("Radio de búsqueda","#p03-alertas-cercanas")}

      <main class="flex-1 px-4 py-6 space-y-6">
        <div class="bg-surface-card border border-surface-border rounded-lg p-5 shadow-level-1 space-y-6">
          <div class="text-center space-y-1">
            <p class="text-xs text-content-muted">Configuración de Cobertura</p>
            <h2 id="radio-display" class="font-outfit font-bold text-2xl text-safety-blue">
              Radio seleccionado: ${e>=1?`${e} km`:`${e*1e3} m`}
            </h2>
            <p class="text-xs text-content-body">
              Solo recibirás notificaciones y avisos de incidentes que ocurran dentro de esta distancia.
            </p>
          </div>

          <!-- Selector Segmentado Táctil -->
          <div class="grid grid-cols-4 gap-2" role="radiogroup" aria-label="Seleccionar radio">
            ${t.map(a=>`
                <button
                  type="button"
                  onclick="window.selectRadius(${a})"
                  class="radio-btn flex flex-col items-center justify-center p-3 rounded-lg border text-sm font-semibold transition-all ${e===a?"bg-safety-blue text-white border-safety-blue shadow-sm":"bg-surface-card text-content-title border-slate-300 hover:bg-slate-50"}"
                  role="radio"
                  aria-checked="${e===a}"
                >
                  <span>${a>=1?`${a} km`:`${a*1e3} m`}</span>
                </button>
              `).join("")}
          </div>

          <!-- Control Deslizante de Respaldo -->
          <div class="space-y-2 pt-2">
            <label for="range-slider" class="text-xs text-content-muted flex justify-between">
              <span>Rango visual:</span>
              <span>500 m — 5 km</span>
            </label>
            <input
              id="range-slider"
              type="range"
              min="0.5"
              max="5"
              step="0.5"
              value="${e}"
              onchange="window.selectRadius(parseFloat(this.value))"
              class="w-full accent-safety-blue cursor-pointer h-2 bg-slate-200 rounded-lg"
            />
          </div>
        </div>

        <button
          onclick="window.saveRadius()"
          class="btn-primary w-full"
        >
          Guardar configuración
        </button>
      </main>
    </div>
  `}function F(){const e=n.getState().safeStops;return`
    <div class="flex flex-col min-h-screen">
      ${l("Paradas Seguras","#p01-inicio")}

      <main class="flex-1 px-4 py-4 space-y-4">
        <!-- Buscador Rápido -->
        <a
          href="#p06-buscar-paradas"
          class="w-full min-h-[48px] px-4 bg-surface-card border border-slate-300 rounded-md flex items-center justify-between text-content-placeholder hover:border-slate-400 transition-colors shadow-sm"
        >
          <span class="flex items-center gap-2 text-sm text-content-muted">
            ${s.search("w-4 h-4")}
            Buscar Parada ...
          </span>
          <span class="text-xs text-safety-blue font-semibold">Buscar</span>
        </a>

        <!-- Lista de Paradas Cercanas -->
        <section class="space-y-3" aria-labelledby="paradas-list-title">
          <h2 id="paradas-list-title" class="font-outfit font-semibold text-sm text-content-muted uppercase tracking-wider px-1">
            Paradas en tu entorno
          </h2>

          <div class="space-y-3">
            ${e.map(t=>`
                <article class="p-4 bg-surface-card border border-surface-border rounded-lg shadow-level-1 hover:border-safety-green/30 transition-all">
                  <div class="flex items-start justify-between">
                    <div class="flex items-center gap-2.5">
                      <div class="w-9 h-9 rounded-md bg-safety-green-subtle text-safety-green flex items-center justify-center shrink-0">
                        ${s.bus("w-5 h-5")}
                      </div>
                      <div>
                        <h3 class="font-outfit font-semibold text-base text-content-title leading-tight">
                          ${t.name}
                        </h3>
                        <p class="text-xs text-content-muted flex items-center gap-1 mt-0.5">
                          ${s.mapPin("w-3 h-3")} a ${t.distance}
                        </p>
                      </div>
                    </div>
                    <span class="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-safety-green-subtle text-safety-green-dark">
                      Segura
                    </span>
                  </div>

                  <p class="text-xs text-content-body mt-2">
                    ${t.address}
                  </p>

                  <div class="flex items-center justify-between pt-3 mt-3 border-t border-slate-100">
                    <span class="text-[11px] text-content-muted">
                      ${t.lines.slice(0,2).join(" · ")}
                    </span>
                    <a
                      href="#p07-ubicacion-parada?id=${t.id}"
                      class="px-3 py-1.5 text-xs font-semibold text-safety-green-dark bg-safety-green-subtle border border-safety-green/20 rounded-md hover:bg-safety-green/20 transition-colors inline-flex items-center gap-1"
                    >
                      Ver ubicación ${s.chevronRight("w-3 h-3")}
                    </a>
                  </div>
                </article>
              `).join("")}
          </div>
        </section>
      </main>
    </div>
  `}function B(){return`
    <div class="flex flex-col min-h-screen">
      ${l("Buscar Paradas","#p05-paradas-seguras")}

      <main class="flex-1 px-4 py-4 space-y-4">
        <!-- Campo de Entrada Activo -->
        <div class="relative">
          <input
            id="search-stop-input"
            type="search"
            placeholder="Buscar por nombre, línea o calle..."
            class="form-input pl-10 pr-4"
            autofocus
            oninput="window.filterStops(this.value)"
          />
          <div class="absolute left-3 top-3.5 text-content-placeholder">
            ${s.search("w-4 h-4")}
          </div>
        </div>

        <!-- Resultados Filtrados en Tiempo Real -->
        <div id="stops-results-container" class="space-y-3">
          <!-- Renderizado dinámico -->
        </div>
      </main>
    </div>
  `}function T(e="stop-01"){const t=n.getState().safeStops,a=t.find(o=>o.id===e)||t[0];return`
    <div class="flex flex-col min-h-screen">
      ${l("Ubicación de Parada","#p05-paradas-seguras")}

      <main class="flex-1 px-4 py-4 space-y-4">
        <!-- Mapa de la Parada -->
        <div class="relative w-full h-64 bg-slate-200 rounded-lg overflow-hidden border border-surface-border shadow-level-1">
          <svg class="w-full h-full" viewBox="0 0 360 260" xmlns="http://www.w3.org/2000/svg">
            <rect width="360" height="260" fill="#E2E8F0"/>
            <!-- Trazado de Calles -->
            <line x1="0" y1="130" x2="360" y2="130" stroke="#FFFFFF" stroke-width="20"/>
            <line x1="180" y1="0" x2="180" y2="260" stroke="#FFFFFF" stroke-width="20"/>

            <!-- Parada Segura con Halo Verde -->
            <circle cx="180" cy="130" r="30" fill="#10B981" fill-opacity="0.2"/>
            <circle cx="180" cy="130" r="14" fill="#10B981" stroke="#FFFFFF" stroke-width="3"/>

            <!-- Icono Bus / Parada -->
            <text x="180" y="175" text-anchor="middle" font-family="Outfit" font-size="12" font-weight="bold" fill="#065F46">
              ● ${a.name}
            </text>
          </svg>
          <div class="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded text-xs font-semibold text-safety-green-dark border border-safety-green/20">
            [ Mapa de la parada ]
          </div>
        </div>

        <!-- Ficha de Información de la Parada -->
        <section class="bg-surface-card border border-surface-border rounded-lg p-4 shadow-level-1 space-y-3">
          <div class="flex items-start justify-between">
            <div>
              <h2 class="font-outfit font-bold text-lg text-content-title">
                ● ${a.name}
              </h2>
              <p class="text-xs font-medium text-safety-green-dark mt-0.5">
                Ubicación: a ${a.distance} de tu posición actual
              </p>
            </div>
            <span class="px-2.5 py-0.5 rounded-full text-xs font-bold bg-safety-green-subtle text-safety-green-dark">
              Verificada
            </span>
          </div>

          <p class="text-xs text-content-body">
            <strong>Dirección:</strong> ${a.address}
          </p>

          <div class="space-y-1.5 pt-2 border-t border-slate-100">
            <p class="text-xs font-semibold text-content-title">Equipamiento de Protección:</p>
            <ul class="text-xs text-content-muted space-y-1">
              ${a.features.map(o=>`
                <li class="flex items-center gap-2">
                  ${s.check("w-3.5 h-3.5 text-safety-green")}
                  <span>${o}</span>
                </li>
              `).join("")}
            </ul>
          </div>
        </section>

        <!-- Botones de Acción -->
        <div class="space-y-2 pt-2">
          <a
            href="#p22-seguridad-personal"
            class="btn-primary w-full gap-2"
          >
            ${s.navigation("w-5 h-5")}
            Ir a esta parada con "Llegué Bien"
          </a>
          <a
            href="#p05-paradas-seguras"
            class="btn-secondary w-full"
          >
            Volver a la lista de paradas
          </a>
        </div>
      </main>
    </div>
  `}function E(){return`
    <div class="flex flex-col min-h-screen">
      ${l("Consejos Preventivos","#p01-inicio")}

      <main class="flex-1 px-4 py-4 space-y-4">
        <div class="bg-safety-amber-subtle border border-safety-amber/20 rounded-lg p-4 space-y-1">
          <h2 class="font-outfit font-semibold text-base text-safety-amber-dark flex items-center gap-2">
            ${s.shield("w-5 h-5")}
            Consejos de prevención barrial
          </h2>
          <p class="text-xs text-safety-amber-dark/80">
            Pautas diseñadas por comités vecinales y personal de seguridad ciudadana.
          </p>
        </div>

        <section class="space-y-3">
          <article class="p-4 bg-surface-card border border-surface-border rounded-lg shadow-level-1 space-y-1.5">
            <h3 class="font-outfit font-semibold text-sm text-content-title">
              1. Evitá circular por zonas poco iluminadas
            </h3>
            <p class="text-xs text-content-body leading-relaxed">
              Durante la noche, optá siempre por corredores comerciales o calles con luminaria LED activa, aun cuando implique caminar unas cuadras adicionales.
            </p>
          </article>

          <article class="p-4 bg-surface-card border border-surface-border rounded-lg shadow-level-1 space-y-1.5">
            <h3 class="font-outfit font-semibold text-sm text-content-title">
              2. Mantené tus pertenencias a la vista
            </h3>
            <p class="text-xs text-content-body leading-relaxed">
              En paradas de transporte público o zonas de alto tránsito, evitá manipular el teléfono celular de forma descuidada.
            </p>
          </article>

          <article class="p-4 bg-surface-card border border-surface-border rounded-lg shadow-level-1 space-y-1.5">
            <h3 class="font-outfit font-semibold text-sm text-content-title">
              3. Compartí tu ubicación al viajar
            </h3>
            <p class="text-xs text-content-body leading-relaxed">
              Utilizá el módulo "Llegué Bien" para que un contacto de confianza conozca tu trayecto en tiempo real.
            </p>
          </article>
        </section>

        <!-- Accesos Directos a Recomendaciones y Emergencias -->
        <div class="space-y-2 pt-2">
          <a
            href="#p09-recomendaciones"
            class="btn-primary w-full gap-2"
          >
            Ver más recomendaciones
          </a>
          <a
            href="#p10-numeros-emergencia"
            class="btn-secondary w-full text-safety-red border-safety-red/30 hover:bg-safety-red-subtle gap-2"
          >
            ${s.phone("w-4 h-4 text-safety-red")}
            Números de emergencia
          </a>
        </div>
      </main>
    </div>
  `}function L(){return`
    <div class="flex flex-col min-h-screen">
      ${l("Recomendaciones","#p08-consejos-preventivos")}

      <main class="flex-1 px-4 py-4 space-y-4">
        <section class="bg-surface-card border border-surface-border rounded-lg p-5 shadow-level-1 space-y-4">
          <h2 class="font-outfit font-bold text-lg text-content-title border-b border-slate-100 pb-2">
            Recomendaciones de Autocuidado
          </h2>

          <div class="space-y-3">
            <div class="flex items-start gap-3">
              <span class="w-6 h-6 rounded-full bg-safety-blue-subtle text-safety-blue font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                ✓
              </span>
              <div>
                <h3 class="font-outfit font-semibold text-sm text-content-title">Evitá zonas poco iluminadas</h3>
                <p class="text-xs text-content-muted leading-relaxed">Buscá siempre transitar por paradas seguras monitoreadas por cámaras.</p>
              </div>
            </div>

            <div class="flex items-start gap-3">
              <span class="w-6 h-6 rounded-full bg-safety-blue-subtle text-safety-blue font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                ✓
              </span>
              <div>
                <h3 class="font-outfit font-semibold text-sm text-content-title">Mantené tus pertenencias a la vista</h3>
                <p class="text-xs text-content-muted leading-relaxed">Llevá bolsos y mochilas hacia adelante en transportes concurridos.</p>
              </div>
            </div>

            <div class="flex items-start gap-3">
              <span class="w-6 h-6 rounded-full bg-safety-blue-subtle text-safety-blue font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                ✓
              </span>
              <div>
                <h3 class="font-outfit font-semibold text-sm text-content-title">Compartí tu ubicación al viajar</h3>
                <p class="text-xs text-content-muted leading-relaxed">Avisá a un familiar o contacto de seguridad antes de salir.</p>
              </div>
            </div>

            <div class="flex items-start gap-3">
              <span class="w-6 h-6 rounded-full bg-safety-blue-subtle text-safety-blue font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                ✓
              </span>
              <div>
                <h3 class="font-outfit font-semibold text-sm text-content-title">Verificá el entorno antes de ingresar a tu hogar</h3>
                <p class="text-xs text-content-muted leading-relaxed">Tené las llaves preparadas y observá que no haya movimientos inusuales.</p>
              </div>
            </div>
          </div>
        </section>

        <a href="#p08-consejos-preventivos" class="btn-secondary w-full">
          Volver a consejos
        </a>
      </main>
    </div>
  `}function I(){const e=[{title:"Policía",number:"911",desc:"Atención ciudadana y despacho de patrulleros",color:"red"},{title:"Ambulancia (SAME / Salud)",number:"107",desc:"Urgencias médicas y emergentología",color:"blue"},{title:"Bomberos",number:"100",desc:"Incendios, rescates y siniestros viales",color:"amber"},{title:"Defensa Civil",number:"103",desc:"Tormentas, caídas de árboles y cables",color:"blue"},{title:"Atención a la Mujer",number:"144",desc:"Línea nacional para situaciones de violencia",color:"blue"}];return`
    <div class="flex flex-col min-h-screen">
      ${l("Números de emergencia","#p01-inicio")}

      <main class="flex-1 px-4 py-4 space-y-4">
        <div class="bg-safety-red-subtle border border-safety-red/20 rounded-lg p-3.5 flex items-center gap-3">
          <div class="w-10 h-10 rounded-full bg-safety-red text-white flex items-center justify-center shrink-0 font-bold">
            SOS
          </div>
          <div>
            <h2 class="font-outfit font-bold text-sm text-safety-red-dark">
              Contactos de emergencia oficial
            </h2>
            <p class="text-xs text-safety-red-dark/80">
              Llamada telefónica directa sin costo desde cualquier dispositivo.
            </p>
          </div>
        </div>

        <section class="space-y-3" aria-label="Lista de teléfonos de emergencia">
          ${e.map(t=>`
              <div class="p-4 bg-surface-card border border-surface-border rounded-lg shadow-level-1 flex items-center justify-between">
                <div>
                  <h3 class="font-outfit font-bold text-base text-content-title">
                    ${t.title} · <span class="text-safety-blue">${t.number}</span>
                  </h3>
                  <p class="text-xs text-content-muted mt-0.5">
                    ${t.desc}
                  </p>
                </div>
                <a
                  href="tel:${t.number}"
                  class="btn-primary min-h-[44px] px-4 py-2 gap-1.5 shrink-0 ml-3"
                  aria-label="Llamar a ${t.title} al ${t.number}"
                >
                  ${s.phone("w-4 h-4")}
                  Llamar
                </a>
              </div>
            `).join("")}
        </section>
      </main>
    </div>
  `}function M(){return`
    <div class="flex flex-col min-h-screen">
      ${l("Reportes","#p01-inicio")}

      <main class="flex-1 px-4 py-8 flex flex-col justify-center space-y-6">
        <div class="text-center space-y-2">
          <div class="w-16 h-16 rounded-full bg-safety-blue-subtle text-safety-blue flex items-center justify-center mx-auto shadow-sm">
            ${s.fileText("w-8 h-8")}
          </div>
          <h2 class="font-outfit font-bold text-2xl text-content-title">
            Gestión de Reportes
          </h2>
          <p class="text-sm text-content-body max-w-xs mx-auto">
            Notificá incidentes a tus vecinos o consultá las alertas reportadas en la comunidad.
          </p>
        </div>

        <div class="space-y-3 pt-4">
          <a
            href="#p15-crear-reporte-intro"
            class="btn-primary w-full py-4 text-base font-semibold gap-2 shadow-md"
          >
            ${s.plus("w-5 h-5")}
            Crear reporte
          </a>

          <a
            href="#p12-reportes-publicos"
            class="btn-secondary w-full py-4 text-base font-semibold gap-2"
          >
            ${s.search("w-5 h-5 text-content-muted")}
            Consultar reportes públicos
          </a>
        </div>
      </main>
    </div>
  `}function D(){const e=n.getState(),t=e.reportFilter;let a=e.reports;return t.category&&t.category!=="Todas"&&(a=a.filter(o=>o.category===t.category)),t.status&&t.status!=="Todos"&&(a=a.filter(o=>o.status===t.status)),`
    <div class="flex flex-col min-h-screen">
      ${l("Reportes Públicos","#p11-reportes",{rightHtml:`
          <a
            href="#p13-filtrar-reportes"
            class="px-2.5 py-1.5 text-xs font-semibold text-safety-blue bg-safety-blue-subtle border border-safety-blue/20 rounded-md hover:bg-safety-blue/20 transition-colors flex items-center gap-1"
            aria-label="Filtrar lista de reportes"
          >
            ${s.filter("w-3.5 h-3.5")}
            Filtrar
          </a>
        `})}

      <main class="flex-1 px-4 py-4 space-y-4">
        <!-- Barra de estado de filtros activos -->
        <div class="flex items-center justify-between text-xs text-content-muted px-1">
          <span>Mostrando ${a.length} reportes en tu radio</span>
          ${t.category!=="Todas"||t.status!=="Todos"?'<button onclick="window.clearFilters()" class="text-safety-blue hover:underline font-semibold">Limpiar filtros</button>':""}
        </div>

        <!-- Lista de Tarjetas de Reporte -->
        <section class="space-y-3" aria-label="Lista de reportes públicos">
          ${a.length>0?a.map(o=>R(o)).join(""):`
              <div class="p-8 text-center bg-surface-card border border-surface-border rounded-lg shadow-level-1 space-y-3">
                <div class="w-12 h-12 rounded-full bg-slate-100 text-content-muted flex items-center justify-center mx-auto">
                  ${s.fileText("w-6 h-6")}
                </div>
                <p class="font-outfit font-semibold text-base text-content-title">No hay reportes con estos filtros</p>
                <p class="text-xs text-content-muted">Probá ampliando el radio o seleccionando todas las categorías.</p>
                <button onclick="window.clearFilters()" class="btn-secondary text-xs min-h-[40px] px-4">Restablecer filtros</button>
              </div>
            `}
        </section>

        <!-- Botón Flotante / Crear Reporte -->
        <div class="pt-4">
          <a href="#p15-crear-reporte-intro" class="btn-primary w-full gap-2">
            ${s.plus("w-5 h-5")}
            Crear nuevo reporte
          </a>
        </div>
      </main>
    </div>
  `}function z(){const e=n.getState().reportFilter,t=["Robo","Actividad Sospechosa","Accidente","Vandalismo","Incendio","Otro"];return`
    <div class="flex flex-col min-h-screen">
      ${l("Filtrar Reportes","#p12-reportes-publicos")}

      <main class="flex-1 px-4 py-4 space-y-5">
        <form id="filter-form" onsubmit="window.applyFilters(event)" class="space-y-5">
          <!-- Cercanía / Radio -->
          <div class="bg-surface-card border border-surface-border rounded-lg p-4 shadow-level-1 space-y-2">
            <label class="font-outfit font-semibold text-sm text-content-title block">
              Cercanía máxima: <span id="filter-km-label" class="text-safety-blue font-bold">${e.radiusKm} km</span>
            </label>
            <input
              type="range"
              min="0.5"
              max="5"
              step="0.5"
              value="${e.radiusKm}"
              id="filter-radius-slider"
              oninput="document.getElementById('filter-km-label').textContent = this.value + ' km'"
              class="w-full accent-safety-blue cursor-pointer h-2 bg-slate-200 rounded-lg"
            />
            <div class="flex justify-between text-[11px] text-content-muted">
              <span>500 m</span>
              <span>2 km</span>
              <span>5 km</span>
            </div>
          </div>

          <!-- Categoría -->
          <div class="bg-surface-card border border-surface-border rounded-lg p-4 shadow-level-1 space-y-2">
            <label for="filter-category" class="font-outfit font-semibold text-sm text-content-title block">
              Categoría
            </label>
            <select
              id="filter-category"
              class="form-input bg-surface-card"
            >
              <option value="Todas" ${e.category==="Todas"?"selected":""}>Todas las categorías</option>
              ${t.map(a=>`
                  <option value="${a}" ${e.category===a?"selected":""}>${a}</option>
                `).join("")}
            </select>
          </div>

          <!-- Estado del Reporte -->
          <div class="bg-surface-card border border-surface-border rounded-lg p-4 shadow-level-1 space-y-2">
            <label for="filter-status" class="font-outfit font-semibold text-sm text-content-title block">
              Estado del reporte
            </label>
            <select
              id="filter-status"
              class="form-input bg-surface-card"
            >
              <option value="Todos" ${e.status==="Todos"?"selected":""}>Todos los estados</option>
              <option value="Pendiente" ${e.status==="Pendiente"?"selected":""}>Pendiente</option>
              <option value="Verificado" ${e.status==="Verificado"?"selected":""}>Verificado</option>
              <option value="Resuelto" ${e.status==="Resuelto"?"selected":""}>Resuelto</option>
            </select>
          </div>

          <!-- Botones de Acción -->
          <div class="space-y-2 pt-2">
            <button type="submit" class="btn-primary w-full">
              Aplicar filtros
            </button>
            <button
              type="button"
              onclick="window.clearFilters()"
              class="btn-secondary w-full"
            >
              Limpiar filtros
            </button>
          </div>
        </form>
      </main>
    </div>
  `}function V(){return`
    <div class="flex flex-col min-h-screen">
      ${l("Iniciar sesión","#p11-reportes")}

      <main class="flex-1 px-4 py-6 flex flex-col justify-center space-y-6">
        <div class="text-center space-y-2">
          <div class="w-14 h-14 rounded-full bg-safety-blue text-white font-outfit font-bold text-2xl flex items-center justify-center mx-auto shadow-md">
            AV
          </div>
          <h2 class="font-outfit font-bold text-2xl text-content-title">
            Alerta Vecinos
          </h2>
          <p class="text-xs text-content-body max-w-xs mx-auto">
            Para crear un reporte logueate o registrate en la red barrial comunitaria.
          </p>
        </div>

        <form id="login-form" onsubmit="window.handleLogin(event)" class="bg-surface-card border border-surface-border rounded-lg p-5 shadow-level-1 space-y-4">
          <div class="space-y-1">
            <label for="login-email" class="text-xs font-semibold text-content-title">
              Email
            </label>
            <input
              id="login-email"
              type="email"
              required
              value="correo@ejemplo.com"
              placeholder="tu.correo@ejemplo.com"
              class="form-input"
            />
          </div>

          <div class="space-y-1">
            <label for="login-password" class="text-xs font-semibold text-content-title">
              Contraseña
            </label>
            <input
              id="login-password"
              type="password"
              required
              value="************"
              placeholder="Ingresá tu clave"
              class="form-input"
            />
          </div>

          <div class="pt-2 space-y-2">
            <button type="submit" class="btn-primary w-full">
              Iniciar Sesión
            </button>
            <button
              type="button"
              onclick="alert('Función de registro simulada. Podés continuar directamente iniciando sesión.')"
              class="btn-secondary w-full"
            >
              Registrate
            </button>
          </div>
        </form>
      </main>
    </div>
  `}function N(){return`
    <div class="flex flex-col min-h-screen">
      ${l("Crear Reporte","#p11-reportes")}

      <main class="flex-1 px-4 py-8 flex flex-col justify-center text-center space-y-6">
        <div class="w-20 h-20 rounded-full bg-safety-amber-subtle text-safety-amber border border-safety-amber/20 flex items-center justify-center mx-auto">
          ${s.alertTriangle("w-10 h-10")}
        </div>

        <div class="space-y-2">
          <span class="text-xs font-bold text-safety-blue uppercase tracking-wider">Paso 1 de 4</span>
          <h2 class="font-outfit font-bold text-2xl text-content-title">
            ¿Qué querés reportar?
          </h2>
          <p class="text-sm text-content-body max-w-xs mx-auto">
            Seleccioná un tipo de incidente para comenzar a documentar lo sucedido y advertir a tu cuadrante.
          </p>
        </div>

        <div class="pt-4">
          <a
            href="#p16-tipo-reporte"
            class="btn-primary w-full py-4 text-base font-semibold gap-2 shadow-md"
          >
            Seleccionar tipo de reporte ${s.chevronRight("w-5 h-5")}
          </a>
        </div>
      </main>
    </div>
  `}function q(){const e=[{label:"Robo",desc:"Asalto, arrebato o sustracción",icon:s.alertTriangle("w-6 h-6 text-safety-amber")},{label:"Actividad Sospechosa",desc:"Merodeo o conductas anómalas",icon:s.shield("w-6 h-6 text-safety-blue")},{label:"Accidente",desc:"Colisión vehicular o siniestro vial",icon:s.alertTriangle("w-6 h-6 text-safety-red")},{label:"Vandalismo",desc:"Daño a luminarias, plazas o frentes",icon:s.alertTriangle("w-6 h-6 text-safety-amber")},{label:"Incendio",desc:"Fuego en pastizales, casas o autos",icon:s.siren("w-6 h-6 text-safety-red")},{label:"Otro",desc:"Problemas de servicios u otros hechos",icon:s.info("w-6 h-6 text-slate-600")}],t=n.getState().newReportDraft.category||"Accidente";return`
    <div class="flex flex-col min-h-screen">
      ${l("Tipo de reporte","#p15-crear-reporte-intro",{subtitle:"Paso 2 de 4"})}

      <main class="flex-1 px-4 py-4 space-y-4">
        <div class="space-y-1">
          <h2 class="font-outfit font-bold text-lg text-content-title">
            Crear nuevo reporte
          </h2>
          <p class="text-xs text-content-muted">
            Elegí la categoría que mejor describa la situación:
          </p>
        </div>

        <!-- Cuadrícula 2 columnas de categorías -->
        <div class="grid grid-cols-2 gap-3" role="radiogroup" aria-label="Categorías de reporte">
          ${e.map(a=>`
              <button
                type="button"
                onclick="window.selectCategory('${a.label}')"
                class="category-card p-3.5 bg-surface-card border rounded-lg shadow-level-1 flex flex-col justify-between text-left transition-all ${t===a.label?"border-safety-blue ring-2 ring-safety-blue/20 bg-safety-blue-subtle/30":"border-surface-border hover:border-slate-400"}"
                role="radio"
                aria-checked="${t===a.label}"
              >
                <div class="w-10 h-10 rounded-md bg-white border border-slate-200 flex items-center justify-center mb-2 shadow-xs">
                  ${a.icon}
                </div>
                <div>
                  <h3 class="font-outfit font-semibold text-sm text-content-title leading-tight">
                    ${a.label}
                  </h3>
                  <p class="text-[11px] text-content-muted mt-0.5 line-clamp-1">
                    ${a.desc}
                  </p>
                </div>
              </button>
            `).join("")}
        </div>

        <div class="pt-4">
          <a
            href="#p17-completar-reporte"
            class="btn-primary w-full gap-2"
          >
            Continuar ${s.chevronRight("w-5 h-5")}
          </a>
        </div>
      </main>
    </div>
  `}function H(){const e=n.getState().newReportDraft,t=e.category||"Accidente";return`
    <div class="flex flex-col min-h-screen">
      ${l("Completar Reporte","#p16-tipo-reporte",{subtitle:"Paso 3 de 4"})}

      <main class="flex-1 px-4 py-4 space-y-4">
        <!-- Ficha de tipo seleccionado -->
        <div class="bg-surface-card border border-surface-border rounded-lg p-3.5 shadow-level-1 flex items-center justify-between">
          <div>
            <span class="text-xs text-content-muted">Tipo de reporte:</span>
            <p class="font-outfit font-bold text-base text-safety-blue">“${t}”</p>
          </div>
          <a href="#p16-tipo-reporte" class="text-xs font-semibold text-safety-blue hover:underline">
            Cambiar
          </a>
        </div>

        <form id="complete-report-form" onsubmit="window.submitReportDetails(event)" class="space-y-4">
          <!-- Ubicación -->
          <div class="space-y-1">
            <label for="report-location" class="text-xs font-semibold text-content-title flex items-center gap-1">
              ${s.mapPin("w-3.5 h-3.5 text-safety-blue")}
              Ubicación del incidente
            </label>
            <div class="relative">
              <input
                id="report-location"
                type="text"
                required
                value="${e.location||"Av. Colón y Jujuy, Centro"}"
                placeholder="Ingresá la calle o esquina..."
                class="form-input pr-20"
              />
              <button
                type="button"
                onclick="document.getElementById('report-location').value = 'Ubicación GPS detectada'"
                class="absolute right-2 top-2 px-2 py-1 text-[11px] font-semibold text-safety-blue bg-safety-blue-subtle rounded border border-safety-blue/20"
              >
                Mi GPS
              </button>
            </div>
          </div>

          <!-- Descripción -->
          <div class="space-y-1">
            <label for="report-desc" class="text-xs font-semibold text-content-title">
              Descripción de lo sucedido
            </label>
            <textarea
              id="report-desc"
              required
              rows="3"
              placeholder="Escribí lo sucedido con el mayor detalle posible..."
              class="form-input py-2.5 min-h-[90px]"
            >${e.description||"Colisión entre dos vehículos en esquina semafórica. No hay heridos graves aparentes."}</textarea>
          </div>

          <!-- Adjuntar Archivo / Multimedia -->
          <div class="space-y-1">
            <label class="text-xs font-semibold text-content-title">
              Foto / Video (Opcional)
            </label>
            <div class="border-2 border-dashed border-slate-300 rounded-lg p-3 text-center bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer" onclick="alert('Carga de imagen simulada activada.')">
              <div class="flex items-center justify-center gap-2 text-xs font-semibold text-safety-blue">
                ${s.camera("w-4 h-4")}
                <span>Adjuntar Archivo +</span>
              </div>
              <p class="text-[11px] text-content-muted mt-0.5">Formatos JPG, PNG o MP4 hasta 25 MB</p>
            </div>
          </div>

          <!-- Reporte Anónimo Switch -->
          <div class="bg-surface-card border border-surface-border rounded-lg p-3.5 shadow-level-1 flex items-center justify-between">
            <div>
              <p class="font-outfit font-semibold text-sm text-content-title">Reporte anónimo</p>
              <p class="text-xs text-content-muted">Tu nombre no será visible para otros vecinos.</p>
            </div>
            <label class="relative inline-flex items-center cursor-pointer">
              <input
                id="report-anonymous-toggle"
                type="checkbox"
                ${e.isAnonymous?"checked":""}
                class="sr-only peer"
              />
              <div class="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-safety-blue"></div>
            </label>
          </div>

          <!-- Botones de Acción -->
          <div class="space-y-2 pt-2">
            <button type="submit" class="btn-primary w-full gap-2">
              Continuar al resumen ${s.chevronRight("w-5 h-5")}
            </button>
            <a href="#p11-reportes" class="btn-secondary w-full">
              Cancelar
            </a>
          </div>
        </form>
      </main>
    </div>
  `}function O(){const e=n.getState().newReportDraft,t=e.category||"Accidente",a=e.location||"Av. Colón y Jujuy, Centro",o=e.description||"Colisión entre dos vehículos en esquina semafórica.",r=e.isAnonymous?"Sí":"No";return`
    <div class="flex flex-col min-h-screen">
      ${l("Resumen Reporte","#p17-completar-reporte",{subtitle:"Paso 4 de 4 · Verificación"})}

      <main class="flex-1 px-4 py-4 space-y-4">
        <div class="bg-surface-card border border-surface-border rounded-lg p-4 shadow-level-1 space-y-3">
          <div class="flex items-center justify-between border-b border-slate-100 pb-2">
            <span class="text-xs text-content-muted">Tipo de reporte:</span>
            <span class="font-outfit font-bold text-base text-safety-blue">“${t}”</span>
          </div>

          <div class="grid grid-cols-2 gap-2 text-xs py-1 border-b border-slate-100">
            <div>
              <p class="text-content-muted">Fecha y hora:</p>
              <p class="font-semibold text-content-title">18/08/2026 - 19:32</p>
            </div>
            <div>
              <p class="text-content-muted">Estado inicial:</p>
              <p class="font-semibold text-safety-amber-dark">Pendiente</p>
            </div>
          </div>

          <div class="py-1 border-b border-slate-100 text-xs">
            <p class="text-content-muted">Número de tracking sugerido:</p>
            <p class="font-mono font-bold text-sm text-content-title">REP-000123</p>
          </div>

          <div class="py-1 border-b border-slate-100 text-xs">
            <p class="text-content-muted">Ubicación:</p>
            <p class="font-semibold text-content-title">${a}</p>
          </div>

          <div class="py-1 border-b border-slate-100 text-xs">
            <p class="text-content-muted">Descripción:</p>
            <p class="text-content-body mt-0.5">${o}</p>
          </div>

          <div class="flex justify-between items-center text-xs pt-1">
            <span class="text-content-muted">Reporte anónimo:</span>
            <span class="font-semibold text-content-title">${r}</span>
          </div>
        </div>

        <!-- Enlaces auxiliares de edición y emergencia -->
        <div class="flex items-center justify-between px-1 text-xs">
          <a href="#p17-completar-reporte" class="text-safety-blue font-semibold hover:underline">
            [ Editar reporte ]
          </a>
          <a href="#p10-numeros-emergencia" class="text-safety-red font-semibold hover:underline">
            [ Emergencias ]
          </a>
        </div>

        <!-- Botones de Acción -->
        <div class="space-y-2 pt-2">
          <a
            href="#p19-confirmar-reporte"
            class="btn-primary w-full gap-2 shadow-md"
          >
            Confirmar Reporte
          </a>
          <a href="#p11-reportes" class="btn-secondary w-full">
            Cancelar
          </a>
        </div>
      </main>
    </div>
  `}function G(){return`
    <div class="flex flex-col min-h-screen">
      ${l("Confirmar reporte","#p18-resumen-reporte")}

      <main class="flex-1 px-4 py-8 flex flex-col justify-center space-y-6">
        <div class="p-6 bg-surface-card border border-surface-border rounded-xl shadow-level-2 text-center space-y-4">
          <div class="w-16 h-16 rounded-full bg-safety-amber-subtle text-safety-amber flex items-center justify-center mx-auto">
            ${s.alertTriangle("w-8 h-8")}
          </div>

          <div class="space-y-2">
            <h2 class="font-outfit font-bold text-xl text-content-title">
              ¿Estás seguro de que querés enviar este reporte?
            </h2>
            <p class="text-xs text-content-body max-w-xs mx-auto">
              Revisá los datos antes de confirmar. Tu reporte será visible para los vecinos y el equipo de moderación comunitaria.
            </p>
          </div>

          <div class="space-y-2 pt-2">
            <button
              onclick="window.executeConfirmReport()"
              class="btn-primary w-full font-semibold"
            >
              Sí, confirmar
            </button>
            <a
              href="#p18-resumen-reporte"
              class="btn-secondary w-full"
            >
              No, volver al resumen
            </a>
          </div>
        </div>
      </main>
    </div>
  `}function U(){return`
    <div class="flex flex-col min-h-screen">
      ${l("Reporte Exitoso","#p01-inicio")}

      <main class="flex-1 px-4 py-8 flex flex-col justify-center text-center space-y-6">
        <div class="w-20 h-20 rounded-full bg-safety-green text-white flex items-center justify-center mx-auto shadow-level-1">
          ${s.check("w-10 h-10")}
        </div>

        <div class="space-y-2">
          <h2 class="font-outfit font-bold text-2xl text-content-title">
            Reporte creado con éxito
          </h2>
          <p class="text-xs text-content-body max-w-xs mx-auto">
            Se generó el seguimiento correspondiente y la alerta fue distribuida en tu radio barrial.
          </p>
        </div>

        <div class="space-y-2 pt-4">
          <a
            href="#p21-detalle-reporte?id=rep-001"
            class="btn-primary w-full gap-2 shadow-sm"
          >
            Ver reporte creado
          </a>
          <a
            href="#p15-crear-reporte-intro"
            class="btn-secondary w-full"
          >
            Crear otro reporte
          </a>
          <a
            href="#p01-inicio"
            class="btn-secondary w-full border-transparent hover:bg-slate-100"
          >
            Volver al inicio
          </a>
        </div>
      </main>
    </div>
  `}function J(e){const t=n.getState().reports,a=t.find(o=>o.id===e||o.trackingId===e)||t[0];return`
    <div class="flex flex-col min-h-screen">
      ${l("Detalle del reporte","#p12-reportes-publicos")}

      <main class="flex-1 px-4 py-4 space-y-4">
        <!-- Mapa de Localización -->
        <div class="relative w-full h-44 bg-slate-200 rounded-lg overflow-hidden border border-surface-border shadow-level-1">
          <svg class="w-full h-full" viewBox="0 0 360 180" xmlns="http://www.w3.org/2000/svg">
            <rect width="360" height="180" fill="#E2E8F0"/>
            <line x1="0" y1="90" x2="360" y2="90" stroke="#FFFFFF" stroke-width="16"/>
            <line x1="180" y1="0" x2="180" y2="180" stroke="#FFFFFF" stroke-width="16"/>
            <circle cx="180" cy="90" r="18" fill="#EF4444" fill-opacity="0.25"/>
            <circle cx="180" cy="90" r="8" fill="#EF4444" stroke="#FFFFFF" stroke-width="2"/>
          </svg>
          <div class="absolute bottom-2 left-2 bg-white/95 px-2 py-0.5 rounded text-[11px] font-semibold text-content-title shadow-xs">
            ${a.location}
          </div>
        </div>

        <!-- Ficha de Detalles del Reporte -->
        <article class="bg-surface-card border border-surface-border rounded-lg p-4 shadow-level-1 space-y-3">
          <div class="flex items-start justify-between border-b border-slate-100 pb-2">
            <div>
              <span class="text-xs text-content-muted">Categoría:</span>
              <h2 class="font-outfit font-bold text-lg text-content-title leading-tight">
                ${a.category}
              </h2>
            </div>
            <div>
              ${c(a.status)}
            </div>
          </div>

          <div class="grid grid-cols-2 gap-2 text-xs py-1 border-b border-slate-100">
            <div>
              <p class="text-content-muted">Fecha y hora:</p>
              <p class="font-semibold text-content-title">${a.timestamp}</p>
            </div>
            <div>
              <p class="text-content-muted">Código Tracking:</p>
              <p class="font-mono font-bold text-safety-blue">${a.trackingId}</p>
            </div>
          </div>

          <div class="py-1 border-b border-slate-100 text-xs">
            <p class="text-content-muted font-medium">Descripción:</p>
            <p class="text-content-body mt-1 leading-relaxed">${a.description}</p>
          </div>

          <div class="flex items-center justify-between text-xs pt-1">
            <div>
              <span class="text-content-muted">Autor:</span>
              <span class="font-semibold text-content-title ml-1">${a.author}</span>
            </div>
            <div>
              <span class="text-content-muted">Anónimo:</span>
              <span class="font-semibold text-content-title ml-1">${a.isAnonymous?"Sí":"No"}</span>
            </div>
          </div>
        </article>

        <a href="#p01-inicio" class="btn-primary w-full">
          Ir al inicio
        </a>
      </main>
    </div>
  `}let u="Casa",f="Juan Pérez";function Z(){const e=n.getState().favorites;return`
    <div class="flex flex-col min-h-screen">
      ${l("Seguridad Personal","#p01-inicio")}

      <main class="flex-1 px-4 py-4 space-y-4">
        <div class="bg-safety-green-subtle border border-safety-green/20 rounded-lg p-3.5 space-y-1">
          <h2 class="font-outfit font-semibold text-base text-safety-green-dark flex items-center gap-2">
            ${s.navigation("w-5 h-5")}
            Preparar Trayecto
          </h2>
          <p class="text-xs text-safety-green-dark/80">
            Acompañamiento digital "Llegué Bien". Tu contacto de seguridad recibirá alertas automáticas si te demorás.
          </p>
        </div>

        <!-- Selector de Destino -->
        <div class="bg-surface-card border border-surface-border rounded-lg p-4 shadow-level-1 space-y-2">
          <label class="text-xs font-semibold text-content-muted uppercase tracking-wider block">
            Destino
          </label>
          <a
            href="#p23-seleccionar-destino"
            class="w-full min-h-[48px] px-3.5 bg-slate-50 border border-slate-300 rounded-md flex items-center justify-between hover:bg-slate-100 transition-colors"
          >
            <div class="flex items-center gap-2 text-sm font-semibold text-content-title">
              ${s.mapPin("w-4 h-4 text-safety-blue")}
              <span id="display-selected-destination">${u}</span>
            </div>
            <span class="text-xs text-safety-blue font-semibold">Cambiar</span>
          </a>
        </div>

        <!-- Selector de Contacto de Seguridad -->
        <div class="bg-surface-card border border-surface-border rounded-lg p-4 shadow-level-1 space-y-2">
          <label class="text-xs font-semibold text-content-muted uppercase tracking-wider block">
            Contacto de seguridad
          </label>
          <a
            href="#p24-elegir-contacto"
            class="w-full min-h-[48px] px-3.5 bg-slate-50 border border-slate-300 rounded-md flex items-center justify-between hover:bg-slate-100 transition-colors"
          >
            <div class="flex items-center gap-2 text-sm font-semibold text-content-title">
              ${s.user("w-4 h-4 text-safety-green")}
              <span id="display-selected-contact">${f}</span>
            </div>
            <span class="text-xs text-safety-blue font-semibold">Cambiar</span>
          </a>
        </div>

        <!-- Chips de Lugares Frecuentes -->
        <div class="bg-surface-card border border-surface-border rounded-lg p-4 shadow-level-1 space-y-2.5">
          <label class="text-xs font-semibold text-content-muted uppercase tracking-wider block">
            Lugares frecuentes
          </label>
          <div class="flex flex-wrap gap-2">
            ${e.map(t=>`
                <button
                  type="button"
                  onclick="window.quickSelectDestination('${t.name}')"
                  class="px-3.5 py-2 rounded-full border text-xs font-semibold flex items-center gap-1.5 transition-all ${u===t.name?"bg-safety-blue text-white border-safety-blue shadow-xs":"bg-white text-content-title border-slate-300 hover:bg-slate-50"}"
                >
                  ${s.heart("w-3.5 h-3.5")}
                  ${t.name}
                </button>
              `).join("")}
          </div>
        </div>

        <!-- Botón Iniciar Trayecto -->
        <div class="pt-4">
          <button
            onclick="window.startSafetyTrip('${u}', '${f}')"
            class="btn-primary w-full py-4 text-base font-semibold gap-2 shadow-md"
          >
            ${s.navigation("w-5 h-5")}
            Iniciar Trayecto
          </button>
        </div>
      </main>
    </div>
  `}function K(){const e=n.getState().favorites;return`
    <div class="flex flex-col min-h-screen">
      ${l("Seleccionar Destino","#p22-seguridad-personal")}

      <main class="flex-1 px-4 py-4 space-y-4">
        <!-- Ubicación actual detectada -->
        <div class="p-3 bg-slate-100 border border-slate-200 rounded-md flex items-center gap-2 text-xs text-content-muted">
          <span class="w-2.5 h-2.5 rounded-full bg-safety-blue ring-2 ring-safety-blue/20"></span>
          <span>Origen: <strong>Ubicación actual</strong> (GPS Activo)</span>
        </div>

        <!-- Campo de Búsqueda -->
        <div class="space-y-1">
          <label for="destination-search-input" class="text-xs font-semibold text-content-title">
            Destino
          </label>
          <div class="relative">
            <input
              id="destination-search-input"
              type="text"
              placeholder="Buscar lugar, dirección o parada..."
              value="${u}"
              class="form-input pl-10"
              autofocus
            />
            <div class="absolute left-3 top-3.5 text-content-placeholder">
              ${s.search("w-4 h-4")}
            </div>
          </div>
        </div>

        <!-- Favoritos Sugeridos -->
        <div class="space-y-2 pt-2">
          <p class="text-xs font-semibold text-content-muted uppercase tracking-wider">
            Favoritos directos:
          </p>
          <div class="space-y-2">
            ${e.map(t=>`
                <button
                  type="button"
                  onclick="document.getElementById('destination-search-input').value = '${t.name}'; window.saveSelectedDestination('${t.name}')"
                  class="w-full p-3 bg-surface-card border border-surface-border rounded-lg text-left flex items-center justify-between hover:border-safety-blue/40 transition-colors shadow-xs"
                >
                  <div class="flex items-center gap-2.5">
                    <div class="w-8 h-8 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center">
                      ${s.heart("w-4 h-4 text-safety-blue")}
                    </div>
                    <div>
                      <p class="font-outfit font-semibold text-sm text-content-title">${t.name}</p>
                      <p class="text-xs text-content-muted">${t.address}</p>
                    </div>
                  </div>
                  <span class="text-xs text-safety-blue font-semibold">Elegir</span>
                </button>
              `).join("")}
          </div>
        </div>

        <div class="pt-4">
          <button
            onclick="window.saveSelectedDestination(document.getElementById('destination-search-input').value)"
            class="btn-primary w-full"
          >
            Continuar
          </button>
        </div>
      </main>
    </div>
  `}function _(){const e=[{name:"Juan Pérez",phone:"+54 9 351 456-7890",relation:"Hermano"},{name:"María Gómez",phone:"+54 9 351 789-0123",relation:"Amiga / Vecina"},{name:"Contacto de seguridad familiar",phone:"+54 9 351 111-2233",relation:"Guardia Barrial"}];return`
    <div class="flex flex-col min-h-screen">
      ${l("Elegir Contacto","#p22-seguridad-personal")}

      <main class="flex-1 px-4 py-4 space-y-4">
        <p class="text-xs text-content-body">
          Seleccioná a quién notificar cuando inicies el trayecto y al presionar <strong>"Llegué Bien"</strong>.
        </p>

        <!-- Lista de contactos con radio selector -->
        <div class="space-y-2" role="radiogroup" aria-label="Contactos de seguridad">
          ${e.map(t=>`
              <label
                class="flex items-center justify-between p-3.5 bg-surface-card border rounded-lg shadow-level-1 cursor-pointer transition-all ${f===t.name?"border-safety-green ring-2 ring-safety-green/20 bg-safety-green-subtle/30":"border-surface-border hover:bg-slate-50"}"
              >
                <div class="flex items-center gap-3">
                  <input
                    type="radio"
                    name="contact-choice"
                    value="${t.name}"
                    ${f===t.name?"checked":""}
                    onchange="window.saveSelectedContact('${t.name}')"
                    class="w-4 h-4 text-safety-green focus:ring-safety-green"
                  />
                  <div>
                    <p class="font-outfit font-semibold text-sm text-content-title">
                      ${t.name}
                    </p>
                    <p class="text-xs text-content-muted">
                      ${t.relation} · ${t.phone}
                    </p>
                  </div>
                </div>
                <span class="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-content-muted">
                  ${s.phone("w-4 h-4")}
                </span>
              </label>
            `).join("")}
        </div>

        <div class="pt-4">
          <a
            href="#p22-seguridad-personal"
            class="btn-primary w-full"
          >
            Continuar
          </a>
        </div>
      </main>
    </div>
  `}function Q(){const e=n.getState().activeTrip||{destination:u,contactName:f,status:"En curso",startTime:"19:40"},t=e.status==="Llegada confirmada",a=e.status==="Alerta enviada";return`
    <div class="flex flex-col min-h-screen">
      ${l("Trayecto Activo","#p01-inicio")}

      <main class="flex-1 px-4 py-4 space-y-4">
        <!-- Mapa de Seguimiento del Trayecto -->
        <div class="relative w-full h-56 bg-slate-200 rounded-lg overflow-hidden border border-surface-border shadow-level-1">
          <svg class="w-full h-full" viewBox="0 0 360 220" xmlns="http://www.w3.org/2000/svg">
            <rect width="360" height="220" fill="#E2E8F0"/>
            <!-- Ruta Activa en Verde -->
            <path d="M 60 180 L 160 110 L 220 110 L 300 40" fill="none" stroke="#10B981" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M 60 180 L 160 110 L 220 110 L 300 40" fill="none" stroke="#FFFFFF" stroke-width="2" stroke-dasharray="4 4"/>

            <!-- Origen -->
            <circle cx="60" cy="180" r="7" fill="#2563EB" stroke="#FFFFFF" stroke-width="2"/>
            <text x="60" y="200" text-anchor="middle" font-family="Outfit" font-size="10" font-weight="bold" fill="#0F172A">Origen</text>

            <!-- Posición en tiempo real animada -->
            <circle cx="180" cy="110" r="14" fill="#10B981" fill-opacity="0.3"/>
            <circle cx="180" cy="110" r="7" fill="#10B981" stroke="#FFFFFF" stroke-width="2"/>

            <!-- Destino -->
            <circle cx="300" cy="40" r="8" fill="#EF4444" stroke="#FFFFFF" stroke-width="2"/>
            <text x="300" y="30" text-anchor="middle" font-family="Outfit" font-size="10" font-weight="bold" fill="#0F172A">${e.destination}</text>
          </svg>

          <div class="absolute top-3 left-3 bg-white/95 px-2.5 py-1 rounded text-xs font-semibold text-safety-green-dark border border-safety-green/20 shadow-xs flex items-center gap-1.5">
            <span class="w-2 h-2 rounded-full bg-safety-green animate-ping"></span>
            GPS en vivo · 15 min restantes
          </div>
        </div>

        <!-- Banner de Estado de Trayecto -->
        <section class="bg-surface-card border border-surface-border rounded-lg p-4 shadow-level-1 space-y-3">
          <div class="flex items-center justify-between border-b border-slate-100 pb-2">
            <div>
              <p class="text-xs text-content-muted">Destino fijado</p>
              <h2 class="font-outfit font-bold text-lg text-content-title">${e.destination}</h2>
            </div>
            <span class="px-2.5 py-1 rounded-full text-xs font-bold ${t?"bg-safety-green-subtle text-safety-green-dark":a?"bg-safety-red-subtle text-safety-red-dark":"bg-safety-blue-subtle text-safety-blue-dark"}">
              ${e.status}
            </span>
          </div>

          <div class="flex items-center justify-between text-xs py-1">
            <div>
              <span class="text-content-muted">Contacto notificado:</span>
              <p class="font-semibold text-content-title">${e.contactName}</p>
            </div>
            <div>
              <span class="text-content-muted">Hora de inicio:</span>
              <p class="font-semibold text-content-title">${e.startTime}</p>
            </div>
          </div>

          ${t?`
              <div class="p-3 bg-safety-green-subtle border border-safety-green/30 rounded-lg text-center space-y-1">
                <p class="font-outfit font-bold text-sm text-safety-green-dark">✓ ¡Llegada confirmada con éxito!</p>
                <p class="text-[11px] text-safety-green-dark/80">Se envió mensaje automático a ${e.contactName}.</p>
              </div>
            `:a?`
              <div class="p-3 bg-safety-red-subtle border border-safety-red/30 rounded-lg text-center space-y-1">
                <p class="font-outfit font-bold text-sm text-safety-red-dark">⚠ Alerta preventiva enviada a ${e.contactName}</p>
                <p class="text-[11px] text-safety-red-dark/80">Tu ubicación actual compartida de urgencia.</p>
              </div>
            `:""}
        </section>

        <!-- Botones de Acción Críticos del Trayecto -->
        <div class="space-y-2.5 pt-2">
          <!-- Botón "Llegué Bien" Principal -->
          <button
            onclick="window.executeLlegueBien()"
            class="btn-primary w-full bg-safety-green hover:bg-safety-green-hover text-white py-4 text-base font-bold shadow-md gap-2"
          >
            ${s.check("w-5 h-5")}
            ¡Llegué Bien!
          </button>

          <!-- Botón "Enviar Alerta" Preventiva -->
          <button
            onclick="window.executeSendTripAlert()"
            class="btn-secondary w-full border-safety-amber/40 text-safety-amber-dark hover:bg-safety-amber-subtle py-3 font-semibold gap-2"
          >
            ${s.alertTriangle("w-4 h-4 text-safety-amber")}
            Enviar Alerta preventiva
          </button>

          <!-- Finalizar Trayecto -->
          <button
            onclick="window.executeFinishTrip()"
            class="btn-secondary w-full text-slate-600 hover:bg-slate-100"
          >
            Finalizar Trayecto
          </button>
        </div>
      </main>
    </div>
  `}function W(){const e=n.getState().favorites;return`
    <div class="flex flex-col min-h-screen">
      ${l("Favoritos","#p01-inicio")}

      <main class="flex-1 px-4 py-4 space-y-4">
        <p class="text-xs text-content-body">
          Guardá tus destinos habituales para preparar trayectos rápidos en "Llegué Bien".
        </p>

        <!-- Lista de Lugares -->
        <section class="space-y-3" aria-label="Lista de lugares favoritos">
          ${e.map(t=>`
              <article class="p-4 bg-surface-card border border-surface-border rounded-lg shadow-level-1 space-y-2">
                <div class="flex items-start justify-between">
                  <div class="flex items-center gap-3">
                    <div class="w-9 h-9 rounded-md bg-slate-100 text-safety-blue flex items-center justify-center">
                      ${s.mapPin("w-5 h-5")}
                    </div>
                    <div>
                      <h3 class="font-outfit font-semibold text-base text-content-title">
                        ${t.name}
                      </h3>
                      <p class="text-xs text-content-muted">
                        ${t.address}
                      </p>
                    </div>
                  </div>
                </div>

                <div class="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                  <a
                    href="#p28-editar-lugar?id=${t.id}"
                    class="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 rounded hover:bg-slate-200 transition-colors inline-flex items-center gap-1"
                  >
                    ${s.edit("w-3.5 h-3.5")}
                    Editar
                  </a>
                  <a
                    href="#p29-eliminar-lugar?id=${t.id}"
                    class="px-3 py-1.5 text-xs font-semibold text-safety-red bg-safety-red-subtle rounded hover:bg-safety-red/20 transition-colors inline-flex items-center gap-1"
                  >
                    ${s.trash("w-3.5 h-3.5")}
                    Eliminar
                  </a>
                </div>
              </article>
            `).join("")}
        </section>

        <!-- Botón Agregar Nuevo Lugar -->
        <div class="pt-4">
          <a
            href="#p27-agregar-lugar"
            class="btn-primary w-full gap-2 shadow-sm"
          >
            ${s.plus("w-5 h-5")}
            Agregar nuevo lugar
          </a>
        </div>
      </main>
    </div>
  `}function Y(){return`
    <div class="flex flex-col min-h-screen">
      ${l("Agregar Lugar","#p26-favoritos")}

      <main class="flex-1 px-4 py-6 space-y-5">
        <form id="add-favorite-form" onsubmit="window.saveNewFavorite(event)" class="bg-surface-card border border-surface-border rounded-lg p-5 shadow-level-1 space-y-4">
          <div class="space-y-1">
            <label for="fav-name" class="text-xs font-semibold text-content-title">
              Nombre del lugar:
            </label>
            <input
              id="fav-name"
              type="text"
              required
              placeholder="Ej. Casa de mamá, Gimnasio..."
              class="form-input"
              autofocus
            />
          </div>

          <div class="space-y-1">
            <label for="fav-address" class="text-xs font-semibold text-content-title">
              Dirección / ubicación:
            </label>
            <input
              id="fav-address"
              type="text"
              required
              placeholder="Calle y número o intersección..."
              class="form-input"
            />
          </div>

          <div class="space-y-2 pt-3">
            <button type="submit" class="btn-primary w-full">
              Guardar lugar
            </button>
            <a href="#p26-favoritos" class="btn-secondary w-full">
              Cancelar
            </a>
          </div>
        </form>
      </main>
    </div>
  `}function X(e="fav-1"){const t=n.getState().favorites.find(a=>a.id===e)||{name:"Casa",address:"Av. Pueyrredón 450"};return`
    <div class="flex flex-col min-h-screen">
      ${l("Editar Lugar","#p26-favoritos")}

      <main class="flex-1 px-4 py-6 space-y-5">
        <form id="edit-favorite-form" onsubmit="window.saveEditedFavorite(event, '${e}')" class="bg-surface-card border border-surface-border rounded-lg p-5 shadow-level-1 space-y-4">
          <div class="space-y-1">
            <label for="edit-fav-name" class="text-xs font-semibold text-content-title">
              Nombre:
            </label>
            <input
              id="edit-fav-name"
              type="text"
              required
              value="${t.name}"
              class="form-input"
            />
          </div>

          <div class="space-y-1">
            <label for="edit-fav-address" class="text-xs font-semibold text-content-title">
              Dirección / ubicación:
            </label>
            <input
              id="edit-fav-address"
              type="text"
              required
              value="${t.address}"
              class="form-input"
            />
          </div>

          <div class="space-y-2 pt-3">
            <button type="submit" class="btn-primary w-full">
              Guardar cambios
            </button>
            <a href="#p26-favoritos" class="btn-secondary w-full">
              Cancelar
            </a>
          </div>
        </form>
      </main>
    </div>
  `}function ee(e="fav-1"){const t=n.getState().favorites.find(a=>a.id===e)||{name:"este lugar"};return`
    <div class="flex flex-col min-h-screen">
      ${l("Eliminar Lugar","#p26-favoritos")}

      <main class="flex-1 px-4 py-8 flex flex-col justify-center space-y-6">
        <div class="p-6 bg-surface-card border border-surface-border rounded-xl shadow-level-2 text-center space-y-4">
          <div class="w-16 h-16 rounded-full bg-safety-red-subtle text-safety-red flex items-center justify-center mx-auto">
            ${s.trash("w-8 h-8")}
          </div>

          <div class="space-y-1">
            <h2 class="font-outfit font-bold text-xl text-content-title">
              ¿Está seguro que desea eliminar este lugar?
            </h2>
            <p class="text-sm font-semibold text-safety-blue">
              "${t.name}"
            </p>
            <p class="text-xs text-content-muted">
              Esta acción no se puede deshacer. Dejará de aparecer en tus accesos rápidos.
            </p>
          </div>

          <div class="space-y-2 pt-2">
            <button
              onclick="window.executeDeleteFavorite('${e}')"
              class="btn-primary w-full bg-safety-red hover:bg-safety-red-hover font-semibold"
            >
              Eliminar
            </button>
            <a
              href="#p26-favoritos"
              class="btn-secondary w-full"
            >
              Cancelar
            </a>
          </div>
        </div>
      </main>
    </div>
  `}function te(){const e=n.getState().user;return`
    <div class="flex flex-col min-h-screen">
      ${l("Mi Perfil","#p01-inicio")}

      <main class="flex-1 px-4 py-4 space-y-4">
        <!-- Tarjeta de Identidad de Usuario -->
        <div class="p-4 bg-surface-card border border-surface-border rounded-lg shadow-level-1 flex items-center gap-3">
          <div class="w-14 h-14 rounded-full bg-safety-blue text-white font-outfit font-bold text-xl flex items-center justify-center shrink-0 shadow-sm">
            ${e.avatar||"MR"}
          </div>
          <div>
            <h2 class="font-outfit font-bold text-lg text-content-title leading-tight">
              ${e.name} ${e.lastName}
            </h2>
            <p class="text-xs text-content-muted">
              ${e.email}
            </p>
            <div class="flex items-center gap-2 mt-1">
              <span class="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-safety-blue-subtle text-safety-blue uppercase">
                Vecino Verificado
              </span>
              ${e.role==="admin"?'<span class="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-900 text-slate-100 uppercase">Admin</span>':""}
            </div>
          </div>
        </div>

        <!-- Lista de Secciones y Ajustes -->
        <section class="bg-surface-card border border-surface-border rounded-lg shadow-level-1 divide-y divide-surface-border overflow-hidden">
          <a href="#p31-editar-perfil" class="flex items-center justify-between p-3.5 hover:bg-slate-50 transition-colors group">
            <div class="flex items-center gap-3">
              <div class="w-8 h-8 rounded-md bg-slate-100 flex items-center justify-center text-content-title group-hover:text-safety-blue">
                ${s.edit("w-4 h-4")}
              </div>
              <span class="font-inter font-medium text-sm text-content-title">Editar Perfil</span>
            </div>
            ${s.chevronRight("w-4 h-4 text-content-muted")}
          </a>

          <a href="#p32-notificaciones" class="flex items-center justify-between p-3.5 hover:bg-slate-50 transition-colors group">
            <div class="flex items-center gap-3">
              <div class="w-8 h-8 rounded-md bg-slate-100 flex items-center justify-center text-content-title group-hover:text-safety-blue">
                ${s.bell("w-4 h-4")}
              </div>
              <span class="font-inter font-medium text-sm text-content-title">Notificaciones</span>
            </div>
            ${s.chevronRight("w-4 h-4 text-content-muted")}
          </a>

          <a href="#p33-historial-personal" class="flex items-center justify-between p-3.5 hover:bg-slate-50 transition-colors group">
            <div class="flex items-center gap-3">
              <div class="w-8 h-8 rounded-md bg-slate-100 flex items-center justify-center text-content-title group-hover:text-safety-blue">
                ${s.clock("w-4 h-4")}
              </div>
              <span class="font-inter font-medium text-sm text-content-title">Historial Personal</span>
            </div>
            ${s.chevronRight("w-4 h-4 text-content-muted")}
          </a>

          <a href="#p34-mis-reportes" class="flex items-center justify-between p-3.5 hover:bg-slate-50 transition-colors group">
            <div class="flex items-center gap-3">
              <div class="w-8 h-8 rounded-md bg-slate-100 flex items-center justify-center text-content-title group-hover:text-safety-blue">
                ${s.fileText("w-4 h-4")}
              </div>
              <span class="font-inter font-medium text-sm text-content-title">Mis Reportes</span>
            </div>
            ${s.chevronRight("w-4 h-4 text-content-muted")}
          </a>

          <a href="#p35-reportes-comentados" class="flex items-center justify-between p-3.5 hover:bg-slate-50 transition-colors group">
            <div class="flex items-center gap-3">
              <div class="w-8 h-8 rounded-md bg-slate-100 flex items-center justify-center text-content-title group-hover:text-safety-blue">
                ${s.info("w-4 h-4")}
              </div>
              <span class="font-inter font-medium text-sm text-content-title">Reportes Comentados</span>
            </div>
            ${s.chevronRight("w-4 h-4 text-content-muted")}
          </a>

          <a href="#p36-mis-trayectos" class="flex items-center justify-between p-3.5 hover:bg-slate-50 transition-colors group">
            <div class="flex items-center gap-3">
              <div class="w-8 h-8 rounded-md bg-slate-100 flex items-center justify-center text-content-title group-hover:text-safety-blue">
                ${s.navigation("w-4 h-4")}
              </div>
              <span class="font-inter font-medium text-sm text-content-title">Mis Trayectos</span>
            </div>
            ${s.chevronRight("w-4 h-4 text-content-muted")}
          </a>
        </section>

        <!-- Toggle Rol Admin de Demostración -->
        <div class="p-3 bg-slate-100 rounded-lg border border-slate-200 flex items-center justify-between text-xs">
          <span>Modo Administrador activado</span>
          <button
            onclick="window.toggleAdminRole()"
            class="px-2.5 py-1 bg-white border border-slate-300 rounded font-semibold text-safety-blue hover:bg-slate-50"
          >
            ${e.role==="admin"?"Desactivar rol":"Activar rol"}
          </button>
        </div>
      </main>
    </div>
  `}function se(){const e=n.getState().user;return`
    <div class="flex flex-col min-h-screen">
      ${l("Editar Perfil","#p30-mi-perfil")}

      <main class="flex-1 px-4 py-6 space-y-5">
        <form id="edit-profile-form" onsubmit="window.saveUserProfile(event)" class="bg-surface-card border border-surface-border rounded-lg p-5 shadow-level-1 space-y-4">
          <div class="space-y-1">
            <label for="prof-name" class="text-xs font-semibold text-content-title">
              Nombre:
            </label>
            <input
              id="prof-name"
              type="text"
              required
              value="${e.name}"
              class="form-input"
            />
          </div>

          <div class="space-y-1">
            <label for="prof-lastname" class="text-xs font-semibold text-content-title">
              Apellido:
            </label>
            <input
              id="prof-lastname"
              type="text"
              required
              value="${e.lastName}"
              class="form-input"
            />
          </div>

          <div class="space-y-1">
            <label for="prof-email" class="text-xs font-semibold text-content-title">
              Email:
            </label>
            <input
              id="prof-email"
              type="email"
              required
              value="${e.email}"
              class="form-input"
            />
          </div>

          <div class="space-y-2 pt-3">
            <button type="submit" class="btn-primary w-full">
              Guardar cambios
            </button>
            <a href="#p30-mi-perfil" class="btn-secondary w-full">
              Cancelar
            </a>
          </div>
        </form>
      </main>
    </div>
  `}function ae(){const e=n.getState().notifications;return`
    <div class="flex flex-col min-h-screen">
      ${l("Notificaciones","#p30-mi-perfil")}

      <main class="flex-1 px-4 py-4 space-y-3">
        ${e.map(t=>`
            <article class="p-4 bg-surface-card border border-surface-border rounded-lg shadow-level-1 space-y-1 ${t.read?"":"border-l-4 border-l-safety-blue bg-blue-50/20"}">
              <div class="flex items-center justify-between">
                <h3 class="font-outfit font-semibold text-sm text-content-title flex items-center gap-1.5">
                  ${t.type==="alerta"?s.alertTriangle("w-4 h-4 text-safety-amber"):t.type==="reporte"?s.fileText("w-4 h-4 text-safety-blue"):s.shield("w-4 h-4 text-safety-green")}
                  ${t.title}
                </h3>
                <span class="text-[11px] text-content-muted">${t.time}</span>
              </div>
              <p class="text-xs text-content-body leading-relaxed">
                ${t.message}
              </p>
            </article>
          `).join("")}
      </main>
    </div>
  `}function re(){return`
    <div class="flex flex-col min-h-screen">
      ${l("Historial Personal","#p30-mi-perfil")}

      <main class="flex-1 px-4 py-4 space-y-4">
        <div class="bg-surface-card border border-surface-border rounded-lg p-4 shadow-level-1 space-y-1">
          <h2 class="font-outfit font-semibold text-base text-content-title">
            Tu actividad reciente
          </h2>
          <p class="text-xs text-content-muted">
            Monitoreá tus intervenciones en la red comunitaria barrial.
          </p>
        </div>

        <section class="space-y-3">
          <a
            href="#p34-mis-reportes"
            class="p-4 bg-surface-card border border-surface-border rounded-lg shadow-level-1 flex items-center justify-between hover:border-safety-blue/40 transition-colors"
          >
            <div class="flex items-center gap-3">
              <div class="w-9 h-9 rounded-md bg-safety-blue-subtle text-safety-blue flex items-center justify-center">
                ${s.fileText("w-5 h-5")}
              </div>
              <div>
                <h3 class="font-outfit font-semibold text-sm text-content-title">Mis Reportes</h3>
                <p class="text-xs text-content-muted">Incidentes que publicaste en la red</p>
              </div>
            </div>
            ${s.chevronRight("w-4 h-4 text-content-muted")}
          </a>

          <a
            href="#p35-reportes-comentados"
            class="p-4 bg-surface-card border border-surface-border rounded-lg shadow-level-1 flex items-center justify-between hover:border-safety-blue/40 transition-colors"
          >
            <div class="flex items-center gap-3">
              <div class="w-9 h-9 rounded-md bg-slate-100 text-slate-700 flex items-center justify-center">
                ${s.info("w-5 h-5")}
              </div>
              <div>
                <h3 class="font-outfit font-semibold text-sm text-content-title">Reportes Comentados</h3>
                <p class="text-xs text-content-muted">Comentarios y aportes en alertas de vecinos</p>
              </div>
            </div>
            ${s.chevronRight("w-4 h-4 text-content-muted")}
          </a>

          <a
            href="#p36-mis-trayectos"
            class="p-4 bg-surface-card border border-surface-border rounded-lg shadow-level-1 flex items-center justify-between hover:border-safety-blue/40 transition-colors"
          >
            <div class="flex items-center gap-3">
              <div class="w-9 h-9 rounded-md bg-safety-green-subtle text-safety-green flex items-center justify-center">
                ${s.navigation("w-5 h-5")}
              </div>
              <div>
                <h3 class="font-outfit font-semibold text-sm text-content-title">Mis Trayectos</h3>
                <p class="text-xs text-content-muted">Historial de recorridos "Llegué Bien"</p>
              </div>
            </div>
            ${s.chevronRight("w-4 h-4 text-content-muted")}
          </a>
        </section>
      </main>
    </div>
  `}function oe(){return`
    <div class="flex flex-col min-h-screen">
      ${l("Mis Reportes","#p33-historial-personal")}

      <main class="flex-1 px-4 py-4 space-y-3">
        <article class="p-4 bg-surface-card border border-surface-border rounded-lg shadow-level-1 space-y-2">
          <div class="flex items-center justify-between">
            <h3 class="font-outfit font-semibold text-sm text-content-title">
              Accidente · 18/08
            </h3>
            ${c("Pendiente")}
          </div>
          <p class="text-xs font-mono text-content-muted">Tracking: REP-000123</p>
          <p class="text-xs text-content-body">Colisión en Av. Colón y Jujuy.</p>
          <div class="pt-2 border-t border-slate-100 flex justify-end">
            <a href="#p21-detalle-reporte?id=rep-001" class="text-xs font-semibold text-safety-blue hover:underline">
              Ver detalle →
            </a>
          </div>
        </article>

        <article class="p-4 bg-surface-card border border-surface-border rounded-lg shadow-level-1 space-y-2">
          <div class="flex items-center justify-between">
            <h3 class="font-outfit font-semibold text-sm text-content-title">
              Robo · 15/08
            </h3>
            ${c("Verificado")}
          </div>
          <p class="text-xs font-mono text-content-muted">Tracking: REP-000108</p>
          <p class="text-xs text-content-body">Sustracción en parada Plaza Roca.</p>
          <div class="pt-2 border-t border-slate-100 flex justify-end">
            <a href="#p21-detalle-reporte?id=rep-002" class="text-xs font-semibold text-safety-blue hover:underline">
              Ver detalle →
            </a>
          </div>
        </article>
      </main>
    </div>
  `}function ie(){return`
    <div class="flex flex-col min-h-screen">
      ${l("Reportes Comentados","#p33-historial-personal")}

      <main class="flex-1 px-4 py-4 space-y-3">
        <article class="p-4 bg-surface-card border border-surface-border rounded-lg shadow-level-1 space-y-2">
          <div class="flex items-center justify-between">
            <h3 class="font-outfit font-semibold text-sm text-content-title">
              Robo · comentario del 17/08
            </h3>
            ${c("Verificado")}
          </div>
          <p class="text-xs text-content-body italic">
            "Confirmé que la patrulla policial acudió a los 10 minutos."
          </p>
          <div class="pt-2 border-t border-slate-100 flex justify-end">
            <a href="#p21-detalle-reporte?id=rep-002" class="text-xs font-semibold text-safety-blue hover:underline">
              Ver reporte →
            </a>
          </div>
        </article>

        <article class="p-4 bg-surface-card border border-surface-border rounded-lg shadow-level-1 space-y-2">
          <div class="flex items-center justify-between">
            <h3 class="font-outfit font-semibold text-sm text-content-title">
              Accidente · comentario del 15/08
            </h3>
            ${c("Resuelto")}
          </div>
          <p class="text-xs text-content-body italic">
            "Semáforo ya reparado por cuadrilla municipal."
          </p>
          <div class="pt-2 border-t border-slate-100 flex justify-end">
            <a href="#p21-detalle-reporte?id=rep-001" class="text-xs font-semibold text-safety-blue hover:underline">
              Ver reporte →
            </a>
          </div>
        </article>
      </main>
    </div>
  `}function ne(){return`
    <div class="flex flex-col min-h-screen">
      ${l("Mis Trayectos","#p33-historial-personal")}

      <main class="flex-1 px-4 py-4 space-y-3">
        <article class="p-4 bg-surface-card border border-surface-border rounded-lg shadow-level-1 space-y-2">
          <div class="flex items-center justify-between">
            <h3 class="font-outfit font-semibold text-sm text-content-title">
              Casa → Trabajo
            </h3>
            ${c("Finalizado")}
          </div>
          <p class="text-xs text-content-muted">18/08/2026 · Duración: 22 minutos</p>
          <p class="text-xs text-content-body">Contacto de seguridad notificado: Juan Pérez ("Llegué Bien confirmado").</p>
        </article>

        <article class="p-4 bg-surface-card border border-surface-border rounded-lg shadow-level-1 space-y-2">
          <div class="flex items-center justify-between">
            <h3 class="font-outfit font-semibold text-sm text-content-title">
              Facultad → Casa
            </h3>
            ${c("Finalizado")}
          </div>
          <p class="text-xs text-content-muted">16/08/2026 · Duración: 35 minutos</p>
          <p class="text-xs text-content-body">Contacto de seguridad notificado: María Gómez ("Llegué Bien confirmado").</p>
        </article>
      </main>
    </div>
  `}function le(){return`
    <div class="flex flex-col min-h-screen">
      ${l("Administración","#p01-inicio",{showAdminBadge:!0})}

      <main class="flex-1 px-4 py-4 space-y-4">
        <!-- Banner de Privilegios -->
        <div class="bg-slate-900 text-slate-100 p-4 rounded-lg shadow-level-1 space-y-1">
          <div class="flex items-center gap-2">
            ${s.lock("w-4 h-4 text-indigo-400")}
            <h2 class="font-outfit font-bold text-sm tracking-wide uppercase text-indigo-200">
              Solo Administradores
            </h2>
          </div>
          <p class="text-xs text-slate-300">
            Panel de control, auditoría barrial y moderación comunitaria de Alerta Vecinos.
          </p>
        </div>

        <!-- Opciones de Gestión -->
        <section class="bg-surface-card border border-surface-border rounded-lg shadow-level-1 divide-y divide-surface-border overflow-hidden">
          <a
            href="#p38-moderacion-reportes"
            class="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors group"
          >
            <div class="flex items-center gap-3">
              <div class="w-9 h-9 rounded-md bg-safety-amber-subtle text-safety-amber-dark flex items-center justify-center">
                ${s.alertTriangle("w-5 h-5")}
              </div>
              <div>
                <h3 class="font-outfit font-semibold text-sm text-content-title">
                  Moderación de Reportes
                </h3>
                <p class="text-xs text-content-muted">Aprobar o desestimar alertas entrantes</p>
              </div>
            </div>
            ${s.chevronRight("w-4 h-4 text-content-muted")}
          </a>

          <a
            href="#p39-estadisticas"
            class="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors group"
          >
            <div class="flex items-center gap-3">
              <div class="w-9 h-9 rounded-md bg-safety-blue-subtle text-safety-blue flex items-center justify-center">
                ${s.barChart("w-5 h-5")}
              </div>
              <div>
                <h3 class="font-outfit font-semibold text-sm text-content-title">
                  Estadísticas y Métricas
                </h3>
                <p class="text-xs text-content-muted">KPIs de incidentes, zonas calientes y tiempos</p>
              </div>
            </div>
            ${s.chevronRight("w-4 h-4 text-content-muted")}
          </a>

          <a
            href="#p40-gestion-usuarios"
            class="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors group"
          >
            <div class="flex items-center gap-3">
              <div class="w-9 h-9 rounded-md bg-slate-100 text-slate-700 flex items-center justify-center">
                ${s.user("w-5 h-5")}
              </div>
              <div>
                <h3 class="font-outfit font-semibold text-sm text-content-title">
                  Gestión de Usuarios
                </h3>
                <p class="text-xs text-content-muted">Vecinos activos, roles y suspensiones</p>
              </div>
            </div>
            ${s.chevronRight("w-4 h-4 text-content-muted")}
          </a>

          <a
            href="#p41-gestion-reportes"
            class="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors group"
          >
            <div class="flex items-center gap-3">
              <div class="w-9 h-9 rounded-md bg-safety-green-subtle text-safety-green flex items-center justify-center">
                ${s.fileText("w-5 h-5")}
              </div>
              <div>
                <h3 class="font-outfit font-semibold text-sm text-content-title">
                  Gestión Global de Reportes
                </h3>
                <p class="text-xs text-content-muted">Base histórica y resolución de casos</p>
              </div>
            </div>
            ${s.chevronRight("w-4 h-4 text-content-muted")}
          </a>
        </section>
      </main>
    </div>
  `}function de(){const e=n.getState().reports;return`
    <div class="flex flex-col min-h-screen">
      ${l("Moderación de Reportes","#p37-administracion",{showAdminBadge:!0})}

      <main class="flex-1 px-4 py-4 space-y-4">
        <p class="text-xs text-content-body">
          Revisá los reportes comunitarios pendientes para verificarlos o rechazarlos.
        </p>

        <section class="space-y-3" aria-label="Cola de moderación">
          ${e.map(t=>`
              <article class="p-4 bg-surface-card border border-surface-border rounded-lg shadow-level-1 space-y-3">
                <div class="flex items-start justify-between">
                  <div>
                    <h3 class="font-outfit font-semibold text-sm text-content-title">
                      ${t.category} · ${t.timestamp.split("·")[0].trim()}
                    </h3>
                    <p class="text-xs text-content-muted">
                      Autor: ${t.isAnonymous?"Anónimo":t.author} · ${t.location}
                    </p>
                  </div>
                  <div>
                    ${c(t.status)}
                  </div>
                </div>

                <p class="text-xs text-content-body bg-slate-50 p-2.5 rounded border border-slate-100">
                  "${t.description}"
                </p>

                <div class="flex items-center justify-between pt-2 border-t border-slate-100">
                  <a
                    href="#p21-detalle-reporte?id=${t.id}"
                    class="text-xs font-semibold text-safety-blue hover:underline"
                  >
                    Revisar reporte
                  </a>

                  <div class="flex items-center gap-2">
                    <button
                      onclick="window.moderateReport('${t.id}', 'Verificado')"
                      class="px-3 py-1.5 bg-safety-green-subtle text-safety-green-dark border border-safety-green/20 rounded text-xs font-semibold hover:bg-safety-green/20"
                    >
                      Aprobar
                    </button>
                    <button
                      onclick="window.moderateReport('${t.id}', 'Rechazado')"
                      class="px-3 py-1.5 bg-safety-red-subtle text-safety-red-dark border border-safety-red/20 rounded text-xs font-semibold hover:bg-safety-red/20"
                    >
                      Rechazar
                    </button>
                  </div>
                </div>
              </article>
            `).join("")}
        </section>
      </main>
    </div>
  `}function ce(){return`
    <div class="flex flex-col min-h-screen">
      ${l("Estadísticas","#p37-administracion",{showAdminBadge:!0})}

      <main class="flex-1 px-4 py-4 space-y-4">
        <!-- KPI Card Total de Reportes -->
        <div class="p-5 bg-surface-card border border-surface-border rounded-lg shadow-level-1 text-center space-y-1">
          <p class="text-xs text-content-muted font-medium uppercase tracking-wider">Total de reportes acumulados</p>
          <p class="font-outfit font-bold text-4xl text-safety-blue">
            120
          </p>
          <p class="text-[11px] text-safety-green-dark font-medium">+14% respecto al mes anterior</p>
        </div>

        <!-- Desglose por Categoría con Barras Accesibles -->
        <section class="p-4 bg-surface-card border border-surface-border rounded-lg shadow-level-1 space-y-3">
          <h3 class="font-outfit font-semibold text-sm text-content-title">
            Por categoría
          </h3>
          <div class="space-y-2.5 text-xs">
            <div>
              <div class="flex justify-between mb-1">
                <span>Robo y arrebatos</span>
                <span class="font-bold">45% (54)</span>
              </div>
              <div class="w-full bg-slate-100 rounded-full h-2.5">
                <div class="bg-safety-amber h-2.5 rounded-full" style="width: 45%"></div>
              </div>
            </div>

            <div>
              <div class="flex justify-between mb-1">
                <span>Accidentes viales</span>
                <span class="font-bold">25% (30)</span>
              </div>
              <div class="w-full bg-slate-100 rounded-full h-2.5">
                <div class="bg-safety-red h-2.5 rounded-full" style="width: 25%"></div>
              </div>
            </div>

            <div>
              <div class="flex justify-between mb-1">
                <span>Actividad sospechosa</span>
                <span class="font-bold">20% (24)</span>
              </div>
              <div class="w-full bg-slate-100 rounded-full h-2.5">
                <div class="bg-safety-blue h-2.5 rounded-full" style="width: 20%"></div>
              </div>
            </div>

            <div>
              <div class="flex justify-between mb-1">
                <span>Vandalismo / Otros</span>
                <span class="font-bold">10% (12)</span>
              </div>
              <div class="w-full bg-slate-100 rounded-full h-2.5">
                <div class="bg-slate-500 h-2.5 rounded-full" style="width: 10%"></div>
              </div>
            </div>
          </div>
        </section>

        <!-- Desglose por Estado -->
        <section class="p-4 bg-surface-card border border-surface-border rounded-lg shadow-level-1 space-y-3">
          <h3 class="font-outfit font-semibold text-sm text-content-title">
            Por estado de resolución
          </h3>
          <div class="grid grid-cols-3 gap-2 text-center">
            <div class="p-2.5 bg-safety-green-subtle rounded-lg border border-safety-green/20">
              <p class="font-outfit font-bold text-lg text-safety-green-dark">68%</p>
              <p class="text-[11px] text-safety-green-dark font-medium">Verificados</p>
            </div>
            <div class="p-2.5 bg-safety-amber-subtle rounded-lg border border-safety-amber/20">
              <p class="font-outfit font-bold text-lg text-safety-amber-dark">24%</p>
              <p class="text-[11px] text-safety-amber-dark font-medium">Pendientes</p>
            </div>
            <div class="p-2.5 bg-safety-blue-subtle rounded-lg border border-safety-blue/20">
              <p class="font-outfit font-bold text-lg text-safety-blue-dark">8%</p>
              <p class="text-[11px] text-safety-blue-dark font-medium">Resueltos</p>
            </div>
          </div>
        </section>

        <!-- Incidentes por Zona -->
        <section class="p-4 bg-surface-card border border-surface-border rounded-lg shadow-level-1 space-y-2">
          <h3 class="font-outfit font-semibold text-sm text-content-title">
            Incidentes por zona barrial
          </h3>
          <div class="space-y-1.5 text-xs text-content-body">
            <div class="flex justify-between p-2 bg-slate-50 rounded">
              <span>Sector Centro (Plaza Roca y peatonales)</span>
              <span class="font-bold text-content-title">42 reportes</span>
            </div>
            <div class="flex justify-between p-2 bg-slate-50 rounded">
              <span>Sector Norte (Corredor universitario)</span>
              <span class="font-bold text-content-title">31 reportes</span>
            </div>
            <div class="flex justify-between p-2 bg-slate-50 rounded">
              <span>Sector Sur (Terminal y accesos)</span>
              <span class="font-bold text-content-title">47 reportes</span>
            </div>
          </div>
        </section>
      </main>
    </div>
  `}function pe(){const e=[{id:"usr-1",name:"Juan Pérez",role:"Vecino",status:"Activo",email:"juan.perez@vecinos.org"},{id:"usr-2",name:"María Gómez",role:"Moderadora Barrial",status:"Activa",email:"maria.g@vecinos.org"},{id:"usr-3",name:"Carlos Díaz",role:"Vecino",status:"Activo",email:"cdiaz@correo.com"},{id:"usr-4",name:"Anónimo 234",role:"Sin verificar",status:"Bloqueado",email:"anon234@temp.com"}];return`
    <div class="flex flex-col min-h-screen">
      ${l("Gestión de Usuarios","#p37-administracion",{showAdminBadge:!0})}

      <main class="flex-1 px-4 py-4 space-y-4">
        <!-- Buscador de Usuarios -->
        <div class="relative">
          <input
            type="search"
            placeholder="Buscar usuario por nombre o email..."
            class="form-input pl-10"
          />
          <div class="absolute left-3 top-3.5 text-content-placeholder">
            ${s.search("w-4 h-4")}
          </div>
        </div>

        <!-- Lista de Usuarios -->
        <section class="space-y-2.5" aria-label="Directorio de usuarios">
          ${e.map(t=>`
              <article class="p-3.5 bg-surface-card border border-surface-border rounded-lg shadow-level-1 flex items-center justify-between">
                <div class="flex items-center gap-3">
                  <div class="w-9 h-9 rounded-full bg-slate-200 flex items-center justify-center font-outfit font-bold text-sm text-slate-700">
                    ${t.name.substring(0,2).toUpperCase()}
                  </div>
                  <div>
                    <h3 class="font-outfit font-semibold text-sm text-content-title">
                      ${t.name}
                    </h3>
                    <p class="text-xs text-content-muted">
                      ${t.role} · ${t.email}
                    </p>
                  </div>
                </div>

                <div class="flex items-center gap-2">
                  ${c(t.status)}
                  <button
                    onclick="alert('Detalle de usuario: ${t.name}\\nRol: ${t.role}\\nEstado: ${t.status}')"
                    class="px-2 py-1 text-xs font-semibold text-safety-blue hover:bg-slate-100 rounded"
                    title="Ver / gestionar usuario"
                  >
                    Ver
                  </button>
                </div>
              </article>
            `).join("")}
        </section>
      </main>
    </div>
  `}function ue(){const e=n.getState().reports;return`
    <div class="flex flex-col min-h-screen">
      ${l("Gestión de Reportes","#p37-administracion",{showAdminBadge:!0})}

      <main class="flex-1 px-4 py-4 space-y-4">
        <!-- Buscador y Filtros -->
        <div class="space-y-2">
          <div class="relative">
            <input
              type="search"
              placeholder="Buscar por tracking, calle o palabra clave..."
              class="form-input pl-10"
            />
            <div class="absolute left-3 top-3.5 text-content-placeholder">
              ${s.search("w-4 h-4")}
            </div>
          </div>

          <div class="flex gap-2">
            <select class="form-input text-xs min-h-[38px] py-1 bg-surface-card">
              <option>Categoría: Todas</option>
              <option>Robo</option>
              <option>Accidente</option>
              <option>Vandalismo</option>
            </select>
            <select class="form-input text-xs min-h-[38px] py-1 bg-surface-card">
              <option>Estado: Todos</option>
              <option>Pendiente</option>
              <option>Verificado</option>
              <option>Resuelto</option>
            </select>
          </div>
        </div>

        <!-- Lista de Reportes Globales -->
        <section class="space-y-3" aria-label="Gestión global de reportes">
          ${e.map(t=>`
              <article class="p-3.5 bg-surface-card border border-surface-border rounded-lg shadow-level-1 space-y-2">
                <div class="flex items-start justify-between">
                  <div>
                    <span class="text-[11px] font-mono font-bold text-safety-blue">${t.trackingId}</span>
                    <h3 class="font-outfit font-semibold text-sm text-content-title">
                      ${t.category} · ${t.timestamp}
                    </h3>
                    <p class="text-xs text-content-muted">${t.location}</p>
                  </div>
                  <div>
                    ${c(t.status)}
                  </div>
                </div>

                <div class="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                  <span class="text-content-muted">Autor: ${t.author}</span>
                  <div class="flex items-center gap-1.5">
                    <button
                      onclick="window.moderateReport('${t.id}', 'Resuelto')"
                      class="px-2.5 py-1 text-xs font-semibold bg-safety-blue-subtle text-safety-blue rounded hover:bg-safety-blue/20"
                    >
                      Marcar Resuelto
                    </button>
                    <a
                      href="#p21-detalle-reporte?id=${t.id}"
                      class="px-2.5 py-1 text-xs font-semibold bg-slate-100 text-slate-700 rounded hover:bg-slate-200"
                    >
                      Gestionar
                    </a>
                  </div>
                </div>
              </article>
            `).join("")}
        </section>
      </main>
    </div>
  `}function fe(){const e=document.getElementById("app");if(!e)return;function t(){const o=window.location.hash.slice(1)||"p01-inicio",[r,d]=o.split("?"),i=new URLSearchParams(d||"");return{path:r.toLowerCase(),params:i}}function a(){const{path:o,params:r}=t(),d=r.get("id")||void 0;let i="",p=!1;switch(o){case"p01-inicio":case"inicio":i=g(),p=!0;break;case"p02-mapa-riesgo":case"mapa":i=C(),p=!0;break;case"p03-alertas-cercanas":case"alertas":i=A();break;case"p04-radio-busqueda":case"radio":i=P();break;case"p05-paradas-seguras":case"paradas":i=F();break;case"p06-buscar-paradas":i=B();break;case"p07-ubicacion-parada":i=T(d);break;case"p08-consejos-preventivos":case"consejos":i=E();break;case"p09-recomendaciones":i=L();break;case"p10-numeros-emergencia":case"emergencias":i=I();break;case"p11-reportes":case"reportes":i=M(),p=!0;break;case"p12-reportes-publicos":i=D(),p=!0;break;case"p13-filtrar-reportes":i=z();break;case"p14-iniciar-sesion":case"login":i=V();break;case"p15-crear-reporte-intro":i=N();break;case"p16-tipo-reporte":i=q();break;case"p17-completar-reporte":i=H();break;case"p18-resumen-reporte":i=O();break;case"p19-confirmar-reporte":i=G();break;case"p20-reporte-exitoso":i=U();break;case"p21-detalle-reporte":i=J(d);break;case"p22-seguridad-personal":case"seguridad":i=Z(),p=!0;break;case"p23-seleccionar-destino":i=K();break;case"p24-elegir-contacto":i=_();break;case"p25-trayecto-activo":i=Q();break;case"p26-favoritos":case"favoritos":i=W();break;case"p27-agregar-lugar":i=Y();break;case"p28-editar-lugar":i=X(d);break;case"p29-eliminar-lugar":i=ee(d);break;case"p30-mi-perfil":case"perfil":i=te(),p=!0;break;case"p31-editar-perfil":i=se();break;case"p32-notificaciones":i=ae();break;case"p33-historial-personal":i=re();break;case"p34-mis-reportes":i=oe();break;case"p35-reportes-comentados":i=ie();break;case"p36-mis-trayectos":i=ne();break;case"p37-administracion":case"admin":i=le();break;case"p38-moderacion-reportes":i=de();break;case"p39-estadisticas":i=ce();break;case"p40-gestion-usuarios":i=pe();break;case"p41-gestion-reportes":i=ue();break;default:i=g(),p=!0;break}p&&(i+=j(o),i+='<div class="h-16"></div>'),i+=S(o),e&&(e.innerHTML=i,window.scrollTo(0,0),o==="p06-buscar-paradas"&&typeof window.filterStops=="function"&&window.filterStops(""))}window.addEventListener("hashchange",a),n.subscribe(a),window.location.hash?a():window.location.hash="#p01-inicio"}let v=n.getState().searchRadiusKm;window.selectRadius=e=>{v=e;const t=document.getElementById("radio-display");t&&(t.textContent=`Radio seleccionado: ${e>=1?`${e} km`:`${e*1e3} m`}`);const a=document.getElementById("range-slider");a&&(a.value=String(e)),document.querySelectorAll(".radio-btn").forEach(r=>{r.classList.remove("bg-safety-blue","text-white","border-safety-blue","shadow-sm"),r.classList.add("bg-surface-card","text-content-title","border-slate-300")});const o=Array.from(document.querySelectorAll(".radio-btn")).find(r=>r.textContent?.includes(e>=1?`${e} km`:`${e*1e3} m`));o&&(o.classList.remove("bg-surface-card","text-content-title","border-slate-300"),o.classList.add("bg-safety-blue","text-white","border-safety-blue","shadow-sm"))};window.saveRadius=()=>{n.setSearchRadius(v),alert(`Radio de búsqueda actualizado a ${v} km.`),window.location.hash="#p03-alertas-cercanas"};window.filterStops=e=>{const t=document.getElementById("stops-results-container");if(!t)return;const a=(e||"").toLowerCase().trim(),o=n.getState().safeStops.filter(r=>r.name.toLowerCase().includes(a)||r.address.toLowerCase().includes(a)||r.lines.some(d=>d.toLowerCase().includes(a)));if(o.length===0){t.innerHTML=`
      <div class="p-6 text-center text-xs text-content-muted bg-surface-card border border-surface-border rounded-lg">
        No se encontraron paradas para "${e}".
      </div>
    `;return}t.innerHTML=o.map(r=>`
      <article class="p-3.5 bg-surface-card border border-surface-border rounded-lg shadow-level-1 flex items-center justify-between">
        <div>
          <h4 class="font-outfit font-semibold text-sm text-content-title">
            ● ${r.name} · <span class="text-xs text-content-muted">${r.distance}</span>
          </h4>
          <p class="text-xs text-content-body mt-0.5">${r.address}</p>
          <span class="text-[11px] text-content-muted mt-1 block">${r.lines.join(" · ")}</span>
        </div>
        <a
          href="#p07-ubicacion-parada?id=${r.id}"
          class="px-3 py-1.5 text-xs font-semibold text-safety-green-dark bg-safety-green-subtle border border-safety-green/20 rounded hover:bg-safety-green/20 transition-colors ml-2 shrink-0"
        >
          Ver ubicación
        </a>
      </article>
    `).join("")};window.selectCategory=e=>{n.setReportDraft({category:e}),document.querySelectorAll(".category-card").forEach(a=>{a.classList.remove("border-safety-blue","ring-2","ring-safety-blue/20","bg-safety-blue-subtle/30"),a.classList.add("border-surface-border")});const t=Array.from(document.querySelectorAll(".category-card")).find(a=>a.textContent?.includes(e));t&&(t.classList.remove("border-surface-border"),t.classList.add("border-safety-blue","ring-2","ring-safety-blue/20","bg-safety-blue-subtle/30"))};window.submitReportDetails=e=>{e.preventDefault();const t=document.getElementById("report-location"),a=document.getElementById("report-desc"),o=document.getElementById("report-anonymous-toggle");n.setReportDraft({location:t?.value.trim()||"Av. Colón y Jujuy",description:a?.value.trim()||"Sin descripción.",isAnonymous:o?.checked??!1}),window.location.hash="#p18-resumen-reporte"};window.executeConfirmReport=()=>{n.createReport(),window.location.hash="#p20-reporte-exitoso"};window.startSafetyTrip=(e,t)=>{n.startTrip(e||"Casa",t||"Juan Pérez","+54 9 351 456-7890"),window.location.hash="#p25-trayecto-activo"};window.quickSelectDestination=e=>{const t=document.getElementById("display-selected-destination");t&&(t.textContent=e),window.saveSelectedDestination(e)};window.saveSelectedDestination=e=>{window.location.hash="#p22-seguridad-personal"};window.saveSelectedContact=e=>{window.location.hash="#p22-seguridad-personal"};window.executeLlegueBien=()=>{n.confirmArrival()};window.executeSendTripAlert=()=>{n.sendTripAlert()};window.executeFinishTrip=()=>{n.finishTrip(),window.location.hash="#p01-inicio"};window.saveNewFavorite=e=>{e.preventDefault();const t=document.getElementById("fav-name"),a=document.getElementById("fav-address");t?.value&&a?.value&&(n.addFavorite(t.value,a.value),window.location.hash="#p26-favoritos")};window.saveEditedFavorite=(e,t)=>{e.preventDefault();const a=document.getElementById("edit-fav-name"),o=document.getElementById("edit-fav-address");a?.value&&o?.value&&(n.updateFavorite(t,a.value,o.value),window.location.hash="#p26-favoritos")};window.executeDeleteFavorite=e=>{n.removeFavorite(e),window.location.hash="#p26-favoritos"};window.saveUserProfile=e=>{e.preventDefault();const t=document.getElementById("prof-name"),a=document.getElementById("prof-lastname"),o=document.getElementById("prof-email");t&&a&&o&&(n.updateUserProfile({name:t.value.trim(),lastName:a.value.trim(),email:o.value.trim()}),alert("Perfil actualizado con éxito."),window.location.hash="#p30-mi-perfil")};window.handleLogin=e=>{e.preventDefault(),window.location.hash="#p15-crear-reporte-intro"};window.toggleAdminRole=()=>{n.toggleAdminRole()};window.clearFilters=()=>{n.clearReportFilter(),window.location.hash="#p12-reportes-publicos"};window.applyFilters=e=>{e.preventDefault();const t=document.getElementById("filter-category"),a=document.getElementById("filter-status"),o=document.getElementById("filter-radius-slider");n.setReportFilter({category:t?.value||"Todas",status:a?.value||"Todos",radiusKm:parseFloat(o?.value||"2")}),window.location.hash="#p12-reportes-publicos"};window.moderateReport=(e,t)=>{n.updateReportStatus(e,t),alert(`Reporte ${e} marcado como "${t}".`)};fe();
